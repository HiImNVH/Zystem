// backend/src/services/services.trading.js

const { gameDataDb, playerDataDb } = require('../repositories/repositories.databaseDomains');
const craftingService = require('./services.crafting');
const itemStatsService = require('./services.itemStats');
const itemLifecycleService = require('./services.itemLifecycle');

const dbPool = playerDataDb;

const NPC_VENDOR_CONFIGS = [
    {
        key: 'quartermaster',
        name: 'Camp Quartermaster',
        role: 'Weapons, gear, and tools',
        categories: ['WEAPON', 'EQUIPMENT', 'TOOL'],
        sellLimit: 12,
    },
    {
        key: 'provisioner',
        name: 'Camp Provisioner',
        role: 'Food and medicine',
        categories: ['FOOD', 'MEDICINE'],
        sellLimit: 12,
    },
    {
        key: 'salvage_yard',
        name: 'Salvage Yard',
        role: 'Resources and waste buyback',
        categories: ['MATERIAL', 'BUILDING'],
        sellLimit: 16,
    },
    {
        key: 'hunter_butcher',
        name: 'Hunter Butcher',
        role: 'Meat, bones, and hides',
        categories: ['MATERIAL', 'FOOD'],
        sellLimit: 10,
        tagHints: ['Bone', 'Meat', 'Animal', 'Hide', 'Fat'],
    },
];
const NPC_VENDOR_KEYS = NPC_VENDOR_CONFIGS.map(vendor => vendor.key);

const SHOP_ORIGINS = ['Starter', 'Gatherable', 'Loot-only', 'Craftable'];
const WASTE_TAGS = ['Rubbish', 'Junk', 'Recyclable', 'Scrap', 'Broken', 'Plastic', 'Cloth', 'Glass'];
const HUNTER_TAGS = ['Bone', 'Meat', 'Animal', 'Hide', 'Fat', 'Organic', 'Trophy', 'Rotten', 'Claw', 'Fang'];

const CATEGORY_VALUE_MULTIPLIER = {
    WEAPON: 18,
    EQUIPMENT: 16,
    TOOL: 14,
    MEDICINE: 10,
    FOOD: 6,
    MATERIAL: 4,
    BUILDING: 8,
};

const TEMPLATE_VALUE_MULTIPLIER = {
    FIRST_AID_KIT: 3,
    MINERAL_WATER: 1.5,
    WATER_BOILED_FILTERED: 1.4,
    AXE: 1.6,
    PICKAXE: 1.6,
    METAL_SCRAP_ORE: 1.5,
};

const MARKET_TAX_RATE = 0.08;
const NPC_MARKUP_RATE = 1.35;
const NPC_BUYBACK_RATE = 0.25;
const MARKET_MIN_RATE = 0.25;
const MARKET_MAX_RATE = 5;

function normalizeTags(tags) {
    return Array.isArray(tags) ? tags.map(tag => String(tag || '')) : [];
}

function hasAnyTag(item, tagList) {
    const tags = normalizeTags(item?.tags).map(tag => tag.toLowerCase());
    return tagList.some(tag => tags.includes(String(tag).toLowerCase()));
}

function getNpcVendorForItem(item) {
    const category = String(item?.category || item?.template_category || '').toUpperCase();
    if (hasAnyTag(item, HUNTER_TAGS)) return NPC_VENDOR_CONFIGS.find(vendor => vendor.key === 'hunter_butcher');
    if (hasAnyTag(item, WASTE_TAGS) || ['MATERIAL', 'BUILDING'].includes(category)) {
        return NPC_VENDOR_CONFIGS.find(vendor => vendor.key === 'salvage_yard');
    }
    if (['FOOD', 'MEDICINE'].includes(category)) return NPC_VENDOR_CONFIGS.find(vendor => vendor.key === 'provisioner');
    return NPC_VENDOR_CONFIGS.find(vendor => vendor.key === 'quartermaster');
}

function getNpcVendorByKey(shopKey) {
    if (!shopKey) return null;
    return NPC_VENDOR_CONFIGS.find(vendor => vendor.key === String(shopKey).toLowerCase()) || null;
}

function getNpcShopList() {
    return NPC_VENDOR_CONFIGS.map(vendor => ({
        key: vendor.key,
        name: vendor.name,
        role: vendor.role,
        categories: vendor.categories,
    }));
}

function parsePositiveInt(value) {
    const number = Math.floor(Number(value));
    if (!Number.isFinite(number) || number <= 0) return 0;
    return number;
}

function getTemplateLevel(item) {
    return Math.max(1, parseInt(item?.item_level || item?.template_item_level) || 1);
}

function getItemPower(item) {
    const explicitPower = parseInt(item?.item_power);
    if (explicitPower > 0) return explicitPower;

    return craftingService.calculateItemPower(getTemplateLevel(item), item?.rarity || 'COMMON');
}

function calculateBaseValue(item) {
    const category = String(item?.category || item?.template_category || '').toUpperCase();
    const templateCode = String(item?.code || item?.template_code || '').toUpperCase();
    const multiplier = CATEGORY_VALUE_MULTIPLIER[category] || 5;
    const templateMultiplier = TEMPLATE_VALUE_MULTIPLIER[templateCode] || 1;
    const rarityRank = craftingService.RARITY_RANK[String(item?.rarity || 'COMMON').toUpperCase()] || 1;
    const stackQuantity = Math.max(1, parseInt(item?.quantity) || 1);
    const powerValue = Math.max(1, getItemPower(item));

    return Math.max(1, Math.ceil(powerValue * multiplier * templateMultiplier * rarityRank * stackQuantity));
}

function getNpcBuyPrice(item) {
    return Math.max(1, Math.ceil(calculateBaseValue(item) * NPC_MARKUP_RATE));
}

function getNpcSellPrice(item) {
    const vendor = getNpcVendorForItem(item);
    const category = String(item?.category || item?.template_category || '').toUpperCase();
    const wasteBonus = vendor?.key === 'salvage_yard' && (hasAnyTag(item, WASTE_TAGS) || category === 'MATERIAL') ? 1.25 : 1;
    const hunterBonus = vendor?.key === 'hunter_butcher' && hasAnyTag(item, HUNTER_TAGS) ? 1.35 : 1;
    return Math.max(1, Math.floor(calculateBaseValue(item) * NPC_BUYBACK_RATE * wasteBonus * hunterBonus));
}

function getMarketBounds(item) {
    const baseValue = calculateBaseValue(item);
    return {
        fair_price: baseValue,
        min_price: Math.max(1, Math.floor(baseValue * MARKET_MIN_RATE)),
        max_price: Math.max(1, Math.ceil(baseValue * MARKET_MAX_RATE)),
    };
}

function decorateMarketItem(row) {
    const bounds = getMarketBounds(row);
    return {
        ...row,
        fair_price: bounds.fair_price,
        npc_buy_price: getNpcBuyPrice(row),
        npc_sell_price: getNpcSellPrice(row),
    };
}

async function lockWallet(config) {
    let result = await config.client.query(`
        SELECT *
        FROM wallets
        WHERE player_id = $1
        FOR UPDATE;
    `, [config.playerId]);

    if (result.rows.length === 0) {
        await config.client.query(`
            INSERT INTO wallets (player_id, money, silver_coin, gold_coin, copper, silver, gold)
            VALUES ($1, 0, 0, 0, 0, 0, 0)
            ON CONFLICT (player_id) DO NOTHING;
        `, [config.playerId]);

        result = await config.client.query(`
            SELECT *
            FROM wallets
            WHERE player_id = $1
            FOR UPDATE;
        `, [config.playerId]);
    }

    if (result.rows.length === 0) throw new Error('Wallet could not be initialized.');
    return result.rows[0];
}

async function updateWalletMoney(config) {
    const currentMoney = BigInt(config.wallet.money || 0);
    const delta = BigInt(config.deltaMoney);
    const nextMoney = currentMoney + delta;
    const amount = delta < 0n ? -delta : delta;
    if (nextMoney < 0n) throw new Error('Not enough Money.');

    await config.client.query(`
        UPDATE wallets
        SET money = $1, updated_at = NOW()
        WHERE id = $2;
    `, [nextMoney.toString(), config.wallet.id]);

    await config.client.query(`
        INSERT INTO wallet_transactions
            (wallet_id, currency, transaction_type, amount, balance_after, reference_id, note)
        VALUES ($1, 'MONEY', $2, $3, $4, $5, $6);
    `, [
        config.wallet.id,
        config.transactionType,
        amount.toString(),
        nextMoney.toString(),
        config.referenceId || null,
        config.note || null,
    ]);

    return nextMoney.toString();
}

async function getPlayerLevel(playerId) {
    if (!playerId) return 1;
    const result = await dbPool.query(`SELECT player_level FROM players WHERE id = $1 LIMIT 1;`, [playerId]);
    return Math.max(1, parseInt(result.rows[0]?.player_level) || 1);
}

function decorateNpcCatalogItem(row, vendor) {
    return decorateMarketItem({
        ...row,
        vendor_key: vendor.key,
        vendor_name: vendor.name,
        vendor_role: vendor.role,
        rarity: 'COMMON',
        item_power: craftingService.calculateItemPower(row.shop_item_level || row.item_level || 1, 'COMMON'),
        item_level: row.shop_item_level || row.item_level || 1,
        quantity: 1,
    });
}

async function getVendorCatalog(config) {
    const { playerLevel, vendor } = config;
    const originPlaceholders = SHOP_ORIGINS.map((_, index) => `$${index + 3}`).join(', ');
    const result = await gameDataDb.query(`
        SELECT DISTINCT ON (code)
               id, code, display_name, category, tags, item_level, lifecycle_model,
               base_durability, base_duration_hours, is_stackable, max_stack,
               $1::INT AS shop_item_level
        FROM item_templates
        WHERE category = ANY($2::TEXT[])
          AND origin = ANY(ARRAY[${originPlaceholders}])
          AND item_level <= $1
          AND (
              $${SHOP_ORIGINS.length + 3}::TEXT[] = ARRAY[]::TEXT[]
              OR EXISTS (
                  SELECT 1
                  FROM UNNEST(tags) AS item_tag
                  WHERE item_tag = ANY($${SHOP_ORIGINS.length + 3}::TEXT[])
              )
          )
        ORDER BY code, item_level DESC
        LIMIT $${SHOP_ORIGINS.length + 4};
    `, [playerLevel, vendor.categories, ...SHOP_ORIGINS, vendor.tagHints || [], vendor.sellLimit]);

    return result.rows.map(row => decorateNpcCatalogItem(row, vendor));
}

async function getNpcShopCatalog(playerId, shopKey = null) {
    const playerLevel = await getPlayerLevel(playerId);
    const selectedVendor = getNpcVendorByKey(shopKey);
    if (shopKey && !selectedVendor) throw new Error('Shop not found.');

    const catalog = [];
    const vendors = selectedVendor ? [selectedVendor] : NPC_VENDOR_CONFIGS;

    for (const vendor of vendors) {
        catalog.push(...await getVendorCatalog({ playerLevel, vendor }));
    }

    return catalog.sort((a, b) => (
        a.vendor_key.localeCompare(b.vendor_key) ||
        String(a.category).localeCompare(String(b.category)) ||
        String(a.display_name).localeCompare(String(b.display_name))
    ));
}

async function isTemplateSoldByNpc(config) {
    const playerLevel = await getPlayerLevel(config.playerId);
    const catalog = await getNpcShopCatalog(config.playerId, config.shopKey);
    return catalog.some(item => (
        item.code === String(config.templateCode).toUpperCase() &&
        parseInt(item.item_level) <= playerLevel
    ));
}

function buildCreatedItem(config) {
    const rarity = 'COMMON';
    const itemLevel = getTemplateLevel(config.template);
    const itemPower = craftingService.calculateItemPower(itemLevel, rarity);
    const stats = itemStatsService.rollItemStats({
        category: config.template.category,
        itemPower,
        tags: config.template.tags,
    });

    return {
        rarity,
        itemLevel,
        itemPower,
        stats,
        curelBuffs: itemStatsService.rollItemCurelBuffs({ rarity }),
        expiresAt: itemLifecycleService.calculateExpiresAt(
            config.template.lifecycle_model,
            config.template.base_duration_hours
        ),
    };
}

async function buyNpcShopItem(config) {
    if (!config?.playerId || !config?.templateCode) throw new Error('Missing trading parameters.');

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        const isSold = await isTemplateSoldByNpc(config);
        if (!isSold) throw new Error('This item is not sold by the camp shop.');

        const templateResult = await client.query(`
            SELECT id, code, display_name, category, tags, item_level, lifecycle_model,
                   base_durability, base_duration_hours, is_stackable, max_stack
            FROM item_templates
            WHERE code = $1
            FOR SHARE;
        `, [String(config.templateCode).toUpperCase()]);
        if (templateResult.rows.length === 0) throw new Error('This item is not sold by the camp shop.');

        const playerLevel = await getPlayerLevel(config.playerId);
        const template = { ...templateResult.rows[0], item_level: playerLevel };
        const priceMoney = getNpcBuyPrice({
            ...template,
            rarity: 'COMMON',
            item_power: craftingService.calculateItemPower(template.item_level || 1, 'COMMON'),
            quantity: 1,
        });
        const wallet = await lockWallet({ client, playerId: config.playerId });
        await updateWalletMoney({
            client,
            wallet,
            deltaMoney: -priceMoney,
            transactionType: 'NPC_SHOP_BUY',
            note: `Bought ${template.display_name} from Refugee Camp.`,
        });

        const createdItem = buildCreatedItem({ template });
        const insertResult = await client.query(`
            INSERT INTO items
                (template_id, rarity, item_power, item_level, expires_at, max_durability, current_durability,
                 owner_player_id, source, quantity, curel_buffs,
                 stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value)
            VALUES ($1,$2,$3,$4,$5,$6,$6,$7,'npc_shop',1,$8::JSONB,$9,$10,$11,$12,$13,$14)
            RETURNING id;
        `, [
            template.id,
            createdItem.rarity,
            createdItem.itemPower,
            createdItem.itemLevel,
            createdItem.expiresAt,
            template.base_durability || 100,
            config.playerId,
            JSON.stringify(createdItem.curelBuffs),
            createdItem.stats.stat_1_type || null,
            createdItem.stats.stat_1_value || 0,
            createdItem.stats.stat_2_type || null,
            createdItem.stats.stat_2_value || 0,
            createdItem.stats.stat_3_type || null,
            createdItem.stats.stat_3_value || 0,
        ]);

        await client.query('COMMIT');
        return {
            item_id: insertResult.rows[0].id,
            item_name: template.display_name,
            price_money: priceMoney,
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function getOwnedItemForSale(config) {
    const result = await config.client.query(`
        SELECT i.*, it.code, it.display_name, it.category, it.tags, it.lifecycle_model,
               it.base_duration_hours, it.is_stackable, it.max_stack
        FROM items i
        JOIN item_templates it ON it.id = i.template_id
        WHERE i.id = $1
        FOR UPDATE;
    `, [config.itemId]);

    if (result.rows.length === 0) throw new Error('Item not found.');

    const item = result.rows[0];
    if (item.owner_player_id !== config.playerId) throw new Error('You do not own this item.');
    if (item.is_equipped) throw new Error('Equipped items cannot be traded.');
    if (item.expires_at && itemLifecycleService.isExpired(item.expires_at)) throw new Error('Expired items cannot be traded.');

    return item;
}

async function sellItemToNpc(config) {
    if (!config?.playerId || !config?.itemId) throw new Error('Missing trading parameters.');

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');
        const item = await getOwnedItemForSale({ client, playerId: config.playerId, itemId: config.itemId });
        const priceMoney = getNpcSellPrice(item);
        const vendor = getNpcVendorForItem(item);
        const wallet = await lockWallet({ client, playerId: config.playerId });

        await client.query(`DELETE FROM items WHERE id = $1;`, [config.itemId]);
        await updateWalletMoney({
            client,
            wallet,
            deltaMoney: priceMoney,
            transactionType: 'NPC_SHOP_SELL',
            note: `Sold ${item.display_name} to ${vendor?.name || 'Refugee Camp'}.`,
        });

        await client.query('COMMIT');
        return {
            item_name: item.display_name,
            price_money: priceMoney,
            vendor_name: vendor?.name || 'Refugee Camp',
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function recycleWasteItems(config) {
    if (!config?.playerId) throw new Error('Missing trading parameters.');

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(`
            SELECT i.*, it.code, it.display_name, it.category, it.tags, it.lifecycle_model,
                   it.base_duration_hours, it.is_stackable, it.max_stack
            FROM items i
            JOIN item_templates it ON it.id = i.template_id
            WHERE i.owner_player_id = $1
              AND i.is_equipped = FALSE
              AND (
                  EXISTS (
                      SELECT 1 FROM UNNEST(it.tags) AS item_tag
                      WHERE item_tag = ANY($2::TEXT[])
                  )
                  OR (
                      it.category IN ('MATERIAL', 'BUILDING')
                      AND it.origin = 'Loot-only'
                      AND NOT EXISTS (
                          SELECT 1
                          FROM recipe_ingredients ingredient
                          WHERE ingredient.material_template_id = it.id
                      )
                  )
              )
            FOR UPDATE;
        `, [config.playerId, WASTE_TAGS]);

        const recyclableItems = result.rows.filter(item => !item.expires_at || !itemLifecycleService.isExpired(item.expires_at));
        if (recyclableItems.length === 0) throw new Error('No recyclable waste or unused materials found.');

        const totalMoney = recyclableItems.reduce((total, item) => total + getNpcSellPrice(item), 0);
        const wallet = await lockWallet({ client, playerId: config.playerId });
        await client.query(`DELETE FROM items WHERE id = ANY($1::UUID[]);`, [recyclableItems.map(item => item.id)]);
        await updateWalletMoney({
            client,
            wallet,
            deltaMoney: totalMoney,
            transactionType: 'NPC_RECYCLE_SELL',
            note: `Recycled ${recyclableItems.length} unused material item(s) at Salvage Yard.`,
        });

        await client.query('COMMIT');
        return {
            items_sold: recyclableItems.length,
            price_money: totalMoney,
            vendor_name: 'Salvage Yard',
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function getBlackMarketListings(playerId) {
    const result = await dbPool.query(`
        SELECT ml.id AS listing_id, ml.seller_player_id, ml.item_id, ml.price_money,
               ml.created_at, p.character_name AS seller_name,
               i.rarity, i.item_power, i.item_level, i.quantity, i.curel_buffs,
               i.stat_1_type, i.stat_1_value, i.stat_2_type, i.stat_2_value, i.stat_3_type, i.stat_3_value,
               it.code, it.display_name, it.category, it.tags
        FROM market_listings ml
        JOIN items i ON i.id = ml.item_id
        JOIN item_templates it ON it.id = i.template_id
        JOIN players p ON p.id = ml.seller_player_id
        WHERE ml.status = 'ACTIVE'
        ORDER BY ml.created_at DESC
        LIMIT 80;
    `);

    return result.rows.map(row => ({
        ...decorateMarketItem(row),
        is_own_listing: row.seller_player_id === playerId,
        market_fee_rate: MARKET_TAX_RATE,
    }));
}

async function listBlackMarketItem(config) {
    if (!config?.playerId || !config?.itemId) throw new Error('Missing trading parameters.');

    const priceMoney = parsePositiveInt(config.priceMoney);
    if (priceMoney <= 0) throw new Error('Price must be greater than zero.');

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');
        const item = await getOwnedItemForSale({ client, playerId: config.playerId, itemId: config.itemId });
        const bounds = getMarketBounds(item);
        if (priceMoney < bounds.min_price || priceMoney > bounds.max_price) {
            throw new Error(`Price must be between ${bounds.min_price} and ${bounds.max_price} Money.`);
        }

        await client.query(`
            UPDATE items
            SET owner_player_id = NULL, is_equipped = FALSE, equip_slot = NULL
            WHERE id = $1;
        `, [config.itemId]);

        const listingResult = await client.query(`
            INSERT INTO market_listings (seller_player_id, item_id, price_money)
            VALUES ($1,$2,$3)
            RETURNING id;
        `, [config.playerId, config.itemId, priceMoney]);

        await client.query('COMMIT');
        return {
            listing_id: listingResult.rows[0].id,
            item_name: item.display_name,
            price_money: priceMoney,
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function buyBlackMarketListing(config) {
    if (!config?.playerId || !config?.listingId) throw new Error('Missing trading parameters.');

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        const listingResult = await client.query(`
            SELECT ml.*, i.owner_player_id, it.display_name
            FROM market_listings ml
            JOIN items i ON i.id = ml.item_id
            JOIN item_templates it ON it.id = i.template_id
            WHERE ml.id = $1
            FOR UPDATE;
        `, [config.listingId]);
        if (listingResult.rows.length === 0) throw new Error('Listing not found.');

        const listing = listingResult.rows[0];
        if (listing.status !== 'ACTIVE') throw new Error('Listing is no longer active.');
        if (listing.seller_player_id === config.playerId) throw new Error('You cannot buy your own listing.');
        if (listing.owner_player_id) throw new Error('Listing escrow is invalid.');

        const buyerWallet = await lockWallet({ client, playerId: config.playerId });
        const sellerWallet = await lockWallet({ client, playerId: listing.seller_player_id });
        const priceMoney = parseInt(listing.price_money);
        const taxMoney = Math.max(1, Math.floor(priceMoney * MARKET_TAX_RATE));
        const sellerPayout = priceMoney - taxMoney;

        await updateWalletMoney({
            client,
            wallet: buyerWallet,
            deltaMoney: -priceMoney,
            transactionType: 'MARKET_BUY',
            referenceId: listing.id,
            note: `Bought ${listing.display_name} from Black Market.`,
        });
        await updateWalletMoney({
            client,
            wallet: sellerWallet,
            deltaMoney: sellerPayout,
            transactionType: 'MARKET_SELL',
            referenceId: listing.id,
            note: `Sold ${listing.display_name} on Black Market. Fee ${taxMoney} Money.`,
        });

        await client.query(`
            UPDATE items
            SET owner_player_id = $1, source = 'market'
            WHERE id = $2;
        `, [config.playerId, listing.item_id]);
        await client.query(`
            UPDATE market_listings
            SET status = 'SOLD', buyer_player_id = $1, sold_at = NOW()
            WHERE id = $2;
        `, [config.playerId, listing.id]);

        await client.query('COMMIT');
        return {
            item_name: listing.display_name,
            price_money: priceMoney,
            tax_money: taxMoney,
            seller_payout: sellerPayout,
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function cancelBlackMarketListing(config) {
    if (!config?.playerId || !config?.listingId) throw new Error('Missing trading parameters.');

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');
        const listingResult = await client.query(`
            SELECT ml.*, it.display_name
            FROM market_listings ml
            JOIN items i ON i.id = ml.item_id
            JOIN item_templates it ON it.id = i.template_id
            WHERE ml.id = $1
            FOR UPDATE;
        `, [config.listingId]);
        if (listingResult.rows.length === 0) throw new Error('Listing not found.');

        const listing = listingResult.rows[0];
        if (listing.seller_player_id !== config.playerId) throw new Error('Only the seller can cancel this listing.');
        if (listing.status !== 'ACTIVE') throw new Error('Listing is no longer active.');

        await client.query(`
            UPDATE items
            SET owner_player_id = $1
            WHERE id = $2;
        `, [config.playerId, listing.item_id]);
        await client.query(`
            UPDATE market_listings
            SET status = 'CANCELLED', cancelled_at = NOW()
            WHERE id = $1;
        `, [listing.id]);

        await client.query('COMMIT');
        return {
            item_name: listing.display_name,
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    NPC_VENDOR_CONFIGS,
    NPC_VENDOR_KEYS,
    MARKET_TAX_RATE,
    getNpcShopList,
    getNpcShopCatalog,
    buyNpcShopItem,
    sellItemToNpc,
    recycleWasteItems,
    getBlackMarketListings,
    listBlackMarketItem,
    buyBlackMarketListing,
    cancelBlackMarketListing,
    calculateBaseValue,
    getNpcBuyPrice,
    getNpcSellPrice,
    getMarketBounds,
};

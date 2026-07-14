// backend/src/repositories/repositories.starterGear.js

const craftingService = require('../services/services.crafting');
const itemStatsService = require('../services/services.itemStats');

const ARMOR_PART_CODES = ['HEAD', 'UPPERBODY', 'LOWERBODY', 'HAND', 'LEG', 'VEST'];

const STARTER_GEAR_CONFIG = {
    fighting: {
        armorPrefix: 'COMBATING',
        weaponCode: 'MACHETE',
    },
    scavenging: {
        armorPrefix: 'SCAVENGING',
        weaponCode: 'DAGGER',
    },
    gathering: {
        armorPrefix: 'GATHERING',
        weaponCode: 'BOW',
    },
    cooking: {
        armorPrefix: 'COOKING',
        weaponCode: 'DAGGER',
    },
    crafting: {
        armorPrefix: 'CRAFTING',
        weaponCode: 'CLUB',
    },
    building: {
        armorPrefix: 'BUILDING',
        weaponCode: 'SPEAR',
    },
};

function getStarterTemplateCodes(jobCode) {
    const starterConfig = STARTER_GEAR_CONFIG[jobCode] || STARTER_GEAR_CONFIG.fighting;
    const armorCodes = ARMOR_PART_CODES.map(partCode => `${starterConfig.armorPrefix}_${partCode}`);
    return [...armorCodes, starterConfig.weaponCode];
}

function getEquipSlot(template) {
    const tags = (template.tags || []).map(tag => String(tag).toLowerCase());

    if (tags.includes('weapon')) return 'weapon';
    if (tags.includes('tool')) return 'tool';
    if (tags.includes('backpack')) return 'backpack';
    if (tags.includes('ring')) return 'ring';
    if (tags.includes('necklace')) return 'necklace';
    if (tags.includes('jewelry')) return 'accessory';
    if (tags.includes('head') || tags.includes('helmet')) return 'head';
    if (tags.includes('hand') || tags.includes('gloves')) return 'hands';
    if (tags.includes('leg') || tags.includes('boots')) return 'feet';
    if (tags.includes('lowerbody') || tags.includes('pants')) return 'lower_body';
    if (tags.includes('upperbody')) return 'upper_body';
    if (tags.includes('vest') || tags.includes('armor')) return 'vest';

    return 'upper_body';
}

function buildStarterItemRow(config) {
    const { playerId, template } = config;
    const rarity = 'COMMON';
    const itemLevel = Math.max(1, parseInt(template.item_level) || 1);
    const itemPower = craftingService.calculateItemPower(itemLevel, rarity);
    const rolledStats = itemStatsService.rollItemStats({
        category: template.category,
        itemPower,
        tags: template.tags,
    });
    const curelBuffs = itemStatsService.rollItemCurelBuffs({ rarity });

    return {
        playerId,
        templateId: template.id,
        rarity,
        itemPower,
        itemLevel,
        maxDurability: template.base_durability || 100,
        equipSlot: getEquipSlot(template),
        stats: rolledStats,
        curelBuffs,
    };
}

async function findStarterTemplates(config, client) {
    const templateCodes = getStarterTemplateCodes(config.jobCode);
    const result = await client.query(`
        SELECT id, code, display_name, category, tags, item_level, base_durability
        FROM item_templates
        WHERE code = ANY($1::TEXT[])
        ORDER BY array_position($1::TEXT[], code);
    `, [templateCodes]);

    return result.rows;
}

async function insertStarterItem(config, client) {
    const row = buildStarterItemRow(config);
    const result = await client.query(`
        INSERT INTO items
            (template_id, rarity, item_power, item_level, max_durability, current_durability,
             owner_player_id, source, quantity, is_equipped, equip_slot,
             curel_buffs, stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value)
        VALUES ($1,$2,$3,$4,$5,$5,$6,'starter',1,TRUE,$7,$8::JSONB,$9,$10,$11,$12,$13,$14)
        RETURNING id;
    `, [
        row.templateId,
        row.rarity,
        row.itemPower,
        row.itemLevel,
        row.maxDurability,
        row.playerId,
        row.equipSlot,
        JSON.stringify(row.curelBuffs),
        row.stats.stat_1_type || null,
        row.stats.stat_1_value || 0,
        row.stats.stat_2_type || null,
        row.stats.stat_2_value || 0,
        row.stats.stat_3_type || null,
        row.stats.stat_3_value || 0,
    ]);

    return result.rows[0]?.id || null;
}

async function grantStarterGear(config, client) {
    if (!config?.playerId || !config?.jobCode || !client) return [];

    const starterTemplates = await findStarterTemplates(config, client);
    const grantedItems = [];

    for (const template of starterTemplates) {
        const itemId = await insertStarterItem({ playerId: config.playerId, template }, client);
        if (itemId) {
            grantedItems.push({
                id: itemId,
                code: template.code,
                displayName: template.display_name,
                equipSlot: getEquipSlot(template),
            });
        }
    }

    return grantedItems;
}

module.exports = {
    grantStarterGear,
    getStarterTemplateCodes,
    STARTER_GEAR_CONFIG,
};

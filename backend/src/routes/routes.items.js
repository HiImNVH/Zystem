// backend/src/routes/routes.items.js
// Endpoint quan ly vat pham: ho tro tags/source theo data design

const express = require('express');
const itemsRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const craftingService = require('../services/services.crafting');
const curelPowerService = require('../services/services.curelPower');
const itemStatsService = require('../services/services.itemStats');
const itemLifecycleService = require('../services/services.itemLifecycle');
const playerEventsService = require('../services/services.playerEvents');

function calculateFoodRestore(item) {
    const tags = (item.tags || []).map(tag => String(tag).toLowerCase());
    const level = parseInt(item.item_level) || 1;
    let energyRestore = 12 + Math.floor(level * 1.5);

    if (tags.includes('raw')) {
        energyRestore = Math.max(4, Math.floor(energyRestore * 0.6));
    }
    if (tags.includes('processed') || tags.includes('dried') || tags.includes('smoked')) {
        energyRestore += 4;
    }
    if (tags.includes('canned')) {
        energyRestore += 8;
    }

    return { energyRestore };
}

function getEquipSlot(item) {
    const tags = (item.tags || []).map(tag => tag.toLowerCase());

    if (item.category === 'WEAPON') return 'weapon';
    if (item.category === 'TOOL') return 'tool';
    if (tags.includes('backpack')) return 'backpack';
    if (tags.includes('jewelry')) return 'accessory_1';
    if (tags.includes('helmet')) return 'head';
    if (tags.includes('gloves')) return 'hands';
    if (tags.includes('boots')) return 'feet';
    if (tags.includes('pants')) return 'lower_body';
    if (tags.includes('armor')) return 'armor';

    return 'upper_body';
}

function normalizeIngredientSelections(ingredients) {
    if (!Array.isArray(ingredients)) return [];

    return ingredients
        .map(selection => ({
            slotIndex: parseInt(selection.slotIndex ?? selection.slot_index),
            itemId: selection.itemId ?? selection.item_id,
        }))
        .filter(selection => Number.isInteger(selection.slotIndex) && selection.slotIndex > 0 && selection.itemId);
}

function getCraftPayload(req) {
    return {
        playerId: req.body.playerId,
        recipeCode: req.body.recipeCode || req.body.code,
        ingredients: normalizeIngredientSelections(req.body.ingredients || req.body.ingredientSelections),
    };
}

/**
 * @route   GET /api/items/templates
 * @desc    Lay danh sach toan bo item template (catalog)
 * @query   ?category=WEAPON
 */
itemsRouter.get('/templates', verifyToken, async (req, res, next) => {
    const { category } = req.query;

    let sqlQuery = `SELECT * FROM item_templates`;
    const sqlValues = [];

    if (category) {
        sqlQuery += ` WHERE category = $1`;
        sqlValues.push(category.toUpperCase());
    }

    sqlQuery += ` ORDER BY item_level ASC, category ASC;`;

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

itemsRouter.get('/recipes', verifyToken, async (req, res, next) => {
    try {
        const result = await dbPool.query(`
            SELECT
                r.id, r.code, r.recipe_number, r.output_category, r.output_qty,
                r.required_job_level, r.base_craft_time_s, r.workstation_access,
                r.required_tool_name, r.tool_durability_cost, r.output_level_formula,
                r.workstation_queue_slot, r.curel_rule_key, r.design_notes,
                r.main_material_slots, r.curel_mechanic, r.required_use_case_tags,
                it.display_name AS output_item_name,
                it.item_level AS output_item_level,
                it.tags AS output_item_tags,
                js.code AS required_job_code,
                js.display_name AS required_job_name
            FROM recipes r
            JOIN item_templates it ON it.id = r.output_template_id
            LEFT JOIN jobs_seed js ON js.id = r.required_job_id
            ORDER BY r.recipe_number ASC;
        `);

        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

itemsRouter.get('/recipes/:code', verifyToken, async (req, res, next) => {
    try {
        const recipeResult = await dbPool.query(`
            SELECT
                r.*,
                it.display_name AS output_item_name,
                it.item_level AS output_item_level,
                it.tags AS output_item_tags,
                js.code AS required_job_code,
                js.display_name AS required_job_name
            FROM recipes r
            JOIN item_templates it ON it.id = r.output_template_id
            LEFT JOIN jobs_seed js ON js.id = r.required_job_id
            WHERE r.code = $1;
        `, [req.params.code.toUpperCase()]);

        if (recipeResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Recipe not found.' });
        }

        const inputResult = await dbPool.query(`
            SELECT slot_index, tag_query, quantity
            FROM recipe_tag_inputs
            WHERE recipe_id = $1
            ORDER BY slot_index ASC;
        `, [recipeResult.rows[0].id]);

        return res.json({
            success: true,
            data: {
                ...recipeResult.rows[0],
                inputs: inputResult.rows,
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/items/player/:playerId
 * @desc    Lay toan bo inventory cua nhan vat
 * @query   ?equipped=true (chi lay do dang mac)
 */
itemsRouter.get('/player/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;
    const { equipped } = req.query;

    let sqlQuery = `
        SELECT i.*, it.display_name, it.category, it.tags, it.description, it.note,
               it.origin, COALESCE(i.item_level, it.item_level) AS item_level, it.is_stackable,
               it.lifecycle_model, it.base_duration_hours, it.lifecycle_note,
               CASE
                   WHEN i.expires_at IS NULL
                    AND it.base_duration_hours > 0
                    AND LOWER(it.lifecycle_model) LIKE '%duration%'
                   THEN i.created_at + (it.base_duration_hours || ' hours')::INTERVAL
                   ELSE i.expires_at
               END AS computed_expires_at
        FROM items i
        JOIN item_templates it ON i.template_id = it.id
        WHERE i.owner_player_id = $1
    `;
    const sqlValues = [playerId];

    if (equipped === 'true') {
        sqlQuery += ` AND i.is_equipped = TRUE`;
    }

    sqlQuery += ` ORDER BY it.category ASC, COALESCE(i.item_level, it.item_level) DESC;`;

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);

        const inventoryItems = result.rows.map(item => {
            const { item_power, ...visibleItem } = item;
            return itemLifecycleService.decorateItemLifecycle(visibleItem);
        });

        return res.json({ success: true, data: inventoryItems });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/items/equip
 * @body    { playerId, itemId }
 * @desc    Trang bi vat pham — kiem tra equip requirement (PlayerLevel >= ItemLevel)
 */
itemsRouter.post('/equip', verifyToken, async (req, res, next) => {
    const { playerId, itemId } = req.body;

    if (!playerId || !itemId) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId and itemId.'
        });
    }

    try {
        // Lay thong tin item va template
        const itemResult = await dbPool.query(`
            SELECT i.*, COALESCE(i.item_level, it.item_level) AS item_level,
                   it.display_name, it.category, it.tags, it.base_durability
            FROM items i
            JOIN item_templates it ON i.template_id = it.id
            WHERE i.id = $1 AND i.owner_player_id = $2;
        `, [itemId, playerId]);

        if (itemResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Item not found.' });
        }

        const item = itemResult.rows[0];

        // Lay player level de kiem tra equip requirement
        const playerResult = await dbPool.query(
            `SELECT player_level FROM players WHERE id = $1;`,
            [playerId]
        );

        if (playerResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        const playerLevel = playerResult.rows[0].player_level;

        // Luat CUREL: PlayerLevel >= ItemLevel (khong tinh do hiem)
        if (playerLevel < item.item_level) {
            return res.status(400).json({
                success: false,
                message: `Player Level >= ${item.item_level} is required to equip ${item.display_name}. Current Player Level: ${playerLevel}.`
            });
        }

        // Xac dinh slot trang bi dua theo category
        const equipSlot = getEquipSlot(item);

        // Thao do cu trong cung slot (neu co)
        await dbPool.query(
            `UPDATE items SET is_equipped = FALSE, equip_slot = NULL WHERE owner_player_id = $1 AND equip_slot = $2;`,
            [playerId, equipSlot]
        );

        // Trang bi do moi
        await dbPool.query(
            `UPDATE items SET is_equipped = TRUE, equip_slot = $1 WHERE id = $2;`,
            [equipSlot, itemId]
        );
        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'ITEM_EQUIPPED',
            source: 'Zystem',
            title: 'Item Equipped',
            message: `Equipped ${item.display_name}.`,
            payload: { item_id: itemId, item_name: item.display_name, equip_slot: equipSlot },
        });

        return res.json({
            success: true,
            message: `Equipped ${item.display_name} into slot [${equipSlot}].`,
            data: { item_id: itemId, equip_slot: equipSlot }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/items/craft
 * @body    { playerId, recipeCode, ingredients: [{ slotIndex, itemId }] }
 * @desc    Craft item tu recipe va nguyen lieu trong inventory.
 */
itemsRouter.post('/craft', verifyToken, async (req, res, next) => {
    const { playerId, recipeCode, ingredients } = getCraftPayload(req);

    if (!playerId || !recipeCode || ingredients.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId, recipeCode, ingredients.',
        });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        const ownerCheck = await client.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );
        if (ownerCheck.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }
        if (ownerCheck.rows[0].account_id !== req.accountId) {
            await client.query('ROLLBACK');
            return res.status(403).json({ success: false, message: 'You do not have permission to craft for this character.' });
        }

        const recipeResult = await client.query(`
            SELECT r.*, it.item_level AS template_item_level, it.display_name AS output_item_name,
                   it.category AS output_template_category, it.base_durability,
                   it.lifecycle_model, it.base_duration_hours,
                   js.code AS required_job_code
            FROM recipes r
            JOIN item_templates it ON it.id = r.output_template_id
            LEFT JOIN jobs_seed js ON js.id = r.required_job_id
            WHERE r.code = $1;
        `, [String(recipeCode).toUpperCase()]);

        if (recipeResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Recipe not found.' });
        }

        const recipe = recipeResult.rows[0];
        let craftJobLevel = 80;
        if (recipe.required_job_code) {
            const jobResult = await client.query(`
                SELECT pj.job_level
                FROM player_jobs pj
                JOIN jobs_seed js ON pj.job_id = js.id
                WHERE pj.player_id = $1 AND js.code = $2;
            `, [playerId, recipe.required_job_code]);
            craftJobLevel = parseInt(jobResult.rows[0]?.job_level) || 0;
        }

        if (craftJobLevel < (parseInt(recipe.required_job_level) || 1)) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                success: false,
                message: `Crafting level ${recipe.required_job_level} is required for ${recipe.output_item_name}.`,
            });
        }

        const inputResult = await client.query(`
            SELECT slot_index, tag_query, quantity
            FROM recipe_tag_inputs
            WHERE recipe_id = $1
            ORDER BY slot_index ASC;
        `, [recipe.id]);

        const selectedItems = [];
        for (const input of inputResult.rows) {
            const selection = ingredients.find(item => item.slotIndex === parseInt(input.slot_index));
            if (!selection) {
                await client.query('ROLLBACK');
                return res.status(400).json({ success: false, message: `Missing ingredient for slot ${input.slot_index}.` });
            }

            const itemResult = await client.query(`
                SELECT i.id, i.quantity, i.rarity, COALESCE(i.item_level, it.item_level) AS item_level,
                       it.category, it.display_name, it.tags
                FROM items i
                JOIN item_templates it ON i.template_id = it.id
                WHERE i.id = $1 AND i.owner_player_id = $2
                FOR UPDATE;
            `, [selection.itemId, playerId]);

            if (itemResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return res.status(404).json({ success: false, message: `Ingredient not found for slot ${input.slot_index}.` });
            }

            const item = itemResult.rows[0];
            const requiredQty = parseInt(input.quantity) || 1;
            if (!craftingService.itemMatchesIngredientQuery(item, input.tag_query)) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    success: false,
                    message: `${item.display_name} does not match slot ${input.slot_index}: ${input.tag_query}.`,
                });
            }

            if ((parseInt(item.quantity) || 0) < requiredQty) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    success: false,
                    message: `${item.display_name} needs quantity ${requiredQty}, current ${item.quantity}.`,
                });
            }

            selectedItems.push({
                ...item,
                slot_index: parseInt(input.slot_index),
                required_quantity: requiredQty,
                tag_query: input.tag_query,
            });
        }

        const craftingPower = await curelPowerService.calculatePlayerCurelPower(playerId, 'CRAFTING');
        const outputLevel = craftingService.calculateRecipeOutputItemLevel(recipe, selectedItems, craftJobLevel);
        const rarity = craftingService.resolveCraftedRarity(recipe, selectedItems, craftingPower);
        const itemPower = craftingService.calculateItemPower(outputLevel, rarity);
        const outputCategory = (recipe.output_category || recipe.output_template_category || '').toUpperCase();
        const rolledStats = itemStatsService.rollItemStats(outputCategory, itemPower, rarity);
        const expiresAt = itemLifecycleService.calculateExpiresAt(recipe.lifecycle_model, recipe.base_duration_hours);

        for (const item of selectedItems) {
            if (parseInt(item.quantity) > item.required_quantity) {
                await client.query(`UPDATE items SET quantity = quantity - $1 WHERE id = $2;`, [item.required_quantity, item.id]);
            } else {
                await client.query(`DELETE FROM items WHERE id = $1;`, [item.id]);
            }
        }

        const createdItem = await client.query(`
            INSERT INTO items
                (template_id, rarity, item_power, item_level, expires_at, max_durability, current_durability,
                 owner_player_id, source, quantity, crafted_by_player_id, crafted_at,
                 stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value)
            VALUES ($1,$2,$3,$4,$5,$6,$6,$7,'craft',$8,$7,NOW(),$9,$10,$11,$12,$13,$14)
            RETURNING *;
        `, [
            recipe.output_template_id,
            rarity,
            itemPower,
            outputLevel,
            expiresAt,
            recipe.base_durability || 100,
            playerId,
            recipe.output_qty || 1,
            rolledStats.stat_1_type || null,
            rolledStats.stat_1_value || 0,
            rolledStats.stat_2_type || null,
            rolledStats.stat_2_value || 0,
            rolledStats.stat_3_type || null,
            rolledStats.stat_3_value || 0,
        ]);

        await client.query('COMMIT');
        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'ITEM_CRAFTED',
            source: 'Zystem',
            title: 'Craft Successful',
            message: `Crafted ${recipe.output_item_name}.`,
            payload: {
                item_id: createdItem.rows[0]?.id,
                item_name: recipe.output_item_name,
                output_level: outputLevel,
                rarity,
                consumed_items: selectedItems.map(item => ({
                    id: item.id,
                    name: item.display_name,
                    quantity: item.required_quantity,
                    slot_index: item.slot_index,
                })),
            },
        });

        return res.status(201).json({
            success: true,
            message: `Crafted ${recipe.output_item_name}.`,
            data: {
                item: createdItem.rows[0],
                output_item_name: recipe.output_item_name,
                output_level: outputLevel,
                rarity,
                consumed_items: selectedItems.map(item => ({
                    id: item.id,
                    name: item.display_name,
                    quantity: item.required_quantity,
                    slot_index: item.slot_index,
                })),
            },
        });
    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
});

/**
 * @route   POST /api/items/use-food
 * @body    { playerId, itemId }
 * @desc    Dung 1 food item de hoi energy.
 */
itemsRouter.post('/use-food', verifyToken, async (req, res, next) => {
    const { playerId, itemId } = req.body;

    if (!playerId || !itemId) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId and itemId.'
        });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        const ownerCheck = await client.query(
            `SELECT account_id FROM players WHERE id = $1 FOR UPDATE;`,
            [playerId]
        );
        if (ownerCheck.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }
        if (ownerCheck.rows[0].account_id !== req.accountId) {
            await client.query('ROLLBACK');
            return res.status(403).json({ success: false, message: 'You do not have permission to use items for this character.' });
        }

        const itemResult = await client.query(`
            SELECT i.id, i.quantity, it.display_name, it.category, it.tags,
                   COALESCE(i.item_level, it.item_level) AS item_level,
                   CASE
                       WHEN i.expires_at IS NULL
                        AND it.base_duration_hours > 0
                        AND LOWER(it.lifecycle_model) LIKE '%duration%'
                       THEN i.created_at + (it.base_duration_hours || ' hours')::INTERVAL
                       ELSE i.expires_at
                   END AS computed_expires_at,
                   it.lifecycle_model, it.base_duration_hours
            FROM items i
            JOIN item_templates it ON i.template_id = it.id
            WHERE i.id = $1 AND i.owner_player_id = $2
            FOR UPDATE;
        `, [itemId, playerId]);

        if (itemResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Item not found.' });
        }

        const item = itemResult.rows[0];
        if ((item.category || '').toUpperCase() !== 'FOOD') {
            await client.query('ROLLBACK');
            return res.status(400).json({ success: false, message: 'Only food items can restore energy.' });
        }
        if (itemLifecycleService.isExpired(item.computed_expires_at)) {
            await client.query('ROLLBACK');
            return res.status(400).json({ success: false, message: `${item.display_name} is expired and cannot restore energy.` });
        }

        const restore = calculateFoodRestore(item);
        const updatedPlayer = await client.query(`
            UPDATE players
            SET current_energy = LEAST(max_energy, current_energy + $1),
                updated_at = NOW()
            WHERE id = $2
            RETURNING current_energy, max_energy;
        `, [restore.energyRestore, playerId]);

        if (item.quantity > 1) {
            await client.query(`UPDATE items SET quantity = quantity - 1 WHERE id = $1;`, [itemId]);
        } else {
            await client.query(`DELETE FROM items WHERE id = $1;`, [itemId]);
        }

        await client.query('COMMIT');
        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'FOOD_USED',
            source: 'Zystem',
            title: 'Food Used',
            message: `Ate ${item.display_name}. Energy +${restore.energyRestore}.`,
            payload: {
                item_id: itemId,
                item_name: item.display_name,
                energy_restored: restore.energyRestore,
            },
        });

        return res.json({
            success: true,
            message: `Ate ${item.display_name}.`,
            data: {
                item_id: itemId,
                item_name: item.display_name,
                energy_restored: restore.energyRestore,
                player_resources: updatedPlayer.rows[0]
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        next(error);
    } finally {
        client.release();
    }
});

/**
 * @route   POST /api/items/unequip
 * @body    { playerId, itemId }
 * @desc    Thao trang bi
 */
itemsRouter.post('/unequip', verifyToken, async (req, res, next) => {
    const { playerId, itemId } = req.body;

    if (!playerId || !itemId) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId and itemId.'
        });
    }

    try {
        const result = await dbPool.query(`
            UPDATE items
            SET is_equipped = FALSE, equip_slot = NULL
            WHERE id = $1 AND owner_player_id = $2
            RETURNING *;
        `, [itemId, playerId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Item not found.' });
        }

        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'ITEM_UNEQUIPPED',
            source: 'Zystem',
            title: 'Item Unequipped',
            message: 'Equipment removed.',
            payload: { item_id: itemId },
        });

        return res.json({ success: true, message: 'Equipment removed.', data: result.rows[0] });
    } catch (error) {
        next(error);
    }
});


/**
 * @route   GET /api/items/player/:playerId/equipped
 * @desc    Lay danh sach item dang trang bi, gom nhom theo slot — dung cho UI paper-doll
 * @access  Protected
 */
itemsRouter.get('/player/:playerId/equipped', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const result = await dbPool.query(`
            SELECT i.*, it.display_name, it.category, it.tags,
                   COALESCE(i.item_level, it.item_level) AS item_level,
                   it.lifecycle_model, it.base_duration_hours, it.lifecycle_note,
                   CASE
                       WHEN i.expires_at IS NULL
                        AND it.base_duration_hours > 0
                        AND LOWER(it.lifecycle_model) LIKE '%duration%'
                       THEN i.created_at + (it.base_duration_hours || ' hours')::INTERVAL
                       ELSE i.expires_at
                   END AS computed_expires_at
            FROM items i
            JOIN item_templates it ON i.template_id = it.id
            WHERE i.owner_player_id = $1 AND i.is_equipped = TRUE
            ORDER BY i.equip_slot ASC;
        `, [playerId]);

        const visibleItems = result.rows.map(item => {
            const { item_power, ...visibleItem } = item;
            return itemLifecycleService.decorateItemLifecycle(visibleItem);
        });

        // Gom theo slot de frontend de render paper-doll
        const bySlot = {};
        visibleItems.forEach(item => { bySlot[item.equip_slot] = item; });

        return res.json({ success: true, data: bySlot });
    } catch (error) {
        next(error);
    }
});

module.exports = itemsRouter;

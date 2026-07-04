// backend/src/services/services.loot.js

const { dbPool } = require('../repositories/repositories.database');
const craftingService = require('./services.crafting');
const itemStatsService = require('./services.itemStats');

const ACTION_DROP_POOL = {
    MINE:    ['MATERIAL'],
    CHOP:    ['MATERIAL'],
    HUNT:    ['MATERIAL'],
    FORAGE:  ['MATERIAL'],
    EXPLORE: ['RUBBISH', 'MATERIAL', 'WEAPON', 'EQUIPMENT', 'TOOL'],
    BATTLE:  ['RUBBISH', 'MATERIAL', 'WEAPON', 'EQUIPMENT', 'TOOL'],
    CRAFT:   ['WEAPON', 'EQUIPMENT', 'TOOL', 'BUILDING'],
    FARM:    ['MATERIAL'],
};

const ACTION_DROP_ORIGINS = {
    CRAFT: ['Craftable'],
};

function calculateDropCount(actionType, durationSeconds) {
    const baseCount = {
        MINE:    1,
        CHOP:    1,
        HUNT:    1,
        FORAGE:  1,
        EXPLORE: 2,
        BATTLE:  2,
        CRAFT:   1,
        FARM:    1,
    };
    const base = baseCount[actionType] || 1;
    const timeBonus = Math.floor(durationSeconds / 300);
    return Math.min(base + timeBonus, 5);
}

async function getCandidateTemplates(categories, zoneMinLevel, origins) {
    if (!categories || categories.length === 0) return [];

    const maxLevel = Math.max(1, (zoneMinLevel || 1) + 5);
    const minLevel = Math.max(1, (zoneMinLevel || 1) - 5);
    const allowedOrigins = origins || ['Gatherable', 'Loot-only'];
    const categoryPlaceholders = categories.map((_, index) => `$${index + 1}`).join(', ');
    const originOffset = categories.length;
    const originPlaceholders = allowedOrigins.map((_, index) => `$${originOffset + index + 1}`).join(', ');
    const sqlQuery = `
        SELECT id, category, item_level, drop_weight_common, drop_weight_uncommon,
               drop_weight_rare, drop_weight_epic, drop_weight_legendary
        FROM item_templates
        WHERE category = ANY(ARRAY[${categoryPlaceholders}])
          AND origin = ANY(ARRAY[${originPlaceholders}])
          AND item_level BETWEEN $${categories.length + allowedOrigins.length + 1} AND $${categories.length + allowedOrigins.length + 2};
    `;

    try {
        const result = await dbPool.query(sqlQuery, [...categories, ...allowedOrigins, minLevel, maxLevel]);
        return result.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi lay candidate templates:', error.message);
        return [];
    }
}

function rollOneItem(candidates, crafterDex) {
    if (!candidates || candidates.length === 0) return null;

    const template = candidates[Math.floor(Math.random() * candidates.length)];
    const rarity = craftingService.rollCurelRarity(template.item_level);
    const itemPower = craftingService.calculateItemPower(template.item_level, rarity);
    const rolledStats = itemStatsService.rollItemStats(template.category, itemPower, rarity);

    return {
        templateId: template.id,
        itemLevel: template.item_level,
        rarity,
        itemPower,
        ...rolledStats
    };
}

async function insertDroppedItems(playerId, droppedItems, actionId) {
    if (!droppedItems || droppedItems.length === 0) return [];

    const insertedItems = [];

    for (const item of droppedItems) {
        try {
            const result = await dbPool.query(`
                INSERT INTO items
                    (template_id, rarity, item_power, owner_player_id, source, quantity,
                     stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value)
                VALUES ($1, $2, $3, $4, 'drop', 1, $5, $6, $7, $8, $9, $10)
                RETURNING id, template_id, rarity, item_power,
                          stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value;
            `, [
                item.templateId, item.rarity, item.itemPower, playerId,
                item.stat_1_type || null, item.stat_1_value || 0,
                item.stat_2_type || null, item.stat_2_value || 0,
                item.stat_3_type || null, item.stat_3_value || 0
            ]);

            insertedItems.push(result.rows[0]);
        } catch (error) {
            console.error('[ERROR] Loi khi insert dropped item:', error.message);
        }
    }

    if (insertedItems.length > 0) {
        await dbPool.query(
            `UPDATE action_queue SET loot_snapshot = $1 WHERE id = $2;`,
            [JSON.stringify(insertedItems), actionId]
        ).catch(error => console.error('[WARN] Loi khi luu loot_snapshot:', error.message));
    }

    return insertedItems;
}

async function processLootDrop(playerId, claimedAction, playerDex) {
    const actionType = claimedAction.action_type?.toUpperCase();
    const categories = ACTION_DROP_POOL[actionType];

    if (!categories || categories.length === 0) {
        return { items_dropped: [] };
    }

    const zoneMinLevel = claimedAction.zone_min_level || 1;
    const dropCount = calculateDropCount(actionType, claimedAction.actual_duration_s);
    const candidates = await getCandidateTemplates(categories, zoneMinLevel, ACTION_DROP_ORIGINS[actionType]);

    if (candidates.length === 0) {
        return { items_dropped: [] };
    }

    const droppedItems = [];
    for (let index = 0; index < dropCount; index++) {
        if (Math.random() > 0.70) continue;
        const item = rollOneItem(candidates, playerDex);
        if (item) droppedItems.push(item);
    }

    const savedItems = await insertDroppedItems(playerId, droppedItems, claimedAction.id);

    if (savedItems.length > 0) {
        console.log(`[SUCCESS] Drop ${savedItems.length} item cho player ${playerId} tu action ${actionType}`);
    }

    return { items_dropped: savedItems };
}

module.exports = {
    processLootDrop,
    calculateDropCount,
    rollOneItem
};

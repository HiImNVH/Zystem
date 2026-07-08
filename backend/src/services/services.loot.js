// backend/src/services/services.loot.js

const { dbPool } = require('../repositories/repositories.database');
const craftingService = require('./services.crafting');
const itemStatsService = require('./services.itemStats');
const curelPowerService = require('./services.curelPower');
const itemLifecycleService = require('./services.itemLifecycle');

const ACTION_DROP_POOL = {
    MINE:    ['MATERIAL'],
    CHOP:    ['MATERIAL'],
    HUNT:    ['MATERIAL'],
    FORAGE:  ['MATERIAL'],
    EXPLORE: ['RUBBISH', 'MATERIAL', 'WEAPON', 'EQUIPMENT', 'TOOL'],
    BATTLE:  ['RUBBISH', 'MATERIAL', 'WEAPON', 'EQUIPMENT', 'TOOL'],
    SWEEP:   ['RUBBISH', 'MATERIAL', 'WEAPON', 'EQUIPMENT', 'TOOL'],
    DUNGEON: ['RUBBISH', 'MATERIAL', 'WEAPON', 'EQUIPMENT', 'TOOL'],
    CRAFT:   ['WEAPON', 'EQUIPMENT', 'TOOL', 'BUILDING'],
    FARM:    ['MATERIAL'],
};

const ACTION_DROP_ORIGINS = {
    CRAFT: ['Craftable'],
};

const DEFAULT_DROP_ORIGINS = ['Gatherable', 'Loot-only'];

function calculateDropCount(actionType, durationSeconds) {
    const baseCount = {
        MINE:    1,
        CHOP:    1,
        HUNT:    1,
        FORAGE:  1,
        EXPLORE: 2,
        BATTLE:  2,
        SWEEP:   3,
        DUNGEON: 3,
        CRAFT:   1,
        FARM:    1,
    };
    const base = baseCount[actionType] || 1;
    const timeBonus = Math.floor(durationSeconds / 300);
    return Math.min(base + timeBonus, 5);
}

async function getCandidateTemplates(config) {
    const { categories, zoneMinLevel, origins, maxLevelOffset = 5, allowAboveMapLevel = true } = config;
    if (!categories || categories.length === 0) return [];

    const mapLevel = Math.max(1, zoneMinLevel || 1);
    const allowedOrigins = origins || DEFAULT_DROP_ORIGINS;
    const categoryPlaceholders = categories.map((_, index) => `$${index + 1}`).join(', ');
    const originOffset = categories.length;
    const originPlaceholders = allowedOrigins.map((_, index) => `$${originOffset + index + 1}`).join(', ');
    const sqlQuery = `
        SELECT id, category, item_level, lifecycle_model, base_duration_hours,
               drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic, drop_weight_legendary
        FROM item_templates
        WHERE category = ANY(ARRAY[${categoryPlaceholders}])
          AND origin = ANY(ARRAY[${originPlaceholders}])
          AND item_level = $${categories.length + allowedOrigins.length + 1};
    `;

    try {
        const exactResult = await dbPool.query(sqlQuery, [...categories, ...allowedOrigins, mapLevel]);
        if (exactResult.rows.length > 0) return exactResult.rows;

        const fallbackQuery = `
            SELECT id, category, item_level, lifecycle_model, base_duration_hours,
                   drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic, drop_weight_legendary
            FROM item_templates
            WHERE category = ANY(ARRAY[${categoryPlaceholders}])
              AND origin = ANY(ARRAY[${originPlaceholders}])
              AND item_level BETWEEN $${categories.length + allowedOrigins.length + 1} AND $${categories.length + allowedOrigins.length + 2}
            ORDER BY ABS(item_level - $${categories.length + allowedOrigins.length + 3}) ASC
            LIMIT 50;
        `;
        const minLevel = Math.max(1, mapLevel - maxLevelOffset);
        const maxLevel = allowAboveMapLevel ? mapLevel + maxLevelOffset : mapLevel;
        const fallbackResult = await dbPool.query(fallbackQuery, [...categories, ...allowedOrigins, minLevel, maxLevel, mapLevel]);
        return fallbackResult.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi lay candidate templates:', error.message);
        return [];
    }
}

function rollOneItem(config) {
    const { candidates, curelPower, itemLevel } = config;
    if (!candidates || candidates.length === 0) return null;

    const template = candidates[Math.floor(Math.random() * candidates.length)];
    const rarity = craftingService.rollCurelRarity(curelPower);
    const dropItemLevel = Math.max(1, parseInt(itemLevel || template.item_level) || 1);
    const itemPower = craftingService.calculateItemPower(dropItemLevel, rarity);
    const rolledStats = itemStatsService.rollItemStats(template.category, itemPower, rarity);
    const expiresAt = itemLifecycleService.calculateExpiresAt(template.lifecycle_model, template.base_duration_hours);

    return {
        templateId: template.id,
        itemLevel: dropItemLevel,
        rarity,
        itemPower,
        expiresAt,
        ...rolledStats
    };
}

async function insertDroppedItems(playerId, droppedItems) {
    if (!droppedItems || droppedItems.length === 0) return [];

    const insertedItems = [];

    for (const item of droppedItems) {
        try {
            const result = await dbPool.query(`
                INSERT INTO items
                    (template_id, rarity, item_power, item_level, expires_at, owner_player_id, source, quantity,
                     stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value)
                VALUES ($1, $2, $3, $4, $5, $6, 'drop', 1, $7, $8, $9, $10, $11, $12)
                RETURNING id, template_id, rarity, item_power,
                          item_level,
                          stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value;
            `, [
                item.templateId, item.rarity, item.itemPower, item.itemLevel, item.expiresAt, playerId,
                item.stat_1_type || null, item.stat_1_value || 0,
                item.stat_2_type || null, item.stat_2_value || 0,
                item.stat_3_type || null, item.stat_3_value || 0
            ]);

            const { item_power, ...visibleItem } = result.rows[0];
            insertedItems.push(visibleItem);
        } catch (error) {
            console.error('[ERROR] Loi khi insert dropped item:', error.message);
        }
    }

    return insertedItems;
}

async function processLootDrop(playerId, claimedAction) {
    const actionType = claimedAction.action_type?.toUpperCase();
    const categories = claimedAction.category_filter?.length
        ? claimedAction.category_filter
        : ACTION_DROP_POOL[actionType];

    if (!categories || categories.length === 0) {
        return { items_dropped: [] };
    }

    const zoneMinLevel = claimedAction.zone_min_level || 1;
    const dropCount = calculateDropCount(actionType, claimedAction.actual_duration_s);
    const dropItemLevel = Math.max(1, parseInt(claimedAction.drop_item_level || zoneMinLevel) || 1);
    const candidates = await getCandidateTemplates({
        categories,
        zoneMinLevel,
        origins: ACTION_DROP_ORIGINS[actionType],
        maxLevelOffset: claimedAction.max_level_offset ?? 5,
        allowAboveMapLevel: claimedAction.allow_above_map_level !== false,
    });

    if (candidates.length === 0) {
        return { items_dropped: [] };
    }

    const curelPower = await curelPowerService.calculateLootCurelPower(playerId, actionType);

    const droppedItems = [];
    for (let index = 0; index < dropCount; index++) {
        if (Math.random() > 0.70) continue;
        const item = rollOneItem({ candidates, curelPower, itemLevel: dropItemLevel });
        if (item) droppedItems.push(item);
    }

    const savedItems = await insertDroppedItems(playerId, droppedItems);

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

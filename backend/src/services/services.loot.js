// backend/src/services/services.loot.js

const { gameDataDb, playerDataDb } = require('../repositories/repositories.databaseDomains');
const craftingService = require('./services.crafting');
const itemStatsService = require('./services.itemStats');
const curelPowerService = require('./services.curelPower');
const itemLifecycleService = require('./services.itemLifecycle');
const dbPool = playerDataDb;

const ACTION_DROP_POOL = {
    MINE:    ['MATERIAL', 'MISC'],
    CHOP:    ['MATERIAL', 'MISC'],
    HUNT:    ['MATERIAL', 'MISC', 'CONSUMABLE'],
    FORAGE:  ['MATERIAL', 'MISC', 'CONSUMABLE'],
    EXPLORE: ['MATERIAL', 'MISC', 'CONSUMABLE', 'EQUIPMENT', 'SPECIAL'],
    BATTLE:  ['MISC', 'CONSUMABLE'],
    SWEEP:   ['MATERIAL', 'MISC', 'CONSUMABLE', 'EQUIPMENT', 'SPECIAL'],
    DUNGEON: ['MATERIAL', 'MISC', 'CONSUMABLE', 'EQUIPMENT', 'SPECIAL'],
    CRAFT:   ['MATERIAL', 'CONSUMABLE', 'EQUIPMENT', 'SPECIAL'],
    FARM:    ['MATERIAL', 'MISC', 'CONSUMABLE'],
};

const ACTION_DROP_ORIGINS = {
    CRAFT: ['Craftable'],
    BATTLE: ['Gatherable', 'Loot-only', 'Craftable'],
};

const DEFAULT_DROP_ORIGINS = ['Gatherable', 'Loot-only'];
const BATTLE_DROP_TAGS = [
    'bone',
    'meat',
    'animal',
    'hide',
    'fat',
    'organic',
    'trophy',
    'rotten',
    'claw',
    'fang',
    'zombie',
    'monster',
];

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

function calculateRewardItemLevel(config) {
    const { zoneLevel, skillLevel, playerLevel } = config;
    const levels = [zoneLevel, skillLevel, playerLevel]
        .map(level => parseInt(level))
        .filter(level => Number.isFinite(level) && level > 0);

    if (levels.length === 0) return 1;

    return Math.max(1, Math.min(...levels));
}

async function getCandidateTemplates(config) {
    const {
        categories,
        zoneMinLevel,
        origins,
        maxLevelOffset = 5,
        allowAboveMapLevel = true,
        includeFlexibleTemplates = false,
        tagFilters = [],
    } = config;
    if (!categories || categories.length === 0) return [];

    const mapLevel = Math.max(1, zoneMinLevel || 1);
    const allowedOrigins = origins || DEFAULT_DROP_ORIGINS;
    const categoryPlaceholders = categories.map((_, index) => `$${index + 1}`).join(', ');
    const originOffset = categories.length;
    const originPlaceholders = allowedOrigins.map((_, index) => `$${originOffset + index + 1}`).join(', ');
    const baseValues = [...categories, ...allowedOrigins];
    const mapLevelParamIndex = baseValues.length + 1;
    const tagFilterValues = (tagFilters || []).map(tag => String(tag || '').toLowerCase()).filter(Boolean);
    const tagFilterParamIndex = baseValues.length + 2;
    const tagFilterQuery = tagFilterValues.length > 0
        ? `AND EXISTS (
              SELECT 1
              FROM UNNEST(tags) AS item_tag
              WHERE LOWER(item_tag) = ANY($${tagFilterParamIndex}::TEXT[])
          )`
        : '';
    const flexibleTemplateFilter = includeFlexibleTemplates
        ? `OR item_level = 1`
        : '';
    const sqlQuery = `
        SELECT id, category, tags, item_level, lifecycle_model, base_duration_hours,
               drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic, drop_weight_legendary
        FROM item_templates
        WHERE category = ANY(ARRAY[${categoryPlaceholders}])
          AND origin = ANY(ARRAY[${originPlaceholders}])
          AND (item_level = $${mapLevelParamIndex} ${flexibleTemplateFilter})
          ${tagFilterQuery};
    `;

    try {
        const exactValues = tagFilterValues.length > 0
            ? [...baseValues, mapLevel, tagFilterValues]
            : [...baseValues, mapLevel];
        const exactResult = await gameDataDb.query(sqlQuery, exactValues);
        if (exactResult.rows.length > 0) return exactResult.rows;

        const fallbackMinLevelParamIndex = baseValues.length + 1;
        const fallbackMaxLevelParamIndex = baseValues.length + 2;
        const fallbackMapLevelParamIndex = baseValues.length + 3;
        const fallbackTagFilterParamIndex = baseValues.length + 4;
        const fallbackTagFilterQuery = tagFilterValues.length > 0
            ? `AND EXISTS (
                  SELECT 1
                  FROM UNNEST(tags) AS item_tag
                  WHERE LOWER(item_tag) = ANY($${fallbackTagFilterParamIndex}::TEXT[])
              )`
            : '';
        const fallbackQuery = `
            SELECT id, category, tags, item_level, lifecycle_model, base_duration_hours,
                   drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic, drop_weight_legendary
            FROM item_templates
            WHERE category = ANY(ARRAY[${categoryPlaceholders}])
              AND origin = ANY(ARRAY[${originPlaceholders}])
              AND (
                  item_level BETWEEN $${fallbackMinLevelParamIndex} AND $${fallbackMaxLevelParamIndex}
                  ${includeFlexibleTemplates ? 'OR item_level = 1' : ''}
              )
              ${fallbackTagFilterQuery}
            ORDER BY ABS(item_level - $${fallbackMapLevelParamIndex}) ASC
            LIMIT 50;
        `;
        const minLevel = Math.max(1, mapLevel - maxLevelOffset);
        const maxLevel = allowAboveMapLevel ? mapLevel + maxLevelOffset : mapLevel;
        const fallbackValues = tagFilterValues.length > 0
            ? [...baseValues, minLevel, maxLevel, mapLevel, tagFilterValues]
            : [...baseValues, minLevel, maxLevel, mapLevel];
        const fallbackResult = await gameDataDb.query(fallbackQuery, fallbackValues);
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
    const rolledStats = itemStatsService.rollItemStats({
        category: template.category,
        itemPower,
        tags: template.tags,
    });
    const curelBuffs = itemStatsService.rollItemCurelBuffs({ rarity });
    const expiresAt = itemLifecycleService.calculateExpiresAt(template.lifecycle_model, template.base_duration_hours);

    return {
        templateId: template.id,
        itemLevel: dropItemLevel,
        rarity,
        itemPower,
        curelBuffs,
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
                WITH inserted_item AS (
                    INSERT INTO items
                    (template_id, rarity, item_power, item_level, expires_at, owner_player_id, source, quantity,
                     curel_buffs, stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value)
                    VALUES ($1, $2, $3, $4, $5, $6, 'drop', 1, $7::JSONB, $8, $9, $10, $11, $12, $13)
                    RETURNING id, template_id, rarity, item_power, item_level,
                              curel_buffs, stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value
                )
                SELECT inserted_item.id, inserted_item.template_id, inserted_item.rarity, inserted_item.item_power,
                       inserted_item.item_level, item_templates.display_name, item_templates.category, item_templates.tags,
                       inserted_item.curel_buffs,
                       inserted_item.stat_1_type, inserted_item.stat_1_value,
                       inserted_item.stat_2_type, inserted_item.stat_2_value,
                       inserted_item.stat_3_type, inserted_item.stat_3_value
                FROM inserted_item
                JOIN item_templates ON item_templates.id = inserted_item.template_id;
            `, [
                item.templateId, item.rarity, item.itemPower, item.itemLevel, item.expiresAt, playerId,
                JSON.stringify(item.curelBuffs || []),
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
    const battleTagFilters = actionType === 'BATTLE' && !(claimedAction.tag_filter || []).length
        ? BATTLE_DROP_TAGS
        : claimedAction.tag_filter || [];
    let candidates = await getCandidateTemplates({
        categories,
        zoneMinLevel,
        origins: ACTION_DROP_ORIGINS[actionType],
        maxLevelOffset: claimedAction.max_level_offset ?? 5,
        allowAboveMapLevel: claimedAction.allow_above_map_level !== false,
        includeFlexibleTemplates: claimedAction.include_flexible_templates === true,
        tagFilters: battleTagFilters,
    });

    if (candidates.length === 0 && battleTagFilters.length > 0) {
        candidates = await getCandidateTemplates({
            categories,
            zoneMinLevel,
            origins: ACTION_DROP_ORIGINS[actionType],
            maxLevelOffset: claimedAction.max_level_offset ?? 5,
            allowAboveMapLevel: claimedAction.allow_above_map_level !== false,
            includeFlexibleTemplates: claimedAction.include_flexible_templates === true,
            tagFilters: [],
        });
    }

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
    calculateRewardItemLevel,
    rollOneItem
};

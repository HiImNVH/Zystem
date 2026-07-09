// backend/src/routes/routes.zones.js
// Endpoint tra ve danh sach zone va thong tin khu vuc

const express = require('express');
const zonesRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const lootService = require('../services/services.loot');
const progressionService = require('../services/services.progression');
const playerEventsService = require('../services/services.playerEvents');
const walletRepository = require('../repositories/repositories.wallet');

const ACTION_RESOURCE_RULES = {
    EXPLORE: { energyPerUnit: 8 },
    BATTLE:  { energyPerUnit: 10 },
    SKIRMISH: { energyPerUnit: 10 },
    SWEEP:   { energyPerUnit: 14 },
    DUNGEON: { energyPerUnit: 14 },
    MINE:    { energyPerUnit: 7 },
    CHOP:    { energyPerUnit: 6 },
    HUNT:    { energyPerUnit: 9 },
    FORAGE:  { energyPerUnit: 4 },
};

const ACTION_JOB_CODE = {
    BATTLE: 'fighting',
    SKIRMISH: 'fighting',
    HUNT: 'fighting',
    SWEEP: 'fighting',
    DUNGEON: 'fighting',
    EXPLORE: 'scavenging',
    FORAGE: 'gathering',
    MINE: 'gathering',
    CHOP: 'gathering',
};

function buildFallbackActivityTag(config) {
    const { tagType, actionType, lootFocus, monsterProfile } = config;
    return {
        id: null,
        tag_type: tagType,
        action_type: actionType,
        energy_cost_mult: 1,
        loot_focus: lootFocus,
        monster_profile: monsterProfile,
        dungeon_rank_rewards: {},
        is_fallback: true,
    };
}

function resolvePoiActivityTags() {
    return {
        enemy: buildFallbackActivityTag({
            tagType: 'BATTLE',
            actionType: 'BATTLE',
            lootFocus: ['gear', 'salvage'],
            monsterProfile: null,
        }),
        gather: buildFallbackActivityTag({
            tagType: 'EXPLORATION',
            actionType: 'EXPLORE',
            lootFocus: ['salvage', 'food'],
            monsterProfile: null,
        }),
        sweep: buildFallbackActivityTag({
            tagType: 'SWEEP',
            actionType: 'SWEEP',
            lootFocus: ['salvage', 'gear'],
            monsterProfile: null,
        }),
    };
}

function normalizeActivityType(activityType) {
    const value = String(activityType || '').toLowerCase();
    if (value === 'enemy') return { tagTypes: ['BATTLE', 'SKIRMISH'], label: 'Enemy', fallbackAction: 'BATTLE' };
    if (value === 'scavenge') return { tagTypes: ['EXPLORATION'], label: 'Scavenge', fallbackAction: 'EXPLORE' };
    if (value === 'gather') return { tagTypes: ['EXPLORATION'], label: 'Gather', fallbackAction: 'FORAGE' };
    if (value === 'sweep' || value === 'dungeon') return { tagTypes: ['SWEEP', 'DUNGEON'], label: 'Sweep', fallbackAction: 'SWEEP' };
    return null;
}

function normalizeCombatResult(payload) {
    const accuracy = payload?.accuracyResult || {};
    const action = payload?.combatAction || {};
    if (!accuracy.outcome && !action.code) return null;

    return {
        action_code: String(action.code || 'normal_attack'),
        action_label: String(action.label || 'Attack'),
        weapon_type: String(action.weaponType || 'improvised'),
        weapon_name: String(action.weaponName || 'Unarmed'),
        accuracy_score: Math.max(0, Math.min(100, parseInt(accuracy.score) || 0)),
        accuracy_outcome: String(accuracy.outcome || 'graze'),
        accuracy_multiplier: parseFloat(accuracy.multiplier) || 1,
        calculated_damage: Math.max(0, parseInt(accuracy.damage || action.calculatedDamage) || 0),
    };
}

function calculateActionResourceCost(actionType, durationSeconds, tag) {
    const rule = ACTION_RESOURCE_RULES[actionType] || ACTION_RESOURCE_RULES.EXPLORE;
    const actionUnits = Math.max(1, Math.ceil((parseInt(durationSeconds) || 0) / 1800));
    const energyMultiplier = parseFloat(tag?.energy_cost_mult) || 1;

    return {
        energyCost: Math.max(0, Math.ceil(rule.energyPerUnit * actionUnits * energyMultiplier)),
    };
}

function buildActivityResourceCosts(config) {
    const { durationSeconds, tags } = config;
    return {
        enemy: calculateActionResourceCost(tags.enemy.action_type || 'BATTLE', durationSeconds, tags.enemy),
        scavenge: calculateActionResourceCost('EXPLORE', durationSeconds, tags.gather),
        gather: calculateActionResourceCost('FORAGE', durationSeconds, tags.gather),
        sweep: calculateActionResourceCost(tags.sweep.action_type === 'DUNGEON' ? 'SWEEP' : (tags.sweep.action_type || 'SWEEP'), durationSeconds, tags.sweep),
    };
}

function calculateExpReward(actionType, durationSeconds, zoneMinLevel) {
    const baseRates = {
        EXPLORE: { player: 0.56, job: 0.24 },
        FORAGE: { player: 0.48, job: 0.32 },
        MINE: { player: 0.50, job: 0.35 },
        CHOP: { player: 0.46, job: 0.34 },
        HUNT: { player: 0.70, job: 0.34 },
        BATTLE: { player: 0.80, job: 0.36 },
        SKIRMISH: { player: 0.80, job: 0.36 },
        SWEEP: { player: 1.05, job: 0.48 },
        DUNGEON: { player: 1.05, job: 0.48 },
    };
    const rate = baseRates[actionType] || baseRates.EXPLORE;
    const levelMult = 1 + Math.max(0, (parseInt(zoneMinLevel) || 1) - 1) * 0.035;
    return {
        playerExp: Math.max(1, Math.floor(rate.player * durationSeconds * levelMult)),
        jobExp: Math.max(1, Math.floor(rate.job * durationSeconds * levelMult)),
    };
}

function calculateEnemyMoneyDrop(config) {
    const { mapLevel, combatResult } = config;
    const accuracyBonus = combatResult?.accuracy_outcome === 'critical'
        ? 0.15
        : (combatResult?.accuracy_outcome === 'hit' ? 0.05 : 0);
    const dropChance = Math.min(0.85, 0.60 + accuracyBonus);
    if (Math.random() > dropChance) {
        return {
            amount: 0,
            chance: dropChance,
            didDrop: false,
        };
    }

    const level = Math.max(1, parseInt(mapLevel) || 1);
    const baseAmount = 8 + (level * 3);
    const variance = Math.floor(Math.random() * Math.max(4, level + 4));
    return {
        amount: baseAmount + variance,
        chance: dropChance,
        didDrop: true,
    };
}

function shouldDropEnemyMoney(config) {
    const { activityType, sweepEvent } = config;
    if (activityType === 'enemy') return true;

    return ['combat', 'boss'].includes(sweepEvent?.type);
}

async function findJobIdByCode(jobCode) {
    if (!jobCode) return null;
    const result = await dbPool.query(`SELECT id FROM jobs_seed WHERE code = $1;`, [jobCode]);
    return result.rows[0]?.id || null;
}

async function findPlayerJobLevel(playerId, jobCode) {
    if (!playerId || !jobCode) return 1;

    const result = await dbPool.query(`
        SELECT pj.job_level
        FROM player_jobs pj
        JOIN jobs_seed js ON js.id = pj.job_id
        WHERE pj.player_id = $1
          AND js.code = $2
        LIMIT 1;
    `, [playerId, jobCode]);

    return Math.max(1, parseInt(result.rows[0]?.job_level) || 1);
}

async function findMonstersByProfile(monsterProfile) {
    if (!monsterProfile) return [];
    const result = await dbPool.query(`
        SELECT id, code, display_name, base_level_offset, health, attack,
               defense, drop_table, threat_rank
        FROM monsters
        WHERE monster_profile = $1
        ORDER BY base_level_offset ASC, display_name ASC;
    `, [monsterProfile]);

    return result.rows;
}

const LOOT_FOCUS_CATEGORY_MAP = {
    food: 'FOOD',
    drink: 'FOOD',
    medicine: 'MEDICINE',
    medical: 'MEDICINE',
    tool: 'TOOL',
    weapon: 'WEAPON',
    ammo: 'AMMO',
    equipment: 'EQUIPMENT',
    gear: 'EQUIPMENT',
    seed: 'MATERIAL',
    rubbish: 'MATERIAL',
    salvage: 'MATERIAL',
    material: 'MATERIAL',
    materials: 'MATERIAL',
};

const GATHER_NODE_BLUEPRINTS = {
    bush: {
        code: 'BUSH_PATCH',
        name: 'Bush Patch',
        categoryLabel: 'Forage',
        actionType: 'FORAGE',
        lootFocus: ['food', 'seed', 'medicine'],
        itemTags: ['Vegetable', 'Wild', 'Dandelion', 'Bramble', 'Seed', 'Plantable'],
        weight: 1,
    },
    tree: {
        code: 'TREE_STAND',
        name: 'Tree Stand',
        categoryLabel: 'Wood',
        actionType: 'CHOP',
        lootFocus: ['material'],
        itemTags: ['Wood', 'Branch', 'Log', 'Oak', 'Pine', 'Maple', 'Sycamore', 'Willow'],
        weight: 1,
    },
    stone: {
        code: 'STONE_OUTCROP',
        name: 'Stone Outcrop',
        categoryLabel: 'Stone',
        actionType: 'MINE',
        lootFocus: ['material'],
        itemTags: ['Stone', 'Pebble', 'Boulder', 'Mineral'],
        weight: 1,
    },
    ore: {
        code: 'ORE_VEIN',
        name: 'Ore Vein',
        categoryLabel: 'Ore',
        actionType: 'MINE',
        lootFocus: ['material'],
        itemTags: ['Ore', 'Copper', 'Iron', 'Zinc', 'Aluminum', 'Sulfur', 'Saltpeter'],
        weight: 1,
    },
    scrap: {
        code: 'SCRAP_PILE',
        name: 'Scrap Pile',
        categoryLabel: 'Scrap',
        actionType: 'FORAGE',
        lootFocus: ['rubbish', 'material'],
        itemTags: ['Recyclable', 'Metal', 'Plastic', 'Glass', 'Rubber', 'Fabric'],
        weight: 1,
    },
    waterline: {
        code: 'WATERLINE_REEDS',
        name: 'Waterline Reeds',
        categoryLabel: 'Wetland',
        actionType: 'FORAGE',
        lootFocus: ['food', 'material', 'medicine'],
        itemTags: ['Vegetable', 'Wild', 'Cordage', 'Wood', 'Salt'],
        weight: 1,
    },
};

const GATHER_NODE_KEYS_BY_CONTEXT = {
    safe: ['bush', 'scrap'],
    urban: ['scrap', 'bush', 'tree'],
    town: ['scrap', 'bush', 'tree'],
    city: ['scrap', 'bush'],
    industrial: ['scrap', 'stone', 'ore'],
    rural: ['bush', 'tree', 'stone', 'ore'],
    farm: ['bush', 'tree', 'stone'],
    forest: ['tree', 'bush', 'stone'],
    geological_mine: ['ore', 'stone', 'scrap'],
    mine: ['ore', 'stone', 'scrap'],
    coast: ['waterline', 'stone', 'scrap'],
    pier: ['waterline', 'scrap', 'stone'],
    swamp: ['waterline', 'bush', 'tree', 'stone'],
    military: ['scrap', 'stone', 'bush'],
};

function getLootCategoriesFromFocus(lootFocus) {
    const categories = new Set();
    for (const focus of lootFocus || []) {
        const category = LOOT_FOCUS_CATEGORY_MAP[String(focus || '').toLowerCase()];
        if (category) categories.add(category);
    }

    return categories.size > 0 ? [...categories] : ['MATERIAL', 'RUBBISH'];
}

async function findPoiRooms(poiId) {
    const result = await dbPool.query(`
        SELECT id, code, display_name, room_type, room_tags, loot_focus, sort_order
        FROM world_poi_rooms
        WHERE poi_id = $1
        ORDER BY sort_order ASC, display_name ASC;
    `, [poiId]);

    return result.rows;
}

function getGatherContextKeys(config) {
    const { zone, poi } = config;
    const contextValues = [
        poi?.poi_type,
        zone?.zone_type,
        zone?.biome,
        ...(zone?.zone_tags || []),
    ].map(value => String(value || '').toLowerCase());

    const nodeKeys = [];
    for (const contextValue of contextValues) {
        for (const nodeKey of GATHER_NODE_KEYS_BY_CONTEXT[contextValue] || []) {
            if (!nodeKeys.includes(nodeKey)) nodeKeys.push(nodeKey);
        }
    }

    return nodeKeys.length > 0 ? nodeKeys : ['bush', 'scrap'];
}

function buildGatherNodeId(config) {
    const { poiCode, nodeCode } = config;
    return `${poiCode}_GATHER_${nodeCode}`;
}

function buildGatherNodes(config) {
    const { zone, poi, tag, durationSeconds } = config;
    const baseLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    const nodeKeys = getGatherContextKeys({ zone, poi });

    return nodeKeys.map((nodeKey, index) => {
        const blueprint = GATHER_NODE_BLUEPRINTS[nodeKey] || GATHER_NODE_BLUEPRINTS.bush;
        const resourceCost = durationSeconds
            ? calculateActionResourceCost(blueprint.actionType, durationSeconds, tag)
            : null;
        return {
            id: buildGatherNodeId({ poiCode: poi.code, nodeCode: blueprint.code }),
            code: blueprint.code,
            name: blueprint.name,
            category: 'GATHER',
            category_label: blueprint.categoryLabel,
            tags: blueprint.itemTags,
            loot_focus: blueprint.lootFocus,
            item_tag_filter: blueprint.itemTags,
            pool_size: blueprint.itemTags.length,
            item_level: baseLevel,
            rarity_hint: 'Natural resource node',
            reward_hint: `Gather focus: ${blueprint.itemTags.slice(0, 4).join(', ')}`,
            action_type: blueprint.actionType,
            gameplay_tag: tag,
            resource_cost: resourceCost,
            sort_order: index + 1,
        };
    });
}

function findGatherNodeByTargetId(config) {
    const { zone, poi, targetId } = config;
    return buildGatherNodes({ zone, poi, tag: null })
        .find(node => node.id === targetId || node.code === targetId) || null;
}

async function getScavengeTargetLootFilters(targetId) {
    const fallbackMatch = String(targetId || '').match(/^([a-z_]+)_gather_pool_\d+$/i);
    if (fallbackMatch) {
        const fallbackCategory = fallbackMatch[1].toUpperCase();
        const category = Object.values(LOOT_FOCUS_CATEGORY_MAP).includes(fallbackCategory) ? fallbackCategory : null;
        return { categories: category ? [category] : null, tagFilters: [] };
    }

    const result = await dbPool.query(
        `SELECT loot_focus FROM world_poi_rooms WHERE id = $1 LIMIT 1;`,
        [targetId]
    );
    if (result.rows.length === 0) return { categories: null, tagFilters: [] };

    return { categories: getLootCategoriesFromFocus(result.rows[0].loot_focus), tagFilters: [] };
}

async function getActivityLootFilters(config) {
    const { activityType, targetId, zone, poi } = config;
    if (activityType === 'gather') {
        const gatherNode = findGatherNodeByTargetId({ zone, poi, targetId });
        return {
            categories: gatherNode ? getLootCategoriesFromFocus(gatherNode.loot_focus) : ['MATERIAL'],
            tagFilters: gatherNode?.item_tag_filter || [],
            actionType: gatherNode?.action_type || 'FORAGE',
        };
    }
    if (activityType === 'scavenge') {
        return {
            ...(await getScavengeTargetLootFilters(targetId)),
            actionType: 'EXPLORE',
        };
    }

    return { categories: null, tagFilters: [], actionType: null };
}

function scaleMonsterStats(monster, monsterLevel) {
    const level = Math.max(1, parseInt(monsterLevel) || 1);
    const growth = Math.max(0, level - 1);
    return {
        level,
        health: Math.round((parseInt(monster.health) || 1) + growth * 7),
        attack: Math.round((parseInt(monster.attack) || 0) + growth * 1.8),
        defense: Math.round((parseInt(monster.defense) || 0) + growth * 1.2),
    };
}

function buildEnemyList(config) {
    const { zone, poi, tag, monsters } = config;
    const baseLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    const minLevel = Math.max(1, baseLevel - 5);
    const maxLevel = baseLevel + 4;
    const monsterPool = monsters.length > 0 ? monsters : [{
        id: `${poi.code}_unknown`,
        code: `${poi.code}_unknown`,
        display_name: 'Unknown Threat',
        health: 80,
        attack: 10,
        defense: 4,
        threat_rank: 'Common',
        drop_table: [],
    }];

    return Array.from({ length: maxLevel - minLevel + 1 }, (_, index) => {
        const level = minLevel + index;
        const monster = monsterPool[index % monsterPool.length];
        return {
            id: `${monster.id}_${level}`,
            code: monster.code,
            name: monster.display_name,
            ...scaleMonsterStats(monster, level),
            threat: level >= maxLevel ? 'Elite' : monster.threat_rank,
            reward_hint: (monster.drop_table || [])
                .map(drop => drop.tag_query)
                .join(', '),
            drop_table: monster.drop_table || [],
            action_type: tag?.action_type || 'BATTLE',
            gameplay_tag: tag,
        };
    });
}

function buildScavengeList(config) {
    const { zone, tag, rooms } = config;
    const baseLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    if (rooms.length === 0) {
        return [{
            id: `rubbish_gather_pool_${baseLevel}`,
            code: 'ROOM_SCAVENGE_POOL',
            name: 'General Search Area',
            category: 'ROOM',
            category_label: 'Default Room',
            tags: [],
            loot_focus: ['material', 'rubbish'],
            pool_size: 0,
            item_level: baseLevel,
            rarity_hint: 'Random room loot',
            reward_hint: 'Searches the POI for abandoned supplies',
            action_type: tag?.action_type || 'EXPLORE',
            gameplay_tag: tag,
        }];
    }

    return rooms.map(room => ({
        id: room.id,
        code: room.code,
        name: room.display_name,
        category: 'ROOM',
        category_label: room.room_type,
        tags: room.room_tags || [],
        loot_focus: room.loot_focus || [],
        pool_size: (room.loot_focus || []).length,
        item_level: baseLevel,
        rarity_hint: 'Random room loot',
        reward_hint: `Scavenge focus: ${(room.loot_focus || []).join(', ') || 'material, rubbish'}`,
        action_type: tag?.action_type || 'EXPLORE',
        gameplay_tag: tag,
    }));
}

function buildSweepInfo(config) {
    const { zone, poi, tag, monsters } = config;
    const mapLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    const bossLevel = mapLevel + 4;
    return {
        id: `${poi.code}_sweep`,
        name: `Sweep ${poi.display_name}`,
        map_level: mapLevel,
        boss_level: bossLevel,
        event_pool: [
            { type: 'combat', label: 'Combat', hint: 'Encounter a hostile inside the POI.' },
            { type: 'search', label: 'Search', hint: 'Find supplies or useful traces.' },
            { type: 'retreat', label: 'Retreat', hint: 'Leave the POI to reduce risk.' },
        ],
        normal: {
            monster_level: mapLevel,
            reward_hint: 'May trigger combat, search, or retreat.',
        },
        hard: {
            monster_level_rule: `Boss is always Lv.${bossLevel}`,
            new_player_aura: 'Boss appears on fixed sweep turns.',
            reward_hint: 'Boss has better drop odds.',
        },
        monsters: monsters.map(monster => ({
            id: monster.id,
            code: monster.code,
            name: monster.display_name,
            ...scaleMonsterStats(monster, bossLevel),
            threat: monster.threat_rank,
            drop_table: monster.drop_table || [],
        })),
        action_type: tag?.action_type || 'SWEEP',
        gameplay_tag: tag,
    };
}

async function countSweepTurns(client, playerId, poiId) {
    const result = await client.query(`
        SELECT COUNT(*)::INT AS turn_count
        FROM player_events
        WHERE player_id = $1
          AND event_type = 'POI_ACTIVITY'
          AND payload->>'poi_id' = $2
          AND payload->>'activity_type' = 'sweep';
    `, [playerId, poiId]);

    return parseInt(result.rows[0]?.turn_count) || 0;
}

function rollSweepEvent(turnNumber, mapLevel) {
    const bossLevel = mapLevel + 4;
    if (turnNumber % 5 === 0) {
        return {
            type: 'boss',
            label: 'Boss',
            monsterLevel: bossLevel,
            message: `Encountered a Lv.${bossLevel} boss.`,
        };
    }

    const roll = Math.random();
    if (roll < 0.45) {
        return {
            type: 'combat',
            label: 'Combat',
            monsterLevel: Math.max(1, mapLevel - 5 + Math.floor(Math.random() * 10)),
            message: 'Encountered a hostile in the area.',
        };
    }
    if (roll < 0.80) {
        return {
            type: 'search',
            label: 'Search',
            monsterLevel: null,
            message: 'Found traces of supplies.',
        };
    }

    return {
        type: 'retreat',
        label: 'Retreat',
        monsterLevel: null,
        message: 'Retreated from the POI.',
    };
}

function buildRetreatSweepEvent() {
    return {
        type: 'retreat',
        label: 'Retreat',
        monsterLevel: null,
        message: 'Retreated from the POI.',
    };
}

/**
 * @route   GET /api/zones
 * @desc    Lay danh sach tat ca zone dang hoat dong
 * @query   ?type=mine (loc theo loai zone)
 */
zonesRouter.get('/', async (req, res, next) => {
    const { type } = req.query;

    let sqlQuery = `SELECT * FROM zones WHERE is_active = TRUE`;
    const sqlValues = [];

    if (type) {
        sqlQuery += ` AND zone_type = $1`;
        sqlValues.push(type.toLowerCase());
    }

    sqlQuery += ` ORDER BY level_gap ASC, display_name ASC;`;

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);
        const zones = result.rows;
        const zoneIds = zones.map(zone => zone.id);

        if (zoneIds.length === 0) {
            return res.json({ success: true, data: [] });
        }

        const poiResult = await dbPool.query(`
            SELECT
                wp.*,
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', pgt.id,
                            'tag_type', pgt.tag_type,
                            'action_type', pgt.action_type,
                            'energy_cost_mult', pgt.energy_cost_mult,
                            'loot_focus', pgt.loot_focus,
                            'monster_profile', pgt.monster_profile,
                            'dungeon_rank_rewards', pgt.dungeon_rank_rewards
                        )
                        ORDER BY pgt.tag_type
                    ) FILTER (WHERE pgt.id IS NOT NULL),
                    '[]'::JSON
                ) AS gameplay_tags
            FROM world_pois wp
            LEFT JOIN poi_gameplay_tags pgt ON pgt.poi_id = wp.id
            WHERE wp.zone_id = ANY($1::UUID[])
            GROUP BY wp.id
            ORDER BY wp.display_name ASC;
        `, [zoneIds]);

        const poisByZone = {};
        for (const poi of poiResult.rows) {
            if (!poisByZone[poi.zone_id]) poisByZone[poi.zone_id] = [];
            poisByZone[poi.zone_id].push(poi);
        }

        return res.json({
            success: true,
            data: zones.map(zone => ({
                ...zone,
                pois: poisByZone[zone.id] || [],
            }))
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/zones/pois/:poiId/activities
 * @desc    Lay danh sach Enemy/Gather/Dungeon cua mot POI
 * @query   ?type=enemy|gather|dungeon
 */
zonesRouter.get('/pois/:poiId/activities', async (req, res, next) => {
    const { poiId } = req.params;
    const type = (req.query.type || 'all').toLowerCase();

    try {
        const poiResult = await dbPool.query(`
            SELECT wp.*, z.code as zone_code, z.display_name as zone_name, z.zone_type,
                   z.biome, z.zone_tags, z.level_gap, z.min_player_lv, z.base_duration_s,
                   z.infection_risk, z.radiation_risk,
                   COALESCE(
                       JSON_AGG(
                           JSON_BUILD_OBJECT(
                               'id', pgt.id,
                               'tag_type', pgt.tag_type,
                               'action_type', pgt.action_type,
                               'energy_cost_mult', pgt.energy_cost_mult,
                               'loot_focus', pgt.loot_focus,
                               'monster_profile', pgt.monster_profile,
                               'dungeon_rank_rewards', pgt.dungeon_rank_rewards
                           )
                           ORDER BY pgt.tag_type
                       ) FILTER (WHERE pgt.id IS NOT NULL),
                       '[]'::JSON
                   ) AS gameplay_tags
            FROM world_pois wp
            JOIN zones z ON z.id = wp.zone_id
            LEFT JOIN poi_gameplay_tags pgt ON pgt.poi_id = wp.id
            WHERE wp.id = $1
            GROUP BY wp.id, z.id;
        `, [poiId]);

        if (poiResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'POI not found.' });
        }

        const poi = poiResult.rows[0];
        const zone = {
            code: poi.zone_code,
            display_name: poi.zone_name,
            zone_type: poi.zone_type,
            biome: poi.biome,
            zone_tags: poi.zone_tags,
            level_gap: poi.level_gap,
            min_player_lv: poi.min_player_lv,
            base_duration_s: poi.base_duration_s,
            infection_risk: poi.infection_risk,
            radiation_risk: poi.radiation_risk,
        };

        const activityTags = resolvePoiActivityTags();
        const baseDuration = Math.max(30, parseInt(poi.base_duration_s || zone.base_duration_s) || 60);
        const enemyMonsters = await findMonstersByProfile(activityTags.enemy.monster_profile);
        const gatherRooms = await findPoiRooms(poi.id);
        const sweepMonsters = await findMonstersByProfile(activityTags.sweep.monster_profile);
        const payload = {
            poi: {
                id: poi.id,
                code: poi.code,
                display_name: poi.display_name,
                poi_type: poi.poi_type,
                is_dungeon: poi.is_dungeon,
                entry_requirement: poi.entry_requirement,
            },
            zone,
            resource_costs: buildActivityResourceCosts({
                durationSeconds: baseDuration,
                tags: activityTags,
            }),
            enemies: buildEnemyList({ zone, poi, tag: activityTags.enemy, monsters: enemyMonsters }),
            scavengeables: buildScavengeList({ zone, tag: activityTags.gather, rooms: gatherRooms }),
            gatherables: buildGatherNodes({ zone, poi, tag: activityTags.gather, durationSeconds: baseDuration }),
            sweep: buildSweepInfo({ zone, poi, tag: activityTags.sweep, monsters: sweepMonsters }),
        };

        if (type === 'enemy') return res.json({ success: true, data: { ...payload, scavengeables: [], gatherables: [], sweep: null } });
        if (type === 'scavenge') return res.json({ success: true, data: { ...payload, enemies: [], gatherables: [], sweep: null } });
        if (type === 'gather') return res.json({ success: true, data: { ...payload, enemies: [], scavengeables: [], sweep: null } });
        if (type === 'sweep' || type === 'dungeon') return res.json({ success: true, data: { ...payload, enemies: [], scavengeables: [], gatherables: [] } });

        return res.json({ success: true, data: payload });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/zones/pois/:poiId/execute
 * @desc    Thuc hien truc tiep mot hoat dong POI, khong qua action queue.
 * @body    { playerId, activityType: enemy|gather|dungeon, targetId, mode? }
 */
zonesRouter.post('/pois/:poiId/execute', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { poiId } = req.params;
    const { playerId, activityType, targetId, mode, combatAction, accuracyResult } = req.body;
    const activity = normalizeActivityType(activityType);
    const activityTypeKey = String(activityType || '').toLowerCase();
    const combatResult = normalizeCombatResult({ combatAction, accuracyResult });

    if (!playerId || !activity) {
        return res.status(400).json({
            success: false,
            message: 'Missing or invalid parameters: playerId and activityType are required.'
        });
    }

    const client = await dbPool.connect();
    let executionSummary = null;

    try {
        await client.query('BEGIN');

        const playerResult = await client.query(`
            SELECT id, account_id, player_level, current_energy, max_energy,
                   infection_pct, radiation_pct
            FROM players
            WHERE id = $1
            FOR UPDATE;
        `, [playerId]);

        if (playerResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        const player = playerResult.rows[0];
        if (player.account_id && player.account_id !== req.accountId) {
            await client.query('ROLLBACK');
            return res.status(403).json({ success: false, message: 'You do not have permission to use this character.' });
        }

        const poiResult = await client.query(`
            SELECT wp.id AS poi_id, wp.code AS poi_code, wp.display_name AS poi_name,
                   wp.poi_type, wp.is_dungeon,
                   z.id AS zone_id, z.code AS zone_code, z.display_name AS zone_name,
                   z.zone_type, z.biome, z.zone_tags, z.level_gap, z.min_player_lv,
                   z.base_duration_s, z.infection_risk, z.radiation_risk
            FROM world_pois wp
            JOIN zones z ON z.id = wp.zone_id
            WHERE wp.id = $1
            LIMIT 1;
        `, [poiId]);

        if (poiResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'POI not found.' });
        }

        const poi = poiResult.rows[0];
        const mapLevel = parseInt(poi.level_gap || poi.min_player_lv || 1);
        const playerLevel = parseInt(player.player_level) || 1;
        if (mapLevel > playerLevel + 10) {
            await client.query('ROLLBACK');
            return res.status(403).json({
                success: false,
                message: 'Zone is locked because it is more than 10 levels above your character.'
            });
        }

        const lootFilters = await getActivityLootFilters({
            activityType: activityTypeKey,
            targetId,
            zone: {
                zone_type: poi.zone_type,
                biome: poi.biome,
                zone_tags: poi.zone_tags,
                level_gap: poi.level_gap,
                min_player_lv: poi.min_player_lv,
            },
            poi: {
                code: poi.poi_code,
                poi_type: poi.poi_type,
            },
        });
        const actionType = lootFilters.actionType || activity.fallbackAction;
        const isSweepAction = actionType === 'SWEEP';
        const sweepEvent = isSweepAction
            ? (mode === 'retreat'
                ? buildRetreatSweepEvent()
                : rollSweepEvent((await countSweepTurns(client, playerId, poi.poi_id)) + 1, mapLevel))
            : null;
        const baseDuration = Math.max(30, parseInt(poi.base_duration_s) || 60);
        const durationSeconds = baseDuration;
        const tag = {
            energy_cost_mult: 1,
        };
        const cost = calculateActionResourceCost(actionType, durationSeconds, tag);
        const currentEnergy = parseInt(player.current_energy) || 0;

        if (currentEnergy < cost.energyCost) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                success: false,
                message: `Not enough energy. Need ${cost.energyCost}, current ${currentEnergy}.`
            });
        }

        const hazard = {
            infectionGain: Number(((parseFloat(poi.infection_risk) || 0) * (durationSeconds / 1800)).toFixed(2)),
            radiationGain: Number(((parseFloat(poi.radiation_risk) || 0) * (durationSeconds / 1800)).toFixed(2)),
        };

        const updatedPlayer = await client.query(`
            UPDATE players
            SET current_energy = current_energy - $1,
                infection_pct = LEAST(100, infection_pct + $2),
                radiation_pct = LEAST(100, radiation_pct + $3),
                updated_at = NOW()
            WHERE id = $4
            RETURNING current_energy, max_energy, infection_pct, radiation_pct;
        `, [cost.energyCost, hazard.infectionGain, hazard.radiationGain, playerId]);

        await client.query('COMMIT');

        const rewardActionType = sweepEvent?.type === 'search'
            ? 'EXPLORE'
            : (sweepEvent?.type === 'retreat' ? 'EXPLORE' : actionType);
        const baseExpReward = calculateExpReward(rewardActionType, durationSeconds, mapLevel);
        const expReward = sweepEvent?.type === 'retreat'
            ? {
                playerExp: Math.max(1, Math.floor(baseExpReward.playerExp * 0.35)),
                jobExp: Math.max(1, Math.floor(baseExpReward.jobExp * 0.35)),
            }
            : baseExpReward;
        const playerExpResult = await progressionService.processPlayerExpGain(playerId, expReward.playerExp);
        const jobId = await findJobIdByCode(ACTION_JOB_CODE[rewardActionType]);
        const jobExpResult = jobId
            ? await progressionService.processJobExpGain(playerId, jobId, expReward.jobExp)
            : null;
        const latestPlayerLevel = playerExpResult?.new_level || playerLevel;
        const gatherSkillLevel = activityTypeKey === 'gather'
            ? await findPlayerJobLevel(playerId, 'gathering')
            : null;
        const rewardItemLevel = activityTypeKey === 'gather'
            ? lootService.calculateRewardItemLevel({
                zoneLevel: mapLevel,
                skillLevel: gatherSkillLevel,
                playerLevel: latestPlayerLevel,
            })
            : mapLevel;
        const lootResult = sweepEvent?.type === 'retreat'
            ? { items_dropped: [] }
            : await lootService.processLootDrop(playerId, {
                action_type: rewardActionType,
                actual_duration_s: durationSeconds,
                zone_min_level: mapLevel,
                drop_item_level: rewardItemLevel,
                category_filter: ['gather', 'scavenge'].includes(activityTypeKey) ? lootFilters.categories : null,
                tag_filter: ['gather', 'scavenge'].includes(activityTypeKey) ? lootFilters.tagFilters : [],
                allow_above_map_level: activityTypeKey !== 'gather',
                max_level_offset: activityTypeKey === 'gather' ? 3 : 5,
                include_flexible_templates: activityTypeKey === 'gather',
            });
        const moneyDrop = shouldDropEnemyMoney({ activityType: activityTypeKey, sweepEvent })
            ? calculateEnemyMoneyDrop({ mapLevel, combatResult })
            : { amount: 0, chance: 0, didDrop: false };
        const walletResult = moneyDrop.amount > 0
            ? await walletRepository.modifyWalletBalance(playerId, 'money', moneyDrop.amount, 'DEPOSIT')
            : null;

        executionSummary = {
            poi_id: poi.poi_id,
            poi_name: poi.poi_name,
            zone_code: poi.zone_code,
            zone_name: poi.zone_name,
            activity_type: activityTypeKey,
            target_id: targetId || null,
            mode: mode || 'normal',
            action_type: actionType,
            combat_result: activityTypeKey === 'enemy' ? combatResult : null,
            sweep_event: sweepEvent,
            duration_seconds: durationSeconds,
            energy_cost: cost.energyCost,
            infection_gained: hazard.infectionGain,
            radiation_gained: hazard.radiationGain,
            player_exp: expReward.playerExp,
            job_exp: expReward.jobExp,
            player_exp_result: playerExpResult,
            job_exp_result: jobExpResult,
            items_dropped: lootResult.items_dropped || [],
            money_dropped: walletResult?.success ? moneyDrop.amount : 0,
            money_drop_chance: moneyDrop.chance,
            player_resources: updatedPlayer.rows[0],
        };

        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'POI_ACTIVITY',
            source: 'Zystem',
            title: `${activity.label} Completed`,
            message: `${activity.label} at ${poi.poi_name}. ${sweepEvent?.message || ''} Energy -${cost.energyCost}.`,
            payload: executionSummary,
        });

        return res.json({
            success: true,
            message: `${activity.label} completed at ${poi.poi_name}.`,
            data: executionSummary,
        });
    } catch (error) {
        await client.query('ROLLBACK').catch(() => {});
        next(error);
    } finally {
        client.release();
    }
});

/**
 * @route   GET /api/zones/:code
 * @desc    Lay thong tin chi tiet mot zone theo CODE
 */
zonesRouter.get('/:code', async (req, res, next) => {
    const { code } = req.params;

    try {
        const result = await dbPool.query(
            `SELECT * FROM zones WHERE code = $1 AND is_active = TRUE;`,
            [code.toUpperCase()]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: `Zone does not exist: ${code}` });
        }

        const poiResult = await dbPool.query(`
            SELECT
                wp.*,
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', pgt.id,
                            'tag_type', pgt.tag_type,
                            'action_type', pgt.action_type,
                            'energy_cost_mult', pgt.energy_cost_mult,
                            'loot_focus', pgt.loot_focus,
                            'monster_profile', pgt.monster_profile,
                            'dungeon_rank_rewards', pgt.dungeon_rank_rewards
                        )
                    ) FILTER (WHERE pgt.id IS NOT NULL),
                    '[]'::JSON
                ) AS gameplay_tags
            FROM world_pois wp
            LEFT JOIN poi_gameplay_tags pgt ON pgt.poi_id = wp.id
            WHERE wp.zone_id = $1
            GROUP BY wp.id
            ORDER BY wp.display_name ASC;
        `, [result.rows[0].id]);

        return res.json({ success: true, data: { ...result.rows[0], pois: poiResult.rows } });
    } catch (error) {
        next(error);
    }
});

module.exports = zonesRouter;

// backend/src/routes/routes.zones.js
// Endpoint tra ve danh sach zone va thong tin khu vuc

const express = require('express');
const zonesRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const lootService = require('../services/services.loot');
const progressionService = require('../services/services.progression');
const playerEventsService = require('../services/services.playerEvents');

const ACTION_RESOURCE_RULES = {
    EXPLORE: { energyPerUnit: 8 },
    BATTLE:  { energyPerUnit: 10 },
    DUNGEON: { energyPerUnit: 14 },
    MINE:    { energyPerUnit: 7 },
    CHOP:    { energyPerUnit: 6 },
    HUNT:    { energyPerUnit: 9 },
    FORAGE:  { energyPerUnit: 4 },
};

const ACTION_JOB_CODE = {
    BATTLE: 'fighting',
    HUNT: 'fighting',
    DUNGEON: 'fighting',
    EXPLORE: 'scavenging',
    FORAGE: 'gathering',
    MINE: 'gathering',
    CHOP: 'gathering',
};

const BIOME_ENEMY_LIST = {
    urban: ['Infected scavenger', 'Barricade raider', 'Basement stalker'],
    rural: ['Dust-bitten raider', 'Field infected', 'Ranch marauder'],
    coast: ['Dock raider', 'Drowned infected', 'Harbor smuggler'],
    forest: ['Lost hunter', 'Spore infected', 'Trail ambusher'],
    desert: ['Sun-bleached raider', 'Wasteland stalker', 'Drone remnant'],
    safe: [],
};

const BIOME_GATHER_LIST = {
    urban: ['Scrap metal', 'Medicine cabinet', 'Electronics box', 'Canned food shelf'],
    rural: ['Seed crate', 'Irrigation water', 'Old tool rack', 'Stored grain'],
    coast: ['Salt deposit', 'Plastic salvage', 'Fishing crate', 'Rope coil'],
    forest: ['Medicinal herbs', 'Fallen timber', 'Mushroom cluster', 'Hidden supply cache'],
    desert: ['Solar cell shard', 'Glass scrap', 'Battery casing', 'Dry research crate'],
    safe: [],
};

function pickActivityTag(poi, tagTypes) {
    return (poi.gameplay_tags || []).find(tag => tagTypes.includes(tag.tag_type));
}

function normalizeActivityType(activityType) {
    const value = String(activityType || '').toLowerCase();
    if (value === 'enemy') return { tagTypes: ['BATTLE', 'SKIRMISH'], label: 'Enemy', fallbackAction: 'BATTLE' };
    if (value === 'gather') return { tagTypes: ['EXPLORATION'], label: 'Gather', fallbackAction: 'EXPLORE' };
    if (value === 'dungeon') return { tagTypes: ['DUNGEON'], label: 'Dungeon', fallbackAction: 'DUNGEON' };
    return null;
}

function calculateActionResourceCost(actionType, durationSeconds, tag) {
    const rule = ACTION_RESOURCE_RULES[actionType] || ACTION_RESOURCE_RULES.EXPLORE;
    const actionUnits = Math.max(1, Math.ceil((parseInt(durationSeconds) || 0) / 1800));
    const energyMultiplier = parseFloat(tag?.energy_cost_mult) || 1;

    return {
        energyCost: Math.max(0, Math.ceil(rule.energyPerUnit * actionUnits * energyMultiplier)),
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
        DUNGEON: { player: 1.05, job: 0.48 },
    };
    const rate = baseRates[actionType] || baseRates.EXPLORE;
    const levelMult = 1 + Math.max(0, (parseInt(zoneMinLevel) || 1) - 1) * 0.035;
    return {
        playerExp: Math.max(1, Math.floor(rate.player * durationSeconds * levelMult)),
        jobExp: Math.max(1, Math.floor(rate.job * durationSeconds * levelMult)),
    };
}

async function findJobIdByCode(jobCode) {
    if (!jobCode) return null;
    const result = await dbPool.query(`SELECT id FROM jobs_seed WHERE code = $1;`, [jobCode]);
    return result.rows[0]?.id || null;
}

function buildEnemyList(zone, poi, tag) {
    if (!tag) return [];
    const baseLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    const biome = zone.biome || zone.zone_type || 'urban';
    const names = BIOME_ENEMY_LIST[biome] || BIOME_ENEMY_LIST.urban;

    return names.map((name, index) => ({
        id: `${poi.code}_enemy_${index + 1}`,
        name,
        level: baseLevel + index,
        threat: index === 2 ? 'Elite' : (index === 1 ? 'Veteran' : 'Common'),
        reward_hint: index === 2 ? 'Better gear chance' : 'EXP and common loot',
        action_type: tag.action_type,
        gameplay_tag: tag,
    }));
}

function buildGatherList(zone, poi, tag) {
    if (!tag) return [];
    const baseLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    const biome = zone.biome || zone.zone_type || 'urban';
    const names = BIOME_GATHER_LIST[biome] || BIOME_GATHER_LIST.urban;

    return names.map((name, index) => ({
        id: `${poi.code}_gather_${index + 1}`,
        name,
        item_level: baseLevel,
        rarity_hint: index >= 2 ? 'Uncommon chance' : 'Common',
        reward_hint: tag.loot_focus?.join(', ') || 'materials',
        action_type: tag.action_type,
        gameplay_tag: tag,
    }));
}

function buildDungeonInfo(zone, poi, tag) {
    if (!tag) return null;
    const mapLevel = parseInt(zone.level_gap || zone.min_player_lv || 1);
    return {
        id: `${poi.code}_dungeon`,
        name: `${poi.display_name} Instance`,
        map_level: mapLevel,
        normal: {
            monster_level: mapLevel,
            reward_hint: 'Map-level gear and materials',
        },
        hard: {
            monster_level_rule: 'Highest party member level',
            new_player_aura: 'HP and armor boosted, damage unchanged',
            reward_hint: 'Low-level players get better rarity; high-level players get upgrade materials',
        },
        action_type: tag.action_type,
        gameplay_tag: tag,
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
                   z.biome, z.level_gap, z.min_player_lv, z.infection_risk, z.radiation_risk,
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
            level_gap: poi.level_gap,
            min_player_lv: poi.min_player_lv,
            infection_risk: poi.infection_risk,
            radiation_risk: poi.radiation_risk,
        };

        const enemyTag = pickActivityTag(poi, ['BATTLE', 'SKIRMISH']);
        const gatherTag = pickActivityTag(poi, ['EXPLORATION']);
        const dungeonTag = pickActivityTag(poi, ['DUNGEON']);
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
            enemies: buildEnemyList(zone, poi, enemyTag),
            gatherables: buildGatherList(zone, poi, gatherTag),
            dungeon: buildDungeonInfo(zone, poi, dungeonTag),
        };

        if (type === 'enemy') return res.json({ success: true, data: { ...payload, gatherables: [], dungeon: null } });
        if (type === 'gather') return res.json({ success: true, data: { ...payload, enemies: [], dungeon: null } });
        if (type === 'dungeon') return res.json({ success: true, data: { ...payload, enemies: [], gatherables: [] } });

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
    const { playerId, activityType, targetId, mode } = req.body;
    const activity = normalizeActivityType(activityType);

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
                   z.zone_type, z.biome, z.level_gap, z.min_player_lv,
                   z.base_duration_s, z.infection_risk, z.radiation_risk,
                   pgt.id AS tag_id, pgt.tag_type, pgt.action_type,
                   pgt.energy_cost_mult, pgt.loot_focus,
                   pgt.monster_profile, pgt.dungeon_rank_rewards
            FROM world_pois wp
            JOIN zones z ON z.id = wp.zone_id
            JOIN poi_gameplay_tags pgt ON pgt.poi_id = wp.id
            WHERE wp.id = $1 AND pgt.tag_type = ANY($2::VARCHAR[])
            ORDER BY
                CASE pgt.tag_type
                    WHEN 'DUNGEON' THEN 1
                    WHEN 'BATTLE' THEN 2
                    WHEN 'SKIRMISH' THEN 3
                    WHEN 'EXPLORATION' THEN 4
                    ELSE 5
                END
            LIMIT 1;
        `, [poiId, activity.tagTypes]);

        if (poiResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'This POI does not support that activity.' });
        }

        const poi = poiResult.rows[0];
        const mapLevel = parseInt(poi.level_gap || poi.min_player_lv || 1);
        const actionType = poi.action_type || activity.fallbackAction;
        const baseDuration = Math.max(30, parseInt(poi.base_duration_s) || 60);
        const durationSeconds = mode === 'hard' && actionType === 'DUNGEON'
            ? Math.ceil(baseDuration * 1.5)
            : baseDuration;
        const tag = {
            energy_cost_mult: poi.energy_cost_mult,
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

        const expReward = calculateExpReward(actionType, durationSeconds, mapLevel);
        const playerExpResult = await progressionService.processPlayerExpGain(playerId, expReward.playerExp);
        const jobId = await findJobIdByCode(ACTION_JOB_CODE[actionType]);
        const jobExpResult = jobId
            ? await progressionService.processJobExpGain(playerId, jobId, expReward.jobExp)
            : null;
        const lootResult = await lootService.processLootDrop(playerId, {
            action_type: actionType,
            actual_duration_s: durationSeconds,
            zone_min_level: mapLevel,
        });

        executionSummary = {
            poi_id: poi.poi_id,
            poi_name: poi.poi_name,
            zone_code: poi.zone_code,
            zone_name: poi.zone_name,
            activity_type: activityType,
            target_id: targetId || null,
            mode: mode || 'normal',
            action_type: actionType,
            duration_seconds: durationSeconds,
            energy_cost: cost.energyCost,
            infection_gained: hazard.infectionGain,
            radiation_gained: hazard.radiationGain,
            player_exp: expReward.playerExp,
            job_exp: expReward.jobExp,
            player_exp_result: playerExpResult,
            job_exp_result: jobExpResult,
            items_dropped: lootResult.items_dropped || [],
            player_resources: updatedPlayer.rows[0],
        };

        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'POI_ACTIVITY',
            source: 'Zystem',
            title: `${activity.label} Completed`,
            message: `${activity.label} at ${poi.poi_name}. Energy -${cost.energyCost}.`,
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

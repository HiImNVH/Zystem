// backend/src/routes/routes.zones.js
// Endpoint tra ve danh sach zone va thong tin khu vuc

const express = require('express');
const zonesRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');

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
                            'fatigue_mult', pgt.fatigue_mult,
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
                               'fatigue_mult', pgt.fatigue_mult,
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
                            'fatigue_mult', pgt.fatigue_mult,
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

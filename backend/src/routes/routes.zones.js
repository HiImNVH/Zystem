// backend/src/routes/routes.zones.js
// Endpoint tra ve danh sach zone va thong tin khu vuc

const express = require('express');
const zonesRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');

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

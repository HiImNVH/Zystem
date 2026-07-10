// backend/src/services/services.layerApi.js

const { dbPool } = require('../repositories/repositories.database');
const characterRepository = require('../repositories/repositories.character');
const walletRepository = require('../repositories/repositories.wallet');
const characterService = require('./services.character');
const {
    ensurePlayerDefaultJobs,
    autoUnlockFreeSkills,
    getRefundCountToday,
    MAX_REFUNDS_PER_DAY,
} = require('../repositories/repositories.skillsSeed');

const DEFAULT_PLAYER_SETTINGS = {
    ui: {
        layout: 'mobile_sync',
        activeLayer: 'zone',
    },
    gameplay: {
        autoRefreshPoiMinutes: 15,
    },
};

function mergeSettings(config) {
    const currentSettings = config?.currentSettings || {};
    const nextSettings = config?.nextSettings || {};

    return {
        ...DEFAULT_PLAYER_SETTINGS,
        ...currentSettings,
        ...nextSettings,
        ui: {
            ...DEFAULT_PLAYER_SETTINGS.ui,
            ...(currentSettings.ui || {}),
            ...(nextSettings.ui || {}),
        },
        gameplay: {
            ...DEFAULT_PLAYER_SETTINGS.gameplay,
            ...(currentSettings.gameplay || {}),
            ...(nextSettings.gameplay || {}),
        },
    };
}

function assertPlainObject(value) {
    if (!value || Array.isArray(value) || typeof value !== 'object') {
        throw new Error('Settings payload must be an object.');
    }
}

async function getZoneLayer() {
    const result = await dbPool.query(`
        SELECT z.id, z.code, z.display_name, z.zone_type, z.biome, z.zone_tags,
               z.level_gap, z.world_stage, z.map_role, z.min_player_lv,
               z.base_duration_s, z.infection_risk, z.radiation_risk,
               COUNT(wp.id)::INT AS poi_count
        FROM zones z
        LEFT JOIN world_pois wp ON wp.zone_id = z.id
        WHERE z.is_active = TRUE
        GROUP BY z.id
        ORDER BY z.level_gap ASC, z.display_name ASC;
    `);

    return {
        layer: 'ZONE',
        zones: result.rows,
    };
}

async function getPoiLayerByZone(zoneCode) {
    const result = await dbPool.query(`
        SELECT id, code, display_name, zone_type, biome, zone_tags, level_gap,
               world_stage, map_role, min_player_lv, base_duration_s,
               infection_risk, radiation_risk
        FROM zones
        WHERE code = $1 AND is_active = TRUE
        LIMIT 1;
    `, [zoneCode]);

    if (result.rows.length === 0) return null;

    const zone = result.rows[0];
    const poisResult = await dbPool.query(`
        SELECT
            wp.id, wp.code, wp.display_name, wp.poi_type, wp.description,
            wp.is_dungeon, wp.entry_requirement,
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
        WHERE wp.zone_id = $1
        GROUP BY wp.id
        ORDER BY wp.display_name ASC;
    `, [zone.id]);

    return {
        layer: 'POI',
        zone,
        pois: poisResult.rows,
    };
}

async function getPoiDetailLayer(poiId) {
    const poiResult = await dbPool.query(`
        SELECT wp.id, wp.code, wp.display_name, wp.poi_type, wp.description,
               wp.is_dungeon, wp.entry_requirement,
               z.code AS zone_code, z.display_name AS zone_name, z.zone_type,
               z.biome, z.zone_tags, z.level_gap, z.min_player_lv
        FROM world_pois wp
        JOIN zones z ON z.id = wp.zone_id
        WHERE wp.id = $1
        LIMIT 1;
    `, [poiId]);

    if (poiResult.rows.length === 0) return null;

    const tagResult = await dbPool.query(`
        SELECT id, tag_type, action_type, energy_cost_mult, loot_focus,
               monster_profile, dungeon_rank_rewards
        FROM poi_gameplay_tags
        WHERE poi_id = $1
        ORDER BY tag_type ASC;
    `, [poiId]);

    const roomResult = await dbPool.query(`
        SELECT id, code, display_name, room_type, room_tags, loot_focus, sort_order
        FROM world_poi_rooms
        WHERE poi_id = $1
        ORDER BY sort_order ASC, display_name ASC;
    `, [poiId]);

    return {
        layer: 'POI_DETAIL',
        poi: poiResult.rows[0],
        gameplay_tags: tagResult.rows,
        rooms: roomResult.rows,
    };
}

async function getSkillLayer(playerId) {
    await ensurePlayerDefaultJobs(playerId);
    await autoUnlockFreeSkills(playerId);

    const skillResult = await dbPool.query(`
        SELECT
            js.id, js.job_code, js.branch, js.skill_code, js.skill_name,
            js.lv_required, js.sp_cost, js.tier,
            js.effect_type, js.effect_val, js.description,
            js.prerequisite_skill_code, js.row_group,
            pj.job_level,
            COALESCE(ps.is_unlocked, FALSE) AS is_unlocked,
            ps.unlocked_at
        FROM job_skills js
        JOIN jobs_seed jseed ON js.job_code = jseed.code
        JOIN player_jobs pj ON pj.job_id = jseed.id AND pj.player_id = $1
        LEFT JOIN player_skills ps ON ps.skill_id = js.id AND ps.player_id = $1
        ORDER BY js.job_code ASC, js.tier ASC, js.lv_required ASC;
    `, [playerId]);

    const jobsResult = await dbPool.query(`
        SELECT js.code, js.display_name, js.category, pj.job_level,
               pj.current_exp, pj.sp_invested
        FROM player_jobs pj
        JOIN jobs_seed js ON js.id = pj.job_id
        WHERE pj.player_id = $1
        ORDER BY js.category ASC, js.display_name ASC;
    `, [playerId]);

    const usedToday = await getRefundCountToday(playerId);

    return {
        layer: 'SKILL',
        jobs: jobsResult.rows,
        skills: skillResult.rows,
        refund_status: {
            used_today: usedToday,
            remaining_today: MAX_REFUNDS_PER_DAY - usedToday,
            max_per_day: MAX_REFUNDS_PER_DAY,
            resets_at: 'Midnight (00:00 server time)',
        },
    };
}

async function getProfileLayer(playerId) {
    const character = await characterRepository.findCharacterById(playerId);
    if (!character) return null;

    const [stats, wallet, jobsResult, equippedResult] = await Promise.all([
        characterService.calculateTotalStats(playerId),
        walletRepository.getWalletByPlayer(playerId),
        dbPool.query(`
            SELECT js.code, js.display_name, js.category, pj.job_level,
                   pj.current_exp, pj.sp_invested
            FROM player_jobs pj
            JOIN jobs_seed js ON js.id = pj.job_id
            WHERE pj.player_id = $1
            ORDER BY js.category ASC, js.display_name ASC;
        `, [playerId]),
        dbPool.query(`
            SELECT i.id, i.rarity, i.item_level, i.equip_slot,
                   it.code, it.display_name, it.category, it.tags
            FROM items i
            JOIN item_templates it ON it.id = i.template_id
            WHERE i.owner_player_id = $1 AND i.is_equipped = TRUE
            ORDER BY i.equip_slot ASC, it.display_name ASC;
        `, [playerId]),
    ]);

    return {
        layer: 'PROFILE',
        character,
        stats,
        wallet,
        jobs: jobsResult.rows,
        equipped_items: equippedResult.rows,
    };
}

async function getSettingsLayer(playerId) {
    const result = await dbPool.query(`
        INSERT INTO player_settings (player_id, settings)
        VALUES ($1, $2::JSONB)
        ON CONFLICT (player_id) DO NOTHING
        RETURNING player_id, settings, updated_at;
    `, [playerId, JSON.stringify(DEFAULT_PLAYER_SETTINGS)]);

    if (result.rows.length > 0) {
        return {
            layer: 'SETTING',
            ...result.rows[0],
        };
    }

    const savedResult = await dbPool.query(`
        SELECT player_id, settings, updated_at
        FROM player_settings
        WHERE player_id = $1;
    `, [playerId]);

    const row = savedResult.rows[0];
    return {
        layer: 'SETTING',
        ...row,
        settings: mergeSettings({ currentSettings: row?.settings || {} }),
    };
}

async function updateSettingsLayer(config) {
    assertPlainObject(config?.settings);

    const current = await getSettingsLayer(config.playerId);
    const mergedSettings = mergeSettings({
        currentSettings: current.settings,
        nextSettings: config.settings,
    });

    const result = await dbPool.query(`
        INSERT INTO player_settings (player_id, settings, updated_at)
        VALUES ($1, $2::JSONB, NOW())
        ON CONFLICT (player_id) DO UPDATE SET
            settings = EXCLUDED.settings,
            updated_at = NOW()
        RETURNING player_id, settings, updated_at;
    `, [config.playerId, JSON.stringify(mergedSettings)]);

    return {
        layer: 'SETTING',
        ...result.rows[0],
    };
}

module.exports = {
    getZoneLayer,
    getPoiLayerByZone,
    getPoiDetailLayer,
    getSkillLayer,
    getProfileLayer,
    getSettingsLayer,
    updateSettingsLayer,
    DEFAULT_PLAYER_SETTINGS,
};

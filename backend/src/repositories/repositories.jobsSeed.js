// backend/src/repositories/repositories.jobsSeed.js

const { dbPool } = require('./repositories.database');

const jobsList = [
    { code: 'fighting',   name: 'Fighting',   cat: 'combat',     str: 0.7, agi: 0.4, dex: 0.0, vit: 0.4, int: 0.0, chr: 0.0 },
    { code: 'scavenging', name: 'Scavenging', cat: 'survival',   str: 0.4, agi: 0.7, dex: 0.0, vit: 0.4, int: 0.0, chr: 0.0 },
    { code: 'cooking',    name: 'Cooking',    cat: 'survival',   str: 0.0, agi: 0.0, dex: 0.4, vit: 0.0, int: 0.4, chr: 0.7 },
    { code: 'gathering',  name: 'Gathering',  cat: 'survival',   str: 0.0, agi: 0.4, dex: 0.7, vit: 0.0, int: 0.4, chr: 0.0 },
    { code: 'crafting',   name: 'Crafting',   cat: 'production', str: 0.0, agi: 0.0, dex: 0.4, vit: 0.0, int: 0.7, chr: 0.4 },
    { code: 'building',   name: 'Building',   cat: 'production', str: 0.4, agi: 0.0, dex: 0.0, vit: 0.7, int: 0.0, chr: 0.4 },
];

const achievementsList = [
    {
        code: 'first_blood',
        name: 'First Blood',
        desc: 'Defeat a dangerous target for the first time.',
        cond_type: 'kill_count', cond_val: 1, sp: 5,
        str: 2, agi: 0, dex: 0, vit: 0, int: 0, chr: 0
    },
    {
        code: 'resource_hoarder',
        name: 'Resource Hoarder',
        desc: 'Gather a total of 10000 resource units.',
        cond_type: 'resource_gather', cond_val: 10000, sp: 10,
        str: 0, agi: 0, dex: 0, vit: 5, int: 5, chr: 0
    },
    {
        code: 'survivor_week',
        name: 'One-Week Survivor',
        desc: 'Survive 7 consecutive days without being defeated.',
        cond_type: 'days_survived', cond_val: 7, sp: 10,
        str: 0, agi: 0, dex: 0, vit: 5, int: 0, chr: 5
    },
];

const zonesList = [
    { code: 'ZONE_SAFE_CAMP', name: 'Refugee Camp', type: 'safe', biome: 'safe', level_gap: 1, stage: 'home', role: 'home_base', min_lv: 1, duration: 0, inf: 0.00, rad: 0.00 },
    { code: 'ZONE_RIVERSIDE_SUBURB_LV5', name: 'Camp Perimeter Suburb', type: 'urban', biome: 'urban', level_gap: 5, stage: 'early', role: 'suburb', min_lv: 5, duration: 90, inf: 0.60, rad: 0.00 },
    { code: 'ZONE_BROKEN_MARKET_LV10', name: 'Outer Market District', type: 'urban', biome: 'urban', level_gap: 10, stage: 'early', role: 'market', min_lv: 10, duration: 120, inf: 1.20, rad: 0.10 },
    { code: 'ZONE_SOUTH_FACTORY_LV15', name: 'South Industrial Fringe', type: 'urban', biome: 'urban', level_gap: 15, stage: 'mid', role: 'industrial', min_lv: 15, duration: 180, inf: 1.80, rad: 0.30 },
    { code: 'ZONE_OUTER_GREENBELT_LV15', name: 'Greenbelt Checkpoint', type: 'forest', biome: 'forest', level_gap: 15, stage: 'mid', role: 'woodland', min_lv: 15, duration: 180, inf: 1.40, rad: 0.10 },
    { code: 'ZONE_FISHING_PIER_LV20', name: 'Coastal Pier Outskirts', type: 'coast', biome: 'coast', level_gap: 20, stage: 'mid', role: 'pier', min_lv: 20, duration: 240, inf: 1.70, rad: 0.20 },
    { code: 'ZONE_OLD_FARMLAND_LV20', name: 'Old Farmland Belt', type: 'rural', biome: 'rural', level_gap: 20, stage: 'mid', role: 'farm', min_lv: 20, duration: 240, inf: 1.50, rad: 0.10 },
    { code: 'ZONE_EASTERN_QUARRY_LV25', name: 'Eastern Quarry Road', type: 'rural', biome: 'rural', level_gap: 25, stage: 'mid', role: 'mine', min_lv: 25, duration: 300, inf: 2.00, rad: 0.60 },
    { code: 'ZONE_LOGISTICS_WAREHOUSE_LV25', name: 'Logistics Warehouse Belt', type: 'urban', biome: 'urban', level_gap: 25, stage: 'mid', role: 'warehouse', min_lv: 25, duration: 300, inf: 2.30, rad: 0.40 },
    { code: 'ZONE_DOWNTOWN_RUINS_LV30', name: 'Downtown Ruins Approach', type: 'urban', biome: 'urban', level_gap: 30, stage: 'end', role: 'city_core', min_lv: 30, duration: 420, inf: 3.20, rad: 1.00 },
    { code: 'ZONE_DEEP_REDWOOD_LV30', name: 'Deep Redwood Border', type: 'forest', biome: 'forest', level_gap: 30, stage: 'end', role: 'deep_forest', min_lv: 30, duration: 420, inf: 2.80, rad: 0.60 },
    { code: 'ZONE_FLOODED_CARGO_PORT_LV30', name: 'Flooded Cargo Port', type: 'coast', biome: 'coast', level_gap: 30, stage: 'end', role: 'port', min_lv: 30, duration: 420, inf: 2.60, rad: 0.80 },
    { code: 'ZONE_SOLAR_WASTELAND_LV35', name: 'Solar Wasteland Expanse', type: 'desert', biome: 'desert', level_gap: 35, stage: 'end', role: 'energy_ruins', min_lv: 35, duration: 540, inf: 2.20, rad: 1.80 },
    { code: 'ZONE_DEEP_IRON_MINE_LV35', name: 'Deep Iron Mine', type: 'rural', biome: 'rural', level_gap: 35, stage: 'end', role: 'deep_mine', min_lv: 35, duration: 540, inf: 2.80, rad: 1.20 },
    { code: 'ZONE_CONTAMINATED_RANCH_LV35', name: 'Contaminated Ranchland', type: 'rural', biome: 'rural', level_gap: 35, stage: 'end', role: 'ranch', min_lv: 35, duration: 540, inf: 4.00, rad: 1.00 },
    { code: 'ZONE_MEGA_CITY_CORE_LV40', name: 'Mega City Core', type: 'urban', biome: 'urban', level_gap: 40, stage: 'end', role: 'mega_city', min_lv: 40, duration: 720, inf: 4.50, rad: 1.50 },
    { code: 'ZONE_NUCLEAR_PERIMETER_LV40', name: 'Nuclear Plant Perimeter', type: 'urban', biome: 'urban', level_gap: 40, stage: 'end', role: 'nuclear_industrial', min_lv: 40, duration: 720, inf: 5.00, rad: 4.00 },
    { code: 'ZONE_FALLEN_BASE_LV40', name: 'Fallen Forward Base', type: 'rural', biome: 'rural', level_gap: 40, stage: 'end', role: 'military', min_lv: 40, duration: 720, inf: 4.20, rad: 2.00 },
    { code: 'ZONE_OFFSHORE_TERMINAL_LV40', name: 'Offshore Terminal', type: 'coast', biome: 'coast', level_gap: 40, stage: 'end', role: 'offshore', min_lv: 40, duration: 720, inf: 3.60, rad: 2.50 },
];

const poiSeedList = [
    { zone: 'ZONE_RIVERSIDE_SUBURB_LV5', code: 'POI_LV5_ROW_HOUSES', name: 'Row Houses', type: 'residential', tags: ['EXPLORATION', 'SKIRMISH'] },
    { zone: 'ZONE_RIVERSIDE_SUBURB_LV5', code: 'POI_LV5_DRAINAGE_CANAL', name: 'Drainage Canal', type: 'utility', tags: ['EXPLORATION'] },
    { zone: 'ZONE_BROKEN_MARKET_LV10', code: 'POI_LV10_SUPERMARKET', name: 'Ruined Supermarket', type: 'market', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_BROKEN_MARKET_LV10', code: 'POI_LV10_PARKING_BASEMENT', name: 'Underground Parking', type: 'dungeon', dungeon: true, tags: ['BATTLE', 'DUNGEON'] },
    { zone: 'ZONE_SOUTH_FACTORY_LV15', code: 'POI_LV15_STEEL_SHOP', name: 'Old Steel Shop', type: 'industrial', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_SOUTH_FACTORY_LV15', code: 'POI_LV15_POWER_SUBSTATION', name: 'Power Substation', type: 'utility', tags: ['EXPLORATION', 'DUNGEON'] },
    { zone: 'ZONE_OUTER_GREENBELT_LV15', code: 'POI_LV15_RANGER_TOWER', name: 'Ranger Tower', type: 'landmark', tags: ['EXPLORATION', 'SKIRMISH'] },
    { zone: 'ZONE_OUTER_GREENBELT_LV15', code: 'POI_LV15_HUNTER_CAMP', name: 'Hunter Camp', type: 'camp', tags: ['SKIRMISH', 'EXPLORATION'] },
    { zone: 'ZONE_FISHING_PIER_LV20', code: 'POI_LV20_FISHING_PIER', name: 'Collapsed Fishing Pier', type: 'pier', tags: ['EXPLORATION', 'SKIRMISH'] },
    { zone: 'ZONE_FISHING_PIER_LV20', code: 'POI_LV20_LIGHTHOUSE', name: 'Salt-stained Lighthouse', type: 'dungeon', dungeon: true, tags: ['BATTLE', 'DUNGEON'] },
    { zone: 'ZONE_OLD_FARMLAND_LV20', code: 'POI_LV20_FARMHOUSE', name: 'Abandoned Farmhouse', type: 'farm', tags: ['EXPLORATION', 'SKIRMISH'] },
    { zone: 'ZONE_OLD_FARMLAND_LV20', code: 'POI_LV20_IRRIGATION_CANAL', name: 'Irrigation Canal', type: 'water', tags: ['EXPLORATION'] },
    { zone: 'ZONE_EASTERN_QUARRY_LV25', code: 'POI_LV25_QUARRY_FACE', name: 'Quarry Face', type: 'mine', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_EASTERN_QUARRY_LV25', code: 'POI_LV25_OLD_SHAFT', name: 'Old Mine Shaft', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
    { zone: 'ZONE_LOGISTICS_WAREHOUSE_LV25', code: 'POI_LV25_CONTAINER_YARD', name: 'Container Yard', type: 'warehouse', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_LOGISTICS_WAREHOUSE_LV25', code: 'POI_LV25_FUEL_DEPOT', name: 'Fuel Depot', type: 'industrial', tags: ['EXPLORATION', 'DUNGEON'] },
    { zone: 'ZONE_DOWNTOWN_RUINS_LV30', code: 'POI_LV30_METRO_STATION', name: 'Collapsed Metro Station', type: 'dungeon', dungeon: true, tags: ['BATTLE', 'DUNGEON'] },
    { zone: 'ZONE_DOWNTOWN_RUINS_LV30', code: 'POI_LV30_HOSPITAL', name: 'Quarantined Hospital', type: 'medical', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_DEEP_REDWOOD_LV30', code: 'POI_LV30_DEEP_GROVE', name: 'Deep Grove', type: 'forest', tags: ['EXPLORATION', 'SKIRMISH'] },
    { zone: 'ZONE_DEEP_REDWOOD_LV30', code: 'POI_LV30_ROOT_CAVE', name: 'Root-choked Cave', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
    { zone: 'ZONE_FLOODED_CARGO_PORT_LV30', code: 'POI_LV30_SHIPWRECK', name: 'Half-sunk Shipwreck', type: 'shipwreck', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_FLOODED_CARGO_PORT_LV30', code: 'POI_LV30_CUSTOMS_HOUSE', name: 'Customs House', type: 'dungeon', dungeon: true, tags: ['DUNGEON'] },
    { zone: 'ZONE_SOLAR_WASTELAND_LV35', code: 'POI_LV35_SOLAR_ARRAY', name: 'Broken Solar Array', type: 'desert_ruin', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_SOLAR_WASTELAND_LV35', code: 'POI_LV35_RESEARCH_OUTPOST', name: 'Dry Research Outpost', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
    { zone: 'ZONE_DEEP_IRON_MINE_LV35', code: 'POI_LV35_DEEP_SHAFT', name: 'Deep Shaft', type: 'mine', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_DEEP_IRON_MINE_LV35', code: 'POI_LV35_DRILL_CORE', name: 'Drill Core Chamber', type: 'dungeon', dungeon: true, tags: ['DUNGEON'] },
    { zone: 'ZONE_CONTAMINATED_RANCH_LV35', code: 'POI_LV35_MUTANT_BARNS', name: 'Mutant Barns', type: 'ranch', tags: ['SKIRMISH', 'EXPLORATION'] },
    { zone: 'ZONE_CONTAMINATED_RANCH_LV35', code: 'POI_LV35_FEED_SILO', name: 'Feed Silo Nest', type: 'dungeon', dungeon: true, tags: ['BATTLE', 'DUNGEON'] },
    { zone: 'ZONE_MEGA_CITY_CORE_LV40', code: 'POI_LV40_FINANCIAL_TOWER', name: 'Financial Tower', type: 'highrise', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_MEGA_CITY_CORE_LV40', code: 'POI_LV40_UNDERCITY', name: 'Undercity Access', type: 'dungeon', dungeon: true, tags: ['DUNGEON'] },
    { zone: 'ZONE_NUCLEAR_PERIMETER_LV40', code: 'POI_LV40_REACTOR_YARD', name: 'Reactor Yard', type: 'nuclear', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_NUCLEAR_PERIMETER_LV40', code: 'POI_LV40_COOLING_TUNNEL', name: 'Cooling Tunnel', type: 'dungeon', dungeon: true, tags: ['DUNGEON'] },
    { zone: 'ZONE_FALLEN_BASE_LV40', code: 'POI_LV40_ARMORY', name: 'Forward Armory', type: 'military', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_FALLEN_BASE_LV40', code: 'POI_LV40_COMMAND_BUNKER', name: 'Command Bunker', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
    { zone: 'ZONE_OFFSHORE_TERMINAL_LV40', code: 'POI_LV40_OIL_PLATFORM', name: 'Oil Platform Deck', type: 'offshore', tags: ['EXPLORATION', 'BATTLE'] },
    { zone: 'ZONE_OFFSHORE_TERMINAL_LV40', code: 'POI_LV40_TERMINAL_CORE', name: 'Terminal Core', type: 'dungeon', dungeon: true, tags: ['DUNGEON'] },
];

const TAG_ACTION_TYPE = {
    EXPLORATION: 'EXPLORE',
    SKIRMISH: 'HUNT',
    BATTLE: 'BATTLE',
    DUNGEON: 'DUNGEON',
};

async function seedJobsSeedTable() {
    try {
        const jobCount = await dbPool.query('SELECT COUNT(*) FROM jobs_seed;');
        if (parseInt(jobCount.rows[0].count) === 0) {
            console.log('[INFO] Dang nap 6 ky nang chinh theo Data Design...');
            const insertQuery = `
                INSERT INTO jobs_seed (code, display_name, category, str_per_lv, agi_per_lv, dex_per_lv, vit_per_lv, int_per_lv, chr_per_lv, is_available, unlock_patch)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE, '1.0');
            `;
            for (const job of jobsList) {
                await dbPool.query(insertQuery, [
                    job.code, job.name, job.cat,
                    job.str, job.agi, job.dex, job.vit, job.int, job.chr
                ]);
            }
            console.log('[SUCCESS] Da nap 6 ky nang chinh thanh cong!');
        } else {
            console.log('[INFO] Bang jobs_seed da co du lieu. Bo qua seeding.');
        }
        for (const job of jobsList) {
            await dbPool.query(
                `UPDATE jobs_seed SET display_name = $2, category = $3 WHERE code = $1;`,
                [job.code, job.name, job.cat]
            );
        }

        const achievementCount = await dbPool.query('SELECT COUNT(*) FROM achievements;');
        if (parseInt(achievementCount.rows[0].count) === 0) {
            const insertAchievementQuery = `
                INSERT INTO achievements (code, display_name, description, condition_type, condition_value, sp_bonus,
                    title_str_bonus, title_agi_bonus, title_dex_bonus, title_vit_bonus, title_int_bonus, title_chr_bonus)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);
            `;
            for (const achievement of achievementsList) {
                await dbPool.query(insertAchievementQuery, [
                    achievement.code, achievement.name, achievement.desc,
                    achievement.cond_type, achievement.cond_val, achievement.sp,
                    achievement.str, achievement.agi, achievement.dex,
                    achievement.vit, achievement.int, achievement.chr
                ]);
            }
            console.log('[SUCCESS] Da nap thanh tuu nen tang thanh cong!');
        }
        for (const achievement of achievementsList) {
            await dbPool.query(
                `UPDATE achievements SET display_name = $2, description = $3 WHERE code = $1;`,
                [achievement.code, achievement.name, achievement.desc]
            );
        }

        const insertZoneQuery = `
            INSERT INTO zones
                (code, display_name, zone_type, biome, level_gap, world_stage, map_role,
                 min_player_lv, base_duration_s, infection_risk, radiation_risk)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            ON CONFLICT (code) DO UPDATE SET
                display_name = EXCLUDED.display_name,
                zone_type = EXCLUDED.zone_type,
                biome = EXCLUDED.biome,
                level_gap = EXCLUDED.level_gap,
                world_stage = EXCLUDED.world_stage,
                map_role = EXCLUDED.map_role,
                min_player_lv = EXCLUDED.min_player_lv,
                base_duration_s = EXCLUDED.base_duration_s,
                infection_risk = EXCLUDED.infection_risk,
                radiation_risk = EXCLUDED.radiation_risk,
                is_active = TRUE;
        `;
        for (const zone of zonesList) {
            await dbPool.query(
                insertZoneQuery,
                [
                    zone.code, zone.name, zone.type, zone.biome, zone.level_gap, zone.stage, zone.role,
                    zone.min_lv, zone.duration, zone.inf, zone.rad
                ]
            );
        }
        await dbPool.query(
            `UPDATE zones SET is_active = FALSE WHERE code <> ALL($1::TEXT[]);`,
            [zonesList.map(zone => zone.code)]
        );
        console.log('[SUCCESS] Da nap/cap nhat world maps Lv.5-40 thanh cong!');

        const insertPoiQuery = `
            INSERT INTO world_pois
                (zone_id, code, display_name, poi_type, description, is_dungeon, entry_requirement)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            ON CONFLICT (code) DO UPDATE SET
                zone_id = EXCLUDED.zone_id,
                display_name = EXCLUDED.display_name,
                poi_type = EXCLUDED.poi_type,
                description = EXCLUDED.description,
                is_dungeon = EXCLUDED.is_dungeon,
                entry_requirement = EXCLUDED.entry_requirement
            RETURNING id;
        `;
        const insertTagQuery = `
            INSERT INTO poi_gameplay_tags
                (poi_id, tag_type, action_type, energy_cost_mult,
                 loot_focus, monster_profile, dungeon_rank_rewards)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            ON CONFLICT (poi_id, tag_type) DO UPDATE SET
                action_type = EXCLUDED.action_type,
                energy_cost_mult = EXCLUDED.energy_cost_mult,
                loot_focus = EXCLUDED.loot_focus,
                monster_profile = EXCLUDED.monster_profile,
                dungeon_rank_rewards = EXCLUDED.dungeon_rank_rewards;
        `;

        for (const poi of poiSeedList) {
            const zoneResult = await dbPool.query('SELECT id FROM zones WHERE code = $1;', [poi.zone]);
            if (zoneResult.rows.length === 0) continue;

            const insertedPoi = await dbPool.query(insertPoiQuery, [
                zoneResult.rows[0].id,
                poi.code,
                poi.name,
                poi.type,
                `${poi.name} inside ${poi.zone}.`,
                Boolean(poi.dungeon),
                poi.dungeon ? 'Dungeon key or hard-mode stamina budget.' : null,
            ]);

            for (const tag of poi.tags) {
                const isDungeon = tag === 'DUNGEON';
                const isBattle = tag === 'BATTLE' || tag === 'SKIRMISH';
                await dbPool.query(insertTagQuery, [
                    insertedPoi.rows[0].id,
                    tag,
                    TAG_ACTION_TYPE[tag],
                    isDungeon ? 1.35 : (isBattle ? 1.15 : 1.00),
                    tag === 'EXPLORATION' ? ['materials', 'food', 'salvage'] : ['combat', 'gear', 'materials'],
                    isBattle || isDungeon ? `${poi.type}_threats` : null,
                    isDungeon,
                ]);
            }
        }
        console.log('[SUCCESS] Da nap/cap nhat POI va gameplay tags thanh cong!');
    } catch (error) {
        console.error('[ERROR] Loi khi seed du lieu nen tang:', error.message);
    }
}

module.exports = {
    seedJobsSeedTable,
    seedJobsMatrix: seedJobsSeedTable
};

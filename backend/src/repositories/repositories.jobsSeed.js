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

const poiBlueprintsByBiome = {
    urban: [
        { code: 'ALLEY_BLOCK', name: 'Blocked Alley', type: 'residential', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'OPEN_MARKET', name: 'Open-air Market', type: 'market', tags: ['EXPLORATION'] },
        { code: 'MAINTENANCE_HUB', name: 'Maintenance Hub', type: 'utility', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'SERVICE_BASEMENT', name: 'Service Basement', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
        { code: 'STORAGE_ROW', name: 'Storage Row', type: 'warehouse', tags: ['EXPLORATION'] },
        { code: 'FIELD_CLINIC', name: 'Field Clinic', type: 'medical', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'SECURITY_POST', name: 'Security Post', type: 'military', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'HIGHRISE_LOBBY', name: 'Highrise Lobby', type: 'highrise', tags: ['EXPLORATION', 'BATTLE'] },
    ],
    rural: [
        { code: 'FARM_STORAGE', name: 'Farm Storage', type: 'farm', tags: ['EXPLORATION'] },
        { code: 'DRY_WELL', name: 'Dry Well', type: 'utility', tags: ['EXPLORATION'] },
        { code: 'ROADSIDE_CAMP', name: 'Roadside Camp', type: 'camp', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'SMALL_QUARRY', name: 'Small Quarry', type: 'mine', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'RANCH_GATE', name: 'Ranch Gate', type: 'ranch', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'SUPPLY_BARN', name: 'Supply Barn', type: 'warehouse', tags: ['EXPLORATION'] },
        { code: 'OLD_WATCHPOINT', name: 'Old Watchpoint', type: 'landmark', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'FIELD_BUNKER', name: 'Field Bunker', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
    ],
    forest: [
        { code: 'MOSSY_TRAIL', name: 'Mossy Trail', type: 'forest', tags: ['EXPLORATION'] },
        { code: 'RANGER_CACHE', name: 'Ranger Cache', type: 'camp', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'FALLEN_LOG_SITE', name: 'Fallen Log Site', type: 'landmark', tags: ['EXPLORATION'] },
        { code: 'ROOT_TUNNEL', name: 'Root Tunnel', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
        { code: 'WILD_ORCHARD', name: 'Wild Orchard', type: 'farm', tags: ['EXPLORATION'] },
        { code: 'HIDDEN_CAMP', name: 'Hidden Camp', type: 'camp', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'STONE_OUTCROP', name: 'Stone Outcrop', type: 'mine', tags: ['EXPLORATION'] },
        { code: 'LOOKOUT_RUIN', name: 'Lookout Ruin', type: 'landmark', tags: ['EXPLORATION', 'BATTLE'] },
    ],
    coast: [
        { code: 'TIDE_POOLS', name: 'Tide Pools', type: 'pier', tags: ['EXPLORATION'] },
        { code: 'NET_SHED', name: 'Net Shed', type: 'warehouse', tags: ['EXPLORATION'] },
        { code: 'WRECK_DECK', name: 'Wreck Deck', type: 'shipwreck', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'PUMP_ROOM', name: 'Pump Room', type: 'utility', tags: ['EXPLORATION'] },
        { code: 'DOCK_CAMP', name: 'Dock Camp', type: 'camp', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'FLOODED_HOLD', name: 'Flooded Hold', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
        { code: 'OFFSHORE_CRANE', name: 'Offshore Crane', type: 'offshore', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'LIGHT_MARKER', name: 'Light Marker', type: 'landmark', tags: ['EXPLORATION'] },
    ],
    desert: [
        { code: 'GLASS_FIELD', name: 'Glass Field', type: 'desert_ruin', tags: ['EXPLORATION'] },
        { code: 'SOLAR_SHED', name: 'Solar Shed', type: 'utility', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'DUST_DEPOT', name: 'Dust Depot', type: 'warehouse', tags: ['EXPLORATION'] },
        { code: 'DRY_OUTPOST', name: 'Dry Outpost', type: 'military', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'RESEARCH_CELLAR', name: 'Research Cellar', type: 'dungeon', dungeon: true, tags: ['DUNGEON', 'BATTLE'] },
        { code: 'SUN_TRACKER', name: 'Sun Tracker', type: 'landmark', tags: ['EXPLORATION'] },
        { code: 'BATTERY_FIELD', name: 'Battery Field', type: 'desert_ruin', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'PIPELINE_BREAK', name: 'Pipeline Break', type: 'utility', tags: ['EXPLORATION'] },
    ],
};

const TAG_ACTION_TYPE = {
    EXPLORATION: 'EXPLORE',
    SKIRMISH: 'HUNT',
    BATTLE: 'BATTLE',
    DUNGEON: 'DUNGEON',
};

function buildPoiSeedPool() {
    const generatedPois = zonesList
        .filter(zone => zone.type !== 'safe')
        .flatMap(zone => (poiBlueprintsByBiome[zone.biome] || []).map(blueprint => ({
            zone: zone.code,
            code: `${zone.code.replace('ZONE_', 'POI_')}_${blueprint.code}`,
            name: blueprint.name,
            type: blueprint.type,
            dungeon: blueprint.dungeon,
            tags: blueprint.tags,
        })));

    return [...poiSeedList, ...generatedPois];
}

const monsterProfileSeeds = [
    { profile: 'residential_threats', theme: 'Suburb', drops: ['Rubbish, Recyclable', 'Food, Canned', 'Material, Fabric'] },
    { profile: 'market_threats', theme: 'Market', drops: ['Food, Canned', 'Medicine', 'Rubbish, Plastic'] },
    { profile: 'dungeon_threats', theme: 'Depth', drops: ['Weapon', 'Equipment', 'Material, Metal'] },
    { profile: 'industrial_threats', theme: 'Industrial', drops: ['Material, Metal, Iron', 'Tool', 'Rubbish, Recyclable'] },
    { profile: 'utility_threats', theme: 'Utility', drops: ['Material, Component', 'Rubbish, Copper', 'Tool'] },
    { profile: 'landmark_threats', theme: 'Landmark', drops: ['Material, Wood', 'Food', 'Rubbish'] },
    { profile: 'camp_threats', theme: 'Camp', drops: ['Material, Leather', 'Food, Meat', 'Weapon'] },
    { profile: 'pier_threats', theme: 'Pier', drops: ['Material, Cordage', 'Food', 'Rubbish, Plastic'] },
    { profile: 'farm_threats', theme: 'Farm', drops: ['Seed', 'Food, Grain', 'Tool'] },
    { profile: 'mine_threats', theme: 'Mine', drops: ['Material, Ore', 'Material, Stone', 'Tool'] },
    { profile: 'warehouse_threats', theme: 'Warehouse', drops: ['Material, Component', 'Equipment', 'Rubbish, Recyclable'] },
    { profile: 'medical_threats', theme: 'Quarantine', drops: ['Medicine', 'Material, Fabric', 'Equipment'] },
    { profile: 'forest_threats', theme: 'Wildwood', drops: ['Material, Wood', 'Food, Mushroom', 'Medicine'] },
    { profile: 'shipwreck_threats', theme: 'Cargo', drops: ['Material, Salt', 'Material, Cordage', 'Equipment'] },
    { profile: 'desert_ruin_threats', theme: 'Solar', drops: ['Material, Glass', 'Material, Component', 'Equipment'] },
    { profile: 'ranch_threats', theme: 'Ranch', drops: ['Food, Meat', 'Material, Leather', 'Medicine'] },
    { profile: 'highrise_threats', theme: 'Highrise', drops: ['Equipment', 'Weapon', 'Material, Component'] },
    { profile: 'nuclear_threats', theme: 'Reactor', drops: ['Medicine, Booster', 'Material, Component', 'Equipment'] },
    { profile: 'military_threats', theme: 'Military', drops: ['Weapon', 'Equipment', 'Medicine'] },
    { profile: 'offshore_threats', theme: 'Offshore', drops: ['Material, Fuel', 'Tool', 'Equipment'] },
];

function buildMonsterRows() {
    const roles = [
        { suffix: 'stray', name: 'Stray Infected', rank: 'Common', levelOffset: 0, health: 80, attack: 11, defense: 4 },
        { suffix: 'stalker', name: 'Zone Stalker', rank: 'Veteran', levelOffset: 1, health: 125, attack: 17, defense: 8 },
        { suffix: 'brute', name: 'Mutated Brute', rank: 'Elite', levelOffset: 2, health: 190, attack: 24, defense: 13 },
    ];

    return monsterProfileSeeds.flatMap(seed => roles.map(role => ({
        code: `${seed.profile}_${role.suffix}`,
        name: `${seed.theme} ${role.name}`,
        profile: seed.profile,
        levelOffset: role.levelOffset,
        health: role.health,
        attack: role.attack,
        defense: role.defense,
        rank: role.rank,
        drops: seed.drops.map((drop, index) => ({
            tag_query: drop,
            chance: Number((0.48 - index * 0.12 + role.levelOffset * 0.04).toFixed(2)),
        })),
    })));
}

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

        for (const poi of buildPoiSeedPool()) {
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

        const insertMonsterQuery = `
            INSERT INTO monsters
                (code, display_name, monster_profile, base_level_offset,
                 health, attack, defense, drop_table, threat_rank)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            ON CONFLICT (code) DO UPDATE SET
                display_name = EXCLUDED.display_name,
                monster_profile = EXCLUDED.monster_profile,
                base_level_offset = EXCLUDED.base_level_offset,
                health = EXCLUDED.health,
                attack = EXCLUDED.attack,
                defense = EXCLUDED.defense,
                drop_table = EXCLUDED.drop_table,
                threat_rank = EXCLUDED.threat_rank;
        `;
        for (const monster of buildMonsterRows()) {
            await dbPool.query(insertMonsterQuery, [
                monster.code,
                monster.name,
                monster.profile,
                monster.levelOffset,
                monster.health,
                monster.attack,
                monster.defense,
                JSON.stringify(monster.drops),
                monster.rank,
            ]);
        }
        console.log('[SUCCESS] Da nap/cap nhat bang quai vat thanh cong!');
    } catch (error) {
        console.error('[ERROR] Loi khi seed du lieu nen tang:', error.message);
    }
}

module.exports = {
    seedJobsSeedTable,
    seedJobsMatrix: seedJobsSeedTable
};

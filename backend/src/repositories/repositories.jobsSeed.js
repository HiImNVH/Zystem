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
    { code: 'ZONE_SAFE_CAMP', name: 'Refugee Camp', type: 'safe', biome: 'safe', tags: [], level_gap: 1, stage: 'home', role: 'home_base', min_lv: 1, duration: 0, inf: 0.00, rad: 0.00 },
    { code: 'ZONE_CENTRAL_RESIDENTIAL_LV1', name: 'Central Residential District', type: 'urban', biome: 'urban', tags: ['town', 'city'], level_gap: 1, stage: 'center', role: 'starter_district', min_lv: 1, duration: 90, inf: 0.35, rad: 0.00 },
    { code: 'ZONE_MAJOR_URBAN_CENTER_LV5', name: 'Major Urban Center', type: 'urban', biome: 'urban', tags: ['city', 'town'], level_gap: 5, stage: 'north', role: 'urban_core', min_lv: 5, duration: 120, inf: 0.85, rad: 0.05 },
    { code: 'ZONE_HEAVY_INDUSTRIAL_LV10', name: 'Heavy Industrial District', type: 'urban', biome: 'urban', tags: ['industrial', 'city'], level_gap: 10, stage: 'north', role: 'factory_belt', min_lv: 10, duration: 150, inf: 1.30, rad: 0.20 },
    { code: 'ZONE_AGRICULTURAL_PLAINS_LV15', name: 'Agricultural Plains', type: 'rural', biome: 'rural', tags: ['rural'], level_gap: 15, stage: 'west', role: 'farm_plains', min_lv: 15, duration: 180, inf: 1.10, rad: 0.10 },
    { code: 'ZONE_WILD_FOREST_LV20', name: 'Wild Forest Thicket', type: 'forest', biome: 'forest', tags: ['forest'], level_gap: 20, stage: 'west', role: 'wild_forest', min_lv: 20, duration: 240, inf: 1.60, rad: 0.20 },
    { code: 'ZONE_GEOLOGICAL_MINE_LV25', name: 'Geological Mining Site', type: 'rural', biome: 'rural', tags: ['geological_mine', 'industrial'], level_gap: 25, stage: 'west', role: 'mine_site', min_lv: 25, duration: 300, inf: 2.00, rad: 0.70 },
    { code: 'ZONE_MILITARY_QUARANTINE_LV30', name: 'Military Quarantine Base', type: 'rural', biome: 'rural', tags: ['military', 'industrial'], level_gap: 30, stage: 'east', role: 'quarantine_base', min_lv: 30, duration: 420, inf: 3.20, rad: 1.20 },
    { code: 'ZONE_MANGROVE_SWAMP_LV30', name: 'Military Mangrove Swamp', type: 'coast', biome: 'coast', tags: ['swamp', 'coast', 'geological_mine'], level_gap: 30, stage: 'east', role: 'swamp_perimeter', min_lv: 30, duration: 420, inf: 2.80, rad: 0.90 },
    { code: 'ZONE_COASTAL_RESIDENTIAL_LV35', name: 'Coastal Residential District', type: 'coast', biome: 'coast', tags: ['coast', 'town'], level_gap: 35, stage: 'south', role: 'coastal_town', min_lv: 35, duration: 540, inf: 3.00, rad: 0.70 },
    { code: 'ZONE_BULK_SEA_PORT_LV40', name: 'Bulk Freight Sea Port', type: 'coast', biome: 'coast', tags: ['coast', 'industrial'], level_gap: 40, stage: 'south', role: 'cargo_port', min_lv: 40, duration: 720, inf: 3.80, rad: 1.50 },
];

const poiBlueprintsByZoneTag = {
    town: [
        { code: 'TWO_STORY_HOUSE', name: 'Two-story House', type: 'residential', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'BACKYARD_SHED', name: 'Backyard Shed', type: 'utility', tags: ['EXPLORATION'] },
        { code: 'SMALL_GROCERY', name: 'Small Grocery', type: 'market', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'TOWN_CLINIC_ROOM', name: 'Town Clinic Room', type: 'medical', tags: ['EXPLORATION'] },
        { code: 'BUS_STOP_KIOSK', name: 'Bus Stop Kiosk', type: 'landmark', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'DRAIN_TUNNEL', name: 'Drain Tunnel', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
    ],
    city: [
        { code: 'APARTMENT_301', name: 'Apartment 301', type: 'residential', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'PHARMACY_COUNTER', name: 'Pharmacy Counter', type: 'medical', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'OFFICE_FLOOR', name: 'Office Floor', type: 'highrise', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'PARKING_RAMP', name: 'Parking Ramp', type: 'warehouse', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'SUBWAY_PLATFORM', name: 'Subway Platform', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
        { code: 'MARKET_STALL_ROW', name: 'Market Stall Row', type: 'market', tags: ['EXPLORATION'] },
    ],
    rural: [
        { code: 'FARMHOUSE_KITCHEN', name: 'Farmhouse Kitchen', type: 'farm', tags: ['EXPLORATION'] },
        { code: 'SUPPLY_BARN', name: 'Supply Barn', type: 'warehouse', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'IRRIGATION_DITCH', name: 'Irrigation Ditch', type: 'utility', tags: ['EXPLORATION'] },
        { code: 'RANCH_GATE', name: 'Ranch Gate', type: 'ranch', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'ROADSIDE_CAMP', name: 'Roadside Camp', type: 'camp', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'FIELD_BUNKER', name: 'Field Bunker', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
    ],
    forest: [
        { code: 'MOSSY_CLEARING', name: 'Mossy Clearing', type: 'forest', tags: ['EXPLORATION'] },
        { code: 'FALLEN_LOG_CLUSTER', name: 'Fallen Log Cluster', type: 'forest', tags: ['EXPLORATION'] },
        { code: 'RANGER_CACHE', name: 'Ranger Cache', type: 'camp', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'HIDDEN_CAMPFIRE', name: 'Hidden Campfire', type: 'camp', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'ROOT_TUNNEL', name: 'Root Tunnel', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
        { code: 'LOOKOUT_RUIN', name: 'Lookout Ruin', type: 'landmark', tags: ['EXPLORATION', 'BATTLE'] },
    ],
    coast: [
        { code: 'TIDE_POOL_EDGE', name: 'Tide Pool Edge', type: 'pier', tags: ['EXPLORATION'] },
        { code: 'NET_SHED', name: 'Net Shed', type: 'warehouse', tags: ['EXPLORATION'] },
        { code: 'WRECKED_CABIN', name: 'Wrecked Cabin', type: 'shipwreck', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'PIER_END', name: 'Pier End', type: 'pier', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'FLOODED_HOLD', name: 'Flooded Hold', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
        { code: 'LIGHTHOUSE_STAIRS', name: 'Lighthouse Stairs', type: 'landmark', tags: ['EXPLORATION', 'BATTLE'] },
    ],
    industrial: [
        { code: 'WELDING_BAY', name: 'Welding Bay', type: 'industrial', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'GENERATOR_ROOM', name: 'Generator Room', type: 'utility', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'LOADING_DOCK', name: 'Loading Dock', type: 'warehouse', tags: ['EXPLORATION'] },
        { code: 'CONTROL_OFFICE', name: 'Control Office', type: 'industrial', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'PIPE_TUNNEL', name: 'Pipe Tunnel', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
        { code: 'SCRAP_YARD_CORNER', name: 'Scrap Yard Corner', type: 'industrial', tags: ['EXPLORATION'] },
    ],
    geological_mine: [
        { code: 'ORE_FACE', name: 'Ore Face', type: 'mine', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'DRILL_PLATFORM', name: 'Drill Platform', type: 'mine', tags: ['EXPLORATION'] },
        { code: 'SAMPLE_TABLE', name: 'Sample Table', type: 'mine', tags: ['EXPLORATION'] },
        { code: 'CART_TRACK', name: 'Cart Track', type: 'mine', tags: ['SKIRMISH', 'EXPLORATION'] },
        { code: 'LOWER_SHAFT', name: 'Lower Shaft', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
        { code: 'STONE_OUTCROP', name: 'Stone Outcrop', type: 'mine', tags: ['EXPLORATION'] },
    ],
    military: [
        { code: 'MAIN_CHECKPOINT', name: 'Main Checkpoint', type: 'military', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'BARRACK_BLOCK', name: 'Barrack Block', type: 'military', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'ARMORY_DEPOT', name: 'Armory Depot', type: 'military', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'BIO_LAB_WING', name: 'Strict Bio Lab Wing', type: 'medical', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'COMMAND_BUNKER', name: 'Command Bunker', type: 'dungeon', dungeon: true, tags: ['SWEEP', 'BATTLE'] },
    ],
    swamp: [
        { code: 'HYDROLOGY_STATION', name: 'Hydrology Station', type: 'utility', tags: ['EXPLORATION'] },
        { code: 'MUDSLIDE_EDGE', name: 'Mudslide Edge', type: 'swamp', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'MANGROVE_ISLET', name: 'Mangrove Islet', type: 'swamp', tags: ['EXPLORATION', 'SKIRMISH'] },
        { code: 'TOXIC_WATER_OUTFLOW', name: 'Toxic Water Outflow', type: 'industrial', tags: ['EXPLORATION', 'BATTLE'] },
        { code: 'COLLAPSED_PATROL_POST', name: 'Collapsed Patrol Post', type: 'camp', tags: ['EXPLORATION', 'BATTLE'] },
    ],
};

const defaultRoomBlueprints = [
    { name: 'Entry Area', type: 'room', lootFocus: ['rubbish', 'material'] },
    { name: 'Storage Room', type: 'storage', lootFocus: ['material', 'tool'] },
    { name: 'Work Room', type: 'workshop', lootFocus: ['tool', 'material'] },
    { name: 'Rest Area', type: 'living', lootFocus: ['food', 'rubbish'] },
    { name: 'Waste Corner', type: 'waste', lootFocus: ['rubbish', 'material'] },
];

const roomBlueprintsByPoiType = {
    residential: [
        { name: 'Front Porch', type: 'outdoor', lootFocus: ['rubbish', 'material'] },
        { name: 'Main Living Room', type: 'living', lootFocus: ['rubbish', 'material'] },
        { name: 'Side Bedroom', type: 'living', lootFocus: ['equipment', 'rubbish'] },
        { name: 'Kitchen Area', type: 'kitchen', lootFocus: ['food', 'drink', 'tool'] },
        { name: 'Garden Shed', type: 'storage', lootFocus: ['tool', 'material'] },
    ],
    medical: [
        { name: 'Reception Hall', type: 'office', lootFocus: ['rubbish', 'material'] },
        { name: 'Emergency Room', type: 'medical', lootFocus: ['medicine', 'equipment'] },
        { name: 'Pharmacy Storage', type: 'storage', lootFocus: ['medicine', 'material'] },
        { name: 'Patient Room', type: 'medical', lootFocus: ['medicine', 'rubbish'] },
        { name: 'Waste Processing Area', type: 'waste', lootFocus: ['rubbish', 'medicine'] },
    ],
    market: [
        { name: 'Food Shelf Row', type: 'market', lootFocus: ['food', 'drink'] },
        { name: 'Household Goods Aisle', type: 'market', lootFocus: ['tool', 'material'] },
        { name: 'Checkout Counter', type: 'counter', lootFocus: ['money', 'rubbish'] },
        { name: 'Back Stockroom', type: 'storage', lootFocus: ['food', 'material'] },
        { name: 'Staff Loft', type: 'living', lootFocus: ['equipment', 'rubbish'] },
    ],
    industrial: [
        { name: 'Machine Floor', type: 'workshop', lootFocus: ['material', 'tool'] },
        { name: 'Raw Material Storage', type: 'storage', lootFocus: ['material'] },
        { name: 'Quality Control Room', type: 'office', lootFocus: ['tool', 'rubbish'] },
        { name: 'Chemical Store', type: 'storage', lootFocus: ['medicine', 'material'] },
        { name: 'Loading Yard', type: 'outdoor', lootFocus: ['material', 'rubbish'] },
    ],
    warehouse: [
        { name: 'Loading Yard', type: 'outdoor', lootFocus: ['material', 'rubbish'] },
        { name: 'West Rack Lane', type: 'storage', lootFocus: ['material', 'tool'] },
        { name: 'East Rack Lane', type: 'storage', lootFocus: ['food', 'material'] },
        { name: 'Dispatch Office', type: 'office', lootFocus: ['rubbish', 'tool'] },
        { name: 'Equipment Charging Bay', type: 'utility', lootFocus: ['tool', 'material'] },
    ],
    farm: [
        { name: 'Main Barn', type: 'storage', lootFocus: ['food', 'seed', 'material'] },
        { name: 'Feed Storage', type: 'storage', lootFocus: ['food', 'seed'] },
        { name: 'Worker Quarters', type: 'living', lootFocus: ['food', 'rubbish'] },
        { name: 'Compost Tool Corner', type: 'utility', lootFocus: ['tool', 'material'] },
        { name: 'Farm Tool Shed', type: 'workshop', lootFocus: ['tool', 'material'] },
    ],
    forest: [
        { name: 'Trail Marker Cache', type: 'outdoor', lootFocus: ['rubbish', 'material'] },
        { name: 'Abandoned Pack', type: 'storage', lootFocus: ['food', 'medicine'] },
        { name: 'Old Camp Tools', type: 'camp', lootFocus: ['tool', 'material'] },
        { name: 'Hidden Cache', type: 'storage', lootFocus: ['tool', 'food'] },
        { name: 'Natural Shelter', type: 'camp', lootFocus: ['rubbish', 'material'] },
    ],
    mine: [
        { name: 'Open Pit Bench', type: 'mine', lootFocus: ['material'] },
        { name: 'Survey Equipment Room', type: 'office', lootFocus: ['tool', 'material'] },
        { name: 'Ore Sorting Station', type: 'workshop', lootFocus: ['material'] },
        { name: 'Maintenance Bay', type: 'workshop', lootFocus: ['tool', 'material'] },
        { name: 'Worker Canteen', type: 'living', lootFocus: ['food', 'drink'] },
    ],
    military: [
        { name: 'Guard Post', type: 'military', lootFocus: ['weapon', 'ammo'] },
        { name: 'Document Check Room', type: 'office', lootFocus: ['rubbish', 'equipment'] },
        { name: 'Personal Gear Storage', type: 'storage', lootFocus: ['equipment', 'weapon'] },
        { name: 'Command Room', type: 'office', lootFocus: ['tool', 'rubbish'] },
        { name: 'Barrier Reserve', type: 'storage', lootFocus: ['material', 'tool'] },
    ],
    coast: [
        { name: 'Concrete Pier', type: 'pier', lootFocus: ['food', 'material'] },
        { name: 'Net Storage', type: 'storage', lootFocus: ['tool', 'material'] },
        { name: 'Cold Fish Crates', type: 'storage', lootFocus: ['food'] },
        { name: 'Boat Gear Corner', type: 'workshop', lootFocus: ['tool', 'material'] },
        { name: 'Waste Collection Point', type: 'waste', lootFocus: ['rubbish', 'material'] },
    ],
    swamp: [
        { name: 'Flooded Tool Crate', type: 'storage', lootFocus: ['tool', 'material'] },
        { name: 'Waterlogged Supply Bag', type: 'storage', lootFocus: ['food', 'rubbish'] },
        { name: 'Collapsed Wooden Platform', type: 'ruin', lootFocus: ['material', 'tool'] },
        { name: 'Old Field Kit', type: 'camp', lootFocus: ['medicine', 'rubbish'] },
        { name: 'Old Boat Wreck', type: 'wreck', lootFocus: ['tool', 'material'] },
    ],
    dungeon: [
        { name: 'Entry Chamber', type: 'dungeon', lootFocus: ['rubbish', 'material'] },
        { name: 'Blocked Passage', type: 'dungeon', lootFocus: ['tool', 'material'] },
        { name: 'Deep Storage', type: 'storage', lootFocus: ['equipment', 'weapon'] },
        { name: 'Hazard Room', type: 'dungeon', lootFocus: ['medicine', 'material'] },
        { name: 'Boss Cache', type: 'cache', lootFocus: ['weapon', 'equipment'] },
    ],
};

const TAG_ACTION_TYPE = {
    EXPLORATION: 'EXPLORE',
    SKIRMISH: 'HUNT',
    BATTLE: 'BATTLE',
    SWEEP: 'SWEEP',
    DUNGEON: 'SWEEP',
};

function normalizePoiTags(tags) {
    return (tags || []).map(tag => tag === 'DUNGEON' ? 'SWEEP' : tag);
}

function createSeedCode(value) {
    return String(value || '')
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 80);
}

function buildPoiSeedPool() {
    const seenCodes = new Set();
    const generatedPois = zonesList
        .filter(zone => zone.type !== 'safe')
        .flatMap(zone => (zone.tags || []).flatMap(zoneTag => (
            poiBlueprintsByZoneTag[zoneTag] || []
        ).map(blueprint => {
            const code = `${zone.code.replace('ZONE_', 'POI_')}_${blueprint.code}`;
            if (seenCodes.has(code)) return null;
            seenCodes.add(code);

            return {
                zone: zone.code,
                code,
                name: blueprint.name,
                type: blueprint.type,
                dungeon: blueprint.dungeon,
                tags: normalizePoiTags(blueprint.tags),
            };
        }).filter(Boolean)));

    return generatedPois;
}

function getRoomBlueprintsForPoi(poi) {
    if (poi.dungeon) return roomBlueprintsByPoiType.dungeon;
    return roomBlueprintsByPoiType[poi.type] || defaultRoomBlueprints;
}

function buildRoomRowsForPoi(poi, poiId) {
    return getRoomBlueprintsForPoi(poi).map((room, index) => ({
        poiId,
        code: `${poi.code}_ROOM_${String(index + 1).padStart(2, '0')}_${createSeedCode(room.name)}`,
        name: room.name,
        type: room.type || 'room',
        tags: [...new Set([poi.type, room.type || 'room', ...(room.lootFocus || [])])],
        lootFocus: room.lootFocus || ['material', 'rubbish'],
        sortOrder: index + 1,
    }));
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
    { profile: 'swamp_threats', theme: 'Swamp', drops: ['Medicine', 'Food', 'Material, Wood'] },
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
                (code, display_name, zone_type, biome, zone_tags, level_gap, world_stage, map_role,
                 min_player_lv, base_duration_s, infection_risk, radiation_risk)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
            ON CONFLICT (code) DO UPDATE SET
                display_name = EXCLUDED.display_name,
                zone_type = EXCLUDED.zone_type,
                biome = EXCLUDED.biome,
                zone_tags = EXCLUDED.zone_tags,
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
                    zone.code, zone.name, zone.type, zone.biome, zone.tags, zone.level_gap, zone.stage, zone.role,
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
        const insertRoomQuery = `
            INSERT INTO world_poi_rooms
                (poi_id, code, display_name, room_type, room_tags, loot_focus, sort_order)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            ON CONFLICT (code) DO UPDATE SET
                poi_id = EXCLUDED.poi_id,
                display_name = EXCLUDED.display_name,
                room_type = EXCLUDED.room_type,
                room_tags = EXCLUDED.room_tags,
                loot_focus = EXCLUDED.loot_focus,
                sort_order = EXCLUDED.sort_order;
        `;

        const poiSeedPool = buildPoiSeedPool();
        await dbPool.query(
            `DELETE FROM world_pois
             WHERE code <> ALL($1::TEXT[])
               AND zone_id IN (SELECT id FROM zones WHERE zone_type <> 'safe');`,
            [poiSeedPool.map(poi => poi.code)]
        );

        for (const poi of poiSeedPool) {
            const zoneResult = await dbPool.query('SELECT id FROM zones WHERE code = $1;', [poi.zone]);
            if (zoneResult.rows.length === 0) continue;

            const insertedPoi = await dbPool.query(insertPoiQuery, [
                zoneResult.rows[0].id,
                poi.code,
                poi.name,
                poi.type,
                `${poi.name} inside ${poi.zone}.`,
                Boolean(poi.dungeon),
                poi.dungeon ? 'Sweep route with boss pressure after repeated clears.' : null,
            ]);

            for (const tag of poi.tags) {
                const isSweep = tag === 'SWEEP' || tag === 'DUNGEON';
                const isBattle = tag === 'BATTLE' || tag === 'SKIRMISH';
                await dbPool.query(insertTagQuery, [
                    insertedPoi.rows[0].id,
                    tag,
                    TAG_ACTION_TYPE[tag],
                    isSweep ? 1.35 : (isBattle ? 1.15 : 1.00),
                    tag === 'EXPLORATION' ? ['materials', 'food', 'salvage'] : ['combat', 'gear', 'materials'],
                    isBattle || isSweep ? `${poi.type}_threats` : null,
                    isSweep,
                ]);
            }

            const roomRows = buildRoomRowsForPoi(poi, insertedPoi.rows[0].id);
            for (const room of roomRows) {
                await dbPool.query(insertRoomQuery, [
                    room.poiId,
                    room.code,
                    room.name,
                    room.type,
                    room.tags,
                    room.lootFocus,
                    room.sortOrder,
                ]);
            }
            await dbPool.query(
                `DELETE FROM world_poi_rooms WHERE poi_id = $1 AND code <> ALL($2::TEXT[]);`,
                [insertedPoi.rows[0].id, roomRows.map(room => room.code)]
            );
        }
        await dbPool.query(`DELETE FROM poi_gameplay_tags WHERE tag_type = 'DUNGEON';`);
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

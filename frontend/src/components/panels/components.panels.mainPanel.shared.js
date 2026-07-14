// frontend/src/components/panels/components.panels.mainPanel.shared.js

export const POI_ROTATION_MS = 15 * 60 * 1000;

export const ZONE_BANNERS = {
    urban:   { gradient: 'from-zinc-700/40 to-base', mark: 'UR' },
    rural:   { gradient: 'from-lime-900/35 to-base', mark: 'RU' },
    coast:   { gradient: 'from-cyan-900/35 to-base', mark: 'CO' },
    forest:  { gradient: 'from-emerald-900/40 to-base', mark: 'FO' },
    desert:  { gradient: 'from-amber-900/40 to-base', mark: 'DE' },
    safe:    { gradient: 'from-cyan-900/30 to-base', mark: 'HM' },
};

export const ZONE_TAG_LABELS = {
    rural: 'Rural',
    town: 'Town',
    city: 'City',
    forest: 'Forest',
    coast: 'Coast',
    industrial: 'Industrial',
    geological_mine: 'Geological Mine',
    military: 'Military',
    swamp: 'Swamp',
};

export const RESOURCE_METER_FILL_CLASSES = {
    EXP: 'bg-success',
    HP: 'bg-danger',
    Energy: 'bg-cyan',
};

export const EXPLORATION_RINGS = [
    {
        id: 'near_city',
        title: 'Near City Ring',
        range: 'Lv.1-20',
        minLevel: 1,
        maxLevel: 20,
        helper: 'Suburbs, market streets, industrial edges, greenbelt, farms, and the nearest coast.',
    },
    {
        id: 'far_routes',
        title: 'Far Routes',
        range: 'Lv.25-40',
        minLevel: 25,
        maxLevel: 40,
        helper: 'Quarries, warehouses, downtown ruins, deep wild zones, wastelands, and high-risk endgame sites.',
    },
];

export const SAFE_HOUSE_INFO = {
    level: 1,
    name: 'Safe House',
    condition: 'Stable',
    bedLevel: 1,
    restEfficiency: 1,
    workstations: [
        { id: 'bed', name: 'Bed', level: 1, status: 'Good', breaksIn: '72h' },
        { id: 'campfire', name: 'Cooking Fire', level: 1, status: 'Good', breaksIn: '36h' },
        { id: 'workbench', name: 'Workbench', level: 1, status: 'Worn', breaksIn: '24h' },
    ],
    slots: 8,
};

export const ITEM_TAG_MARKS = [
    { tokens: ['medicine', 'medical', 'first aid', 'bandage'], mark: '??' },
    { tokens: ['electronics', 'electronic', 'circuit', 'battery', 'wire'], mark: '??' },
    { tokens: ['plastic'], mark: '??' },
    { tokens: ['metal', 'scrap metal', 'steel', 'iron'], mark: '??' },
    { tokens: ['wood', 'timber', 'branch'], mark: '??' },
    { tokens: ['stone', 'rock', 'ore', 'mineral'], mark: '??' },
    { tokens: ['cloth', 'fabric', 'leather'], mark: '??' },
    { tokens: ['food', 'meat', 'edible', 'canned', 'grain'], mark: '??' },
    { tokens: ['water', 'salt'], mark: '??' },
    { tokens: ['chemical', 'fuel', 'acid'], mark: '??' },
    { tokens: ['glass'], mark: '??' },
    { tokens: ['tool'], mark: '??' },
    { tokens: ['weapon'], mark: '???' },
    { tokens: ['armor', 'gear', 'equipment'], mark: '???' },
    { tokens: ['building', 'container'], mark: '??' },
    { tokens: ['rubbish', 'junk', 'recyclable'], mark: '??' },
];

export const ITEM_CATEGORY_MARKS = {
    RUBBISH: '??',
    MATERIAL: '??',
    WEAPON: '???',
    AMMO: 'AM',
    EQUIPMENT: '???',
    TOOL: '??',
    BUILDING: '??',
    FOOD: '??',
    MEDICINE: 'MD',
};

export const ITEM_RARITY_TEXT = {
    COMMON: 'text-textMuted',
    UNCOMMON: 'text-success',
    RARE: 'text-cyan',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-accent',
};

export const ITEM_RARITY_ICON_FILL = {
    COMMON: 'bg-textSecondary',
    UNCOMMON: 'bg-gradient-to-br from-success to-emerald-300',
    RARE: 'bg-gradient-to-br from-cyan to-sky-300',
    EPIC: 'bg-gradient-to-br from-purple-400 to-fuchsia-300',
    LEGENDARY: 'bg-gradient-to-br from-accent to-yellow-200',
};

export const ITEM_ICON_RULES = [
    { tokens: ['bandage'], icon: 'bandage' },
    { tokens: ['medicine', 'medical', 'first aid', 'potion'], icon: 'medicine' },
    { tokens: ['battery'], icon: 'battery' },
    { tokens: ['electronics', 'electronic', 'circuit', 'wire'], icon: 'electronics' },
    { tokens: ['plastic'], icon: 'plastic' },
    { tokens: ['metal', 'ingot', 'steel', 'iron'], icon: 'metal' },
    { tokens: ['scrap', 'recyclable'], icon: 'scrap' },
    { tokens: ['wood', 'timber', 'branch', 'handle'], icon: 'wood' },
    { tokens: ['ore', 'mineral', 'gemstone'], icon: 'ore' },
    { tokens: ['stone', 'rock'], icon: 'stone' },
    { tokens: ['cloth', 'fabric'], icon: 'cloth' },
    { tokens: ['leather'], icon: 'leather' },
    { tokens: ['bread'], icon: 'bread' },
    { tokens: ['meat'], icon: 'meat' },
    { tokens: ['fish'], icon: 'fish' },
    { tokens: ['berry', 'berries', 'bramble'], icon: 'berry' },
    { tokens: ['corn'], icon: 'corn' },
    { tokens: ['wheat', 'grain'], icon: 'wheat' },
    { tokens: ['mushroom'], icon: 'mushroom' },
    { tokens: ['food', 'edible', 'canned'], icon: 'food' },
    { tokens: ['water', 'salt'], icon: 'water' },
    { tokens: ['chemical', 'acid'], icon: 'chemical' },
    { tokens: ['fuel'], icon: 'fuel' },
    { tokens: ['oil', 'fat'], icon: 'oil' },
    { tokens: ['glass'], icon: 'glass' },
    { tokens: ['pickaxe', 'pick'], icon: 'pickaxe' },
    { tokens: ['hammer'], icon: 'hammer' },
    { tokens: ['axe'], icon: 'axe' },
    { tokens: ['tool'], icon: 'tool' },
    { tokens: ['dagger', 'knife'], icon: 'dagger' },
    { tokens: ['bow', 'harpoon'], icon: 'bow' },
    { tokens: ['gun', 'rifle', 'shotgun'], icon: 'gun' },
    { tokens: ['weapon', 'sword'], icon: 'weapon' },
    { tokens: ['ammo', 'bullet'], icon: 'ammo' },
    { tokens: ['helmet', 'head'], icon: 'helmet' },
    { tokens: ['shield'], icon: 'shield' },
    { tokens: ['backpack'], icon: 'backpack' },
    { tokens: ['armor', 'gear', 'equipment', 'vest'], icon: 'armor' },
    { tokens: ['building', 'structure'], icon: 'building' },
    { tokens: ['container', 'crate', 'box'], icon: 'container' },
    { tokens: ['rubbish', 'junk'], icon: 'rubbish' },
    { tokens: ['bone'], icon: 'bone' },
    { tokens: ['claw', 'fang'], icon: 'claw' },
    { tokens: ['hide'], icon: 'hide' },
    { tokens: ['zombie', 'tissue', 'rotten'], icon: 'zombie' },
    { tokens: ['seed', 'plantable'], icon: 'seed' },
];

export const ITEM_CATEGORY_ICONS = {
    RUBBISH: 'rubbish',
    MATERIAL: 'scrap',
    WEAPON: 'weapon',
    AMMO: 'ammo',
    EQUIPMENT: 'armor',
    TOOL: 'tool',
    BUILDING: 'building',
    FOOD: 'food',
    MEDICINE: 'medicine',
};

export function getItemText(itemOrCategory, tags = []) {
    const item = typeof itemOrCategory === 'object' ? itemOrCategory : null;
    const category = item ? item.category : itemOrCategory;
    const itemTags = item ? item.tags : tags;

    return [
        item?.display_name,
        category,
        ...(Array.isArray(itemTags) ? itemTags : []),
    ].join(' ').toLowerCase();
}

export function getItemIconKey(itemOrCategory, tags = []) {
    const item = typeof itemOrCategory === 'object' ? itemOrCategory : null;
    const category = item ? item.category : itemOrCategory;
    const text = getItemText(itemOrCategory, tags);
    const match = ITEM_ICON_RULES.find(entry => entry.tokens.some(token => text.includes(token)));

    return match?.icon || ITEM_CATEGORY_ICONS[String(category || '').toUpperCase()] || 'generic';
}

export function getItemIconPath(itemOrCategory, tags = []) {
    return `/assets/item-icons/${getItemIconKey(itemOrCategory, tags)}.svg`;
}

export function getItemRarityIconFill(item) {
    return ITEM_RARITY_ICON_FILL[String(item?.rarity || 'COMMON').toUpperCase()] || ITEM_RARITY_ICON_FILL.COMMON;
}

export const GENERIC_INGREDIENT_TOKENS = new Set([
    'and', 'any', 'the', 'with', 'material', 'materials', 'processed',
    'recyclable', 'scrap', 'item', 'items', 'ingredient', 'ingredients',
    'crafting', 'base', 'basic', 'raw', 'resource', 'resources'
]);

export function normalizeIngredientText(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function getIngredientTokens(tagQuery) {
    return normalizeIngredientText(tagQuery)
        .split(/\s+/)
        .filter(token => token.length >= 3 && !GENERIC_INGREDIENT_TOKENS.has(token));
}

export function itemMatchesIngredient(item, tagQuery) {
    const tokens = getIngredientTokens(tagQuery);
    if (tokens.length === 0) return true;

    const itemText = normalizeIngredientText([
        item?.display_name,
        item?.category,
        ...(Array.isArray(item?.tags) ? item.tags : []),
    ].join(' '));

    return tokens.some(token => itemText.includes(token));
}

export function getItemMark(itemOrCategory, tags = []) {
    const item = typeof itemOrCategory === 'object' ? itemOrCategory : null;
    const category = item ? item.category : itemOrCategory;
    const text = getItemText(itemOrCategory, tags);
    const match = ITEM_TAG_MARKS.find(entry => entry.tokens.some(token => text.includes(token)));
    return match?.mark || ITEM_CATEGORY_MARKS[String(category || '').toUpperCase()] || 'IT';
}

export function getItemRarityClassName(item) {
    return ITEM_RARITY_TEXT[String(item?.rarity || 'COMMON').toUpperCase()] || ITEM_RARITY_TEXT.COMMON;
}

export function getDroppedItemName(item) {
    return item?.display_name || item?.name || item?.template_id || 'Unknown item';
}

export function getDroppedItemsText(items) {
    const droppedItems = Array.isArray(items) ? items : [];
    if (droppedItems.length === 0) return '';

    return droppedItems.map(getDroppedItemName).join(', ');
}

export function getZoneLevel(zone) {
    return parseInt(zone?.level_gap || zone?.min_player_lv || 1);
}

export function isZoneLockedForPlayer(zone, playerLevel) {
    return getZoneLevel(zone) > (parseInt(playerLevel) || 1) + 10;
}

export function getZoneTagLabels(zone) {
    const tags = zone?.zone_tags || [];
    if (tags.length === 0) return zone?.biome || zone?.zone_type || '';
    return tags.map(tag => ZONE_TAG_LABELS[tag] || tag).join(' / ');
}

export function getPoiRotationSlot() {
    return Math.floor(Date.now() / POI_ROTATION_MS);
}

export function createStableHash(value) {
    return String(value || '').split('').reduce((hash, char) => (
        ((hash << 5) - hash + char.charCodeAt(0)) >>> 0
    ), 2166136261);
}

export function getRotatingPois(zone, rotationSlot) {
    const pois = zone?.pois || [];
    if (pois.length <= 5) return pois;

    const maxVisible = Math.min(10, pois.length);
    const visibleCount = 5 + (createStableHash(`${zone.code}:${rotationSlot}:count`) % (maxVisible - 4));

    return [...pois]
        .sort((left, right) => (
            createStableHash(`${zone.code}:${rotationSlot}:${left.code || left.id}`) -
            createStableHash(`${zone.code}:${rotationSlot}:${right.code || right.id}`)
        ))
        .slice(0, visibleCount);
}

export function getPoiActionOptions() {
    const actionOptions = [
        { type: 'enemy', label: 'Find enemies' },
        { type: 'scavenge', label: 'Scavenge rooms' },
        { type: 'gather', label: 'Gather resources' },
        { type: 'sweep', label: 'Sweep' },
    ];

    return actionOptions.map(option => ({
        ...option,
        isAvailable: true,
    }));
}

export function calculateExpRequiredForLevel(level) {
    const safeLevel = Math.max(1, parseInt(level) || 1);
    return Math.floor(0.7 * Math.pow(safeLevel, 3) + 20 * Math.pow(safeLevel, 2) + 100 * safeLevel + 50);
}

export function formatDropTable(dropTable) {
    if (!Array.isArray(dropTable) || dropTable.length === 0) return 'No drop data';
    return dropTable
        .map(drop => `${drop.tag_query} ${Math.round((drop.chance || 0) * 100)}%`)
        .join(' | ');
}

export function getActivityEnergyCost(activityData, activityType) {
    const costKey = activityType === 'dungeon' ? 'sweep' : activityType;
    const cost = activityData?.resource_costs?.[costKey];
    return parseInt(cost?.energyCost || cost?.energy_cost || cost?.energy) || 0;
}

export function getTargetEnergyCost(activityData, activityType, target) {
    const targetCost = target?.resource_cost;
    const energyCost = parseInt(targetCost?.energyCost || targetCost?.energy_cost || targetCost?.energy) || 0;
    return energyCost > 0 ? energyCost : getActivityEnergyCost(activityData, activityType);
}

export function canSpendEnergy(character, energyCost) {
    return (parseInt(character?.current_energy) || 0) >= energyCost;
}

export function getEnergyErrorMessage(character, energyCost) {
    const currentEnergy = parseInt(character?.current_energy) || 0;
    return `Not enough energy. Need ${energyCost}, current ${currentEnergy}.`;
}

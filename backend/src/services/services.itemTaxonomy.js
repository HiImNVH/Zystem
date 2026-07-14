// backend/src/services/services.itemTaxonomy.js

const MAIN_ITEM_CATEGORIES = ['MATERIAL', 'MISC', 'CONSUMABLE', 'EQUIPMENT', 'SPECIAL', 'CURRENCY'];

const LEGACY_CATEGORY_TAGS = {
    CONSUMABLE: ['food', 'medicine', 'ammo'],
    EQUIPMENT: ['weapon', 'equipment', 'tool'],
    SPECIAL: ['building', 'buildings', 'structure', 'structures', 'quest', 'key item', 'keyitem'],
    CURRENCY: ['currency', 'money', 'silver', 'gold'],
};

const MISC_TAGS = [
    'scrap',
    'recyclable',
    'rubbish',
    'junk',
    'monster part',
    'monsterpart',
    'zombie',
    'trophy',
    'claw',
    'fang',
    'rotten',
    'infected',
];

const DIRECT_MATERIAL_TAGS = [
    'wood',
    'stone',
    'bone',
    'ingot',
    'component',
    'processed',
    'handle',
    'head',
    'barrel',
    'frame',
    'panel',
    'padding',
    'bowstring',
    'gunpowder',
    'leather',
    'fiber',
    'cloth',
    'fabric',
];

function normalizeTaxonomyTags(tags) {
    return (Array.isArray(tags) ? tags : [])
        .map(tag => String(tag || '').trim().toLowerCase())
        .filter(Boolean);
}

function hasAnyTaxonomyTag(tags, searchTags) {
    return searchTags.some(searchTag => tags.includes(searchTag));
}

function resolveMainItemCategory(config) {
    const tags = normalizeTaxonomyTags(config?.tags);
    const origin = String(config?.origin || '').toLowerCase();

    if (hasAnyTaxonomyTag(tags, LEGACY_CATEGORY_TAGS.CURRENCY)) return 'CURRENCY';
    if (hasAnyTaxonomyTag(tags, LEGACY_CATEGORY_TAGS.EQUIPMENT)) return 'EQUIPMENT';
    if (hasAnyTaxonomyTag(tags, LEGACY_CATEGORY_TAGS.CONSUMABLE)) return 'CONSUMABLE';
    if (hasAnyTaxonomyTag(tags, LEGACY_CATEGORY_TAGS.SPECIAL)) return 'SPECIAL';

    if (hasAnyTaxonomyTag(tags, MISC_TAGS)) return 'MISC';
    if (origin === 'craftable' || hasAnyTaxonomyTag(tags, DIRECT_MATERIAL_TAGS)) return 'MATERIAL';

    return 'MISC';
}

function isConsumableCategory(category) {
    return String(category || '').toUpperCase() === 'CONSUMABLE';
}

function isEquipmentCategory(category) {
    return String(category || '').toUpperCase() === 'EQUIPMENT';
}

function isMaterialCategory(category) {
    return String(category || '').toUpperCase() === 'MATERIAL';
}

function isMiscCategory(category) {
    return String(category || '').toUpperCase() === 'MISC';
}

module.exports = {
    MAIN_ITEM_CATEGORIES,
    resolveMainItemCategory,
    normalizeTaxonomyTags,
    hasAnyTaxonomyTag,
    isConsumableCategory,
    isEquipmentCategory,
    isMaterialCategory,
    isMiscCategory,
};

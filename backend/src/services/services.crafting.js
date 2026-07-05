// backend/src/services/services.crafting.js

const RARITY_BONUS = {
    COMMON: 0,
    UNCOMMON: 5,
    RARE: 10,
    EPIC: 15,
    LEGENDARY: 20,
};

const RARITY_RANK = {
    COMMON: 1,
    UNCOMMON: 2,
    RARE: 3,
    EPIC: 4,
    LEGENDARY: 5,
};

const CUREL_RARITY_WEIGHT_BY_LEVEL = [
    { level: 0, common: 200, uncommon: 40, rare: 10, epic: 5, legendary: 1 },
    { level: 1, common: 199, uncommon: 41, rare: 10, epic: 5, legendary: 1 },
    { level: 2, common: 198, uncommon: 41, rare: 11, epic: 5, legendary: 1 },
    { level: 3, common: 197, uncommon: 42, rare: 10, epic: 6, legendary: 1 },
    { level: 4, common: 196, uncommon: 42, rare: 11, epic: 6, legendary: 1 },
    { level: 5, common: 195, uncommon: 43, rare: 11, epic: 5, legendary: 2 },
    { level: 6, common: 194, uncommon: 43, rare: 11, epic: 6, legendary: 2 },
    { level: 7, common: 193, uncommon: 44, rare: 11, epic: 6, legendary: 2 },
    { level: 8, common: 192, uncommon: 44, rare: 12, epic: 6, legendary: 2 },
    { level: 9, common: 191, uncommon: 45, rare: 11, epic: 7, legendary: 2 },
    { level: 10, common: 190, uncommon: 45, rare: 12, epic: 6, legendary: 3 },
    { level: 11, common: 189, uncommon: 46, rare: 12, epic: 6, legendary: 3 },
    { level: 12, common: 188, uncommon: 46, rare: 12, epic: 7, legendary: 3 },
    { level: 13, common: 187, uncommon: 47, rare: 12, epic: 7, legendary: 3 },
    { level: 14, common: 186, uncommon: 47, rare: 13, epic: 7, legendary: 3 },
    { level: 15, common: 185, uncommon: 48, rare: 12, epic: 7, legendary: 4 },
    { level: 16, common: 184, uncommon: 48, rare: 13, epic: 7, legendary: 4 },
    { level: 17, common: 183, uncommon: 49, rare: 13, epic: 7, legendary: 4 },
    { level: 18, common: 182, uncommon: 49, rare: 13, epic: 8, legendary: 4 },
    { level: 19, common: 181, uncommon: 50, rare: 13, epic: 8, legendary: 4 },
    { level: 20, common: 180, uncommon: 50, rare: 14, epic: 7, legendary: 5 },
    { level: 21, common: 179, uncommon: 51, rare: 13, epic: 8, legendary: 5 },
    { level: 22, common: 178, uncommon: 51, rare: 14, epic: 8, legendary: 5 },
    { level: 23, common: 177, uncommon: 52, rare: 14, epic: 8, legendary: 5 },
    { level: 24, common: 176, uncommon: 52, rare: 14, epic: 9, legendary: 5 },
    { level: 25, common: 175, uncommon: 53, rare: 14, epic: 8, legendary: 6 },
    { level: 26, common: 174, uncommon: 53, rare: 15, epic: 8, legendary: 6 },
    { level: 27, common: 173, uncommon: 54, rare: 14, epic: 9, legendary: 6 },
    { level: 28, common: 172, uncommon: 54, rare: 15, epic: 9, legendary: 6 },
    { level: 29, common: 171, uncommon: 55, rare: 15, epic: 9, legendary: 6 },
    { level: 30, common: 170, uncommon: 55, rare: 15, epic: 9, legendary: 7 },
    { level: 31, common: 169, uncommon: 56, rare: 15, epic: 9, legendary: 7 },
    { level: 32, common: 168, uncommon: 56, rare: 16, epic: 9, legendary: 7 },
    { level: 33, common: 167, uncommon: 57, rare: 15, epic: 10, legendary: 7 },
    { level: 34, common: 166, uncommon: 57, rare: 16, epic: 10, legendary: 7 },
    { level: 35, common: 165, uncommon: 58, rare: 16, epic: 9, legendary: 8 },
    { level: 36, common: 164, uncommon: 58, rare: 16, epic: 10, legendary: 8 },
    { level: 37, common: 163, uncommon: 59, rare: 16, epic: 10, legendary: 8 },
    { level: 38, common: 162, uncommon: 59, rare: 17, epic: 10, legendary: 8 },
    { level: 39, common: 161, uncommon: 60, rare: 16, epic: 11, legendary: 8 },
    { level: 40, common: 160, uncommon: 60, rare: 17, epic: 10, legendary: 9 },
];

function clampCurelLevel(curelLevel) {
    const normalizedLevel = Math.floor(Number(curelLevel) || 0);
    return Math.min(Math.max(normalizedLevel, 0), 40);
}

function getCurelRarityWeights(curelLevel) {
    const targetLevel = clampCurelLevel(curelLevel);
    return CUREL_RARITY_WEIGHT_BY_LEVEL[targetLevel] || CUREL_RARITY_WEIGHT_BY_LEVEL[0];
}

function calculateOutputItemLevel(craftJobLevel, materialItemLevel) {
    if (!craftJobLevel || !materialItemLevel) return 1;

    if (craftJobLevel >= materialItemLevel) {
        return materialItemLevel;
    }

    console.log(`[INFO] AutoFit: Nguyen lieu cap ${materialItemLevel} + nghe cap ${craftJobLevel} -> thanh pham ha xuong cap ${craftJobLevel}`);
    return craftJobLevel;
}

function clampItemLevel(itemLevel) {
    return Math.min(Math.max(Math.floor(Number(itemLevel) || 1), 1), 80);
}

function parseMainMaterialSlots(mainMaterialSlots) {
    if (!mainMaterialSlots) return [];

    return String(mainMaterialSlots)
        .split(/[^0-9]+/)
        .map(slot => parseInt(slot))
        .filter(slot => Number.isInteger(slot) && slot > 0);
}

function calculateRecipeOutputItemLevel(recipe, selectedMaterials, craftJobLevel) {
    const materialRows = Array.isArray(selectedMaterials) ? selectedMaterials : [];
    const nonToolLevels = materialRows
        .filter(item => (item.category || '').toUpperCase() !== 'TOOL')
        .map(item => parseInt(item.item_level) || 1);

    const averageMaterialLevel = nonToolLevels.length > 0
        ? Math.floor(nonToolLevels.reduce((sum, level) => sum + level, 0) / nonToolLevels.length)
        : (parseInt(recipe?.template_item_level) || 1);

    const requiredLevel = parseInt(recipe?.required_job_level) || averageMaterialLevel;
    const jobLevel = parseInt(craftJobLevel) || 1;

    return clampItemLevel(Math.min(averageMaterialLevel, requiredLevel, jobLevel));
}

function pickHighestRarity(items) {
    const materialRows = Array.isArray(items) ? items : [];
    return materialRows.reduce((best, item) => {
        const rarity = (item.rarity || 'COMMON').toUpperCase();
        return (RARITY_RANK[rarity] || 0) > (RARITY_RANK[best] || 0) ? rarity : best;
    }, 'COMMON');
}

function resolveCraftedRarity(recipe, selectedMaterials, craftingPower) {
    const ruleKey = String(recipe?.curel_rule_key || '').toLowerCase();
    const mechanic = String(recipe?.curel_mechanic || '').toLowerCase();

    if (ruleKey.includes('none') || mechanic === 'n/a') {
        return 'COMMON';
    }

    if (ruleKey.includes('gear') || mechanic.includes('skill-based')) {
        return rollCurelRarity(craftingPower);
    }

    if (ruleKey.includes('material') || mechanic.includes('inherit')) {
        const mainSlots = parseMainMaterialSlots(recipe?.main_material_slots);
        const mainMaterials = mainSlots.length > 0
            ? selectedMaterials.filter(item => mainSlots.includes(parseInt(item.slot_index)))
            : selectedMaterials;

        return pickHighestRarity(mainMaterials);
    }

    return rollCurelRarity(craftingPower);
}

function rollWeightedRarity(weights) {
    const weightedEntries = [
        ['COMMON', weights.common],
        ['UNCOMMON', weights.uncommon],
        ['RARE', weights.rare],
        ['EPIC', weights.epic],
        ['LEGENDARY', weights.legendary],
    ];
    const totalWeight = weightedEntries.reduce((sum, [, weight]) => sum + weight, 0);
    let roll = Math.random() * totalWeight;

    for (const [rarity, weight] of weightedEntries) {
        roll -= weight;
        if (roll <= 0) return rarity;
    }

    return 'COMMON';
}

function rollCurelRarity(curelLevel) {
    return rollWeightedRarity(getCurelRarityWeights(curelLevel));
}

function calculateItemPower(itemLevel, rarity) {
    const normalizedRarity = rarity?.toUpperCase() || 'COMMON';
    return (itemLevel || 1) + (RARITY_BONUS[normalizedRarity] || 0);
}

function calculateCraftFailRate(intStat, itemLevel, craftJobLevel) {
    const baseFailRate = 0.30;
    const intReduction = Math.min((intStat || 10) * 0.005, 0.25);
    const levelGap = Math.max(0, itemLevel - craftJobLevel);
    const gapPenalty = levelGap * 0.02;

    return Math.min(Math.max(baseFailRate - intReduction + gapPenalty, 0), 0.95);
}

module.exports = {
    calculateOutputItemLevel,
    calculateRecipeOutputItemLevel,
    resolveCraftedRarity,
    parseMainMaterialSlots,
    pickHighestRarity,
    clampItemLevel,
    rollCurelRarity,
    calculateItemPower,
    calculateCraftFailRate,
    getCurelRarityWeights,
    CUREL_RARITY_WEIGHT_BY_LEVEL,
    RARITY_BONUS,
    RARITY_RANK,
};

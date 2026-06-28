// backend/src/services/services.crafting.js
// Version: 1.0
// Logic AutoFit Crafting: tinh cap do thanh pham khi tho yeu dung nguyen lieu cao cap
// Logic CUREL drop weight: tinh trong so theo do hiem nguyen lieu

const RARITY_WEIGHT_BASE = {
    COMMON:    200,
    UNCOMMON:   40,
    RARE:       10,
    EPIC:        5,
    LEGENDARY:   1,
};

// Bonus weight khi craft voi nguyen lieu do hiem cao (theo Balance Sheet v3)
// mat_rarity -> { UNCOMMON, RARE, EPIC, LEGENDARY }
const MAT_RARITY_BONUS = {
    COMMON:    { UNCOMMON: 5,  RARE: 1,  EPIC: 0,  LEGENDARY: 0 },
    UNCOMMON:  { UNCOMMON: 10, RARE: 5,  EPIC: 1,  LEGENDARY: 0 },
    RARE:      { UNCOMMON: 20, RARE: 10, EPIC: 5,  LEGENDARY: 1 },
    EPIC:      { UNCOMMON: 40, RARE: 20, EPIC: 10, LEGENDARY: 5 },
    LEGENDARY: { UNCOMMON: 80, RARE: 40, EPIC: 20, LEGENDARY: 10 },
};

// AutoFit Crafting: xac dinh Item Level cua thanh pham
// Neu craftJobLevel < matLevel -> ha cap ve craftJobLevel
// Nguoc lai -> giu nguyen mat level
function calculateOutputItemLevel(craftJobLevel, materialItemLevel) {
    if (!craftJobLevel || !materialItemLevel) return 1;

    if (craftJobLevel >= materialItemLevel) {
        // Truong hop binh thuong: giu nguyen cap nguyen lieu
        return materialItemLevel;
    }

    // AutoFit: ha cap ve bang cap nghe cua tho
    console.log(`[INFO] AutoFit: Nguyen lieu cap ${materialItemLevel} + nghe cap ${craftJobLevel} -> thanh pham ha xuong cap ${craftJobLevel}`);
    return craftJobLevel;
}

// Cuon ket qua do hiem ngau nhien theo trong so (Weight Roll)
// DEX cua crafter tang trong so do hiem cao
function rollCurelRarity(craftJobLevel, materialRarity, crafterDex) {
    const matRarityKey = (materialRarity || 'COMMON').toUpperCase();
    const bonus = MAT_RARITY_BONUS[matRarityKey] || MAT_RARITY_BONUS.COMMON;

    // DEX tang trong so: 20 DEX +1 Rare, 40 DEX +1 Epic, 50 DEX +1 Legendary
    const dex = crafterDex || 0;
    const dexRareBonus    = Math.floor(dex / 20);
    const dexEpicBonus    = Math.floor(dex / 40);
    const dexLegBonus     = Math.floor(dex / 50);

    const weights = {
        COMMON:    RARITY_WEIGHT_BASE.COMMON,
        UNCOMMON:  RARITY_WEIGHT_BASE.UNCOMMON + bonus.UNCOMMON,
        RARE:      RARITY_WEIGHT_BASE.RARE     + bonus.RARE     + dexRareBonus,
        EPIC:      RARITY_WEIGHT_BASE.EPIC     + bonus.EPIC     + dexEpicBonus,
        LEGENDARY: RARITY_WEIGHT_BASE.LEGENDARY + bonus.LEGENDARY + dexLegBonus,
    };

    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
    let roll = Math.random() * totalWeight;

    for (const [rarity, weight] of Object.entries(weights)) {
        roll -= weight;
        if (roll <= 0) return rarity;
    }

    return 'COMMON'; // Fallback
}

// Tinh Item Power theo CUREL: ItemPower = ItemLevel + RarityBonus
function calculateItemPower(itemLevel, rarity) {
    const rarityBonus = {
        COMMON:    0,
        UNCOMMON:  5,
        RARE:      10,
        EPIC:      15,
        LEGENDARY: 20,
    };
    return (itemLevel || 1) + (rarityBonus[rarity?.toUpperCase()] || 0);
}

// Tinh ty le that bai che tao (giam theo INT, that bai cho ra "rac pham")
// INT anh huong: moi 1 INT giam 0.5% fail rate, base 30%
function calculateCraftFailRate(intStat, itemLevel, craftJobLevel) {
    const baseFailRate = 0.30;
    const intReduction = Math.min((intStat || 10) * 0.005, 0.25); // Max giam 25% tu INT
    const levelGap = Math.max(0, itemLevel - craftJobLevel); // Gap nguyen lieu vs nghe
    const gapPenalty = levelGap * 0.02; // Moi cap gap them 2% fail

    return Math.min(Math.max(baseFailRate - intReduction + gapPenalty, 0), 0.95);
}

module.exports = {
    calculateOutputItemLevel,
    rollCurelRarity,
    calculateItemPower,
    calculateCraftFailRate,
    RARITY_WEIGHT_BASE,
    MAT_RARITY_BONUS
};

// backend/src/services/services.itemStats.js

const { dbPool } = require('../repositories/repositories.database');

const CATEGORY_STAT_POOL = {
    WEAPON: ['str', 'dex', 'agi'],
    EQUIPMENT: ['vit', 'str', 'agi'],
    TOOL: ['dex', 'int', 'agi'],
    BUILDING: ['vit', 'int', 'chr'],
};

const RARITY_STAT_COUNT = {
    COMMON: 1,
    UNCOMMON: 1,
    RARE: 2,
    EPIC: 2,
    LEGENDARY: 3,
};

function calculateBaseStatValue(itemPower) {
    return Math.max(1, Math.floor((itemPower || 1) * 3));
}

function rollItemStats(category, itemPower, rarity) {
    if (!CATEGORY_STAT_POOL[category]) {
        return {
            stat_1_type: null, stat_1_value: 0,
            stat_2_type: null, stat_2_value: 0,
            stat_3_type: null, stat_3_value: 0,
        };
    }

    const pool = CATEGORY_STAT_POOL[category];
    const statCount = RARITY_STAT_COUNT[rarity?.toUpperCase()] || 1;
    const baseValue = calculateBaseStatValue(itemPower);

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selectedStats = shuffled.slice(0, Math.min(statCount, pool.length));

    const result = {
        stat_1_type: null, stat_1_value: 0,
        stat_2_type: null, stat_2_value: 0,
        stat_3_type: null, stat_3_value: 0,
    };

    selectedStats.forEach((statType, index) => {
        const variance = 0.85 + Math.random() * 0.3;
        const statBudget = baseValue / selectedStats.length;
        const finalValue = parseFloat((statBudget * variance).toFixed(2));

        result[`stat_${index + 1}_type`]  = statType;
        result[`stat_${index + 1}_value`] = finalValue;
    });

    return result;
}

// Tinh tong stat bonus tu toan bo gear dang equip cua nhan vat
async function calculateGearStatBonus(playerId) {
    const zeroStats = { str: 0, agi: 0, dex: 0, vit: 0, int: 0, chr: 0 };
    if (!playerId) return zeroStats;

    try {
        const result = await dbPool.query(`
            SELECT stat_1_type, stat_1_value, stat_2_type, stat_2_value, stat_3_type, stat_3_value
            FROM items
            WHERE owner_player_id = $1 AND is_equipped = TRUE;
        `, [playerId]);

        const totals = { ...zeroStats };

        for (const item of result.rows) {
            for (let i = 1; i <= 3; i++) {
                const statType  = item[`stat_${i}_type`];
                const statValue = parseFloat(item[`stat_${i}_value`]) || 0;
                if (statType && totals.hasOwnProperty(statType)) {
                    totals[statType] += statValue;
                }
            }
        }

        // Lam tron 2 chu so thap phan
        Object.keys(totals).forEach(key => {
            totals[key] = parseFloat(totals[key].toFixed(2));
        });

        return totals;
    } catch (error) {
        console.error('[ERROR] Loi khi tinh gear stat bonus:', error.message);
        return zeroStats;
    }
}

module.exports = {
    rollItemStats,
    calculateGearStatBonus,
    calculateBaseStatValue,
    CATEGORY_STAT_POOL
};

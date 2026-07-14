// backend/src/services/services.itemStats.js

const { gameDataDb } = require('../repositories/repositories.databaseDomains');
const dbPool = gameDataDb;

const DEFAULT_STAT_PAIR = {
    EQUIPMENT: ['vit', 'str'],
};

const TAG_STAT_PAIR_RULES = [
    { tag: 'ammo', stats: [] },
    { tag: 'food', stats: [] },
    { tag: 'medicine', stats: [] },
    { tag: 'material', stats: [] },
    { tag: 'buildings', stats: [] },
    { tag: 'structures', stats: [] },
    { tag: 'materials', stats: [] },
    { tag: 'weapon', stats: ['str', 'agi'] },
    { tag: 'weapons', stats: ['str', 'agi'] },
    { tag: 'tool', stats: ['dex', 'int'] },
    { tag: 'tools', stats: ['dex', 'int'] },
    { tag: 'armor', stats: ['vit', 'str'] },
    { tag: 'consumables', stats: [] },
    { tag: 'ranged', stats: ['dex', 'agi'] },
    { tag: 'melee', stats: ['str', 'agi'] },
    { tag: 'combating', stats: ['vit', 'str'] },
    { tag: 'combat', stats: ['vit', 'str'] },
    { tag: 'scavenging', stats: ['agi', 'str'] },
    { tag: 'cooking', stats: ['chr', 'dex'] },
    { tag: 'gathering', stats: ['dex', 'agi'] },
    { tag: 'crafting', stats: ['int', 'dex'] },
    { tag: 'jewelry', stats: ['chr', 'int'] },
    { tag: 'backpack', stats: ['vit', 'str'] },
    { tag: 'craftingtool', stats: ['int', 'dex'] },
    { tag: 'gatheringtool', stats: ['dex', 'agi'] },
];

const CUREL_BUFF_LINE_COUNT = {
    COMMON: 0,
    UNCOMMON: 1,
    RARE: 2,
    EPIC: 3,
    LEGENDARY: 5,
};

const CUREL_BUFF_POOL = [
    { code: 'durability_pct', label: 'Durability', valuePerLevel: 4 },
    { code: 'action_speed_pct', label: 'Action Speed', valuePerLevel: 2 },
    { code: 'yield_chance_pct', label: 'Yield Chance', valuePerLevel: 2 },
    { code: 'quality_power', label: 'Quality Power', valuePerLevel: 1 },
];

function calculateBaseStatValue(itemPower) {
    return Math.max(1, Math.floor((itemPower || 1) * 3));
}

function createEmptyStatRoll() {
    return {
        stat_1_type: null,
        stat_1_value: 0,
        stat_2_type: null,
        stat_2_value: 0,
        stat_3_type: null,
        stat_3_value: 0,
    };
}

function normalizeItemStatConfig(config) {
    return {
        category: String(config?.category || '').toUpperCase(),
        itemPower: Math.max(1, Math.floor(Number(config?.itemPower) || 1)),
        tags: Array.isArray(config?.tags) ? config.tags : [],
    };
}

function getNormalizedTags(tags) {
    return tags.map(tag => String(tag || '').toLowerCase());
}

function resolveStatPair(config) {
    const normalizedTags = getNormalizedTags(config.tags);

    for (const rule of TAG_STAT_PAIR_RULES) {
        if (normalizedTags.includes(rule.tag)) return rule.stats;
    }

    return DEFAULT_STAT_PAIR[config.category] || [];
}

function rollItemStats(config) {
    const normalizedConfig = normalizeItemStatConfig(config);
    const statPair = resolveStatPair(normalizedConfig);
    if (statPair.length === 0) return createEmptyStatRoll();

    const primaryStat = statPair[0];
    const secondaryStat = statPair[1];
    if (!primaryStat) return createEmptyStatRoll();

    return {
        stat_1_type: primaryStat,
        stat_1_value: normalizedConfig.itemPower * 2,
        stat_2_type: secondaryStat || null,
        stat_2_value: secondaryStat ? normalizedConfig.itemPower : 0,
        stat_3_type: null,
        stat_3_value: 0,
    };
}

function getCurelBuffLineCount(rarity) {
    const normalizedRarity = String(rarity || 'COMMON').toUpperCase();
    return CUREL_BUFF_LINE_COUNT[normalizedRarity] || 0;
}

function rollItemCurelBuffs(config) {
    const lineCount = getCurelBuffLineCount(config?.rarity);
    if (lineCount <= 0) return [];

    const buffLevels = {};
    for (let index = 0; index < lineCount; index++) {
        const buff = CUREL_BUFF_POOL[Math.floor(Math.random() * CUREL_BUFF_POOL.length)];
        buffLevels[buff.code] = (buffLevels[buff.code] || 0) + 1;
    }

    return CUREL_BUFF_POOL
        .filter(buff => buffLevels[buff.code])
        .map(buff => ({
            code: buff.code,
            label: buff.label,
            level: buffLevels[buff.code],
            value: buffLevels[buff.code] * buff.valuePerLevel,
        }));
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
            for (let index = 1; index <= 3; index++) {
                const statType = item[`stat_${index}_type`];
                const statValue = parseFloat(item[`stat_${index}_value`]) || 0;
                if (statType && Object.prototype.hasOwnProperty.call(totals, statType)) {
                    totals[statType] += statValue;
                }
            }
        }

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
    rollItemCurelBuffs,
    getCurelBuffLineCount,
    calculateGearStatBonus,
    calculateBaseStatValue,
    DEFAULT_STAT_PAIR,
    TAG_STAT_PAIR_RULES,
    CUREL_BUFF_LINE_COUNT,
    CUREL_BUFF_POOL,
};

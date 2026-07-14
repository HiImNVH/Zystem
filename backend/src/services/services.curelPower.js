// backend/src/services/services.curelPower.js

const { playerDataDb } = require('../repositories/repositories.databaseDomains');
const dbPool = playerDataDb;

const POWER_MODES = {
    GATHERING: {
        primaryJobs: ['gathering'],
        supportJobs: ['scavenging', 'fighting'],
    },
    COMBAT_GATHERING: {
        primaryJobs: ['fighting'],
        supportJobs: ['scavenging', 'gathering'],
    },
    SCAVENGING: {
        primaryJobs: ['scavenging'],
        supportJobs: ['gathering', 'fighting'],
    },
    CRAFTING: {
        primaryJobs: ['crafting'],
        supportJobs: ['building', 'cooking'],
    },
};

const ACTION_POWER_MODE = {
    MINE: 'GATHERING',
    CHOP: 'GATHERING',
    FORAGE: 'GATHERING',
    FARM: 'GATHERING',
    HUNT: 'COMBAT_GATHERING',
    BATTLE: 'COMBAT_GATHERING',
    DUNGEON: 'COMBAT_GATHERING',
    EXPLORE: 'SCAVENGING',
    CRAFT: 'CRAFTING',
};

function normalizePowerMode(modeOrAction) {
    const key = (modeOrAction || 'GATHERING').toUpperCase();
    return POWER_MODES[key] ? key : (ACTION_POWER_MODE[key] || 'GATHERING');
}

function calculateCurelPowerFromRows(playerLevel, jobRows, modeOrAction, passiveBonus = 0) {
    const mode = normalizePowerMode(modeOrAction);
    const rule = POWER_MODES[mode];
    const level = Math.max(1, Math.floor(Number(playerLevel) || 1));
    const jobs = Array.isArray(jobRows) ? jobRows : [];

    const getHighestJobLevel = (jobCodes) => jobs
        .filter(job => jobCodes.includes((job.code || '').toLowerCase()))
        .reduce((highest, job) => Math.max(highest, Math.floor(Number(job.job_level) || 0)), 0);

    const primaryJobLevel = getHighestJobLevel(rule.primaryJobs);
    const supportJobLevel = getHighestJobLevel(rule.supportJobs);
    const supportBonus = Math.floor(supportJobLevel * 0.25);
    const bonus = Math.floor(Number(passiveBonus) || 0);

    return Math.min(Math.max(level + primaryJobLevel + supportBonus + bonus, 0), 40);
}

async function getUnlockedPassiveBonus(playerId, mode) {
    try {
        const result = await dbPool.query(`
            SELECT COALESCE(SUM(js.effect_val), 0) AS passive_bonus
            FROM player_skills ps
            JOIN job_skills js ON ps.skill_id = js.id
            WHERE ps.player_id = $1
              AND ps.is_unlocked = TRUE
              AND js.effect_type IN ($2, 'curel_power', 'rarity_power');
        `, [playerId, `${mode.toLowerCase()}_power`]);

        return Number(result.rows[0]?.passive_bonus) || 0;
    } catch (error) {
        console.warn('[WARN] Khong tinh duoc CUREL passive bonus:', error.message);
        return 0;
    }
}

async function calculatePlayerCurelPower(playerId, modeOrAction) {
    if (!playerId) return 0;

    const mode = normalizePowerMode(modeOrAction);
    const [playerResult, jobsResult] = await Promise.all([
        dbPool.query('SELECT player_level FROM players WHERE id = $1;', [playerId]),
        dbPool.query(`
            SELECT js.code, pj.job_level
            FROM player_jobs pj
            JOIN jobs_seed js ON pj.job_id = js.id
            WHERE pj.player_id = $1;
        `, [playerId]),
    ]);

    const playerLevel = playerResult.rows[0]?.player_level || 1;
    const passiveBonus = await getUnlockedPassiveBonus(playerId, mode);

    return calculateCurelPowerFromRows(
        playerLevel,
        jobsResult.rows,
        mode,
        passiveBonus
    );
}

async function calculateLootCurelPower(playerId, actionType) {
    return calculatePlayerCurelPower(playerId, actionType);
}

module.exports = {
    calculateCurelPowerFromRows,
    calculatePlayerCurelPower,
    calculateLootCurelPower,
    normalizePowerMode,
    ACTION_POWER_MODE,
    POWER_MODES,
};

// backend/src/services/services.progression.js
// Xu ly EXP player/ky nang theo sheet CAP DO

const { dbPool } = require('../repositories/repositories.database');
const characterRepository = require('../repositories/repositories.character');
const playerEventsService = require('./services.playerEvents');

// Cong thuc EXP can de len cap theo Balance Sheet: 0.7L^3 + 20L^2 + 100L + 50
function calculateExpRequired(targetLevel) {
    if (!targetLevel || targetLevel < 1) return 0;
    const L = targetLevel;
    return Math.floor(0.7 * Math.pow(L, 3) + 20 * Math.pow(L, 2) + 100 * L + 50);
}

function calculateSkillExpRequired(targetLevel) {
    if (!targetLevel || targetLevel < 1) return 0;
    const L = targetLevel;
    return Math.floor(15 * Math.pow(L, 2) + 50 * L + 100);
}

// Tinh tong EXP tich luy can de dat den mot cap nhat dinh
function calculateTotalExpForLevel(targetLevel) {
    let total = 0;
    for (let lv = 1; lv < targetLevel; lv++) {
        total += calculateExpRequired(lv);
    }
    return total;
}

// Tinh cap do hien tai dua tren tong EXP tich luy
function calculateLevelFromExp(totalExp) {
    let level = 1;
    while (level < 80) {
        const expNeeded = calculateExpRequired(level);
        if (totalExp < expNeeded) break;
        totalExp -= expNeeded;
        level++;
    }
    return level;
}

// Kiem tra gioi han nghe: cap nghe <= player_level (luat cung)
async function verifySkillProgression(playerId, jobCode, currentJobLevel) {
    if (!playerId || !jobCode) return { allowed: false, reason: 'Missing parameters.' };

    const character = await characterRepository.findCharacterById(playerId);
    if (!character) return { allowed: false, reason: 'Character not found.' };

    if (currentJobLevel >= character.player_level) {
        return {
            allowed: false,
            reason: `Job ${jobCode} is capped at level ${currentJobLevel}. Raise Player Level to ${currentJobLevel + 1} first.`
        };
    }

    return { allowed: true };
}

// Xu ly nhan EXP va tu dong len cap neu du EXP
async function processPlayerExpGain(playerId, expAmount) {
    if (!playerId || !expAmount || expAmount <= 0) return null;

    const character = await characterRepository.findCharacterById(playerId);
    if (!character) return null;

    const currentLevel = character.player_level;
    const maxLevel = 80; // Cap Alpha max la 60, nhung DB cho phep 80

    if (currentLevel >= maxLevel) {
        console.log(`[INFO] Nhan vat ${playerId} da dat cap toi da ${maxLevel}. Khong tiep nhan EXP.`);
        return { leveled_up: false, new_level: currentLevel };
    }

    const newTotalExp = BigInt(character.current_exp) + BigInt(expAmount);
    let remainingExp = newTotalExp;
    let leveledUp = false;
    let newLevel = currentLevel;

    while (newLevel < maxLevel) {
        const expNeeded = BigInt(calculateExpRequired(newLevel));
        if (remainingExp < expNeeded) break;
        remainingExp -= expNeeded;
        newLevel++;
        leveledUp = true;
    }

    const levelsGained = newLevel - currentLevel;
    const spGained = levelsGained * 5;
    const updates = {
        current_exp: remainingExp.toString(),
        ...(leveledUp ? {
            player_level: newLevel,
            skill_points: character.skill_points + spGained
        } : {})
    };

    if (leveledUp) {
        console.log(`[SUCCESS] Nhan vat ${playerId} len cap ${newLevel}! Nhan +${spGained} SP.`);
        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'PLAYER_LEVEL_UP',
            source: 'Zystem',
            title: 'Player Level Up',
            message: `Your player level increased from ${currentLevel} to ${newLevel}.`,
            payload: { old_level: currentLevel, new_level: newLevel, sp_gained: spGained },
        });
    }

    await characterRepository.updateCharacterStats(playerId, updates);

    return { leveled_up: leveledUp, new_level: newLevel, exp_gained: expAmount };
}

// Xu ly EXP nghe nghiep sau khi hoan tat hanh dong
async function processJobExpGain(playerId, jobId, expAmount) {
    if (!playerId || !jobId || !expAmount || expAmount <= 0) return null;

    try {
        // Lay thong tin nghe hien tai cua player
        const jobResult = await dbPool.query(
            `SELECT pj.*, js.code FROM player_jobs pj
             JOIN jobs_seed js ON pj.job_id = js.id
             WHERE pj.player_id = $1 AND pj.job_id = $2;`,
            [playerId, jobId]
        );

        // Kiem tra gioi han nghe truoc khi cap
        const playerResult = await dbPool.query(
            `SELECT player_level FROM players WHERE id = $1;`,
            [playerId]
        );

        if (playerResult.rows.length === 0) return null;
        const playerLevel = playerResult.rows[0].player_level;

        let currentJob = jobResult.rows[0];

        if (!currentJob) {
            const insertedJob = await dbPool.query(
                `INSERT INTO player_jobs (player_id, job_id, job_level, current_exp)
                 VALUES ($1, $2, 0, 0)
                 ON CONFLICT (player_id, job_id) DO UPDATE SET current_exp = player_jobs.current_exp
                 RETURNING *;`,
                [playerId, jobId]
            );
            currentJob = insertedJob.rows[0];
        }

        const newJobExp = BigInt(currentJob.current_exp) + BigInt(expAmount);
        let remainingExp = newJobExp;

        let newJobLevel = currentJob.job_level;

        while (newJobLevel < playerLevel) {
            const expNeededToLevel = BigInt(calculateSkillExpRequired(newJobLevel || 1));
            if (remainingExp < expNeededToLevel) break;
            remainingExp -= expNeededToLevel;
            newJobLevel++;
        }

        if (newJobLevel > currentJob.job_level) {
            console.log(`[INFO] Ky nang job_id=${jobId} cua nhan vat ${playerId} len cap ${newJobLevel}`);
            await playerEventsService.logPlayerEvent(playerId, {
                eventType: 'SKILL_LEVEL_UP',
                source: 'Zystem',
                title: 'Skill Level Up',
                message: `${currentJob.code} increased from level ${currentJob.job_level} to ${newJobLevel}.`,
                payload: {
                    job_id: jobId,
                    job_code: currentJob.code,
                    old_level: currentJob.job_level,
                    new_level: newJobLevel,
                },
            });
        }

        await dbPool.query(
            `UPDATE player_jobs
             SET job_level = $1, current_exp = $2
             WHERE player_id = $3 AND job_id = $4;`,
            [newJobLevel, remainingExp.toString(), playerId, jobId]
        );

        return { job_level: newJobLevel, exp_gained: expAmount };
    } catch (error) {
        console.error('[ERROR] Loi khi xu ly job EXP:', error.message);
        return null;
    }
}

module.exports = {
    calculateExpRequired,
    calculateSkillExpRequired,
    calculateTotalExpForLevel,
    calculateLevelFromExp,
    verifySkillProgression,
    processPlayerExpGain,
    processJobExpGain
};

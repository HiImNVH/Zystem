// backend/src/services/services.progression.js
// Version: 1.0
// Xu ly logic tien trinh nhan vat: EXP, kiem tra gioi han nghe, tinh SP

const { dbPool } = require('../repositories/repositories.database');
const characterRepository = require('../repositories/repositories.character');

// Cong thuc EXP can de len cap theo Balance Sheet: 0.7L^3 + 20L^2 + 100L + 50
function calculateExpRequired(targetLevel) {
    if (!targetLevel || targetLevel < 1) return 0;
    const L = targetLevel;
    return Math.floor(0.7 * Math.pow(L, 3) + 20 * Math.pow(L, 2) + 100 * L + 50);
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
    if (!playerId || !jobCode) return { allowed: false, reason: 'Thieu tham so.' };

    const character = await characterRepository.findCharacterById(playerId);
    if (!character) return { allowed: false, reason: 'Khong tim thay nhan vat.' };

    if (currentJobLevel >= character.player_level) {
        return {
            allowed: false,
            reason: `Cap nghe ${jobCode} dang bi chan o muc ${currentJobLevel}. Can nang Player Level len ${currentJobLevel + 1} truoc.`
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
    const expNeededToLevelUp = BigInt(calculateExpRequired(currentLevel));

    const updates = { current_exp: newTotalExp.toString() };
    let leveledUp = false;
    let newLevel = currentLevel;

    if (newTotalExp >= expNeededToLevelUp) {
        newLevel = Math.min(calculateLevelFromExp(Number(newTotalExp)), maxLevel);
        // 5 SP moi cap theo Balance Sheet
        const levelsGained = newLevel - currentLevel;
        const spGained = levelsGained * 5;

        updates.player_level = newLevel;
        updates.skill_points = character.skill_points + spGained;
        updates.current_exp = (newTotalExp - expNeededToLevelUp).toString();

        leveledUp = true;
        console.log(`[SUCCESS] Nhan vat ${playerId} len cap ${newLevel}! Nhan +${spGained} SP.`);
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

        if (jobResult.rows.length === 0) {
            // Tu dong tao ban ghi nghe moi neu chua co
            await dbPool.query(
                `INSERT INTO player_jobs (player_id, job_id, job_level, current_exp)
                 VALUES ($1, $2, 0, $3)
                 ON CONFLICT (player_id, job_id) DO NOTHING;`,
                [playerId, jobId, expAmount]
            );
            return { job_level: 0, exp_gained: expAmount };
        }

        const currentJob = jobResult.rows[0];
        const newJobExp = BigInt(currentJob.current_exp) + BigInt(expAmount);
        const expNeededToLevel = BigInt(calculateExpRequired(currentJob.job_level));

        let newJobLevel = currentJob.job_level;

        if (newJobExp >= expNeededToLevel && currentJob.job_level < playerLevel) {
            // Chi len cap nghe khi con duoi player_level
            newJobLevel = Math.min(currentJob.job_level + 1, playerLevel);
            console.log(`[INFO] Nghe job_id=${jobId} cua nhan vat ${playerId} len cap ${newJobLevel}`);
        }

        await dbPool.query(
            `UPDATE player_jobs
             SET job_level = $1, current_exp = $2
             WHERE player_id = $3 AND job_id = $4;`,
            [newJobLevel, (newJobExp - expNeededToLevel > 0n ? newJobExp - expNeededToLevel : newJobExp).toString(), playerId, jobId]
        );

        return { job_level: newJobLevel, exp_gained: expAmount };
    } catch (error) {
        console.error('[ERROR] Loi khi xu ly job EXP:', error.message);
        return null;
    }
}

module.exports = {
    calculateExpRequired,
    calculateTotalExpForLevel,
    calculateLevelFromExp,
    verifySkillProgression,
    processPlayerExpGain,
    processJobExpGain
};

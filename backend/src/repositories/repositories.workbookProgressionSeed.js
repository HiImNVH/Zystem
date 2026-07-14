// backend/src/repositories/repositories.workbookProgressionSeed.js

const { gameDataDb } = require('./repositories.databaseDomains');

const dbPool = gameDataDb;
const MAX_LEVEL = 40;

function calculatePlayerExp(level) {
    return Math.floor((0.7 * (level ** 3)) + (20 * (level ** 2)) + (50 * level) + 100);
}

function calculateSkillExp(level) {
    return Math.floor((0.5 * (level ** 2)) + (50 * level) + 100);
}

function buildProgressionRules() {
    const rules = [];
    let totalPlayerExp = 0;
    let totalSkillExp = 0;

    for (let level = 1; level <= MAX_LEVEL; level++) {
        const playerExp = calculatePlayerExp(level);
        const skillExp = calculateSkillExp(level);
        totalPlayerExp += playerExp;
        totalSkillExp += skillExp;
        rules.push({ level, playerExp, skillExp, totalPlayerExp, totalSkillExp });
    }

    return rules;
}

async function seedWorkbookProgression() {
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');
        for (const rule of buildProgressionRules()) {
            await client.query(`
                INSERT INTO leveling_rules
                    (level, player_exp_required, total_player_exp,
                     skill_exp_required, total_skill_exp, breakthrough_time, notes)
                VALUES ($1,$2,$3,$4,$5,NULL,NULL)
                ON CONFLICT (level) DO UPDATE SET
                    player_exp_required = EXCLUDED.player_exp_required,
                    total_player_exp = EXCLUDED.total_player_exp,
                    skill_exp_required = EXCLUDED.skill_exp_required,
                    total_skill_exp = EXCLUDED.total_skill_exp,
                    breakthrough_time = NULL,
                    notes = NULL;
            `, [rule.level, rule.playerExp, rule.totalPlayerExp, rule.skillExp, rule.totalSkillExp]);
        }
        await client.query('DELETE FROM leveling_rules WHERE level > $1;', [MAX_LEVEL]);
        await client.query('COMMIT');
        console.log(`[SUCCESS] Da dong bo progression cap ${MAX_LEVEL} theo workbook.`);
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Khong the dong bo progression tu workbook:', error.message);
        return false;
    } finally {
        client.release();
    }
}

module.exports = {
    seedWorkbookProgression,
};

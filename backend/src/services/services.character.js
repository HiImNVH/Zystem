// backend/src/services/services.character.js

const characterRepository = require('../repositories/repositories.character');
const combatService = require('./services.combat');
const itemStatsService = require('./services.itemStats');
const { playerDataDb } = require('../repositories/repositories.databaseDomains');
const dbPool = playerDataDb;

// Tinh tong stat cua nhan vat: base_stat + stat tu nghe + stat tu title + stat tu gear
async function calculateTotalStats(playerId) {
    if (!playerId) return null;

    const character = await characterRepository.findCharacterById(playerId);
    if (!character) return null;

    // Lay tong stat bonus tu tat ca nghe hien co cua player
    const jobStatsResult = await dbPool.query(`
        SELECT
            SUM(pj.job_level * js.str_per_lv) AS job_str,
            SUM(pj.job_level * js.agi_per_lv) AS job_agi,
            SUM(pj.job_level * js.dex_per_lv) AS job_dex,
            SUM(pj.job_level * js.vit_per_lv) AS job_vit,
            SUM(pj.job_level * js.int_per_lv) AS job_int,
            SUM(pj.job_level * js.chr_per_lv) AS job_chr
        FROM player_jobs pj
        JOIN jobs_seed js ON pj.job_id = js.id
        WHERE pj.player_id = $1 AND pj.job_level > 0;
    `, [playerId]);

    const jobStats = jobStatsResult.rows[0];

    // Lay stat tu title dang trang bi (neu co)
    let titleStats = { str: 0, agi: 0, dex: 0, vit: 0, int: 0, chr: 0 };
    if (character.equipped_title_id) {
        const titleResult = await dbPool.query(`
            SELECT a.title_str_bonus, a.title_agi_bonus, a.title_dex_bonus,
                   a.title_vit_bonus, a.title_int_bonus, a.title_chr_bonus
            FROM player_achievements pa
            JOIN achievements a ON pa.achievement_id = a.id
            WHERE pa.id = $1 AND pa.is_completed = TRUE;
        `, [character.equipped_title_id]);

        if (titleResult.rows.length > 0) {
            const t = titleResult.rows[0];
            titleStats = {
                str: parseFloat(t.title_str_bonus) || 0,
                agi: parseFloat(t.title_agi_bonus) || 0,
                dex: parseFloat(t.title_dex_bonus) || 0,
                vit: parseFloat(t.title_vit_bonus) || 0,
                int: parseFloat(t.title_int_bonus) || 0,
                chr: parseFloat(t.title_chr_bonus) || 0,
            };
        }
    }

    // Lay stat tu toan bo gear dang equip (tong hop tu 3 stat slot moi item)
    const gearStats = await itemStatsService.calculateGearStatBonus(playerId);

    const totalStr = parseFloat(character.base_str) + parseFloat(jobStats.job_str || 0) + titleStats.str + gearStats.str;
    const totalAgi = parseFloat(character.base_agi) + parseFloat(jobStats.job_agi || 0) + titleStats.agi + gearStats.agi;
    const totalDex = parseFloat(character.base_dex) + parseFloat(jobStats.job_dex || 0) + titleStats.dex + gearStats.dex;
    const totalVit = parseFloat(character.base_vit) + parseFloat(jobStats.job_vit || 0) + titleStats.vit + gearStats.vit;
    const totalInt = parseFloat(character.base_int) + parseFloat(jobStats.job_int || 0) + titleStats.int + gearStats.int;
    const totalChr = parseFloat(character.base_chr) + parseFloat(jobStats.job_chr || 0) + titleStats.chr + gearStats.chr;

    const maxHp = combatService.calculateMaxHp({
        vit: totalVit,
        str: totalStr,
        playerLevel: character.player_level
    });
    const attack = combatService.calculateAttack(totalStr, 0);
    const defense = combatService.calculateDefense(totalVit, 0);
    const evasionRate = combatService.calculateEvasionRate(totalAgi);
    const critRate = combatService.calculateCritRate(totalDex, 0);

    return {
        player_id: playerId,
        player_level: character.player_level,
        base: {
            str: character.base_str, agi: character.base_agi, dex: character.base_dex,
            vit: character.base_vit, int: character.base_int, chr: character.base_chr
        },
        from_jobs: {
            str: parseFloat(jobStats.job_str || 0).toFixed(2),
            agi: parseFloat(jobStats.job_agi || 0).toFixed(2),
            dex: parseFloat(jobStats.job_dex || 0).toFixed(2),
            vit: parseFloat(jobStats.job_vit || 0).toFixed(2),
            int: parseFloat(jobStats.job_int || 0).toFixed(2),
            chr: parseFloat(jobStats.job_chr || 0).toFixed(2),
        },
        from_title: titleStats,
        from_gear: gearStats,
        total: {
            str: totalStr.toFixed(2), agi: totalAgi.toFixed(2), dex: totalDex.toFixed(2),
            vit: totalVit.toFixed(2), int: totalInt.toFixed(2), chr: totalChr.toFixed(2),
        },
        derived: {
            max_hp: maxHp,
            attack,
            defense,
            evasion_rate_pct: (evasionRate * 100).toFixed(2),
            dodge_rate_pct: (evasionRate * 100).toFixed(2),
            crit_rate_pct: (critRate * 100).toFixed(2),
        }
    };
}

module.exports = {
    calculateTotalStats
};

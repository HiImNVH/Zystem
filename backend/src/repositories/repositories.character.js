// backend/src/repositories/repositories.character.js
// Version: 3.0
// Cap nhat: Gioi han 1 nhan vat/account, base stats bat dau tu 0
//           Ho tro startingJobCode: day nghe khoi dau len cap 20 ngay khi tao

const { dbPool } = require('./repositories.database');
const walletRepository = require('./repositories.wallet');

// Tinh stat bonus khi nghe len cap 20 (20 cap * stat_per_lv)
function calculateStartingJobBonus(jobStats) {
    const startingLevel = 20;
    return {
        str: parseFloat((jobStats.str * startingLevel).toFixed(2)),
        agi: parseFloat((jobStats.agi * startingLevel).toFixed(2)),
        dex: parseFloat((jobStats.dex * startingLevel).toFixed(2)),
        vit: parseFloat((jobStats.vit * startingLevel).toFixed(2)),
        int: parseFloat((jobStats.int * startingLevel).toFixed(2)),
        chr: parseFloat((jobStats.chr * startingLevel).toFixed(2)),
    };
}

async function createCharacter(characterData) {
    if (!characterData || !characterData.characterName || !characterData.accountId) return null;

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Guard: kiem tra account da co nhan vat chua (gioi han 1/account)
        const existingCheck = await client.query(
            `SELECT id, character_name FROM players WHERE account_id = $1;`,
            [characterData.accountId]
        );
        if (existingCheck.rows.length > 0) {
            return { error: `Tai khoan nay da co nhan vat: "${existingCheck.rows[0].character_name}". Moi tai khoan chi duoc tao 1 nhan vat.` };
        }

        // Lay thong tin nghe khoi dau
        let startingJob = null;
        if (characterData.startingJobCode) {
            const jobResult = await client.query(
                `SELECT * FROM jobs_seed WHERE code = $1 AND is_available = TRUE;`,
                [characterData.startingJobCode.toLowerCase()]
            );
            if (jobResult.rows.length === 0) {
                return { error: `Nghe khoi dau khong hop le: ${characterData.startingJobCode}` };
            }
            startingJob = jobResult.rows[0];
        }

        // Tinh stat bonus tu nghe khoi dau (20 cap)
        // Base stats bat dau tu 0, chi co stat tu nghe khoi dau
        let baseStr = 0, baseAgi = 0, baseDex = 0;
        let baseVit = 0, baseInt = 0, baseChr = 0;

        if (startingJob) {
            const bonus = calculateStartingJobBonus({
                str: parseFloat(startingJob.str_per_lv),
                agi: parseFloat(startingJob.agi_per_lv),
                dex: parseFloat(startingJob.dex_per_lv),
                vit: parseFloat(startingJob.vit_per_lv),
                int: parseFloat(startingJob.int_per_lv),
                chr: parseFloat(startingJob.chr_per_lv),
            });
            baseStr = bonus.str;
            baseAgi = bonus.agi;
            baseDex = bonus.dex;
            baseVit = bonus.vit;
            baseInt = bonus.int;
            baseChr = bonus.chr;
        }

        // MaxHP tinh tu VIT: 80 + VIT * 10 + STR * 2
        const maxHp = Math.floor(80 + baseVit * 10 + baseStr * 2);

        // Tao nhan vat voi base stats tu 0 + bonus nghe khoi dau
        const playerResult = await client.query(`
            INSERT INTO players
                (account_id, character_name, player_level, current_exp, skill_points,
                 base_str, base_agi, base_dex, base_vit, base_int, base_chr,
                 max_hp, current_hp)
            VALUES ($1, $2, 1, 0, 5, $3, $4, $5, $6, $7, $8, $9, $9)
            RETURNING *;
        `, [
            characterData.accountId,
            characterData.characterName.trim(),
            baseStr, baseAgi, baseDex, baseVit, baseInt, baseChr,
            maxHp
        ]);

        const newPlayer = playerResult.rows[0];

        // Gan nghe khoi dau o cap 20 vao player_jobs
        if (startingJob) {
            // EXP tuong duong de dat cap 20 (dung ham don gian)
            const expForLevel20 = Math.floor(0.7 * Math.pow(20, 3) + 20 * Math.pow(20, 2) + 100 * 20 + 50);

            await client.query(`
                INSERT INTO player_jobs (player_id, job_id, job_level, current_exp, sp_invested, unlocked_at)
                VALUES ($1, $2, 20, $3, 0, NOW());
            `, [newPlayer.id, startingJob.id, expForLevel20]);

            console.log(`[INFO] Gan nghe khoi dau "${startingJob.display_name}" cap 20 cho nhan vat ${newPlayer.character_name}`);
        }

        // Tao vi tien
        await walletRepository.initializeWallet(newPlayer.id);

        await client.query('COMMIT');

        console.log(`[SUCCESS] Tao nhan vat moi: ${characterData.characterName} (nghe: ${startingJob?.display_name || 'khong co'})`);

        return {
            ...newPlayer,
            starting_job: startingJob ? {
                code:         startingJob.code,
                display_name: startingJob.display_name,
                level:        20,
            } : null
        };
    } catch (error) {
        await client.query('ROLLBACK');
        if (error.code === '23505') {
            console.warn(`[WARN] Ten nhan vat da ton tai: ${characterData.characterName}`);
            return { error: 'Ten nhan vat nay da duoc su dung boi nguoi choi khac.' };
        }
        console.error('[ERROR] Loi khi createCharacter:', error.message);
        return null;
    } finally {
        client.release();
    }
}

async function findCharacterById(characterId) {
    if (!characterId) return null;

    try {
        const result = await dbPool.query(`
            SELECT p.*, w.copper, w.silver, w.gold
            FROM players p
            LEFT JOIN wallets w ON p.id = w.player_id
            WHERE p.id = $1;
        `, [characterId]);

        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi findCharacterById:', error.message);
        return null;
    }
}

async function findCharacterByAccount(accountId) {
    if (!accountId) return null;

    try {
        const result = await dbPool.query(`
            SELECT p.id, p.character_name, p.player_level, p.current_exp, p.skill_points,
                   p.base_str, p.base_agi, p.base_dex, p.base_vit, p.base_int, p.base_chr,
                   p.max_hp, p.current_hp, p.infection_pct, p.radiation_pct,
                   p.infection_status, p.is_alive, p.created_at,
                   w.copper, w.silver, w.gold
            FROM players p
            LEFT JOIN wallets w ON p.id = w.player_id
            WHERE p.account_id = $1
            LIMIT 1;
        `, [accountId]);

        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi findCharacterByAccount:', error.message);
        return null;
    }
}

// Giu lai findCharactersByAccount de tuong thich nguoc voi route cu
async function findCharactersByAccount(accountId) {
    const character = await findCharacterByAccount(accountId);
    return character ? [character] : [];
}

async function updateCharacterStats(characterId, statsUpdate) {
    if (!characterId || !statsUpdate) return null;

    const allowedFields = [
        'player_level', 'current_exp', 'skill_points',
        'base_str', 'base_agi', 'base_dex', 'base_vit', 'base_int', 'base_chr',
        'max_hp', 'current_hp', 'infection_pct', 'radiation_pct',
        'infection_status', 'is_alive', 'equipped_title_id'
    ];

    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    for (const [field, value] of Object.entries(statsUpdate)) {
        if (!allowedFields.includes(field)) continue;
        setClauses.push(`${field} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
    }

    if (setClauses.length === 0) return null;

    setClauses.push(`updated_at = NOW()`);
    values.push(characterId);

    try {
        const result = await dbPool.query(`
            UPDATE players SET ${setClauses.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING *;
        `, values);
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi updateCharacterStats:', error.message);
        return null;
    }
}

module.exports = {
    createCharacter,
    findCharacterById,
    findCharacterByAccount,
    findCharactersByAccount,
    updateCharacterStats
};

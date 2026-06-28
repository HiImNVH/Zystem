// backend/src/repositories/repositories.character.js
// Version: 2.0
// Cap nhat: Fix UUID cho findCharacterById, bo sung findCharactersByAccount,
//           lien ket account_id khi tao nhan vat, lay full stats kem wallet

const { dbPool } = require('./repositories.database');
const walletRepository = require('./repositories.wallet');

async function createCharacter(characterData) {
    if (!characterData || !characterData.characterName) return null;

    const sqlQuery = `
        INSERT INTO players (account_id, character_name)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const sqlValues = [characterData.accountId || null, characterData.characterName];

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);
        const newPlayer = result.rows[0];

        console.log(`[SUCCESS] Da tao nhan vat moi: ${characterData.characterName}`);

        // Tu dong sinh vi tien te cho nhan vat vua tao
        await walletRepository.initializeWallet(newPlayer.id);

        return newPlayer;
    } catch (error) {
        if (error.code === '23505') {
            console.warn(`[WARN] Ten nhan vat da ton tai: ${characterData.characterName}`);
            return { error: 'Ten nhan vat nay da duoc su dung.' };
        }
        console.error('[ERROR] Loi khi createCharacter:', error.message);
        return null;
    }
}

async function findCharacterById(characterId) {
    if (!characterId) return null;

    const sqlQuery = `
        SELECT p.*,
               w.copper, w.silver, w.gold
        FROM players p
        LEFT JOIN wallets w ON p.id = w.player_id
        WHERE p.id = $1;
    `;

    try {
        const result = await dbPool.query(sqlQuery, [characterId]);
        if (result.rows.length === 0) {
            console.log(`[WARN] Khong tim thay nhan vat voi ID: ${characterId}`);
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('[ERROR] Loi khi findCharacterById:', error.message);
        return null;
    }
}

async function findCharactersByAccount(accountId) {
    if (!accountId) return [];

    const sqlQuery = `
        SELECT p.id, p.character_name, p.player_level, p.current_exp,
               p.base_str, p.base_agi, p.base_dex, p.base_vit, p.base_int, p.base_chr,
               p.max_hp, p.current_hp, p.infection_pct, p.radiation_pct,
               p.is_alive, p.created_at
        FROM players p
        WHERE p.account_id = $1
        ORDER BY p.created_at ASC;
    `;

    try {
        const result = await dbPool.query(sqlQuery, [accountId]);
        return result.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi findCharactersByAccount:', error.message);
        return [];
    }
}

async function updateCharacterStats(characterId, statsUpdate) {
    if (!characterId || !statsUpdate) return null;

    // Chi cho phep cap nhat cac truong stat hop le, tranh SQL Injection
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

    const sqlQuery = `
        UPDATE players
        SET ${setClauses.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *;
    `;

    try {
        const result = await dbPool.query(sqlQuery, values);
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi updateCharacterStats:', error.message);
        return null;
    }
}

module.exports = {
    createCharacter,
    findCharacterById,
    findCharactersByAccount,
    updateCharacterStats
};

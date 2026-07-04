// backend/src/repositories/repositories.account.js

const { dbPool } = require('./repositories.database');
const bcrypt = require('bcryptjs');

const BCRYPT_ROUNDS = 12;

async function createAccount(username, email, password) {
    if (!username || !email || !password) return null;

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const sqlQuery = `
        INSERT INTO accounts (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at;
    `;

    try {
        const result = await dbPool.query(sqlQuery, [
            username.trim(),
            email.trim().toLowerCase(),
            passwordHash
        ]);
        console.log(`[SUCCESS] Tao tai khoan moi thanh cong: ${username}`);
        return result.rows[0];
    } catch (error) {
        if (error.code === '23505') {
            const field = error.detail?.includes('username') ? 'Ten dang nhap' : 'Email';
            console.warn(`[WARN] ${field} da ton tai: ${username}`);
            return { error: `${field} da duoc su dung.` };
        }
        console.error('[ERROR] Loi khi tao tai khoan:', error.message);
        return null;
    }
}

async function findAccountByUsername(username) {
    if (!username) return null;

    try {
        const result = await dbPool.query(
            `SELECT * FROM accounts WHERE username = $1;`,
            [username.trim()]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi tim kiem tai khoan:', error.message);
        return null;
    }
}

async function findAccountById(accountId) {
    if (!accountId) return null;

    try {
        const result = await dbPool.query(
            `SELECT id, username, email, is_vip, created_at, last_login_at FROM accounts WHERE id = $1;`,
            [accountId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi tim kiem tai khoan theo ID:', error.message);
        return null;
    }
}

async function verifyLogin(username, password) {
    const account = await findAccountByUsername(username);
    if (!account) {
        return { success: false, message: 'Ten dang nhap hoac mat khau khong chinh xac.' };
    }

    // So sanh mat khau bang bcrypt
    const isPasswordValid = await bcrypt.compare(password, account.password_hash);
    if (!isPasswordValid) {
        return { success: false, message: 'Ten dang nhap hoac mat khau khong chinh xac.' };
    }

    await dbPool.query(
        `UPDATE accounts SET last_login_at = NOW() WHERE id = $1;`,
        [account.id]
    );

    console.log(`[SUCCESS] Dang nhap thanh cong: ${username}`);
    return {
        success: true,
        account: {
            id: account.id,
            username: account.username,
            email: account.email,
            is_vip: account.is_vip
        }
    };
}

module.exports = {
    createAccount,
    findAccountByUsername,
    findAccountById,
    verifyLogin
};

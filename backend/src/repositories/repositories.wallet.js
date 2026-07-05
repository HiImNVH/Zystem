// backend/src/repositories/repositories.wallet.js

const { dbPool } = require('./repositories.database');
const playerEventsService = require('../services/services.playerEvents');

async function initializeWallet(playerId) {
    const sqlQuery = `
        INSERT INTO wallets (player_id, copper, silver, gold)
        VALUES ($1, 0, 0, 0)
        ON CONFLICT (player_id) DO NOTHING
        RETURNING *;
    `;
    try {
        const result = await dbPool.query(sqlQuery, [playerId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi khoi tao wallet:', error.message);
        return null;
    }
}

async function getWalletByPlayer(playerId) {
    if (!playerId) return null;

    const sqlQuery = `SELECT * FROM wallets WHERE player_id = $1;`;
    try {
        const result = await dbPool.query(sqlQuery, [playerId]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi getWalletByPlayer:', error.message);
        return null;
    }
}

async function modifyWalletBalance(playerId, currencyType, amount, transactionType) {
    if (!playerId || !currencyType || !amount || !transactionType) return { success: false, message: 'Missing parameters.' };

    const validCurrencies = ['copper', 'silver', 'gold'];
    const currency = currencyType.toLowerCase();

    if (!validCurrencies.includes(currency)) {
        return { success: false, message: `Invalid currency type: ${currencyType}` };
    }

    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');

        // Row-level lock chong Race Condition
        const lockResult = await client.query(
            `SELECT * FROM wallets WHERE player_id = $1 FOR UPDATE;`,
            [playerId]
        );

        if (lockResult.rows.length === 0) {
            throw new Error(`Wallet not found for player ID: ${playerId}`);
        }

        const currentWallet = lockResult.rows[0];
        const currentBalance = BigInt(currentWallet[currency]);
        const changeAmount = BigInt(amount);
        let balanceAfter;

        if (transactionType === 'DEPOSIT') {
            balanceAfter = currentBalance + changeAmount;
        } else if (transactionType === 'WITHDRAW') {
            balanceAfter = currentBalance - changeAmount;
            if (balanceAfter < 0n) {
                throw new Error(`Insufficient ${currency} balance to withdraw ${amount}.`);
            }
        } else {
            throw new Error('transactionType only accepts DEPOSIT or WITHDRAW.');
        }

        await client.query(
            `UPDATE wallets SET ${currency} = $1, updated_at = NOW() WHERE player_id = $2;`,
            [balanceAfter.toString(), playerId]
        );

        const logResult = await client.query(`
            INSERT INTO wallet_transactions (wallet_id, currency, transaction_type, amount, balance_after)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `, [currentWallet.id, currency.toUpperCase(), transactionType, changeAmount.toString(), balanceAfter.toString()]);

        await client.query('COMMIT');
        console.log(`[SUCCESS] [${transactionType}] ${amount} ${currency} cho player ${playerId}. So du moi: ${balanceAfter}`);
        await playerEventsService.logPlayerEvent(playerId, {
            eventType: `WALLET_${transactionType}`,
            source: 'Zystem',
            title: transactionType === 'DEPOSIT' ? 'Currency Received' : 'Currency Spent',
            message: `${transactionType === 'DEPOSIT' ? 'Received' : 'Spent'} ${amount} ${currency}.`,
            payload: {
                currency,
                amount: changeAmount.toString(),
                transaction_type: transactionType,
                balance_after: balanceAfter.toString(),
            },
        });

        return {
            success: true,
            balanceAfter: balanceAfter.toString(),
            transaction: logResult.rows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Giao dich vi bi hoan tac:', error.message);
        return { success: false, message: error.message };
    } finally {
        client.release();
    }
}

async function getTransactionHistory(playerId, limitCount) {
    if (!playerId) return [];

    const limit = limitCount || 50;

    const sqlQuery = `
        SELECT wt.*
        FROM wallet_transactions wt
        JOIN wallets w ON wt.wallet_id = w.id
        WHERE w.player_id = $1
        ORDER BY wt.created_at DESC
        LIMIT $2;
    `;

    try {
        const result = await dbPool.query(sqlQuery, [playerId, limit]);
        return result.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi lay lich su giao dich:', error.message);
        return [];
    }
}

module.exports = {
    initializeWallet,
    getWalletByPlayer,
    modifyWalletBalance,
    getTransactionHistory
};

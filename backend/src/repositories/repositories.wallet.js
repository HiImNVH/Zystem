// backend/src/repositories/repositories.wallet.js

const { dbPool } = require('./repositories.database');
const playerEventsService = require('../services/services.playerEvents');

const WALLET_CURRENCIES = ['money', 'silver_coin', 'gold_coin'];
const EXCHANGE_MARKET = {
    silver_coin: {
        label: 'Silver Coin',
        buyPrice: 100,
        sellPrice: 95,
    },
    gold_coin: {
        label: 'Gold Coin',
        buyPrice: 10000,
        sellPrice: 9500,
    },
};

async function initializeWallet(playerId) {
    const sqlQuery = `
        INSERT INTO wallets (player_id, money, silver_coin, gold_coin, copper, silver, gold)
        VALUES ($1, 0, 0, 0, 0, 0, 0)
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

    const sqlQuery = `
        SELECT id, player_id, money, silver_coin, gold_coin, updated_at
        FROM wallets
        WHERE player_id = $1;
    `;
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

    const currency = currencyType.toLowerCase();

    if (!WALLET_CURRENCIES.includes(currency)) {
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

function getExchangeMarket() {
    return Object.entries(EXCHANGE_MARKET).map(([currency, config]) => ({
        currency,
        label: config.label,
        buy_price: config.buyPrice,
        sell_price: config.sellPrice,
    }));
}

async function exchangeCurrency(config) {
    const { playerId, currencyType, quantity, side } = config;
    if (!playerId || !currencyType || !quantity || !side) return { success: false, message: 'Missing parameters.' };

    const currency = currencyType.toLowerCase();
    const action = side.toLowerCase();
    const market = EXCHANGE_MARKET[currency];
    if (!market) return { success: false, message: `Invalid exchange currency: ${currencyType}` };
    if (!['buy', 'sell'].includes(action)) return { success: false, message: 'side only accepts buy or sell.' };

    const tradeQuantity = BigInt(quantity);
    if (tradeQuantity <= 0n) return { success: false, message: 'Quantity must be greater than zero.' };

    const unitPrice = BigInt(action === 'buy' ? market.buyPrice : market.sellPrice);
    const moneyDelta = unitPrice * tradeQuantity;
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');
        const lockResult = await client.query(
            `SELECT * FROM wallets WHERE player_id = $1 FOR UPDATE;`,
            [playerId]
        );
        if (lockResult.rows.length === 0) throw new Error(`Wallet not found for player ID: ${playerId}`);

        const wallet = lockResult.rows[0];
        const currentMoney = BigInt(wallet.money || 0);
        const currentCoins = BigInt(wallet[currency] || 0);
        const nextMoney = action === 'buy' ? currentMoney - moneyDelta : currentMoney + moneyDelta;
        const nextCoins = action === 'buy' ? currentCoins + tradeQuantity : currentCoins - tradeQuantity;
        if (nextMoney < 0n) throw new Error(`Not enough Money. Need ${moneyDelta}.`);
        if (nextCoins < 0n) throw new Error(`Not enough ${market.label}.`);

        await client.query(
            `UPDATE wallets SET money = $1, ${currency} = $2, updated_at = NOW() WHERE player_id = $3;`,
            [nextMoney.toString(), nextCoins.toString(), playerId]
        );
        await client.query(`
            INSERT INTO wallet_transactions (wallet_id, currency, transaction_type, amount, balance_after, note)
            VALUES ($1, 'MONEY', $2, $3, $4, $5);
        `, [
            wallet.id,
            action === 'buy' ? 'EXCHANGE_WITHDRAW' : 'EXCHANGE_DEPOSIT',
            moneyDelta.toString(),
            nextMoney.toString(),
            `${action.toUpperCase()} ${tradeQuantity} ${market.label}`,
        ]);
        await client.query(`
            INSERT INTO wallet_transactions (wallet_id, currency, transaction_type, amount, balance_after, note)
            VALUES ($1, $2, $3, $4, $5, $6);
        `, [
            wallet.id,
            currency.toUpperCase(),
            action === 'buy' ? 'EXCHANGE_DEPOSIT' : 'EXCHANGE_WITHDRAW',
            tradeQuantity.toString(),
            nextCoins.toString(),
            `${action.toUpperCase()} at ${unitPrice} Money`,
        ]);

        await client.query('COMMIT');
        await playerEventsService.logPlayerEvent(playerId, {
            eventType: 'WALLET_EXCHANGE',
            source: 'Zystem',
            title: 'Currency Exchange',
            message: `${action === 'buy' ? 'Bought' : 'Sold'} ${tradeQuantity} ${market.label}.`,
            payload: {
                currency,
                side: action,
                quantity: tradeQuantity.toString(),
                unit_price: unitPrice.toString(),
                money_after: nextMoney.toString(),
                coin_after: nextCoins.toString(),
            },
        });

        return {
            success: true,
            wallet: {
                money: nextMoney.toString(),
                [currency]: nextCoins.toString(),
            },
            market: getExchangeMarket(),
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Giao dich doi tien bi hoan tac:', error.message);
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
    WALLET_CURRENCIES,
    initializeWallet,
    getWalletByPlayer,
    modifyWalletBalance,
    getTransactionHistory,
    getExchangeMarket,
    exchangeCurrency
};

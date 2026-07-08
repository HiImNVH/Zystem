// backend/src/routes/routes.wallet.js

const express = require('express');
const walletRouter = express.Router();
const walletRepository = require('../repositories/repositories.wallet');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

/**
 * @route   GET /api/wallets/exchange/market
 * @access  Protected
 */
walletRouter.get('/exchange/market', verifyToken, async (req, res) => {
    return res.json({ success: true, data: walletRepository.getExchangeMarket() });
});

/**
 * @route   POST /api/wallets/exchange
 * @access  Protected
 * @body    { playerId, currency, quantity, side: buy|sell }
 */
walletRouter.post('/exchange', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, currency, quantity, side } = req.body;
    if (!playerId || !currency || !quantity || !side) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId, currency, quantity, side.'
        });
    }

    try {
        const result = await walletRepository.exchangeCurrency({
            playerId,
            currencyType: currency,
            quantity,
            side,
        });
        if (!result.success) return res.status(400).json({ success: false, message: result.message });
        return res.json({ success: true, message: 'Exchange completed.', data: result });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/wallets/:playerId
 * @access  Protected
 */
walletRouter.get('/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const wallet = await walletRepository.getWalletByPlayer(playerId);
        if (!wallet) {
            return res.status(404).json({ success: false, message: 'Character wallet not found.' });
        }

        return res.json({ success: true, data: wallet });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/wallets/:playerId/history
 * @access  Protected
 * @query   ?limit=50
 */
walletRouter.get('/:playerId/history', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    try {
        const history = await walletRepository.getTransactionHistory(playerId, limit);
        return res.json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/wallets/modify
 * @desc    Chi dung noi bo hoac GM command — yeu cau xac thuc
 * @access  Protected
 * @body    { playerId, currency, amount, transactionType }
 */
walletRouter.post('/modify', verifyToken, async (req, res, next) => {
    const { playerId, currency, amount, transactionType } = req.body;

    if (!playerId || !currency || !amount || !transactionType) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId, currency, amount, transactionType.'
        });
    }

    const validCurrencies = walletRepository.WALLET_CURRENCIES;
    if (!validCurrencies.includes(currency.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `Invalid currency type. Accepted values: ${validCurrencies.join(', ')}`
        });
    }

    const validTypes = ['DEPOSIT', 'WITHDRAW'];
    if (!validTypes.includes(transactionType.toUpperCase())) {
        return res.status(400).json({
            success: false,
            message: 'transactionType only accepts: DEPOSIT or WITHDRAW.'
        });
    }

    try {
        const result = await walletRepository.modifyWalletBalance(
            playerId, currency, amount, transactionType.toUpperCase()
        );

        if (!result.success) {
            return res.status(400).json({ success: false, message: result.message });
        }

        return res.json({ success: true, message: 'Balance updated successfully!', data: result });
    } catch (error) {
        next(error);
    }
});

module.exports = walletRouter;

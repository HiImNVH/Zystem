// backend/src/routes/routes.wallet.js
// Version: 3.0
// Cap nhat: Gan verifyToken + verifyPlayerOwnership

const express = require('express');
const walletRouter = express.Router();
const walletRepository = require('../repositories/repositories.wallet');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

/**
 * @route   GET /api/wallets/:playerId
 * @access  Protected
 */
walletRouter.get('/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const wallet = await walletRepository.getWalletByPlayer(playerId);
        if (!wallet) {
            return res.status(404).json({ success: false, message: 'Khong tim thay vi cua nhan vat.' });
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
            message: 'Thieu tham so: playerId, currency, amount, transactionType.'
        });
    }

    const validCurrencies = ['copper', 'silver', 'gold'];
    if (!validCurrencies.includes(currency.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `Loai tien te khong hop le. Chi chap nhan: ${validCurrencies.join(', ')}`
        });
    }

    const validTypes = ['DEPOSIT', 'WITHDRAW'];
    if (!validTypes.includes(transactionType.toUpperCase())) {
        return res.status(400).json({
            success: false,
            message: 'transactionType chi chap nhan: DEPOSIT hoac WITHDRAW.'
        });
    }

    try {
        const result = await walletRepository.modifyWalletBalance(
            playerId, currency, amount, transactionType.toUpperCase()
        );

        if (!result.success) {
            return res.status(400).json({ success: false, message: result.message });
        }

        return res.json({ success: true, message: 'Bien dong so du thanh cong!', data: result });
    } catch (error) {
        next(error);
    }
});

module.exports = walletRouter;

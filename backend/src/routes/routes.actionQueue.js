// backend/src/routes/routes.actionQueue.js
//           Bo sung GET /:playerId/history

const express = require('express');
const actionQueueRouter = express.Router();
const actionQueueRepository = require('../repositories/repositories.actionQueue');
const actionQueueService = require('../services/services.actionQueue');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const { actionLimiter } = require('../middleware/middleware.rateLimit');
const { dbPool } = require('../repositories/repositories.database');

/**
 * @route   POST /api/action-queue/register
 * @access  Protected
 * @body    { playerId, actionType, zoneCode, durationSeconds }
 */
actionQueueRouter.post('/register', verifyToken, actionLimiter, async (req, res, next) => {
    const { playerId, actionType, zoneCode, durationSeconds } = req.body;

    if (!playerId || !actionType || !durationSeconds) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId, actionType, durationSeconds.'
        });
    }

    const duration = parseInt(durationSeconds);
    if (isNaN(duration) || duration <= 0) {
        return res.status(400).json({
            success: false,
            message: 'durationSeconds phai la so nguyen duong.'
        });
    }

    try {
        // Kiem tra player thuoc account dang dang nhap
        const ownerCheck = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (ownerCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
        }

        if (ownerCheck.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'Khong co quyen dang ky hanh dong cho nhan vat nay.' });
        }

        const playerResult = await dbPool.query(
            `SELECT base_agi FROM players WHERE id = $1;`,
            [playerId]
        );
        const agiStat = playerResult.rows[0]?.base_agi || 10;
        const actualDuration = actionQueueService.calculateActualDuration(duration, agiStat);

        const result = await actionQueueRepository.insertActionSlot(
            playerId, zoneCode, actionType, duration, actualDuration
        );

        if (!result) {
            return res.status(500).json({ success: false, message: 'Khong the dang ky hanh dong.' });
        }

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        return res.status(201).json({
            success: true,
            message: `Dang ky hanh dong ${actionType} thanh cong!`,
            data: {
                ...result,
                note: `AGI=${agiStat}: ${duration}s -> ${actualDuration}s`
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/action-queue/:playerId
 * @access  Protected
 */
actionQueueRouter.get('/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const queue = await actionQueueRepository.findActiveQueueByPlayer(playerId);
        const now = new Date();

        const queueWithStatus = queue.map(slot => ({
            ...slot,
            is_completed:      new Date(slot.completes_at) <= now,
            remaining_seconds: Math.max(0, Math.ceil((new Date(slot.completes_at) - now) / 1000))
        }));

        return res.json({ success: true, data: queueWithStatus });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/action-queue/:playerId/history
 * @access  Protected
 * @query   ?limit=20
 */
actionQueueRouter.get('/:playerId/history', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    try {
        const history = await actionQueueRepository.findCompletedQueueByPlayer(playerId, limit);
        return res.json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/action-queue/claim
 * @access  Protected
 * @body    { playerId, actionId }
 */
actionQueueRouter.post('/claim', verifyToken, async (req, res, next) => {
    const { playerId, actionId } = req.body;

    if (!playerId || !actionId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va actionId.'
        });
    }

    try {
        // Kiem tra quyen so huu nhan vat
        const ownerCheck = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (ownerCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
        }

        if (ownerCheck.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'Khong co quyen claim hanh dong nay.' });
        }

        // Claim action — tra ve ket qua co zone data
        const claimedAction = await actionQueueRepository.claimActionSlot(actionId, playerId);

        if (!claimedAction) {
            return res.status(500).json({ success: false, message: 'Loi khi claim hanh dong.' });
        }

        if (claimedAction.error) {
            return res.status(400).json({ success: false, message: claimedAction.error });
        }

        // Lazy Load Logic: tinh EXP + Infection + Loot
        const rewards = await actionQueueService.processClaimedAction(playerId, claimedAction);

        return res.json({
            success: true,
            message: 'Claim hanh dong thanh cong!',
            data: {
                action:  claimedAction,
                rewards: rewards
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/action-queue/cancel
 * @access  Protected
 * @body    { playerId, actionId }
 */
actionQueueRouter.post('/cancel', verifyToken, async (req, res, next) => {
    const { playerId, actionId } = req.body;

    if (!playerId || !actionId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va actionId.'
        });
    }

    try {
        const ownerCheck = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (ownerCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
        }

        if (ownerCheck.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'Khong co quyen huy hanh dong nay.' });
        }

        const result = await actionQueueRepository.cancelActionSlot(actionId, playerId);

        if (!result) {
            return res.status(500).json({ success: false, message: 'Loi khi huy hanh dong.' });
        }

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        return res.json({ success: true, message: 'Huy hanh dong thanh cong!', data: result });
    } catch (error) {
        next(error);
    }
});

module.exports = actionQueueRouter;

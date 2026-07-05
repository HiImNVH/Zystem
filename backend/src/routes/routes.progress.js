// backend/src/routes/routes.progress.js

const express = require('express');
const progressRouter = express.Router();
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const userProgressRepository = require('../repositories/repositories.userProgress');

progressRouter.get('/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const progress = await userProgressRepository.getUserProgressTimestamp(req.params.playerId);
        return res.json({ success: true, data: progress });
    } catch (error) {
        next(error);
    }
});

progressRouter.post('/touch', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, eventType, snapshot } = req.body;

    if (!playerId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId.'
        });
    }

    try {
        const progress = await userProgressRepository.touchUserProgressTimestamp({
            playerId,
            eventType,
            snapshot,
        });

        if (!progress) {
            return res.status(500).json({
                success: false,
                message: 'Khong the cap nhat timestamp tien trinh.'
            });
        }

        return res.json({
            success: true,
            message: 'Da cap nhat timestamp tien trinh.',
            data: progress
        });
    } catch (error) {
        next(error);
    }
});

module.exports = progressRouter;

// backend/src/routes/routes.events.js

const express = require('express');
const eventsRouter = express.Router();
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const playerEventsService = require('../services/services.playerEvents');

eventsRouter.get('/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const events = await playerEventsService.getPlayerEvents(req.params.playerId, req.query.limit);
        return res.json({ success: true, data: events });
    } catch (error) {
        next(error);
    }
});

eventsRouter.post('/:playerId/read', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const updated = await playerEventsService.markPlayerEventsRead(req.params.playerId);
        return res.json({ success: true, data: { read_count: updated.length } });
    } catch (error) {
        next(error);
    }
});

module.exports = eventsRouter;

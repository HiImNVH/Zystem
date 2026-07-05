// backend/src/routes/routes.chat.js

const express = require('express');
const chatRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');
const { verifyToken } = require('../middleware/middleware.auth');

const ALLOWED_CHANNELS = new Set(['GLOBAL', 'ZONE', 'GUILD']);

chatRouter.get('/messages', verifyToken, async (req, res, next) => {
    try {
        const channel = String(req.query.channel || 'GLOBAL').toUpperCase();
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 50, 1), 100);

        if (!ALLOWED_CHANNELS.has(channel)) {
            return res.status(400).json({ success: false, message: 'Invalid chat channel.' });
        }

        const result = await dbPool.query(`
            SELECT id, channel, zone_code, sender_player_id, sender_name, message, created_at
            FROM chat_messages
            WHERE channel = $1
            ORDER BY created_at DESC
            LIMIT $2;
        `, [channel, limit]);

        return res.json({ success: true, data: result.rows.reverse() });
    } catch (error) {
        next(error);
    }
});

chatRouter.post('/messages', verifyToken, async (req, res, next) => {
    const { playerId, channel = 'GLOBAL', message, zoneCode } = req.body;
    const normalizedChannel = String(channel).toUpperCase();
    const cleanMessage = String(message || '').trim();

    if (!playerId || !cleanMessage) {
        return res.status(400).json({ success: false, message: 'Missing playerId or message.' });
    }
    if (!ALLOWED_CHANNELS.has(normalizedChannel)) {
        return res.status(400).json({ success: false, message: 'Invalid chat channel.' });
    }
    if (cleanMessage.length > 256) {
        return res.status(400).json({ success: false, message: 'Message is too long.' });
    }

    try {
        const playerResult = await dbPool.query(
            `SELECT account_id, character_name FROM players WHERE id = $1;`,
            [playerId]
        );
        if (playerResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }
        if (playerResult.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'You do not have permission to chat as this character.' });
        }

        const result = await dbPool.query(`
            INSERT INTO chat_messages
                (channel, zone_code, sender_player_id, sender_name, message)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, channel, zone_code, sender_player_id, sender_name, message, created_at;
        `, [
            normalizedChannel,
            zoneCode || null,
            playerId,
            playerResult.rows[0].character_name,
            cleanMessage,
        ]);

        return res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        next(error);
    }
});

module.exports = chatRouter;

// backend/src/services/services.playerEvents.js

const { activityLogDb } = require('../repositories/repositories.databaseDomains');
const dbPool = activityLogDb;
const { emitPlayerEvent } = require('../sockets/sockets.io');

async function logPlayerEvent(playerId, event) {
    if (!playerId || !event) return null;

    try {
        const result = await dbPool.query(`
            INSERT INTO player_events
                (player_id, event_type, source, title, message, payload)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [
            playerId,
            event.eventType || event.event_type || 'SYSTEM',
            event.source || 'Zystem',
            event.title || 'Zystem',
            event.message || '',
            JSON.stringify(event.payload || {}),
        ]);

        const savedEvent = result.rows[0] || null;
        if (savedEvent) emitPlayerEvent(playerId, savedEvent);

        return savedEvent;
    } catch (error) {
        console.warn('[WARN] Khong ghi duoc player event:', error.message);
        return null;
    }
}

async function getPlayerEvents(playerId, limitCount) {
    if (!playerId) return [];

    const limit = Math.min(Math.max(parseInt(limitCount) || 50, 1), 100);
    const result = await dbPool.query(`
        SELECT *
        FROM player_events
        WHERE player_id = $1
        ORDER BY created_at DESC
        LIMIT $2;
    `, [playerId, limit]);

    return result.rows;
}

async function markPlayerEventsRead(playerId) {
    if (!playerId) return [];

    const result = await dbPool.query(`
        UPDATE player_events
        SET is_read = TRUE
        WHERE player_id = $1 AND is_read = FALSE
        RETURNING id;
    `, [playerId]);

    return result.rows;
}

module.exports = {
    logPlayerEvent,
    getPlayerEvents,
    markPlayerEventsRead,
};

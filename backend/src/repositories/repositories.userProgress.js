// backend/src/repositories/repositories.userProgress.js

const { dbPool } = require('./repositories.database');

const TIMESTAMP_FIELDS = [
    'last_seen_at',
    'last_saved_at',
    'last_action_claimed_at',
    'last_inventory_updated_at',
    'last_character_updated_at',
];

function getTimestampField(eventType) {
    const eventFieldMap = {
        seen: 'last_seen_at',
        save: 'last_saved_at',
        action_claimed: 'last_action_claimed_at',
        inventory_updated: 'last_inventory_updated_at',
        character_updated: 'last_character_updated_at',
    };
    return eventFieldMap[eventType] || eventFieldMap.save;
}

async function getUserProgressTimestamp(playerId) {
    if (!playerId) return null;

    try {
        const result = await dbPool.query(
            `SELECT * FROM user_progress_timestamps WHERE player_id = $1;`,
            [playerId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi lay timestamp tien trinh:', error.message);
        return null;
    }
}

async function touchUserProgressTimestamp(progressData) {
    if (!progressData || !progressData.playerId) return null;

    const timestampField = getTimestampField(progressData.eventType);
    if (!TIMESTAMP_FIELDS.includes(timestampField)) return null;

    const snapshot = progressData.snapshot || {};

    try {
        const result = await dbPool.query(`
            INSERT INTO user_progress_timestamps
                (player_id, ${timestampField}, progress_snapshot, save_revision, updated_at)
            VALUES ($1, NOW(), $2::JSONB, 1, NOW())
            ON CONFLICT (player_id) DO UPDATE
            SET ${timestampField} = NOW(),
                last_saved_at = CASE
                    WHEN $3 = 'save' THEN NOW()
                    ELSE user_progress_timestamps.last_saved_at
                END,
                progress_snapshot = user_progress_timestamps.progress_snapshot || $2::JSONB,
                save_revision = user_progress_timestamps.save_revision + 1,
                updated_at = NOW()
            RETURNING *;
        `, [progressData.playerId, JSON.stringify(snapshot), progressData.eventType || 'save']);
        return result.rows[0] || null;
    } catch (error) {
        console.error('[ERROR] Loi khi cap nhat timestamp tien trinh:', error.message);
        return null;
    }
}

module.exports = {
    getUserProgressTimestamp,
    touchUserProgressTimestamp,
};

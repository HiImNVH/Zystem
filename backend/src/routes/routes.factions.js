// backend/src/routes/routes.factions.js
// Faction toi gian: tao, tham gia, roi khoi, xem thanh vien.
// Moi nhan vat chi thuoc ve toi da MOT faction tai mot thoi diem.

const express = require('express');
const factionsRouter = express.Router();
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const { dbPool } = require('../repositories/repositories.database');
const { logPlayerEvent } = require('../services/services.playerEvents');

/**
 * @route   GET /api/factions
 * @desc    Lay danh sach tat ca faction kem so luong thanh vien, de chon tham gia
 */
factionsRouter.get('/', verifyToken, async (req, res, next) => {
    try {
        const result = await dbPool.query(`
            SELECT f.id, f.name, f.leader_player_id, f.created_at,
                   lp.character_name AS leader_name,
                   COUNT(p.id) AS member_count
            FROM factions f
            LEFT JOIN players lp ON lp.id = f.leader_player_id
            LEFT JOIN players p ON p.faction_id = f.id
            GROUP BY f.id, lp.character_name
            ORDER BY member_count DESC, f.created_at ASC;
        `);
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/factions/player/:playerId
 * @desc    Lay faction hien tai cua nhan vat (neu co) kem danh sach thanh vien
 */
factionsRouter.get('/player/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const playerResult = await dbPool.query(`SELECT faction_id FROM players WHERE id = $1;`, [playerId]);
        const factionId = playerResult.rows[0]?.faction_id;

        if (!factionId) {
            return res.json({ success: true, data: null });
        }

        const factionResult = await dbPool.query(
            `SELECT id, name, leader_player_id, created_at FROM factions WHERE id = $1;`,
            [factionId]
        );
        const faction = factionResult.rows[0];
        if (!faction) return res.json({ success: true, data: null });

        const membersResult = await dbPool.query(`
            SELECT id, character_name, player_level
            FROM players
            WHERE faction_id = $1
            ORDER BY character_name ASC;
        `, [factionId]);

        return res.json({ success: true, data: { ...faction, members: membersResult.rows } });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/factions
 * @desc    Tao faction moi — nguoi tao tro thanh leader va thanh vien dau tien
 */
factionsRouter.post('/', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, name } = req.body;
    const cleanName = String(name || '').trim();

    if (!playerId || !cleanName) {
        return res.status(400).json({ success: false, message: 'Missing playerId or faction name.' });
    }
    if (cleanName.length > 50) {
        return res.status(400).json({ success: false, message: 'Faction name is too long.' });
    }

    try {
        const playerResult = await dbPool.query(`SELECT faction_id FROM players WHERE id = $1;`, [playerId]);
        if (playerResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }
        if (playerResult.rows[0].faction_id) {
            return res.status(400).json({ success: false, message: 'You are already in a faction. Leave it first.' });
        }

        const factionResult = await dbPool.query(`
            INSERT INTO factions (name, leader_player_id)
            VALUES ($1, $2)
            RETURNING id, name, leader_player_id, created_at;
        `, [cleanName, playerId]);
        const faction = factionResult.rows[0];

        await dbPool.query(`UPDATE players SET faction_id = $1 WHERE id = $2;`, [faction.id, playerId]);
        await logPlayerEvent(playerId, {
            eventType: 'FACTION',
            source: 'Faction',
            title: 'Faction created',
            message: `You founded the faction "${faction.name}".`,
        });

        return res.status(201).json({ success: true, data: faction });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ success: false, message: 'This faction name is already taken.' });
        }
        next(error);
    }
});

/**
 * @route   POST /api/factions/join
 * @desc    Tham gia mot faction co san
 */
factionsRouter.post('/join', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, factionId } = req.body;

    if (!playerId || !factionId) {
        return res.status(400).json({ success: false, message: 'Missing playerId or factionId.' });
    }

    try {
        const playerResult = await dbPool.query(`SELECT faction_id FROM players WHERE id = $1;`, [playerId]);
        if (playerResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }
        if (playerResult.rows[0].faction_id) {
            return res.status(400).json({ success: false, message: 'You are already in a faction. Leave it first.' });
        }

        const factionResult = await dbPool.query(`SELECT id, name FROM factions WHERE id = $1;`, [factionId]);
        if (factionResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Faction not found.' });
        }

        await dbPool.query(`UPDATE players SET faction_id = $1 WHERE id = $2;`, [factionId, playerId]);
        await logPlayerEvent(playerId, {
            eventType: 'FACTION',
            source: 'Faction',
            title: 'Joined faction',
            message: `You joined the faction "${factionResult.rows[0].name}".`,
        });

        return res.json({ success: true, data: factionResult.rows[0] });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/factions/leave
 * @desc    Roi khoi faction hien tai. Neu la leader va con thanh vien khac,
 *          chuyen quyen cho thanh vien con lai; neu khong con ai, xoa faction.
 */
factionsRouter.post('/leave', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.body;
    if (!playerId) {
        return res.status(400).json({ success: false, message: 'Missing playerId.' });
    }

    try {
        const playerResult = await dbPool.query(`SELECT faction_id FROM players WHERE id = $1;`, [playerId]);
        const factionId = playerResult.rows[0]?.faction_id;
        if (!factionId) {
            return res.status(400).json({ success: false, message: 'You are not in a faction.' });
        }

        await dbPool.query(`UPDATE players SET faction_id = NULL WHERE id = $1;`, [playerId]);

        const remainingResult = await dbPool.query(`
            SELECT id FROM players WHERE faction_id = $1 ORDER BY created_at ASC LIMIT 1;
        `, [factionId]);

        if (remainingResult.rows.length === 0) {
            await dbPool.query(`DELETE FROM factions WHERE id = $1;`, [factionId]);
        } else {
            const factionResult = await dbPool.query(`SELECT leader_player_id FROM factions WHERE id = $1;`, [factionId]);
            if (factionResult.rows[0]?.leader_player_id === playerId) {
                await dbPool.query(
                    `UPDATE factions SET leader_player_id = $1 WHERE id = $2;`,
                    [remainingResult.rows[0].id, factionId]
                );
            }
        }

        await logPlayerEvent(playerId, {
            eventType: 'FACTION',
            source: 'Faction',
            title: 'Left faction',
            message: 'You have left your faction.',
        });

        return res.json({ success: true });
    } catch (error) {
        next(error);
    }
});

module.exports = factionsRouter;

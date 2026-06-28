// backend/src/routes/routes.achievements.js
// Version: 1.0
// Endpoint quan ly thanh tuu: lay danh sach, cap nhat tien do, claim SP, trang bi title

const express = require('express');
const achievementsRouter = express.Router();
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const { dbPool } = require('../repositories/repositories.database');
const characterRepository = require('../repositories/repositories.character');

/**
 * @route   GET /api/achievements
 * @desc    Lay toan bo danh sach thanh tuu trong game
 */
achievementsRouter.get('/', verifyToken, async (req, res, next) => {
    try {
        const result = await dbPool.query(
            `SELECT * FROM achievements ORDER BY sp_bonus ASC;`
        );
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/achievements/player/:playerId
 * @desc    Lay tien do thanh tuu cua nhan vat
 */
achievementsRouter.get('/player/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const result = await dbPool.query(`
            SELECT
                a.code, a.display_name, a.description, a.condition_type,
                a.condition_value, a.sp_bonus,
                a.title_str_bonus, a.title_agi_bonus, a.title_dex_bonus,
                a.title_vit_bonus, a.title_int_bonus, a.title_chr_bonus,
                pa.id as player_achievement_id,
                pa.current_progress, pa.is_completed, pa.completed_at,
                pa.sp_claimed
            FROM achievements a
            LEFT JOIN player_achievements pa
                ON pa.achievement_id = a.id AND pa.player_id = $1
            ORDER BY a.sp_bonus DESC;
        `, [playerId]);

        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/achievements/claim-sp
 * @body    { playerId, playerAchievementId }
 * @desc    Claim SP bonus tu thanh tuu da hoan thanh
 */
achievementsRouter.post('/claim-sp', verifyToken, async (req, res, next) => {
    const { playerId, playerAchievementId } = req.body;

    if (!playerId || !playerAchievementId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va playerAchievementId.'
        });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Lay thong tin thanh tuu, dam bao da hoan thanh va chua nhan SP
        const achResult = await client.query(`
            SELECT pa.*, a.sp_bonus
            FROM player_achievements pa
            JOIN achievements a ON pa.achievement_id = a.id
            WHERE pa.id = $1 AND pa.player_id = $2
            FOR UPDATE;
        `, [playerAchievementId, playerId]);

        if (achResult.rows.length === 0) {
            throw new Error('Khong tim thay ban ghi thanh tuu cua nguoi choi nay.');
        }

        const playerAch = achResult.rows[0];

        if (!playerAch.is_completed) {
            throw new Error('Thanh tuu nay chua hoan thanh. Chua the nhan SP.');
        }

        if (playerAch.sp_claimed) {
            throw new Error('SP cua thanh tuu nay da duoc nhan roi.');
        }

        // Danh dau da nhan SP
        await client.query(
            `UPDATE player_achievements SET sp_claimed = TRUE, sp_claimed_at = NOW() WHERE id = $1;`,
            [playerAchievementId]
        );

        // Cong SP vao nhan vat
        await client.query(
            `UPDATE players SET skill_points = skill_points + $1 WHERE id = $2;`,
            [playerAch.sp_bonus, playerId]
        );

        await client.query('COMMIT');
        console.log(`[SUCCESS] Player ${playerId} claim ${playerAch.sp_bonus} SP tu thanh tuu.`);

        return res.json({
            success: true,
            message: `Nhan thanh cong ${playerAch.sp_bonus} SP!`,
            data: { sp_claimed: playerAch.sp_bonus }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi khi claim SP thanh tuu:', error.message);
        return res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
});

/**
 * @route   POST /api/achievements/equip-title
 * @body    { playerId, playerAchievementId }
 * @desc    Trang bi danh hieu (title) — nguoi choi chi mac duoc 1 title tai 1 thoi diem
 *          Title cu mat hieu luc ngay, title moi can 15p de ap dung stats
 */
achievementsRouter.post('/equip-title', verifyToken, async (req, res, next) => {
    const { playerId, playerAchievementId } = req.body;

    if (!playerId || !playerAchievementId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va playerAchievementId.'
        });
    }

    try {
        // Kiem tra thanh tuu co hop le va da hoan thanh chua
        const achResult = await dbPool.query(`
            SELECT pa.id, pa.is_completed, a.display_name
            FROM player_achievements pa
            JOIN achievements a ON pa.achievement_id = a.id
            WHERE pa.id = $1 AND pa.player_id = $2;
        `, [playerAchievementId, playerId]);

        if (achResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay thanh tuu.' });
        }

        if (!achResult.rows[0].is_completed) {
            return res.status(400).json({ success: false, message: 'Chi co the trang bi title tu thanh tuu da hoan thanh.' });
        }

        // Cap nhat equipped_title_id cua nhan vat
        await dbPool.query(
            `UPDATE players SET equipped_title_id = $1, updated_at = NOW() WHERE id = $2;`,
            [playerAchievementId, playerId]
        );

        return res.json({
            success: true,
            message: `Da trang bi danh hieu: ${achResult.rows[0].display_name}. Stats se ap dung sau 15 phut.`,
            data: { equipped_title_id: playerAchievementId }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/achievements/update-progress
 * @body    { playerId, conditionType, incrementAmount }
 * @desc    Cap nhat tien do thanh tuu (goi khi kill zombie, gather resource, etc.)
 */
achievementsRouter.post('/update-progress', verifyToken, async (req, res, next) => {
    const { playerId, conditionType, incrementAmount } = req.body;

    if (!playerId || !conditionType) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va conditionType.'
        });
    }

    const increment = incrementAmount || 1;

    try {
        // Tim tat ca thanh tuu co cung dieu kien chua hoan thanh
        const achList = await dbPool.query(
            `SELECT id, condition_value FROM achievements WHERE condition_type = $1;`,
            [conditionType]
        );

        const completedAchievements = [];

        for (const ach of achList.rows) {
            // Upsert tien do
            const upsertResult = await dbPool.query(`
                INSERT INTO player_achievements (player_id, achievement_id, current_progress)
                VALUES ($1, $2, $3)
                ON CONFLICT (player_id, achievement_id) DO UPDATE
                    SET current_progress = LEAST(
                        player_achievements.current_progress + $3,
                        (SELECT condition_value FROM achievements WHERE id = $2)
                    )
                RETURNING *;
            `, [playerId, ach.id, increment]);

            const pa = upsertResult.rows[0];

            // Kiem tra neu dat dieu kien hoan thanh
            if (!pa.is_completed && pa.current_progress >= ach.condition_value) {
                await dbPool.query(`
                    UPDATE player_achievements
                    SET is_completed = TRUE, completed_at = NOW()
                    WHERE id = $1;
                `, [pa.id]);

                completedAchievements.push(pa.id);
                console.log(`[SUCCESS] Player ${playerId} hoan thanh thanh tuu achievement_id=${ach.id}!`);
            }
        }

        return res.json({
            success: true,
            data: { newly_completed: completedAchievements }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = achievementsRouter;

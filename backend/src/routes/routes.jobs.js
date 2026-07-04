// backend/src/routes/routes.jobs.js
// Endpoint quan ly nghe nghiep: lay danh sach, lay nghe cua nhan vat, mo khoa nghe

const express = require('express');
const jobsRouter = express.Router();
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const { dbPool } = require('../repositories/repositories.database');

/**
 * @route   GET /api/jobs
 * @desc    Lay danh sach tat ca nghe co the hoc
 */
jobsRouter.get('/', verifyToken, async (req, res, next) => {
    try {
        const result = await dbPool.query(
            `SELECT * FROM jobs_seed WHERE is_available = TRUE ORDER BY id ASC;`
        );
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/jobs/player/:playerId
 * @desc    Lay danh sach nghe dang hoc va cap do cua nhan vat
 */
jobsRouter.get('/player/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;

    try {
        const result = await dbPool.query(`
            SELECT
                js.id, js.code, js.display_name, js.category,
                js.str_per_lv, js.agi_per_lv, js.dex_per_lv,
                js.vit_per_lv, js.int_per_lv, js.chr_per_lv,
                COALESCE(pj.job_level, 0) AS job_level,
                COALESCE(pj.current_exp, 0) AS current_exp,
                COALESCE(pj.sp_invested, 0) AS sp_invested,
                pj.unlocked_at,
                -- Tinh tong stat da nhan tu nghe nay
                ROUND(COALESCE(pj.job_level, 0) * js.str_per_lv, 2) AS total_str_bonus,
                ROUND(COALESCE(pj.job_level, 0) * js.agi_per_lv, 2) AS total_agi_bonus,
                ROUND(COALESCE(pj.job_level, 0) * js.dex_per_lv, 2) AS total_dex_bonus,
                ROUND(COALESCE(pj.job_level, 0) * js.vit_per_lv, 2) AS total_vit_bonus,
                ROUND(COALESCE(pj.job_level, 0) * js.int_per_lv, 2) AS total_int_bonus,
                ROUND(COALESCE(pj.job_level, 0) * js.chr_per_lv, 2) AS total_chr_bonus
            FROM jobs_seed js
            LEFT JOIN player_jobs pj
                ON pj.job_id = js.id AND pj.player_id = $1
            WHERE js.is_available = TRUE
            ORDER BY js.id ASC;
        `, [playerId]);

        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/jobs/unlock
 * @body    { playerId, jobCode }
 * @desc    Mo khoa mot nghe (kiem tra SP con du khong)
 */
jobsRouter.post('/unlock', verifyToken, async (req, res, next) => {
    const { playerId, jobCode } = req.body;

    if (!playerId || !jobCode) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va jobCode.'
        });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Lay thong tin nghe
        const jobResult = await client.query(
            `SELECT * FROM jobs_seed WHERE code = $1 AND is_available = TRUE;`,
            [jobCode.toLowerCase()]
        );

        if (jobResult.rows.length === 0) {
            throw new Error(`Nghe khong ton tai hoac chua duoc mo khoa: ${jobCode}`);
        }

        const job = jobResult.rows[0];

        // Kiem tra nghe da duoc mo chua
        const existCheck = await client.query(
            `SELECT id FROM player_jobs WHERE player_id = $1 AND job_id = $2;`,
            [playerId, job.id]
        );

        if (existCheck.rows.length > 0) {
            throw new Error(`Nghe ${job.display_name} da duoc mo khoa roi.`);
        }

        // Kiem tra SP (moi nghe can it nhat 1 SP de mo)
        const spCost = job.sp_cost_per_lv || 1;
        const playerResult = await client.query(
            `SELECT skill_points, player_level FROM players WHERE id = $1 FOR UPDATE;`,
            [playerId]
        );

        if (playerResult.rows.length === 0) throw new Error('Khong tim thay nhan vat.');
        const player = playerResult.rows[0];

        if (player.skill_points < spCost) {
            throw new Error(`Khong du SP. Can ${spCost} SP, hien co ${player.skill_points} SP.`);
        }

        // Tru SP va them ban ghi nghe moi
        await client.query(
            `UPDATE players SET skill_points = skill_points - $1 WHERE id = $2;`,
            [spCost, playerId]
        );

        const newJobRecord = await client.query(`
            INSERT INTO player_jobs (player_id, job_id, job_level, current_exp, sp_invested)
            VALUES ($1, $2, 0, 0, $3)
            RETURNING *;
        `, [playerId, job.id, spCost]);

        await client.query('COMMIT');
        console.log(`[SUCCESS] Player ${playerId} mo khoa nghe: ${job.display_name}`);

        return res.status(201).json({
            success: true,
            message: `Da mo khoa nghe: ${job.display_name}!`,
            data: newJobRecord.rows[0]
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi khi mo khoa nghe:', error.message);
        return res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
});

/**
 * @route   POST /api/jobs/forget
 * @body    { playerId, jobCode }
 * @desc    Quen nghe — hoan lai 100% SP, xoa ban ghi player_jobs
 */
jobsRouter.post('/forget', verifyToken, async (req, res, next) => {
    const { playerId, jobCode } = req.body;

    if (!playerId || !jobCode) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va jobCode.'
        });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Lay ban ghi nghe hien tai cua player
        const jobResult = await client.query(`
            SELECT pj.*, js.display_name, js.sp_cost_per_lv
            FROM player_jobs pj
            JOIN jobs_seed js ON pj.job_id = js.id
            WHERE pj.player_id = $1 AND js.code = $2
            FOR UPDATE;
        `, [playerId, jobCode.toLowerCase()]);

        if (jobResult.rows.length === 0) {
            throw new Error(`Nhan vat chua hoc nghe: ${jobCode}`);
        }

        const playerJob = jobResult.rows[0];

        // Tinh SP hoan lai: toan bo SP da dau tu vao nghe nay
        const spToRefund = playerJob.sp_invested || 0;

        // Xoa ban ghi nghe
        await client.query(
            `DELETE FROM player_jobs WHERE id = $1;`,
            [playerJob.id]
        );

        // Hoan lai SP
        if (spToRefund > 0) {
            await client.query(
                `UPDATE players SET skill_points = skill_points + $1 WHERE id = $2;`,
                [spToRefund, playerId]
            );
        }

        await client.query('COMMIT');
        console.log(`[INFO] Player ${playerId} quen nghe ${jobCode}, hoan lai ${spToRefund} SP`);

        return res.json({
            success: true,
            message: `Da quen nghe: ${playerJob.display_name}. Hoan lai ${spToRefund} SP.`,
            data: { sp_refunded: spToRefund }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi khi quen nghe:', error.message);
        return res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
});

module.exports = jobsRouter;

/**
 * @route   POST /api/jobs/invest-sp
 * @body    { playerId, jobCode, spAmount }
 * @desc    Dau tu SP de nang cap nghe thu cong (ngoai viec train EXP tu hanh dong)
 *          1 SP = 1 cap nghe, bi chan cung boi player_level
 * @access  Protected
 */
jobsRouter.post('/invest-sp', verifyToken, async (req, res, next) => {
    const { playerId, jobCode, spAmount } = req.body;

    if (!playerId || !jobCode || !spAmount) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId, jobCode, spAmount.'
        });
    }

    const investAmount = parseInt(spAmount);
    if (isNaN(investAmount) || investAmount < 1) {
        return res.status(400).json({
            success: false,
            message: 'spAmount phai la so nguyen duong.'
        });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Lay thong tin player (lock)
        const playerResult = await client.query(
            `SELECT id, player_level, skill_points FROM players WHERE id = $1 FOR UPDATE;`,
            [playerId]
        );

        if (playerResult.rows.length === 0) throw new Error('Khong tim thay nhan vat.');

        const player = playerResult.rows[0];

        // Kiem tra quyen so huu
        const ownerResult = await client.query(
            `SELECT account_id FROM players WHERE id = $1;`, [playerId]
        );
        if (ownerResult.rows[0].account_id !== req.accountId) {
            throw new Error('Khong co quyen dau tu SP cho nhan vat nay.');
        }

        if (player.skill_points < investAmount) {
            throw new Error(`Khong du SP. Can ${investAmount} SP, hien co ${player.skill_points} SP.`);
        }

        // Lay thong tin nghe
        const jobResult = await client.query(
            `SELECT pj.*, js.code, js.display_name, js.is_available
             FROM player_jobs pj
             JOIN jobs_seed js ON pj.job_id = js.id
             WHERE pj.player_id = $1 AND js.code = $2
             FOR UPDATE;`,
            [playerId, jobCode.toLowerCase()]
        );

        if (jobResult.rows.length === 0) {
            throw new Error(`Chua mo khoa nghe: ${jobCode}. Mo khoa truoc khi dau tu SP.`);
        }

        const playerJob = jobResult.rows[0];
        const currentJobLevel = playerJob.job_level;

        // Kiem tra gioi han cung: job_level <= player_level
        if (currentJobLevel >= player.player_level) {
            throw new Error(
                `Cap nghe ${jobCode} (${currentJobLevel}) da dat gioi han Player Level (${player.player_level}). ` +
                `Can nang Player Level len ${currentJobLevel + 1} truoc.`
            );
        }

        // Tinh so cap co the nang (bi gioi han boi player_level va SP con lai)
        const maxPossibleLevels = Math.min(
            investAmount,
            player.player_level - currentJobLevel
        );

        if (maxPossibleLevels <= 0) {
            throw new Error('Khong the nang cap nghe them. Kiem tra lai Player Level va SP.');
        }

        const newJobLevel = currentJobLevel + maxPossibleLevels;
        const actualSpSpent = maxPossibleLevels; // 1 SP = 1 cap

        // Tru SP va nang cap nghe
        await client.query(
            `UPDATE players SET skill_points = skill_points - $1 WHERE id = $2;`,
            [actualSpSpent, playerId]
        );

        await client.query(
            `UPDATE player_jobs SET job_level = $1, sp_invested = sp_invested + $2
             WHERE id = $3;`,
            [newJobLevel, actualSpSpent, playerJob.id]
        );

        await client.query('COMMIT');

        console.log(`[SUCCESS] Player ${playerId} dau tu ${actualSpSpent} SP vao nghe ${jobCode}: cap ${currentJobLevel} -> ${newJobLevel}`);

        return res.json({
            success: true,
            message: `Nang cap ${jobCode} len cap ${newJobLevel}! Dau tu ${actualSpSpent} SP.`,
            data: {
                job_code:       jobCode,
                old_level:      currentJobLevel,
                new_level:      newJobLevel,
                sp_spent:       actualSpSpent,
                sp_remaining:   player.skill_points - actualSpSpent,
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi khi invest SP:', error.message);
        return res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
});

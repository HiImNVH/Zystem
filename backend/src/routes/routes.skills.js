// backend/src/routes/routes.skills.js
// Endpoints cho skill tree: tra ve branch theo Data Design

const express = require('express');
const skillsRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');
const {
    ensurePlayerDefaultJobs,
    autoUnlockFreeSkills,
    getRefundCountToday,
    MAX_REFUNDS_PER_DAY
} = require('../repositories/repositories.skillsSeed');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

/**
 * @route   GET /api/skills/job/:jobCode
 * @desc    Lay toan bo skill cua mot nghe
 * @access  Protected
 */
skillsRouter.get('/job/:jobCode', verifyToken, async (req, res, next) => {
    const { jobCode } = req.params;
    try {
        const result = await dbPool.query(
            `SELECT * FROM job_skills WHERE job_code = $1 ORDER BY tier ASC, lv_required ASC;`,
            [jobCode.toLowerCase()]
        );
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/skills/player/:playerId
 * @desc    Lay trang thai tat ca skill cua player (co nghe nao thi lay nghe do)
 * @access  Protected
 */
skillsRouter.get('/player/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;
    try {
        await ensurePlayerDefaultJobs(playerId);
        await autoUnlockFreeSkills(playerId);

        const result = await dbPool.query(`
            SELECT
                js.id, js.job_code, js.branch, js.skill_code, js.skill_name,
                js.lv_required, js.sp_cost, js.tier,
                js.effect_type, js.effect_val, js.description,
                js.prerequisite_skill_code, js.row_group,
                pj.job_level,
                COALESCE(ps.is_unlocked, FALSE) AS is_unlocked,
                ps.unlocked_at
            FROM job_skills js
            JOIN jobs_seed jseed ON js.job_code = jseed.code
            JOIN player_jobs pj ON pj.job_id = jseed.id AND pj.player_id = $1
            LEFT JOIN player_skills ps ON ps.skill_id = js.id AND ps.player_id = $1
            ORDER BY js.job_code ASC, js.tier ASC, js.lv_required ASC;
        `, [playerId]);

        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/skills/unlock
 * @body    { playerId, skillCode }
 * @desc    Mo khoa skill bang SP — kiem tra lv_required, prerequisite, SP du
 * @access  Protected
 */
skillsRouter.post('/unlock', verifyToken, async (req, res, next) => {
    const { playerId, skillCode } = req.body;

    if (!playerId || !skillCode) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, skillCode.' });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Lay thong tin skill
        const skillResult = await client.query(
            `SELECT * FROM job_skills WHERE skill_code = $1;`,
            [skillCode]
        );
        if (skillResult.rows.length === 0) {
            throw new Error(`Skill does not exist: ${skillCode}`);
        }
        const skill = skillResult.rows[0];

        if (parseInt(skill.sp_cost) === 0) {
            throw new Error('AUTO skills are learned automatically when the job reaches the required level.');
        }

        // Kiem tra player co nghe do khong
        await ensurePlayerDefaultJobs(playerId, client);
        await autoUnlockFreeSkills(playerId, client);
        const jobResult = await client.query(`
            SELECT pj.job_level FROM player_jobs pj
            JOIN jobs_seed js ON pj.job_id = js.id
            WHERE pj.player_id = $1 AND js.code = $2;
        `, [playerId, skill.job_code]);

        if (jobResult.rows.length === 0) {
            throw new Error(`Job ${skill.job_code} is not unlocked. Unlock the job first.`);
        }

        const jobLevel = jobResult.rows[0].job_level;

        // Kiem tra level requirement
        if (jobLevel < skill.lv_required) {
            throw new Error(
                `Job level ${skill.lv_required} is required to unlock this skill. ` +
                `Current ${skill.job_code} level: ${jobLevel}.`
            );
        }

        // Kiem tra da mo chua
        const existCheck = await client.query(
            `SELECT is_unlocked FROM player_skills WHERE player_id = $1 AND skill_id = $2;`,
            [playerId, skill.id]
        );
        if (existCheck.rows.length > 0 && existCheck.rows[0].is_unlocked) {
            throw new Error('This skill is already unlocked.');
        }

        // Kiem tra prerequisite
        if (skill.prerequisite_skill_code) {
            const preResult = await client.query(`
                SELECT ps.is_unlocked FROM player_skills ps
                JOIN job_skills js ON ps.skill_id = js.id
                WHERE ps.player_id = $1 AND js.skill_code = $2;
            `, [playerId, skill.prerequisite_skill_code]);

            if (preResult.rows.length === 0 || !preResult.rows[0].is_unlocked) {
                throw new Error(`Prerequisite skill must be unlocked first: ${skill.prerequisite_skill_code}`);
            }
        }

        // Kiem tra SP (skill lv1 free)
        if (skill.sp_cost > 0) {
            const playerResult = await client.query(
                `SELECT skill_points FROM players WHERE id = $1 FOR UPDATE;`,
                [playerId]
            );
            if (playerResult.rows[0].skill_points < skill.sp_cost) {
                throw new Error(
                    `Not enough SP. Required: ${skill.sp_cost} SP, current: ${playerResult.rows[0].skill_points} SP.`
                );
            }
            await client.query(
                `UPDATE players SET skill_points = skill_points - $1 WHERE id = $2;`,
                [skill.sp_cost, playerId]
            );
        }

        // Mo khoa skill
        await client.query(`
            INSERT INTO player_skills (player_id, skill_id, is_unlocked, unlocked_at)
            VALUES ($1, $2, TRUE, NOW())
            ON CONFLICT (player_id, skill_id) DO UPDATE
            SET is_unlocked = TRUE, unlocked_at = NOW();
        `, [playerId, skill.id]);

        await client.query('COMMIT');
        console.log(`[SUCCESS] Player ${playerId} mo khoa skill: ${skillCode} (${skill.sp_cost} SP)`);

        return res.json({
            success: true,
            message: `Unlocked skill: ${skill.skill_name}!`,
            data: { skill_code: skillCode, sp_spent: skill.sp_cost }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        return res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
});

/**
 * @route   POST /api/skills/refund
 * @body    { playerId, skillCode }
 * @desc    Thu hoi diem skill — gioi han MAX_REFUNDS_PER_DAY lan/ngay
 *          Thu hoi cung xoa cac skill con chau (dependent skills)
 * @access  Protected
 */
skillsRouter.post('/refund', verifyToken, async (req, res, next) => {
    const { playerId, skillCode } = req.body;

    if (!playerId || !skillCode) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, skillCode.' });
    }

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Kiem tra gioi han refund hom nay
        const refundToday = await getRefundCountToday(playerId);
        if (refundToday >= MAX_REFUNDS_PER_DAY) {
            throw new Error(
                `No refunds left today (${MAX_REFUNDS_PER_DAY} per day). Try again tomorrow.`
            );
        }

        // Lay thong tin skill
        const skillResult = await client.query(
            `SELECT * FROM job_skills WHERE skill_code = $1;`,
            [skillCode]
        );
        if (skillResult.rows.length === 0) throw new Error(`Skill does not exist: ${skillCode}`);
        const skill = skillResult.rows[0];

        // Skill lv1 free khong the thu hoi
        if (skill.sp_cost === 0) {
            throw new Error('Starting skills (free) cannot be refunded.');
        }

        // Kiem tra da mo chua
        const unlockedCheck = await client.query(
            `SELECT ps.id FROM player_skills ps WHERE ps.player_id = $1 AND ps.skill_id = $2 AND ps.is_unlocked = TRUE;`,
            [playerId, skill.id]
        );
        if (unlockedCheck.rows.length === 0) {
            throw new Error('This skill is not unlocked.');
        }

        // Tim tat ca skill con chau can xoa (BFS)
        const allSkillsInJob = await client.query(
            `SELECT skill_code, id, sp_cost, prerequisite_skill_code FROM job_skills WHERE job_code = $1;`,
            [skill.job_code]
        );

        const skillMap = {};
        allSkillsInJob.rows.forEach(s => { skillMap[s.skill_code] = s; });

        // Lay danh sach con chau cua skill can thu hoi
        const toRevoke = [skill];
        const queue = [skillCode];
        while (queue.length > 0) {
            const current = queue.shift();
            allSkillsInJob.rows.forEach(s => {
                if (s.prerequisite_skill_code === current && !toRevoke.find(r => r.skill_code === s.skill_code)) {
                    toRevoke.push(s);
                    queue.push(s.skill_code);
                }
            });
        }

        // Tinh tong SP hoan lai
        let totalSpRefund = 0;
        for (const s of toRevoke) {
            totalSpRefund += parseInt(s.sp_cost) || 0;
            await client.query(
                `UPDATE player_skills SET is_unlocked = FALSE WHERE player_id = $1 AND skill_id = $2;`,
                [playerId, s.id]
            );
        }

        // Hoan SP
        await client.query(
            `UPDATE players SET skill_points = skill_points + $1 WHERE id = $2;`,
            [totalSpRefund, playerId]
        );

        // Ghi log thu hoi
        await client.query(
            `INSERT INTO skill_refund_log (player_id, skill_id, sp_refunded) VALUES ($1, $2, $3);`,
            [playerId, skill.id, totalSpRefund]
        );

        await client.query('COMMIT');

        const remainingRefunds = MAX_REFUNDS_PER_DAY - refundToday - 1;
        console.log(`[SUCCESS] Player ${playerId} thu hoi skill ${skillCode}, hoan ${totalSpRefund} SP`);

        return res.json({
            success: true,
            message: `Refund successful! Refunded ${totalSpRefund} SP. ${remainingRefunds} refunds left today.`,
            data: {
                revoked_skills:    toRevoke.map(s => s.skill_code),
                sp_refunded:       totalSpRefund,
                refunds_remaining: remainingRefunds
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        return res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
});

/**
 * @route   GET /api/skills/refund-status/:playerId
 * @desc    Lay so lan thu hoi con lai hom nay
 * @access  Protected
 */
skillsRouter.get('/refund-status/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;
    try {
        const usedToday = await getRefundCountToday(playerId);
        return res.json({
            success: true,
            data: {
                used_today:        usedToday,
                remaining_today:   MAX_REFUNDS_PER_DAY - usedToday,
                max_per_day:       MAX_REFUNDS_PER_DAY,
                resets_at:         'Midnight (00:00 server time)'
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = skillsRouter;

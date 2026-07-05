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
 * @body    { playerId, actionType, zoneCode, durationSeconds, poiId, gameplayTag, dungeonMode }
 */
actionQueueRouter.post('/register', verifyToken, actionLimiter, async (req, res, next) => {
    const { playerId, actionType, zoneCode, durationSeconds, poiId, gameplayTag, dungeonMode } = req.body;

    if (!playerId || !actionType || !durationSeconds) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameters: playerId, actionType, durationSeconds.'
        });
    }

    const duration = parseInt(durationSeconds);
    if (isNaN(duration) || duration <= 0) {
        return res.status(400).json({
            success: false,
            message: 'durationSeconds must be a positive integer.'
        });
    }

    try {
        // Kiem tra player thuoc account dang dang nhap
        const ownerCheck = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (ownerCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        if (ownerCheck.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'You do not have permission to register actions for this character.' });
        }

        const playerResult = await dbPool.query(
            `SELECT base_agi, current_fatigue FROM players WHERE id = $1;`,
            [playerId]
        );
        const agiStat = playerResult.rows[0]?.base_agi || 10;
        const currentFatigue = playerResult.rows[0]?.current_fatigue || 0;

        const zoneResult = zoneCode
            ? await dbPool.query(`SELECT id, zone_type FROM zones WHERE code = $1 AND is_active = TRUE;`, [zoneCode])
            : { rows: [{ zone_type: 'safe' }] };
        if (zoneCode && zoneResult.rows.length === 0) {
            return res.status(400).json({ success: false, message: `Zone does not exist or is locked: ${zoneCode}` });
        }

        const zoneType = zoneResult.rows[0]?.zone_type || 'safe';
        let tagMultipliers = null;
        let resolvedActionType = actionType;
        if (poiId && gameplayTag) {
            const tagResult = await dbPool.query(`
                SELECT pgt.action_type, pgt.energy_cost_mult, pgt.fatigue_mult
                FROM poi_gameplay_tags pgt
                JOIN world_pois wp ON wp.id = pgt.poi_id
                WHERE pgt.poi_id = $1
                  AND pgt.tag_type = $2
                  AND wp.zone_id = $3;
            `, [poiId, gameplayTag.toUpperCase(), zoneResult.rows[0].id]);

            if (tagResult.rows.length === 0) {
                return res.status(400).json({ success: false, message: 'Gameplay tag does not exist for this POI.' });
            }

            resolvedActionType = tagResult.rows[0].action_type;
            tagMultipliers = {
                energyCostMult: tagResult.rows[0].energy_cost_mult,
                fatigueMult: tagResult.rows[0].fatigue_mult,
            };
            if (gameplayTag.toUpperCase() === 'DUNGEON' && dungeonMode?.toUpperCase() === 'HARD') {
                tagMultipliers.energyCostMult = parseFloat(tagMultipliers.energyCostMult) * 1.25;
                tagMultipliers.fatigueMult = parseFloat(tagMultipliers.fatigueMult) * 1.25;
            }
        }

        const actualDuration = actionQueueService.calculateActualDurationWithFatigue(duration, agiStat, currentFatigue);
        const resourceCost = actionQueueService.calculateActionResourceCost(resolvedActionType, duration, zoneType, tagMultipliers);

        const result = await actionQueueRepository.insertActionSlot(
            playerId,
            zoneCode,
            resolvedActionType,
            duration,
            actualDuration,
            resourceCost,
            {
                poiId,
                gameplayTag: gameplayTag?.toUpperCase(),
                dungeonMode: dungeonMode?.toUpperCase() || 'NORMAL',
            }
        );

        if (!result) {
            return res.status(500).json({ success: false, message: 'Could not register action.' });
        }

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        return res.status(201).json({
            success: true,
            message: `Action ${resolvedActionType} registered successfully!`,
            data: {
                ...result,
                resource_cost: resourceCost,
                note: `AGI=${agiStat}, fatigue=${currentFatigue}: ${duration}s -> ${actualDuration}s`
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
            message: 'Missing parameters: playerId and actionId.'
        });
    }

    try {
        // Kiem tra quyen so huu nhan vat
        const ownerCheck = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (ownerCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        if (ownerCheck.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'You do not have permission to claim this action.' });
        }

        // Claim action — tra ve ket qua co zone data
        const claimedAction = await actionQueueRepository.claimActionSlot(actionId, playerId);

        if (!claimedAction) {
            return res.status(500).json({ success: false, message: 'Error while claiming action.' });
        }

        if (claimedAction.error) {
            return res.status(400).json({ success: false, message: claimedAction.error });
        }

        // Lazy Load Logic: tinh EXP + Infection + Loot
        const rewards = await actionQueueService.processClaimedAction(playerId, claimedAction);

        return res.json({
            success: true,
            message: 'Action claimed successfully!',
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
            message: 'Missing parameters: playerId and actionId.'
        });
    }

    try {
        const ownerCheck = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (ownerCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        if (ownerCheck.rows[0].account_id !== req.accountId) {
            return res.status(403).json({ success: false, message: 'You do not have permission to cancel this action.' });
        }

        const result = await actionQueueRepository.cancelActionSlot(actionId, playerId);

        if (!result) {
            return res.status(500).json({ success: false, message: 'Error while canceling action.' });
        }

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        return res.json({ success: true, message: 'Action canceled successfully!', data: result });
    } catch (error) {
        next(error);
    }
});

module.exports = actionQueueRouter;

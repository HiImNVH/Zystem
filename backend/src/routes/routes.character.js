// backend/src/routes/routes.character.js
//           GET /account/me tra ve nhan vat duy nhat (khong phai mang)
//           Kiem tra da co nhan vat truoc khi cho tao

const express = require('express');
const characterRouter = express.Router();
const characterRepository = require('../repositories/repositories.character');
const characterService = require('../services/services.character');
const { playerDataDb } = require('../repositories/repositories.databaseDomains');
const dbPool = playerDataDb;
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

const SAFE_HOUSE_REST_CONFIG = {
    homeLevel: 1,
    bedLevel: 1,
    baseEnergyPerMinute: 6,
};

function calculateSafeHouseRestGain(elapsedSeconds) {
    const safeElapsedSeconds = Math.max(5, Math.min(300, parseInt(elapsedSeconds) || 10));
    const efficiency = 1 + (SAFE_HOUSE_REST_CONFIG.homeLevel - 1) * 0.08 + (SAFE_HOUSE_REST_CONFIG.bedLevel - 1) * 0.12;
    const minutes = safeElapsedSeconds / 60;

    return {
        elapsedSeconds: safeElapsedSeconds,
        energyRecovered: Math.max(1, Math.floor(SAFE_HOUSE_REST_CONFIG.baseEnergyPerMinute * efficiency * minutes)),
        efficiency,
    };
}

/**
 * @route   POST /api/characters
 * @access  Protected
 * @body    { characterName, startingJobCode }
 * @desc    Tao nhan vat moi — moi account chi duoc tao 1 nhan vat
 *          startingJobCode: nghe khoi dau se duoc day len cap 20 ngay lap tuc
 */
characterRouter.post('/', verifyToken, async (req, res, next) => {
    const { characterName, startingJobCode } = req.body;

    if (!characterName || characterName.trim() === '') {
        return res.status(400).json({ success: false, message: 'Character name cannot be empty.' });
    }

    if (characterName.trim().length < 3 || characterName.trim().length > 50) {
        return res.status(400).json({ success: false, message: 'Character name must be 3 to 50 characters.' });
    }

    if (!startingJobCode) {
        return res.status(400).json({ success: false, message: 'You must choose a starting job (startingJobCode).' });
    }

    try {
        const newPlayer = await characterRepository.createCharacter({
            accountId:       req.accountId,
            characterName:   characterName.trim(),
            startingJobCode: startingJobCode
        });

        if (!newPlayer) {
            return res.status(500).json({ success: false, message: 'Could not create character. Please try again.' });
        }

        if (newPlayer.error) {
            return res.status(409).json({ success: false, message: newPlayer.error });
        }

        return res.status(201).json({
            success: true,
            message: `Character "${newPlayer.character_name}" created successfully! Starting job: ${newPlayer.starting_job?.display_name} (level 20).`,
            data: newPlayer
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/characters/account/me
 * @desc    Lay nhan vat duy nhat cua account dang dang nhap
 *          Tra ve null neu chua co nhan vat (de frontend biet phai tao moi)
 * @access  Protected
 */
characterRouter.get('/account/me', verifyToken, async (req, res, next) => {
    try {
        const player = await characterRepository.findCharacterByAccount(req.accountId);

        // Tra ve null thay vi 404 de frontend xu ly
        return res.json({
            success: true,
            data: player || null,
            has_character: player !== null
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/characters/:id/safe-house/rest
 * @body    { elapsedSeconds }
 * @desc    Nghi ngoi trong nha an toan de hoi energy.
 * @access  Protected
 */
characterRouter.post('/:id/safe-house/rest', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { id } = req.params;
    const restGain = calculateSafeHouseRestGain(req.body.elapsedSeconds);

    try {
        const result = await dbPool.query(`
            UPDATE players
            SET current_energy = LEAST(max_energy, current_energy + $1),
                updated_at = NOW()
            WHERE id = $2
            RETURNING id, current_energy, max_energy;
        `, [restGain.energyRecovered, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        return res.json({
            success: true,
            message: 'Rested safely at home.',
            data: {
                ...result.rows[0],
                home_level: SAFE_HOUSE_REST_CONFIG.homeLevel,
                bed_level: SAFE_HOUSE_REST_CONFIG.bedLevel,
                elapsed_seconds: restGain.elapsedSeconds,
                energy_recovered: restGain.energyRecovered,
                rest_efficiency: restGain.efficiency,
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/characters/:id
 * @access  Protected
 */
characterRouter.get('/:id', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { id } = req.params;

    if (!id || id.length < 10) {
        return res.status(400).json({ success: false, message: 'Invalid character ID.' });
    }

    try {
        const player = await characterRepository.findCharacterById(id);
        if (!player) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        return res.json({ success: true, data: player });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/characters/:id/stats
 * @access  Protected
 */
characterRouter.get('/:id/stats', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { id } = req.params;

    try {
        const totalStats = await characterService.calculateTotalStats(id);
        if (!totalStats) {
            return res.status(404).json({ success: false, message: 'Character not found.' });
        }

        return res.json({ success: true, data: totalStats });
    } catch (error) {
        next(error);
    }
});

module.exports = characterRouter;

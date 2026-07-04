// backend/src/routes/routes.character.js
//           GET /account/me tra ve nhan vat duy nhat (khong phai mang)
//           Kiem tra da co nhan vat truoc khi cho tao

const express = require('express');
const characterRouter = express.Router();
const characterRepository = require('../repositories/repositories.character');
const characterService = require('../services/services.character');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

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
        return res.status(400).json({ success: false, message: 'Ten nhan vat khong duoc de trong.' });
    }

    if (characterName.trim().length < 3 || characterName.trim().length > 50) {
        return res.status(400).json({ success: false, message: 'Ten nhan vat phai tu 3 den 50 ky tu.' });
    }

    if (!startingJobCode) {
        return res.status(400).json({ success: false, message: 'Phai chon nghe khoi dau (startingJobCode).' });
    }

    try {
        const newPlayer = await characterRepository.createCharacter({
            accountId:       req.accountId,
            characterName:   characterName.trim(),
            startingJobCode: startingJobCode
        });

        if (!newPlayer) {
            return res.status(500).json({ success: false, message: 'Khong the tao nhan vat. Vui long thu lai.' });
        }

        if (newPlayer.error) {
            return res.status(409).json({ success: false, message: newPlayer.error });
        }

        return res.status(201).json({
            success: true,
            message: `Tao nhan vat "${newPlayer.character_name}" thanh cong! Nghe khoi dau: ${newPlayer.starting_job?.display_name} (cap 20).`,
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
 * @route   GET /api/characters/:id
 * @access  Protected
 */
characterRouter.get('/:id', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { id } = req.params;

    if (!id || id.length < 10) {
        return res.status(400).json({ success: false, message: 'ID nhan vat khong hop le.' });
    }

    try {
        const player = await characterRepository.findCharacterById(id);
        if (!player) {
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
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
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
        }

        return res.json({ success: true, data: totalStats });
    } catch (error) {
        next(error);
    }
});

module.exports = characterRouter;

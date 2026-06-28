// backend/src/routes/routes.character.js
// Version: 3.0
// Cap nhat: Gan verifyToken + verifyPlayerOwnership

const express = require('express');
const characterRouter = express.Router();
const characterRepository = require('../repositories/repositories.character');
const characterService = require('../services/services.character');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

/**
 * @route   POST /api/characters
 * @access  Protected
 * @body    { characterName }
 */
characterRouter.post('/', verifyToken, async (req, res, next) => {
    const { characterName } = req.body;

    if (!characterName || characterName.trim() === '') {
        return res.status(400).json({ success: false, message: 'Ten nhan vat khong duoc de trong!' });
    }

    if (characterName.trim().length < 3 || characterName.trim().length > 50) {
        return res.status(400).json({ success: false, message: 'Ten nhan vat phai tu 3 den 50 ky tu.' });
    }

    try {
        // Gan accountId tu token — khong nhan tu body de tranh gia mao
        const newPlayer = await characterRepository.createCharacter({
            accountId:     req.accountId,
            characterName: characterName.trim()
        });

        if (!newPlayer) {
            return res.status(500).json({ success: false, message: 'Khong the tao nhan vat. Vui long thu lai.' });
        }

        if (newPlayer.error) {
            return res.status(409).json({ success: false, message: newPlayer.error });
        }

        return res.status(201).json({
            success: true,
            message: 'Tao nhan vat thanh cong!',
            data: newPlayer
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/characters/account/me
 * @desc    Lay danh sach nhan vat cua account dang dang nhap
 * @access  Protected
 */
characterRouter.get('/account/me', verifyToken, async (req, res, next) => {
    try {
        const players = await characterRepository.findCharactersByAccount(req.accountId);
        return res.json({ success: true, data: players });
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

// backend/src/routes/routes.items.js
// Version: 1.0
// Endpoint quan ly vat pham: lay inventory, lay template, check equip requirement

const express = require('express');
const itemsRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');
const craftingService = require('../services/services.crafting');

/**
 * @route   GET /api/items/templates
 * @desc    Lay danh sach toan bo item template (catalog)
 * @query   ?category=WEAPON
 */
itemsRouter.get('/templates', verifyToken, async (req, res, next) => {
    const { category } = req.query;

    let sqlQuery = `SELECT * FROM item_templates`;
    const sqlValues = [];

    if (category) {
        sqlQuery += ` WHERE category = $1`;
        sqlValues.push(category.toUpperCase());
    }

    sqlQuery += ` ORDER BY item_level ASC, category ASC;`;

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/items/player/:playerId
 * @desc    Lay toan bo inventory cua nhan vat
 * @query   ?equipped=true (chi lay do dang mac)
 */
itemsRouter.get('/player/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.params;
    const { equipped } = req.query;

    let sqlQuery = `
        SELECT i.*, it.display_name, it.category, it.item_level, it.is_stackable
        FROM items i
        JOIN item_templates it ON i.template_id = it.id
        WHERE i.owner_player_id = $1
    `;
    const sqlValues = [playerId];

    if (equipped === 'true') {
        sqlQuery += ` AND i.is_equipped = TRUE`;
    }

    sqlQuery += ` ORDER BY it.category ASC, it.item_level DESC;`;

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);

        // Tinh Item Power cho tung item
        const itemsWithPower = result.rows.map(item => ({
            ...item,
            item_power: craftingService.calculateItemPower(item.item_level, item.rarity)
        }));

        return res.json({ success: true, data: itemsWithPower });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/items/equip
 * @body    { playerId, itemId }
 * @desc    Trang bi vat pham — kiem tra equip requirement (PlayerLevel >= ItemLevel)
 */
itemsRouter.post('/equip', verifyToken, async (req, res, next) => {
    const { playerId, itemId } = req.body;

    if (!playerId || !itemId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va itemId.'
        });
    }

    try {
        // Lay thong tin item va template
        const itemResult = await dbPool.query(`
            SELECT i.*, it.item_level, it.display_name, it.category, it.base_durability
            FROM items i
            JOIN item_templates it ON i.template_id = it.id
            WHERE i.id = $1 AND i.owner_player_id = $2;
        `, [itemId, playerId]);

        if (itemResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay vat pham.' });
        }

        const item = itemResult.rows[0];

        // Lay player level de kiem tra equip requirement
        const playerResult = await dbPool.query(
            `SELECT player_level FROM players WHERE id = $1;`,
            [playerId]
        );

        if (playerResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
        }

        const playerLevel = playerResult.rows[0].player_level;

        // Luat CUREL: PlayerLevel >= ItemLevel (khong tinh do hiem)
        if (playerLevel < item.item_level) {
            return res.status(400).json({
                success: false,
                message: `Yeu cau Player Level >= ${item.item_level} de trang bi ${item.display_name}. Player Level hien tai: ${playerLevel}.`
            });
        }

        // Xac dinh slot trang bi dua theo category
        const categoryToSlot = {
            WEAPON: 'weapon',
            ARMOR:  'body',
            HELMET: 'head',
            PANTS:  'legs',
            BOOTS:  'feet',
            GLOVES: 'hands',
            RING:   'ring_1',
            AMULET: 'amulet',
        };

        const equipSlot = categoryToSlot[item.category] || 'misc';

        // Thao do cu trong cung slot (neu co)
        await dbPool.query(
            `UPDATE items SET is_equipped = FALSE, equip_slot = NULL WHERE owner_player_id = $1 AND equip_slot = $2;`,
            [playerId, equipSlot]
        );

        // Trang bi do moi
        await dbPool.query(
            `UPDATE items SET is_equipped = TRUE, equip_slot = $1 WHERE id = $2;`,
            [equipSlot, itemId]
        );

        return res.json({
            success: true,
            message: `Da trang bi: ${item.display_name} vao slot [${equipSlot}].`,
            data: { item_id: itemId, equip_slot: equipSlot }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/items/unequip
 * @body    { playerId, itemId }
 * @desc    Thao trang bi
 */
itemsRouter.post('/unequip', verifyToken, async (req, res, next) => {
    const { playerId, itemId } = req.body;

    if (!playerId || !itemId) {
        return res.status(400).json({
            success: false,
            message: 'Thieu tham so: playerId va itemId.'
        });
    }

    try {
        const result = await dbPool.query(`
            UPDATE items
            SET is_equipped = FALSE, equip_slot = NULL
            WHERE id = $1 AND owner_player_id = $2
            RETURNING *;
        `, [itemId, playerId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay vat pham.' });
        }

        return res.json({ success: true, message: 'Da thao trang bi.', data: result.rows[0] });
    } catch (error) {
        next(error);
    }
});

module.exports = itemsRouter;

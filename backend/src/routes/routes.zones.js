// backend/src/routes/routes.zones.js
// Endpoint tra ve danh sach zone va thong tin khu vuc

const express = require('express');
const zonesRouter = express.Router();
const { dbPool } = require('../repositories/repositories.database');

/**
 * @route   GET /api/zones
 * @desc    Lay danh sach tat ca zone dang hoat dong
 * @query   ?type=mine (loc theo loai zone)
 */
zonesRouter.get('/', async (req, res, next) => {
    const { type } = req.query;

    let sqlQuery = `SELECT * FROM zones WHERE is_active = TRUE`;
    const sqlValues = [];

    if (type) {
        sqlQuery += ` AND zone_type = $1`;
        sqlValues.push(type.toLowerCase());
    }

    sqlQuery += ` ORDER BY min_player_lv ASC;`;

    try {
        const result = await dbPool.query(sqlQuery, sqlValues);
        return res.json({ success: true, data: result.rows });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/zones/:code
 * @desc    Lay thong tin chi tiet mot zone theo CODE
 */
zonesRouter.get('/:code', async (req, res, next) => {
    const { code } = req.params;

    try {
        const result = await dbPool.query(
            `SELECT * FROM zones WHERE code = $1 AND is_active = TRUE;`,
            [code.toUpperCase()]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: `Zone khong ton tai: ${code}` });
        }

        return res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        next(error);
    }
});

module.exports = zonesRouter;

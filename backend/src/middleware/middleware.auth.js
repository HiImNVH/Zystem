// backend/src/middleware/middleware.auth.js
// Version: 1.0
// Middleware xac thuc JWT — gan vao moi route can bao ve

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'zystem_jwt_secret_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Tao JWT token khi dang nhap thanh cong
function generateToken(accountId, username) {
    if (!accountId || !username) return null;

    return jwt.sign(
        { accountId, username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

// Middleware xac thuc token — dat truoc cac route can bao ve
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Yeu cau dang nhap. Khong tim thay token xac thuc.'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Gan thong tin account vao req de cac route sau dung
        req.accountId = decoded.accountId;
        req.username = decoded.username;
        next();
    } catch (error) {
        // Token het han hoac bi gia mao
        const message = error.name === 'TokenExpiredError'
            ? 'Phien dang nhap da het han. Vui long dang nhap lai.'
            : 'Token khong hop le.';

        return res.status(401).json({ success: false, message });
    }
}

// Middleware kiem tra player thuoc ve account dang dang nhap
// Dung cho cac route co :playerId de chong truy cap cheo
async function verifyPlayerOwnership(req, res, next) {
    const { dbPool } = require('../repositories/repositories.database');
    const playerId = req.params.playerId || req.params.id || req.body.playerId;

    if (!playerId) return next();

    try {
        const result = await dbPool.query(
            `SELECT account_id FROM players WHERE id = $1;`,
            [playerId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Khong tim thay nhan vat.' });
        }

        const playerAccountId = result.rows[0].account_id;

        // Cho phep neu account_id khop hoac player chua gan account (du lieu cu)
        if (playerAccountId && playerAccountId !== req.accountId) {
            return res.status(403).json({
                success: false,
                message: 'Khong co quyen truy cap nhan vat nay.'
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generateToken,
    verifyToken,
    verifyPlayerOwnership
};

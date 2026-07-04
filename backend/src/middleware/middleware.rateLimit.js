// backend/src/middleware/middleware.rateLimit.js
// Rate limiting chong spam va brute-force

const rateLimit = require('express-rate-limit');

// Gioi han chung cho toan bo API: 600 request / 15 phut moi IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 600,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Qua nhieu yeu cau. Vui long thu lai sau 15 phut.'
    }
});

// Gioi han chat cho endpoint dang nhap / dang ky: 20 lan / 15 phut moi IP
// Chong brute-force mat khau
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Qua nhieu lan thu dang nhap. Vui long thu lai sau 15 phut.'
    }
});

// Gioi han cho action queue: 90 lan / phut moi IP
// Chong spam dang ky hanh dong lien tuc
const actionLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 90,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Qua nhieu hanh dong. Vui long thu lai sau 1 phut.'
    }
});

module.exports = {
    globalLimiter,
    authLimiter,
    actionLimiter
};

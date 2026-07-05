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
        message: 'Too many requests. Please try again in 15 minutes.'
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
        message: 'Too many login attempts. Please try again in 15 minutes.'
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
        message: 'Too many actions. Please try again in 1 minute.'
    }
});

module.exports = {
    globalLimiter,
    authLimiter,
    actionLimiter
};

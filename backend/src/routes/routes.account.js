// backend/src/routes/routes.account.js
//           Bo sung GET /me de lay thong tin account hien tai

const express = require('express');
const accountRouter = express.Router();
const accountRepository = require('../repositories/repositories.account');
const { generateToken, verifyToken } = require('../middleware/middleware.auth');
const { authLimiter } = require('../middleware/middleware.rateLimit');

/**
 * @route   POST /api/accounts/register
 * @desc    Dang ky tai khoan moi
 * @body    { username, email, password }
 * @access  Public (co rate limit)
 */
accountRouter.post('/register', authLimiter, async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Thieu thong tin bat buoc: username, email, password.'
        });
    }

    if (username.trim().length < 3 || username.trim().length > 32) {
        return res.status(400).json({
            success: false,
            message: 'Ten dang nhap phai tu 3 den 32 ky tu.'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Mat khau phai co it nhat 6 ky tu.'
        });
    }

    try {
        const result = await accountRepository.createAccount(username, email, password);

        if (!result) {
            return res.status(500).json({ success: false, message: 'Khong the tao tai khoan. Vui long thu lai.' });
        }

        if (result.error) {
            return res.status(409).json({ success: false, message: result.error });
        }

        // Tra ve token ngay sau khi dang ky de khoi phai dang nhap them lan nua
        const token = generateToken(result.id, result.username);

        return res.status(201).json({
            success: true,
            message: 'Dang ky tai khoan thanh cong!',
            data: {
                account: result,
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/accounts/login
 * @desc    Dang nhap va nhan JWT token
 * @body    { username, password }
 * @access  Public (co rate limit chat)
 */
accountRouter.post('/login', authLimiter, async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Thieu thong tin: username va password.'
        });
    }

    try {
        const result = await accountRepository.verifyLogin(username, password);

        if (!result.success) {
            return res.status(401).json({ success: false, message: result.message });
        }

        const token = generateToken(result.account.id, result.account.username);

        return res.json({
            success: true,
            message: 'Dang nhap thanh cong!',
            data: {
                account: result.account,
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/accounts/me
 * @desc    Lay thong tin account dang dang nhap
 * @access  Protected
 */
accountRouter.get('/me', verifyToken, async (req, res, next) => {
    try {
        const account = await accountRepository.findAccountById(req.accountId);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Khong tim thay tai khoan.' });
        }

        return res.json({ success: true, data: account });
    } catch (error) {
        next(error);
    }
});

module.exports = accountRouter;

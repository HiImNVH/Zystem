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
            message: 'Missing required fields: username, email, password.'
        });
    }

    if (username.trim().length < 3 || username.trim().length > 32) {
        return res.status(400).json({
            success: false,
            message: 'Username must be 3 to 32 characters.'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters.'
        });
    }

    try {
        const result = await accountRepository.createAccount(username, email, password);

        if (!result) {
            return res.status(500).json({ success: false, message: 'Could not create account. Please try again.' });
        }

        if (result.error) {
            return res.status(409).json({ success: false, message: result.error });
        }

        // Tra ve token ngay sau khi dang ky de khoi phai dang nhap them lan nua
        const token = generateToken(result.id, result.username);

        return res.status(201).json({
            success: true,
            message: 'Account registered successfully!',
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
            message: 'Missing fields: username and password.'
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
            message: 'Logged in successfully!',
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
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }

        return res.json({ success: true, data: account });
    } catch (error) {
        next(error);
    }
});

module.exports = accountRouter;

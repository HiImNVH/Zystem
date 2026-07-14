// backend/src/routes/routes.trading.js

const express = require('express');
const tradingRouter = express.Router();
const tradingService = require('../services/services.trading');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

tradingRouter.get('/npc-shop/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const catalog = await tradingService.getNpcShopCatalog(req.params.playerId);
        return res.json({ success: true, data: catalog });
    } catch (error) {
        next(error);
    }
});

tradingRouter.get('/npc-shop', verifyToken, async (req, res, next) => {
    try {
        const catalog = await tradingService.getNpcShopCatalog(req.query.playerId);
        return res.json({ success: true, data: catalog });
    } catch (error) {
        next(error);
    }
});

tradingRouter.post('/npc-shop/buy', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, templateCode } = req.body;
    if (!playerId || !templateCode) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, templateCode.' });
    }

    try {
        const result = await tradingService.buyNpcShopItem({ playerId, templateCode });
        return res.json({ success: true, message: 'Item bought successfully.', data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

tradingRouter.post('/npc-shop/sell', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, itemId } = req.body;
    if (!playerId || !itemId) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, itemId.' });
    }

    try {
        const result = await tradingService.sellItemToNpc({ playerId, itemId });
        return res.json({ success: true, message: 'Item sold successfully.', data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

tradingRouter.post('/npc-shop/recycle', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId } = req.body;
    if (!playerId) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId.' });
    }

    try {
        const result = await tradingService.recycleWasteItems({ playerId });
        return res.json({ success: true, message: 'Waste processed successfully.', data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

tradingRouter.get('/black-market/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const listings = await tradingService.getBlackMarketListings(req.params.playerId);
        return res.json({ success: true, data: listings });
    } catch (error) {
        next(error);
    }
});

tradingRouter.post('/black-market/list', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, itemId, priceMoney } = req.body;
    if (!playerId || !itemId || !priceMoney) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, itemId, priceMoney.' });
    }

    try {
        const result = await tradingService.listBlackMarketItem({ playerId, itemId, priceMoney });
        return res.json({ success: true, message: 'Listing created successfully.', data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

tradingRouter.post('/black-market/buy', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, listingId } = req.body;
    if (!playerId || !listingId) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, listingId.' });
    }

    try {
        const result = await tradingService.buyBlackMarketListing({ playerId, listingId });
        return res.json({ success: true, message: 'Listing bought successfully.', data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

tradingRouter.post('/black-market/cancel', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    const { playerId, listingId } = req.body;
    if (!playerId || !listingId) {
        return res.status(400).json({ success: false, message: 'Missing parameters: playerId, listingId.' });
    }

    try {
        const result = await tradingService.cancelBlackMarketListing({ playerId, listingId });
        return res.json({ success: true, message: 'Listing cancelled successfully.', data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = tradingRouter;

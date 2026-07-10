// backend/src/routes/routes.layers.js

const express = require('express');
const layersRouter = express.Router();
const layerApiService = require('../services/services.layerApi');
const { verifyToken, verifyPlayerOwnership } = require('../middleware/middleware.auth');

layersRouter.get('/zone', verifyToken, async (req, res, next) => {
    try {
        const data = await layerApiService.getZoneLayer();
        return res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

layersRouter.get('/zone/:zoneCode/pois', verifyToken, async (req, res, next) => {
    try {
        const data = await layerApiService.getPoiLayerByZone(req.params.zoneCode);
        if (!data) return res.status(404).json({ success: false, message: 'Zone not found.' });
        return res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

layersRouter.get('/poi/:poiId', verifyToken, async (req, res, next) => {
    try {
        const data = await layerApiService.getPoiDetailLayer(req.params.poiId);
        if (!data) return res.status(404).json({ success: false, message: 'POI not found.' });
        return res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

layersRouter.get('/skill/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const data = await layerApiService.getSkillLayer(req.params.playerId);
        return res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

layersRouter.get('/profile/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const data = await layerApiService.getProfileLayer(req.params.playerId);
        if (!data) return res.status(404).json({ success: false, message: 'Character not found.' });
        return res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

layersRouter.get('/settings/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const data = await layerApiService.getSettingsLayer(req.params.playerId);
        return res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

layersRouter.put('/settings/:playerId', verifyToken, verifyPlayerOwnership, async (req, res, next) => {
    try {
        const data = await layerApiService.updateSettingsLayer({
            playerId: req.params.playerId,
            settings: req.body.settings,
        });
        return res.json({ success: true, message: 'Settings saved.', data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = layersRouter;

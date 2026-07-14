// backend/src/services/services.poiRotation.js

const crypto = require('crypto');

const VISIBLE_POI_COUNT = 5;
const ROTATION_INTERVAL_MINUTES = 15;
const ROTATION_INTERVAL_MILLISECONDS = ROTATION_INTERVAL_MINUTES * 60 * 1000;

function getRotationWindow(currentTime = new Date()) {
    const currentTimestamp = currentTime.getTime();
    const bucket = Math.floor(currentTimestamp / ROTATION_INTERVAL_MILLISECONDS);
    const startedAt = new Date(bucket * ROTATION_INTERVAL_MILLISECONDS);
    const nextRefreshAt = new Date((bucket + 1) * ROTATION_INTERVAL_MILLISECONDS);

    return { bucket, startedAt, nextRefreshAt };
}

function createRotationScore(config) {
    return crypto
        .createHash('sha256')
        .update(`${config.zoneCode}:${config.bucket}:${config.poi.code}`)
        .digest('hex');
}

function selectRotatingPois(config) {
    const pois = Array.isArray(config?.pois) ? config.pois : [];
    const zoneCode = String(config?.zoneCode || 'zone');
    const rotationWindow = getRotationWindow(config?.currentTime);
    const selectedPois = [...pois]
        .sort((leftPoi, rightPoi) => {
            const leftScore = createRotationScore({ zoneCode, bucket: rotationWindow.bucket, poi: leftPoi });
            const rightScore = createRotationScore({ zoneCode, bucket: rotationWindow.bucket, poi: rightPoi });
            return leftScore.localeCompare(rightScore);
        })
        .slice(0, VISIBLE_POI_COUNT);

    return {
        pois: selectedPois,
        rotation: {
            visible_count: VISIBLE_POI_COUNT,
            eligible_count: pois.length,
            interval_minutes: ROTATION_INTERVAL_MINUTES,
            started_at: rotationWindow.startedAt.toISOString(),
            next_refresh_at: rotationWindow.nextRefreshAt.toISOString(),
        },
    };
}

module.exports = {
    selectRotatingPois,
    VISIBLE_POI_COUNT,
    ROTATION_INTERVAL_MINUTES,
};

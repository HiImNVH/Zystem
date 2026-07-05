// backend/src/services/services.itemLifecycle.js

function normalizeLifecycleModel(lifecycleModel) {
    return String(lifecycleModel || 'None').toLowerCase();
}

function shouldExpire(lifecycleModel, durationHours) {
    const model = normalizeLifecycleModel(lifecycleModel);
    const hours = parseInt(durationHours) || 0;
    return hours > 0 && ['duration', 'consumable', 'decay'].some(key => model.includes(key));
}

function calculateExpiresAt(lifecycleModel, durationHours, fromDate = new Date()) {
    if (!shouldExpire(lifecycleModel, durationHours)) return null;

    const hours = parseInt(durationHours) || 0;
    return new Date(fromDate.getTime() + hours * 60 * 60 * 1000);
}

function isExpired(expiresAt, now = new Date()) {
    if (!expiresAt) return false;
    return new Date(expiresAt) <= now;
}

function decorateItemLifecycle(item, now = new Date()) {
    if (!item) return item;

    const expiresAt = item.expires_at || item.computed_expires_at || item.expiresAt || null;
    return {
        ...item,
        expires_at: expiresAt,
        is_expired: isExpired(expiresAt, now),
    };
}

module.exports = {
    calculateExpiresAt,
    decorateItemLifecycle,
    isExpired,
    shouldExpire,
};

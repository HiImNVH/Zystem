// frontend/src/api/api.game.js
// Gameplay API: zones, inventory, stats

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

function getHeaders() {
    const token = localStorage.getItem('zystem_token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong.');
    }
    return data;
}

export async function getCharacterStats(playerId) {
    const res = await fetch(`${BASE_URL}/api/characters/${playerId}/stats`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function restAtSafeHouse(playerId, elapsedSeconds = 10) {
    const res = await fetch(`${BASE_URL}/api/characters/${playerId}/safe-house/rest`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ elapsedSeconds })
    });
    return handleResponse(res);
}

export async function getZones() {
    const res = await fetch(`${BASE_URL}/api/zones`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getZoneLayer() {
    const res = await fetch(`${BASE_URL}/api/layers/zone`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getZonePoiLayer(zoneCode) {
    const res = await fetch(`${BASE_URL}/api/layers/zone/${encodeURIComponent(zoneCode)}/pois`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getPoiLayer(poiId) {
    const res = await fetch(`${BASE_URL}/api/layers/poi/${poiId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getSkillLayer(playerId) {
    const res = await fetch(`${BASE_URL}/api/layers/skill/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getProfileLayer(playerId) {
    const res = await fetch(`${BASE_URL}/api/layers/profile/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getSettingsLayer(playerId) {
    const res = await fetch(`${BASE_URL}/api/layers/settings/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function updateSettingsLayer(playerId, settings) {
    const res = await fetch(`${BASE_URL}/api/layers/settings/${playerId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ settings })
    });
    return handleResponse(res);
}

export async function getPoiActivities(poiId, type) {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    const res = await fetch(`${BASE_URL}/api/zones/pois/${poiId}/activities${query}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function executePoiActivity(playerId, poiId, activityType, targetId, options = {}) {
    const res = await fetch(`${BASE_URL}/api/zones/pois/${poiId}/execute`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, activityType, targetId, ...options })
    });
    return handleResponse(res);
}

export async function getInventory(playerId) {
    const res = await fetch(`${BASE_URL}/api/items/player/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getCurrencyMarket() {
    const res = await fetch(`${BASE_URL}/api/wallets/exchange/market`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function exchangeCurrency(playerId, currency, quantity, side) {
    const res = await fetch(`${BASE_URL}/api/wallets/exchange`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, currency, quantity, side })
    });
    return handleResponse(res);
}

export async function getNpcShop() {
    const res = await fetch(`${BASE_URL}/api/trading/npc-shop`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function buyNpcShopItem(playerId, templateCode) {
    const res = await fetch(`${BASE_URL}/api/trading/npc-shop/buy`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, templateCode })
    });
    return handleResponse(res);
}

export async function sellItemToNpc(playerId, itemId) {
    const res = await fetch(`${BASE_URL}/api/trading/npc-shop/sell`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, itemId })
    });
    return handleResponse(res);
}

export async function getBlackMarketListings(playerId) {
    const res = await fetch(`${BASE_URL}/api/trading/black-market/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function listBlackMarketItem(playerId, itemId, priceMoney) {
    const res = await fetch(`${BASE_URL}/api/trading/black-market/list`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, itemId, priceMoney })
    });
    return handleResponse(res);
}

export async function buyBlackMarketListing(playerId, listingId) {
    const res = await fetch(`${BASE_URL}/api/trading/black-market/buy`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, listingId })
    });
    return handleResponse(res);
}

export async function cancelBlackMarketListing(playerId, listingId) {
    const res = await fetch(`${BASE_URL}/api/trading/black-market/cancel`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, listingId })
    });
    return handleResponse(res);
}

export async function getPlayerJobs(playerId) {
    const res = await fetch(`${BASE_URL}/api/jobs/player/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

// === SKILL TREE API ===
export async function getPlayerSkills(playerId) {
    const res = await fetch(`${BASE_URL}/api/skills/player/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function unlockSkill(playerId, skillCode) {
    const res = await fetch(`${BASE_URL}/api/skills/unlock`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ playerId, skillCode })
    });
    return handleResponse(res);
}

export async function refundSkill(playerId, skillCode) {
    const res = await fetch(`${BASE_URL}/api/skills/refund`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ playerId, skillCode })
    });
    return handleResponse(res);
}

export async function getRefundStatus(playerId) {
    const res = await fetch(`${BASE_URL}/api/skills/refund-status/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getPlayerEvents(playerId, limit = 50) {
    const res = await fetch(`${BASE_URL}/api/events/${playerId}?limit=${limit}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function markPlayerEventsRead(playerId) {
    const res = await fetch(`${BASE_URL}/api/events/${playerId}/read`, {
        method: 'POST',
        headers: getHeaders(),
    });
    return handleResponse(res);
}

export async function getChatMessages(channel = 'GLOBAL', limit = 50) {
    const res = await fetch(`${BASE_URL}/api/chat/messages?channel=${encodeURIComponent(channel)}&limit=${limit}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function sendChatMessage(playerId, channel, message) {
    const res = await fetch(`${BASE_URL}/api/chat/messages`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, channel, message }),
    });
    return handleResponse(res);
}

// === EQUIPMENT API ===
export async function getEquippedItems(playerId) {
    const res = await fetch(`${BASE_URL}/api/items/player/${playerId}/equipped`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function equipItem(playerId, itemId) {
    const res = await fetch(`${BASE_URL}/api/items/equip`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ playerId, itemId })
    });
    return handleResponse(res);
}

export async function useFoodItem(playerId, itemId) {
    const res = await fetch(`${BASE_URL}/api/items/use-food`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ playerId, itemId })
    });
    return handleResponse(res);
}

export async function getRecipes() {
    const res = await fetch(`${BASE_URL}/api/items/recipes`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getRecipe(recipeCode) {
    const res = await fetch(`${BASE_URL}/api/items/recipes/${encodeURIComponent(recipeCode)}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function craftItem(playerId, recipeCode, ingredients) {
    const res = await fetch(`${BASE_URL}/api/items/craft`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, recipeCode, ingredients })
    });
    return handleResponse(res);
}

export async function unequipItem(playerId, itemId) {
    const res = await fetch(`${BASE_URL}/api/items/unequip`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ playerId, itemId })
    });
    return handleResponse(res);
}

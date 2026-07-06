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

export async function getZones() {
    const res = await fetch(`${BASE_URL}/api/zones`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getPoiActivities(poiId, type) {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    const res = await fetch(`${BASE_URL}/api/zones/pois/${poiId}/activities${query}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getInventory(playerId) {
    const res = await fetch(`${BASE_URL}/api/items/player/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getWallet(playerId) {
    const res = await fetch(`${BASE_URL}/api/wallets/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getPlayerJobs(playerId) {
    const res = await fetch(`${BASE_URL}/api/jobs/player/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function investSP(playerId, jobCode, spAmount) {
    const res = await fetch(`${BASE_URL}/api/jobs/invest-sp`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, jobCode, spAmount })
    });
    return handleResponse(res);
}

export async function unlockJob(playerId, jobCode) {
    const res = await fetch(`${BASE_URL}/api/jobs/unlock`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, jobCode })
    });
    return handleResponse(res);
}

export async function forgetJob(playerId, jobCode) {
    const res = await fetch(`${BASE_URL}/api/jobs/forget`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, jobCode })
    });
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

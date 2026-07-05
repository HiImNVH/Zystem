// frontend/src/api/api.game.js
// Gameplay API: zones, action queue, inventory, stats

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

export async function getActionQueue(playerId) {
    const res = await fetch(`${BASE_URL}/api/action-queue/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function registerAction(playerId, actionType, zoneCode, durationSeconds) {
    const res = await fetch(`${BASE_URL}/api/action-queue/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, actionType, zoneCode, durationSeconds })
    });
    return handleResponse(res);
}

export async function claimAction(playerId, actionId) {
    const res = await fetch(`${BASE_URL}/api/action-queue/claim`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, actionId })
    });
    return handleResponse(res);
}

export async function cancelAction(playerId, actionId) {
    const res = await fetch(`${BASE_URL}/api/action-queue/cancel`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, actionId })
    });
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

export async function unequipItem(playerId, itemId) {
    const res = await fetch(`${BASE_URL}/api/items/unequip`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ playerId, itemId })
    });
    return handleResponse(res);
}

// frontend/src/api/api.faction.js
// Faction API: xem danh sach, xem faction hien tai, tao, tham gia, roi khoi

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

export async function getFactions() {
    const res = await fetch(`${BASE_URL}/api/factions`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function getMyFaction(playerId) {
    const res = await fetch(`${BASE_URL}/api/factions/player/${playerId}`, { headers: getHeaders() });
    return handleResponse(res);
}

export async function createFaction(playerId, name) {
    const res = await fetch(`${BASE_URL}/api/factions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, name })
    });
    return handleResponse(res);
}

export async function joinFaction(playerId, factionId) {
    const res = await fetch(`${BASE_URL}/api/factions/join`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId, factionId })
    });
    return handleResponse(res);
}

export async function leaveFaction(playerId) {
    const res = await fetch(`${BASE_URL}/api/factions/leave`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ playerId })
    });
    return handleResponse(res);
}

// frontend/src/api/api.character.js
// Character API: fetch characters and create a new character with a starting job

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

function getAuthHeader() {
    const token = localStorage.getItem('zystem_token');
    return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
}

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong.');
    }
    return data;
}

export async function getMyCharacter() {
    const response = await fetch(`${BASE_URL}/api/characters/account/me`, {
        headers: getAuthHeader()
    });
    return handleResponse(response);
}

export async function getJobs() {
    const response = await fetch(`${BASE_URL}/api/jobs`, {
        headers: getAuthHeader()
    });
    return handleResponse(response);
}

export async function createCharacter(characterName, startingJobCode) {
    const response = await fetch(`${BASE_URL}/api/characters`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ characterName, startingJobCode })
    });
    return handleResponse(response);
}

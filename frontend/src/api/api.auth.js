// frontend/src/api/api.auth.js
// Goi API xac thuc: register va login

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
    }
    return data;
}

export async function registerAccount(username, email, password) {
    const response = await fetch(`${BASE_URL}/api/accounts/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response);
}

export async function loginAccount(username, password) {
    const response = await fetch(`${BASE_URL}/api/accounts/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
}

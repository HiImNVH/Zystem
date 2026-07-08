// frontend/src/api/api.socket.js

import { io } from 'socket.io-client';

const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// Chi giu MOT ket noi socket duy nhat (singleton) cho toan bo app,
// tranh moi ChatPanel tu tao ket noi rieng gay lang phi va trung su kien
let socketInstance = null;

// Tao ket noi realtime, dung JWT token hien tai de xac thuc voi backend.
// Kiem tra theo SU TON TAI cua instance (khong phai .connected) - vi trong
// luc socket dang o trang thai "connecting" (chua kip bat co .connected=true),
// neu component khac cung goi ham nay se tao nham mot ket noi thu hai.
export function connectSocket() {
    if (socketInstance) return socketInstance;

    const token = localStorage.getItem('zystem_token');
    if (!token) return null;

    socketInstance = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
    });

    return socketInstance;
}

// Lay lai socket dang co (khong tao moi), dung cho cac component chi can lang nghe su kien
export function getSocket() {
    return socketInstance;
}

// Ngat ket noi khi logout de tranh nhan nham su kien realtime cua phien cu
export function disconnectSocket() {
    socketInstance?.disconnect();
    socketInstance = null;
}

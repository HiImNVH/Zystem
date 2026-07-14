// backend/src/sockets/sockets.io.js
// Module quan ly Socket.IO server dung chung cho toan bo backend.
// Chi giu MOT instance io duy nhat (singleton) de cac module khac
// (routes.chat.js, services.playerEvents.js) co the phat (emit) su kien
// realtime ma khong bi circular require voi index.js.

const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { activityLogDb } = require('../repositories/repositories.databaseDomains');
const dbPool = activityLogDb;

const JWT_SECRET = process.env.JWT_SECRET || 'zystem_jwt_secret_change_in_production';

// Danh sach kenh chat hop le, dung chung voi routes.chat.js
const CHAT_CHANNELS = ['GLOBAL', 'ZONE', 'GUILD'];

let ioInstance = null;

// Middleware xac thuc JWT truoc khi cho phep client ket noi socket
// Bat buoc phai co token hop le, giong het luong xac thuc REST hien tai
function verifySocketToken(socket, next) {
    const token = socket.handshake.auth?.token;

    if (!token) {
        next(new Error('Login required for realtime connection.'));
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        socket.accountId = decoded.accountId;
        next();
    } catch (error) {
        next(new Error('Invalid or expired realtime token.'));
    }
}

// Gan socket vao cac room mac dinh: tat ca kenh chat cong khai.
// Room rieng cua tung player (de nhan player_events ca nhan) chi duoc
// gia nhap sau khi client emit 'join:player' va duoc xac thuc chu so huu.
function handleSocketConnection(socket) {
    CHAT_CHANNELS.forEach(channel => socket.join(`chat:${channel}`));

    socket.on('join:player', async (payload) => {
        const playerId = payload?.playerId;
        if (!playerId) return;

        try {
            const result = await dbPool.query(
                'SELECT account_id FROM players WHERE id = $1;',
                [playerId]
            );
            const ownerAccountId = result.rows[0]?.account_id;

            // Chi cho gia nhap room cua chinh nhan vat thuoc ve tai khoan dang dang nhap
            if (ownerAccountId && ownerAccountId !== socket.accountId) return;

            socket.join(`player:${playerId}`);
        } catch (error) {
            console.warn('[WARN] Socket join:player that bai:', error.message);
        }
    });
}

// Khoi tao Socket.IO, gan vao HTTP server co san cua Express.
// corsOptions duoc truyen vao tu index.js de dung chung logic CORS voi REST API.
function initializeSocketServer(httpServer, corsOptions) {
    ioInstance = new Server(httpServer, { cors: corsOptions });
    ioInstance.use(verifySocketToken);
    ioInstance.on('connection', handleSocketConnection);

    console.log('[INFO] Socket.IO da san sang cho ket noi realtime.');
    return ioInstance;
}

// Phat tin nhan chat toi tat ca client dang xem kenh tuong ung
function emitChatMessage(channel, message) {
    if (!ioInstance) return;
    ioInstance.to(`chat:${String(channel).toUpperCase()}`).emit('chat:message', message);
}

// Phat player event toi rieng client cua player do (thong bao ca nhan)
function emitPlayerEvent(playerId, event) {
    if (!ioInstance || !playerId || !event) return;
    ioInstance.to(`player:${playerId}`).emit('player:event', event);
}

module.exports = {
    initializeSocketServer,
    emitChatMessage,
    emitPlayerEvent,
};

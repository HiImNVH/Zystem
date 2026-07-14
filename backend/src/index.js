// backend/src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');

const { initializeDatabaseSchema } = require('./repositories/repositories.database');
const { seedJobsSeedTable } = require('./repositories/repositories.jobsSeed');
const { seedSkillTree } = require('./repositories/repositories.skillsSeed');
const { seedDesignDatabase } = require('./repositories/repositories.designSeed');
const { seedWorkbookCatalog } = require('./repositories/repositories.workbookCatalogSeed');
const { seedWorkbookProgression } = require('./repositories/repositories.workbookProgressionSeed');
const { seedWorkbookWorld } = require('./repositories/repositories.workbookWorldSeed');
const { globalErrorHandler, notFoundHandler } = require('./middleware/middleware.errorHandler');
const { globalLimiter } = require('./middleware/middleware.rateLimit');
const { initializeSocketServer } = require('./sockets/sockets.io');

// Import Routes
const accountRouter      = require('./routes/routes.account');
const characterRouter    = require('./routes/routes.character');
const walletRouter       = require('./routes/routes.wallet');
const zonesRouter        = require('./routes/routes.zones');
const achievementsRouter = require('./routes/routes.achievements');
const jobsRouter         = require('./routes/routes.jobs');
const itemsRouter        = require('./routes/routes.items');
const tradingRouter      = require('./routes/routes.trading');
const skillsRouter       = require('./routes/routes.skills');
const progressRouter     = require('./routes/routes.progress');
const eventsRouter       = require('./routes/routes.events');
const chatRouter         = require('./routes/routes.chat');
const factionsRouter     = require('./routes/routes.factions');
const layersRouter       = require('./routes/routes.layers');

const app = express();
const serverPort = process.env.PORT || 5000;
const corsOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
const defaultCorsOriginPatterns = [
    /^https:\/\/zystem(?:-[a-z0-9-]+)?\.vercel\.app$/i,
    /^http:\/\/localhost:\d+$/i,
    /^http:\/\/127\.0\.0\.1:\d+$/i
];

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Dung chung logic kiem tra origin cho ca REST API (cors) va Socket.IO,
// tranh lech cau hinh giua hai kenh giao tiep
function corsOriginChecker(origin, callback) {
    if (!origin) {
        callback(null, true);
        return;
    }

    const isAllowedOrigin =
        corsOrigins.includes(origin) ||
        defaultCorsOriginPatterns.some(pattern => pattern.test(origin));

    callback(null, isAllowedOrigin);
}

app.use(cors({ origin: corsOriginChecker }));
app.use(express.json());
// Rate limiting toan cuc cho toan bo API
app.use(globalLimiter);

// Health check — public, khong can auth
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        game: 'Zystem',
        version: '5.0',
        timestamp: new Date(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        game: 'Zystem API',
        health: '/health'
    });
});

// Dang ky routes
app.use('/api/accounts',     accountRouter);      // POST /register, /login; GET /me
app.use('/api/characters',   characterRouter);    // Protected
app.use('/api/wallets',      walletRouter);       // Protected
app.use('/api/zones',        zonesRouter);        // Protected
app.use('/api/achievements', achievementsRouter); // Protected
app.use('/api/jobs',         jobsRouter);         // Protected
app.use('/api/items',        itemsRouter);        // Protected
app.use('/api/trading',      tradingRouter);      // Protected
app.use('/api/skills',       skillsRouter);       // Protected
app.use('/api/progress',     progressRouter);     // Protected
app.use('/api/events',       eventsRouter);       // Protected
app.use('/api/chat',         chatRouter);         // Protected
app.use('/api/factions',     factionsRouter);     // Protected
app.use('/api/layers',       layersRouter);       // Protected

app.use(notFoundHandler);
app.use(globalErrorHandler);

// Dung chung 1 HTTP server cho ca Express (REST) va Socket.IO (realtime),
// de khong phai mo hai port rieng biet
const httpServer = http.createServer(app);
initializeSocketServer(httpServer, { origin: corsOriginChecker });

async function bootUpWebApplication() {
    console.log(`[INFO] Dang khoi dong he thong Zystem Back-end tren cong ${serverPort}...`);

    const isSchemaReady = await initializeDatabaseSchema();
    if (!isSchemaReady) {
        console.error('[ERROR] Khoi tao database schema that bai. Dung he thong.');
        process.exit(1);
    }

    await seedJobsSeedTable();
    await seedDesignDatabase();
    await seedWorkbookCatalog();
    await seedWorkbookProgression();
    await seedWorkbookWorld();
    await seedSkillTree();

    httpServer.listen(serverPort, () => {
        console.log(`[SUCCESS] Zystem API dang chay tai: http://localhost:${serverPort}`);
        console.log('[INFO] Socket.IO realtime dang chay chung port voi REST API.');
        console.log('[INFO] Auth flow: POST /api/accounts/login -> nhan token -> gan vao Header: Authorization: Bearer <token>');
        console.log('[INFO] Route map:');
        console.log('  [PUBLIC]    POST /api/accounts/register | POST /api/accounts/login');
        console.log('  [PUBLIC]    GET  /health');
        console.log('  [PROTECTED] GET  /api/accounts/me');
        console.log('  [PROTECTED] POST /api/characters        | GET /api/characters/:id | GET /api/characters/:id/stats');
        console.log('  [PROTECTED] GET  /api/characters/account/me');
        console.log('  [PROTECTED] GET  /api/wallets/:id       | GET /api/wallets/:id/history | POST /api/wallets/exchange');
        console.log('  [PROTECTED] GET  /api/zones             | GET /api/zones/:code');
        console.log('  [PROTECTED] GET  /api/achievements      | POST /claim-sp | POST /equip-title');
        console.log('  [PROTECTED] GET  /api/jobs              | POST /unlock   | POST /forget');
        console.log('  [PROTECTED] GET  /api/items/templates   | GET /recipes | GET /player/:id | POST /equip | POST /unequip');
        console.log('  [PROTECTED] GET  /api/trading/npc-shop | GET /api/trading/black-market/:id | POST /buy | POST /sell');
        console.log('  [PROTECTED] GET  /api/skills/player/:id | POST /unlock | POST /refund');;
        console.log('  [PROTECTED] GET  /api/progress/:id      | POST /api/progress/touch');
        console.log('  [PROTECTED] GET  /api/events/:id        | POST /api/events/:id/read');
        console.log('  [PROTECTED] GET  /api/chat/messages     | POST /api/chat/messages');
        console.log('  [PROTECTED] GET  /api/factions          | GET /player/:id | POST / | POST /join | POST /leave');
        console.log('  [PROTECTED] GET  /api/layers/zone       | /zone/:code/pois | /poi/:id | /skill/:id | /profile/:id | /settings/:id');
    });
}

bootUpWebApplication().catch((error) => {
    console.error('[CRITICAL] Loi nghiem trong khi khoi dong:', error.message);
    console.error('[CRITICAL] Stack trace:', error.stack);
    process.exit(1);
});

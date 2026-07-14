// backend/src/repositories/repositories.databaseDomains.js

const { dbPool } = require('./repositories.database');

const DATABASE_DOMAIN = {
    GAME_DATA: 'gameData',
    PLAYER_DATA: 'playerData',
    ACTIVITY_LOG: 'activityLog',
};

function createDatabaseDomain(config) {
    if (!config?.name || !config?.pool) throw new Error('Missing database domain configuration.');

    return {
        name: config.name,
        query: (sqlQuery, values) => config.pool.query(sqlQuery, values),
        connect: () => config.pool.connect(),
        getPool: () => config.pool,
    };
}

const gameDataDb = createDatabaseDomain({
    name: DATABASE_DOMAIN.GAME_DATA,
    pool: dbPool,
});

const playerDataDb = createDatabaseDomain({
    name: DATABASE_DOMAIN.PLAYER_DATA,
    pool: dbPool,
});

const activityLogDb = createDatabaseDomain({
    name: DATABASE_DOMAIN.ACTIVITY_LOG,
    pool: dbPool,
});

module.exports = {
    DATABASE_DOMAIN,
    gameDataDb,
    playerDataDb,
    activityLogDb,
    createDatabaseDomain,
};

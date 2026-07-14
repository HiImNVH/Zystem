// backend/src/repositories/repositories.workbookWorldSeed.js

const crypto = require('crypto');
const { gameDataDb } = require('./repositories.databaseDomains');
const { WORKBOOK_WORLD_DATA } = require('./repositories.workbookWorld');

const dbPool = gameDataDb;

function hasTagOverlap(leftTags, rightTags) {
    if (!Array.isArray(leftTags) || !Array.isArray(rightTags)) return false;
    const normalizedTags = new Set(leftTags.map(tag => String(tag).toLowerCase()));
    return rightTags.some(tag => normalizedTags.has(String(tag).toLowerCase()));
}

function createScopedCode(config) {
    const rawCode = `${config.scopeCode}__${config.entityCode}`;
    if (rawCode.length <= config.maxLength) return rawCode;

    const suffix = crypto.createHash('sha1').update(rawCode).digest('hex').slice(0, 8).toUpperCase();
    return `${rawCode.slice(0, config.maxLength - suffix.length - 2)}__${suffix}`;
}

function findEligiblePois(zone) {
    if (!zone.tags.length) return [];
    return WORKBOOK_WORLD_DATA.pois.filter(poi => hasTagOverlap(zone.tags, poi.compatibleZoneTags));
}

function findEligibleRooms(config) {
    return WORKBOOK_WORLD_DATA.rooms.filter(room => {
        const matchesPoiType = room.compatiblePoiTypes.includes(config.poi.type);
        const matchesZone = !room.compatibleZoneTags.length
            || hasTagOverlap(config.zone.tags, room.compatibleZoneTags);
        return matchesPoiType && matchesZone;
    });
}

function parseGameplayTag(value) {
    const [tagType, actionType] = String(value || '').split(':');
    if (!tagType || !actionType) return null;

    return {
        tagType: tagType.toUpperCase(),
        actionType: actionType.toUpperCase(),
    };
}

async function updateZones(client) {
    for (const zone of WORKBOOK_WORLD_DATA.zones) {
        await client.query(`
            UPDATE zones
            SET display_name = $2,
                zone_tags = $3,
                level_gap = $4,
                min_player_lv = $4,
                is_active = TRUE
            WHERE code = $1;
        `, [zone.code, zone.name, zone.tags, zone.level]);
    }
}

async function upsertPoi(config) {
    const poiCode = createScopedCode({
        scopeCode: config.zone.code,
        entityCode: config.poi.code,
        maxLength: 80,
    });
    const result = await config.client.query(`
        INSERT INTO world_pois
            (zone_id, code, display_name, poi_type, description, is_dungeon, entry_requirement)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (code) DO UPDATE SET
            zone_id = EXCLUDED.zone_id,
            display_name = EXCLUDED.display_name,
            poi_type = EXCLUDED.poi_type,
            description = EXCLUDED.description,
            is_dungeon = EXCLUDED.is_dungeon,
            entry_requirement = EXCLUDED.entry_requirement
        RETURNING id;
    `, [
        config.zoneId,
        poiCode,
        config.poi.name,
        config.poi.type,
        `${config.poi.name} is available through this zone's rotating POI pool.`,
        config.poi.isDungeon,
        config.poi.isDungeon ? 'Complete the sweep route to clear this dungeon.' : null,
    ]);

    return { id: result.rows[0].id, code: poiCode };
}

async function syncGameplayTags(config) {
    const gameplayTags = config.poi.gameplayTags
        .map(parseGameplayTag)
        .filter(Boolean);

    for (const gameplayTag of gameplayTags) {
        const isCombat = ['BATTLE', 'SKIRMISH', 'SWEEP'].includes(gameplayTag.tagType);
        await config.client.query(`
            INSERT INTO poi_gameplay_tags
                (poi_id, tag_type, action_type, energy_cost_mult,
                 loot_focus, monster_profile, dungeon_rank_rewards)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            ON CONFLICT (poi_id, tag_type) DO UPDATE SET
                action_type = EXCLUDED.action_type,
                energy_cost_mult = EXCLUDED.energy_cost_mult,
                loot_focus = EXCLUDED.loot_focus,
                monster_profile = EXCLUDED.monster_profile,
                dungeon_rank_rewards = EXCLUDED.dungeon_rank_rewards;
        `, [
            config.poiId,
            gameplayTag.tagType,
            gameplayTag.actionType,
            gameplayTag.tagType === 'SWEEP' ? 1.35 : (isCombat ? 1.15 : 1),
            config.poi.lootFocus,
            isCombat ? config.poi.monsterProfile : null,
            gameplayTag.tagType === 'SWEEP',
        ]);
    }

    const tagTypes = gameplayTags.map(tag => tag.tagType);
    await config.client.query(`
        DELETE FROM poi_gameplay_tags
        WHERE poi_id = $1
          AND tag_type <> ALL($2::TEXT[]);
    `, [config.poiId, tagTypes]);
}

async function syncRooms(config) {
    const rooms = findEligibleRooms({ zone: config.zone, poi: config.poi });
    const roomCodes = [];

    for (let index = 0; index < rooms.length; index++) {
        const room = rooms[index];
        const roomCode = createScopedCode({
            scopeCode: config.poiCode,
            entityCode: room.code,
            maxLength: 100,
        });
        roomCodes.push(roomCode);
        await config.client.query(`
            INSERT INTO world_poi_rooms
                (poi_id, code, display_name, room_type, room_tags, loot_focus, sort_order)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            ON CONFLICT (code) DO UPDATE SET
                poi_id = EXCLUDED.poi_id,
                display_name = EXCLUDED.display_name,
                room_type = EXCLUDED.room_type,
                room_tags = EXCLUDED.room_tags,
                loot_focus = EXCLUDED.loot_focus,
                sort_order = EXCLUDED.sort_order;
        `, [config.poiId, roomCode, room.name, room.type, room.roomTags, room.lootFocus, index + 1]);
    }

    await config.client.query(`
        DELETE FROM world_poi_rooms
        WHERE poi_id = $1
          AND code <> ALL($2::TEXT[]);
    `, [config.poiId, roomCodes]);
}

async function syncZonePoiPool(config) {
    const eligiblePois = findEligiblePois(config.zone);
    const poiCodes = [];

    for (const poi of eligiblePois) {
        const insertedPoi = await upsertPoi({
            client: config.client,
            zone: config.zone,
            zoneId: config.zoneId,
            poi,
        });
        poiCodes.push(insertedPoi.code);
        await syncGameplayTags({ client: config.client, poiId: insertedPoi.id, poi });
        await syncRooms({
            client: config.client,
            zone: config.zone,
            poi,
            poiId: insertedPoi.id,
            poiCode: insertedPoi.code,
        });
    }

    await config.client.query(`
        DELETE FROM world_pois
        WHERE zone_id = $1
          AND code <> ALL($2::TEXT[]);
    `, [config.zoneId, poiCodes]);
}

async function syncWorldPools(client) {
    for (const zone of WORKBOOK_WORLD_DATA.zones) {
        const zoneResult = await client.query('SELECT id FROM zones WHERE code = $1 LIMIT 1;', [zone.code]);
        if (!zoneResult.rows.length) continue;
        await syncZonePoiPool({ client, zone, zoneId: zoneResult.rows[0].id });
    }
}

async function seedWorkbookWorld() {
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');
        await updateZones(client);
        await syncWorldPools(client);
        await client.query('COMMIT');
        console.log(`[SUCCESS] Da dong bo ${WORKBOOK_WORLD_DATA.pois.length} POI va ${WORKBOOK_WORLD_DATA.rooms.length} room tu workbook.`);
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Khong the dong bo world pool tu workbook:', error.message);
        return false;
    } finally {
        client.release();
    }
}

module.exports = {
    seedWorkbookWorld,
};

// backend/src/repositories/repositories.actionQueue.js
//           Tach query lock va query lay zone thanh 2 buoc doc lap

const { dbPool } = require('./repositories.database');

async function insertActionSlot(playerId, zoneCode, actionType, baseDurationS, actualDurationS, resourceCost, actionContext) {
    if (!playerId || !actionType || !baseDurationS) return null;

    const cost = resourceCost || {};
    const energyCost = Math.max(0, parseInt(cost.energyCost) || 0);
    const fatigueChange = parseInt(cost.fatigueChange) || 0;
    const projectedFatigueGain = Math.max(0, fatigueChange);
    const context = actionContext || {};
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');

        const activeCheck = await client.query(
            `SELECT COUNT(*) FROM action_queue WHERE player_id = $1 AND status = 'PENDING';`,
            [playerId]
        );
        const activeCount = parseInt(activeCheck.rows[0].count);
        if (activeCount >= 3) {
            await client.query('ROLLBACK');
            return { error: 'Action slots are full (maximum 3 slots). Wait for an existing action to finish.' };
        }

        let zoneId = null;
        let poiId = context.poiId || null;
        if (zoneCode) {
            const zoneResult = await client.query(
                `SELECT id FROM zones WHERE code = $1 AND is_active = TRUE;`,
                [zoneCode]
            );
            if (zoneResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return { error: `Zone does not exist or is locked: ${zoneCode}` };
            }
            zoneId = zoneResult.rows[0].id;
        }

        if (poiId) {
            const poiResult = await client.query(
                `SELECT id FROM world_pois WHERE id = $1 AND zone_id = $2;`,
                [poiId, zoneId]
            );
            if (poiResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return { error: 'POI does not belong to the selected map.' };
            }
        }

        const playerResult = await client.query(
            `SELECT current_energy, max_energy, current_fatigue, max_fatigue
             FROM players WHERE id = $1 FOR UPDATE;`,
            [playerId]
        );
        if (playerResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return { error: 'Character not found.' };
        }

        const player = playerResult.rows[0];
        const currentEnergy = parseInt(player.current_energy) || 0;
        const maxFatigue = parseInt(player.max_fatigue) || 400;
        const currentFatigue = parseInt(player.current_fatigue) || 0;

        if (currentEnergy < energyCost) {
            await client.query('ROLLBACK');
            return { error: `Not enough energy. Need ${energyCost}, current ${currentEnergy}. Eat food or rest before continuing.` };
        }

        const pendingFatigueResult = await client.query(
            `SELECT COALESCE(SUM(GREATEST(fatigue_change, 0)), 0) AS pending_fatigue
             FROM action_queue
             WHERE player_id = $1 AND status = 'PENDING';`,
            [playerId]
        );
        const pendingFatigue = parseInt(pendingFatigueResult.rows[0].pending_fatigue) || 0;
        if (projectedFatigueGain > 0 && currentFatigue + pendingFatigue + projectedFatigueGain > maxFatigue) {
            await client.query('ROLLBACK');
            return { error: `Too fatigued for this action. Rest or sleep before taking on more work.` };
        }

        const startTime = new Date();
        const completesAt = new Date(startTime.getTime() + actualDurationS * 1000);
        const slotIndex = activeCount + 1;

        const result = await client.query(`
            INSERT INTO action_queue
                (player_id, slot_index, action_type, target_zone_id, status, started_at,
                 base_duration_s, actual_duration_s, completes_at, energy_cost, fatigue_change,
                 target_poi_id, gameplay_tag, dungeon_mode)
            VALUES ($1, $2, $3, $4, 'PENDING', $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *;
        `, [
            playerId, slotIndex, actionType.toUpperCase(), zoneId, startTime,
            baseDurationS, actualDurationS, completesAt, energyCost, fatigueChange,
            poiId, context.gameplayTag || null, context.dungeonMode || 'NORMAL'
        ]);

        const updatedPlayer = await client.query(`
            UPDATE players
            SET current_energy = GREATEST(0, current_energy - $1),
                updated_at = NOW()
            WHERE id = $2
            RETURNING current_energy, max_energy, current_fatigue, max_fatigue;
        `, [energyCost, playerId]);

        await client.query('COMMIT');

        console.log(`[SUCCESS] Dang ky hanh dong ${actionType} slot ${slotIndex} cho player ${playerId}`);
        return {
            ...result.rows[0],
            player_resources: updatedPlayer.rows[0],
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi khi insert action_queue:', error.message);
        return null;
    } finally {
        client.release();
    }
}

async function findActiveQueueByPlayer(playerId) {
    if (!playerId) return [];

    try {
        const result = await dbPool.query(`
            SELECT aq.*, z.display_name as zone_name, z.zone_type, z.biome, z.level_gap,
                   z.infection_risk, z.radiation_risk, z.min_player_lv as zone_min_level,
                   wp.display_name as poi_name, wp.poi_type
            FROM action_queue aq
            LEFT JOIN zones z ON z.id = aq.target_zone_id
            LEFT JOIN world_pois wp ON wp.id = aq.target_poi_id
            WHERE aq.player_id = $1 AND aq.status = 'PENDING'
            ORDER BY aq.slot_index ASC;
        `, [playerId]);
        return result.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi lay action queue:', error.message);
        return [];
    }
}

async function findCompletedQueueByPlayer(playerId, limitCount) {
    if (!playerId) return [];

    const limit = limitCount || 20;
    try {
        const result = await dbPool.query(`
            SELECT aq.*, z.display_name as zone_name, z.zone_type, z.biome, z.level_gap,
                   wp.display_name as poi_name, wp.poi_type
            FROM action_queue aq
            LEFT JOIN zones z ON z.id = aq.target_zone_id
            LEFT JOIN world_pois wp ON wp.id = aq.target_poi_id
            WHERE aq.player_id = $1 AND aq.status = 'COMPLETED'
            ORDER BY aq.claimed_at DESC
            LIMIT $2;
        `, [playerId, limit]);
        return result.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi lay lich su action:', error.message);
        return [];
    }
}

async function claimActionSlot(actionId, playerId) {
    if (!actionId || !playerId) return null;

    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        // Fix: chi lock bang action_queue, KHONG JOIN trong lenh FOR UPDATE
        const lockResult = await client.query(
            `SELECT * FROM action_queue WHERE id = $1 AND player_id = $2 FOR UPDATE;`,
            [actionId, playerId]
        );

        if (lockResult.rows.length === 0) {
            throw new Error('Action not found or you do not have permission to access it.');
        }

        const slot = lockResult.rows[0];

        if (slot.status !== 'PENDING') {
            throw new Error(`This action is already in status: ${slot.status}. It cannot be claimed.`);
        }

        const now = new Date();
        if (now < new Date(slot.completes_at)) {
            const remaining = Math.ceil((new Date(slot.completes_at) - now) / 1000);
            throw new Error(`Action is not complete yet. ${remaining} seconds remaining.`);
        }

        // Danh dau COMPLETED
        const updResult = await client.query(`
            UPDATE action_queue
            SET status = 'COMPLETED', claimed_at = NOW()
            WHERE id = $1
            RETURNING *;
        `, [actionId]);

        await client.query('COMMIT');

        // Lay thong tin zone rieng — sau khi da commit, khong can lock
        let zoneData = { infection_risk: 0, radiation_risk: 0, zone_min_level: 1, zone_type: 'safe', level_gap: 1 };
        if (slot.target_zone_id) {
            const zoneResult = await dbPool.query(
                `SELECT zone_type, level_gap, infection_risk, radiation_risk, min_player_lv as zone_min_level
                 FROM zones WHERE id = $1;`,
                [slot.target_zone_id]
            );
            if (zoneResult.rows.length > 0) {
                zoneData = zoneResult.rows[0];
            }
        }

        console.log(`[SUCCESS] Claim hanh dong ${slot.action_type} cho player ${playerId}`);
        return {
            ...updResult.rows[0],
            infection_risk:  zoneData.infection_risk,
            radiation_risk:  zoneData.radiation_risk,
            zone_min_level:  zoneData.zone_min_level,
            zone_type:       zoneData.zone_type,
            level_gap:       zoneData.level_gap
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi khi claim action:', error.message);
        return { error: error.message };
    } finally {
        client.release();
    }
}

async function applyClaimResourceChange(playerId, claimedAction) {
    if (!playerId || !claimedAction) return null;

    const fatigueChange = parseInt(claimedAction.fatigue_change) || 0;
    const actionType = (claimedAction.action_type || '').toUpperCase();
    const isRecoveryAction = ['REST', 'SLEEP'].includes(actionType);
    const energyRestore = isRecoveryAction ? Math.max(0, Math.floor((claimedAction.actual_duration_s || 0) / 1800) * (actionType === 'SLEEP' ? 4 : 2)) : 0;

    try {
        const result = await dbPool.query(`
            UPDATE players
            SET current_fatigue = LEAST(max_fatigue, GREATEST(0, current_fatigue + $1)),
                current_energy = LEAST(max_energy, current_energy + $2),
                updated_at = NOW()
            WHERE id = $3
            RETURNING current_energy, max_energy, current_fatigue, max_fatigue;
        `, [fatigueChange, energyRestore, playerId]);

        return result.rows[0] || null;
    } catch (error) {
        console.error('[WARN] Loi khi cap nhat energy/fatigue:', error.message);
        return null;
    }
}

async function updateClaimRewards(actionId, expEarned, jobExpEarned) {
    if (!actionId) return;

    try {
        await dbPool.query(`
            UPDATE action_queue
            SET exp_earned = $1, job_exp_earned = $2
            WHERE id = $3;
        `, [expEarned || 0, jobExpEarned || 0, actionId]);
    } catch (error) {
        console.error('[WARN] Loi khi cap nhat reward vao action_queue:', error.message);
    }
}

async function cancelActionSlot(actionId, playerId) {
    if (!actionId || !playerId) return null;

    try {
        const result = await dbPool.query(`
            UPDATE action_queue
            SET status = 'CANCELLED'
            WHERE id = $1 AND player_id = $2 AND status = 'PENDING'
            RETURNING *;
        `, [actionId, playerId]);

        if (result.rows.length === 0) {
            return { error: 'No pending action found to cancel.' };
        }

        console.log(`[INFO] Da huy hanh dong ${actionId}`);
        return result.rows[0];
    } catch (error) {
        console.error('[ERROR] Loi khi huy action:', error.message);
        return null;
    }
}

module.exports = {
    insertActionSlot,
    findActiveQueueByPlayer,
    findCompletedQueueByPlayer,
    claimActionSlot,
    applyClaimResourceChange,
    updateClaimRewards,
    cancelActionSlot
};

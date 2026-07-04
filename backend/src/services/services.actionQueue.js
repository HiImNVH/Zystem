// backend/src/services/services.actionQueue.js

const characterRepository = require('../repositories/repositories.character');
const actionQueueRepository = require('../repositories/repositories.actionQueue');
const combatService = require('./services.combat');
const progressionService = require('./services.progression');
const lootService = require('./services.loot');
const walletRepository = require('../repositories/repositories.wallet');
const { dbPool } = require('../repositories/repositories.database');

const ACTION_SKILL_CODE = {
    EXPLORE: 'scavenging',
    BATTLE: 'fighting',
    MINE: 'gathering',
    CHOP: 'gathering',
    HUNT: 'gathering',
    FORAGE: 'gathering',
    CRAFT: 'crafting',
    TRADE: 'crafting',
    FARM: 'gathering',
};

// AGI giam thoi gian hang doi: moi 1 AGI giam 0.2%, cap 70%
function calculateActualDuration(baseDurationS, agiStat) {
    const agi = agiStat || 0;
    const reduction = Math.min(agi * 0.002, 0.70);
    return Math.max(Math.floor(baseDurationS * (1 - reduction)), 10);
}

function calculateExpReward(actionType, durationSeconds, zoneMinLevel) {
    if (!actionType || !durationSeconds) return { playerExp: 0, jobExp: 0 };

    const baseExpPerSecond = {
        EXPLORE: 0.8,
        BATTLE:  0.9,
        MINE:    0.3,
        CHOP:    0.3,
        HUNT:    0.5,
        FORAGE:  0.2,
        CRAFT:   0.4,
        TRADE:   0.3,
        FARM:    0.2,
    };

    const ratePerSecond = baseExpPerSecond[actionType.toUpperCase()] || 0.3;
    const zoneLevelMult = 1 + ((zoneMinLevel || 1) - 1) * 0.05;
    const totalExp = Math.floor(ratePerSecond * durationSeconds * zoneLevelMult);

    const isExploreAction = ['EXPLORE', 'HUNT', 'BATTLE'].includes(actionType.toUpperCase());
    const playerExpRatio = isExploreAction ? 0.7 : 0.3;

    return {
        playerExp: Math.floor(totalExp * playerExpRatio),
        jobExp:    Math.floor(totalExp * (1 - playerExpRatio))
    };
}

function getRarityValue(rarity) {
    const rarityKey = (rarity || 'COMMON').toUpperCase();
    const rarityMult = {
        COMMON: 1,
        UNCOMMON: 2,
        RARE: 4,
        EPIC: 8,
        LEGENDARY: 16,
    };
    return rarityMult[rarityKey] || rarityMult.COMMON;
}

async function processTradeAction(playerId, durationSeconds, chrStat) {
    const itemLimit = Math.min(5, Math.max(1, Math.floor(durationSeconds / 300) + 1));
    const tradeItems = await dbPool.query(`
        SELECT i.id, i.quantity, i.rarity, it.item_level, it.category, it.display_name
        FROM items i
        JOIN item_templates it ON i.template_id = it.id
        WHERE i.owner_player_id = $1
          AND i.is_equipped = FALSE
          AND it.category IN ('RUBBISH', 'MATERIAL')
        ORDER BY it.category ASC, it.item_level ASC, i.created_at ASC
        LIMIT $2;
    `, [playerId, itemLimit]);

    let copperGained = Math.max(5, Math.floor((durationSeconds / 60) * (1 + (chrStat || 10) / 100)));
    const soldItems = [];

    for (const item of tradeItems.rows) {
        const unitValue = Math.max(1, Math.floor((item.item_level || 1) * getRarityValue(item.rarity) * 3));
        copperGained += unitValue;
        soldItems.push({
            id: item.id,
            name: item.display_name,
            category: item.category,
            copper: unitValue
        });

        if (item.quantity > 1) {
            await dbPool.query(`UPDATE items SET quantity = quantity - 1 WHERE id = $1;`, [item.id]);
        } else {
            await dbPool.query(`DELETE FROM items WHERE id = $1;`, [item.id]);
        }
    }

    const walletResult = await walletRepository.modifyWalletBalance(playerId, 'copper', copperGained, 'DEPOSIT');
    if (!walletResult.success) {
        return { copper_gained: 0, sold_items: [], trade_error: walletResult.message };
    }

    return {
        copper_gained: copperGained,
        sold_items: soldItems,
        balance_after: walletResult.balanceAfter
    };
}

// Ham chinh — kich hoat sau khi claim, tinh toan tat ca reward
async function processClaimedAction(playerId, claimedAction) {
    if (!playerId || !claimedAction) return null;

    const character = await characterRepository.findCharacterById(playerId);
    if (!character) return null;

    const actionType     = claimedAction.action_type;
    const durationSeconds = claimedAction.actual_duration_s || claimedAction.base_duration_s;
    const zoneMinLevel   = claimedAction.zone_min_level || 1;

    // 1. Tinh EXP
    const expReward = calculateExpReward(actionType, durationSeconds, zoneMinLevel);

    // 2. Cap nhat Player EXP va len cap neu du
    const progressionResult = await progressionService.processPlayerExpGain(
        playerId, expReward.playerExp
    );

    const skillCode = ACTION_SKILL_CODE[actionType?.toUpperCase()];
    if (skillCode && expReward.jobExp > 0) {
        const skillResult = await dbPool.query(
            `SELECT id FROM jobs_seed WHERE code = $1 AND is_available = TRUE;`,
            [skillCode]
        );
        if (skillResult.rows.length > 0) {
            await progressionService.processJobExpGain(playerId, skillResult.rows[0].id, expReward.jobExp);
        }
    }

    // 3. Tinh Infection va Radiation tich luy trong thoi gian action
    let infectionGained = 0;
    let radiationGained = 0;

    const infectionRisk = parseFloat(claimedAction.infection_risk) || 0;
    const radiationRisk = parseFloat(claimedAction.radiation_risk) || 0;

    if (infectionRisk > 0 || radiationRisk > 0) {
        const infPerSecond = combatService.calculateInfectionGain(infectionRisk, character.base_vit);
        const radPerSecond = combatService.calculateRadiationGain(radiationRisk, character.base_vit);

        infectionGained = Math.min(
            (infPerSecond * durationSeconds) / 60,
            100 - parseFloat(character.infection_pct)
        );
        radiationGained = Math.min(
            (radPerSecond * durationSeconds) / 60,
            100 - parseFloat(character.radiation_pct)
        );

        if (infectionGained > 0 || radiationGained > 0) {
            const newInfection = parseFloat(character.infection_pct) + infectionGained;
            const newRadiation = parseFloat(character.radiation_pct) + radiationGained;

            let infectionStatus = 'HEALTHY';
            if (newInfection >= 90)      infectionStatus = 'CRITICAL';
            else if (newInfection >= 50) infectionStatus = 'INFECTED';
            else if (newInfection >= 20) infectionStatus = 'EXPOSED';

            await characterRepository.updateCharacterStats(playerId, {
                infection_pct:    Math.min(newInfection, 100).toFixed(2),
                radiation_pct:    Math.min(newRadiation, 100).toFixed(2),
                infection_status: infectionStatus
            });
        }
    }

    // 4. Roll loot drop
    const lootResult = await lootService.processLootDrop(
        playerId, claimedAction, character.base_dex
    );

    // 5. Home economy: TRADE turns surplus resources into copper.
    let economyResult = { copper_gained: 0, sold_items: [] };
    if (actionType?.toUpperCase() === 'TRADE') {
        economyResult = await processTradeAction(playerId, durationSeconds, character.base_chr);
    }

    // 6. Luu exp da tinh vao bang action_queue de audit
    await actionQueueRepository.updateClaimRewards(
        claimedAction.id, expReward.playerExp, expReward.jobExp
    );

    console.log(`[SUCCESS] Xu ly claim ${actionType} cho player ${playerId}: ` +
        `+${expReward.playerExp} EXP, +${lootResult.items_dropped.length} item, ` +
        `+${economyResult.copper_gained || 0} copper, +${infectionGained.toFixed(2)}% Infection`);

    return {
        exp_gained:        expReward.playerExp,
        job_exp_gained:    expReward.jobExp,
        infection_gained:  parseFloat(infectionGained.toFixed(2)),
        radiation_gained:  parseFloat(radiationGained.toFixed(2)),
        items_dropped:     lootResult.items_dropped,
        copper_gained:     economyResult.copper_gained || 0,
        sold_items:        economyResult.sold_items || [],
        economy_error:     economyResult.trade_error || null,
        leveled_up:        progressionResult?.leveled_up  || false,
        new_level:         progressionResult?.new_level   || character.player_level
    };
}

module.exports = {
    calculateActualDuration,
    calculateExpReward,
    processClaimedAction
};

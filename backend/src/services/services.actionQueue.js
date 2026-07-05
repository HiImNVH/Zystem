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
    DUNGEON: 'fighting',
    FORAGE: 'gathering',
    CRAFT: 'crafting',
    TRADE: 'crafting',
    FARM: 'gathering',
    REST: null,
    SLEEP: null,
};

const BASE_MAX_ENERGY = 100;
const MAX_FATIGUE = 400;
const FATIGUE_TIRED_THRESHOLD = 300;
const FATIGUE_EXHAUSTED_THRESHOLD = 350;

const ACTION_RESOURCE_RULES = {
    EXPLORE: { energyPerUnit: 8, fatiguePerUnit: 10 },
    BATTLE:  { energyPerUnit: 10, fatiguePerUnit: 12 },
    MINE:    { energyPerUnit: 7, fatiguePerUnit: 9 },
    CHOP:    { energyPerUnit: 6, fatiguePerUnit: 8 },
    HUNT:    { energyPerUnit: 9, fatiguePerUnit: 11 },
    DUNGEON: { energyPerUnit: 14, fatiguePerUnit: 18 },
    FORAGE:  { energyPerUnit: 4, fatiguePerUnit: 6 },
    CRAFT:   { energyPerUnit: 5, fatiguePerUnit: 5 },
    TRADE:   { energyPerUnit: 2, fatiguePerUnit: 3 },
    FARM:    { energyPerUnit: 4, fatiguePerUnit: 5 },
    REST:    { energyPerUnit: 0, fatiguePerUnit: -16 },
    SLEEP:   { energyPerUnit: 0, fatiguePerUnit: -28 },
};

const ZONE_FATIGUE_MULTIPLIER = {
    safe: 0.75,
    urban: 1.05,
    rural: 0.95,
    coast: 1.1,
    forest: 1.0,
    mine: 1.1,
    ruins: 1.2,
    dungeon: 1.25,
    hazard: 1.35,
    desert: 1.45,
};

const ACTION_SPEED_GROUP = {
    CRAFT: 'COOKING',
    TRADE: 'COOKING',
    MINE: 'GATHERING',
    CHOP: 'GATHERING',
    HUNT: 'GATHERING',
    FORAGE: 'GATHERING',
    FARM: 'GATHERING',
    EXPLORE: 'EXPLORING',
    BATTLE: 'EXPLORING',
    DUNGEON: 'EXPLORING',
};

function calculateMaxEnergy(vitStat, strStat) {
    const vit = parseFloat(vitStat) || 0;
    const str = parseFloat(strStat) || 0;
    return Math.max(1, Math.floor(BASE_MAX_ENERGY + vit + (str * 0.2)));
}

function calculateActionResourceCost(actionType, durationSeconds, zoneType, tagMultipliers) {
    const type = (actionType || '').toUpperCase();
    const rule = ACTION_RESOURCE_RULES[type] || ACTION_RESOURCE_RULES.EXPLORE;
    const actionUnits = Math.max(1, Math.ceil((parseInt(durationSeconds) || 0) / 1800));
    const zoneKey = (zoneType || 'safe').toLowerCase();
    const fatigueMultiplier = ZONE_FATIGUE_MULTIPLIER[zoneKey] || 1;
    const isRecoveryAction = rule.fatiguePerUnit < 0;

    const energyMultiplier = parseFloat(tagMultipliers?.energyCostMult) || 1;
    const tagFatigueMultiplier = parseFloat(tagMultipliers?.fatigueMult) || 1;
    const rawFatigue = rule.fatiguePerUnit * actionUnits * (isRecoveryAction ? 1 : fatigueMultiplier * tagFatigueMultiplier);

    return {
        energyCost: Math.max(0, Math.ceil(rule.energyPerUnit * actionUnits * energyMultiplier)),
        fatigueChange: isRecoveryAction ? Math.floor(rawFatigue) : Math.ceil(rawFatigue),
        actionUnits,
        zoneFatigueMultiplier: fatigueMultiplier,
        energyCostMultiplier: energyMultiplier,
        tagFatigueMultiplier
    };
}

function calculateFatigueDurationMultiplier(currentFatigue) {
    const fatigue = parseFloat(currentFatigue) || 0;
    if (fatigue >= FATIGUE_EXHAUSTED_THRESHOLD) return 1.35;
    if (fatigue >= FATIGUE_TIRED_THRESHOLD) return 1.15;
    return 1;
}

function calculateDungeonScaling(mapLevel, playerLevels, dungeonMode) {
    const staticMapLevel = Math.max(1, parseInt(mapLevel) || 1);
    const levels = (playerLevels || []).map(level => parseInt(level) || 1);
    const highestPlayerLevel = Math.max(staticMapLevel, ...levels);
    const isHardMode = (dungeonMode || 'NORMAL').toUpperCase() === 'HARD';
    const dungeonLevel = isHardMode ? highestPlayerLevel : staticMapLevel;

    return {
        mode: isHardMode ? 'HARD' : 'NORMAL',
        static_map_level: staticMapLevel,
        dungeon_level: dungeonLevel,
        highest_player_level: highestPlayerLevel,
        aura_buff_enabled: isHardMode && highestPlayerLevel > staticMapLevel,
        low_level_aura: {
            max_hp_multiplier: isHardMode ? 2.5 : 1,
            armor_multiplier: isHardMode ? 2.0 : 1,
            damage_multiplier: 1,
        },
    };
}

function normalizeActionStats(statsOrAgi) {
    if (typeof statsOrAgi === 'number' || typeof statsOrAgi === 'string') {
        return {
            agi: parseFloat(statsOrAgi) || 0,
            dex: 0,
            chr: 0,
        };
    }

    return {
        agi: parseFloat(statsOrAgi?.agi ?? statsOrAgi?.base_agi) || 0,
        dex: parseFloat(statsOrAgi?.dex ?? statsOrAgi?.base_dex) || 0,
        chr: parseFloat(statsOrAgi?.chr ?? statsOrAgi?.base_chr) || 0,
    };
}

function calculateActionSpeedReduction(actionType, statsOrAgi) {
    const action = (actionType || '').toUpperCase();
    const speedGroup = ACTION_SPEED_GROUP[action] || 'EXPLORING';
    const stats = normalizeActionStats(statsOrAgi);

    const percentReduction = {
        COOKING: (stats.agi / 20) + (stats.chr / 10),
        GATHERING: (stats.agi / 20) + (stats.dex / 10),
        EXPLORING: stats.agi / 10,
    }[speedGroup] || 0;

    return Math.min(Math.max(percentReduction / 100, 0), 0.70);
}

// Legacy fallback: AGI giam thoi gian hang doi, giu de tuong thich voi code/test cu.
function calculateActualDuration(baseDurationS, agiStat) {
    const agi = agiStat || 0;
    const reduction = Math.min(agi * 0.002, 0.70);
    return Math.max(Math.floor(baseDurationS * (1 - reduction)), 10);
}

function calculateActionActualDuration(baseDurationS, actionType, statsOrAgi) {
    const reduction = calculateActionSpeedReduction(actionType, statsOrAgi);
    return Math.max(Math.floor(baseDurationS * (1 - reduction)), 10);
}

function calculateActualDurationWithFatigue(baseDurationS, agiStat, currentFatigue) {
    return Math.ceil(calculateActualDuration(baseDurationS, agiStat) * calculateFatigueDurationMultiplier(currentFatigue));
}

function calculateActionActualDurationWithFatigue(baseDurationS, actionType, statsOrAgi, currentFatigue) {
    return Math.ceil(
        calculateActionActualDuration(baseDurationS, actionType, statsOrAgi) *
        calculateFatigueDurationMultiplier(currentFatigue)
    );
}

function calculateExpReward(actionType, durationSeconds, zoneMinLevel) {
    if (!actionType || !durationSeconds) return { playerExp: 0, jobExp: 0 };

    const normalizedActionType = actionType.toUpperCase();
    if (['REST', 'SLEEP'].includes(normalizedActionType)) {
        return { playerExp: 0, jobExp: 0 };
    }

    const baseExpPerSecond = {
        EXPLORE: 0.8,
        BATTLE:  0.9,
        MINE:    0.3,
        CHOP:    0.3,
        HUNT:    0.5,
        DUNGEON: 1.0,
        FORAGE:  0.2,
        CRAFT:   0.4,
        TRADE:   0.3,
        FARM:    0.2,
    };

    const ratePerSecond = baseExpPerSecond[normalizedActionType] || 0.3;
    const zoneLevelMult = 1 + ((zoneMinLevel || 1) - 1) * 0.05;
    const totalExp = Math.floor(ratePerSecond * durationSeconds * zoneLevelMult);

    const isExploreAction = ['EXPLORE', 'HUNT', 'BATTLE', 'DUNGEON'].includes(normalizedActionType);
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
    const dungeonContext = actionType?.toUpperCase() === 'DUNGEON'
        ? calculateDungeonScaling(claimedAction.level_gap || zoneMinLevel, [character.player_level], claimedAction.dungeon_mode)
        : null;

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
    const lootResult = await lootService.processLootDrop(playerId, claimedAction);

    // 5. Home economy: TRADE turns surplus resources into copper.
    let economyResult = { copper_gained: 0, sold_items: [] };
    if (actionType?.toUpperCase() === 'TRADE') {
        economyResult = await processTradeAction(playerId, durationSeconds, character.base_chr);
    }

    // 6. Luu exp da tinh vao bang action_queue de audit
    const resourceResult = await actionQueueRepository.applyClaimResourceChange(playerId, claimedAction);

    // 7. Luu exp da tinh vao bang action_queue de audit
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
        resource_update:    resourceResult,
        dungeon_context:    dungeonContext,
        leveled_up:        progressionResult?.leveled_up  || false,
        new_level:         progressionResult?.new_level   || character.player_level
    };
}

module.exports = {
    MAX_FATIGUE,
    FATIGUE_TIRED_THRESHOLD,
    FATIGUE_EXHAUSTED_THRESHOLD,
    calculateMaxEnergy,
    calculateActionResourceCost,
    calculateFatigueDurationMultiplier,
    calculateDungeonScaling,
    calculateActionSpeedReduction,
    calculateActualDuration,
    calculateActionActualDuration,
    calculateActualDurationWithFatigue,
    calculateActionActualDurationWithFatigue,
    calculateExpReward,
    processClaimedAction
};

// backend/src/services/services.actionQueue.js
// Version: 3.0
// Cap nhat: Tich hop loot drop vao processClaimedAction
//           Luu exp_earned va job_exp_earned vao DB sau khi tinh xong

const characterRepository = require('../repositories/repositories.character');
const actionQueueRepository = require('../repositories/repositories.actionQueue');
const combatService = require('./services.combat');
const progressionService = require('./services.progression');
const lootService = require('./services.loot');

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
        MINE:    0.3,
        CHOP:    0.3,
        HUNT:    0.5,
        FORAGE:  0.2,
        CRAFT:   0.4,
        FARM:    0.2,
    };

    const ratePerSecond = baseExpPerSecond[actionType.toUpperCase()] || 0.3;
    const zoneLevelMult = 1 + ((zoneMinLevel || 1) - 1) * 0.05;
    const totalExp = Math.floor(ratePerSecond * durationSeconds * zoneLevelMult);

    const isExploreAction = ['EXPLORE', 'HUNT'].includes(actionType.toUpperCase());
    const playerExpRatio = isExploreAction ? 0.7 : 0.3;

    return {
        playerExp: Math.floor(totalExp * playerExpRatio),
        jobExp:    Math.floor(totalExp * (1 - playerExpRatio))
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

    // 5. Luu exp da tinh vao bang action_queue de audit
    await actionQueueRepository.updateClaimRewards(
        claimedAction.id, expReward.playerExp, expReward.jobExp
    );

    console.log(`[SUCCESS] Xu ly claim ${actionType} cho player ${playerId}: ` +
        `+${expReward.playerExp} EXP, +${lootResult.items_dropped.length} item, ` +
        `+${infectionGained.toFixed(2)}% Infection`);

    return {
        exp_gained:        expReward.playerExp,
        job_exp_gained:    expReward.jobExp,
        infection_gained:  parseFloat(infectionGained.toFixed(2)),
        radiation_gained:  parseFloat(radiationGained.toFixed(2)),
        items_dropped:     lootResult.items_dropped,
        leveled_up:        progressionResult?.leveled_up  || false,
        new_level:         progressionResult?.new_level   || character.player_level
    };
}

module.exports = {
    calculateActualDuration,
    calculateExpReward,
    processClaimedAction
};

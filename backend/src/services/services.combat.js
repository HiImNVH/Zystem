// backend/src/services/services.combat.js
// Tinh toan chi so chien dau theo sheet KY NANG VA CHI SO

// Cong thuc giam sat thuong theo Balance Sheet: Armor / (Armor + K), K = PlayerLevel + 40
function calculateDefenseReduction(armor, playerLevel) {
    if (!armor || armor < 0 || !playerLevel || playerLevel < 1) return 0;

    const constantK = playerLevel + 40;
    const reductionRatio = armor / (armor + constantK);

    // Tra ve ty le tu 0 den 1 (chua nhan 100)
    return Math.min(reductionRatio, 0.9); // Cap toi da 90% giam sat thuong
}

function calculateMaxHp(stats) {
    const vit = stats?.vit || 0;
    const str = stats?.str || 0;
    const playerLevel = stats?.playerLevel || 1;
    const baseHp = 100;
    return Math.floor(baseHp + vit * 4 + str * 0.5 + playerLevel * 10);
}

function calculateAttack(strStat, weaponAttack) {
    return parseFloat(((weaponAttack || 0) + (strStat || 0)).toFixed(2));
}

function calculateDefense(vitStat, equipmentDefense) {
    return parseFloat(((equipmentDefense || 0) + (vitStat || 0) / 5).toFixed(2));
}

// Tinh ty le ne duong: moi 1 AGI cho 0.05% dodge, cap 50%
// Ne duong dua tren AGI theo Balance Sheet
function calculateDodgeRate(agiStat) {
    const agi = agiStat || 0;
    return Math.min(agi * 0.0005, 0.50); // 0.05% per AGI, cap 50%
}

// Tinh ty le chi mang: base 5% + tang tu DEX va Gear
// DEX anh huong den chi mang theo Balance Sheet
function calculateCritRate(dexStat, gearCritBonus) {
    const baseCrit = 0.05;
    const dexBonus = (dexStat || 0) * 0.001; // 0.1% per DEX
    const gearBonus = gearCritBonus || 0;
    return Math.min(baseCrit + dexBonus + gearBonus, 1.0); // Cap 100%
}

// Tinh sat thuong chi mang: base 1.5x, co the tang tu gear
function calculateCritDamage(gearCritDmgBonus) {
    return 1.5 + (gearCritDmgBonus || 0);
}

// Tinh tong sat thuong trong mot don danh PvP (theo kich ban torn.com)
// Nguoi tan cong luon di truoc, AGI cua nan nhan quyet dinh ty le ne
function calculateAttackDamage(attackerStats, defenderStats) {
    if (!attackerStats || !defenderStats) return 0;

    const baseAtk = calculateAttack(attackerStats.base_str || 0, attackerStats.weapon_attack || 0);
    const critRate = calculateCritRate(attackerStats.base_dex, 0);
    const isCrit = Math.random() < critRate;
    const critMult = isCrit ? calculateCritDamage(0) : 1;

    const dodgeRate = calculateDodgeRate(defenderStats.base_agi);
    const isDodged = Math.random() < dodgeRate;

    if (isDodged) {
        return { damage: 0, is_crit: false, is_dodged: true };
    }

    const rawDamage = baseAtk * critMult;
    const defenseReduction = calculateDefenseReduction(
        defenderStats.armor_total || 0,
        defenderStats.player_level || 1
    );
    const finalDamage = Math.floor(rawDamage * (1 - defenseReduction));

    return {
        damage: Math.max(1, finalDamage), // Toi thieu 1 sat thuong
        is_crit: isCrit,
        is_dodged: false
    };
}

// Tinh toc do tich luy Infection dua vao zone_risk va VIT
function calculateInfectionGain(zoneInfectionRisk, vitStat) {
    if (!zoneInfectionRisk || zoneInfectionRisk <= 0) return 0;

    // VIT giam toc do nhiem: moi 1 VIT giam 0.5% toc do tichluy
    const vitReduction = Math.min((vitStat || 10) * 0.005, 0.75); // Cap 75% giam
    const actualRisk = zoneInfectionRisk * (1 - vitReduction);

    return Math.max(0, actualRisk);
}

// Tinh toc do tich luy Radiation dua vao zone_risk va VIT
function calculateRadiationGain(zoneRadiationRisk, vitStat) {
    if (!zoneRadiationRisk || zoneRadiationRisk <= 0) return 0;

    // Phong xa it bi VIT anh huong hon Infection (chi giam 25%)
    const vitReduction = Math.min((vitStat || 10) * 0.002, 0.25);
    const actualRisk = zoneRadiationRisk * (1 - vitReduction);

    return Math.max(0, actualRisk);
}

module.exports = {
    calculateDefenseReduction,
    calculateMaxHp,
    calculateAttack,
    calculateDefense,
    calculateDodgeRate,
    calculateCritRate,
    calculateCritDamage,
    calculateAttackDamage,
    calculateInfectionGain,
    calculateRadiationGain
};

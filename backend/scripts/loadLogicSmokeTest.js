// backend/scripts/loadLogicSmokeTest.js

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_USER = process.env.DB_USER || 'zystem_test';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'zystem_test';
process.env.DB_NAME = process.env.DB_NAME || 'zystem_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'zystem_test_secret';

const backendRoot = path.resolve(__dirname, '..');
const sourceRoot = path.join(backendRoot, 'src');

function findJavaScriptFiles(directoryPath) {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(directoryPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...findJavaScriptFiles(entryPath));
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            files.push(entryPath);
        }
    }

    return files;
}

function requireModule(modulePath) {
    const relativePath = path.relative(backendRoot, modulePath).replaceAll(path.sep, '/');
    try {
        return {
            relativePath,
            exports: require(modulePath),
        };
    } catch (error) {
        error.message = `${relativePath}: ${error.message}`;
        throw error;
    }
}

function assertExportedFunction(moduleExports, functionName) {
    assert.equal(typeof moduleExports[functionName], 'function', `${functionName} phai la function`);
}

function runPureLogicChecks(modulesByPath) {
    const combat = modulesByPath['src/services/services.combat.js'];
    const crafting = modulesByPath['src/services/services.crafting.js'];
    const itemStats = modulesByPath['src/services/services.itemStats.js'];
    const progression = modulesByPath['src/services/services.progression.js'];
    const actionQueue = modulesByPath['src/services/services.actionQueue.js'];
    const character = modulesByPath['src/repositories/repositories.character.js'];
    const auth = modulesByPath['src/middleware/middleware.auth.js'];
    const loot = modulesByPath['src/services/services.loot.js'];
    const curelPower = modulesByPath['src/services/services.curelPower.js'];
    const itemLifecycle = modulesByPath['src/services/services.itemLifecycle.js'];
    const designSeed = modulesByPath['src/repositories/repositories.designSeed.js'];
    const itemsSeed = modulesByPath['src/repositories/repositories.itemsSeed.js'];
    const skillsSeed = modulesByPath['src/repositories/repositories.skillsSeed.js'];

    assertExportedFunction(combat, 'calculateMaxHp');
    assert.equal(combat.calculateMaxHp({ vit: 10, str: 4, playerLevel: 2 }), 162);
    assert.equal(combat.calculateAttack(7, 12), 19);
    assert.equal(combat.calculateDefense(10, 3), 5);

    assertExportedFunction(crafting, 'calculateItemPower');
    assert.deepEqual(crafting.getCurelRarityWeights(40), {
        level: 40,
        common: 160,
        uncommon: 60,
        rare: 17,
        epic: 10,
        legendary: 9,
    });
    assert.equal(crafting.calculateItemPower(11, 'RARE'), 21);
    assert.deepEqual(crafting.parseMainMaterialSlots('1, 3'), [1, 3]);
    assert.equal(crafting.calculateRecipeOutputItemLevel(
        { required_job_level: 20, template_item_level: 40 },
        [{ item_level: 15, category: 'MATERIAL' }, { item_level: 25, category: 'MATERIAL' }, { item_level: 40, category: 'TOOL' }],
        18
    ), 18);
    assert.equal(crafting.resolveCraftedRarity(
        { curel_rule_key: 'Material CUREL', main_material_slots: '1', curel_mechanic: 'Inherit' },
        [{ slot_index: 1, rarity: 'EPIC' }, { slot_index: 2, rarity: 'COMMON' }],
        1
    ), 'EPIC');

    assertExportedFunction(itemStats, 'calculateBaseStatValue');
    assert.equal(itemStats.calculateBaseStatValue(21), 63);
    assert.equal(Object.keys(itemStats.rollItemStats('WEAPON', 10, 'LEGENDARY')).length, 6);

    assertExportedFunction(progression, 'calculateExpRequired');
    assert.equal(progression.calculateExpRequired(1), 170);
    assert.equal(progression.calculateSkillExpRequired(1), 165);
    assert.equal(progression.calculateLevelFromExp(0), 1);

    assertExportedFunction(actionQueue, 'calculateActualDuration');
    assert.equal(actionQueue.calculateActualDuration(100, 0), 100);
    assert.equal(actionQueue.calculateActionSpeedReduction('CRAFT', { agi: 20, chr: 10 }), 0.02);
    assert.equal(actionQueue.calculateActionSpeedReduction('FORAGE', { agi: 20, dex: 10 }), 0.02);
    assert.equal(actionQueue.calculateActionSpeedReduction('EXPLORE', { agi: 10 }), 0.01);
    assert.equal(actionQueue.calculateActionActualDuration(1000, 'FORAGE', { agi: 20, dex: 10 }), 980);
    assert.deepEqual(actionQueue.calculateExpReward('EXPLORE', 100, 1), { playerExp: 56, jobExp: 24 });

    assertExportedFunction(character, 'calculateStartingJobBonus');
    assert.deepEqual(character.calculateStartingJobBonus({
        str: 0.7,
        agi: 0.4,
        dex: 0,
        vit: 0.4,
        int: 0,
        chr: 0,
    }), {
        str: 14,
        agi: 8,
        dex: 0,
        vit: 8,
        int: 0,
        chr: 0,
    });

    assertExportedFunction(auth, 'generateToken');
    assert.equal(typeof auth.generateToken('account-id', 'tester'), 'string');

    assertExportedFunction(loot, 'calculateDropCount');
    assert.equal(loot.calculateDropCount('EXPLORE', 600), 4);

    assertExportedFunction(curelPower, 'calculateCurelPowerFromRows');
    assert.equal(curelPower.normalizePowerMode('BATTLE'), 'COMBAT_GATHERING');
    assert.equal(curelPower.calculateCurelPowerFromRows(5, [
        { code: 'gathering', job_level: 20 },
        { code: 'scavenging', job_level: 12 },
    ], 'MINE'), 28);
    assert.equal(curelPower.calculateCurelPowerFromRows(8, [
        { code: 'fighting', job_level: 30 },
        { code: 'scavenging', job_level: 20 },
    ], 'DUNGEON'), 40);

    assertExportedFunction(itemLifecycle, 'calculateExpiresAt');
    assert.equal(itemLifecycle.shouldExpire('Duration', 72), true);
    assert.equal(itemLifecycle.shouldExpire('None', 72), false);
    assert.equal(
        itemLifecycle.calculateExpiresAt('Duration', 2, new Date('2026-01-01T00:00:00Z')).toISOString(),
        '2026-01-01T02:00:00.000Z'
    );
    assert.equal(itemLifecycle.isExpired('2026-01-01T00:00:00Z', new Date('2026-01-01T00:00:01Z')), true);

    assert.equal(itemsSeed.ITEM_TEMPLATES.length, 391);
    assert.equal(skillsSeed.ALL_SKILLS.length, 196);
    assert.equal(designSeed.CRAFTING_RECIPES.length, 263);
    assert.equal(designSeed.LEVELING_RULES.length, 40);
    assert.equal(designSeed.CUREL_RARITY_WEIGHTS.length, 41);
}

function main() {
    const modulesByPath = {};
    const files = findJavaScriptFiles(sourceRoot)
        .filter(filePath => !filePath.endsWith(`${path.sep}index.js`));

    for (const filePath of files) {
        const loadedModule = requireModule(filePath);
        modulesByPath[loadedModule.relativePath] = loadedModule.exports;
    }

    runPureLogicChecks(modulesByPath);
    console.log(`[SUCCESS] Da load ${files.length} module logic va kiem tra smoke-test thanh cong.`);
}

main();

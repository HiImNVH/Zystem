// backend/src/services/services.loot.js
// Version: 1.0
// Roll loot sau khi claim action — CUREL weight system + DEX bonus

const { dbPool } = require('../repositories/repositories.database');
const craftingService = require('./services.crafting');

// Map action type sang loai drop tuong ung
const ACTION_DROP_POOL = {
    MINE:    ['MATERIAL'],
    CHOP:    ['MATERIAL'],
    HUNT:    ['MATERIAL', 'WEAPON'],
    FORAGE:  ['MATERIAL'],
    EXPLORE: ['MATERIAL', 'WEAPON', 'ARMOR'],
    CRAFT:   [],  // Craft khong drop loot ngau nhien
    FARM:    ['MATERIAL'],
};

// So luong item co the drop theo loai action va thoi gian
function calculateDropCount(actionType, durationSeconds) {
    const baseCount = {
        MINE:    1,
        CHOP:    1,
        HUNT:    1,
        FORAGE:  1,
        EXPLORE: 2,
        FARM:    1,
    };
    const base = baseCount[actionType] || 1;

    // Moi 5 phut them 1 drop, toi da 5 drop
    const timeBonus = Math.floor(durationSeconds / 300);
    return Math.min(base + timeBonus, 5);
}

// Lay danh sach item template phu hop de roll loot
async function getCandidateTemplates(categories, zoneMinLevel) {
    if (!categories || categories.length === 0) return [];

    const maxLevel = Math.max(1, (zoneMinLevel || 1) + 5); // Roll item trong khoang cap zone
    const minLevel = Math.max(1, (zoneMinLevel || 1) - 5);

    const placeholders = categories.map((_, i) => `$${i + 1}`).join(', ');
    const sqlQuery = `
        SELECT id, item_level, drop_weight_common, drop_weight_uncommon,
               drop_weight_rare, drop_weight_epic, drop_weight_legendary
        FROM item_templates
        WHERE category = ANY(ARRAY[${placeholders}])
          AND item_level BETWEEN $${categories.length + 1} AND $${categories.length + 2};
    `;

    try {
        const result = await dbPool.query(sqlQuery, [...categories, minLevel, maxLevel]);
        return result.rows;
    } catch (error) {
        console.error('[ERROR] Loi khi lay candidate templates:', error.message);
        return [];
    }
}

// Roll 1 item tu danh sach candidate
function rollOneItem(candidates, crafterDex) {
    if (!candidates || candidates.length === 0) return null;

    // Chon template ngau nhien (trong so deu nhau giua cac template)
    const template = candidates[Math.floor(Math.random() * candidates.length)];

    // Roll do hiem CUREL — DEX cua player anh huong
    const rarity = craftingService.rollCurelRarity(
        template.item_level,
        'COMMON', // Nguyen lieu cua drop luon la COMMON
        crafterDex || 0
    );

    const itemPower = craftingService.calculateItemPower(template.item_level, rarity);

    return {
        templateId: template.id,
        itemLevel: template.item_level,
        rarity,
        itemPower
    };
}

// Insert cac item da roll vao bang items
async function insertDroppedItems(playerId, droppedItems, actionId) {
    if (!droppedItems || droppedItems.length === 0) return [];

    const insertedItems = [];

    for (const item of droppedItems) {
        try {
            const result = await dbPool.query(`
                INSERT INTO items
                    (template_id, rarity, item_power, owner_player_id, source, quantity)
                VALUES ($1, $2, $3, $4, 'drop', 1)
                RETURNING id, template_id, rarity, item_power;
            `, [item.templateId, item.rarity, item.itemPower, playerId]);

            insertedItems.push(result.rows[0]);
        } catch (error) {
            console.error('[ERROR] Loi khi insert dropped item:', error.message);
        }
    }

    // Luu loot snapshot vao action_queue de audit
    if (insertedItems.length > 0) {
        await dbPool.query(
            `UPDATE action_queue SET loot_snapshot = $1 WHERE id = $2;`,
            [JSON.stringify(insertedItems), actionId]
        ).catch(err => console.error('[WARN] Loi khi luu loot_snapshot:', err.message));
    }

    return insertedItems;
}

// Ham chinh: tinh toan va thuc hien drop loot sau khi claim
async function processLootDrop(playerId, claimedAction, playerDex) {
    const actionType = claimedAction.action_type?.toUpperCase();
    const categories = ACTION_DROP_POOL[actionType];

    // Action khong co drop pool (vd CRAFT) — bo qua
    if (!categories || categories.length === 0) {
        return { items_dropped: [] };
    }

    const zoneMinLevel = claimedAction.zone_min_level || 1;
    const dropCount = calculateDropCount(actionType, claimedAction.actual_duration_s);

    // Lay danh sach template ung vien
    const candidates = await getCandidateTemplates(categories, zoneMinLevel);
    if (candidates.length === 0) {
        return { items_dropped: [] };
    }

    // Roll tung item
    const droppedItems = [];
    for (let i = 0; i < dropCount; i++) {
        // 70% co xuong do moi action slot (khong phai 100% dam bao loot)
        if (Math.random() > 0.70) continue;
        const item = rollOneItem(candidates, playerDex);
        if (item) droppedItems.push(item);
    }

    // Insert vao DB va tra ve ket qua
    const savedItems = await insertDroppedItems(playerId, droppedItems, claimedAction.id);

    if (savedItems.length > 0) {
        console.log(`[SUCCESS] Drop ${savedItems.length} item cho player ${playerId} tu action ${actionType}`);
    }

    return { items_dropped: savedItems };
}

module.exports = {
    processLootDrop,
    calculateDropCount,
    rollOneItem
};

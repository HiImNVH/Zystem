// backend/src/repositories/repositories.workbookCatalogSeed.js

const { gameDataDb } = require('./repositories.databaseDomains');
const { WORKBOOK_ITEM_TEMPLATES } = require('./repositories.workbookItems');
const { WORKBOOK_CRAFTING_RECIPES } = require('./repositories.workbookRecipes');

const dbPool = gameDataDb;
const NON_STACKABLE_CATEGORIES = new Set(['EQUIPMENT', 'SPECIAL']);
const DESIGN_NOTE_TRANSLATIONS = {
    'Luyện từ quặng': 'Smelted from ore.',
    'Tái chế từ phế liệu': 'Recycled from scrap.',
    'Cần Saw': 'Requires a saw.',
    'Tái chế': 'Recycled material recipe.',
    'Cần Bone Needle': 'Requires a bone needle.',
    'Thuộc da': 'Tanning process.',
    'Chưng cất': 'Distillation process.',
    'Đốt yếm khí': 'Produced through oxygen-limited burning.',
    'Bắt buộc đủ 3 nguyên liệu': 'All three ingredients are required.',
    'Tôi luyện': 'Tempering process.',
    'Gia công chính xác': 'Precision machining process.',
    'Shaft dùng chung Handle': 'Uses the shared handle as its shaft.',
    'Công trình khởi đầu': 'Starter structure.',
};

function translateDesignNote(designNote) {
    return DESIGN_NOTE_TRANSLATIONS[designNote] || designNote || null;
}

function translateWorkstation(workstationAccess) {
    if (workstationAccess === 'Tay không (Base)') return 'Handcraft (Base)';
    return workstationAccess || null;
}

function createCatalogCode(value) {
    return String(value || '')
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 50);
}

function buildItemRow(template) {
    const category = String(template.category || 'MISC').toUpperCase();
    const isStackable = !NON_STACKABLE_CATEGORIES.has(category);

    return [
        createCatalogCode(template.name),
        template.name,
        category,
        template.tags,
        template.iconUrl,
        template.levelRule,
        template.origin,
        template.lifecycleModel,
        template.baseDurability,
        template.baseDurationHours,
        template.lifecycleNote,
        isStackable,
        isStackable ? 99 : 1,
    ];
}

async function upsertItemTemplates(client) {
    const query = `
        INSERT INTO item_templates
            (code, display_name, category, tags, icon_url, level_rule, origin,
             item_level, lifecycle_model, base_durability, base_duration_hours,
             lifecycle_note, is_stackable, max_stack)
        VALUES ($1,$2,$3,$4,$5,$6,$7,1,$8,$9,$10,$11,$12,$13)
        ON CONFLICT (code) DO UPDATE SET
            display_name = EXCLUDED.display_name,
            category = EXCLUDED.category,
            tags = EXCLUDED.tags,
            icon_url = EXCLUDED.icon_url,
            level_rule = EXCLUDED.level_rule,
            origin = EXCLUDED.origin,
            lifecycle_model = EXCLUDED.lifecycle_model,
            base_durability = EXCLUDED.base_durability,
            base_duration_hours = EXCLUDED.base_duration_hours,
            lifecycle_note = EXCLUDED.lifecycle_note,
            is_stackable = EXCLUDED.is_stackable,
            max_stack = EXCLUDED.max_stack;
    `;

    for (const template of WORKBOOK_ITEM_TEMPLATES) {
        await client.query(query, buildItemRow(template));
    }
}

async function removeStaleRecipes(client) {
    const recipeCodes = WORKBOOK_CRAFTING_RECIPES.map(recipe => recipe.code);
    const result = await client.query(`
        DELETE FROM recipes old_recipe
        WHERE old_recipe.code <> ALL($1::TEXT[])
          AND NOT EXISTS (
              SELECT 1 FROM player_recipes player_recipe
              WHERE player_recipe.recipe_id = old_recipe.id
          );
    `, [recipeCodes]);

    return result.rowCount || 0;
}

async function findCatalogReferences(client, recipe) {
    const result = await client.query(`
        SELECT
            output_template.id AS output_template_id,
            job.id AS required_job_id
        FROM item_templates output_template
        LEFT JOIN jobs_seed job ON job.code = $2
        WHERE output_template.display_name = $1
        LIMIT 1;
    `, [recipe.outputItem, recipe.requiredJobCode]);

    return result.rows[0] || null;
}

async function upsertRecipe(client, recipe) {
    const references = await findCatalogReferences(client, recipe);
    if (!references) {
        console.warn(`[WARN] Bo qua recipe vi khong tim thay item dau ra: ${recipe.outputItem}`);
        return;
    }

    const result = await client.query(`
        INSERT INTO recipes
            (code, recipe_number, output_template_id, output_category, output_qty,
             required_job_id, required_job_level, base_craft_time_s,
             workstation_access, design_notes, is_auto_unlock)
        VALUES ($1,NULL,$2,$3,$4,$5,$6,$7,$8,$9,TRUE)
        ON CONFLICT (code) DO UPDATE SET
            recipe_number = NULL,
            output_template_id = EXCLUDED.output_template_id,
            output_category = EXCLUDED.output_category,
            output_qty = EXCLUDED.output_qty,
            required_job_id = EXCLUDED.required_job_id,
            required_job_level = EXCLUDED.required_job_level,
            base_craft_time_s = EXCLUDED.base_craft_time_s,
            workstation_access = EXCLUDED.workstation_access,
            design_notes = EXCLUDED.design_notes,
            is_auto_unlock = TRUE
        RETURNING id;
    `, [
        recipe.code,
        references.output_template_id,
        recipe.outputCategory,
        recipe.outputQuantity,
        references.required_job_id,
        recipe.requiredSkillLevel,
        recipe.craftTimeSeconds,
        translateWorkstation(recipe.workstationAccess),
        translateDesignNote(recipe.designNotes),
    ]);

    const recipeId = result.rows[0].id;
    await client.query('DELETE FROM recipe_tag_inputs WHERE recipe_id = $1;', [recipeId]);

    for (const input of recipe.inputs) {
        await client.query(`
            INSERT INTO recipe_tag_inputs (recipe_id, slot_index, tag_query, quantity)
            VALUES ($1,$2,$3,$4);
        `, [recipeId, input.slotIndex, input.tagQuery, input.quantity]);
    }
}

async function upsertCraftingRecipes(client) {
    for (const recipe of WORKBOOK_CRAFTING_RECIPES) {
        await upsertRecipe(client, recipe);
    }
}

async function removeStaleItemTemplates(client) {
    const templateCodes = WORKBOOK_ITEM_TEMPLATES.map(template => createCatalogCode(template.name));
    const result = await client.query(`
        DELETE FROM item_templates old_template
        WHERE old_template.code <> ALL($1::TEXT[])
          AND NOT EXISTS (SELECT 1 FROM items item WHERE item.template_id = old_template.id)
          AND NOT EXISTS (SELECT 1 FROM recipes recipe WHERE recipe.output_template_id = old_template.id)
          AND NOT EXISTS (
              SELECT 1 FROM recipe_ingredients ingredient
              WHERE ingredient.material_template_id = old_template.id
          );
    `, [templateCodes]);

    return result.rowCount || 0;
}

async function seedWorkbookCatalog() {
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');
        await upsertItemTemplates(client);
        const removedRecipeCount = await removeStaleRecipes(client);
        await upsertCraftingRecipes(client);
        const removedItemCount = await removeStaleItemTemplates(client);
        await client.query('COMMIT');
        console.log(`[SUCCESS] Da dong bo ${WORKBOOK_ITEM_TEMPLATES.length} item va ${WORKBOOK_CRAFTING_RECIPES.length} recipe tu workbook.`);
        console.log(`[INFO] Da xoa ${removedItemCount} item seed va ${removedRecipeCount} recipe seed cu khong con tham chieu.`);
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Khong the dong bo item va recipe tu workbook:', error.message);
        return false;
    } finally {
        client.release();
    }
}

module.exports = {
    seedWorkbookCatalog,
};

// backend/src/repositories/repositories.itemsSeed.js
// Version: 1.0
// Logic đổ dữ liệu mẫu (Seeding) cho Item Templates, Recipes và Ingredients dựa trên kiến trúc UUID

const { dbPool } = require('./repositories.database');

async function seedItemTemplatesAndRecipes() {
    console.log('[INFO] Đang kiểm tra dữ liệu hệ thống vật phẩm và công thức chế tạo...');

    try {
        // 1. Kiểm tra xem đã có dữ liệu item_templates chưa
        const checkTemplates = await dbPool.query('SELECT COUNT(*) FROM item_templates;');
        const templateCount = parseInt(checkTemplates.rows[0].count);

        if (templateCount > 0) {
            console.log(`[INFO] Bảng item_templates đã có sẵn ${templateCount} bản ghi. Bỏ qua quy trình Seeding Vật phẩm.`);
            return true;
        }

        console.log('[INFO] Phát hiện dữ liệu vật phẩm trống. Bắt đầu nạp ma trận vật phẩm mẫu...');

        // 2. SEED ITEM TEMPLATES (Trả về ID sau khi chèn để dùng cho công thức chế tạo)
        const templatesToInsert = [
            // Bọn quặng / Nguyên liệu thô (Stackable = true)
            { code: 'MAT_IRON_ORE', name: 'Quặng Sắt Thô', cat: 'MATERIAL', lv: 1, w_com: 300, w_un: 0, w_ra: 0, w_ep: 0, w_le: 0, dur: 0, stack: true },
            { code: 'MAT_COPPER_ORE', name: 'Quặng Đồng Thô', cat: 'MATERIAL', lv: 1, w_com: 400, w_un: 0, w_ra: 0, w_ep: 0, w_le: 0, dur: 0, stack: true },
            { code: 'MAT_COAL', name: 'Than Đá', cat: 'MATERIAL', lv: 1, w_com: 350, w_un: 0, w_ra: 0, w_ep: 0, w_le: 0, dur: 0, stack: true },
            { code: 'MAT_IRON_INGOT', name: 'Thỏi Sắt Tinh Luyện', cat: 'MATERIAL', lv: 1, w_com: 100, w_un: 0, w_ra: 0, w_ep: 0, w_le: 0, dur: 0, stack: true },
            
            // Trang bị / Vũ khí (Stackable = false, Có độ bền base_durability)
            { code: 'WEAPON_RUSTY_SWORD', name: 'Kiếm Sắt Rỉ Sét', cat: 'WEAPON', lv: 1, w_com: 150, w_un: 50, w_ra: 10, w_ep: 2, w_le: 0, dur: 100, stack: false },
            { code: 'WEAPON_STEEL_AXE', name: 'Rìu Thép Thợ Săn', cat: 'WEAPON', lv: 2, w_com: 100, w_un: 60, w_ra: 20, w_ep: 5, w_le: 1, dur: 150, stack: false },
            { code: 'ARMOR_LEATHER_VEST', name: 'Áo Giáp Da Khâu', cat: 'ARMOR', lv: 1, w_com: 200, w_un: 40, w_ra: 5, w_ep: 0, w_le: 0, dur: 120, stack: false }
        ];

        const templateMap = {}; // Dùng để lưu trữ uuid sinh ra map với Code nhằm làm khóa ngoại cho bảng Recipe

        for (const t of templatesToInsert) {
            const queryText = `
                INSERT INTO item_templates (code, display_name, category, item_level, drop_weight_common, drop_weight_uncommon, drop_weight_rare, drop_weight_epic, drop_weight_legendary, base_durability, is_stackable)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING id;
            `;
            const res = await dbPool.query(queryText, [
                t.code, t.name, t.cat, t.lv, t.w_com, t.w_un, t.w_ra, t.w_ep, t.w_le, t.dur, t.stack
            ]);
            templateMap[t.code] = res.rows[0].id;
        }
        console.log('[SUCCESS] Đã nạp thành công các Item Templates chuẩn vào cơ sở dữ liệu.');

        // 3. SEED RECIPES (Công thức chế tạo)
        // Lấy tạm ID của nghề nghiệp BLACKSMITH (ID = 1 theo seed nghề nghiệp cũ của bạn để map thử nghiệm)
        console.log('[INFO] Đang thiết lập danh mục công thức chế tác & rèn đúc nguyên liệu...');

        // Công thức 1: Luyện quặng sắt thô + than đá thành Thỏi Sắt Tinh Luyện
        const recipeIngotQuery = `
            INSERT INTO recipes (output_template_id, required_job_id, required_job_level, sp_to_unlock, base_craft_time_s, is_auto_unlock)
            VALUES ($1, 1, 1, 0, 4, true) RETURNING id;
        `;
        const resRecipeIngot = await dbPool.query(recipeIngotQuery, [templateMap['MAT_IRON_INGOT']]);
        const recipeIngotId = resRecipeIngot.rows[0].id;

        // Thành phần của công thức Thỏi Sắt (2 Quặng sắt + 1 Than đá)
        const ingQuery = `INSERT INTO recipe_ingredients (recipe_id, material_template_id, quantity) VALUES ($1, $2, $3);`;
        await dbPool.query(ingQuery, [recipeIngotId, templateMap['MAT_IRON_ORE'], 2]);
        await dbPool.query(ingQuery, [recipeIngotId, templateMap['MAT_COAL'], 1]);

        // Công thức 2: Chế tạo Kiếm Sắt Rỉ Sét từ 3 Thỏi sắt tinh luyện
        const recipeSwordQuery = `
            INSERT INTO recipes (output_template_id, required_job_id, required_job_level, sp_to_unlock, base_craft_time_s, is_auto_unlock)
            VALUES ($1, 1, 1, 2, 8, true) RETURNING id;
        `;
        const resRecipeSword = await dbPool.query(recipeSwordQuery, [templateMap['WEAPON_RUSTY_SWORD']]);
        const recipeSwordId = resRecipeSword.rows[0].id;
        
        await dbPool.query(ingQuery, [recipeSwordId, templateMap['MAT_IRON_INGOT'], 3]);

        console.log('[SUCCESS] Đã nạp thành công hệ thống công thức Recipe & nguyên liệu Ingredients liên kết UUID!');
        return true;
    } catch (error) {
        console.error('[ERROR] Thất bại khi nạp dữ liệu seed vật phẩm/công thức:', error.message);
        return false;
    }
}

module.exports = {
    seedItemTemplatesAndRecipes
};
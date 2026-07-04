// backend/src/repositories/repositories.jobsSeed.js

const { dbPool } = require('./repositories.database');

const jobsList = [
    { code: 'fighting',   name: 'Fighting',   cat: 'combat',     str: 0.7, agi: 0.4, dex: 0.0, vit: 0.4, int: 0.0, chr: 0.0 },
    { code: 'scavenging', name: 'Scavenging', cat: 'survival',   str: 0.4, agi: 0.7, dex: 0.0, vit: 0.4, int: 0.0, chr: 0.0 },
    { code: 'cooking',    name: 'Cooking',    cat: 'survival',   str: 0.0, agi: 0.0, dex: 0.4, vit: 0.0, int: 0.4, chr: 0.7 },
    { code: 'gathering',  name: 'Gathering',  cat: 'survival',   str: 0.0, agi: 0.4, dex: 0.7, vit: 0.0, int: 0.4, chr: 0.0 },
    { code: 'crafting',   name: 'Crafting',   cat: 'production', str: 0.0, agi: 0.0, dex: 0.4, vit: 0.0, int: 0.7, chr: 0.4 },
    { code: 'building',   name: 'Building',   cat: 'production', str: 0.4, agi: 0.0, dex: 0.0, vit: 0.7, int: 0.0, chr: 0.4 },
];

const achievementsList = [
    {
        code: 'first_blood',
        name: 'Mau Dau Tien',
        desc: 'Lan dau tieu diet thanh cong mot muc tieu nguy hiem.',
        cond_type: 'kill_count', cond_val: 1, sp: 5,
        str: 2, agi: 0, dex: 0, vit: 0, int: 0, chr: 0
    },
    {
        code: 'resource_hoarder',
        name: 'Ke Tich Tru',
        desc: 'Thu thap tong cong 10000 don vi tai nguyen.',
        cond_type: 'resource_gather', cond_val: 10000, sp: 10,
        str: 0, agi: 0, dex: 0, vit: 5, int: 5, chr: 0
    },
    {
        code: 'survivor_week',
        name: 'Ke Truong Ton',
        desc: 'Ton tai 7 ngay lien tuc khong bi ha guc.',
        cond_type: 'days_survived', cond_val: 7, sp: 10,
        str: 0, agi: 0, dex: 0, vit: 5, int: 0, chr: 5
    },
];

const zonesList = [
    { code: 'ZONE_SAFE_CAMP',        name: 'Trai An Toan',             type: 'safe',    min_lv: 1,  duration: 0,   inf: 0.00, rad: 0.00 },
    { code: 'ZONE_RUINS_LV1',        name: 'Khu Phe Tich Cap 1',       type: 'ruins',   min_lv: 1,  duration: 60,  inf: 1.00, rad: 0.20 },
    { code: 'ZONE_FOREST_LV1',       name: 'Rung Hoang Cap 1',         type: 'forest',  min_lv: 1,  duration: 45,  inf: 0.50, rad: 0.00 },
    { code: 'ZONE_MINE_LV1',         name: 'Mo Khoang Cap 1',          type: 'mine',    min_lv: 1,  duration: 60,  inf: 0.30, rad: 0.00 },
    { code: 'ZONE_CITY_RUINS_LV5',   name: 'Do Thi Sup Do',            type: 'ruins',   min_lv: 5,  duration: 180, inf: 2.50, rad: 1.00 },
    { code: 'ZONE_DEEP_FOREST_LV10', name: 'Rung Sau Cap 10',          type: 'forest',  min_lv: 10, duration: 240, inf: 2.00, rad: 0.50 },
    { code: 'ZONE_BIOHAZARD_LV20',   name: 'Khu O Nhiem Sinh Hoc',     type: 'hazard',  min_lv: 20, duration: 600, inf: 8.00, rad: 5.00 },
    { code: 'ZONE_NUCLEAR_LV40',     name: 'Khu Phong Xa Bo Hoang',    type: 'hazard',  min_lv: 40, duration: 900, inf: 5.00, rad: 15.00 },
];

async function seedJobsSeedTable() {
    try {
        const jobCount = await dbPool.query('SELECT COUNT(*) FROM jobs_seed;');
        if (parseInt(jobCount.rows[0].count) === 0) {
            console.log('[INFO] Dang nap 6 ky nang chinh theo Data Design...');
            const insertQuery = `
                INSERT INTO jobs_seed (code, display_name, category, str_per_lv, agi_per_lv, dex_per_lv, vit_per_lv, int_per_lv, chr_per_lv, is_available, unlock_patch)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE, '1.0');
            `;
            for (const job of jobsList) {
                await dbPool.query(insertQuery, [
                    job.code, job.name, job.cat,
                    job.str, job.agi, job.dex, job.vit, job.int, job.chr
                ]);
            }
            console.log('[SUCCESS] Da nap 6 ky nang chinh thanh cong!');
        } else {
            console.log('[INFO] Bang jobs_seed da co du lieu. Bo qua seeding.');
        }

        const achievementCount = await dbPool.query('SELECT COUNT(*) FROM achievements;');
        if (parseInt(achievementCount.rows[0].count) === 0) {
            const insertAchievementQuery = `
                INSERT INTO achievements (code, display_name, description, condition_type, condition_value, sp_bonus,
                    title_str_bonus, title_agi_bonus, title_dex_bonus, title_vit_bonus, title_int_bonus, title_chr_bonus)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);
            `;
            for (const achievement of achievementsList) {
                await dbPool.query(insertAchievementQuery, [
                    achievement.code, achievement.name, achievement.desc,
                    achievement.cond_type, achievement.cond_val, achievement.sp,
                    achievement.str, achievement.agi, achievement.dex,
                    achievement.vit, achievement.int, achievement.chr
                ]);
            }
            console.log('[SUCCESS] Da nap thanh tuu nen tang thanh cong!');
        }

        const zoneCount = await dbPool.query('SELECT COUNT(*) FROM zones;');
        if (parseInt(zoneCount.rows[0].count) === 0) {
            const insertZoneQuery = `
                INSERT INTO zones (code, display_name, zone_type, min_player_lv, base_duration_s, infection_risk, radiation_risk)
                VALUES ($1,$2,$3,$4,$5,$6,$7);
            `;
            for (const zone of zonesList) {
                await dbPool.query(insertZoneQuery, [
                    zone.code, zone.name, zone.type, zone.min_lv,
                    zone.duration, zone.inf, zone.rad
                ]);
            }
            console.log('[SUCCESS] Da nap khu vuc co ban thanh cong!');
        }
    } catch (error) {
        console.error('[ERROR] Loi khi seed du lieu nen tang:', error.message);
    }
}

module.exports = {
    seedJobsSeedTable,
    seedJobsMatrix: seedJobsSeedTable
};

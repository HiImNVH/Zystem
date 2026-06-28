// backend/src/repositories/repositories.jobsSeed.js
// Version: 3.0
// Cap nhat: Dong bo 12 nghe voi Balance Sheet v3 (1.0 stat per level)
//           Chinh xac stat bonus, bo sung seed achievements va zones

const { dbPool } = require('./repositories.database');

// 12 nghe chinh thuc theo Balance Sheet v3 — tong 1.0 stat/lv moi nghe
const jobsList = [
    // He Khai Pha (Combat & Co Dong)
    { code: 'vanguard',    name: 'Giap la ca (Vanguard)',        cat: 'combat',   str: 0.6, agi: 0.4, dex: 0.0, vit: 0.0, int: 0.0, chr: 0.0 },
    { code: 'marksman',    name: 'Xa thu (Marksman)',             cat: 'combat',   str: 0.0, agi: 0.4, dex: 0.6, vit: 0.0, int: 0.0, chr: 0.0 },
    { code: 'flanker',     name: 'Moc boc (Flanker)',             cat: 'combat',   str: 0.0, agi: 0.6, dex: 0.4, vit: 0.0, int: 0.0, chr: 0.0 },
    // He Khai Thac (Thu Thap Tai Nguyen)
    { code: 'miner',       name: 'Tho mo (Miner)',                cat: 'gather',   str: 0.4, agi: 0.0, dex: 0.0, vit: 0.6, int: 0.0, chr: 0.0 },
    { code: 'lumberjack',  name: 'Tho don cui (Lumberjack)',      cat: 'gather',   str: 0.6, agi: 0.0, dex: 0.0, vit: 0.4, int: 0.0, chr: 0.0 },
    { code: 'hunter',      name: 'Tho san (Hunter)',              cat: 'gather',   str: 0.6, agi: 0.4, dex: 0.0, vit: 0.0, int: 0.0, chr: 0.0 },
    { code: 'forager',     name: 'Hai luom (Forager)',            cat: 'gather',   str: 0.0, agi: 0.4, dex: 0.0, vit: 0.0, int: 0.6, chr: 0.0 },
    // He Sang Tao (San Xuat & Tien Ich)
    { code: 'artisan',     name: 'Tho thu cong (Artisan)',        cat: 'craft',    str: 0.0, agi: 0.0, dex: 0.6, vit: 0.0, int: 0.4, chr: 0.0 },
    { code: 'farmer',      name: 'Nong dan (Farmer)',             cat: 'craft',    str: 0.0, agi: 0.0, dex: 0.0, vit: 0.6, int: 0.4, chr: 0.0 },
    { code: 'chef',        name: 'Dau bep (Chef)',                cat: 'craft',    str: 0.0, agi: 0.0, dex: 0.0, vit: 0.0, int: 0.4, chr: 0.6 },
    { code: 'armorsmith',  name: 'Bac thay Giap (Armorsmith)',    cat: 'craft',    str: 0.0, agi: 0.0, dex: 0.0, vit: 0.6, int: 0.4, chr: 0.0 },
    { code: 'weaponsmith', name: 'Bac thay VK (Weaponsmith)',     cat: 'craft',    str: 0.0, agi: 0.0, dex: 0.6, vit: 0.0, int: 0.0, chr: 0.4 },
    // Nghe Nang Cao — Ke hoach patch sau
    { code: 'doctor',      name: 'Bac si (Doctor)',               cat: 'advanced', str: 0.0, agi: 0.0, dex: 0.0, vit: 0.0, int: 0.6, chr: 0.4, available: false, patch: 'patch2' },
];

const achievementsList = [
    {
        code: 'hardcore_survivor',
        name: 'Ke Song Sot Kien Cuong',
        desc: 'Song sot qua 5 lan thanh Infection cham moc bao dong do (>90%)',
        cond_type: 'infection_survive', cond_val: 5, sp: 15,
        str: 0, agi: 0, dex: 0, vit: 10, int: 5, chr: 0
    },
    {
        code: 'the_ghost',
        name: 'Bong Ma Vung Dat Chet',
        desc: 'Ne tranh thanh cong 500 don danh cua Zombie khi dang trong hang doi',
        cond_type: 'dodge_count', cond_val: 500, sp: 15,
        str: 0, agi: 10, dex: 5, vit: 0, int: 0, chr: 0
    },
    {
        code: 'zombie_slayer',
        name: 'Ke Huy Diet Xac Song',
        desc: 'Tieu diet thanh cong 1000 Zombie cac loai',
        cond_type: 'kill_count', cond_val: 1000, sp: 20,
        str: 10, agi: 0, dex: 5, vit: 0, int: 0, chr: 0
    },
    // Thanh tuu bo sung de du ~50 SP Alpha
    {
        code: 'first_blood',
        name: 'Mau Dau Tien',
        desc: 'Lan dau tieu diet mot Zombie',
        cond_type: 'kill_count', cond_val: 1, sp: 5,
        str: 2, agi: 0, dex: 0, vit: 0, int: 0, chr: 0
    },
    {
        code: 'resource_hoarder',
        name: 'Ke Tich Tru',
        desc: 'Thu thap tong cong 10000 don vi tai nguyen thu',
        cond_type: 'resource_gather', cond_val: 10000, sp: 10,
        str: 0, agi: 0, dex: 0, vit: 5, int: 5, chr: 0
    },
    {
        code: 'master_crafter',
        name: 'Thu Cong Bac Thay',
        desc: 'Hoan thanh 500 luot che tao vat pham',
        cond_type: 'craft_count', cond_val: 500, sp: 10,
        str: 0, agi: 0, dex: 5, vit: 0, int: 5, chr: 0
    },
    {
        code: 'survivor_week',
        name: 'Ke Truong Ton',
        desc: 'Ton tai 7 ngay lien tuc khong bi chet',
        cond_type: 'days_survived', cond_val: 7, sp: 10,
        str: 0, agi: 0, dex: 0, vit: 5, int: 0, chr: 5
    },
];

const zonesList = [
    { code: 'ZONE_SAFE_CAMP',        name: 'Trai An Toan',               type: 'safe',    min_lv: 1,  duration: 0,    inf: 0.00, rad: 0.00 },
    { code: 'ZONE_IRON_MINE_LV1',    name: 'Mo Sat Cap 1',               type: 'mine',    min_lv: 1,  duration: 60,   inf: 0.50, rad: 0.00 },
    { code: 'ZONE_FOREST_LV1',       name: 'Rung Hoang Dan Cap 1',       type: 'forest',  min_lv: 1,  duration: 45,   inf: 1.00, rad: 0.00 },
    { code: 'ZONE_RUINS_LV5',        name: 'Khu Do Thi Sup Do',          type: 'dungeon', min_lv: 5,  duration: 600,  inf: 3.00, rad: 1.00 },
    { code: 'ZONE_COPPER_MINE_LV3',  name: 'Mo Dong Cap 3',              type: 'mine',    min_lv: 3,  duration: 90,   inf: 0.80, rad: 0.00 },
    { code: 'ZONE_DEEP_FOREST_LV10', name: 'Rung Sam Sau Tham',          type: 'forest',  min_lv: 10, duration: 180,  inf: 2.00, rad: 0.50 },
    { code: 'ZONE_BIOHAZARD_LV20',   name: 'Khu Sinh Hoc Nhiem Doc',     type: 'hazard',  min_lv: 20, duration: 900,  inf: 8.00, rad: 5.00 },
    { code: 'ZONE_NUCLEAR_PLANT_LV40', name: 'Nha May Hat Nhan Bo Hoang', type: 'hazard', min_lv: 40, duration: 1800, inf: 5.00, rad: 15.00 },
];

async function seedJobsSeedTable() {
    try {
        // === Seed Jobs ===
        const jobCount = await dbPool.query('SELECT COUNT(*) FROM jobs_seed;');
        if (parseInt(jobCount.rows[0].count) === 0) {
            console.log('[INFO] Dang nap du lieu 13 nghe nghiep (Balance Sheet v3)...');
            const insertQuery = `
                INSERT INTO jobs_seed (code, display_name, category, str_per_lv, agi_per_lv, dex_per_lv, vit_per_lv, int_per_lv, chr_per_lv, is_available, unlock_patch)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
            `;
            for (const job of jobsList) {
                await dbPool.query(insertQuery, [
                    job.code, job.name, job.cat,
                    job.str, job.agi, job.dex, job.vit, job.int, job.chr,
                    job.available !== false,
                    job.patch || '1.0'
                ]);
            }
            console.log('[SUCCESS] Da nap 13 nghe nghiep thanh cong!');
        } else {
            console.log('[INFO] Bang jobs_seed da co du lieu. Bo qua seeding.');
        }

        // === Seed Achievements ===
        const achCount = await dbPool.query('SELECT COUNT(*) FROM achievements;');
        if (parseInt(achCount.rows[0].count) === 0) {
            console.log('[INFO] Dang nap 7 thanh tuu Alpha...');
            const insertAchQuery = `
                INSERT INTO achievements (code, display_name, description, condition_type, condition_value, sp_bonus,
                    title_str_bonus, title_agi_bonus, title_dex_bonus, title_vit_bonus, title_int_bonus, title_chr_bonus)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);
            `;
            for (const a of achievementsList) {
                await dbPool.query(insertAchQuery, [
                    a.code, a.name, a.desc, a.cond_type, a.cond_val, a.sp,
                    a.str, a.agi, a.dex, a.vit, a.int, a.chr
                ]);
            }
            console.log('[SUCCESS] Da nap 7 thanh tuu Alpha thanh cong!');
        }

        // === Seed Zones ===
        const zoneCount = await dbPool.query('SELECT COUNT(*) FROM zones;');
        if (parseInt(zoneCount.rows[0].count) === 0) {
            console.log('[INFO] Dang nap 8 zone khu vuc...');
            const insertZoneQuery = `
                INSERT INTO zones (code, display_name, zone_type, min_player_lv, base_duration_s, infection_risk, radiation_risk)
                VALUES ($1,$2,$3,$4,$5,$6,$7);
            `;
            for (const z of zonesList) {
                await dbPool.query(insertZoneQuery, [z.code, z.name, z.type, z.min_lv, z.duration, z.inf, z.rad]);
            }
            console.log('[SUCCESS] Da nap 8 zone co ban thanh cong!');
        }

    } catch (error) {
        console.error('[ERROR] Loi khi seed du lieu nen tang:', error.message);
    }
}

module.exports = {
    seedJobsSeedTable,
    seedJobsMatrix: seedJobsSeedTable // alias ngược
};

// backend/src/repositories/repositories.database.js
// Version: 4.0
// Cap nhat: Bo sung 5 bang con thieu (wallet_transactions, accounts, zones, achievements, player_achievements)
//           Fix seedJobsSeedTable export de tuong thich voi index.js

require('dotenv').config();
const { Pool } = require('pg');

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error('[ERROR] Thieu cau hinh bat buoc trong file .env: DB_HOST, DB_USER, DB_PASSWORD');
    process.exit(1);
}

const poolConfiguration = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const dbPool = new Pool(poolConfiguration);

// Xu ly loi ket noi pool de tranh crash server
dbPool.on('error', (error) => {
    console.error('[ERROR] Loi khong mong doi tu PostgreSQL Pool:', error.message);
});

async function initializeDatabaseSchema() {
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN');

        // Extension UUID
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        // Xoa bang cu theo thu tu danh sach phu thuoc (Foreign Key)
        await client.query(`
            DROP TABLE IF EXISTS player_achievements CASCADE;
            DROP TABLE IF EXISTS achievements CASCADE;
            DROP TABLE IF EXISTS player_recipes CASCADE;
            DROP TABLE IF EXISTS recipe_ingredients CASCADE;
            DROP TABLE IF EXISTS recipes CASCADE;
            DROP TABLE IF EXISTS items CASCADE;
            DROP TABLE IF EXISTS item_templates CASCADE;
            DROP TABLE IF EXISTS wallet_transactions CASCADE;
            DROP TABLE IF EXISTS wallets CASCADE;
            DROP TABLE IF EXISTS action_queue CASCADE;
            DROP TABLE IF EXISTS player_jobs CASCADE;
            DROP TABLE IF EXISTS jobs_seed CASCADE;
            DROP TABLE IF EXISTS zones CASCADE;
            DROP TABLE IF EXISTS players CASCADE;
            DROP TABLE IF EXISTS accounts CASCADE;
        `);

        console.log('[INFO] Dang khoi tao toan bo he thong bang Zystem...');

        // ============================================================
        // BANG 1: ACCOUNTS
        // ============================================================
        await client.query(`
            CREATE TABLE accounts (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                username VARCHAR(32) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                is_vip BOOLEAN NOT NULL DEFAULT FALSE,
                vip_expires_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                last_login_at TIMESTAMPTZ
            );
        `);

        // ============================================================
        // BANG 2: PLAYERS
        // ============================================================
        await client.query(`
            CREATE TABLE players (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
                character_name VARCHAR(50) NOT NULL UNIQUE,
                player_level SMALLINT DEFAULT 1 CHECK (player_level BETWEEN 1 AND 80),
                current_exp BIGINT DEFAULT 0,
                skill_points INT DEFAULT 0,
                base_str NUMERIC(8,2) DEFAULT 10,
                base_agi NUMERIC(8,2) DEFAULT 10,
                base_dex NUMERIC(8,2) DEFAULT 10,
                base_vit NUMERIC(8,2) DEFAULT 10,
                base_int NUMERIC(8,2) DEFAULT 10,
                base_chr NUMERIC(8,2) DEFAULT 10,
                max_hp INT DEFAULT 100,
                current_hp INT DEFAULT 100,
                infection_pct NUMERIC(5,2) DEFAULT 0.00 CHECK (infection_pct BETWEEN 0 AND 100),
                radiation_pct NUMERIC(5,2) DEFAULT 0.00 CHECK (radiation_pct BETWEEN 0 AND 100),
                infection_status VARCHAR(20) DEFAULT 'HEALTHY',
                equipped_title_id UUID,
                is_alive BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 3: ZONES
        // ============================================================
        await client.query(`
            CREATE TABLE zones (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(64) NOT NULL UNIQUE,
                display_name VARCHAR(128) NOT NULL,
                zone_type VARCHAR(32) NOT NULL DEFAULT 'overworld',
                min_player_lv SMALLINT NOT NULL DEFAULT 1,
                base_duration_s INT NOT NULL DEFAULT 30,
                infection_risk NUMERIC(4,2) NOT NULL DEFAULT 0,
                radiation_risk NUMERIC(4,2) NOT NULL DEFAULT 0,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 4: JOBS SEED
        // ============================================================
        await client.query(`
            CREATE TABLE jobs_seed (
                id SMALLSERIAL PRIMARY KEY,
                code VARCHAR(30) NOT NULL UNIQUE,
                display_name VARCHAR(100) NOT NULL,
                category VARCHAR(30) NOT NULL,
                str_per_lv NUMERIC(3,1) DEFAULT 0.0,
                agi_per_lv NUMERIC(3,1) DEFAULT 0.0,
                dex_per_lv NUMERIC(3,1) DEFAULT 0.0,
                vit_per_lv NUMERIC(3,1) DEFAULT 0.0,
                int_per_lv NUMERIC(3,1) DEFAULT 0.0,
                chr_per_lv NUMERIC(3,1) DEFAULT 0.0,
                sp_cost_per_lv SMALLINT DEFAULT 1,
                is_available BOOLEAN DEFAULT TRUE,
                unlock_patch VARCHAR(20) DEFAULT '1.0'
            );
        `);

        // ============================================================
        // BANG 5: PLAYER JOBS
        // ============================================================
        await client.query(`
            CREATE TABLE player_jobs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                job_id SMALLINT NOT NULL REFERENCES jobs_seed(id) ON DELETE CASCADE,
                job_level SMALLINT DEFAULT 0 CHECK (job_level >= 0),
                current_exp BIGINT DEFAULT 0,
                sp_invested INT DEFAULT 0,
                unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                UNIQUE(player_id, job_id)
            );
        `);

        // ============================================================
        // BANG 6: ACTION QUEUE
        // ============================================================
        await client.query(`
            CREATE TABLE action_queue (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                slot_index SMALLINT CHECK (slot_index BETWEEN 1 AND 5),
                action_type VARCHAR(30) NOT NULL,
                target_zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
                status VARCHAR(20) DEFAULT 'PENDING',
                started_at TIMESTAMPTZ DEFAULT NOW(),
                base_duration_s INT NOT NULL DEFAULT 30,
                actual_duration_s INT NOT NULL DEFAULT 30,
                completes_at TIMESTAMPTZ NOT NULL,
                claimed_at TIMESTAMPTZ,
                exp_earned INT,
                job_exp_earned INT,
                loot_snapshot JSONB,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 7: WALLETS
        // ============================================================
        await client.query(`
            CREATE TABLE wallets (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL UNIQUE REFERENCES players(id) ON DELETE CASCADE,
                copper BIGINT DEFAULT 0 CHECK (copper >= 0),
                silver BIGINT DEFAULT 0 CHECK (silver >= 0),
                gold BIGINT DEFAULT 0 CHECK (gold >= 0),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 8: WALLET TRANSACTIONS (audit trail)
        // ============================================================
        await client.query(`
            CREATE TABLE wallet_transactions (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
                currency VARCHAR(10) NOT NULL,
                transaction_type VARCHAR(20) NOT NULL,
                amount BIGINT NOT NULL,
                balance_after BIGINT NOT NULL,
                reference_id UUID,
                note TEXT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);
        await client.query(`CREATE INDEX idx_wallet_tx_wallet ON wallet_transactions(wallet_id);`);
        await client.query(`CREATE INDEX idx_wallet_tx_created ON wallet_transactions(created_at DESC);`);

        // ============================================================
        // BANG 9: ITEM TEMPLATES
        // ============================================================
        await client.query(`
            CREATE TABLE item_templates (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(50) NOT NULL UNIQUE,
                display_name VARCHAR(100) NOT NULL,
                category VARCHAR(30) NOT NULL,
                item_level SMALLINT DEFAULT 1,
                drop_weight_common INT DEFAULT 200,
                drop_weight_uncommon INT DEFAULT 40,
                drop_weight_rare INT DEFAULT 10,
                drop_weight_epic INT DEFAULT 5,
                drop_weight_legendary INT DEFAULT 1,
                required_job_id SMALLINT REFERENCES jobs_seed(id) ON DELETE SET NULL,
                required_job_lv SMALLINT DEFAULT 1,
                base_durability INT DEFAULT 0,
                is_stackable BOOLEAN DEFAULT FALSE,
                max_stack SMALLINT DEFAULT 1,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 10: ITEMS (instances)
        // ============================================================
        await client.query(`
            CREATE TABLE items (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                template_id UUID NOT NULL REFERENCES item_templates(id) ON DELETE CASCADE,
                rarity VARCHAR(20) NOT NULL DEFAULT 'COMMON',
                item_power SMALLINT DEFAULT 0,
                stat_1_type VARCHAR(10),
                stat_1_value NUMERIC(6,2),
                stat_2_type VARCHAR(10),
                stat_2_value NUMERIC(6,2),
                stat_3_type VARCHAR(10),
                stat_3_value NUMERIC(6,2),
                max_durability SMALLINT DEFAULT 100,
                current_durability SMALLINT DEFAULT 100,
                owner_player_id UUID REFERENCES players(id) ON DELETE SET NULL,
                is_equipped BOOLEAN DEFAULT FALSE,
                equip_slot VARCHAR(20),
                quantity INT DEFAULT 1 CHECK (quantity > 0),
                crafted_by_player_id UUID REFERENCES players(id) ON DELETE SET NULL,
                crafted_at TIMESTAMPTZ,
                source VARCHAR(20) DEFAULT 'drop',
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);
        await client.query(`CREATE INDEX idx_items_owner ON items(owner_player_id) WHERE owner_player_id IS NOT NULL;`);
        await client.query(`CREATE INDEX idx_items_equipped ON items(owner_player_id, is_equipped) WHERE is_equipped = TRUE;`);

        // ============================================================
        // BANG 11: RECIPES
        // ============================================================
        await client.query(`
            CREATE TABLE recipes (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(64) UNIQUE,
                output_template_id UUID NOT NULL REFERENCES item_templates(id) ON DELETE CASCADE,
                output_qty SMALLINT DEFAULT 1,
                required_job_id SMALLINT REFERENCES jobs_seed(id) ON DELETE CASCADE,
                required_job_level SMALLINT DEFAULT 1,
                sp_to_unlock SMALLINT DEFAULT 0,
                base_craft_time_s INT DEFAULT 5,
                fail_output_template_id UUID REFERENCES item_templates(id) ON DELETE SET NULL,
                is_auto_unlock BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 12: RECIPE INGREDIENTS
        // ============================================================
        await client.query(`
            CREATE TABLE recipe_ingredients (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
                material_template_id UUID NOT NULL REFERENCES item_templates(id) ON DELETE CASCADE,
                quantity SMALLINT DEFAULT 1 CHECK (quantity > 0),
                min_rarity VARCHAR(20) DEFAULT 'COMMON'
            );
        `);

        // ============================================================
        // BANG 13: PLAYER RECIPES (junction)
        // ============================================================
        await client.query(`
            CREATE TABLE player_recipes (
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
                unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                PRIMARY KEY (player_id, recipe_id)
            );
        `);

        // ============================================================
        // BANG 14: ACHIEVEMENTS (seed data)
        // ============================================================
        await client.query(`
            CREATE TABLE achievements (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(64) NOT NULL UNIQUE,
                display_name VARCHAR(128) NOT NULL,
                description TEXT NOT NULL,
                condition_type VARCHAR(64) NOT NULL,
                condition_value INT NOT NULL DEFAULT 1,
                sp_bonus SMALLINT NOT NULL DEFAULT 0,
                title_str_bonus NUMERIC(5,2) DEFAULT 0,
                title_agi_bonus NUMERIC(5,2) DEFAULT 0,
                title_dex_bonus NUMERIC(5,2) DEFAULT 0,
                title_vit_bonus NUMERIC(5,2) DEFAULT 0,
                title_int_bonus NUMERIC(5,2) DEFAULT 0,
                title_chr_bonus NUMERIC(5,2) DEFAULT 0,
                is_limited_time BOOLEAN DEFAULT FALSE,
                available_from TIMESTAMPTZ,
                available_until TIMESTAMPTZ,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 15: PLAYER ACHIEVEMENTS
        // ============================================================
        await client.query(`
            CREATE TABLE player_achievements (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                achievement_id UUID NOT NULL REFERENCES achievements(id),
                current_progress INT NOT NULL DEFAULT 0,
                is_completed BOOLEAN NOT NULL DEFAULT FALSE,
                completed_at TIMESTAMPTZ,
                sp_claimed BOOLEAN NOT NULL DEFAULT FALSE,
                sp_claimed_at TIMESTAMPTZ,
                UNIQUE (player_id, achievement_id)
            );
        `);
        await client.query(`CREATE INDEX idx_player_ach ON player_achievements(player_id);`);

        // FK vong cho players.equipped_title_id -> player_achievements
        await client.query(`
            ALTER TABLE players
            ADD CONSTRAINT fk_equipped_title
            FOREIGN KEY (equipped_title_id)
            REFERENCES player_achievements(id)
            ON DELETE SET NULL;
        `);

        // Index tong the
        await client.query(`CREATE INDEX idx_queue_player_status ON action_queue(player_id, status);`);
        await client.query(`CREATE INDEX idx_queue_completes ON action_queue(completes_at) WHERE status = 'PENDING';`);
        await client.query(`CREATE INDEX idx_player_jobs_player ON player_jobs(player_id);`);

        await client.query('COMMIT');
        console.log('[SUCCESS] Toan bo 15 bang he thong Zystem da khoi tao thanh cong!');
        return true;

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[ERROR] Loi nghiem trong khi chay Database Schema, da Rollback:', error.message);
        return false;
    } finally {
        client.release();
    }
}

module.exports = {
    dbPool,
    initializeDatabaseSchema
};

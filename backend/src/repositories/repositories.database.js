// backend/src/repositories/repositories.database.js

require('dotenv').config();
const { Pool } = require('pg');

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const shouldResetDatabaseOnStart = process.env.RESET_DATABASE_ON_START === 'true';

if (!hasDatabaseUrl && (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD)) {
    console.error('[ERROR] Missing database configuration. Set DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD.');
    process.exit(1);
}

const sslConfiguration = process.env.DB_SSL === 'false'
    ? false
    : (hasDatabaseUrl || process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false);

const poolConfiguration = hasDatabaseUrl ? {
    connectionString: process.env.DATABASE_URL,
    ssl: sslConfiguration,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
} : {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: sslConfiguration,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
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

        if (shouldResetDatabaseOnStart) {
            console.warn('[WARN] RESET_DATABASE_ON_START=true. Dropping all Zystem tables before boot.');
            await client.query(`
                DROP TABLE IF EXISTS player_achievements CASCADE;
                DROP TABLE IF EXISTS achievements CASCADE;
                DROP TABLE IF EXISTS user_progress_timestamps CASCADE;
                DROP TABLE IF EXISTS skill_refund_log CASCADE;
                DROP TABLE IF EXISTS player_skills CASCADE;
                DROP TABLE IF EXISTS job_skills CASCADE;
                DROP TABLE IF EXISTS recipe_tag_inputs CASCADE;
                DROP TABLE IF EXISTS player_recipes CASCADE;
                DROP TABLE IF EXISTS recipe_ingredients CASCADE;
                DROP TABLE IF EXISTS recipes CASCADE;
                DROP TABLE IF EXISTS items CASCADE;
                DROP TABLE IF EXISTS item_templates CASCADE;
                DROP TABLE IF EXISTS stat_definitions CASCADE;
                DROP TABLE IF EXISTS item_type_rules CASCADE;
                DROP TABLE IF EXISTS curel_rarity_weights CASCADE;
                DROP TABLE IF EXISTS curel_item_power_matrix CASCADE;
                DROP TABLE IF EXISTS leveling_rules CASCADE;
                DROP TABLE IF EXISTS wallet_transactions CASCADE;
                DROP TABLE IF EXISTS wallets CASCADE;
                DROP TABLE IF EXISTS action_queue CASCADE;
                DROP TABLE IF EXISTS player_jobs CASCADE;
                DROP TABLE IF EXISTS jobs_seed CASCADE;
                DROP TABLE IF EXISTS zones CASCADE;
                DROP TABLE IF EXISTS players CASCADE;
                DROP TABLE IF EXISTS accounts CASCADE;
            `);
        }

        console.log('[INFO] Dang khoi tao toan bo he thong bang Zystem...');

        // ============================================================
        // BANG 1: ACCOUNTS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS accounts (
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
            CREATE TABLE IF NOT EXISTS players (
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
                max_energy INT DEFAULT 100 CHECK (max_energy > 0),
                current_energy INT DEFAULT 100 CHECK (current_energy >= 0),
                max_fatigue INT DEFAULT 400 CHECK (max_fatigue > 0),
                current_fatigue INT DEFAULT 0 CHECK (current_fatigue BETWEEN 0 AND 400),
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
            CREATE TABLE IF NOT EXISTS zones (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(64) NOT NULL UNIQUE,
                display_name VARCHAR(128) NOT NULL,
                zone_type VARCHAR(32) NOT NULL DEFAULT 'overworld',
                biome VARCHAR(32) NOT NULL DEFAULT 'urban',
                level_gap SMALLINT NOT NULL DEFAULT 5,
                world_stage VARCHAR(20) NOT NULL DEFAULT 'early',
                map_role VARCHAR(40),
                min_player_lv SMALLINT NOT NULL DEFAULT 1,
                base_duration_s INT NOT NULL DEFAULT 30,
                infection_risk NUMERIC(4,2) NOT NULL DEFAULT 0,
                radiation_risk NUMERIC(4,2) NOT NULL DEFAULT 0,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);
        await client.query(`ALTER TABLE zones ADD COLUMN IF NOT EXISTS biome VARCHAR(32) NOT NULL DEFAULT 'urban';`);
        await client.query(`ALTER TABLE zones ADD COLUMN IF NOT EXISTS level_gap SMALLINT NOT NULL DEFAULT 5;`);
        await client.query(`ALTER TABLE zones ADD COLUMN IF NOT EXISTS world_stage VARCHAR(20) NOT NULL DEFAULT 'early';`);
        await client.query(`ALTER TABLE zones ADD COLUMN IF NOT EXISTS map_role VARCHAR(40);`);

        // ============================================================
        // BANG 4: JOBS SEED
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS jobs_seed (
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
            CREATE TABLE IF NOT EXISTS player_jobs (
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
        // BANG 5.1: WORLD POIS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS world_pois (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
                code VARCHAR(80) NOT NULL UNIQUE,
                display_name VARCHAR(128) NOT NULL,
                poi_type VARCHAR(40) NOT NULL DEFAULT 'landmark',
                description TEXT,
                is_dungeon BOOLEAN NOT NULL DEFAULT FALSE,
                entry_requirement TEXT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 5.2: POI GAMEPLAY TAGS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS poi_gameplay_tags (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                poi_id UUID NOT NULL REFERENCES world_pois(id) ON DELETE CASCADE,
                tag_type VARCHAR(30) NOT NULL,
                action_type VARCHAR(30) NOT NULL,
                energy_cost_mult NUMERIC(4,2) NOT NULL DEFAULT 1.00,
                fatigue_mult NUMERIC(4,2) NOT NULL DEFAULT 1.00,
                loot_focus TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
                monster_profile VARCHAR(80),
                dungeon_rank_rewards BOOLEAN NOT NULL DEFAULT FALSE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                UNIQUE(poi_id, tag_type)
            );
        `);

        // ============================================================
        // BANG 6: ACTION QUEUE
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS action_queue (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                slot_index SMALLINT CHECK (slot_index BETWEEN 1 AND 5),
                action_type VARCHAR(30) NOT NULL,
                target_zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
                target_poi_id UUID REFERENCES world_pois(id) ON DELETE SET NULL,
                gameplay_tag VARCHAR(30),
                dungeon_mode VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
                status VARCHAR(20) DEFAULT 'PENDING',
                started_at TIMESTAMPTZ DEFAULT NOW(),
                base_duration_s INT NOT NULL DEFAULT 30,
                actual_duration_s INT NOT NULL DEFAULT 30,
                completes_at TIMESTAMPTZ NOT NULL,
                claimed_at TIMESTAMPTZ,
                energy_cost INT NOT NULL DEFAULT 0,
                fatigue_change INT NOT NULL DEFAULT 0,
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
            CREATE TABLE IF NOT EXISTS wallets (
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
            CREATE TABLE IF NOT EXISTS wallet_transactions (
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
        await client.query(`CREATE INDEX IF NOT EXISTS idx_wallet_tx_wallet ON wallet_transactions(wallet_id);`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_wallet_tx_created ON wallet_transactions(created_at DESC);`);

        // ============================================================
        // BANG 9: LEVELING RULES
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS leveling_rules (
                level SMALLINT PRIMARY KEY,
                player_exp_required BIGINT NOT NULL,
                total_player_exp BIGINT NOT NULL,
                skill_exp_required BIGINT NOT NULL,
                total_skill_exp BIGINT NOT NULL,
                breakthrough_time VARCHAR(20),
                notes TEXT
            );
        `);

        await client.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS max_energy INT DEFAULT 100 CHECK (max_energy > 0);`);
        await client.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS current_energy INT DEFAULT 100 CHECK (current_energy >= 0);`);
        await client.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS max_fatigue INT DEFAULT 400 CHECK (max_fatigue > 0);`);
        await client.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS current_fatigue INT DEFAULT 0 CHECK (current_fatigue BETWEEN 0 AND 400);`);
        await client.query(`ALTER TABLE action_queue ADD COLUMN IF NOT EXISTS energy_cost INT NOT NULL DEFAULT 0;`);
        await client.query(`ALTER TABLE action_queue ADD COLUMN IF NOT EXISTS fatigue_change INT NOT NULL DEFAULT 0;`);
        await client.query(`ALTER TABLE action_queue ADD COLUMN IF NOT EXISTS target_poi_id UUID REFERENCES world_pois(id) ON DELETE SET NULL;`);
        await client.query(`ALTER TABLE action_queue ADD COLUMN IF NOT EXISTS gameplay_tag VARCHAR(30);`);
        await client.query(`ALTER TABLE action_queue ADD COLUMN IF NOT EXISTS dungeon_mode VARCHAR(20) NOT NULL DEFAULT 'NORMAL';`);
        await client.query(`
            UPDATE players
            SET max_energy = GREATEST(1, FLOOR(100 + COALESCE(base_vit, 0) + COALESCE(base_str, 0) * 0.2))::INT,
                current_energy = LEAST(
                    GREATEST(1, FLOOR(100 + COALESCE(base_vit, 0) + COALESCE(base_str, 0) * 0.2))::INT,
                    COALESCE(current_energy, GREATEST(1, FLOOR(100 + COALESCE(base_vit, 0) + COALESCE(base_str, 0) * 0.2))::INT)
                ),
                max_fatigue = COALESCE(max_fatigue, 400),
                current_fatigue = LEAST(400, GREATEST(0, COALESCE(current_fatigue, 0)));
        `);

        // ============================================================
        // BANG 10: CUREL ITEM POWER MATRIX
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS curel_item_power_matrix (
                item_level SMALLINT PRIMARY KEY,
                base_item_power SMALLINT NOT NULL,
                common_power SMALLINT NOT NULL,
                uncommon_power SMALLINT NOT NULL,
                rare_power SMALLINT NOT NULL,
                epic_power SMALLINT NOT NULL,
                legendary_power SMALLINT NOT NULL
            );
        `);

        // ============================================================
        // BANG 11: CUREL RARITY WEIGHTS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS curel_rarity_weights (
                curel_level SMALLINT PRIMARY KEY,
                common_weight SMALLINT NOT NULL,
                uncommon_weight SMALLINT NOT NULL,
                rare_weight SMALLINT NOT NULL,
                epic_weight SMALLINT NOT NULL,
                legendary_weight SMALLINT NOT NULL,
                total_weight SMALLINT NOT NULL
            );
        `);

        // ============================================================
        // BANG 12: ITEM TYPE RULES
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS item_type_rules (
                id SMALLSERIAL PRIMARY KEY,
                main_tag VARCHAR(40) NOT NULL UNIQUE,
                sub_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
                item_count INT NOT NULL DEFAULT 0
            );
        `);

        // ============================================================
        // BANG 13: STAT DEFINITIONS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS stat_definitions (
                id SMALLSERIAL PRIMARY KEY,
                stat_type VARCHAR(30) NOT NULL,
                code VARCHAR(50) NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                purpose TEXT,
                notes TEXT,
                UNIQUE(stat_type, code)
            );
        `);

        // ============================================================
        // BANG 14: ITEM TEMPLATES
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS item_templates (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(50) NOT NULL UNIQUE,
                display_name VARCHAR(100) NOT NULL,
                category VARCHAR(30) NOT NULL,
                tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
                description TEXT,
                note TEXT,
                origin VARCHAR(30) DEFAULT 'Gatherable',
                item_level SMALLINT DEFAULT 1,
                lifecycle_model VARCHAR(20) NOT NULL DEFAULT 'None',
                drop_weight_common INT DEFAULT 200,
                drop_weight_uncommon INT DEFAULT 40,
                drop_weight_rare INT DEFAULT 10,
                drop_weight_epic INT DEFAULT 5,
                drop_weight_legendary INT DEFAULT 1,
                required_job_id SMALLINT REFERENCES jobs_seed(id) ON DELETE SET NULL,
                required_job_lv SMALLINT DEFAULT 1,
                base_durability INT DEFAULT 0,
                base_duration_hours INT DEFAULT 0,
                lifecycle_note TEXT,
                is_stackable BOOLEAN DEFAULT FALSE,
                max_stack SMALLINT DEFAULT 1,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 15: ITEMS (instances)
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS items (
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
                item_level SMALLINT,
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
        await client.query(`ALTER TABLE items ADD COLUMN IF NOT EXISTS item_level SMALLINT;`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_items_owner ON items(owner_player_id) WHERE owner_player_id IS NOT NULL;`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_items_equipped ON items(owner_player_id, is_equipped) WHERE is_equipped = TRUE;`);

        // ============================================================
        // BANG 16: RECIPES
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS recipes (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(64) UNIQUE,
                recipe_number SMALLINT UNIQUE,
                output_template_id UUID NOT NULL REFERENCES item_templates(id) ON DELETE CASCADE,
                output_category VARCHAR(30),
                output_qty SMALLINT DEFAULT 1,
                required_job_id SMALLINT REFERENCES jobs_seed(id) ON DELETE CASCADE,
                required_job_level SMALLINT DEFAULT 1,
                sp_to_unlock SMALLINT DEFAULT 0,
                base_craft_time_s INT DEFAULT 5,
                workstation_access TEXT,
                required_tool_name VARCHAR(100),
                tool_durability_cost SMALLINT,
                output_level_formula TEXT,
                workstation_queue_slot VARCHAR(80),
                curel_rule_key VARCHAR(80),
                design_notes TEXT,
                main_material_slots VARCHAR(30),
                curel_mechanic TEXT,
                required_use_case_tags TEXT,
                fail_output_template_id UUID REFERENCES item_templates(id) ON DELETE SET NULL,
                is_auto_unlock BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        // ============================================================
        // BANG 17: RECIPE TAG INPUTS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS recipe_tag_inputs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
                slot_index SMALLINT NOT NULL CHECK (slot_index BETWEEN 1 AND 4),
                tag_query TEXT NOT NULL,
                quantity SMALLINT DEFAULT 1 CHECK (quantity > 0),
                UNIQUE(recipe_id, slot_index)
            );
        `);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_recipe_tag_inputs_recipe ON recipe_tag_inputs(recipe_id);`);

        // ============================================================
        // BANG 18: RECIPE INGREDIENTS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS recipe_ingredients (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
                material_template_id UUID NOT NULL REFERENCES item_templates(id) ON DELETE CASCADE,
                quantity SMALLINT DEFAULT 1 CHECK (quantity > 0),
                min_rarity VARCHAR(20) DEFAULT 'COMMON'
            );
        `);

        // ============================================================
        // BANG 19: PLAYER RECIPES (junction)
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS player_recipes (
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
                unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                PRIMARY KEY (player_id, recipe_id)
            );
        `);

        // ============================================================
        // BANG 20: ACHIEVEMENTS (seed data)
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS achievements (
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
        // BANG 21: PLAYER ACHIEVEMENTS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS player_achievements (
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
        await client.query(`CREATE INDEX IF NOT EXISTS idx_player_ach ON player_achievements(player_id);`);

        // ============================================================
        // BANG 22: USER PROGRESS TIMESTAMPS
        // ============================================================
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_progress_timestamps (
                player_id UUID PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
                last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                last_saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                last_action_claimed_at TIMESTAMPTZ,
                last_inventory_updated_at TIMESTAMPTZ,
                last_character_updated_at TIMESTAMPTZ,
                save_revision BIGINT NOT NULL DEFAULT 1,
                progress_snapshot JSONB NOT NULL DEFAULT '{}'::JSONB,
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_user_progress_saved ON user_progress_timestamps(last_saved_at DESC);`);

        // Circular FK for players.equipped_title_id -> player_achievements.
        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint WHERE conname = 'fk_equipped_title'
                ) THEN
                    ALTER TABLE players
                    ADD CONSTRAINT fk_equipped_title
                    FOREIGN KEY (equipped_title_id)
                    REFERENCES player_achievements(id)
                    ON DELETE SET NULL;
                END IF;
            END $$;
        `);

        // Index tong the
        await client.query(`CREATE INDEX IF NOT EXISTS idx_queue_player_status ON action_queue(player_id, status);`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_queue_completes ON action_queue(completes_at) WHERE status = 'PENDING';`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_player_jobs_player ON player_jobs(player_id);`);


        // === BANG KY NANG (SKILL TREE) ===
        await client.query(`
            CREATE TABLE IF NOT EXISTS job_skills (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                job_code VARCHAR(30) NOT NULL,
                branch VARCHAR(50) NOT NULL DEFAULT 'general',
                skill_code VARCHAR(50) NOT NULL UNIQUE,
                skill_name VARCHAR(100) NOT NULL,
                lv_required SMALLINT NOT NULL DEFAULT 1,
                sp_cost SMALLINT NOT NULL DEFAULT 0,
                tier SMALLINT NOT NULL DEFAULT 1,
                effect_type VARCHAR(50) NOT NULL DEFAULT 'passive',
                effect_val NUMERIC(8,2) NOT NULL DEFAULT 0,
                description TEXT,
                prerequisite_skill_code VARCHAR(50),
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS player_skills (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                skill_id UUID NOT NULL REFERENCES job_skills(id) ON DELETE CASCADE,
                is_unlocked BOOLEAN DEFAULT FALSE,
                unlocked_at TIMESTAMPTZ,
                UNIQUE (player_id, skill_id)
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS skill_refund_log (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                skill_id UUID NOT NULL REFERENCES job_skills(id) ON DELETE CASCADE,
                sp_refunded SMALLINT NOT NULL,
                refunded_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        // Index cho skill system
        await client.query(`CREATE INDEX IF NOT EXISTS idx_player_skills_player ON player_skills(player_id);`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_job_skills_job_code ON job_skills(job_code);`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_refund_log_player_date ON skill_refund_log(player_id, refunded_at);`);

        await client.query('COMMIT');
        console.log('[SUCCESS] Toan bo he thong bang Zystem da khoi tao thanh cong!');
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


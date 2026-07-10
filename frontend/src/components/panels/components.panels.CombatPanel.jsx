// frontend/src/components/panels/components.panels.CombatPanel.jsx

import { useEffect, useMemo, useState } from 'react';

const HIT_ZONES = [
    { label: 'Graze', min: 0, max: 25, className: 'bg-danger/55', multiplier: 0.45 },
    { label: 'Hit', min: 25, max: 43, className: 'bg-cyan/45', multiplier: 1 },
    { label: 'Critical', min: 43, max: 57, className: 'bg-accent/80', multiplier: 1.75 },
    { label: 'Hit', min: 57, max: 75, className: 'bg-cyan/45', multiplier: 1 },
    { label: 'Graze', min: 75, max: 100, className: 'bg-danger/55', multiplier: 0.45 },
];

const COMBAT_ACTIONS = [
    { code: 'punch', label: 'Punch', mark: 'ATK', multiplier: 1 },
    { code: 'skill_1', label: 'Skill 1', mark: 'S1', multiplier: 1.25 },
    { code: 'skill_2', label: 'Skill 2', mark: 'S2', multiplier: 1.45 },
];

const ENEMY_POOL = [
    { name: 'Stray Infected', rank: 'Common', hp: 82, attack: 10, defense: 4 },
    { name: 'Zone Stalker', rank: 'Veteran', hp: 118, attack: 15, defense: 7 },
    { name: 'Mutated Brute', rank: 'Elite', hp: 165, attack: 21, defense: 12 },
];

function getNumber(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return number;
}

function getEquippedWeapon(inventory) {
    return (inventory || []).find(item => (
        item.is_equipped &&
        (item.equip_slot === 'weapon' || String(item.category || '').toUpperCase() === 'WEAPON')
    ));
}

function getWeaponPower(weapon) {
    if (!weapon) return 0;
    const levelPower = getNumber(weapon.item_level) * 3;
    const statPower = [1, 2, 3].reduce((total, index) => total + getNumber(weapon[`stat_${index}_value`]), 0);
    return Math.max(getNumber(weapon.item_power), levelPower, statPower);
}

function getPlayerAttack(character, weapon) {
    const derivedAttack = Math.max(getNumber(character?.attack), getNumber(character?.derived?.attack));
    const strAttack = Math.max(
        getNumber(character?.base_str),
        getNumber(character?.stats?.total?.str),
        getNumber(character?.total_stats?.str)
    ) * 1.5;
    return Math.max(8, derivedAttack, strAttack) + getWeaponPower(weapon);
}

function getPlayerEvasionRate(character) {
    const rawPct = Math.max(
        getNumber(character?.evasion_rate_pct),
        getNumber(character?.derived?.evasion_rate_pct),
        getNumber(character?.derived?.dodge_rate_pct)
    );
    const agiFallback = Math.max(
        getNumber(character?.base_agi),
        getNumber(character?.stats?.total?.agi),
        getNumber(character?.total_stats?.agi)
    ) * 0.05;
    const evasionPct = rawPct > 0 ? rawPct : agiFallback;
    return Math.min(0.5, Math.max(0, evasionPct / 100));
}

function getEnemyHitChance(character) {
    return Math.max(0.4, 1 - getPlayerEvasionRate(character));
}

function createEnemy(character) {
    const playerLevel = Math.max(1, parseInt(character?.player_level) || 1);
    const base = ENEMY_POOL[(playerLevel - 1) % ENEMY_POOL.length];
    const level = Math.max(1, playerLevel + ((playerLevel % 3) - 1));
    const growth = Math.max(0, level - 1);

    return {
        id: `${base.name}-${Date.now()}`,
        name: base.name,
        rank: base.rank,
        level,
        maxHp: base.hp + growth * 13,
        attack: base.attack + growth * 2,
        defense: base.defense + growth,
    };
}

function getHitResult(score) {
    const zone = HIT_ZONES.find(item => score >= item.min && score <= item.max) || HIT_ZONES[0];
    return {
        score,
        outcome: zone.label,
        multiplier: zone.multiplier,
    };
}

function calculatePlayerDamage(config) {
    const rawDamage = (config.playerAttack + config.enemy.level * 2) * config.action.multiplier * config.hit.multiplier;
    const reduction = Math.min(0.45, config.enemy.defense / (config.enemy.defense + 140));
    return Math.max(1, Math.round(rawDamage * (1 - reduction)));
}

function calculateEnemyDamage(config) {
    const hitChance = getEnemyHitChance(config.character);
    if (Math.random() > hitChance) {
        return { damage: 0, isEvaded: true, hitChance };
    }

    return {
        damage: Math.max(1, Math.round(config.enemy.attack)),
        isEvaded: false,
        hitChance,
    };
}

function EnemyPortrait({ enemy }) {
    return (
        <div className="relative mx-auto w-40 h-40 rounded-full border border-border bg-gradient-to-b from-danger/25 to-surface flex items-center justify-center">
            <div className="w-24 h-28 rounded-t-full rounded-b-3xl bg-elevated border border-danger/35 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.12)]">
                <div className="flex gap-5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-danger" />
                    <span className="w-2 h-2 rounded-full bg-danger" />
                </div>
                <div className="w-12 h-1 rounded bg-textMuted/50" />
            </div>
            <span className="absolute bottom-3 text-[10px] font-bold text-textMuted">{enemy.rank}</span>
        </div>
    );
}

export default function CombatPanel({ character, inventory }) {
    const [enemy, setEnemy] = useState(() => createEnemy(character));
    const [enemyHp, setEnemyHp] = useState(enemy.maxHp);
    const [playerHp, setPlayerHp] = useState(() => Math.max(1, parseInt(character?.current_hp) || parseInt(character?.max_hp) || 100));
    const [hitMarker, setHitMarker] = useState(50);
    const [markerDirection, setMarkerDirection] = useState(1);
    const [logs, setLogs] = useState(['A hostile target is in front of you.']);
    const weapon = useMemo(() => getEquippedWeapon(inventory), [inventory]);
    const playerAttack = useMemo(() => getPlayerAttack(character, weapon), [character, weapon]);
    const playerMaxHp = Math.max(1, parseInt(character?.max_hp) || playerHp || 100);
    const enemyHitChance = getEnemyHitChance(character);

    useEffect(() => {
        const timerId = setInterval(() => {
            setHitMarker(current => {
                const next = current + markerDirection * 3.5;
                if (next >= 100) {
                    setMarkerDirection(-1);
                    return 100;
                }
                if (next <= 0) {
                    setMarkerDirection(1);
                    return 0;
                }
                return next;
            });
        }, 30);

        return () => clearInterval(timerId);
    }, [markerDirection]);

    function pushLog(message) {
        setLogs(current => [message, ...current].slice(0, 5));
    }

    function resetEnemy() {
        const nextEnemy = createEnemy(character);
        setEnemy(nextEnemy);
        setEnemyHp(nextEnemy.maxHp);
        setLogs([`A ${nextEnemy.name} appears.`]);
    }

    function handleAction(action) {
        if (enemyHp <= 0 || playerHp <= 0) return;

        const hit = getHitResult(Math.round(hitMarker));
        const damage = calculatePlayerDamage({ playerAttack, enemy, action, hit });
        const nextEnemyHp = Math.max(0, enemyHp - damage);
        setEnemyHp(nextEnemyHp);
        pushLog(`You used ${action.label} on ${enemy.name} for ${damage} damage.`);

        if (nextEnemyHp <= 0) {
            pushLog(`You defeated ${enemy.name}.`);
            return;
        }

        const enemyDamage = calculateEnemyDamage({ enemy, character });
        if (enemyDamage.isEvaded) {
            pushLog(`You evaded ${enemy.name}'s attack.`);
            return;
        }

        setPlayerHp(current => Math.max(0, current - enemyDamage.damage));
        pushLog(`You took ${enemyDamage.damage} damage from ${enemy.name}.`);
    }

    return (
        <div className="h-full flex flex-col bg-base">
            <section className="flex-shrink-0 border-b border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-textMuted">MONSTER</p>
                        <h2 className="text-xl font-bold truncate">{enemy.name}</h2>
                        <p className="text-xs text-textMuted mt-1">Lv.{enemy.level} | {enemy.rank}</p>
                    </div>
                    <button type="button" onClick={resetEnemy} className="btn-secondary px-3 py-2 text-xs">
                        New Target
                    </button>
                </div>
                <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-textMuted mb-1">
                        <span>HP</span>
                        <span>{enemyHp}/{enemy.maxHp}</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill bg-danger" style={{ width: `${(enemyHp / enemy.maxHp) * 100}%` }} />
                    </div>
                </div>
            </section>

            <section className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4">
                <EnemyPortrait enemy={enemy} />
                <div className="card p-3 min-h-36">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-textMuted">BATTLE LOG</p>
                        <p className="text-[10px] text-textMuted">Enemy hit {Math.round(enemyHitChance * 100)}%</p>
                    </div>
                    <div className="space-y-2">
                        {logs.map((log, index) => (
                            <p key={`${log}-${index}`} className={index === 0 ? 'text-sm text-textPrimary' : 'text-xs text-textMuted'}>
                                {log}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex-shrink-0 border-t border-border bg-panel p-4 space-y-3">
                <div>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-textMuted mb-1">
                        <span>PLAYER HP</span>
                        <span>{playerHp}/{playerMaxHp}</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill bg-success" style={{ width: `${(playerHp / playerMaxHp) * 100}%` }} />
                    </div>
                </div>

                <div>
                    <div className="relative h-5 overflow-hidden rounded border border-border bg-surface">
                        <div className="absolute inset-0 flex">
                            {HIT_ZONES.map(zone => (
                                <div
                                    key={`${zone.label}-${zone.min}`}
                                    className={zone.className}
                                    style={{ width: `${zone.max - zone.min}%` }}
                                />
                            ))}
                        </div>
                        <div
                            className="absolute top-0 h-full w-0.5 bg-textPrimary shadow-[0_0_10px_rgba(232,233,237,0.85)]"
                            style={{ left: `${hitMarker}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {COMBAT_ACTIONS.map(action => (
                        <button
                            key={action.code}
                            type="button"
                            onClick={() => handleAction(action)}
                            disabled={enemyHp <= 0 || playerHp <= 0}
                            className="card card-hover p-3 text-left disabled:opacity-50"
                        >
                            <span className="text-[10px] font-bold text-accent block">{action.mark}</span>
                            <span className="text-sm font-semibold block mt-1">{action.label}</span>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}

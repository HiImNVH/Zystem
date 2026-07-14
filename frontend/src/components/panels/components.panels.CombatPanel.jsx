// frontend/src/components/panels/components.panels.CombatPanel.jsx

import { useEffect, useMemo, useState } from 'react';

const TURN_DURATION_MS = 10000;
const READY_DELAY_MIN_MS = 500;
const READY_DELAY_RANGE_MS = 500;
const SAFE_MARKER_GAP_MIN_MS = 250;
const SAFE_MARKER_GAP_RANGE_MS = 100;

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

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

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

function getWeaponProfile(weapon) {
    const text = [
        weapon?.display_name,
        weapon?.category,
        ...(Array.isArray(weapon?.tags) ? weapon.tags : []),
    ].join(' ').toLowerCase();

    if (!weapon) return { type: 'unarmed', label: 'Unarmed', hitCount: 1, travelMs: 1300 };
    if (/(axe|hammer|mace|club|heavy|blunt)/.test(text)) return { type: 'heavy', label: weapon.display_name, hitCount: 1, travelMs: 1450 };
    if (/(dagger|knife|light|quick|dual)/.test(text)) return { type: 'light', label: weapon.display_name, hitCount: 3, travelMs: 1050 };
    if (/(sword|blade|machete|spear)/.test(text)) return { type: 'blade', label: weapon.display_name, hitCount: 2, travelMs: 1200 };
    if (/(gun|rifle|pistol|bow|crossbow|ranged|firearm)/.test(text)) return { type: 'ranged', label: weapon.display_name, hitCount: 1, travelMs: 1100 };
    return { type: 'improvised', label: weapon.display_name || 'Improvised Weapon', hitCount: 1, travelMs: 1250 };
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

function getPlayerDex(character) {
    return Math.max(
        getNumber(character?.base_dex),
        getNumber(character?.dex),
        getNumber(character?.stats?.total?.dex),
        getNumber(character?.total_stats?.dex)
    );
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

function createEnemyFromRequest(combatRequest) {
    const sourceEnemy = combatRequest?.enemy;
    if (!sourceEnemy) return null;

    const level = Math.max(1, parseInt(sourceEnemy.level) || parseInt(combatRequest?.zone?.level_gap) || 1);
    const maxHp = Math.max(1, parseInt(sourceEnemy.health) || parseInt(sourceEnemy.maxHp) || 80);

    return {
        id: sourceEnemy.id || `${sourceEnemy.name}-${combatRequest.requestId}`,
        name: sourceEnemy.name || sourceEnemy.display_name || 'Unknown Threat',
        rank: sourceEnemy.threat || sourceEnemy.rank || 'Common',
        level,
        maxHp,
        attack: Math.max(1, getNumber(sourceEnemy.attack) || 10),
        defense: Math.max(0, getNumber(sourceEnemy.defense)),
    };
}

function createEnemy(character, combatRequest) {
    const requestedEnemy = createEnemyFromRequest(combatRequest);
    if (requestedEnemy) return requestedEnemy;

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

function buildDexHitZones(dexValue) {
    const dex = clamp(dexValue, 0, 160);
    const perfectWidth = clamp(7 + dex * 0.12, 7, 24);
    const goodWidth = clamp(10 + dex * 0.18, 10, 32);
    const missWidth = Math.max(4, (100 - perfectWidth - goodWidth * 2) / 2);
    const firstGoodStart = missWidth;
    const perfectStart = firstGoodStart + goodWidth;
    const secondGoodStart = perfectStart + perfectWidth;

    return [
        { label: 'Miss', min: 0, max: firstGoodStart, className: 'bg-danger/55', multiplier: 0 },
        { label: 'Good', min: firstGoodStart, max: perfectStart, className: 'bg-cyan/45', multiplier: 1 },
        { label: 'Perfect', min: perfectStart, max: secondGoodStart, className: 'bg-accent/85', multiplier: 1.75 },
        { label: 'Good', min: secondGoodStart, max: secondGoodStart + goodWidth, className: 'bg-cyan/45', multiplier: 1 },
        { label: 'Miss', min: secondGoodStart + goodWidth, max: 100, className: 'bg-danger/55', multiplier: 0 },
    ];
}

function getHitOutcome(score, hitZones) {
    const zone = hitZones.find(item => score >= item.min && score <= item.max) || hitZones[0];
    return {
        score: Math.round(score),
        outcome: zone.label.toLowerCase(),
        multiplier: zone.multiplier,
    };
}

function getActionTiming(action, weaponProfile) {
    const bonusHits = action.code === 'skill_1' && weaponProfile.hitCount < 3 ? 1 : 0;
    const hitCount = clamp(weaponProfile.hitCount + bonusHits, 1, 3);
    const travelMs = clamp(weaponProfile.travelMs - (action.code === 'skill_2' ? 100 : 0), 1000, 1500);
    return { hitCount, travelMs };
}

function createRhythmRun(action, weaponProfile) {
    const timing = getActionTiming(action, weaponProfile);
    const safeGap = SAFE_MARKER_GAP_MIN_MS + Math.random() * SAFE_MARKER_GAP_RANGE_MS;
    const markers = Array.from({ length: timing.hitCount }, (_, index) => ({
        id: `${action.code}-${index}-${Math.random().toString(36).slice(2)}`,
        startOffset: 120 + index * safeGap + Math.random() * 90,
    }));
    const totalMs = Math.max(...markers.map(marker => marker.startOffset)) + timing.travelMs + 80;

    return {
        action,
        markers,
        results: [],
        startedAt: Date.now(),
        totalMs,
        travelMs: timing.travelMs,
    };
}

function calculatePlayerDamage(config) {
    const rawDamage = (config.playerAttack + config.enemy.level * 2) * config.action.multiplier * config.multiplier;
    const reduction = Math.min(0.45, config.enemy.defense / (config.enemy.defense + 140));
    return Math.max(0, Math.round(rawDamage * (1 - reduction)));
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

function EnemyPortrait({ enemy, className = 'w-32 h-32', bodyClassName = 'w-20 h-24' }) {
    return (
        <div className={`relative mx-auto rounded-full border border-border bg-gradient-to-b from-danger/25 to-surface flex items-center justify-center ${className}`}>
            <div className={`rounded-t-full rounded-b-3xl bg-elevated border border-danger/35 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.12)] ${bodyClassName}`}>
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

export default function CombatPanel({ character, inventory, combatRequest, isResolving = false, onBack, onVictory, onDefeat }) {
    const [enemy, setEnemy] = useState(() => createEnemy(character, combatRequest));
    const [enemyHp, setEnemyHp] = useState(enemy.maxHp);
    const [playerHp, setPlayerHp] = useState(() => Math.max(1, parseInt(character?.current_hp) || parseInt(character?.max_hp) || 100));
    const [phase, setPhase] = useState('choosing');
    const [turnEndsAt, setTurnEndsAt] = useState(() => Date.now() + TURN_DURATION_MS);
    const [readyEndsAt, setReadyEndsAt] = useState(0);
    const [rhythmRun, setRhythmRun] = useState(null);
    const [clockMs, setClockMs] = useState(Date.now());
    const [combatStatus, setCombatStatus] = useState('fighting');
    const [logs, setLogs] = useState(['A hostile target is in front of you.']);
    const weapon = useMemo(() => getEquippedWeapon(inventory), [inventory]);
    const weaponProfile = useMemo(() => getWeaponProfile(weapon), [weapon]);
    const playerAttack = useMemo(() => getPlayerAttack(character, weapon), [character, weapon]);
    const playerDex = useMemo(() => getPlayerDex(character), [character]);
    const hitZones = useMemo(() => buildDexHitZones(playerDex), [playerDex]);
    const playerMaxHp = Math.max(1, parseInt(character?.max_hp) || playerHp || 100);
    const enemyHitChance = getEnemyHitChance(character);
    const turnSeconds = phase === 'choosing' ? Math.max(0, Math.ceil((turnEndsAt - clockMs) / 1000)) : 0;

    function pushLog(message) {
        setLogs(current => [message, ...current].slice(0, 5));
    }

    function resetTurn() {
        setPhase('choosing');
        setReadyEndsAt(0);
        setRhythmRun(null);
        setTurnEndsAt(Date.now() + TURN_DURATION_MS);
    }

    function applyEnemyCounter() {
        const enemyDamage = calculateEnemyDamage({ enemy, character });
        if (enemyDamage.isEvaded) {
            pushLog(`You evaded ${enemy.name}'s attack.`);
            return true;
        }

        const nextPlayerHp = Math.max(0, playerHp - enemyDamage.damage);
        setPlayerHp(nextPlayerHp);
        pushLog(`You took ${enemyDamage.damage} damage from ${enemy.name}.`);
        if (nextPlayerHp <= 0) {
            setCombatStatus('defeated');
            onDefeat?.();
            return false;
        }
        return true;
    }

    function resetEnemy() {
        const nextEnemy = createEnemy(character, combatRequest);
        setEnemy(nextEnemy);
        setEnemyHp(nextEnemy.maxHp);
        setCombatStatus('fighting');
        setLogs([`A ${nextEnemy.name} appears.`]);
        resetTurn();
    }

    useEffect(() => {
        const timerId = setInterval(() => setClockMs(Date.now()), 50);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const nextEnemy = createEnemy(character, combatRequest);
        setEnemy(nextEnemy);
        setEnemyHp(nextEnemy.maxHp);
        setPlayerHp(Math.max(1, parseInt(character?.current_hp) || parseInt(character?.max_hp) || 100));
        setCombatStatus('fighting');
        setLogs([`A ${nextEnemy.name} appears.`]);
        resetTurn();
    }, [combatRequest?.requestId]);

    useEffect(() => {
        if (phase !== 'choosing' || combatStatus !== 'fighting') return;
        if (clockMs < turnEndsAt) return;
        pushLog('You hesitated and lost the turn.');
        if (applyEnemyCounter()) resetTurn();
    }, [clockMs, phase, turnEndsAt, combatStatus]);

    useEffect(() => {
        if (phase !== 'ready' || clockMs < readyEndsAt || !rhythmRun) return;
        setPhase('rhythm');
        setRhythmRun(current => current ? { ...current, startedAt: Date.now() } : current);
    }, [clockMs, phase, readyEndsAt, rhythmRun]);

    useEffect(() => {
        if (phase !== 'rhythm' || !rhythmRun) return;

        const missedMarkers = rhythmRun.markers
            .filter(marker => !rhythmRun.results.some(result => result.id === marker.id))
            .filter(marker => clockMs - rhythmRun.startedAt - marker.startOffset > rhythmRun.travelMs)
            .map(marker => ({
                id: marker.id,
                score: 100,
                outcome: 'miss',
                multiplier: 0,
            }));

        if (missedMarkers.length > 0) {
            setRhythmRun(current => current ? { ...current, results: [...current.results, ...missedMarkers] } : current);
            return;
        }

        const isComplete = rhythmRun.results.length >= rhythmRun.markers.length ||
            clockMs - rhythmRun.startedAt > rhythmRun.totalMs;
        if (isComplete) resolveRhythm();
    }, [clockMs, phase, rhythmRun]);

    function startAction(action) {
        if (phase !== 'choosing' || combatStatus !== 'fighting' || isResolving) return;
        const nextRun = createRhythmRun(action, weaponProfile);
        setRhythmRun(nextRun);
        setReadyEndsAt(Date.now() + READY_DELAY_MIN_MS + Math.random() * READY_DELAY_RANGE_MS);
        setPhase('ready');
        pushLog(`${action.label} ready...`);
    }

    function getMarkerProgress(marker) {
        if (!rhythmRun) return -1;
        return ((clockMs - rhythmRun.startedAt - marker.startOffset) / rhythmRun.travelMs) * 100;
    }

    function handleRhythmTap() {
        if (phase !== 'rhythm' || !rhythmRun || combatStatus !== 'fighting') return;
        const nextMarker = rhythmRun.markers.find(marker => !rhythmRun.results.some(result => result.id === marker.id));
        if (!nextMarker) return;

        const progress = getMarkerProgress(nextMarker);
        const outcome = progress >= 0 && progress <= 100
            ? getHitOutcome(progress, hitZones)
            : { score: clamp(progress, 0, 100), outcome: 'miss', multiplier: 0 };
        setRhythmRun(current => current ? {
            ...current,
            results: [...current.results, { ...outcome, id: nextMarker.id }],
        } : current);
    }

    async function resolveRhythm() {
        if (!rhythmRun || combatStatus !== 'fighting') return;
        setPhase('resolving');
        const results = rhythmRun.markers.map(marker => (
            rhythmRun.results.find(result => result.id === marker.id) || {
                id: marker.id,
                score: 100,
                outcome: 'miss',
                multiplier: 0,
            }
        ));
        const totalMultiplier = results.reduce((total, result) => total + result.multiplier, 0) / Math.max(1, results.length);
        const bestResult = results.reduce((best, result) => result.multiplier > best.multiplier ? result : best, results[0]);
        const damage = calculatePlayerDamage({
            playerAttack,
            enemy,
            action: rhythmRun.action,
            multiplier: totalMultiplier,
        });

        if (damage <= 0) {
            pushLog(`${rhythmRun.action.label} missed.`);
            if (applyEnemyCounter()) resetTurn();
            return;
        }

        const nextEnemyHp = Math.max(0, enemyHp - damage);
        setEnemyHp(nextEnemyHp);
        pushLog(`${rhythmRun.action.label}: ${results.filter(result => result.multiplier > 0).length}/${results.length} hit, ${damage} damage.`);

        if (nextEnemyHp <= 0) {
            pushLog(`You defeated ${enemy.name}.`);
            setCombatStatus('resolving');
            await onVictory?.({
                combatAction: {
                    code: rhythmRun.action.code,
                    label: rhythmRun.action.label,
                    weaponType: weaponProfile.type,
                    weaponName: weaponProfile.label,
                    calculatedDamage: damage,
                    hitCount: results.length,
                },
                accuracyResult: {
                    score: bestResult.score,
                    outcome: bestResult.outcome,
                    multiplier: parseFloat(totalMultiplier.toFixed(2)),
                    damage,
                    hitCount: results.length,
                    hitsLanded: results.filter(result => result.multiplier > 0).length,
                },
            });
            return;
        }

        if (applyEnemyCounter()) resetTurn();
    }

    function getStatusText() {
        if (phase === 'choosing') return `Choose skill ${turnSeconds}s`;
        if (phase === 'ready') return 'Ready...';
        if (phase === 'rhythm') return 'Tap Strike';
        return 'Resolving...';
    }

    return (
        <div className="h-full flex flex-col bg-base">
            <section className="flex-shrink-0 border-b border-border bg-panel p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-textMuted">MONSTER</p>
                        <h2 className="text-lg font-bold truncate">{enemy.name}</h2>
                        <p className="text-xs text-textMuted mt-1">Lv.{enemy.level} | {enemy.rank} | {weaponProfile.label}</p>
                    </div>
                    {onBack ? (
                        <button type="button" onClick={onBack} className="btn-secondary px-3 py-1.5 text-xs">
                            Back
                        </button>
                    ) : (
                        <button type="button" onClick={resetEnemy} className="btn-secondary px-3 py-1.5 text-xs">
                            New Target
                        </button>
                    )}
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

            <section className="relative min-h-0 flex-1 overflow-hidden bg-gradient-to-b from-base via-surface/25 to-base">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <EnemyPortrait
                        enemy={enemy}
                        className="w-56 h-56 opacity-80"
                        bodyClassName="w-32 h-40"
                    />
                </div>
                <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[10px] text-textMuted">
                    <span className="font-semibold">{getStatusText()}</span>
                    <span>DEX {Math.round(playerDex)} | Enemy hit {Math.round(enemyHitChance * 100)}%</span>
                </div>
                <div className="absolute left-3 right-3 bottom-3 rounded-lg border border-border/80 bg-base/55 px-3 py-2 backdrop-blur-sm">
                    <div className="space-y-1">
                        {logs.slice(0, 3).map((log, index) => (
                            <p key={`${log}-${index}`} className={index === 0 ? 'text-sm text-textPrimary truncate' : 'text-xs text-textMuted truncate'}>
                                {log}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex-shrink-0 border-t border-border bg-panel p-2.5 space-y-2.5">
                <div>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-textMuted mb-1">
                        <span>PLAYER HP</span>
                        <span>{playerHp}/{playerMaxHp}</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill bg-success" style={{ width: `${(playerHp / playerMaxHp) * 100}%` }} />
                    </div>
                </div>

                <div className="relative h-5 overflow-hidden rounded border border-border bg-surface">
                    <div className="absolute inset-0 flex">
                        {hitZones.map(zone => (
                            <div
                                key={`${zone.label}-${zone.min}`}
                                className={zone.className}
                                style={{ width: `${zone.max - zone.min}%` }}
                            />
                        ))}
                    </div>
                    {phase === 'ready' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-base/40 text-[10px] font-bold text-accent">
                            Ready...
                        </div>
                    )}
                    {phase === 'rhythm' && rhythmRun?.markers.map(marker => {
                        const progress = getMarkerProgress(marker);
                        const isDone = rhythmRun.results.some(result => result.id === marker.id);
                        if (progress < -4 || progress > 104 || isDone) return null;
                        return (
                            <span
                                key={marker.id}
                                className="absolute top-0 h-full w-0.5 bg-textPrimary shadow-[0_0_12px_rgba(232,233,237,0.9)]"
                                style={{ left: `${clamp(progress, 0, 100)}%` }}
                            />
                        );
                    })}
                </div>

                {phase === 'rhythm' ? (
                    <button
                        type="button"
                        onClick={handleRhythmTap}
                        disabled={combatStatus !== 'fighting' || isResolving}
                        className="btn-primary w-full py-3"
                    >
                        Strike
                    </button>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {COMBAT_ACTIONS.map(action => {
                            const timing = getActionTiming(action, weaponProfile);
                            return (
                                <button
                                    key={action.code}
                                    type="button"
                                    onClick={() => startAction(action)}
                                    disabled={phase !== 'choosing' || enemyHp <= 0 || playerHp <= 0 || combatStatus !== 'fighting' || isResolving}
                                    className="card card-hover p-2.5 text-left disabled:opacity-50"
                                >
                                    <span className="text-[10px] font-bold text-accent block">{action.mark}</span>
                                    <span className="text-sm font-semibold block mt-1">{action.label}</span>
                                    <span className="text-[10px] text-textMuted">{timing.hitCount} hit</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

// frontend/src/components/panels/components.panels.CombatMiniGame.jsx

import { useEffect, useMemo, useState } from 'react';

const ACCURACY_ZONES = [
    { label: 'Graze', min: 0, max: 25, className: 'bg-danger/55', multiplier: 0.45 },
    { label: 'Hit', min: 25, max: 43, className: 'bg-cyan/45', multiplier: 1 },
    { label: 'Critical', min: 43, max: 57, className: 'bg-accent/80', multiplier: 1.75 },
    { label: 'Hit', min: 57, max: 75, className: 'bg-cyan/45', multiplier: 1 },
    { label: 'Graze', min: 75, max: 100, className: 'bg-danger/55', multiplier: 0.45 },
];

const WEAPON_SKILL_SETS = {
    ranged: [
        { code: 'aimed_shot', label: 'Aimed Shot', shortLabel: 'S1', damageMultiplier: 1.35 },
        { code: 'rapid_fire', label: 'Rapid Fire', shortLabel: 'S2', damageMultiplier: 1.1 },
    ],
    blade: [
        { code: 'deep_cut', label: 'Deep Cut', shortLabel: 'S1', damageMultiplier: 1.3 },
        { code: 'guard_break', label: 'Guard Break', shortLabel: 'S2', damageMultiplier: 1.15 },
    ],
    blunt: [
        { code: 'heavy_crush', label: 'Heavy Crush', shortLabel: 'S1', damageMultiplier: 1.4 },
        { code: 'stagger_blow', label: 'Stagger Blow', shortLabel: 'S2', damageMultiplier: 1.2 },
    ],
    improvised: [
        { code: 'quick_strike', label: 'Quick Strike', shortLabel: 'S1', damageMultiplier: 1.15 },
        { code: 'low_sweep', label: 'Low Sweep', shortLabel: 'S2', damageMultiplier: 1.05 },
    ],
};

const ITEM_RARITY_TEXT = {
    COMMON: 'text-textMuted',
    UNCOMMON: 'text-success',
    RARE: 'text-cyan',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-accent',
};

function getItemRarityClassName(item) {
    return ITEM_RARITY_TEXT[String(item?.rarity || 'COMMON').toUpperCase()] || ITEM_RARITY_TEXT.COMMON;
}

function getDroppedItemName(item) {
    return item?.display_name || item?.name || item?.template_id || 'Unknown item';
}

function DroppedItemsInline({ items }) {
    const droppedItems = Array.isArray(items) ? items : [];
    if (droppedItems.length === 0) {
        return <span className="text-textMuted">No item dropped.</span>;
    }

    return droppedItems.map((item, index) => (
        <span key={item.id || `${item.template_id}-${index}`}>
            {index > 0 && <span className="text-textMuted">, </span>}
            <span className={getItemRarityClassName(item)}>{getDroppedItemName(item)}</span>
        </span>
    ));
}

function getWeaponProfile(weapon) {
    const weaponText = [
        weapon?.display_name,
        weapon?.category,
        ...(Array.isArray(weapon?.tags) ? weapon.tags : []),
    ].join(' ').toLowerCase();

    if (!weapon) return { type: 'improvised', label: 'Unarmed' };
    if (/(gun|rifle|pistol|bow|crossbow|ranged|firearm)/.test(weaponText)) return { type: 'ranged', label: weapon.display_name };
    if (/(knife|blade|sword|axe|machete|spear|slash)/.test(weaponText)) return { type: 'blade', label: weapon.display_name };
    if (/(club|bat|hammer|mace|blunt|crush)/.test(weaponText)) return { type: 'blunt', label: weapon.display_name };
    return { type: 'improvised', label: weapon.display_name || 'Improvised Weapon' };
}

function getEquippedWeapon(inventory) {
    return (inventory || []).find(item => (
        item.is_equipped &&
        (item.equip_slot === 'weapon' || String(item.category || '').toUpperCase() === 'WEAPON')
    ));
}

function getAccuracyResult(score) {
    const zone = ACCURACY_ZONES.find(item => score >= item.min && score <= item.max) || ACCURACY_ZONES[0];
    return {
        score,
        outcome: zone.label.toLowerCase(),
        label: zone.label,
        multiplier: zone.multiplier,
    };
}

function getBaseDamage(enemy) {
    const attack = parseInt(enemy?.attack) || 10;
    const level = parseInt(enemy?.level) || 1;
    return Math.max(8, Math.round(attack * 2 + level * 3));
}

function calculateEnemyCounterDamage(enemy, accuracyResult) {
    if (accuracyResult.outcome === 'critical') return 0;
    const enemyAttack = parseInt(enemy?.attack) || 8;
    const counterMultiplier = accuracyResult.outcome === 'graze' ? 1 : 0.55;
    return Math.max(1, Math.round(enemyAttack * counterMultiplier));
}

function EncounterRewardDetails({ result }) {
    if (!result) return null;

    const moneyValue = parseInt(result.money_dropped) || 0;

    return (
        <div className="mt-1 space-y-1 text-xs text-textSecondary">
            <p>
                Energy -{result.energy_cost}, EXP +{result.player_exp}
                {moneyValue > 0 ? `, Money +${moneyValue.toLocaleString()}` : ''}.
            </p>
            <p>
                Found: <DroppedItemsInline items={result.items_dropped} />
            </p>
        </div>
    );
}

export default function CombatMiniGame({ enemy, character, inventory, isExecuting, onBack, onAttack }) {
    const [accuracyMarker, setAccuracyMarker] = useState(50);
    const [markerDirection, setMarkerDirection] = useState(1);
    const [lastAccuracyResult, setLastAccuracyResult] = useState(null);
    const [enemyHealth, setEnemyHealth] = useState(() => parseInt(enemy?.health) || 1);
    const [playerHealth, setPlayerHealth] = useState(() => parseInt(character?.current_hp) || parseInt(character?.max_hp) || 1);
    const [combatOutcome, setCombatOutcome] = useState(null);
    const [isResolving, setIsResolving] = useState(false);
    const enemyMaxHealth = Math.max(1, parseInt(enemy?.health) || 1);
    const playerMaxHealth = Math.max(1, parseInt(character?.max_hp) || playerHealth || 1);
    const weapon = useMemo(() => getEquippedWeapon(inventory), [inventory]);
    const weaponProfile = useMemo(() => getWeaponProfile(weapon), [weapon]);
    const baseDamage = useMemo(() => getBaseDamage(enemy), [enemy]);
    const skills = WEAPON_SKILL_SETS[weaponProfile.type] || WEAPON_SKILL_SETS.improvised;
    const actions = [
        { code: 'normal_attack', label: 'Attack', shortLabel: 'ATK', damageMultiplier: 1 },
        ...skills,
    ];

    useEffect(() => {
        const timerId = setInterval(() => {
            setAccuracyMarker(current => {
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

    async function handleAction(action) {
        if (!enemy || isExecuting || isResolving || combatOutcome) return;
        const accuracyResult = getAccuracyResult(Math.round(accuracyMarker));
        const damage = Math.max(1, Math.round(baseDamage * action.damageMultiplier * accuracyResult.multiplier));
        const nextEnemyHealth = Math.max(0, enemyHealth - damage);
        const counterDamage = nextEnemyHealth > 0 ? calculateEnemyCounterDamage(enemy, accuracyResult) : 0;
        const nextPlayerHealth = Math.max(0, playerHealth - counterDamage);
        const combatAction = {
            code: action.code,
            label: action.label,
            weaponType: weaponProfile.type,
            weaponName: weaponProfile.label,
            baseDamage,
            damageMultiplier: action.damageMultiplier,
            calculatedDamage: damage,
        };
        const result = {
            ...accuracyResult,
            damage,
            counterDamage,
            enemyHealth: nextEnemyHealth,
            playerHealth: nextPlayerHealth,
        };
        setEnemyHealth(nextEnemyHealth);
        setPlayerHealth(nextPlayerHealth);
        setLastAccuracyResult({ ...result, actionLabel: action.label });

        if (nextEnemyHealth <= 0) {
            setIsResolving(true);
            try {
                const execution = await onAttack?.({ combatAction, accuracyResult: result });
                if (execution?.success === false) {
                    setCombatOutcome({ type: 'error', message: execution.error || 'Could not resolve the encounter.' });
                    return;
                }
                setCombatOutcome({ type: 'victory', result: execution?.data });
            } catch (error) {
                setCombatOutcome({ type: 'error', message: error.message || 'Could not resolve the encounter.' });
            } finally {
                setIsResolving(false);
            }
            return;
        }

        if (nextPlayerHealth <= 0) {
            setCombatOutcome({ type: 'defeat', message: 'You lost the fight. No reward was claimed.' });
        }
    }

    return (
        <div className="space-y-4">
            <button type="button" onClick={onBack} className="btn-secondary px-3 py-2 text-xs">
                Back to enemy list
            </button>

            <div className="rounded-lg border border-border bg-base p-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-textMuted">TARGET</p>
                        <h3 className="text-lg font-bold truncate">{enemy?.name || 'Unknown Enemy'}</h3>
                        <p className="text-xs text-textMuted mt-1">Lv.{enemy?.level || 1} | DEF {enemy?.defense || 0}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-[10px] font-semibold text-textMuted">WEAPON</p>
                        <p className="text-xs font-semibold text-accent max-w-32 truncate">{weaponProfile.label}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-textMuted mb-1">
                            <span>ENEMY HP</span>
                            <span>{enemyHealth}/{enemyMaxHealth}</span>
                        </div>
                        <div className="progress-track">
                            <div className="progress-fill bg-danger" style={{ width: `${(enemyHealth / enemyMaxHealth) * 100}%` }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-textMuted mb-1">
                            <span>PLAYER HP</span>
                            <span>{playerHealth}/{playerMaxHealth}</span>
                        </div>
                        <div className="progress-track">
                            <div className="progress-fill bg-success" style={{ width: `${(playerHealth / playerMaxHealth) * 100}%` }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-textMuted">
                        <span>ACCURACY</span>
                        <span>
                            {lastAccuracyResult
                                ? `${lastAccuracyResult.label} | DMG ${lastAccuracyResult.damage} | Taken ${lastAccuracyResult.counterDamage}`
                                : 'Time the strike'}
                        </span>
                    </div>
                    <div className="relative h-5 overflow-hidden rounded border border-border bg-surface">
                        <div className="absolute inset-0 flex">
                            {ACCURACY_ZONES.map(zone => (
                                <div
                                    key={`${zone.label}-${zone.min}`}
                                    className={zone.className}
                                    style={{ width: `${zone.max - zone.min}%` }}
                                />
                            ))}
                        </div>
                        <div
                            className="absolute top-0 h-full w-0.5 bg-textPrimary shadow-[0_0_10px_rgba(232,233,237,0.85)]"
                            style={{ left: `${accuracyMarker}%` }}
                        />
                    </div>
                    <div className="grid grid-cols-3 text-[10px] font-semibold text-textMuted">
                        <span>Graze</span>
                        <span className="text-center text-accent">Critical</span>
                        <span className="text-right">Graze</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {actions.map(action => (
                        <button
                            key={action.code}
                            type="button"
                            onClick={() => handleAction(action)}
                            disabled={isExecuting || isResolving || Boolean(combatOutcome) || enemyHealth <= 0 || playerHealth <= 0}
                            className="card card-hover p-3 text-left disabled:opacity-50"
                        >
                            <span className="text-[10px] font-bold text-accent block">{action.shortLabel}</span>
                            <span className="text-sm font-semibold block mt-1">{isExecuting || isResolving ? 'Resolving...' : action.label}</span>
                            <span className="text-[10px] text-textMuted block mt-2">
                                {enemyHealth <= 0 ? 'Claiming reward' : `Base DMG ${Math.round(baseDamage * action.damageMultiplier)}`}
                            </span>
                        </button>
                    ))}
                </div>
                {combatOutcome?.type === 'victory' && (
                    <div className="rounded-lg border border-success/40 bg-success/10 p-3">
                        <p className="text-sm font-semibold text-success">Victory</p>
                        <EncounterRewardDetails result={combatOutcome.result} />
                    </div>
                )}
                {combatOutcome?.type === 'defeat' && (
                    <div className="rounded-lg border border-danger/40 bg-danger/10 p-3">
                        <p className="text-sm font-semibold text-danger">Defeat</p>
                        <p className="text-xs text-textSecondary mt-1">{combatOutcome.message}</p>
                    </div>
                )}
                {combatOutcome?.type === 'error' && (
                    <div className="rounded-lg border border-danger/40 bg-danger/10 p-3">
                        <p className="text-sm font-semibold text-danger">Resolution failed</p>
                        <p className="text-xs text-textSecondary mt-1">{combatOutcome.message}</p>
                    </div>
                )}
                {!combatOutcome && enemyHealth > 0 && playerHealth > 0 && (
                    <p className="text-[11px] text-textMuted">
                        Reduce enemy HP to zero to resolve the encounter and claim rewards.
                    </p>
                )}
                {!combatOutcome && playerHealth <= 0 && (
                    <p className="text-xs text-danger">
                        You are down. Retreat to recover before continuing.
                    </p>
                )}
            </div>
        </div>
    );
}

// frontend/src/components/panels/components.panels.MainPanel.ActivitySheets.jsx

import { useEffect, useState } from 'react';
import CombatPanel from './components.panels.CombatPanel';
import {
    canSpendEnergy,
    formatDropTable,
    getDroppedItemName,
    getDroppedItemsText,
    getEnergyErrorMessage,
    getItemRarityClassName,
    getPoiActionOptions,
    getTargetEnergyCost,
} from './components.panels.mainPanel.shared';

function DroppedItemsInline({ items }) {
    const droppedItems = Array.isArray(items) ? items : [];
    if (droppedItems.length === 0) {
        return <span className="text-textMuted">No item found.</span>;
    }

    return droppedItems.map((item, index) => (
        <span key={item.id || `${item.template_id}-${index}`}>
            {index > 0 && <span className="text-textMuted">, </span>}
            <span className={getItemRarityClassName(item)}>{getDroppedItemName(item)}</span>
        </span>
    ));
}



export function formatActionResult(result) {
    if (!result) return '';
    const itemsText = getDroppedItemsText(result.items_dropped);
    const moneyText = result.money_dropped ? `, Money +${parseInt(result.money_dropped).toLocaleString()}` : '';
    const itemText = itemsText ? `, found ${itemsText}` : '';
    const sweepText = result.sweep_event ? `${result.sweep_event.label}: ` : '';
    return `${sweepText}Energy -${result.energy_cost}, EXP +${result.player_exp}${itemText}${moneyText}.`;
}



function ActionResultDetails({ result }) {
    if (!result) return null;

    const moneyValue = parseInt(result.money_dropped) || 0;

    return (
        <div className="mt-2 space-y-1 text-xs text-textSecondary">
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



export function ActivityListSheet({ activityType, activityData, character, inventory, isLoading, error, onClose, onExecute, onCombatFocusChange, executingId }) {
    const [activeEnemy, setActiveEnemy] = useState(null);
    const [combatResult, setCombatResult] = useState(null);
    const [cooldownEndsAt, setCooldownEndsAt] = useState(0);
    const [nowMs, setNowMs] = useState(Date.now());
    const [sheetError, setSheetError] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [resultData, setResultData] = useState(null);

    const titleMap = {
        enemy: 'Find enemies',
        scavenge: 'Scavenge',
        gather: 'Gather',
        sweep: 'Sweep',
        dungeon: 'Sweep',
    };
    const list = activityType === 'enemy'
        ? (activityData?.enemies || [])
        : (activityType === 'scavenge'
            ? (activityData?.scavengeables || [])
            : (activityType === 'gather' ? (activityData?.gatherables || []) : []));
    const sweep = activityData?.sweep || activityData?.dungeon;
    const cooldownSeconds = Math.max(0, Math.ceil((cooldownEndsAt - nowMs) / 1000));

    useEffect(() => {
        if (!cooldownEndsAt) return undefined;
        const timerId = setInterval(() => setNowMs(Date.now()), 250);
        return () => clearInterval(timerId);
    }, [cooldownEndsAt]);

    useEffect(() => {
        onCombatFocusChange?.(Boolean(activeEnemy));
        return () => onCombatFocusChange?.(false);
    }, [activeEnemy, onCombatFocusChange]);

    if (!activityType) return null;

    async function startActivity(options) {
        const { item, mode } = options;
        const targetEnergyCost = getTargetEnergyCost(activityData, activityType, item);
        if (targetEnergyCost > 0 && !canSpendEnergy(character, targetEnergyCost)) {
            setSheetError(getEnergyErrorMessage(character, targetEnergyCost));
            return;
        }

        setSheetError('');
        setCombatResult(null);
        setResultMessage('');
        setResultData(null);
        if (activityType === 'enemy') {
            setActiveEnemy(item);
            return;
        }

        const result = await onExecute?.(item, mode ? { mode } : undefined);
        if (['scavenge', 'gather'].includes(activityType) && result?.success !== false) {
            const verb = activityType === 'gather' ? 'Gathered from' : 'Found something in';
            setResultMessage(`${verb} ${item.name}.`);
            setResultData(result.data);
        }
    }

    async function resolveVictory(enemy) {
        const result = await onExecute?.(enemy);
        if (result?.success === false) {
            setCombatResult({ type: 'error', message: result.error || 'Could not claim combat reward.' });
            setActiveEnemy(null);
            return;
        }

        setCombatResult({ type: 'victory', result: result?.data });
        setActiveEnemy(null);
    }

    function resolveDefeat() {
        setCooldownEndsAt(Date.now() + 5000);
        setNowMs(Date.now());
        setCombatResult({ type: 'defeat' });
        setActiveEnemy(null);
    }

    if (!isLoading && activityType === 'enemy' && activeEnemy) {
        return (
            <div className="h-full">
                <CombatPanel
                    character={character}
                    inventory={inventory}
                    combatRequest={{
                        enemy: activeEnemy,
                        zone: activityData?.zone,
                        requestId: activeEnemy.id,
                    }}
                    isResolving={Boolean(executingId)}
                    onBack={() => setActiveEnemy(null)}
                    onVictory={() => resolveVictory(activeEnemy)}
                    onDefeat={resolveDefeat}
                />
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="w-full p-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold">{titleMap[activityType]}</h3>
                        <p className="text-xs text-textMuted mt-1 truncate">
                            {activityData?.poi?.display_name || 'POI'} | Lv.{activityData?.zone?.level_gap || activityData?.zone?.min_player_lv || 1}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                {isLoading && <p className="text-sm text-textMuted py-6 text-center">Loading...</p>}
                {(error || sheetError) && <p className="text-sm text-danger mb-3">{error || sheetError}</p>}
                {combatResult?.type === 'victory' && (
                    <div className="mb-3 rounded-lg border border-success/40 bg-success/10 px-3 py-2">
                        <p className="text-sm font-semibold text-success">Victory</p>
                        <p className="text-xs text-textSecondary mt-1">Enemy defeated. Rewards claimed.</p>
                        <ActionResultDetails result={combatResult.result} />
                    </div>
                )}
                {combatResult?.type === 'defeat' && (
                    <div className="mb-3 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2">
                        <p className="text-sm font-semibold text-danger">Defeat</p>
                        <p className="text-xs text-textSecondary mt-1">
                            Recovery cooldown: {cooldownSeconds > 0 ? `${cooldownSeconds}s` : 'ready'}.
                        </p>
                    </div>
                )}
                {combatResult?.type === 'error' && (
                    <div className="mb-3 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2">
                        <p className="text-sm font-semibold text-danger">Combat result error</p>
                        <p className="text-xs text-textSecondary mt-1">{combatResult.message}</p>
                    </div>
                )}
                {resultMessage && (
                    <div className="mb-3 rounded-lg border border-success/40 bg-success/10 px-3 py-2">
                        <p className="text-sm font-semibold text-success">Search result</p>
                        <p className="text-xs text-textSecondary mt-1">{resultMessage}</p>
                        <ActionResultDetails result={resultData} />
                    </div>
                )}
                {!isLoading && activityType !== 'sweep' && activityType !== 'dungeon' && !activeEnemy && (
                    <div className="space-y-2">
                        {list.map(item => (
                            <div key={item.id} className="card p-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-[10px] font-bold text-accent flex-shrink-0">
                                    {activityType === 'enemy' ? item.threat?.slice(0, 2).toUpperCase() : (activityType === 'gather' ? 'GA' : 'SC')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{item.name}</p>
                                    {activityType === 'enemy' ? (
                                        <>
                                            <p className="text-xs text-textMuted truncate">
                                                Lv.{item.level} | HP {item.health} | ATK {item.attack} | DEF {item.defense}
                                            </p>
                                            <p className="text-[11px] text-textMuted truncate">
                                                Drops: {formatDropTable(item.drop_table)}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-xs text-textMuted truncate">
                                                Zone Lv.{item.item_level} | {item.category_label || item.category} | Energy {getTargetEnergyCost(activityData, activityType, item)}
                                            </p>
                                            <p className="text-[11px] text-textMuted truncate">
                                                {item.reward_hint}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => startActivity({ item })}
                                    disabled={Boolean(executingId) || (activityType === 'enemy' && cooldownSeconds > 0)}
                                    className="btn-primary px-3 py-2 text-xs flex-shrink-0"
                                >
                                    {executingId === item.id
                                        ? 'Working...'
                                        : (activityType === 'enemy' && cooldownSeconds > 0
                                            ? `${cooldownSeconds}s`
                                            : (activityType === 'enemy' ? 'Engage' : (activityType === 'gather' ? 'Gather' : 'Search')))}
                                </button>
                            </div>
                        ))}
                        {list.length === 0 && (
                            <p className="text-sm text-textMuted py-6 text-center">Nothing available here.</p>
                        )}
                    </div>
                )}

                {!isLoading && (activityType === 'sweep' || activityType === 'dungeon') && (
                    sweep ? (
                        <div className="space-y-3">
                            <div className="card p-4">
                                <p className="font-semibold">{sweep.name}</p>
                                <p className="text-xs text-textMuted mt-1">Map Lv.{sweep.map_level} | Boss Lv.{sweep.boss_level}</p>
                                {sweep.event_pool?.length > 0 && (
                                    <p className="text-[11px] text-textMuted mt-1 truncate">
                                        Events: {sweep.event_pool.map(event => event.label).join(' | ')}
                                    </p>
                                )}
                            </div>
                            <div className="w-full card p-3 text-left">
                                <p className="text-sm font-semibold">Next sweep turn</p>
                                <p className="text-xs text-textMuted mt-1">{sweep.normal.reward_hint}</p>
                                <button
                                    type="button"
                                    onClick={() => startActivity({ item: sweep, mode: 'normal' })}
                                    disabled={Boolean(executingId)}
                                    className="btn-primary mt-3 px-3 py-2 text-xs"
                                >
                                    {executingId === `${sweep.id}:normal` ? 'Sweeping...' : 'Sweep'}
                                </button>
                            </div>
                            <div className="w-full card p-3 text-left">
                                <p className="text-sm font-semibold">Boss</p>
                                <p className="text-xs text-textMuted mt-1">{sweep.hard.monster_level_rule} | {sweep.hard.reward_hint}</p>
                                <button
                                    type="button"
                                    onClick={() => startActivity({ item: sweep, mode: 'retreat' })}
                                    disabled={Boolean(executingId)}
                                    className="btn-secondary mt-3 px-3 py-2 text-xs"
                                >
                                    {executingId === `${sweep.id}:retreat` ? 'Retreating...' : 'Retreat'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-textMuted py-6 text-center">This POI has no sweep route yet.</p>
                    )
                )}
            </div>
        </div>
    );
}



export function PoiActionSheet({ poi, onClose, onOpenActivity }) {
    if (!poi) return null;

    return (
        <div className="p-4">
            <div className="w-full p-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold truncate">{poi.display_name}</h3>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                <div className="space-y-2">
                    {getPoiActionOptions().map(option => (
                        <button
                            key={option.type}
                            type="button"
                            disabled={!option.isAvailable}
                            onClick={() => option.isAvailable && onOpenActivity?.(poi, option.type)}
                            className={`w-full p-3 rounded-lg border text-left transition-colors ${
                                option.isAvailable
                                    ? 'border-border hover:border-accent/50'
                                    : 'border-border/50 opacity-40 cursor-not-allowed'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold">{option.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// frontend/src/components/panels/MainPanel.jsx

import { useState, useEffect } from 'react';
import { registerAction, claimAction, cancelAction } from '../../api/api.game';

const DESTINATIONS = {
    EXPEDITION: {
        label: 'Go exploring',
        mark: 'EX',
        helper: 'Fight, explore, and gather resources outside the safe zone.',
    },
    HOME: {
        label: 'Stay home',
        mark: 'HM',
        helper: 'Craft, trade, and turn resources into power.',
    },
};

const ACTION_CONFIG = {
    BATTLE:  { label: 'Battle', mark: 'BT', destination: 'EXPEDITION', zones: ['urban', 'rural', 'coast', 'forest', 'desert'], helper: 'High risk, high EXP, and a chance to find equipment.' },
    EXPLORE: { label: 'Explore', mark: 'EX', destination: 'EXPEDITION', zones: ['urban', 'rural', 'coast', 'forest', 'desert'], helper: 'Search POIs for supplies, crafting materials, and salvage.' },
    DUNGEON: { label: 'Dungeon', mark: 'DG', destination: 'EXPEDITION', zones: ['urban', 'rural', 'coast', 'forest', 'desert'], helper: 'Instance run with boss pressure and rank-based chest rewards.' },
    MINE:    { label: 'Mine', mark: 'MI', destination: 'EXPEDITION', zones: ['rural', 'desert'], helper: 'Gather stone, ore, and base materials.' },
    CHOP:    { label: 'Chop Wood', mark: 'CH', destination: 'EXPEDITION', zones: ['forest', 'rural'], helper: 'Gather wood, branches, and building materials.' },
    HUNT:    { label: 'Skirmish', mark: 'HU', destination: 'EXPEDITION', zones: ['urban', 'rural', 'coast', 'forest', 'desert'], helper: 'Hunt local threats for survival materials and combat EXP.' },
    FORAGE:  { label: 'Forage', mark: 'FO', destination: 'EXPEDITION', zones: ['forest', 'rural', 'coast'], helper: 'Gather food, herbs, and small materials.' },
    CRAFT:   { label: 'Craft', mark: 'CR', destination: 'HOME', zones: ['safe'], helper: 'Use time at home to create craftable items.' },
    TRADE:   { label: 'Trade', mark: 'TR', destination: 'HOME', zones: ['safe'], helper: 'Sell junk and common materials for copper.' },
    REST:    { label: 'Rest at Campfire', mark: 'RS', destination: 'HOME', zones: ['safe'], helper: 'Spend quiet time to reduce fatigue.' },
    SLEEP:   { label: 'Sleep', mark: 'SL', destination: 'HOME', zones: ['safe'], helper: 'Recover fatigue faster at home.' },
};

const DURATION_OPTIONS = [
    { label: '10 seconds', value: 10 },
    { label: '5 minutes', value: 300 },
    { label: '15 minutes', value: 900 },
    { label: '30 minutes', value: 1800 },
    { label: '1 hour', value: 3600 },
    { label: '4 hours', value: 14400 },
    { label: '8 hours', value: 28800 },
];

const ZONE_BANNERS = {
    urban:   { gradient: 'from-zinc-700/40 to-base', mark: 'UR' },
    rural:   { gradient: 'from-lime-900/35 to-base', mark: 'RU' },
    coast:   { gradient: 'from-cyan-900/35 to-base', mark: 'CO' },
    forest:  { gradient: 'from-emerald-900/40 to-base', mark: 'FO' },
    desert:  { gradient: 'from-amber-900/40 to-base', mark: 'DE' },
    safe:    { gradient: 'from-cyan-900/30 to-base', mark: 'HM' },
};

const ACTION_RESOURCE_RULES = {
    EXPLORE: { energyPerUnit: 8, fatiguePerUnit: 10 },
    BATTLE:  { energyPerUnit: 10, fatiguePerUnit: 12 },
    DUNGEON: { energyPerUnit: 14, fatiguePerUnit: 18 },
    MINE:    { energyPerUnit: 7, fatiguePerUnit: 9 },
    CHOP:    { energyPerUnit: 6, fatiguePerUnit: 8 },
    HUNT:    { energyPerUnit: 9, fatiguePerUnit: 11 },
    FORAGE:  { energyPerUnit: 4, fatiguePerUnit: 6 },
    CRAFT:   { energyPerUnit: 5, fatiguePerUnit: 5 },
    TRADE:   { energyPerUnit: 2, fatiguePerUnit: 3 },
    REST:    { energyPerUnit: 0, fatiguePerUnit: -16 },
    SLEEP:   { energyPerUnit: 0, fatiguePerUnit: -28 },
};

const ZONE_FATIGUE_MULTIPLIER = {
    safe: 0.75,
    urban: 1.05,
    rural: 0.95,
    coast: 1.1,
    forest: 1,
    mine: 1.1,
    ruins: 1.2,
    dungeon: 1.25,
    hazard: 1.35,
    desert: 1.45,
};

function calculateResourcePreview(actionType, durationSeconds, zoneType, tag) {
    const rule = ACTION_RESOURCE_RULES[actionType] || ACTION_RESOURCE_RULES.EXPLORE;
    const actionUnits = Math.max(1, Math.ceil((durationSeconds || 0) / 1800));
    const zoneMultiplier = ZONE_FATIGUE_MULTIPLIER[zoneType] || 1;
    const isRecovery = rule.fatiguePerUnit < 0;
    const energyMultiplier = parseFloat(tag?.energy_cost_mult) || 1;
    const tagFatigueMultiplier = parseFloat(tag?.fatigue_mult) || 1;
    const fatigueValue = rule.fatiguePerUnit * actionUnits * (isRecovery ? 1 : zoneMultiplier * tagFatigueMultiplier);

    return {
        energyCost: Math.max(0, Math.ceil(rule.energyPerUnit * actionUnits * energyMultiplier)),
        fatigueChange: isRecovery ? Math.floor(fatigueValue) : Math.ceil(fatigueValue),
    };
}

function ResourceMeter({ label, current, max, tone }) {
    const safeMax = Math.max(1, parseInt(max) || 1);
    const safeCurrent = Math.max(0, parseInt(current) || 0);
    const pct = Math.min(100, Math.round((safeCurrent / safeMax) * 100));
    const fillClass = tone === 'fatigue'
        ? (pct >= 88 ? 'bg-danger' : pct >= 75 ? 'bg-accent' : 'bg-cyan')
        : 'bg-success';

    return (
        <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-textMuted uppercase font-semibold">{label}</span>
                <span className="font-mono text-textSecondary">{safeCurrent}/{safeMax}</span>
            </div>
            <div className="progress-track">
                <div className={`progress-fill ${fillClass}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function CountdownDisplay({ completesAt, onComplete }) {
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const calculate = () => {
            const diff = Math.max(0, Math.ceil((new Date(completesAt) - Date.now()) / 1000));
            setRemaining(diff);
            if (diff === 0) onComplete?.();
        };
        calculate();
        const intervalId = setInterval(calculate, 1000);
        return () => clearInterval(intervalId);
    }, [completesAt, onComplete]);

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;
    const pad = value => String(value).padStart(2, '0');

    return remaining === 0
        ? <span className="text-accent font-semibold animate-pulse2">Ready to claim</span>
        : <span className="font-mono">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>;
}

function ActiveActionCard({ slot, playerId, onUpdate, onNotify }) {
    const [isLoading, setIsLoading] = useState(false);
    const isComplete = new Date(slot.completes_at) <= new Date();
    const config = ACTION_CONFIG[slot.action_type] || { mark: 'AC', label: slot.action_type };

    async function handleClaim() {
        setIsLoading(true);
        try {
            const result = await claimAction(playerId, slot.id);
            const rewards = result.data.rewards;
            const rewardParts = [
                `+${rewards.exp_gained} EXP`,
                `+${rewards.items_dropped?.length || 0} items`,
            ];
            if (rewards.copper_gained) rewardParts.push(`+${rewards.copper_gained} copper`);
            if (rewards.sold_items?.length) rewardParts.push(`sold ${rewards.sold_items.length} items`);
            if (rewards.resource_update) {
                rewardParts.push(`fatigue ${rewards.resource_update.current_fatigue}/${rewards.resource_update.max_fatigue}`);
            }
            onNotify(`Claimed: ${rewardParts.join(', ')}`, 'success');
            onUpdate();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCancel() {
        setIsLoading(true);
        try {
            await cancelAction(playerId, slot.id);
            onNotify('Action canceled', 'success');
            onUpdate();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="card p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                {config.mark}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{config.label}</p>
                <p className="text-xs text-textMuted truncate">
                    {slot.poi_name || slot.zone_name || 'Safe home'} | EN -{slot.energy_cost || 0} | FT {slot.fatigue_change > 0 ? '+' : ''}{slot.fatigue_change || 0}
                </p>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-xs mb-1.5"><CountdownDisplay completesAt={slot.completes_at} onComplete={onUpdate} /></p>
                {isComplete ? (
                    <button onClick={handleClaim} disabled={isLoading} className="btn-primary text-xs py-1.5 px-3">
                        {isLoading ? '...' : 'Claim'}
                    </button>
                ) : (
                    <button onClick={handleCancel} disabled={isLoading} className="btn-ghost text-xs py-1 px-2">
                        {isLoading ? '...' : 'Cancel'}
                    </button>
                )}
            </div>
        </div>
    );
}

function RegisterActionSheet({
    zones, playerId, character, initialDestination, initialAction, initialZone,
    initialPoi, initialGameplayTag, onClose, onUpdate, onNotify
}) {
    const [selectedDestination, setSelectedDestination] = useState(initialDestination || 'EXPEDITION');
    const [selectedAction, setSelectedAction] = useState(initialAction || 'BATTLE');
    const [selectedZone, setSelectedZone] = useState(initialZone || null);
    const [selectedPoi, setSelectedPoi] = useState(initialPoi || null);
    const [selectedGameplayTag, setSelectedGameplayTag] = useState(initialGameplayTag || null);
    const [dungeonMode, setDungeonMode] = useState('NORMAL');
    const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[0]);
    const [isLoading, setIsLoading] = useState(false);

    const safeZone = zones.find(zone => zone.zone_type === 'safe') || null;
    const actions = Object.entries(ACTION_CONFIG).filter(([, action]) => action.destination === selectedDestination);
    const config = ACTION_CONFIG[selectedAction];
    const compatibleZones = config.destination === 'HOME'
        ? (safeZone ? [safeZone] : [])
        : zones.filter(zone => config.zones.includes(zone.zone_type));
    const previewTag = selectedGameplayTag?.tag_type === 'DUNGEON' && dungeonMode === 'HARD'
        ? {
            ...selectedGameplayTag,
            energy_cost_mult: (parseFloat(selectedGameplayTag.energy_cost_mult) || 1) * 1.25,
            fatigue_mult: (parseFloat(selectedGameplayTag.fatigue_mult) || 1) * 1.25,
        }
        : selectedGameplayTag;
    const resourcePreview = calculateResourcePreview(selectedAction, selectedDuration.value, selectedZone?.zone_type || 'safe', previewTag);
    const currentEnergy = parseInt(character?.current_energy) || 0;
    const maxFatigue = parseInt(character?.max_fatigue) || 400;
    const currentFatigue = parseInt(character?.current_fatigue) || 0;
    const projectedFatigue = currentFatigue + Math.max(0, resourcePreview.fatigueChange);
    const lacksEnergy = currentEnergy < resourcePreview.energyCost;
    const tooFatigued = resourcePreview.fatigueChange > 0 && projectedFatigue > maxFatigue;

    useEffect(() => {
        if (ACTION_CONFIG[selectedAction]?.destination === selectedDestination) return;
        const nextAction = Object.entries(ACTION_CONFIG).find(([, action]) => action.destination === selectedDestination)?.[0];
        if (nextAction) setSelectedAction(nextAction);
    }, [selectedAction, selectedDestination]);

    useEffect(() => {
        const action = ACTION_CONFIG[selectedAction];
        const nextZones = action.destination === 'HOME'
            ? (safeZone ? [safeZone] : [])
            : zones.filter(zone => action.zones.includes(zone.zone_type));
        if (selectedZone && nextZones.some(zone => zone.id === selectedZone.id)) return;
        setSelectedZone(nextZones[0] || null);
    }, [selectedAction, safeZone, selectedZone, zones]);

    useEffect(() => {
        setSelectedPoi(initialPoi || null);
        setSelectedGameplayTag(initialGameplayTag || null);
    }, [initialPoi, initialGameplayTag]);

    async function handleSubmit() {
        if (!selectedZone) {
            onNotify('Choose an area first.', 'error');
            return;
        }
        setIsLoading(true);
        try {
            await registerAction(playerId, selectedAction, selectedZone.code, selectedDuration.value, {
                poiId: selectedPoi?.id,
                gameplayTag: selectedGameplayTag?.tag_type,
                dungeonMode,
            });
            onNotify(`${config.label} started`, 'success');
            onUpdate();
            onClose();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="card w-full sm:max-w-lg max-h-[88vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Choose an Action</h3>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                <p className="text-xs text-textMuted mb-2">DESTINATION</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(DESTINATIONS).map(([key, destination]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedDestination(key)}
                            className={`p-3 rounded-lg border text-left transition-colors ${
                                selectedDestination === key
                                    ? 'border-accent bg-accent/10 text-accent'
                                    : 'border-border text-textSecondary hover:border-border/60'
                            }`}
                        >
                            <span className="text-xs font-bold block mb-1">{destination.mark}</span>
                            <span className="text-sm font-semibold block">{destination.label}</span>
                            <span className="text-[11px] text-textMuted mt-1 block leading-snug">{destination.helper}</span>
                        </button>
                    ))}
                </div>

                <p className="text-xs text-textMuted mb-2">ACTION</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {actions.map(([key, action]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedAction(key)}
                            className={`p-3 rounded-lg border text-left transition-colors ${
                                selectedAction === key
                                    ? 'border-cyan bg-cyan/10 text-cyan'
                                    : 'border-border text-textSecondary hover:border-border/60'
                            }`}
                        >
                            <span className="text-xs font-bold block mb-1">{action.mark}</span>
                            <span className="text-xs font-medium block">{action.label}</span>
                            <span className="text-[10px] text-textMuted mt-1 block leading-snug">{action.helper}</span>
                        </button>
                    ))}
                </div>

                <p className="text-xs text-textMuted mb-2">{selectedDestination === 'HOME' ? 'HOME' : 'AREA'}</p>
                <div className="space-y-1.5 mb-4">
                    {compatibleZones.length === 0 && (
                        <p className="text-xs text-danger">No compatible area for this action.</p>
                    )}
                    {compatibleZones.map(zone => (
                        <button
                            key={zone.id}
                            onClick={() => setSelectedZone(zone)}
                            className={`w-full text-left p-2.5 rounded-lg border transition-colors ${
                                selectedZone?.id === zone.id
                                    ? 'border-accent bg-accent/10'
                                    : 'border-border hover:border-border/60'
                            }`}
                        >
                            <p className="text-sm font-medium">{zone.display_name}</p>
                            <p className="text-xs text-textMuted">Lv.{zone.min_player_lv}+ | Infection {zone.infection_risk}% | Radiation {zone.radiation_risk}%</p>
                        </button>
                    ))}
                </div>

                {selectedPoi && (
                    <div className="card p-3 mb-4">
                        <p className="text-[10px] text-textMuted mb-1">POI</p>
                        <p className="text-sm font-semibold">{selectedPoi.display_name}</p>
                        <p className="text-xs text-textMuted mt-1">
                            {selectedGameplayTag?.tag_type || 'ACTION'} | {selectedPoi.poi_type}
                        </p>
                    </div>
                )}

                {selectedGameplayTag?.tag_type === 'DUNGEON' && (
                    <div className="mb-4">
                        <p className="text-xs text-textMuted mb-2">DUNGEON MODE</p>
                        <select
                            value={dungeonMode}
                            onChange={event => setDungeonMode(event.target.value)}
                            className="input-field"
                        >
                            <option value="NORMAL">Normal - Map level monsters</option>
                            <option value="HARD">Hard - Scales to strongest party member</option>
                        </select>
                    </div>
                )}

                <p className="text-xs text-textMuted mb-2">DURATION</p>
                <select
                    value={selectedDuration.value}
                    onChange={event => setSelectedDuration(DURATION_OPTIONS.find(item => item.value === parseInt(event.target.value)))}
                    className="input-field mb-5"
                >
                    {DURATION_OPTIONS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="card p-3">
                        <p className="text-[10px] text-textMuted mb-1">Energy</p>
                        <p className={`text-sm font-mono font-semibold ${lacksEnergy ? 'text-danger' : 'text-success'}`}>-{resourcePreview.energyCost}</p>
                    </div>
                    <div className="card p-3">
                        <p className="text-[10px] text-textMuted mb-1">Fatigue</p>
                        <p className={`text-sm font-mono font-semibold ${tooFatigued ? 'text-danger' : resourcePreview.fatigueChange < 0 ? 'text-success' : 'text-accent'}`}>
                            {resourcePreview.fatigueChange > 0 ? '+' : ''}{resourcePreview.fatigueChange}
                        </p>
                    </div>
                </div>

                {(lacksEnergy || tooFatigued) && (
                    <p className="text-xs text-danger mb-3">
                        {lacksEnergy ? 'Not enough energy. Eat food before starting.' : 'Too fatigued. Rest or sleep first.'}
                    </p>
                )}

                <button onClick={handleSubmit} disabled={isLoading || !selectedZone || lacksEnergy || tooFatigued} className="btn-primary w-full">
                    {isLoading ? 'Starting...' : 'Start'}
                </button>
            </div>
        </div>
    );
}

export default function MainPanel({ playerId, character, zones, queue, onUpdate }) {
    const [showRegister, setShowRegister] = useState(false);
    const [showActiveActions, setShowActiveActions] = useState(false);
    const [showZonePicker, setShowZonePicker] = useState(false);
    const [registerDestination, setRegisterDestination] = useState('EXPEDITION');
    const [registerAction, setRegisterAction] = useState(null);
    const [registerZone, setRegisterZone] = useState(null);
    const [registerPoi, setRegisterPoi] = useState(null);
    const [registerGameplayTag, setRegisterGameplayTag] = useState(null);
    const [currentExpeditionZone, setCurrentExpeditionZone] = useState(null);
    const [notification, setNotification] = useState(null);

    function notify(message, type) {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3500);
    }

    function openAction(destination, actionCode, zone, poi = null, gameplayTag = null) {
        setRegisterDestination(destination);
        setRegisterAction(actionCode);
        setRegisterZone(zone || null);
        setRegisterPoi(poi);
        setRegisterGameplayTag(gameplayTag);
        setShowRegister(true);
    }

    const safeZone = zones.find(zone => zone.zone_type === 'safe') || zones[0];
    const isExploring = Boolean(currentExpeditionZone);
    const currentZone = currentExpeditionZone || safeZone;
    const banner = ZONE_BANNERS[currentZone?.zone_type] || ZONE_BANNERS.safe;
    const playerLevel = character?.player_level || 1;
    const accessibleLevel = Math.max(5, playerLevel);
    const expeditionZones = zones
        .filter(zone => zone.zone_type !== 'safe' && (zone.min_player_lv || 1) <= accessibleLevel);
    const canRegister = queue.length < 3;
    const completedCount = queue.filter(slot => new Date(slot.completes_at) <= new Date()).length;
    const currentPois = currentExpeditionZone?.pois || [];

    return (
        <div className="h-full overflow-y-auto">
            <div className={`relative min-h-48 bg-gradient-to-b ${banner.gradient} flex items-end p-4`}>
                <span className="absolute top-4 right-4 text-3xl font-bold opacity-20">{banner.mark}</span>
                <div>
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated text-cyan mb-2">
                        {isExploring ? 'EXPLORING' : 'REFUGEE CAMP'}
                    </span>
                    <h1 className="text-xl font-bold">{isExploring ? currentZone.display_name : (character?.character_name || 'Survivor')}</h1>
                    <p className="text-sm text-textSecondary mt-1">
                        {isExploring
                            ? `Lv.${currentZone.level_gap || currentZone.min_player_lv} | ${currentZone.biome || currentZone.zone_type} | ${currentZone.pois?.length || 0} POIs`
                            : 'Manage your base, meet NPCs, then choose an area to explore.'}
                    </p>
                </div>
            </div>

            {notification && (
                <div className={`mx-4 mt-3 p-2.5 rounded-lg text-sm animate-slideup ${
                    notification.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                }`}>
                    {notification.message}
                </div>
            )}

            <div className="px-4 pt-4">
                <div className="card p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ResourceMeter label="Energy" current={character?.current_energy} max={character?.max_energy} />
                    <ResourceMeter label="Fatigue" current={character?.current_fatigue} max={character?.max_fatigue} tone="fatigue" />
                </div>
            </div>

            {queue.length > 0 && (
                <div className="px-4 pt-4">
                    <button
                        onClick={() => setShowActiveActions(true)}
                        className="w-full card card-hover p-3 flex items-center justify-between text-left"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="w-9 h-9 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-cyan">
                                AC
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold">Background actions active</p>
                                <p className="text-xs text-textMuted truncate">
                                    {completedCount > 0 ? `${completedCount} actions complete, rewards ready` : `${queue.length} actions in progress`}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs text-accent font-semibold">Open</span>
                    </button>
                </div>
            )}

            {!isExploring ? (
                <div className="p-4 space-y-4">
                    <div className="space-y-3">
                        <button onClick={() => setShowZonePicker(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">EX</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Go Exploring</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Choose a level-appropriate area and leave camp.</p>
                            </div>
                        </button>
                        <button onClick={() => openAction('HOME', 'CRAFT', safeZone)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">HM</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Personal Home</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Craft, repair, and turn resources into gear.</p>
                            </div>
                        </button>
                        <button onClick={() => openAction('HOME', 'TRADE', safeZone)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">NPC</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Refugee Camp</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Meet NPCs, trade items, and earn copper.</p>
                            </div>
                        </button>
                    </div>

                    {showZonePicker && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold">Choose Exploration Area</h2>
                                <button onClick={() => setShowZonePicker(false)} className="text-xs text-textMuted hover:text-textPrimary">Close</button>
                            </div>
                            <div className="space-y-2">
                                {expeditionZones.map(zone => (
                                    <button
                                        key={zone.id}
                                        onClick={() => {
                                            setCurrentExpeditionZone(zone);
                                            setShowZonePicker(false);
                                        }}
                                        className="card card-hover p-3 text-left"
                                    >
                                        <p className="text-sm font-medium truncate mb-1">{zone.display_name}</p>
                                        <p className="text-xs text-textMuted">Lv.{zone.level_gap || zone.min_player_lv} | {zone.biome || zone.zone_type} | {zone.pois?.length || 0} POIs</p>
                                    </button>
                                ))}
                                {expeditionZones.length === 0 && (
                                    <p className="text-sm text-textMuted">No areas match your current level.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    <button
                        onClick={() => setCurrentExpeditionZone(null)}
                        className="w-full btn-secondary text-left"
                    >
                        Return to Refugee Camp
                    </button>

                    <div>
                        <h2 className="text-sm font-semibold mb-3">POIs</h2>
                        <div className="space-y-3">
                            {currentPois.map(poi => (
                                <div key={poi.id} className="card p-4">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate">{poi.display_name}</p>
                                            <p className="text-xs text-textMuted mt-1">{poi.poi_type}{poi.is_dungeon ? ' | Dungeon access' : ''}</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-accent">{poi.is_dungeon ? 'DG' : 'POI'}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(poi.gameplay_tags || []).map(tag => {
                                            const action = ACTION_CONFIG[tag.action_type] || ACTION_CONFIG.EXPLORE;
                                            return (
                                                <button
                                                    key={tag.id}
                                                    onClick={() => openAction('EXPEDITION', tag.action_type, currentExpeditionZone, poi, tag)}
                                                    className="p-2.5 rounded-lg border border-border hover:border-accent/50 text-left transition-colors"
                                                >
                                                    <span className="text-[10px] font-bold text-accent block mb-1">{tag.tag_type}</span>
                                                    <span className="text-xs font-semibold block">{action.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            {currentPois.length === 0 && (
                                <p className="text-sm text-textMuted">No POIs have been mapped here yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!isExploring && !showZonePicker && (
            <div className="px-4 pb-4">
                <h2 className="text-sm font-semibold mb-3">Exploration Areas</h2>
                <div className="space-y-2">
                    {expeditionZones.map(zone => (
                        <button
                            key={zone.id}
                            onClick={() => setCurrentExpeditionZone(zone)}
                            className="card card-hover p-3 text-left"
                        >
                            <p className="text-xs font-medium truncate mb-0.5">{zone.display_name}</p>
                            <p className="text-[10px] text-textMuted">Lv.{zone.level_gap || zone.min_player_lv} | {zone.biome || zone.zone_type} | {zone.pois?.length || 0} POIs</p>
                        </button>
                    ))}
                </div>
            </div>
            )}

            {showRegister && (
                <RegisterActionSheet
                    zones={zones}
                    playerId={playerId}
                    initialDestination={registerDestination}
                    initialAction={registerAction}
                    initialZone={registerZone}
                    initialPoi={registerPoi}
                    initialGameplayTag={registerGameplayTag}
                    onClose={() => setShowRegister(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                    character={character}
                />
            )}

            {showActiveActions && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={() => setShowActiveActions(false)}>
                    <div className="card w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-semibold">Active Actions</h3>
                                <p className="text-xs text-textMuted mt-1">{queue.length}/3 background actions</p>
                            </div>
                            <button onClick={() => setShowActiveActions(false)} className="text-textMuted hover:text-textPrimary">x</button>
                        </div>

                        <div className="space-y-2">
                            {queue.map(slot => (
                                <ActiveActionCard key={slot.id} slot={slot} playerId={playerId} onUpdate={onUpdate} onNotify={notify} />
                            ))}
                            {canRegister && (
                                <button
                                    onClick={() => {
                                        setShowActiveActions(false);
                                        if (currentExpeditionZone) {
                                            openAction('EXPEDITION', 'EXPLORE', currentExpeditionZone);
                                        } else {
                                            setShowZonePicker(true);
                                        }
                                    }}
                                    className="w-full p-3 rounded-lg border border-dashed border-border text-textMuted hover:border-accent/40 hover:text-accent transition-colors text-sm"
                                >
                                    + Start another action
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

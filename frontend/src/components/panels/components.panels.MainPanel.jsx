// frontend/src/components/panels/components.panels.MainPanel.jsx

import { useState, useEffect } from 'react';
import {
    getPoiActivities,
    executePoiActivity
} from '../../api/api.game';
import TradingSheet from './components.panels.TradingSheet';
import PlayerStatusBar from './components.panels.MainPanel.Status';
import CraftingSheet from './components.panels.MainPanel.CraftingSheet';
import CurrencyExchangeSheet from './components.panels.MainPanel.CurrencyExchangeSheet';
import SafeHousePanel from './components.panels.MainPanel.SafeHousePanel';
import FactionSheet from './components.panels.MainPanel.FactionSheet';
import NavigationLine from './components.panels.MainPanel.NavigationLine';
import {
    ActivityListSheet,
    PoiActionSheet,
    formatActionResult,
} from './components.panels.MainPanel.ActivitySheets';
import {
    EXPLORATION_RINGS,
    ZONE_BANNERS,
    getPoiRotationSlot,
    getRotatingPois,
    getZoneLevel,
    getZoneTagLabels,
    isZoneLockedForPlayer,
} from './components.panels.mainPanel.shared';

export default function MainPanel({ playerId, character, zones, inventory, onUpdate }) {
    const [showZonePicker, setShowZonePicker] = useState(false);
    const [showCrafting, setShowCrafting] = useState(false);
    const [showFaction, setShowFaction] = useState(false);
    const [showSafeHouse, setShowSafeHouse] = useState(false);
    const [showCurrencyExchange, setShowCurrencyExchange] = useState(false);
    const [showTrading, setShowTrading] = useState(false);
    const [currentExpeditionZone, setCurrentExpeditionZone] = useState(null);
    const [selectedPoi, setSelectedPoi] = useState(null);
    const [activitySheet, setActivitySheet] = useState(null);
    const [executingActivityId, setExecutingActivityId] = useState('');
    const [notification, setNotification] = useState(null);
    const [poiRotationSlot, setPoiRotationSlot] = useState(getPoiRotationSlot);

    useEffect(() => {
        const timerId = setInterval(() => setPoiRotationSlot(getPoiRotationSlot()), 60000);
        return () => clearInterval(timerId);
    }, []);

    function notify(message, type) {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3500);
    }

    async function openPoiActivity(poi, type) {
        setSelectedPoi(null);
        setExecutingActivityId('');
        setActivitySheet({ type, poi, data: null, isLoading: true, error: '' });
        try {
            const result = await getPoiActivities(poi.id, type);
            setActivitySheet({ type, poi, data: result.data, isLoading: false, error: '' });
        } catch (err) {
            setActivitySheet({ type, poi, data: null, isLoading: false, error: err.message });
        }
    }

    async function executeActivity(target, options = {}) {
        if (!activitySheet?.poi || !activitySheet?.type) return;
        const executionId = activitySheet.type === 'sweep' || activitySheet.type === 'dungeon'
            ? `${target.id}:${options.mode || 'normal'}`
            : target.id;
        setExecutingActivityId(executionId);
        setActivitySheet(current => current ? { ...current, error: '' } : current);
        try {
            const result = await executePoiActivity(
                playerId,
                activitySheet.poi.id,
                activitySheet.type,
                target.id,
                options
            );
            const refreshed = await getPoiActivities(activitySheet.poi.id, activitySheet.type);
            setActivitySheet(current => current ? { ...current, data: refreshed.data, error: '' } : current);
            if (!['scavenge', 'gather'].includes(activitySheet.type)) {
                notify(formatActionResult(result.data), 'success');
            }
            await onUpdate?.();
            return result;
        } catch (err) {
            setActivitySheet(current => current ? { ...current, error: err.message } : current);
            notify(err.message, 'error');
            return { success: false, error: err.message };
        } finally {
            setExecutingActivityId('');
        }
    }

    const safeZone = zones.find(zone => zone.zone_type === 'safe') || zones[0];
    const isExploring = Boolean(currentExpeditionZone);
    const isChoosingRoute = showZonePicker && !isExploring;
    const currentZone = currentExpeditionZone || safeZone;
    const banner = isChoosingRoute ? ZONE_BANNERS.urban : (ZONE_BANNERS[currentZone?.zone_type] || ZONE_BANNERS.safe);
    const playerLevel = character?.player_level || 1;
    const expeditionZones = zones
        .filter(zone => zone.zone_type !== 'safe')
        .sort((a, b) => getZoneLevel(a) - getZoneLevel(b) || a.display_name.localeCompare(b.display_name));
    const explorationGroups = EXPLORATION_RINGS.map(ring => ({
        ...ring,
        zones: expeditionZones.filter(zone => {
            const level = getZoneLevel(zone);
            return level >= ring.minLevel && level <= ring.maxLevel;
        }),
    }));
    const currentPois = getRotatingPois(currentExpeditionZone, poiRotationSlot);
    const activityTitleMap = {
        enemy: 'Find enemies',
        scavenge: 'Scavenge',
        gather: 'Gather',
        sweep: 'Sweep',
        dungeon: 'Sweep',
    };
    const navigationItems = [
        'Map',
        showZonePicker && !isExploring ? 'Exploration Routes' : null,
        !isExploring && !showZonePicker ? 'Refugee Camp' : null,
        isExploring ? currentZone?.display_name : null,
        showSafeHouse || showCrafting ? 'Personal Home' : null,
        showTrading ? 'Trading' : null,
        showCurrencyExchange ? 'Currency Exchange' : null,
        showFaction ? 'Faction' : null,
        selectedPoi?.display_name || activitySheet?.poi?.display_name,
        activitySheet ? activityTitleMap[activitySheet.type] || activitySheet.type : null,
        showCrafting ? 'Crafting' : null,
    ];

    return (
        <div className="h-full overflow-y-auto">
            <PlayerStatusBar character={character} />

            <div className={`relative min-h-28 bg-gradient-to-b ${banner.gradient} flex items-end p-4`}>
                <span className="absolute top-3 right-4 text-2xl font-bold opacity-15">{banner.mark}</span>
                <div>
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated text-cyan mb-2">
                        {isExploring ? 'EXPLORING' : (showTrading ? 'TRADING' : (showSafeHouse ? 'SAFE HOUSE' : (isChoosingRoute ? 'ROUTES' : 'REFUGEE CAMP')))}
                    </span>
                    <h1 className="text-xl font-bold">
                        {isExploring ? currentZone.display_name : (showTrading ? 'Refugee Camp Trading' : (showSafeHouse ? 'Personal Home' : (isChoosingRoute ? 'Exploration Routes' : 'Refugee Camp')))}
                    </h1>
                    <p className="text-sm text-textSecondary mt-1">
                        {isExploring
                            ? `Lv.${currentZone.level_gap || currentZone.min_player_lv} | ${getZoneTagLabels(currentZone)} | ${currentPois.length} POIs`
                            : (showTrading
                                ? 'Buy supplies, sell loot, and manage black market listings inside camp.'
                                : (showSafeHouse
                                ? 'Rest, cook, craft, and manage the first version of your safe shelter.'
                                : (isChoosingRoute
                                ? 'Move outward from the camp edge toward distant high-risk zones.'
                                : 'Manage your base, meet NPCs, then choose an area to explore.')))}
                    </p>
                </div>
            </div>

            <NavigationLine items={navigationItems} />

            {notification && (
                <div className={`mx-4 mt-3 p-2.5 rounded-lg text-sm animate-slideup ${
                    notification.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                }`}>
                    {notification.message}
                </div>
            )}

            {showCrafting ? (
                <CraftingSheet
                    playerId={playerId}
                    inventory={inventory}
                    onClose={() => setShowCrafting(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            ) : showFaction ? (
                <FactionSheet
                    playerId={playerId}
                    onClose={() => setShowFaction(false)}
                    onNotify={notify}
                />
            ) : showCurrencyExchange ? (
                <CurrencyExchangeSheet
                    playerId={playerId}
                    character={character}
                    onClose={() => setShowCurrencyExchange(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            ) : selectedPoi ? (
                <PoiActionSheet
                    poi={selectedPoi}
                    onClose={() => setSelectedPoi(null)}
                    onOpenActivity={openPoiActivity}
                />
            ) : activitySheet ? (
                <ActivityListSheet
                    activityType={activitySheet.type}
                    activityData={activitySheet.data}
                    character={character}
                    inventory={inventory}
                    isLoading={activitySheet.isLoading}
                    error={activitySheet.error}
                    executingId={executingActivityId}
                    onExecute={executeActivity}
                    onClose={() => setActivitySheet(null)}
                />
            ) : !isExploring && !showZonePicker && !showSafeHouse && !showTrading ? (
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
                        <button onClick={() => setShowSafeHouse(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">HM</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Personal Home</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Rest, cook, craft, and manage your safe house.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowTrading(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">NPC</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Refugee Camp</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Trade with camp merchants and the black market.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowCurrencyExchange(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">EX</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Currency Exchange</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Exchange Money for silver and gold coins.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowFaction(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">FC</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Faction</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Create or join a faction, and see who else is in it.</p>
                            </div>
                        </button>
                    </div>

                </div>
            ) : showTrading ? (
                <TradingSheet
                    playerId={playerId}
                    character={character}
                    inventory={inventory}
                    onClose={() => setShowTrading(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            ) : showSafeHouse ? (
                <SafeHousePanel
                    playerId={playerId}
                    character={character}
                    onBack={() => setShowSafeHouse(false)}
                    onOpenCrafting={() => setShowCrafting(true)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            ) : isChoosingRoute ? (
                <div className="p-4 space-y-4">
                    <button
                        onClick={() => setShowZonePicker(false)}
                        className="w-full btn-secondary text-left"
                    >
                        Back to Refugee Camp
                    </button>

                    {explorationGroups.map(group => (
                        <section key={group.id}>
                            <div className="mb-3">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-semibold">{group.title}</h2>
                                    <span className="text-[10px] text-textMuted">{group.range}</span>
                                </div>
                                <p className="text-xs text-textMuted mt-1">{group.helper}</p>
                            </div>
                            <div className="space-y-2">
                                {group.zones.map(zone => {
                                    const isLocked = isZoneLockedForPlayer(zone, playerLevel);
                                    return (
                                        <button
                                            key={zone.id}
                                            onClick={() => !isLocked && setCurrentExpeditionZone(zone)}
                                            disabled={isLocked}
                                            className={`w-full card p-3 text-left transition-colors ${
                                                isLocked
                                                    ? 'opacity-45 cursor-not-allowed'
                                                    : 'card-hover'
                                            }`}
                                            type="button"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate mb-1">{zone.display_name}</p>
                                                    <p className="text-xs text-textMuted">
                                                        Lv.{zone.level_gap || zone.min_player_lv} | {getZoneTagLabels(zone)} | {zone.pois?.length || 0} POIs
                                                    </p>
                                                    {isLocked && (
                                                        <p className="text-[11px] text-danger mt-1">
                                                            Locked: requires a zone within +10 levels.
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-bold text-accent flex-shrink-0">
                                                    {isLocked ? 'LOCK' : (ZONE_BANNERS[zone.biome || zone.zone_type]?.mark || 'EX')}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                                {group.zones.length === 0 && (
                                    <p className="text-sm text-textMuted">No available areas in this route yet.</p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    <button
                        onClick={() => {
                            setCurrentExpeditionZone(null);
                            setSelectedPoi(null);
                            setShowZonePicker(true);
                        }}
                        className="w-full btn-secondary text-left"
                    >
                        Back to Exploration Routes
                    </button>

                    <div>
                        <h2 className="text-sm font-semibold mb-3">POIs</h2>
                        <div className="space-y-3">
                            {currentPois.map(poi => (
                                <button
                                    key={poi.id}
                                    type="button"
                                    onClick={() => setSelectedPoi(poi)}
                                    className="w-full card card-hover p-4 text-left"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate">{poi.display_name}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {currentPois.length === 0 && (
                                <p className="text-sm text-textMuted">No POIs have been mapped here yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

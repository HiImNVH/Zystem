// frontend/src/components/panels/MainPanel.jsx

import { useState, useEffect } from 'react';
import { registerAction, claimAction, cancelAction } from '../../api/api.game';

const DESTINATIONS = {
    EXPEDITION: {
        label: 'Di kham pha',
        mark: 'EX',
        helper: 'Chien dau, tham hiem va thu thap tai nguyen ngoai vung an toan.',
    },
    HOME: {
        label: 'Ve nha',
        mark: 'HM',
        helper: 'Che tao, trao doi va bien tai nguyen thanh thuc luc.',
    },
};

const ACTION_CONFIG = {
    BATTLE:  { label: 'Chien dau', mark: 'BT', destination: 'EXPEDITION', zones: ['ruins', 'hazard', 'dungeon'], helper: 'Rui ro cao, nhieu EXP va co co hoi nhan trang bi.' },
    EXPLORE: { label: 'Tham hiem khu vuc', mark: 'EX', destination: 'EXPEDITION', zones: ['forest', 'mine', 'ruins', 'hazard', 'dungeon'], helper: 'Mo rong loot pool, tim vat pham hiem va rac co gia tri.' },
    MINE:    { label: 'Khai khoang', mark: 'MI', destination: 'EXPEDITION', zones: ['mine'], helper: 'Lay da, quang va vat lieu nen.' },
    CHOP:    { label: 'Chat go', mark: 'CH', destination: 'EXPEDITION', zones: ['forest'], helper: 'Lay go, nhanh cay va vat lieu xay dung.' },
    HUNT:    { label: 'San bat', mark: 'HU', destination: 'EXPEDITION', zones: ['forest', 'ruins', 'dungeon'], helper: 'Lay vat lieu sinh ton va EXP chien dau nhe.' },
    FORAGE:  { label: 'Hai luom', mark: 'FO', destination: 'EXPEDITION', zones: ['forest'], helper: 'Lay thuc pham, cay thuoc va nguyen lieu nho.' },
    CRAFT:   { label: 'Che tao', mark: 'CR', destination: 'HOME', zones: ['safe'], helper: 'Dung thoi gian o nha de tao vat pham craftable.' },
    TRADE:   { label: 'Trao doi', mark: 'TR', destination: 'HOME', zones: ['safe'], helper: 'Ban bot rac/nguyen lieu thuong de lay copper.' },
};

const RESOURCE_ACTION_BY_ZONE = {
    mine: 'MINE',
    forest: 'FORAGE',
    ruins: 'HUNT',
    dungeon: 'HUNT',
    hazard: 'FORAGE',
};

const DURATION_OPTIONS = [
    { label: '10 giay', value: 10 },
    { label: '5 phut', value: 300 },
    { label: '15 phut', value: 900 },
    { label: '30 phut', value: 1800 },
    { label: '1 gio', value: 3600 },
    { label: '4 gio', value: 14400 },
    { label: '8 gio', value: 28800 },
];

const ZONE_BANNERS = {
    mine:    { gradient: 'from-amber-900/40 to-base', mark: 'MO' },
    forest:  { gradient: 'from-emerald-900/40 to-base', mark: 'RG' },
    ruins:   { gradient: 'from-red-900/40 to-base', mark: 'PT' },
    dungeon: { gradient: 'from-red-900/40 to-base', mark: 'HN' },
    hazard:  { gradient: 'from-purple-900/40 to-base', mark: 'ON' },
    safe:    { gradient: 'from-cyan-900/30 to-base', mark: 'HM' },
};

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
        ? <span className="text-accent font-semibold animate-pulse2">Co the nhan</span>
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
                `+${rewards.items_dropped?.length || 0} vat pham`,
            ];
            if (rewards.copper_gained) rewardParts.push(`+${rewards.copper_gained} copper`);
            if (rewards.sold_items?.length) rewardParts.push(`ban ${rewards.sold_items.length} mon`);
            onNotify(`Da nhan: ${rewardParts.join(', ')}`, 'success');
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
            onNotify('Da huy hanh dong', 'success');
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
                <p className="text-xs text-textMuted truncate">{slot.zone_name || 'Nha an toan'}</p>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-xs mb-1.5"><CountdownDisplay completesAt={slot.completes_at} onComplete={onUpdate} /></p>
                {isComplete ? (
                    <button onClick={handleClaim} disabled={isLoading} className="btn-primary text-xs py-1.5 px-3">
                        {isLoading ? '...' : 'Nhan'}
                    </button>
                ) : (
                    <button onClick={handleCancel} disabled={isLoading} className="btn-ghost text-xs py-1 px-2">
                        {isLoading ? '...' : 'Huy'}
                    </button>
                )}
            </div>
        </div>
    );
}

function RegisterActionSheet({ zones, playerId, initialDestination, initialAction, initialZone, onClose, onUpdate, onNotify }) {
    const [selectedDestination, setSelectedDestination] = useState(initialDestination || 'EXPEDITION');
    const [selectedAction, setSelectedAction] = useState(initialAction || 'BATTLE');
    const [selectedZone, setSelectedZone] = useState(initialZone || null);
    const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[0]);
    const [isLoading, setIsLoading] = useState(false);

    const safeZone = zones.find(zone => zone.zone_type === 'safe') || null;
    const actions = Object.entries(ACTION_CONFIG).filter(([, action]) => action.destination === selectedDestination);
    const config = ACTION_CONFIG[selectedAction];
    const compatibleZones = config.destination === 'HOME'
        ? (safeZone ? [safeZone] : [])
        : zones.filter(zone => config.zones.includes(zone.zone_type));

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

    async function handleSubmit() {
        if (!selectedZone) {
            onNotify('Hay chon khu vuc truoc.', 'error');
            return;
        }
        setIsLoading(true);
        try {
            await registerAction(playerId, selectedAction, selectedZone.code, selectedDuration.value);
            onNotify(`${config.label} da bat dau`, 'success');
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
                    <h3 className="font-semibold">Chon viec can lam</h3>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                <p className="text-xs text-textMuted mb-2">DIEM DEN</p>
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

                <p className="text-xs text-textMuted mb-2">THAO TAC</p>
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

                <p className="text-xs text-textMuted mb-2">{selectedDestination === 'HOME' ? 'NOI O' : 'KHU VUC'}</p>
                <div className="space-y-1.5 mb-4">
                    {compatibleZones.length === 0 && (
                        <p className="text-xs text-danger">Khong co khu vuc phu hop cho thao tac nay.</p>
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
                            <p className="text-xs text-textMuted">Lv.{zone.min_player_lv}+ | Nhiem {zone.infection_risk}% | Xa {zone.radiation_risk}%</p>
                        </button>
                    ))}
                </div>

                <p className="text-xs text-textMuted mb-2">THOI LUONG</p>
                <select
                    value={selectedDuration.value}
                    onChange={event => setSelectedDuration(DURATION_OPTIONS.find(item => item.value === parseInt(event.target.value)))}
                    className="input-field mb-5"
                >
                    {DURATION_OPTIONS.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>

                <button onClick={handleSubmit} disabled={isLoading || !selectedZone} className="btn-primary w-full">
                    {isLoading ? 'Dang bat dau...' : 'Bat dau'}
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
    const [currentExpeditionZone, setCurrentExpeditionZone] = useState(null);
    const [notification, setNotification] = useState(null);

    function notify(message, type) {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3500);
    }

    function openAction(destination, actionCode, zone) {
        setRegisterDestination(destination);
        setRegisterAction(actionCode);
        setRegisterZone(zone || null);
        setShowRegister(true);
    }

    const safeZone = zones.find(zone => zone.zone_type === 'safe') || zones[0];
    const isExploring = Boolean(currentExpeditionZone);
    const currentZone = currentExpeditionZone || safeZone;
    const banner = ZONE_BANNERS[currentZone?.zone_type] || ZONE_BANNERS.safe;
    const playerLevel = character?.player_level || 1;
    const expeditionZones = zones
        .filter(zone => zone.zone_type !== 'safe' && (zone.min_player_lv || 1) <= playerLevel)
        .slice(0, 8);
    const canRegister = queue.length < 3;
    const completedCount = queue.filter(slot => new Date(slot.completes_at) <= new Date()).length;
    const zoneResourceAction = RESOURCE_ACTION_BY_ZONE[currentExpeditionZone?.zone_type] || 'FORAGE';
    const expeditionActions = currentExpeditionZone
        ? ['EXPLORE', zoneResourceAction, 'BATTLE'].filter((actionCode, index, list) => (
            list.indexOf(actionCode) === index && ACTION_CONFIG[actionCode].zones.includes(currentExpeditionZone.zone_type)
        ))
        : [];

    return (
        <div className="h-full overflow-y-auto">
            <div className={`relative min-h-48 bg-gradient-to-b ${banner.gradient} flex items-end p-4`}>
                <span className="absolute top-4 right-4 text-3xl font-bold opacity-20">{banner.mark}</span>
                <div>
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated text-cyan mb-2">
                        {isExploring ? 'DANG KHAM PHA' : 'TRAI TI NAN'}
                    </span>
                    <h1 className="text-xl font-bold">{isExploring ? currentZone.display_name : (character?.character_name || 'Survivor')}</h1>
                    <p className="text-sm text-textSecondary mt-1">
                        {isExploring
                            ? `Lv.${currentZone.min_player_lv}+ | Nhiem ${currentZone.infection_risk}% | Xa ${currentZone.radiation_risk}%`
                            : 'O nha quan ly can cu, gap NPC, roi chon khu vuc de di kham pha'}
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
                                <p className="text-sm font-semibold">Dang co hanh dong ngoai nen</p>
                                <p className="text-xs text-textMuted truncate">
                                    {completedCount > 0 ? `${completedCount} hanh dong da xong, san sang nhan thuong` : `${queue.length} hanh dong dang dien ra`}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs text-accent font-semibold">Mo</span>
                    </button>
                </div>
            )}

            {!isExploring ? (
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button onClick={() => setShowZonePicker(true)} className="card card-hover p-4 text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">EX</span>
                                <p className="font-semibold">Di kham pha</p>
                            </div>
                            <p className="text-xs text-textMuted leading-relaxed">Chon mot khu vuc phu hop level de roi khoi trai.</p>
                        </button>
                        <button onClick={() => openAction('HOME', 'CRAFT', safeZone)} className="card card-hover p-4 text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">HM</span>
                                <p className="font-semibold">Nha ca nhan</p>
                            </div>
                            <p className="text-xs text-textMuted leading-relaxed">Che tao, sua soan va bien tai nguyen thanh trang bi.</p>
                        </button>
                        <button onClick={() => openAction('HOME', 'TRADE', safeZone)} className="card card-hover p-4 text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">NPC</span>
                                <p className="font-semibold">Trai ti nan</p>
                            </div>
                            <p className="text-xs text-textMuted leading-relaxed">Gap NPC, trao doi vat pham va lay copper.</p>
                        </button>
                    </div>

                    {showZonePicker && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold">Chon khu vuc kham pha</h2>
                                <button onClick={() => setShowZonePicker(false)} className="text-xs text-textMuted hover:text-textPrimary">Dong</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                                        <p className="text-xs text-textMuted">Lv.{zone.min_player_lv}+ | {zone.zone_type} | Nhiem {zone.infection_risk}%</p>
                                    </button>
                                ))}
                                {expeditionZones.length === 0 && (
                                    <p className="text-sm text-textMuted">Chua co khu vuc phu hop level hien tai.</p>
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
                        Quay ve trai ti nan
                    </button>

                    <div>
                        <h2 className="text-sm font-semibold mb-3">Hanh dong tai khu vuc</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {expeditionActions.map(actionCode => {
                                const action = ACTION_CONFIG[actionCode];
                                return (
                                    <button
                                        key={actionCode}
                                        onClick={() => openAction('EXPEDITION', actionCode, currentExpeditionZone)}
                                        className="card card-hover p-4 text-left"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">
                                                {action.mark}
                                            </span>
                                            <p className="font-semibold">{action.label}</p>
                                        </div>
                                        <p className="text-xs text-textMuted leading-relaxed">{action.helper}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {!isExploring && !showZonePicker && (
            <div className="px-4 pb-4">
                <h2 className="text-sm font-semibold mb-3">Vung kham pha</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {expeditionZones.map(zone => (
                        <button
                            key={zone.id}
                            onClick={() => setCurrentExpeditionZone(zone)}
                            className="card card-hover p-3 text-left"
                        >
                            <p className="text-xs font-medium truncate mb-0.5">{zone.display_name}</p>
                            <p className="text-[10px] text-textMuted">Lv.{zone.min_player_lv}+ | {zone.zone_type}</p>
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
                    onClose={() => setShowRegister(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            )}

            {showActiveActions && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={() => setShowActiveActions(false)}>
                    <div className="card w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-semibold">Hanh dong dang dien ra</h3>
                                <p className="text-xs text-textMuted mt-1">{queue.length}/3 hanh dong ngoai nen</p>
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
                                    + Di hanh dong tiep
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

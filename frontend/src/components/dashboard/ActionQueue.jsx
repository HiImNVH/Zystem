// frontend/src/components/dashboard/ActionQueue.jsx
// Version: 1.0
// 3 slot AFK: chon zone + action -> countdown real-time -> claim

import { useState, useEffect, useCallback } from 'react';
import { registerAction, claimAction, cancelAction } from '../../api/api.game';

const ACTION_TYPES = [
    { code: 'MINE',    label: 'KHAI THAC QUANG', icon: '⛏', zones: ['mine'] },
    { code: 'CHOP',    label: 'CHOP CAY',         icon: '🪓', zones: ['forest'] },
    { code: 'EXPLORE', label: 'THAM HIEM',        icon: '🔍', zones: ['dungeon', 'hazard'] },
    { code: 'HUNT',    label: 'SAN BAT',           icon: '🏹', zones: ['forest', 'dungeon'] },
    { code: 'FORAGE',  label: 'HAI LUOM',          icon: '🌿', zones: ['forest'] },
];

const DURATION_OPTIONS = [
    { label: '10 GIAY (TEST)', value: 10 },
    { label: '5 PHUT',        value: 300 },
    { label: '15 PHUT',       value: 900 },
    { label: '30 PHUT',       value: 1800 },
    { label: '1 GIO',         value: 3600 },
    { label: '4 GIO',         value: 14400 },
    { label: '8 GIO',         value: 28800 },
];

const ZONE_TYPE_COLORS = {
    mine:    'text-amber',
    forest:  'text-phosphor',
    dungeon: 'text-danger',
    hazard:  'text-purple-400',
    safe:    'text-phosphor',
};

function CountdownTimer({ completesAt, onComplete }) {
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const calc = () => {
            const diff = Math.max(0, Math.ceil((new Date(completesAt) - Date.now()) / 1000));
            setRemaining(diff);
            if (diff === 0) onComplete?.();
        };
        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, [completesAt]);

    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;

    const pad = n => String(n).padStart(2, '0');

    return (
        <span className={remaining === 0 ? 'text-amber animate-blink' : 'text-phosphor'}>
            {remaining === 0 ? '► CLAIM NOW' : `${pad(h)}:${pad(m)}:${pad(s)}`}
        </span>
    );
}

function ActionSlot({ slot, index, zones, playerId, onUpdate, onNotify }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedAction, setSelectedAction] = useState(ACTION_TYPES[0]);
    const [selectedZone, setSelectedZone]     = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[0]);
    const [isLoading, setIsLoading] = useState(false);

    // Loc zone phu hop voi action type
    const compatibleZones = zones.filter(z =>
        selectedAction.zones.includes(z.zone_type) ||
        selectedAction.zones.length === 0
    );

    useEffect(() => {
        if (compatibleZones.length > 0 && !selectedZone) {
            setSelectedZone(compatibleZones[0]);
        }
    }, [selectedAction, zones]);

    async function handleRegister() {
        if (!selectedZone) { onNotify('Chon zone truoc.', 'error'); return; }
        setIsLoading(true);
        try {
            await registerAction(playerId, selectedAction.code, selectedZone.code, selectedDuration.value);
            onNotify(`Dang ky ${selectedAction.label} thanh cong!`, 'ok');
            setIsExpanded(false);
            onUpdate();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleClaim() {
        setIsLoading(true);
        try {
            const result = await claimAction(playerId, slot.id);
            const r = result.data.rewards;
            onNotify(
                `CLAIM OK! +${r.exp_gained} EXP | +${r.items_dropped?.length || 0} item | Inf +${r.infection_gained?.toFixed(2)}%`,
                'ok'
            );
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
            onNotify('Da huy hanh dong.', 'ok');
            onUpdate();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    const isEmpty = !slot;
    const isComplete = slot && new Date(slot.completes_at) <= new Date();

    return (
        <div className={`border-2 p-3 transition-all ${
            isComplete ? 'border-amber' :
            slot        ? 'border-phosphor border-opacity-60' :
                          'border-phosphor border-opacity-20'
        }`} style={{ boxShadow: isComplete ? '3px 3px 0 rgba(245,197,24,0.3)' : '3px 3px 0 rgba(57,255,20,0.1)' }}>

            {/* Slot header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-phosphor opacity-50" style={{ fontSize: '7px' }}>
                    SLOT {index + 1}
                </span>
                {slot && (
                    <span className={`${isComplete ? 'text-amber' : 'text-phosphor opacity-60'}`}
                          style={{ fontSize: '7px' }}>
                        {slot.action_type}
                    </span>
                )}
            </div>

            {/* Active slot */}
            {slot && (
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-phosphor opacity-50" style={{ fontSize: '7px' }}>
                            {slot.zone_name || 'ZONE KHONG XAC DINH'}
                        </span>
                        <span style={{ fontSize: '9px' }}>
                            <CountdownTimer
                                completesAt={slot.completes_at}
                                onComplete={onUpdate}
                            />
                        </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {isComplete ? (
                            <button onClick={handleClaim} disabled={isLoading}
                                    className="pixel-btn pixel-btn-primary flex-1"
                                    style={{ fontSize: '8px', padding: '8px' }}>
                                {isLoading ? '...' : '[ CLAIM ]'}
                            </button>
                        ) : (
                            <button onClick={handleCancel} disabled={isLoading}
                                    className="pixel-btn pixel-btn-secondary flex-1"
                                    style={{ fontSize: '7px', padding: '6px' }}>
                                {isLoading ? '...' : '[ HUY ]'}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Empty slot */}
            {isEmpty && !isExpanded && (
                <button onClick={() => setIsExpanded(true)}
                        className="w-full text-phosphor opacity-30 hover:opacity-60 transition-opacity py-4 border border-dashed border-phosphor border-opacity-20 hover:border-opacity-50"
                        style={{ fontSize: '8px' }}>
                    + DANG KY HANH DONG
                </button>
            )}

            {/* Form dang ky */}
            {isEmpty && isExpanded && (
                <div className="space-y-2 animate-slideup">
                    {/* Chon Action */}
                    <div>
                        <div className="text-phosphor opacity-40 mb-1" style={{ fontSize: '6px' }}>LOAI HANH DONG</div>
                        <div className="grid grid-cols-2 gap-1">
                            {ACTION_TYPES.map(at => (
                                <button key={at.code}
                                        onClick={() => { setSelectedAction(at); setSelectedZone(null); }}
                                        className={`text-left px-2 py-1 border transition-all ${
                                            selectedAction.code === at.code
                                                ? 'border-amber text-amber bg-amber bg-opacity-10'
                                                : 'border-phosphor border-opacity-20 text-phosphor opacity-60 hover:opacity-100'
                                        }`}
                                        style={{ fontSize: '7px' }}>
                                    {at.icon} {at.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chon Zone */}
                    <div>
                        <div className="text-phosphor opacity-40 mb-1" style={{ fontSize: '6px' }}>KHU VUC</div>
                        <div className="space-y-1">
                            {compatibleZones.length === 0 && (
                                <div className="text-danger opacity-60" style={{ fontSize: '7px' }}>
                                    Khong co zone phu hop.
                                </div>
                            )}
                            {compatibleZones.map(zone => (
                                <button key={zone.id}
                                        onClick={() => setSelectedZone(zone)}
                                        className={`w-full text-left px-2 py-1 border transition-all ${
                                            selectedZone?.id === zone.id
                                                ? 'border-amber bg-amber bg-opacity-10'
                                                : 'border-phosphor border-opacity-20 hover:border-opacity-60'
                                        }`}
                                        style={{ fontSize: '7px' }}>
                                    <span className={ZONE_TYPE_COLORS[zone.zone_type] || 'text-phosphor'}>
                                        {zone.display_name?.replace(/[^\x00-\x7F]/g, '').trim() || zone.code}
                                    </span>
                                    <span className="text-phosphor opacity-30 ml-2">
                                        LV{zone.min_player_lv}+ | Inf:{zone.infection_risk}%
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chon thoi gian */}
                    <div>
                        <div className="text-phosphor opacity-40 mb-1" style={{ fontSize: '6px' }}>THOI GIAN</div>
                        <select
                            value={selectedDuration.value}
                            onChange={e => setSelectedDuration(DURATION_OPTIONS.find(d => d.value === parseInt(e.target.value)))}
                            className="pixel-input"
                            style={{ fontSize: '7px', padding: '6px 10px' }}>
                            {DURATION_OPTIONS.map(d => (
                                <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-1">
                        <button onClick={() => setIsExpanded(false)}
                                className="pixel-btn pixel-btn-secondary"
                                style={{ fontSize: '7px', padding: '6px 10px', width: 'auto' }}>
                            HUY
                        </button>
                        <button onClick={handleRegister} disabled={isLoading || !selectedZone}
                                className="pixel-btn pixel-btn-primary flex-1"
                                style={{ fontSize: '8px', padding: '8px' }}>
                            {isLoading ? '...' : '[ BAT DAU ]'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ActionQueue({ playerId, queue, zones, onUpdate }) {
    const [notification, setNotification] = useState(null);

    function showNotification(msg, type) {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    }

    // Map slot index 1-3
    const slots = [0, 1, 2].map(i => queue.find(q => q.slot_index === i + 1) || null);

    return (
        <div className="h-full flex flex-col p-4">
            <div className="text-amber mb-3 flex-shrink-0" style={{ fontSize: '9px' }}>
                // HANG DOI HANH DONG ({queue.length}/3 SLOT)
            </div>

            {/* Notification */}
            {notification && (
                <div className={`animate-slideup mb-3 p-2 border flex-shrink-0 ${
                    notification.type === 'ok'
                        ? 'border-phosphor text-phosphor bg-phosphor bg-opacity-5'
                        : 'border-danger text-danger bg-danger bg-opacity-5'
                }`} style={{ fontSize: '7px', lineHeight: '1.8' }}>
                    {notification.type === 'ok' ? '✓ ' : '⚠ '}{notification.msg}
                </div>
            )}

            <div className="flex-1 space-y-3 overflow-y-auto">
                {slots.map((slot, i) => (
                    <ActionSlot
                        key={i}
                        index={i}
                        slot={slot}
                        zones={zones}
                        playerId={playerId}
                        onUpdate={onUpdate}
                        onNotify={showNotification}
                    />
                ))}
            </div>
        </div>
    );
}

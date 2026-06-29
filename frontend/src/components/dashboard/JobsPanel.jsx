// frontend/src/components/dashboard/JobsPanel.jsx
// Version: 1.0
// Panel nghe nghiep: xem stat bonus, mo khoa, dau tu SP, quen nghe

import { useState } from 'react';
import { unlockJob, investSP, forgetJob } from '../../api/api.game';

const CATEGORY_CONFIG = {
    combat:  { label: '⚔ HE CHIEN DAU',  color: 'text-danger',      border: 'border-danger' },
    gather:  { label: '⛏ HE KHAI THAC',  color: 'text-amber',       border: 'border-amber' },
    craft:   { label: '🔨 HE SAN XUAT',  color: 'text-phosphor',    border: 'border-phosphor' },
};

const JOB_ICONS = {
    vanguard:    '🛡', marksman:   '🎯', flanker:     '🗡',
    miner:       '⛏', lumberjack: '🪓', hunter:      '🏹', forager: '🌿',
    artisan:     '🔧', farmer:     '🌾', chef:        '🧪',
    armorsmith:  '🛡', weaponsmith:'⚒',
};

const STAT_KEYS = ['str_per_lv','agi_per_lv','dex_per_lv','vit_per_lv','int_per_lv','chr_per_lv'];
const STAT_LABELS = { str_per_lv:'STR', agi_per_lv:'AGI', dex_per_lv:'DEX', vit_per_lv:'VIT', int_per_lv:'INT', chr_per_lv:'CHR' };

function JobDetailModal({ job, playerLevel, skillPoints, playerId, onClose, onUpdate, onNotify }) {
    const [spInput, setSpInput]     = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const isUnlocked  = job.job_level > 0 || job.sp_invested > 0 || job.unlocked_at;
    const isAtCap     = job.job_level >= playerLevel;
    const maxInvest   = Math.min(skillPoints, playerLevel - job.job_level);
    const statBonuses = STAT_KEYS.filter(k => parseFloat(job[k]) > 0);

    async function handleUnlock() {
        setIsLoading(true);
        try {
            await unlockJob(playerId, job.code);
            onNotify(`Da mo khoa nghe ${job.code.toUpperCase()}!`, 'ok');
            onUpdate();
            onClose();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleInvest() {
        if (spInput < 1) return;
        setIsLoading(true);
        try {
            const result = await investSP(playerId, job.code, spInput);
            onNotify(result.message, 'ok');
            onUpdate();
            onClose();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleForget() {
        if (!window.confirm(`Chac chan muon quen nghe ${job.code.toUpperCase()}? SP se duoc hoan lai.`)) return;
        setIsLoading(true);
        try {
            const result = await forgetJob(playerId, job.code);
            onNotify(result.message, 'ok');
            onUpdate();
            onClose();
        } catch (err) {
            onNotify(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
             onClick={onClose}>
            <div className="pixel-card p-6 w-full max-w-md animate-slideup"
                 onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="text-amber glow-text-amber" style={{ fontSize: '11px' }}>
                            {JOB_ICONS[job.code]} {job.code.toUpperCase()}
                        </div>
                        <div className="text-phosphor opacity-40 mt-1" style={{ fontSize: '7px' }}>
                            {job.display_name?.split('(')[0].trim()}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-phosphor opacity-40 hover:opacity-80"
                            style={{ fontSize: '10px' }}>✕</button>
                </div>

                {/* Cap hien tai */}
                <div className="border border-phosphor border-opacity-20 p-3 mb-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-phosphor opacity-50" style={{ fontSize: '7px' }}>CAP NGHE</span>
                        <span className={`${isAtCap ? 'text-amber' : 'text-phosphor'}`}
                              style={{ fontSize: '10px' }}>
                            {job.job_level}
                            <span className="opacity-40 text-phosphor"> / {playerLevel}</span>
                        </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 border border-phosphor border-opacity-20 overflow-hidden"
                         style={{ backgroundColor: '#0a0a0a' }}>
                        <div className="h-full bg-phosphor transition-all"
                             style={{ width: `${Math.min(100, (job.job_level / Math.max(1, playerLevel)) * 100)}%`,
                                      boxShadow: '0 0 6px #39ff14' }} />
                    </div>
                    {isAtCap && (
                        <div className="text-amber mt-1" style={{ fontSize: '6px' }}>
                            ⚠ DAT GIOI HAN PLAYER LEVEL. NANG LEVEL NHAN VAT DE MO TIEP.
                        </div>
                    )}
                </div>

                {/* Stat bonus hien tai */}
                <div className="mb-4">
                    <div className="text-phosphor opacity-40 mb-2" style={{ fontSize: '7px' }}>
                        STAT BONUS TICH LUY (CAP {job.job_level}):
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {statBonuses.map(k => {
                            const total = (parseFloat(job[k]) * job.job_level).toFixed(1);
                            const perLv = parseFloat(job[k]);
                            return (
                                <div key={k} className="border border-phosphor border-opacity-20 p-2 text-center">
                                    <div className="text-phosphor opacity-40" style={{ fontSize: '6px' }}>
                                        {STAT_LABELS[k]}
                                    </div>
                                    <div className="text-amber" style={{ fontSize: '10px' }}>+{total}</div>
                                    <div className="text-phosphor opacity-30" style={{ fontSize: '6px' }}>
                                        +{perLv}/lv
                                    </div>
                                </div>
                            );
                        })}
                        {statBonuses.length === 0 && (
                            <div className="col-span-3 text-phosphor opacity-30 text-center" style={{ fontSize: '7px' }}>
                                Nghe nay chua cap nao.
                            </div>
                        )}
                    </div>
                </div>

                {/* SP invested */}
                {job.sp_invested > 0 && (
                    <div className="text-phosphor opacity-40 mb-4" style={{ fontSize: '7px' }}>
                        SP DA DAU TU: <span className="text-amber">{job.sp_invested}</span>
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                    {/* Chua mo khoa */}
                    {!isUnlocked && (
                        <div>
                            <div className="text-phosphor opacity-40 mb-2" style={{ fontSize: '7px' }}>
                                SP HIEN CO: <span className="text-amber">{skillPoints}</span>
                            </div>
                            <button onClick={handleUnlock} disabled={isLoading || skillPoints < 1}
                                    className="pixel-btn pixel-btn-primary"
                                    style={{ fontSize: '9px' }}>
                                {isLoading ? '...' : `[ MO KHOA (1 SP) ]`}
                            </button>
                        </div>
                    )}

                    {/* Da mo khoa, chua dat cap toi da */}
                    {isUnlocked && !isAtCap && maxInvest > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-phosphor opacity-40" style={{ fontSize: '7px' }}>
                                    SP HIEN CO: <span className="text-amber">{skillPoints}</span>
                                    {' '}| CO THE NANG: <span className="text-amber">{maxInvest} cap</span>
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 border border-phosphor border-opacity-30 px-2">
                                    <button onClick={() => setSpInput(Math.max(1, spInput - 1))}
                                            className="text-phosphor hover:text-amber px-1"
                                            style={{ fontSize: '10px' }}>-</button>
                                    <span className="text-amber px-2" style={{ fontSize: '9px' }}>{spInput}</span>
                                    <button onClick={() => setSpInput(Math.min(maxInvest, spInput + 1))}
                                            className="text-phosphor hover:text-amber px-1"
                                            style={{ fontSize: '10px' }}>+</button>
                                </div>
                                <button onClick={() => setSpInput(maxInvest)}
                                        className="pixel-btn pixel-btn-secondary"
                                        style={{ fontSize: '7px', width: 'auto', padding: '6px 10px' }}>
                                    MAX
                                </button>
                                <button onClick={handleInvest} disabled={isLoading || spInput < 1}
                                        className="pixel-btn pixel-btn-primary flex-1"
                                        style={{ fontSize: '8px', padding: '8px' }}>
                                    {isLoading ? '...' : `[ DAU TU ${spInput} SP ]`}
                                </button>
                            </div>
                            <div className="text-phosphor opacity-30 mt-1" style={{ fontSize: '6px' }}>
                                CAP {job.job_level} → {job.job_level + spInput}
                                {' '}| STAT: {statBonuses.map(k =>
                                    `+${(parseFloat(job[k]) * spInput).toFixed(1)} ${STAT_LABELS[k]}`
                                ).join(', ')}
                            </div>
                        </div>
                    )}

                    {/* Quen nghe */}
                    {isUnlocked && (
                        <button onClick={handleForget} disabled={isLoading}
                                className="w-full text-danger opacity-40 hover:opacity-70 transition-opacity border border-danger border-opacity-20 py-2"
                                style={{ fontSize: '7px', fontFamily: '"Press Start 2P", monospace' }}>
                            [ QUEN NGHE — HOAN {job.sp_invested || 0} SP ]
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function JobsPanel({ jobs, playerLevel, skillPoints, playerId, onUpdate }) {
    const [selectedJob, setSelectedJob] = useState(null);
    const [notification, setNotification] = useState(null);

    function showNotification(msg, type) {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    }

    const CATEGORY_ORDER = ['combat', 'gather', 'craft'];
    const jobsByCategory = CATEGORY_ORDER.reduce((acc, cat) => {
        acc[cat] = (jobs || []).filter(j => j.category === cat);
        return acc;
    }, {});

    const totalSpInvested = (jobs || []).reduce((sum, j) => sum + (j.sp_invested || 0), 0);

    return (
        <div className="h-full flex flex-col p-4">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between mb-4">
                <div className="text-amber" style={{ fontSize: '9px' }}>
                    // HE THONG NGHE NGHIEP
                </div>
                <div className="text-right">
                    <div className="text-phosphor" style={{ fontSize: '8px' }}>
                        SP: <span className="text-amber glow-text-amber">{skillPoints}</span>
                    </div>
                    <div className="text-phosphor opacity-30 mt-1" style={{ fontSize: '6px' }}>
                        DA DAU TU: {totalSpInvested} SP
                    </div>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <div className={`animate-slideup mb-3 p-2 border flex-shrink-0 ${
                    notification.type === 'ok'
                        ? 'border-phosphor text-phosphor bg-phosphor bg-opacity-5'
                        : 'border-danger text-danger bg-danger bg-opacity-5'
                }`} style={{ fontSize: '7px' }}>
                    {notification.type === 'ok' ? '✓ ' : '⚠ '}{notification.msg}
                </div>
            )}

            {/* SP bar */}
            <div className="flex-shrink-0 mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-phosphor opacity-40" style={{ fontSize: '6px' }}>SKILL POINTS</span>
                    <span className="text-amber" style={{ fontSize: '6px' }}>{skillPoints} / {skillPoints + totalSpInvested}</span>
                </div>
                <div className="h-2 border border-phosphor border-opacity-20 overflow-hidden"
                     style={{ backgroundColor: '#0a0a0a' }}>
                    <div className="h-full bg-amber transition-all"
                         style={{
                             width: `${skillPoints + totalSpInvested > 0 ? (skillPoints / (skillPoints + totalSpInvested)) * 100 : 100}%`,
                             boxShadow: '0 0 6px #f5c518'
                         }} />
                </div>
            </div>

            {/* Job grid by category */}
            <div className="flex-1 overflow-y-auto space-y-5">
                {CATEGORY_ORDER.map(cat => {
                    const catJobs = jobsByCategory[cat];
                    if (!catJobs?.length) return null;
                    const cfg = CATEGORY_CONFIG[cat];

                    return (
                        <div key={cat}>
                            <div className={`${cfg.color} mb-2`} style={{ fontSize: '8px' }}>
                                ── {cfg.label} ──────────────
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                {catJobs.map(job => {
                                    const isUnlocked = job.job_level > 0 || job.sp_invested > 0 || job.unlocked_at;
                                    const isAtCap    = job.job_level >= playerLevel;
                                    const statBonus  = STAT_KEYS
                                        .filter(k => parseFloat(job[k]) > 0)
                                        .map(k => `+${parseFloat(job[k]).toFixed(1)} ${STAT_LABELS[k]}/lv`)
                                        .join(', ');

                                    return (
                                        <button key={job.id}
                                                onClick={() => setSelectedJob(job)}
                                                className={`text-left p-3 border-2 transition-all hover:scale-105 ${
                                                    isUnlocked
                                                        ? isAtCap
                                                            ? `${cfg.border} bg-opacity-5 bg-amber`
                                                            : `${cfg.border} bg-opacity-5`
                                                        : 'border-phosphor border-opacity-20 opacity-50'
                                                }`}
                                                style={{
                                                    boxShadow: isUnlocked ? `3px 3px 0 rgba(57,255,20,0.15)` : 'none',
                                                    backgroundColor: isUnlocked ? 'rgba(57,255,20,0.03)' : 'transparent'
                                                }}>
                                            {/* Icon + Name */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <span style={{ fontSize: '14px' }}>{JOB_ICONS[job.code] || '?'}</span>
                                                <div>
                                                    <div className={`${isUnlocked ? cfg.color : 'text-phosphor opacity-40'}`}
                                                         style={{ fontSize: '7px', lineHeight: '1.4' }}>
                                                        {job.code.toUpperCase()}
                                                    </div>
                                                    {isAtCap && (
                                                        <div className="text-amber" style={{ fontSize: '5px' }}>AT CAP</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Level + progress */}
                                            {isUnlocked ? (
                                                <>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-phosphor opacity-40" style={{ fontSize: '6px' }}>LV</span>
                                                        <span className={isAtCap ? 'text-amber' : 'text-phosphor'}
                                                              style={{ fontSize: '7px' }}>
                                                            {job.job_level}/{playerLevel}
                                                        </span>
                                                    </div>
                                                    <div className="h-1 border border-phosphor border-opacity-20 overflow-hidden mb-2"
                                                         style={{ backgroundColor: '#0a0a0a' }}>
                                                        <div className={`h-full ${isAtCap ? 'bg-amber' : 'bg-phosphor'}`}
                                                             style={{ width: `${(job.job_level / Math.max(1, playerLevel)) * 100}%` }} />
                                                    </div>
                                                    <div className="text-phosphor opacity-30" style={{ fontSize: '5px', lineHeight: '1.6' }}>
                                                        {statBonus}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-phosphor opacity-30" style={{ fontSize: '6px', lineHeight: '1.6' }}>
                                                    CHUA MO<br/>
                                                    {statBonus}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal chi tiet */}
            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    playerLevel={playerLevel}
                    skillPoints={skillPoints}
                    playerId={playerId}
                    onClose={() => setSelectedJob(null)}
                    onUpdate={onUpdate}
                    onNotify={showNotification}
                />
            )}
        </div>
    );
}

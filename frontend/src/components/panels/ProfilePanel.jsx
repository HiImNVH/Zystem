// frontend/src/components/panels/ProfilePanel.jsx

import { useState } from 'react';
import EquipmentTab from './EquipmentTab';

const STAT_INFO = {
    str: { label: 'STR', desc: 'Sát thương vật lý và khả năng mang vác' },
    agi: { label: 'AGI', desc: 'Phản xạ, né tránh và tốc độ hành động' },
    dex: { label: 'DEX', desc: 'Khéo léo, chính xác và tỉ lệ chí mạng' },
    vit: { label: 'VIT', desc: 'Máu tối đa, chống chịu và sức bền' },
    int: { label: 'INT', desc: 'Tư duy, học công thức và dùng công cụ' },
    chr: { label: 'CHR', desc: 'Giao tiếp, thương lượng và sức hút' },
};

const JOB_MARKS = {
    fighting: 'FG',
    scavenging: 'SC',
    cooking: 'CO',
    gathering: 'GA',
    crafting: 'CR',
    building: 'BU',
};

const CATEGORY_ORDER = ['combat', 'survival', 'production'];
const CATEGORY_LABELS = {
    combat: 'Chiến đấu',
    survival: 'Sinh tồn',
    production: 'Sản xuất',
};

function StatsTab({ stats }) {
    if (!stats) return <p className="text-sm text-textMuted p-4">Đang tải...</p>;

    return (
        <div className="p-4 space-y-4">
            <div className="space-y-2">
                {Object.entries(STAT_INFO).map(([key, info]) => {
                    const total = parseFloat(stats.total?.[key] || 0);
                    return (
                        <div key={key} className="card p-3 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                                {info.label}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-textMuted truncate">{info.desc}</p>
                            </div>
                            <p className="text-lg font-bold font-mono flex-shrink-0">{total.toFixed(1)}</p>
                        </div>
                    );
                })}
            </div>

            <div className="card p-4">
                <p className="text-xs font-semibold text-textMuted mb-3">CHIẾN ĐẤU</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-lg font-bold font-mono">{stats.derived?.max_hp}</p>
                        <p className="text-[10px] text-textMuted">HP</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold font-mono">{stats.derived?.attack}</p>
                        <p className="text-[10px] text-textMuted">ATK</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold font-mono">{stats.derived?.defense}</p>
                        <p className="text-[10px] text-textMuted">DEF</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function JobsTab({ jobs, playerLevel }) {
    return (
        <div className="p-4 space-y-5">
            {CATEGORY_ORDER.map(category => {
                const categoryJobs = (jobs || []).filter(job => job.category === category);
                if (!categoryJobs.length) return null;
                return (
                    <div key={category}>
                        <p className="text-xs font-semibold text-textMuted mb-2">{CATEGORY_LABELS[category].toUpperCase()}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {categoryJobs.map(job => {
                                const isUnlocked = job.job_level > 0;
                                const isAtCap = job.job_level >= playerLevel;
                                return (
                                    <div key={job.id} className={`card p-3 ${!isUnlocked ? 'opacity-40' : ''}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-6 h-6 rounded bg-elevated flex items-center justify-center text-[10px] font-bold text-accent">
                                                {JOB_MARKS[job.code] || job.code?.slice(0, 2).toUpperCase()}
                                            </span>
                                            <p className="text-xs font-medium truncate">{job.display_name || job.code}</p>
                                        </div>
                                        {isUnlocked ? (
                                            <>
                                                <div className="flex justify-between text-[10px] text-textMuted mb-1">
                                                    <span>LV {job.job_level}</span>
                                                    <span>{playerLevel}</span>
                                                </div>
                                                <div className="progress-track">
                                                    <div
                                                        className={`progress-fill ${isAtCap ? 'bg-accent' : 'bg-cyan'}`}
                                                        style={{ width: `${(job.job_level / Math.max(1, playerLevel)) * 100}%` }}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-[10px] text-textMuted">Chưa mở</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function ProfilePanel({ character, stats, jobs, playerId, onUpdate, onLogout }) {
    const [tab, setTab] = useState('STATS');

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-elevated flex items-center justify-center text-lg font-bold text-accent">
                        {character?.character_name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold">{character?.character_name}</p>
                        <p className="text-xs text-textMuted">Cấp {character?.player_level} · SP: {character?.skill_points}</p>
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <button onClick={() => setTab('STATS')} className={`tab-pill ${tab === 'STATS' ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
                        Chỉ số
                    </button>
                    <button onClick={() => setTab('GEAR')} className={`tab-pill ${tab === 'GEAR' ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
                        Trang bị
                    </button>
                    <button onClick={() => setTab('JOBS')} className={`tab-pill ${tab === 'JOBS' ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
                        Kỹ năng
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {tab === 'STATS' && <StatsTab stats={stats} />}
                {tab === 'GEAR' && <EquipmentTab playerId={playerId} gearStats={stats?.from_gear} onUpdate={onUpdate} />}
                {tab === 'JOBS' && <JobsTab jobs={jobs} playerLevel={character?.player_level || 1} />}
            </div>

            <div className="p-4 border-t border-border flex-shrink-0">
                <button onClick={onLogout} className="btn-secondary w-full text-sm">
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

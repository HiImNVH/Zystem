// frontend/src/components/panels/components.panels.ProfilePanel.jsx

import { useState } from 'react';
import EquipmentTab from './components.panels.EquipmentTab';

const STAT_INFO = {
    str: { label: 'Strength', shortLabel: 'STR', desc: 'Physical damage and carry capacity' },
    agi: { label: 'Agility', shortLabel: 'AGI', desc: 'Reflexes, evasion, and action speed' },
    dex: { label: 'Dexterity', shortLabel: 'DEX', desc: 'Precision, accuracy, and critical chance' },
    vit: { label: 'Vitality', shortLabel: 'VIT', desc: 'Max HP, toughness, and endurance' },
    int: { label: 'Insight', shortLabel: 'INT', desc: 'Reasoning, recipes, and tool use' },
    chr: { label: 'Charisma', shortLabel: 'CHR', desc: 'Communication, trade, and presence' },
};

const HEX_STAT_ORDER = ['str', 'agi', 'int', 'chr', 'dex', 'vit'];

function buildHexPoint(centerX, centerY, radius, index, total = 6) {
    const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
    return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
    };
}

function formatPointList(points) {
    return points.map(point => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
}

function buildAxisHitArea(centerX, centerY, radius, index) {
    const halfStep = 30 * (Math.PI / 180);
    const angle = (-90 + 60 * index) * (Math.PI / 180);

    return formatPointList([
        { x: centerX, y: centerY },
        {
            x: centerX + Math.cos(angle - halfStep) * radius,
            y: centerY + Math.sin(angle - halfStep) * radius,
        },
        {
            x: centerX + Math.cos(angle + halfStep) * radius,
            y: centerY + Math.sin(angle + halfStep) * radius,
        },
    ]);
}

function StatHexGrid({ stats }) {
    const [selectedStat, setSelectedStat] = useState('str');
    const totalStats = stats?.total || {};
    const statEntries = HEX_STAT_ORDER.map(key => ({
        key,
        ...STAT_INFO[key],
        value: parseFloat(totalStats[key] || 0),
    }));
    const maxValue = Math.max(1, ...statEntries.map(stat => stat.value));
    const chartWidth = 420;
    const chartHeight = 320;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
    const radius = 86;
    const labelRadius = 140;
    const hitRadius = 150;
    const gridRadii = [radius / 3, (radius / 3) * 2, radius];
    const axisPoints = statEntries.map((stat, index) => ({
        ...stat,
        point: buildHexPoint(centerX, centerY, radius, index),
    }));
    const fillPoints = statEntries.map((stat, index) => {
        const statRadius = Math.max(8, (stat.value / maxValue) * radius);
        return buildHexPoint(centerX, centerY, statRadius, index);
    });
    const selected = statEntries.find(stat => stat.key === selectedStat) || statEntries[0];

    return (
        <div className="card p-4">
            <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-xs font-semibold text-textMuted">CORE ATTRIBUTES</p>
                <span className="text-[10px] text-textMuted">Hover or tap a direction</span>
            </div>

            <div className="relative mx-auto max-w-[420px]">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full aspect-[21/16]" role="img" aria-label="Core attribute hex grid">
                    {gridRadii.map(gridRadius => {
                        const points = statEntries.map((_, index) => buildHexPoint(centerX, centerY, gridRadius, index));
                        return (
                            <polygon
                                key={gridRadius}
                                points={formatPointList(points)}
                                fill="none"
                                stroke="rgba(147, 150, 163, 0.35)"
                                strokeWidth="1"
                            />
                        );
                    })}
                    {axisPoints.map(axis => (
                        <line
                            key={axis.key}
                            x1={centerX}
                            y1={centerY}
                            x2={axis.point.x}
                            y2={axis.point.y}
                            stroke="rgba(147, 150, 163, 0.35)"
                            strokeWidth="1"
                        />
                    ))}
                    <polygon
                        points={formatPointList(fillPoints)}
                        fill="rgba(16, 185, 129, 0.72)"
                        stroke="#10b981"
                        strokeWidth="2"
                    />
                    {axisPoints.map(axis => (
                        <g
                            key={`${axis.key}-hit-area`}
                            onMouseEnter={() => setSelectedStat(axis.key)}
                            onFocus={() => setSelectedStat(axis.key)}
                            onClick={() => setSelectedStat(axis.key)}
                            tabIndex="0"
                            role="button"
                            aria-label={`${axis.label}: ${axis.value.toFixed(1)}`}
                            className="cursor-pointer outline-none"
                        >
                            <polygon points={buildAxisHitArea(centerX, centerY, hitRadius, HEX_STAT_ORDER.indexOf(axis.key))} fill="transparent" />
                        </g>
                    ))}
                    {axisPoints.map(axis => {
                        const labelPoint = buildHexPoint(centerX, centerY, labelRadius, HEX_STAT_ORDER.indexOf(axis.key));
                        const textAnchor = Math.abs(labelPoint.x - centerX) < 8
                            ? 'middle'
                            : (labelPoint.x > centerX ? 'start' : 'end');
                        const dy = labelPoint.y < centerY - 20 ? '-0.35em' : (labelPoint.y > centerY + 20 ? '0.95em' : '0.35em');

                        return (
                            <g
                                key={`${axis.key}-label`}
                                onMouseEnter={() => setSelectedStat(axis.key)}
                                onFocus={() => setSelectedStat(axis.key)}
                                onClick={() => setSelectedStat(axis.key)}
                                tabIndex="0"
                                role="button"
                                aria-label={`Show ${axis.label}`}
                                className="cursor-pointer outline-none"
                            >
                                <text
                                    x={labelPoint.x}
                                    y={labelPoint.y}
                                    dy={dy}
                                    textAnchor={textAnchor}
                                    fill={selectedStat === axis.key ? '#fbbf24' : '#f87171'}
                                    fontSize="13"
                                    fontWeight="700"
                                >
                                    {axis.shortLabel}
                                </text>
                                <circle cx={labelPoint.x} cy={labelPoint.y} r="22" fill="transparent" />
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="mt-3 rounded-lg bg-surface p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="font-semibold">{selected.label}</p>
                        <p className="text-xs text-textMuted mt-1">{selected.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold font-mono text-accent">{selected.value.toFixed(1)}</p>
                        <p className="text-[10px] text-textMuted">{selected.shortLabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    combat: 'Combat',
    survival: 'Survival',
    production: 'Production',
};

function StatsTab({ stats }) {
    if (!stats) return <p className="text-sm text-textMuted p-4">Loading...</p>;

    return (
        <div className="p-4 space-y-4">
            <StatHexGrid stats={stats} />

            <div className="card p-4">
                <p className="text-xs font-semibold text-textMuted mb-3">COMBAT</p>
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
                                            <p className="text-[10px] text-textMuted">Locked</p>
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
                        <p className="text-xs text-textMuted">Level {character?.player_level} | SP: {character?.skill_points}</p>
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <button onClick={() => setTab('STATS')} className={`tab-pill ${tab === 'STATS' ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
                        Stats
                    </button>
                    <button onClick={() => setTab('GEAR')} className={`tab-pill ${tab === 'GEAR' ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
                        Gear
                    </button>
                    <button onClick={() => setTab('JOBS')} className={`tab-pill ${tab === 'JOBS' ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
                        Skills
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
                    Log out
                </button>
            </div>
        </div>
    );
}

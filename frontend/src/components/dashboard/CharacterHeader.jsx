// frontend/src/components/dashboard/CharacterHeader.jsx
// Version: 1.0
// Header nhan vat: ten, level, HP bar, Infection/Radiation bar, dong ho

import { useState, useEffect } from 'react';

function StatBar({ label, value, max, colorClass, glowColor }) {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div className="flex items-center gap-2">
            <span className="text-phosphor opacity-50 flex-shrink-0" style={{ fontSize: '7px', width: '60px' }}>
                {label}
            </span>
            <div className="flex-1 h-3 border border-phosphor border-opacity-30 relative overflow-hidden"
                 style={{ backgroundColor: '#0a0a0a' }}>
                <div className={`h-full transition-all duration-500 ${colorClass}`}
                     style={{ width: `${pct}%`, boxShadow: `0 0 6px ${glowColor}` }} />
                <div className="absolute inset-0 opacity-20"
                     style={{ backgroundImage: 'repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(0,0,0,0.5) 3px,rgba(0,0,0,0.5) 4px)' }} />
            </div>
            <span className="flex-shrink-0 text-phosphor" style={{ fontSize: '7px', width: '60px', textAlign: 'right' }}>
                {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
                {max !== undefined && <span className="opacity-40">/{max}</span>}
            </span>
        </div>
    );
}

export default function CharacterHeader({ character, onLogout }) {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const tick = () => setCurrentTime(new Date().toLocaleTimeString('vi-VN', { hour12: false }));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const infectionPct = parseFloat(character?.infection_pct || 0);
    const radiationPct = parseFloat(character?.radiation_pct || 0);
    const infectionColor = infectionPct >= 90 ? 'bg-danger' : infectionPct >= 50 ? 'bg-amber' : 'bg-phosphor';
    const infectionGlow  = infectionPct >= 90 ? '#ff3131' : infectionPct >= 50 ? '#f5c518' : '#39ff14';

    return (
        <div className="border-b border-phosphor border-opacity-20 p-4 flex-shrink-0"
             style={{ backgroundColor: '#0d0d0d' }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
                {/* Ten + Level */}
                <div className="flex-shrink-0">
                    <div className="text-amber glow-text-amber animate-flicker" style={{ fontSize: '11px', letterSpacing: '2px' }}>
                        {character?.character_name?.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-phosphor opacity-50" style={{ fontSize: '7px' }}>LVL</span>
                        <span className="text-phosphor" style={{ fontSize: '10px' }}>{character?.player_level}</span>
                        <span className="text-phosphor opacity-30" style={{ fontSize: '7px' }}>|</span>
                        <span className={infectionPct >= 50 ? 'text-amber' : 'text-phosphor opacity-50'}
                              style={{ fontSize: '7px' }}>
                            {character?.infection_status || 'HEALTHY'}
                        </span>
                    </div>
                </div>

                {/* Bars */}
                <div className="flex-1 space-y-2" style={{ minWidth: '240px', maxWidth: '420px' }}>
                    <StatBar label="HP" value={character?.current_hp || 0} max={character?.max_hp || 100}
                             colorClass="bg-phosphor" glowColor="#39ff14" />
                    <StatBar label="INFECTION" value={infectionPct} max={100}
                             colorClass={infectionColor} glowColor={infectionGlow} />
                    <StatBar label="RADIATION" value={radiationPct} max={100}
                             colorClass="bg-purple-500" glowColor="#a855f7" />
                </div>

                {/* Dong ho + thoat */}
                <div className="flex-shrink-0 text-right space-y-1">
                    <div className="text-phosphor glow-text" style={{ fontSize: '10px' }}>{currentTime}</div>
                    <div className="flex gap-2 justify-end">
                        <span style={{ fontSize: '7px' }} className="text-amber">🪙 {parseInt(character?.copper || 0)}</span>
                        <span style={{ fontSize: '7px' }} className="text-phosphor opacity-30">|</span>
                        <span style={{ fontSize: '7px' }} className="text-amber">◈ {parseInt(character?.silver || 0)}</span>
                    </div>
                    <button onClick={onLogout} className="text-phosphor opacity-30 hover:opacity-70 transition-opacity"
                            style={{ fontSize: '7px' }}>[ THOAT ]</button>
                </div>
            </div>
        </div>
    );
}

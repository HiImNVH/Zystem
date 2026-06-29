// frontend/src/components/Dashboard.jsx
// Version: 2.0
// Cap nhat: Them tab NGHE NGHIEP, truyen skillPoints va playerLevel

import { useState, useEffect, useCallback } from 'react';
import CharacterHeader from './dashboard/CharacterHeader';
import StatsPanel from './dashboard/StatsPanel';
import ActionQueue from './dashboard/ActionQueue';
import Inventory from './dashboard/Inventory';
import JobsPanel from './dashboard/JobsPanel';
import {
    getCharacterStats, getZones, getActionQueue,
    getInventory, getPlayerJobs,
} from '../api/api.game';
import { getMyCharacter } from '../api/api.character';

const TAB = { QUEUE: 'QUEUE', JOBS: 'JOBS', STATS: 'STATS', INVENTORY: 'INVENTORY' };

export default function Dashboard({ initialCharacter, account, onLogout }) {
    const [character, setCharacter] = useState(initialCharacter);
    const [stats, setStats]         = useState(null);
    const [zones, setZones]         = useState([]);
    const [queue, setQueue]         = useState([]);
    const [inventory, setInventory] = useState([]);
    const [jobs, setJobs]           = useState([]);
    const [activeTab, setActiveTab] = useState(TAB.QUEUE);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const playerId = character?.id;

    const loadAll = useCallback(async () => {
        if (!playerId) return;
        setIsRefreshing(true);
        try {
            const [charRes, statsRes, zonesRes, queueRes, invRes, jobsRes] = await Promise.allSettled([
                getMyCharacter(),
                getCharacterStats(playerId),
                getZones(),
                getActionQueue(playerId),
                getInventory(playerId),
                getPlayerJobs(playerId),
            ]);
            if (charRes.status  === 'fulfilled') setCharacter(charRes.value.data);
            if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
            if (zonesRes.status === 'fulfilled') setZones(zonesRes.value.data);
            if (queueRes.status === 'fulfilled') setQueue(queueRes.value.data);
            if (invRes.status   === 'fulfilled') setInventory(invRes.value.data);
            if (jobsRes.status  === 'fulfilled') setJobs(jobsRes.value.data);
        } finally {
            setIsRefreshing(false);
        }
    }, [playerId]);

    useEffect(() => {
        loadAll();
        const id = setInterval(loadAll, 30000);
        return () => clearInterval(id);
    }, [loadAll]);

    const refreshGameData = useCallback(async () => {
        if (!playerId) return;
        const [charRes, queueRes, invRes, statsRes, jobsRes] = await Promise.allSettled([
            getMyCharacter(),
            getActionQueue(playerId),
            getInventory(playerId),
            getCharacterStats(playerId),
            getPlayerJobs(playerId),
        ]);
        if (charRes.status  === 'fulfilled') setCharacter(charRes.value.data);
        if (queueRes.status === 'fulfilled') setQueue(queueRes.value.data);
        if (invRes.status   === 'fulfilled') setInventory(invRes.value.data);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
        if (jobsRes.status  === 'fulfilled') setJobs(jobsRes.value.data);
    }, [playerId]);

    const TAB_CONFIG = [
        { key: TAB.QUEUE,     label: '⏱ QUEUE',    count: queue.length },
        { key: TAB.JOBS,      label: '⚔ NGHE',     count: jobs.filter(j => j.job_level > 0).length },
        { key: TAB.STATS,     label: '📊 CHI SO',   count: null },
        { key: TAB.INVENTORY, label: '🎒 HANH TRANG', count: inventory.length },
    ];

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <CharacterHeader
                character={{ ...character, copper: character?.copper, silver: character?.silver }}
                onLogout={onLogout}
            />

            {/* Tab bar */}
            <div className="flex border-b border-phosphor border-opacity-20 flex-shrink-0"
                 style={{ backgroundColor: '#0d0d0d' }}>
                {TAB_CONFIG.map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 transition-all border-b-2 ${
                                activeTab === tab.key
                                    ? 'border-amber text-amber bg-amber bg-opacity-5'
                                    : 'border-transparent text-phosphor opacity-40 hover:opacity-70'
                            }`}
                            style={{ fontSize: '7px' }}>
                        {tab.label}
                        {tab.count !== null && (
                            <span className="ml-1 opacity-60">({tab.count})</span>
                        )}
                    </button>
                ))}
                <button onClick={loadAll} disabled={isRefreshing}
                        className="px-3 text-phosphor opacity-30 hover:opacity-60 transition-opacity"
                        style={{ fontSize: '10px' }}>
                    {isRefreshing ? '⟳' : '↻'}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === TAB.QUEUE && (
                    <ActionQueue
                        playerId={playerId}
                        queue={queue}
                        zones={zones.filter(z => z.zone_type !== 'safe')}
                        onUpdate={refreshGameData}
                    />
                )}
                {activeTab === TAB.JOBS && (
                    <JobsPanel
                        jobs={jobs}
                        playerLevel={character?.player_level || 1}
                        skillPoints={character?.skill_points || 0}
                        playerId={playerId}
                        onUpdate={refreshGameData}
                    />
                )}
                {activeTab === TAB.STATS && (
                    <StatsPanel stats={stats} jobs={jobs} />
                )}
                {activeTab === TAB.INVENTORY && (
                    <Inventory items={inventory} />
                )}
            </div>
        </div>
    );
}

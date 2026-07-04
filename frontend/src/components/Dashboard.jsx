// frontend/src/components/Dashboard.jsx

import { useState, useEffect, useCallback } from 'react';
import TopBar from './layout/TopBar';
import MainPanel from './panels/MainPanel';
import InventoryPanel from './panels/InventoryPanel';
import ChatPanel from './panels/ChatPanel';
import ProfilePanel from './panels/ProfilePanel';
import QuestPanel from './panels/QuestPanel';
import {
    getCharacterStats, getZones, getActionQueue,
    getInventory, getPlayerJobs,
} from '../api/api.game';
import { getMyCharacter } from '../api/api.character';

const TAB = { MAIN: 'MAIN', INVENTORY: 'INVENTORY', QUEST: 'QUEST', CHAT: 'CHAT', PROFILE: 'PROFILE' };

export default function Dashboard({ initialCharacter, onLogout }) {
    const [character, setCharacter] = useState(initialCharacter);
    const [stats, setStats]         = useState(null);
    const [zones, setZones]         = useState([]);
    const [queue, setQueue]         = useState([]);
    const [inventory, setInventory] = useState([]);
    const [jobs, setJobs]           = useState([]);
    const [rightPanel, setRightPanel] = useState(TAB.CHAT);

    const playerId = character?.id;

    const loadAll = useCallback(async () => {
        if (!playerId) return;
        const [charRes, statsRes, zonesRes, queueRes, invRes, jobsRes] = await Promise.allSettled([
            getMyCharacter(), getCharacterStats(playerId), getZones(),
            getActionQueue(playerId), getInventory(playerId), getPlayerJobs(playerId),
        ]);
        if (charRes.status  === 'fulfilled') setCharacter(charRes.value.data);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
        if (zonesRes.status === 'fulfilled') setZones(zonesRes.value.data);
        if (queueRes.status === 'fulfilled') setQueue(queueRes.value.data);
        if (invRes.status   === 'fulfilled') setInventory(invRes.value.data);
        if (jobsRes.status  === 'fulfilled') setJobs(jobsRes.value.data);
    }, [playerId]);

    useEffect(() => {
        loadAll();
        const id = setInterval(loadAll, 30000);
        return () => clearInterval(id);
    }, [loadAll]);

    return (
        <div className="h-screen flex flex-col bg-base text-textPrimary">
            <TopBar
                character={character}
                activeDesktopTab={rightPanel}
                onChangeDesktopTab={setRightPanel}
                onOpenSettings={() => {}}
            />

            <div className="hidden md:block flex-1 overflow-y-auto">
                <div className="dashboard-phone-grid">
                    <div className="dashboard-phone-panel dashboard-panel-main">
                        <MainPanel playerId={playerId} character={character} zones={zones} queue={queue} onUpdate={loadAll} />
                    </div>
                    <div className="dashboard-phone-panel dashboard-panel-inventory">
                        <InventoryPanel items={inventory} playerId={playerId} onUpdate={loadAll} />
                    </div>
                    <div className="dashboard-phone-panel dashboard-panel-secondary">
                        {rightPanel === TAB.CHAT && <ChatPanel character={character} />}
                        {rightPanel === TAB.QUEST && (
                            <QuestPanel playerId={playerId} jobs={jobs} skillPoints={character?.skill_points || 0} />
                        )}
                        {rightPanel === TAB.PROFILE && (
                            <ProfilePanel character={character} stats={stats} jobs={jobs} playerId={playerId} onUpdate={loadAll} onLogout={onLogout} />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex md:hidden flex-1 overflow-hidden">
                <MainPanel playerId={playerId} character={character} zones={zones} queue={queue} onUpdate={loadAll} />
            </div>
        </div>
    );
}

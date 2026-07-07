// frontend/src/components/Dashboard.jsx

import { useState, useEffect, useCallback } from 'react';
import BottomNav from './layout/BottomNav';
import MainPanel from './panels/MainPanel';
import InventoryPanel from './panels/InventoryPanel';
import ChatPanel from './panels/ChatPanel';
import ProfilePanel from './panels/ProfilePanel';
import QuestPanel from './panels/QuestPanel';
import {
    getCharacterStats, getZones,
    getInventory, getPlayerJobs,
} from '../api/api.game';
import { getMyCharacter } from '../api/api.character';
import { connectSocket } from '../api/api.socket';

const TAB = { MAIN: 'MAIN', INVENTORY: 'INVENTORY', QUEST: 'QUEST', CHAT: 'CHAT', PROFILE: 'PROFILE' };
const SIDE_TABS = [
    { key: TAB.INVENTORY, label: 'Inventory' },
    { key: TAB.CHAT, label: 'Chat' },
];
const RIGHT_TABS = ['Chat', 'Gang', 'Mail', 'Noti.'];

// Ham thuan render panel theo tab, tach ra module-level de khong bi tao lai
// moi lan Dashboard re-render (tranh unmount/remount lam mat state cua panel con)
function renderPanel(tab, ctx) {
    const { playerId, character, zones, inventory, jobs, stats, loadAll, onLogout } = ctx;

    if (tab === TAB.MAIN) {
        return <MainPanel playerId={playerId} character={character} zones={zones} inventory={inventory} onUpdate={loadAll} />;
    }

    if (tab === TAB.INVENTORY) {
        return <InventoryPanel items={inventory} playerId={playerId} onUpdate={loadAll} />;
    }

    if (tab === TAB.QUEST) {
        return <QuestPanel playerId={playerId} jobs={jobs} skillPoints={character?.skill_points || 0} />;
    }

    if (tab === TAB.PROFILE) {
        return <ProfilePanel character={character} stats={stats} jobs={jobs} playerId={playerId} onUpdate={loadAll} onLogout={onLogout} />;
    }

    return <ChatPanel character={character} />;
}

// Cac Viewport duoc khai bao O NGOAI Dashboard (module-level) de giu nguyen
// component reference giua cac lan render. Neu khai bao ben trong than ham
// Dashboard, moi lan Dashboard re-render (vi du moi 30s do loadAll) React se
// coi day la component MOI va unmount/remount toan bo panel con ben trong,
// gay ra hien tuong giat/reload lien tuc (mat scroll, mat channel chat dang chon,
// goi lai API va nhap nhay "Loading...").
function SideTabs({ items, activeTab, onChangeTab }) {
    return (
        <div className="workspace-tabs">
            {items.map(item => (
                <button
                    key={item.key}
                    onClick={() => onChangeTab(item.key)}
                    className={`workspace-tab ${activeTab === item.key ? 'workspace-tab-active' : ''}`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

function LeftViewport({ leftTab, onChangeLeftTab, ctx }) {
    return (
        <section className="workspace-pane workspace-pane-left">
            <SideTabs items={SIDE_TABS} activeTab={leftTab} onChangeTab={onChangeLeftTab} />
            <div className="workspace-pane-body">
                {renderPanel(leftTab, ctx)}
            </div>
        </section>
    );
}

function CenterViewport({ centerTab, onChangeCenterTab, ctx }) {
    return (
        <section className="workspace-pane workspace-pane-center">
            <div className="workspace-pane-body">
                {renderPanel(centerTab, ctx)}
            </div>
            <BottomNav activeTab={centerTab} onChangeTab={onChangeCenterTab} />
        </section>
    );
}

function RightViewport({ rightTab, onChangeRightTab, character }) {
    return (
        <section className="workspace-pane workspace-pane-right">
            <div className="workspace-tabs workspace-tabs-right">
                {RIGHT_TABS.map(label => (
                    <button
                        key={label}
                        onClick={() => onChangeRightTab(label)}
                        className={`workspace-tab ${rightTab === label ? 'workspace-tab-active' : ''}`}
                        type="button"
                    >
                        {label}
                        {label === 'Mail' && <span className="mail-badge">1</span>}
                    </button>
                ))}
            </div>
            <div className="workspace-pane-body">
                <ChatPanel character={character} initialChannel={rightTab === 'Noti.' ? 'NOTI' : 'GLOBAL'} />
            </div>
        </section>
    );
}

export default function Dashboard({ initialCharacter, onLogout }) {
    const [character, setCharacter] = useState(initialCharacter);
    const [stats, setStats]         = useState(null);
    const [zones, setZones]         = useState([]);
    const [inventory, setInventory] = useState([]);
    const [jobs, setJobs]           = useState([]);
    const [leftTab, setLeftTab]     = useState(TAB.INVENTORY);
    const [centerTab, setCenterTab] = useState(TAB.MAIN);
    const [rightTab, setRightTab]   = useState('Chat');

    const playerId = character?.id;

    const loadAll = useCallback(async () => {
        if (!playerId) return;
        const [charRes, statsRes, zonesRes, invRes, jobsRes] = await Promise.allSettled([
            getMyCharacter(), getCharacterStats(playerId), getZones(),
            getInventory(playerId), getPlayerJobs(playerId),
        ]);
        if (charRes.status  === 'fulfilled') setCharacter(charRes.value.data);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
        if (zonesRes.status === 'fulfilled') setZones(zonesRes.value.data);
        if (invRes.status   === 'fulfilled') setInventory(invRes.value.data);
        if (jobsRes.status  === 'fulfilled') setJobs(jobsRes.value.data);
    }, [playerId]);

    useEffect(() => {
        loadAll();
        const id = setInterval(loadAll, 30000);
        return () => clearInterval(id);
    }, [loadAll]);

    // Gia nhap room realtime rieng cua player de nhan thong bao (player:event)
    // ngay lap tuc qua Socket.IO, khong can cho vong poll 30s
    useEffect(() => {
        if (!playerId) return;
        const socket = connectSocket();
        socket?.emit('join:player', { playerId });
    }, [playerId]);

    const ctx = { playerId, character, zones, inventory, jobs, stats, loadAll, onLogout };

    return (
        <div className="h-screen bg-base text-textPrimary overflow-hidden">
            <div className="workspace-shell">
                <LeftViewport leftTab={leftTab} onChangeLeftTab={setLeftTab} ctx={ctx} />
                <CenterViewport centerTab={centerTab} onChangeCenterTab={setCenterTab} ctx={ctx} />
                <RightViewport rightTab={rightTab} onChangeRightTab={setRightTab} character={character} />
            </div>
        </div>
    );
}

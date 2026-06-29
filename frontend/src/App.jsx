// frontend/src/App.jsx
// Version: 3.0
// Cap nhat: Ket noi Dashboard that, truyen character data day du

import { useState, useEffect } from 'react';
import TerminalLog from './components/TerminalLog';
import AuthForm from './components/AuthForm';
import CreateCharacter from './components/CreateCharacter';
import Dashboard from './components/Dashboard';
import { getMyCharacter } from './api/api.character';

const PAGE = {
    BOOT:             'BOOT',
    LOGIN:            'LOGIN',
    CREATE_CHARACTER: 'CREATE_CHARACTER',
    DASHBOARD:        'DASHBOARD',
};

export default function App() {
    const [page, setPage]           = useState(PAGE.BOOT);
    const [account, setAccount]     = useState(null);
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        async function checkSession() {
            const token  = localStorage.getItem('zystem_token');
            const accStr = localStorage.getItem('zystem_account');

            if (!token || !accStr) {
                setPage(PAGE.LOGIN);
                return;
            }

            try {
                const acc = JSON.parse(accStr);
                setAccount(acc);

                const result = await getMyCharacter();
                if (result.has_character) {
                    setCharacter(result.data);
                    setPage(PAGE.DASHBOARD);
                } else {
                    setPage(PAGE.CREATE_CHARACTER);
                }
            } catch {
                localStorage.removeItem('zystem_token');
                localStorage.removeItem('zystem_account');
                setPage(PAGE.LOGIN);
            }
        }

        setTimeout(checkSession, 1500);
    }, []);

    async function handleAuthSuccess(data) {
        setAccount(data.account);
        localStorage.setItem('zystem_token', data.token);
        localStorage.setItem('zystem_account', JSON.stringify(data.account));

        try {
            const result = await getMyCharacter();
            if (result.has_character) {
                setCharacter(result.data);
                setPage(PAGE.DASHBOARD);
            } else {
                setPage(PAGE.CREATE_CHARACTER);
            }
        } catch {
            setPage(PAGE.CREATE_CHARACTER);
        }
    }

    function handleCharacterCreated(newCharacter) {
        setCharacter(newCharacter);
        setPage(PAGE.DASHBOARD);
    }

    function handleLogout() {
        localStorage.removeItem('zystem_token');
        localStorage.removeItem('zystem_account');
        setAccount(null);
        setCharacter(null);
        setPage(PAGE.LOGIN);
    }

    // BOOT
    if (page === PAGE.BOOT) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-phosphor glow-text animate-flicker mb-6"
                         style={{ fontSize: '18px', letterSpacing: '10px' }}>
                        ZYSTEM
                    </div>
                    <div className="text-phosphor opacity-60" style={{ fontSize: '8px' }}>
                        KHOI DONG HE THONG<span className="animate-blink">_</span>
                    </div>
                </div>
            </div>
        );
    }

    // LOGIN
    if (page === PAGE.LOGIN) {
        return (
            <div className="min-h-screen flex">
                <div className="hidden lg:flex lg:w-1/2 border-r border-phosphor border-opacity-20"
                     style={{ backgroundColor: '#0d0d0d' }}>
                    <TerminalLog />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="lg:hidden p-4 border-b border-phosphor border-opacity-20 text-center">
                        <span className="text-phosphor glow-text animate-flicker"
                              style={{ fontSize: '12px', letterSpacing: '6px' }}>
                            ZYSTEM
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <AuthForm onAuthSuccess={handleAuthSuccess} />
                    </div>
                </div>
            </div>
        );
    }

    // TAO NHAN VAT
    if (page === PAGE.CREATE_CHARACTER) {
        return (
            <CreateCharacter
                account={account}
                onCharacterCreated={handleCharacterCreated}
            />
        );
    }

    // DASHBOARD
    if (page === PAGE.DASHBOARD) {
        return (
            <Dashboard
                initialCharacter={character}
                account={account}
                onLogout={handleLogout}
            />
        );
    }

    return null;
}

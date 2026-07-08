// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import AuthForm from './components/components.AuthForm';
import CreateCharacter from './components/components.CreateCharacter';
import Dashboard from './components/components.Dashboard';
import { getMyCharacter } from './api/api.character';
import { disconnectSocket } from './api/api.socket';

const PAGE = { BOOT: 'BOOT', LOGIN: 'LOGIN', CREATE_CHARACTER: 'CREATE_CHARACTER', DASHBOARD: 'DASHBOARD' };

export default function App() {
    const [page, setPage]           = useState(PAGE.BOOT);
    const [account, setAccount]     = useState(null);
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        async function checkSession() {
            const token  = localStorage.getItem('zystem_token');
            const accStr = localStorage.getItem('zystem_account');

            if (!token || !accStr) { setPage(PAGE.LOGIN); return; }

            try {
                setAccount(JSON.parse(accStr));
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
        checkSession();
    }, []);

    async function handleAuthSuccess(data) {
        setAccount(data.account);
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
        disconnectSocket();
        localStorage.removeItem('zystem_token');
        localStorage.removeItem('zystem_account');
        setAccount(null);
        setCharacter(null);
        setPage(PAGE.LOGIN);
    }

    if (page === PAGE.BOOT) {
        return <div className="min-h-screen bg-base" />;
    }

    if (page === PAGE.LOGIN) {
        return <AuthForm onAuthSuccess={handleAuthSuccess} />;
    }

    if (page === PAGE.CREATE_CHARACTER) {
        return <CreateCharacter account={account} onCharacterCreated={handleCharacterCreated} onLogout={handleLogout} />;
    }

    if (page === PAGE.DASHBOARD) {
        return <Dashboard initialCharacter={character} account={account} onLogout={handleLogout} />;
    }

    return null;
}

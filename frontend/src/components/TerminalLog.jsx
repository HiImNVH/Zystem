// frontend/src/components/TerminalLog.jsx
// Version: 1.0
// Panel trai: terminal log tu dong scroll — lore the gioi Zystem

import { useState, useEffect, useRef } from 'react';

const LOG_ENTRIES = [
    { delay: 0,    type: 'sys',  text: 'ZYSTEM SURVIVAL NETWORK v0.1.0' },
    { delay: 400,  type: 'sys',  text: 'Khoi dong giao thuc ket noi...' },
    { delay: 900,  type: 'ok',   text: '[OK] He thong kiem soat dam dong: ONLINE' },
    { delay: 1400, type: 'ok',   text: '[OK] Co so du lieu sinh ton: CONNECTED' },
    { delay: 1900, type: 'warn', text: '[!] Phat hien 847 xac song tai ZONE_B7' },
    { delay: 2500, type: 'warn', text: '[!] Muc do nhiem trung khu do thi: 73.4%' },
    { delay: 3100, type: 'err',  text: '[!!] Lien lac mat voi Trai An Toan #12' },
    { delay: 3700, type: 'sys',  text: 'Dang quet co so du lieu nguoi song sot...' },
    { delay: 4400, type: 'ok',   text: '[OK] Tim thay 1,247 nguoi song sot con lai' },
    { delay: 5000, type: 'warn', text: '[!] Tang phong xa Khu Nha May Hat Nhan: +15%' },
    { delay: 5600, type: 'sys',  text: 'Quet tai nguyen Khu Mo Sat LV1...' },
    { delay: 6100, type: 'ok',   text: '[OK] Phat hien 340 don vi quang sat' },
    { delay: 6700, type: 'err',  text: '[!!] BOSS THE GIOI xuat hien: ZONE_RUINS_LV5' },
    { delay: 7300, type: 'warn', text: '[!] Canh bao: Nguoi choi NVHWarrior dang bi tan cong' },
    { delay: 7900, type: 'sys',  text: 'Giao thuc bao ve khu vuc an toan: ACTIVE' },
    { delay: 8500, type: 'ok',   text: '[OK] He thong giao dich Cho Den: ONLINE' },
    { delay: 9100, type: 'sys',  text: 'Cho xac nhan danh tinh de tiep tuc...' },
    { delay: 9700, type: 'warn', text: '[!] Canh bao: Phat hien xam nhap trai phep' },
    { delay: 10300, type: 'err', text: '[!!] Kiem tra xac thuc bat buoc' },
    { delay: 10900, type: 'sys', text: 'Nhap thong tin de truy cap he thong...' },
];

const TYPE_STYLES = {
    sys:  'text-phosphor',
    ok:   'text-phosphor',
    warn: 'text-amber',
    err:  'text-danger',
};

export default function TerminalLog() {
    const [visibleLogs, setVisibleLogs] = useState([]);
    const [currentTime, setCurrentTime] = useState('');
    const logEndRef = useRef(null);

    useEffect(() => {
        // Hien thi dong log lan luot theo delay
        LOG_ENTRIES.forEach((entry) => {
            setTimeout(() => {
                setVisibleLogs(prev => [...prev, entry]);
            }, entry.delay);
        });

        // Cap nhat dong ho
        const clock = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('vi-VN', { hour12: false }));
        }, 1000);

        return () => clearInterval(clock);
    }, []);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleLogs]);

    // Lap lai log sau khi het
    useEffect(() => {
        const repeat = setTimeout(() => {
            setVisibleLogs([]);
            LOG_ENTRIES.forEach((entry) => {
                setTimeout(() => {
                    setVisibleLogs(prev => [...prev, entry]);
                }, entry.delay);
            });
        }, 14000);
        return () => clearTimeout(repeat);
    }, [visibleLogs.length === 0 ? 0 : null]);

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden select-none">
            {/* Header */}
            <div className="mb-4 flex-shrink-0">
                <div className="text-phosphor text-xs mb-1 opacity-60">
                    ══════════════════════════════
                </div>
                <div className="text-phosphor glow-text animate-flicker"
                     style={{ fontSize: '9px', lineHeight: '1.8' }}>
                    ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
                </div>
                <div className="text-phosphor glow-text animate-flicker"
                     style={{ fontSize: '9px', lineHeight: '1.8' }}>
                    ╚════██║╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
                </div>
                <div className="text-phosphor glow-text animate-flicker"
                     style={{ fontSize: '9px', lineHeight: '1.8' }}>
                        ███╔╝  ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
                </div>
                <div className="text-phosphor glow-text animate-flicker"
                     style={{ fontSize: '9px', lineHeight: '1.8' }}>
                       ███╔╝    ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
                </div>
                <div className="text-phosphor glow-text animate-flicker"
                     style={{ fontSize: '9px', lineHeight: '1.8' }}>
                    ███████╗    ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
                </div>
                <div className="text-phosphor glow-text animate-flicker"
                     style={{ fontSize: '9px', lineHeight: '1.8' }}>
                    ╚══════╝    ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
                </div>
                <div className="text-phosphor text-xs mt-2 opacity-60">
                    ══════════════════════════════
                </div>
                <div className="flex justify-between mt-3" style={{ fontSize: '8px' }}>
                    <span className="text-amber">POST-APOCALYPSE MMORPG</span>
                    <span className="text-phosphor opacity-60">{currentTime}</span>
                </div>
            </div>

            {/* Log stream */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {visibleLogs.map((log, index) => (
                    <div
                        key={index}
                        className={`${TYPE_STYLES[log.type]} animate-slideup`}
                        style={{ fontSize: '8px', lineHeight: '1.8', fontFamily: '"Press Start 2P", monospace' }}
                    >
                        <span className="opacity-40 mr-2">{'>'}</span>
                        {log.text}
                    </div>
                ))}
                {/* Cursor nhap nhay o cuoi */}
                <div className="text-phosphor" style={{ fontSize: '8px' }}>
                    <span className="opacity-40">{'>'}</span>
                    <span className="animate-blink">█</span>
                </div>
                <div ref={logEndRef} />
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 mt-4 pt-3 border-t border-phosphor border-opacity-20">
                <div style={{ fontSize: '7px' }} className="text-phosphor opacity-40 text-center">
                    ALPHA BUILD 0.1.0 — DU LIEU CO THE MAT BAT KY LUC
                </div>
            </div>
        </div>
    );
}

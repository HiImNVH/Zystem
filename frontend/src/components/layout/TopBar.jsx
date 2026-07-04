// frontend/src/components/layout/TopBar.jsx

const DESKTOP_NAV = [
    { key: 'CHAT', label: 'Chat' },
    { key: 'QUEST', label: 'Ky nang' },
    { key: 'PROFILE', label: 'Ho so' },
];

export default function TopBar({ character, activeDesktopTab, onChangeDesktopTab, onOpenSettings }) {
    const level = character?.player_level || 1;
    const exp = parseFloat(character?.current_exp || 0);
    const copper = parseInt(character?.copper || 0);
    const silver = parseInt(character?.silver || 0);

    return (
        <div className="h-14 flex items-center gap-4 px-4 border-b border-border bg-panel flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-elevated border border-border flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-accent">{level}</span>
            </div>

            <div className="flex-1 hidden sm:flex items-center gap-2 max-w-xs">
                <div className="progress-track flex-1">
                    <div className="progress-fill bg-accent" style={{ width: `${Math.min(100, (exp % 1000) / 10)}%` }} />
                </div>
            </div>

            <div className="flex-1 sm:hidden" />

            <div className="flex items-center gap-3 text-sm font-mono flex-shrink-0">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-textSecondary">{copper.toLocaleString()}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan" />
                    <span className="text-textSecondary">{silver.toLocaleString()}</span>
                </div>
            </div>

            <div className="hidden xl:flex items-center gap-1 flex-shrink-0">
                {DESKTOP_NAV.map(item => (
                    <button
                        key={item.key}
                        onClick={() => onChangeDesktopTab(item.key)}
                        className={`tab-pill ${activeDesktopTab === item.key ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <button
                onClick={onOpenSettings}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-textSecondary hover:text-textPrimary hover:bg-elevated transition-colors flex-shrink-0"
            >
                Cai
            </button>
        </div>
    );
}

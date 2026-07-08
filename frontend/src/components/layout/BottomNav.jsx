// frontend/src/components/layout/BottomNav.jsx

const NAV_ITEMS = [
    { key: 'MAIN',      label: 'Map', mark: 'MAP' },
    { key: 'INVENTORY', label: 'Inventory', mark: 'BAG' },
    { key: 'QUEST',     label: 'Skills', mark: 'SP' },
    { key: 'PROFILE',   label: 'Profile', mark: 'ME' },
];

export default function BottomNav({ activeTab, onChangeTab, className = '' }) {
    return (
        <div className={`h-16 flex items-center border-t border-border bg-panel flex-shrink-0 ${className}`}>
            {NAV_ITEMS.map(item => (
                <button
                    key={item.key}
                    onClick={() => onChangeTab(item.key)}
                    className="flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors"
                >
                    <span className={`text-[10px] font-bold ${activeTab === item.key ? 'text-accent' : 'text-textMuted opacity-60'}`}>
                        {item.mark}
                    </span>
                    <span className={`text-[10px] font-medium ${
                        activeTab === item.key ? 'text-accent' : 'text-textMuted'
                    }`}>
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
}

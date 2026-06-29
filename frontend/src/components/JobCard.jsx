// frontend/src/components/JobCard.jsx
// Version: 1.0
// Card hien thi thong tin nghe — co preview stat bonus khi hover/chon

const CATEGORY_LABELS = {
    combat:   '⚔ CHIEN DAU',
    gather:   '⛏ KHAI THAC',
    craft:    '🔨 SAN XUAT',
    advanced: '✦ NANG CAO',
};

const CATEGORY_COLORS = {
    combat:   'border-danger text-danger',
    gather:   'border-amber text-amber',
    craft:    'border-phosphor text-phosphor',
    advanced: 'text-purple-400 border-purple-400',
};

const STAT_LABELS = {
    str_per_lv: 'STR',
    agi_per_lv: 'AGI',
    dex_per_lv: 'DEX',
    vit_per_lv: 'VIT',
    int_per_lv: 'INT',
    chr_per_lv: 'CHR',
};

// Viet ten nghe dep hon cho UI
const JOB_DISPLAY = {
    vanguard:    { name: 'VANGUARD',    sub: 'Giap La Ca',       icon: '🛡' },
    marksman:    { name: 'MARKSMAN',    sub: 'Xa Thu',           icon: '🎯' },
    flanker:     { name: 'FLANKER',     sub: 'Moc Boc',          icon: '🗡' },
    miner:       { name: 'MINER',       sub: 'Tho Mo',           icon: '⛏' },
    lumberjack:  { name: 'LUMBERJACK',  sub: 'Tho Don Cui',      icon: '🪓' },
    hunter:      { name: 'HUNTER',      sub: 'Tho San',          icon: '🏹' },
    forager:     { name: 'FORAGER',     sub: 'Hai Luom',         icon: '🌿' },
    artisan:     { name: 'ARTISAN',     sub: 'Tho Thu Cong',     icon: '🔧' },
    farmer:      { name: 'FARMER',      sub: 'Nong Dan',         icon: '🌾' },
    chef:        { name: 'CHEF',        sub: 'Dau Bep',          icon: '🧪' },
    armorsmith:  { name: 'ARMORSMITH',  sub: 'Bac Thay Giap',    icon: '🛡' },
    weaponsmith: { name: 'WEAPONSMITH', sub: 'Bac Thay Vu Khi',  icon: '⚒' },
};

export default function JobCard({ job, isSelected, onClick }) {
    const display = JOB_DISPLAY[job.code] || { name: job.code.toUpperCase(), sub: '', icon: '?' };
    const catColor = CATEGORY_COLORS[job.category] || 'border-phosphor text-phosphor';
    const catLabel = CATEGORY_LABELS[job.category] || job.category;

    // Tinh stat bonus khi len cap 20
    const statBonuses = Object.entries(STAT_LABELS)
        .filter(([key]) => parseFloat(job[key]) > 0)
        .map(([key, label]) => ({
            label,
            perLv:  parseFloat(job[key]),
            total:  parseFloat((job[key] * 20).toFixed(1)),
        }));

    return (
        <button
            onClick={onClick}
            className={`
                w-full text-left p-4 transition-all duration-100 cursor-pointer
                border-2 relative
                ${isSelected
                    ? 'border-amber bg-amber bg-opacity-10 shadow-lg'
                    : 'border-phosphor border-opacity-30 bg-surface hover:border-phosphor hover:border-opacity-80 hover:bg-opacity-80'
                }
            `}
            style={{
                boxShadow: isSelected ? '4px 4px 0px rgba(245,197,24,0.4)' : '3px 3px 0px rgba(57,255,20,0.15)',
                transform: isSelected ? 'translate(-2px,-2px)' : '',
            }}
        >
            {/* Selected indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 text-amber" style={{ fontSize: '10px' }}>
                    ► CHON
                </div>
            )}

            {/* Icon + Name */}
            <div className="flex items-start gap-3 mb-3">
                <span style={{ fontSize: '20px' }}>{display.icon}</span>
                <div>
                    <div className={`font-pixel ${isSelected ? 'text-amber glow-text-amber' : 'text-phosphor'}`}
                         style={{ fontSize: '9px', lineHeight: '1.6' }}>
                        {display.name}
                    </div>
                    <div className="text-phosphor opacity-50" style={{ fontSize: '7px' }}>
                        {display.sub}
                    </div>
                </div>
            </div>

            {/* Category badge */}
            <div className={`inline-block border px-2 py-1 mb-3 ${catColor}`}
                 style={{ fontSize: '7px' }}>
                {catLabel}
            </div>

            {/* Stat bonuses at lv20 */}
            <div className="space-y-1">
                <div className="text-phosphor opacity-40" style={{ fontSize: '7px' }}>
                    BONUS KHI KHOI DAU (CAP 20):
                </div>
                <div className="flex flex-wrap gap-2">
                    {statBonuses.map(({ label, total }) => (
                        <div key={label} className={`${isSelected ? 'text-amber' : 'text-phosphor'}`}
                             style={{ fontSize: '8px' }}>
                            <span className="opacity-60">{label} </span>
                            <span className="font-bold">+{total}</span>
                        </div>
                    ))}
                </div>
            </div>
        </button>
    );
}

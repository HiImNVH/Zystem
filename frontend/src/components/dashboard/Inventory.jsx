// frontend/src/components/dashboard/Inventory.jsx
// Version: 1.0
// Grid inventory: mau theo do hiem CUREL, item power, tooltip don gian

const RARITY_STYLES = {
    COMMON:    { border: 'border-phosphor border-opacity-30', text: 'text-phosphor opacity-60', label: 'C', bg: '' },
    UNCOMMON:  { border: 'border-green-400',                 text: 'text-green-400',            label: 'U', bg: 'rgba(74,222,128,0.05)' },
    RARE:      { border: 'border-blue-400',                  text: 'text-blue-400',             label: 'R', bg: 'rgba(96,165,250,0.05)' },
    EPIC:      { border: 'border-purple-400',                text: 'text-purple-400',           label: 'E', bg: 'rgba(192,132,252,0.05)' },
    LEGENDARY: { border: 'border-amber',                     text: 'text-amber glow-text-amber', label: 'L', bg: 'rgba(245,197,24,0.08)' },
};

const CATEGORY_ICONS = {
    WEAPON:   '⚔',
    ARMOR:    '🛡',
    HELMET:   '🪖',
    MATERIAL: '🔩',
    FOOD:     '🍖',
    MEDICINE: '💉',
    AMMO:     '🔴',
    MISC:     '📦',
};

function ItemCell({ item }) {
    const rarity  = (item.rarity || 'COMMON').toUpperCase();
    const style   = RARITY_STYLES[rarity] || RARITY_STYLES.COMMON;
    const icon    = CATEGORY_ICONS[item.category] || '📦';
    const [showTip, setShowTip] = useState(false);

    return (
        <div
            className={`relative border-2 p-2 cursor-pointer transition-all hover:scale-105 ${style.border} ${item.is_equipped ? 'ring-1 ring-amber' : ''}`}
            style={{ backgroundColor: style.bg, aspectRatio: '1', minHeight: '64px' }}
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
        >
            {/* Rarity badge */}
            <div className={`absolute top-1 left-1 ${style.text}`} style={{ fontSize: '6px' }}>
                {style.label}
            </div>

            {/* Equipped badge */}
            {item.is_equipped && (
                <div className="absolute top-1 right-1 text-amber" style={{ fontSize: '6px' }}>E</div>
            )}

            {/* Icon */}
            <div className="flex items-center justify-center h-full" style={{ fontSize: '18px', marginTop: '4px' }}>
                {icon}
            </div>

            {/* Item power */}
            <div className={`absolute bottom-1 right-1 ${style.text}`} style={{ fontSize: '6px' }}>
                {item.item_power}
            </div>

            {/* Tooltip */}
            {showTip && (
                <div className="absolute z-50 bottom-full left-0 mb-1 p-2 border border-phosphor border-opacity-60 whitespace-nowrap"
                     style={{ backgroundColor: '#0d0d0d', fontSize: '7px', minWidth: '120px' }}>
                    <div className={`${style.text} mb-1`}>{item.display_name || item.category}</div>
                    <div className="text-phosphor opacity-50">Rarity: {rarity}</div>
                    <div className="text-phosphor opacity-50">Power: {item.item_power}</div>
                    <div className="text-phosphor opacity-50">Lv.Req: {item.item_level}</div>
                    {item.quantity > 1 && (
                        <div className="text-amber">x{item.quantity}</div>
                    )}
                </div>
            )}
        </div>
    );
}

// React useState phai import trong file nay
import { useState } from 'react';

const FILTER_OPTIONS = ['TAT CA', 'WEAPON', 'ARMOR', 'MATERIAL', 'FOOD', 'MEDICINE'];

export default function Inventory({ items }) {
    const [filter, setFilter] = useState('TAT CA');
    const [sortBy, setSortBy]   = useState('power'); // power | rarity | level

    const RARITY_ORDER = { LEGENDARY: 5, EPIC: 4, RARE: 3, UNCOMMON: 2, COMMON: 1 };

    const filtered = (items || [])
        .filter(item => filter === 'TAT CA' || item.category === filter)
        .sort((a, b) => {
            if (sortBy === 'power')  return (b.item_power || 0) - (a.item_power || 0);
            if (sortBy === 'rarity') return (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0);
            if (sortBy === 'level')  return (b.item_level || 0) - (a.item_level || 0);
            return 0;
        });

    return (
        <div className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <div className="text-amber" style={{ fontSize: '9px' }}>
                    // HANH TRANG ({items?.length || 0} VAT PHAM)
                </div>
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="pixel-input"
                    style={{ fontSize: '6px', padding: '4px 8px', width: 'auto' }}>
                    <option value="power">SORT: POWER</option>
                    <option value="rarity">SORT: HIEM</option>
                    <option value="level">SORT: LEVEL</option>
                </select>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-1 mb-3 flex-shrink-0">
                {FILTER_OPTIONS.map(f => (
                    <button key={f}
                            onClick={() => setFilter(f)}
                            className={`px-2 py-1 border transition-all ${
                                filter === f
                                    ? 'border-amber text-amber bg-amber bg-opacity-10'
                                    : 'border-phosphor border-opacity-20 text-phosphor opacity-50 hover:opacity-80'
                            }`}
                            style={{ fontSize: '6px' }}>
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-32 border border-dashed border-phosphor border-opacity-20">
                        <div className="text-phosphor opacity-30 text-center" style={{ fontSize: '8px', lineHeight: '2' }}>
                            HANH TRANG TRONG<br/>
                            <span style={{ fontSize: '7px' }}>HOAN THANH HANH DONG DE NHAN VAT PHAM</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-2"
                         style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))' }}>
                        {filtered.map(item => (
                            <ItemCell key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Rarity legend */}
            <div className="flex-shrink-0 mt-3 pt-3 border-t border-phosphor border-opacity-10">
                <div className="flex gap-3 flex-wrap">
                    {Object.entries(RARITY_STYLES).map(([name, s]) => (
                        <span key={name} className={s.text} style={{ fontSize: '6px' }}>
                            [{s.label}] {name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

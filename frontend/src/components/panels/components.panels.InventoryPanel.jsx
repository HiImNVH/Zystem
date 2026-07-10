// frontend/src/components/panels/components.panels.InventoryPanel.jsx

import { useState } from 'react';
import { equipItem, useFoodItem } from '../../api/api.game';

const RARITY_COLORS = {
    COMMON:    { ring: 'ring-border', text: 'text-textMuted' },
    UNCOMMON:  { ring: 'ring-success/40', text: 'text-success' },
    RARE:      { ring: 'ring-cyan/40', text: 'text-cyan' },
    EPIC:      { ring: 'ring-purple-400/40', text: 'text-purple-400' },
    LEGENDARY: { ring: 'ring-accent/50', text: 'text-accent' },
};

const TAG_MARKS = [
    { tokens: ['medicine', 'medical', 'first aid', 'bandage'], mark: '??' },
    { tokens: ['electronics', 'electronic', 'circuit', 'battery', 'wire'], mark: '??' },
    { tokens: ['plastic'], mark: '??' },
    { tokens: ['metal', 'scrap metal', 'steel', 'iron'], mark: '??' },
    { tokens: ['wood', 'timber', 'branch'], mark: '??' },
    { tokens: ['stone', 'rock', 'ore', 'mineral'], mark: '??' },
    { tokens: ['cloth', 'fabric', 'leather'], mark: '??' },
    { tokens: ['food', 'meat', 'edible', 'canned', 'grain'], mark: '??' },
    { tokens: ['water', 'salt'], mark: '??' },
    { tokens: ['chemical', 'fuel', 'acid'], mark: '??' },
    { tokens: ['glass'], mark: '??' },
    { tokens: ['tool'], mark: '??' },
    { tokens: ['weapon'], mark: '???' },
    { tokens: ['armor', 'gear', 'equipment'], mark: '???' },
    { tokens: ['building', 'container'], mark: '??' },
    { tokens: ['rubbish', 'junk', 'recyclable'], mark: '??' },
];

const CATEGORY_MARKS = {
    RUBBISH: '??',
    MATERIAL: '??',
    WEAPON: '???',
    AMMO: 'AM',
    EQUIPMENT: '???',
    TOOL: '??',
    BUILDING: '??',
    FOOD: '??',
    MEDICINE: 'MD',
};

const FILTERS = [
    { value: 'ALL', label: 'All' },
    { value: 'FOOD', label: 'Food' },
    { value: 'MEDICINE', label: 'Medicine' },
    { value: 'WEAPON', label: 'Weapons' },
    { value: 'AMMO', label: 'Ammo' },
    { value: 'TOOL', label: 'Tools' },
    { value: 'EQUIPMENT', label: 'Gear' },
    { value: 'MATERIAL', label: 'Materials' },
    { value: 'BUILDING', label: 'Structures' },
];

const EQUIPABLE_CATEGORIES = ['WEAPON', 'EQUIPMENT', 'TOOL'];
const STAT_LABELS = { str:'STR', agi:'AGI', dex:'DEX', vit:'VIT', int:'INT', chr:'CHR' };
const CUREL_BUFF_SUFFIX = {
    durability_pct: '%',
    action_speed_pct: '%',
    yield_chance_pct: '%',
    quality_power: '',
};

function getItemMark(item) {
    const text = [
        item?.display_name,
        item?.category,
        ...(Array.isArray(item?.tags) ? item.tags : []),
    ].join(' ').toLowerCase();
    const match = TAG_MARKS.find(entry => entry.tokens.some(token => text.includes(token)));
    return match?.mark || CATEGORY_MARKS[String(item?.category || '').toUpperCase()] || 'IT';
}

function getCurelBuffText(buff) {
    const value = Number(buff?.value) || 0;
    const suffix = CUREL_BUFF_SUFFIX[buff?.code] ?? '';
    return `Lv.${buff?.level || 1} +${value}${suffix}`;
}

function InventoryFilterRail({ activeFilter, onChange }) {
    return (
        <nav className="grid grid-cols-4 sm:grid-cols-1 sm:w-24 flex-shrink-0 bg-black/25 border border-border overflow-x-auto sm:overflow-visible">
            {FILTERS.map(filterItem => (
                <button
                    key={filterItem.value}
                    type="button"
                    onClick={() => onChange(filterItem.value)}
                    className={`relative min-h-14 px-2 py-2 text-center border-border ${
                        activeFilter === filterItem.value
                            ? 'bg-accent/15 text-accent'
                            : 'text-textMuted hover:text-textPrimary hover:bg-white/5'
                    } border-r sm:border-r-0 sm:border-b last:border-r-0 sm:last:border-b-0`}
                >
                    <span className="block text-[10px] font-bold leading-none">{filterItem.value === 'ALL' ? 'ALL' : filterItem.value.slice(0, 2)}</span>
                    <span className="block text-[11px] font-semibold mt-1 truncate">{filterItem.label}</span>
                    {activeFilter === filterItem.value && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-accent sm:inset-x-auto sm:inset-y-2 sm:left-1 sm:h-auto sm:w-0.5" />}
                </button>
            ))}
        </nav>
    );
}

function InventoryRow({ item, isSelected, onSelect }) {
    const rarity = (item.rarity || 'COMMON').toUpperCase();
    const style = RARITY_COLORS[rarity] || RARITY_COLORS.COMMON;
    const durability = item.max_durability > 0
        ? `${Number(item.current_durability || 0).toFixed(1)}/${Number(item.max_durability || 0).toFixed(1)}`
        : '-';

    return (
        <button
            type="button"
            onClick={() => onSelect(item)}
            className={`w-full grid grid-cols-[42px_minmax(0,1fr)_50px_72px] items-center gap-2 px-3 py-2 text-left border-b border-border/70 ${
                isSelected ? 'bg-accent/12' : 'hover:bg-white/5'
            }`}
        >
            <span className={`w-9 h-9 bg-black/30 border border-border ring-1 ${style.ring} flex items-center justify-center text-[10px] font-bold text-accent`}>
                {getItemMark(item)}
            </span>
            <span className="min-w-0">
                <span className={`block text-xs font-semibold truncate ${style.text}`}>{item.display_name || item.category}</span>
                <span className="block text-[10px] text-textMuted truncate">{Array.isArray(item.tags) ? item.tags.slice(0, 2).join(' | ') : item.category}</span>
            </span>
            <span className="text-xs text-textSecondary">Lv.{item.item_level || 1}</span>
            <span className="text-[11px] text-textMuted">{durability}</span>
        </button>
    );
}

function InventoryTable({ items, selectedItem, onSelect }) {
    return (
        <div className="min-h-0 flex-1 border border-border bg-black/20 overflow-hidden">
            <div className="grid grid-cols-[42px_minmax(0,1fr)_50px_72px] gap-2 px-3 py-2 border-b border-border bg-black/25 text-[10px] font-semibold text-textMuted">
                <span />
                <span>Item Name/Type</span>
                <span>Level</span>
                <span>Durability</span>
            </div>
            <div className="max-h-[50vh] sm:max-h-none sm:h-full overflow-y-auto">
                {items.length === 0 && <p className="text-sm text-textMuted text-center py-10">No items yet.</p>}
                {items.map(item => (
                    <InventoryRow
                        key={item.id}
                        item={item}
                        isSelected={selectedItem?.id === item.id}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}

function InventoryDetailPanel({ item, playerId, onUpdate }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!item) {
        return (
            <aside className="border border-border bg-black/20 min-h-44 sm:w-64 flex items-center justify-center text-sm text-textMuted">
                Select an item.
            </aside>
        );
    }

    const rarity = (item.rarity || 'COMMON').toUpperCase();
    const style = RARITY_COLORS[rarity] || RARITY_COLORS.COMMON;
    const normalizedCategory = (item.category || '').toUpperCase();
    const canEquip = EQUIPABLE_CATEGORIES.includes(normalizedCategory) && !item.is_equipped;
    const canEat = normalizedCategory === 'FOOD';
    const itemStats = [1, 2, 3]
        .map(index => ({ type: item[`stat_${index}_type`], value: item[`stat_${index}_value`] }))
        .filter(stat => stat.type);
    const curelBuffs = Array.isArray(item.curel_buffs) ? item.curel_buffs : [];

    async function handleEquip() {
        setIsLoading(true);
        setError('');
        try {
            await equipItem(playerId, item.id);
            await onUpdate?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleEat() {
        setIsLoading(true);
        setError('');
        try {
            await useFoodItem(playerId, item.id);
            await onUpdate?.();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <aside className="border border-border bg-black/20 p-3 sm:w-64 flex-shrink-0">
            <div className="flex items-start gap-3">
                <div className={`w-14 h-14 bg-black/30 border border-border ring-1 ${style.ring} flex items-center justify-center text-xs font-bold text-accent`}>
                    {getItemMark(item)}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{item.display_name || item.category}</p>
                    <p className={`text-xs mt-1 ${style.text}`}>Lv.{item.item_level || 1} | {rarity}</p>
                    <p className="text-xs text-textMuted mt-1">{normalizedCategory}</p>
                </div>
            </div>

            {itemStats.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    {itemStats.map((stat, index) => (
                        <div key={index} className="bg-surface/70 p-2">
                            <p className="text-textMuted">{STAT_LABELS[stat.type] || stat.type}</p>
                            <p className="font-semibold text-accent">+{parseFloat(stat.value).toFixed(1)}</p>
                        </div>
                    ))}
                </div>
            )}

            {curelBuffs.length > 0 && (
                <div className="mt-4 space-y-1">
                    {curelBuffs.map(buff => (
                        <p key={buff.code} className="text-xs text-textSecondary flex justify-between gap-3">
                            <span>{buff.label || buff.code}</span>
                            <span className="text-accent font-semibold">{getCurelBuffText(buff)}</span>
                        </p>
                    ))}
                </div>
            )}

            {item.quantity > 1 && <p className="text-xs text-textMuted mt-3">Quantity: x{item.quantity}</p>}
            {item.is_expired && <p className="text-xs text-danger mt-3">Expired</p>}
            {error && <p className="text-sm text-danger mt-3">{error}</p>}

            {canEat && (
                <button onClick={handleEat} disabled={isLoading || item.is_expired} className="btn-primary w-full mt-4 text-sm">
                    {item.is_expired ? 'Expired' : (isLoading ? 'Eating...' : 'Eat')}
                </button>
            )}

            {item.is_equipped ? (
                <div className="text-center text-sm text-success py-2 mt-4">Equipped</div>
            ) : canEquip ? (
                <button onClick={handleEquip} disabled={isLoading} className="btn-primary w-full mt-4 text-sm">
                    {isLoading ? 'Equipping...' : 'Equip'}
                </button>
            ) : null}
        </aside>
    );
}

export default function InventoryPanel({ items, playerId, onUpdate }) {
    const [filter, setFilter] = useState('ALL');
    const [selected, setSelected] = useState(null);

    const filtered = (items || []).filter(item => filter === 'ALL' || (item.category || '').toUpperCase() === filter);
    const selectedItem = filtered.some(item => item.id === selected?.id) ? selected : (filtered[0] || null);

    return (
        <div className="h-full flex flex-col bg-[#121318]">
            <header className="h-12 flex items-center justify-between gap-3 px-3 bg-black/35 border-b border-border flex-shrink-0">
                <div className="min-w-0">
                    <h2 className="font-semibold text-sm truncate">Inventory</h2>
                    <p className="text-[10px] text-textMuted">{filter === 'ALL' ? 'All categories' : FILTERS.find(item => item.value === filter)?.label}</p>
                </div>
                <span className="text-xs text-textMuted font-mono flex-shrink-0">{items?.length || 0} items</span>
            </header>

            <div className="min-h-0 flex-1 flex flex-col sm:flex-row gap-2 p-2">
                <InventoryFilterRail activeFilter={filter} onChange={setFilter} />
                <main className="min-w-0 flex-1 flex flex-col sm:flex-row gap-2">
                    <InventoryTable items={filtered} selectedItem={selectedItem} onSelect={setSelected} />
                    <InventoryDetailPanel item={selectedItem} playerId={playerId} onUpdate={onUpdate} />
                </main>
            </div>
        </div>
    );
}

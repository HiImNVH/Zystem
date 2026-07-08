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
    EQUIPMENT: '???',
    TOOL: '??',
    BUILDING: '??',
    FOOD: '??',
};

const FILTERS = [
    { value: 'ALL', label: 'All' },
    { value: 'RUBBISH', label: 'Junk' },
    { value: 'MATERIAL', label: 'Materials' },
    { value: 'WEAPON', label: 'Weapons' },
    { value: 'EQUIPMENT', label: 'Gear' },
    { value: 'TOOL', label: 'Tools' },
    { value: 'BUILDING', label: 'Building' },
    { value: 'FOOD', label: 'Food' },
];

const EQUIPABLE_CATEGORIES = ['WEAPON', 'EQUIPMENT', 'TOOL'];
const STAT_LABELS = { str:'STR', agi:'AGI', dex:'DEX', vit:'VIT', int:'INT', chr:'CHR' };

function formatExpiry(expiresAt) {
    if (!expiresAt) return null;
    return new Date(expiresAt).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getItemMark(item) {
    const text = [
        item?.display_name,
        item?.category,
        ...(Array.isArray(item?.tags) ? item.tags : []),
    ].join(' ').toLowerCase();
    const match = TAG_MARKS.find(entry => entry.tokens.some(token => text.includes(token)));
    return match?.mark || CATEGORY_MARKS[String(item?.category || '').toUpperCase()] || 'IT';
}

function ItemTile({ item, onSelect }) {
    const rarity = (item.rarity || 'COMMON').toUpperCase();
    const style = RARITY_COLORS[rarity] || RARITY_COLORS.COMMON;
    const mark = getItemMark(item);

    return (
        <button
            onClick={() => onSelect(item)}
            className={`relative aspect-square rounded-lg bg-surface border border-border ring-1 ${style.ring} card-hover flex flex-col items-center justify-center gap-1 p-2`}
        >
            {item.is_equipped && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-success" />
            )}
            {item.is_expired && (
                <span className="absolute top-1 left-1 text-[8px] font-bold text-danger">OLD</span>
            )}
            <span className="w-9 h-9 rounded bg-elevated flex items-center justify-center text-xs font-bold text-textSecondary">{mark}</span>
            <span className={`text-[10px] font-mono font-semibold ${style.text}`}>Lv.{item.item_level || 1}</span>
        </button>
    );
}

function groupItemsByCategory(items) {
    const groups = FILTERS
        .filter(filterItem => filterItem.value !== 'ALL')
        .map(filterItem => ({
            category: filterItem.value,
            label: filterItem.label,
            items: [],
        }));
    const groupByCategory = Object.fromEntries(groups.map(group => [group.category, group]));
    const otherGroup = { category: 'OTHER', label: 'Other', items: [] };

    for (const item of items || []) {
        const category = String(item.category || '').toUpperCase();
        const group = groupByCategory[category] || otherGroup;
        group.items.push(item);
    }

    return [...groups, otherGroup].filter(group => group.items.length > 0);
}

function InventoryGrid({ items, onSelect }) {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {items.map(item => (
                <ItemTile key={item.id} item={item} onSelect={onSelect} />
            ))}
        </div>
    );
}

function InventoryGroups({ groups, onSelect }) {
    return (
        <div className="space-y-5">
            {groups.map(group => (
                <section key={group.category}>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-semibold uppercase text-textMuted">{group.label}</h3>
                        <span className="text-[10px] font-mono text-textMuted">{group.items.length}</span>
                    </div>
                    <InventoryGrid items={group.items} onSelect={onSelect} />
                </section>
            ))}
        </div>
    );
}

function ItemDetailSheet({ item, playerId, onClose, onEquipped }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    if (!item) return null;

    const rarity = (item.rarity || 'COMMON').toUpperCase();
    const style = RARITY_COLORS[rarity] || RARITY_COLORS.COMMON;
    const normalizedCategory = (item.category || '').toUpperCase();
    const canEquip = EQUIPABLE_CATEGORIES.includes(normalizedCategory) && !item.is_equipped;
    const canEat = normalizedCategory === 'FOOD';
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const expiryText = formatExpiry(item.expires_at);

    const itemStats = [1, 2, 3]
        .map(index => ({ type: item[`stat_${index}_type`], value: item[`stat_${index}_value`] }))
        .filter(stat => stat.type);

    async function handleEquip() {
        setIsLoading(true);
        setError('');
        try {
            await equipItem(playerId, item.id);
            onEquipped();
            onClose();
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
            onEquipped();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4" onClick={onClose}>
            <div className="card w-full sm:max-w-sm p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3 min-w-0">
                        <div className="flex-shrink-0 text-center">
                            <div className="w-14 h-14 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">
                                {getItemMark(item)}
                            </div>
                            <p className={`mt-1 text-[10px] font-mono font-semibold ${style.text}`}>Lv.{item.item_level || 1}</p>
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-textPrimary truncate">{item.display_name || item.category}</p>
                            <p className={`text-xs font-medium ${style.text}`}>{rarity}</p>
                            {normalizedCategory && <p className="text-[10px] text-textMuted mt-1">{normalizedCategory}</p>}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                {tags.length > 0 && (
                    <div className="card p-3 mb-3">
                        <p className="text-textMuted text-xs mb-2">Tags</p>
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-elevated text-textSecondary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {(item.origin || item.note) && (
                    <div className="card p-3 mb-3">
                        {item.origin && <p className="text-xs text-textMuted">Source: <span className="text-textSecondary">{item.origin}</span></p>}
                        {item.note && <p className="text-xs text-textMuted mt-1">{item.note}</p>}
                    </div>
                )}

                {(expiryText || item.is_expired) && (
                    <div className="card p-3 mb-3">
                        <p className={`text-xs ${item.is_expired ? 'text-danger' : 'text-textMuted'}`}>
                            {item.is_expired ? 'Expired' : `Expires: ${expiryText}`}
                        </p>
                    </div>
                )}

                {itemStats.length > 0 && (
                    <div className="card p-3 mb-3">
                        <p className="text-textMuted text-xs mb-2">Bonus stats</p>
                        <div className="flex flex-wrap gap-3">
                            {itemStats.map((stat, index) => (
                                <span key={index} className="text-sm">
                                    <span className="text-textMuted">{STAT_LABELS[stat.type]} </span>
                                    <span className="text-accent font-semibold">+{parseFloat(stat.value).toFixed(1)}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {item.quantity > 1 && (
                    <p className="text-xs text-textMuted mb-3">Quantity: x{item.quantity}</p>
                )}

                {error && <p className="text-sm text-danger mb-3">{error}</p>}

                {canEat && (
                    <button onClick={handleEat} disabled={isLoading || item.is_expired} className="btn-primary w-full mb-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {item.is_expired ? 'Expired' : (isLoading ? 'Eating...' : 'Eat')}
                    </button>
                )}

                {item.is_equipped ? (
                    <div className="text-center text-sm text-success py-2">Equipped</div>
                ) : canEquip ? (
                    <button onClick={handleEquip} disabled={isLoading} className="btn-primary w-full">
                        {isLoading ? 'Equipping...' : 'Equip'}
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default function InventoryPanel({ items, playerId, onUpdate }) {
    const [filter, setFilter] = useState('ALL');
    const [selected, setSelected] = useState(null);

    const filtered = (items || []).filter(item => filter === 'ALL' || (item.category || '').toUpperCase() === filter);
    const groups = filter === 'ALL' ? groupItemsByCategory(filtered) : [];

    return (
        <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-sm">Inventory</h2>
                    <span className="text-xs text-textMuted font-mono">{items?.length || 0} items</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {FILTERS.map(filterItem => (
                        <button
                            key={filterItem.value}
                            onClick={() => setFilter(filterItem.value)}
                            className={`tab-pill flex-shrink-0 ${filter === filterItem.value ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                        >
                            {filterItem.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-[200px]">
                            <div className="text-3xl mb-3 opacity-20">0</div>
                            <p className="text-sm text-textSecondary mb-1">No items yet</p>
                            <p className="text-xs text-textMuted">Complete actions to collect loot.</p>
                        </div>
                    </div>
                ) : (
                    filter === 'ALL'
                        ? <InventoryGroups groups={groups} onSelect={setSelected} />
                        : <InventoryGrid items={filtered} onSelect={setSelected} />
                )}
            </div>

            <ItemDetailSheet
                item={selected}
                playerId={playerId}
                onClose={() => setSelected(null)}
                onEquipped={() => onUpdate?.()}
            />
        </div>
    );
}

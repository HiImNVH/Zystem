// frontend/src/components/panels/InventoryPanel.jsx

import { useState } from 'react';
import { equipItem } from '../../api/api.game';

const RARITY_COLORS = {
    COMMON:    { ring: 'ring-border', text: 'text-textMuted' },
    UNCOMMON:  { ring: 'ring-success/40', text: 'text-success' },
    RARE:      { ring: 'ring-cyan/40', text: 'text-cyan' },
    EPIC:      { ring: 'ring-purple-400/40', text: 'text-purple-400' },
    LEGENDARY: { ring: 'ring-accent/50', text: 'text-accent' },
};

const CATEGORY_MARKS = {
    RUBBISH: 'RB',
    MATERIAL: 'MT',
    WEAPON: 'WP',
    EQUIPMENT: 'EQ',
    TOOL: 'TL',
    BUILDING: 'BD',
};

const FILTERS = [
    { value: 'ALL', label: 'Tất cả' },
    { value: 'RUBBISH', label: 'Rác' },
    { value: 'MATERIAL', label: 'Nguyên liệu' },
    { value: 'WEAPON', label: 'Vũ khí' },
    { value: 'EQUIPMENT', label: 'Trang bị' },
    { value: 'TOOL', label: 'Công cụ' },
    { value: 'BUILDING', label: 'Xây dựng' },
];

const EQUIPABLE_CATEGORIES = ['WEAPON', 'EQUIPMENT', 'TOOL'];
const STAT_LABELS = { str:'STR', agi:'AGI', dex:'DEX', vit:'VIT', int:'INT', chr:'CHR' };

function ItemTile({ item, onSelect }) {
    const rarity = (item.rarity || 'COMMON').toUpperCase();
    const style = RARITY_COLORS[rarity] || RARITY_COLORS.COMMON;
    const mark = CATEGORY_MARKS[item.category] || 'IT';

    return (
        <button
            onClick={() => onSelect(item)}
            className={`relative aspect-square rounded-lg bg-surface border border-border ring-1 ${style.ring} card-hover flex flex-col items-center justify-center gap-1 p-2`}
        >
            {item.is_equipped && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-success" />
            )}
            <span className="text-xs font-bold text-textSecondary">{mark}</span>
            <span className={`text-[10px] font-mono font-semibold ${style.text}`}>{item.item_power}</span>
        </button>
    );
}

function ItemDetailSheet({ item, playerId, onClose, onEquipped }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    if (!item) return null;

    const rarity = (item.rarity || 'COMMON').toUpperCase();
    const style = RARITY_COLORS[rarity] || RARITY_COLORS.COMMON;
    const canEquip = EQUIPABLE_CATEGORIES.includes(item.category) && !item.is_equipped;
    const tags = Array.isArray(item.tags) ? item.tags : [];

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

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4" onClick={onClose}>
            <div className="card w-full sm:max-w-sm p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                            {CATEGORY_MARKS[item.category] || 'IT'}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-textPrimary truncate">{item.display_name || item.category}</p>
                            <p className={`text-xs font-medium ${style.text}`}>{rarity}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">×</button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div className="card p-3">
                        <p className="text-textMuted text-xs mb-1">Item Power</p>
                        <p className="font-mono font-semibold text-accent">{item.item_power}</p>
                    </div>
                    <div className="card p-3">
                        <p className="text-textMuted text-xs mb-1">Cấp yêu cầu</p>
                        <p className="font-mono font-semibold">{item.item_level}</p>
                    </div>
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
                        {item.origin && <p className="text-xs text-textMuted">Nguồn: <span className="text-textSecondary">{item.origin}</span></p>}
                        {item.note && <p className="text-xs text-textMuted mt-1">{item.note}</p>}
                    </div>
                )}

                {itemStats.length > 0 && (
                    <div className="card p-3 mb-3">
                        <p className="text-textMuted text-xs mb-2">Chỉ số cộng thêm</p>
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
                    <p className="text-xs text-textMuted mb-3">Số lượng: x{item.quantity}</p>
                )}

                {error && <p className="text-sm text-danger mb-3">{error}</p>}

                {item.is_equipped ? (
                    <div className="text-center text-sm text-success py-2">Đang trang bị</div>
                ) : canEquip ? (
                    <button onClick={handleEquip} disabled={isLoading} className="btn-primary w-full">
                        {isLoading ? 'Đang trang bị...' : 'Trang bị'}
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default function InventoryPanel({ items, playerId, onUpdate }) {
    const [filter, setFilter] = useState('ALL');
    const [selected, setSelected] = useState(null);

    const filtered = (items || []).filter(item => filter === 'ALL' || item.category === filter);

    return (
        <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-sm">Túi đồ</h2>
                    <span className="text-xs text-textMuted font-mono">{items?.length || 0} vật phẩm</span>
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
                            <p className="text-sm text-textSecondary mb-1">Chưa có vật phẩm</p>
                            <p className="text-xs text-textMuted">Hoàn thành hành động để thu thập loot.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {filtered.map(item => (
                            <ItemTile key={item.id} item={item} onSelect={setSelected} />
                        ))}
                    </div>
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

// frontend/src/components/panels/components.panels.EquipmentTab.jsx

import { useState, useEffect } from 'react';
import { getEquippedItems, unequipItem } from '../../api/api.game';

const SLOT_LAYOUT = [
    { key: 'armor',       label: 'Armor' },
    { key: 'backpack',    label: 'Backpack' },
    { key: 'head',        label: 'Head' },
    { key: 'upper_body',  label: 'Upper body' },
    { key: 'lower_body',  label: 'Lower body' },
    { key: 'hands',       label: 'Hands' },
    { key: 'feet',        label: 'Feet' },
    { key: 'accessory_1', label: 'Accessory 1' },
    { key: 'accessory_2', label: 'Accessory 2' },
    { key: 'weapon',      label: 'Weapon' },
    { key: 'tool',        label: 'Tool' },
];

const RARITY_TEXT = {
    COMMON: 'text-textMuted',
    UNCOMMON: 'text-success',
    RARE: 'text-cyan',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-accent',
};

const STAT_LABELS = { str:'STR', agi:'AGI', dex:'DEX', vit:'VIT', int:'INT', chr:'CHR' };

function EquipSlot({ label, item, onUnequip, isLoading }) {
    if (!item) {
        return (
            <div className="card p-3 flex flex-col items-center justify-center aspect-square opacity-40">
                <span className="text-xl mb-1">+</span>
                <span className="text-[10px] text-textMuted text-center">{label}</span>
            </div>
        );
    }

    const rarityClass = RARITY_TEXT[item.rarity?.toUpperCase()] || RARITY_TEXT.COMMON;
    const itemStats = [1, 2, 3]
        .map(index => ({ type: item[`stat_${index}_type`], value: item[`stat_${index}_value`] }))
        .filter(stat => stat.type);

    return (
        <button
            onClick={() => onUnequip(item.id)}
            disabled={isLoading}
            className="card p-3 flex flex-col items-center justify-center aspect-square text-center group relative"
        >
            <span className={`text-[9px] font-semibold mb-1 ${rarityClass}`}>Lv.{item.item_level || 1}</span>
            <span className="text-[10px] text-textMuted truncate w-full px-1">{label}</span>
            {itemStats.length > 0 && (
                <span className="text-[8px] text-textMuted mt-1">
                    {itemStats.map(stat => `+${STAT_LABELS[stat.type]}`).join(' ')}
                </span>
            )}
            <span className="absolute inset-0 rounded-lg bg-danger/0 group-hover:bg-danger/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-[9px] text-danger transition-opacity">Unequip</span>
            </span>
        </button>
    );
}

export default function EquipmentTab({ playerId, gearStats, onUpdate }) {
    const [equipped, setEquipped] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    async function loadEquipped() {
        if (!playerId) return;
        setIsLoading(true);
        try {
            const result = await getEquippedItems(playerId);
            setEquipped(result.data);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { loadEquipped(); }, [playerId]);

    async function handleUnequip(itemId) {
        setActionLoading(true);
        try {
            await unequipItem(playerId, itemId);
            await loadEquipped();
            onUpdate?.();
        } finally {
            setActionLoading(false);
        }
    }

    const hasGearBonus = gearStats && Object.values(gearStats).some(value => parseFloat(value) > 0);

    return (
        <div className="p-4 space-y-4">
            <div>
                <p className="text-xs font-semibold text-textMuted mb-3">EQUIPMENT</p>
                {isLoading ? (
                    <p className="text-xs text-textMuted">Loading...</p>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {SLOT_LAYOUT.map(slot => (
                            <EquipSlot
                                key={slot.key}
                                label={slot.label}
                                item={equipped[slot.key]}
                                onUnequip={handleUnequip}
                                isLoading={actionLoading}
                            />
                        ))}
                    </div>
                )}
            </div>

            {hasGearBonus && (
                <div className="card p-4">
                    <p className="text-xs font-semibold text-textMuted mb-3">GEAR STATS</p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        {Object.entries(STAT_LABELS).map(([key, label]) => {
                            const value = parseFloat(gearStats?.[key] || 0);
                            if (value === 0) return null;
                            return (
                                <div key={key}>
                                    <p className="text-sm font-bold font-mono text-accent">+{value.toFixed(1)}</p>
                                    <p className="text-[10px] text-textMuted">{label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <p className="text-xs text-textMuted text-center px-4">
                Select items from your inventory to equip matching slots.
            </p>
        </div>
    );
}

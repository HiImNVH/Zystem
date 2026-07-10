// frontend/src/components/panels/components.panels.MainPanel.jsx

import { useState, useEffect } from 'react';
import {
    getPoiActivities,
    executePoiActivity,
    getRecipes, getRecipe, craftItem,
    restAtSafeHouse,
    getCurrencyMarket,
    exchangeCurrency
} from '../../api/api.game';
import { getFactions, getMyFaction, createFaction, joinFaction, leaveFaction } from '../../api/api.faction';
import CombatMiniGame from './components.panels.CombatMiniGame';
import TradingSheet from './components.panels.TradingSheet';

const POI_ROTATION_MS = 15 * 60 * 1000;

const ZONE_BANNERS = {
    urban:   { gradient: 'from-zinc-700/40 to-base', mark: 'UR' },
    rural:   { gradient: 'from-lime-900/35 to-base', mark: 'RU' },
    coast:   { gradient: 'from-cyan-900/35 to-base', mark: 'CO' },
    forest:  { gradient: 'from-emerald-900/40 to-base', mark: 'FO' },
    desert:  { gradient: 'from-amber-900/40 to-base', mark: 'DE' },
    safe:    { gradient: 'from-cyan-900/30 to-base', mark: 'HM' },
};

const ZONE_TAG_LABELS = {
    rural: 'Rural',
    town: 'Town',
    city: 'City',
    forest: 'Forest',
    coast: 'Coast',
    industrial: 'Industrial',
    geological_mine: 'Geological Mine',
    military: 'Military',
    swamp: 'Swamp',
};

const RESOURCE_METER_FILL_CLASSES = {
    EXP: 'bg-success',
    HP: 'bg-danger',
    Energy: 'bg-cyan',
};

const EXPLORATION_RINGS = [
    {
        id: 'near_city',
        title: 'Near City Ring',
        range: 'Lv.1-20',
        minLevel: 1,
        maxLevel: 20,
        helper: 'Suburbs, market streets, industrial edges, greenbelt, farms, and the nearest coast.',
    },
    {
        id: 'far_routes',
        title: 'Far Routes',
        range: 'Lv.25-40',
        minLevel: 25,
        maxLevel: 40,
        helper: 'Quarries, warehouses, downtown ruins, deep wild zones, wastelands, and high-risk endgame sites.',
    },
];

const SAFE_HOUSE_INFO = {
    level: 1,
    name: 'Safe House',
    condition: 'Stable',
    bedLevel: 1,
    restEfficiency: 1,
    workstations: [
        { id: 'bed', name: 'Bed', level: 1, status: 'Good', breaksIn: '72h' },
        { id: 'campfire', name: 'Cooking Fire', level: 1, status: 'Good', breaksIn: '36h' },
        { id: 'workbench', name: 'Workbench', level: 1, status: 'Worn', breaksIn: '24h' },
    ],
    slots: 8,
};

const ITEM_TAG_MARKS = [
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

const ITEM_CATEGORY_MARKS = {
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

const ITEM_RARITY_TEXT = {
    COMMON: 'text-textMuted',
    UNCOMMON: 'text-success',
    RARE: 'text-cyan',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-accent',
};

const GENERIC_INGREDIENT_TOKENS = new Set([
    'and', 'any', 'the', 'with', 'material', 'materials', 'processed',
    'recyclable', 'scrap', 'item', 'items', 'ingredient', 'ingredients',
    'crafting', 'base', 'basic', 'raw', 'resource', 'resources'
]);

function normalizeIngredientText(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function getIngredientTokens(tagQuery) {
    return normalizeIngredientText(tagQuery)
        .split(/\s+/)
        .filter(token => token.length >= 3 && !GENERIC_INGREDIENT_TOKENS.has(token));
}

function itemMatchesIngredient(item, tagQuery) {
    const tokens = getIngredientTokens(tagQuery);
    if (tokens.length === 0) return true;

    const itemText = normalizeIngredientText([
        item?.display_name,
        item?.category,
        ...(Array.isArray(item?.tags) ? item.tags : []),
    ].join(' '));

    return tokens.some(token => itemText.includes(token));
}

function getItemMark(itemOrCategory, tags = []) {
    const item = typeof itemOrCategory === 'object' ? itemOrCategory : null;
    const category = item ? item.category : itemOrCategory;
    const itemTags = item ? item.tags : tags;
    const text = [
        item?.display_name,
        category,
        ...(Array.isArray(itemTags) ? itemTags : []),
    ].join(' ').toLowerCase();
    const match = ITEM_TAG_MARKS.find(entry => entry.tokens.some(token => text.includes(token)));
    return match?.mark || ITEM_CATEGORY_MARKS[String(category || '').toUpperCase()] || 'IT';
}

function getItemRarityClassName(item) {
    return ITEM_RARITY_TEXT[String(item?.rarity || 'COMMON').toUpperCase()] || ITEM_RARITY_TEXT.COMMON;
}

function getDroppedItemName(item) {
    return item?.display_name || item?.name || item?.template_id || 'Unknown item';
}

function getDroppedItemsText(items) {
    const droppedItems = Array.isArray(items) ? items : [];
    if (droppedItems.length === 0) return '';

    return droppedItems.map(getDroppedItemName).join(', ');
}

function DroppedItemsInline({ items }) {
    const droppedItems = Array.isArray(items) ? items : [];
    if (droppedItems.length === 0) {
        return <span className="text-textMuted">No item found.</span>;
    }

    return droppedItems.map((item, index) => (
        <span key={item.id || `${item.template_id}-${index}`}>
            {index > 0 && <span className="text-textMuted">, </span>}
            <span className={getItemRarityClassName(item)}>{getDroppedItemName(item)}</span>
        </span>
    ));
}

function getZoneLevel(zone) {
    return parseInt(zone?.level_gap || zone?.min_player_lv || 1);
}

function isZoneLockedForPlayer(zone, playerLevel) {
    return getZoneLevel(zone) > (parseInt(playerLevel) || 1) + 10;
}

function getZoneTagLabels(zone) {
    const tags = zone?.zone_tags || [];
    if (tags.length === 0) return zone?.biome || zone?.zone_type || '';
    return tags.map(tag => ZONE_TAG_LABELS[tag] || tag).join(' / ');
}

function getPoiRotationSlot() {
    return Math.floor(Date.now() / POI_ROTATION_MS);
}

function createStableHash(value) {
    return String(value || '').split('').reduce((hash, char) => (
        ((hash << 5) - hash + char.charCodeAt(0)) >>> 0
    ), 2166136261);
}

function getRotatingPois(zone, rotationSlot) {
    const pois = zone?.pois || [];
    if (pois.length <= 5) return pois;

    const maxVisible = Math.min(10, pois.length);
    const visibleCount = 5 + (createStableHash(`${zone.code}:${rotationSlot}:count`) % (maxVisible - 4));

    return [...pois]
        .sort((left, right) => (
            createStableHash(`${zone.code}:${rotationSlot}:${left.code || left.id}`) -
            createStableHash(`${zone.code}:${rotationSlot}:${right.code || right.id}`)
        ))
        .slice(0, visibleCount);
}

function getPoiActionOptions() {
    const actionOptions = [
        { type: 'enemy', label: 'Find enemies' },
        { type: 'scavenge', label: 'Scavenge rooms' },
        { type: 'gather', label: 'Gather resources' },
        { type: 'sweep', label: 'Sweep' },
    ];

    return actionOptions.map(option => ({
        ...option,
        isAvailable: true,
    }));
}

function ResourceMeter({ label, current, max }) {
    const safeMax = Math.max(1, parseInt(max) || 1);
    const safeCurrent = Math.max(0, parseInt(current) || 0);
    const pct = Math.min(100, Math.round((safeCurrent / safeMax) * 100));
    const fillClassName = RESOURCE_METER_FILL_CLASSES[label] || 'bg-success';

    return (
        <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-textMuted uppercase font-semibold">{label}</span>
                <span className="font-mono text-textSecondary">{safeCurrent}/{safeMax}</span>
            </div>
            <div className="progress-track">
                <div className={`progress-fill ${fillClassName}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function CurrencyBadge({ label, value, colorClassName }) {
    const safeValue = Math.max(0, parseInt(value) || 0);

    return (
        <div className="flex items-center justify-between gap-2 rounded-md bg-elevated/60 border border-border px-2 py-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colorClassName}`} />
                <span className="text-[10px] uppercase font-semibold text-textMuted truncate">{label}</span>
            </div>
            <span className="text-xs font-mono text-textSecondary truncate">{safeValue.toLocaleString()}</span>
        </div>
    );
}

function CompactStatusMeter({ label, current, max }) {
    const safeMax = Math.max(1, parseInt(max) || 1);
    const safeCurrent = Math.max(0, parseInt(current) || 0);
    const pct = Math.min(100, Math.round((safeCurrent / safeMax) * 100));
    const fillClassName = RESOURCE_METER_FILL_CLASSES[label] || 'bg-success';

    return (
        <div className="contents">
            <span className="text-[11px] text-textMuted uppercase font-semibold self-center leading-none">{label}</span>
            <div className="relative h-4 self-center min-w-0 rounded bg-elevated overflow-hidden">
                <div className={`absolute inset-y-0 left-0 rounded ${fillClassName}`} style={{ width: `${pct}%` }} />
                <div className="absolute inset-0 flex items-center justify-end px-2">
                    <span className="font-mono text-[11px] leading-none font-semibold text-textPrimary">
                        {safeCurrent.toLocaleString()} / {safeMax.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

function calculateExpRequiredForLevel(level) {
    const safeLevel = Math.max(1, parseInt(level) || 1);
    return Math.floor(0.7 * Math.pow(safeLevel, 3) + 20 * Math.pow(safeLevel, 2) + 100 * safeLevel + 50);
}

// Thanh trang thai nhan vat: luon hien thi o tren cung, khong bien mat khi
// chuyen giua man Refugee Camp / chon route / dang kham pha
function PlayerStatusBar({ character }) {
    const playerLevel = character?.player_level || 1;
    const expRequired = calculateExpRequiredForLevel(playerLevel);
    const money = character?.money ?? character?.copper ?? 0;
    const silverCoin = character?.silver_coin ?? character?.silver ?? 0;
    const goldCoin = character?.gold_coin ?? character?.gold ?? 0;

    return (
        <div className="sticky top-0 z-20 bg-base px-3 pt-3 pb-2">
            <div className="card p-2.5 space-y-2">
                <div className="grid grid-cols-[4.75rem_1fr_3rem] gap-x-2 gap-y-2 items-center">
                    <CompactStatusMeter label="EXP" current={character?.current_exp} max={expRequired} />
                    <div className="row-span-2 col-start-3 row-start-1 min-h-12 border border-textSecondary bg-base flex items-center justify-center">
                        <span className="text-lg font-bold text-textPrimary">{playerLevel}</span>
                    </div>
                    <CompactStatusMeter label="Energy" current={character?.current_energy} max={character?.max_energy} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <CurrencyBadge label="Money" value={money} colorClassName="bg-accent" />
                    <CurrencyBadge label="Silver" value={silverCoin} colorClassName="bg-cyan" />
                    <CurrencyBadge label="Gold" value={goldCoin} colorClassName="bg-amber-400" />
                </div>
            </div>
        </div>
    );
}

function CraftingSheet({ playerId, inventory, onClose, onUpdate, onNotify }) {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isCrafting, setIsCrafting] = useState(false);
    const [error, setError] = useState('');

    const usableInventory = (inventory || []).filter(item => !item.is_equipped && !item.is_expired);
    const filteredRecipes = recipes
        .filter(recipe => {
            const text = `${recipe.output_item_name || ''} ${recipe.code || ''}`.toLowerCase();
            return text.includes(search.toLowerCase());
        })
        .slice(0, 60);

    useEffect(() => {
        let isMounted = true;
        async function loadRecipes() {
            setIsLoading(true);
            setError('');
            try {
                const result = await getRecipes();
                if (isMounted) setRecipes(result.data || []);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }
        loadRecipes();
        return () => { isMounted = false; };
    }, []);

    async function selectRecipe(recipe) {
        setError('');
        setSelectedIngredients({});
        try {
            const result = await getRecipe(recipe.code);
            setSelectedRecipe(result.data);
        } catch (err) {
            setError(err.message);
        }
    }

    function updateIngredient(slotIndex, itemId) {
        setSelectedIngredients(current => ({
            ...current,
            [slotIndex]: itemId,
        }));
    }

    function getSelectedItem(slotIndex) {
        return usableInventory.find(item => item.id === selectedIngredients[slotIndex]);
    }

    async function handleCraft() {
        if (!selectedRecipe) return;

        const ingredients = (selectedRecipe.inputs || [])
            .map(input => ({
                slotIndex: input.slot_index,
                itemId: selectedIngredients[input.slot_index],
            }))
            .filter(input => input.itemId);

        if (ingredients.length !== (selectedRecipe.inputs || []).length) {
            setError('Choose an item for every ingredient slot.');
            return;
        }

        setIsCrafting(true);
        setError('');
        try {
            const result = await craftItem(playerId, selectedRecipe.code, ingredients);
            onNotify(`Crafted ${result.data.output_item_name}`, 'success');
            await onUpdate?.();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsCrafting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="card w-full sm:max-w-3xl max-h-[88vh] overflow-hidden animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="p-5 border-b border-border flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-semibold">Crafting</h3>
                        <p className="text-xs text-textMuted mt-1">Choose a recipe, then assign inventory items to each slot.</p>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)] max-h-[72vh]">
                    <div className="p-4 border-b md:border-b-0 md:border-r border-border overflow-y-auto">
                        <input
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            placeholder="Search recipe"
                            className="input-field mb-3"
                        />
                        {isLoading && <p className="text-sm text-textMuted py-6 text-center">Loading recipes...</p>}
                        {!isLoading && error && !selectedRecipe && <p className="text-sm text-danger mb-3">{error}</p>}
                        <div className="space-y-2">
                            {filteredRecipes.map(recipe => (
                                <button
                                    key={recipe.id}
                                    onClick={() => selectRecipe(recipe)}
                                    className={`w-full card card-hover p-3 text-left flex items-center gap-3 ${selectedRecipe?.code === recipe.code ? 'ring-1 ring-accent' : ''}`}
                                >
                                    <div className="flex-shrink-0 text-center">
                                        <div className="w-10 h-10 rounded bg-elevated flex items-center justify-center text-[10px] font-bold text-accent">
                                            {getItemMark(recipe.output_category, recipe.output_item_tags)}
                                        </div>
                                        <p className="mt-0.5 text-[9px] font-mono text-textMuted">Lv.{recipe.output_item_level || 1}</p>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold truncate">{recipe.output_item_name}</p>
                                        <p className="text-xs text-textMuted mt-1 truncate">
                                            Skill Lv.{recipe.required_job_level} | {recipe.curel_rule_key || 'No CUREL'}
                                        </p>
                                    </div>
                                </button>
                            ))}
                            {!isLoading && filteredRecipes.length === 0 && (
                                <p className="text-sm text-textMuted py-6 text-center">No recipes found.</p>
                            )}
                        </div>
                    </div>

                    <div className="p-4 overflow-y-auto">
                        {!selectedRecipe ? (
                            <p className="text-sm text-textMuted py-8 text-center">Select a recipe to craft.</p>
                        ) : (
                            <div>
                                <div className="card p-3 mb-3 flex items-start gap-3">
                                    <div className="flex-shrink-0 text-center">
                                        <div className="w-16 h-16 rounded-lg bg-elevated flex items-center justify-center text-sm font-bold text-accent">
                                            {getItemMark(selectedRecipe.output_category, selectedRecipe.output_item_tags)}
                                        </div>
                                        <p className="mt-1 text-[10px] font-mono text-accent">Lv.{selectedRecipe.output_item_level || 1}</p>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold truncate">{selectedRecipe.output_item_name}</p>
                                        <p className="text-xs text-textMuted mt-1">
                                            {selectedRecipe.output_category} | Skill Lv.{selectedRecipe.required_job_level}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {(selectedRecipe.output_item_tags || []).slice(0, 4).map(tag => (
                                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-elevated text-textSecondary">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    {(selectedRecipe.inputs || []).map(input => {
                                        const chosenIds = Object.entries(selectedIngredients)
                                            .filter(([slot]) => parseInt(slot) !== parseInt(input.slot_index))
                                            .map(([, itemId]) => itemId);
                                        const matchingItems = usableInventory.filter(item => itemMatchesIngredient(item, input.tag_query));
                                        const selectedItem = getSelectedItem(input.slot_index);
                                        return (
                                            <div key={input.slot_index}>
                                                <p className="text-xs text-textMuted mb-2">
                                                    Slot {input.slot_index}: {input.tag_query} x{input.quantity}
                                                </p>
                                                {selectedItem && (
                                                    <div className="mb-2 rounded-lg border border-accent/40 bg-accent/10 p-2 flex items-center gap-2">
                                                        <div className="text-center flex-shrink-0">
                                                            <div className="w-9 h-9 rounded bg-elevated flex items-center justify-center text-[10px] font-bold text-accent">
                                                                {getItemMark(selectedItem)}
                                                            </div>
                                                            <p className="mt-0.5 text-[9px] font-mono text-accent">Lv.{selectedItem.item_level || 1}</p>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs font-semibold truncate">{selectedItem.display_name}</p>
                                                            <p className="text-[10px] text-textMuted">{selectedItem.rarity} | x{selectedItem.quantity || 1}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                                                    {matchingItems.map(item => {
                                                        const isDisabled = chosenIds.includes(item.id) || (parseInt(item.quantity) || 0) < (parseInt(input.quantity) || 1);
                                                        const isSelected = selectedIngredients[input.slot_index] === item.id;
                                                        const rarityClass = ITEM_RARITY_TEXT[String(item.rarity || 'COMMON').toUpperCase()] || ITEM_RARITY_TEXT.COMMON;
                                                        return (
                                                            <button
                                                                key={item.id}
                                                                type="button"
                                                                onClick={() => !isDisabled && updateIngredient(input.slot_index, item.id)}
                                                                disabled={isDisabled}
                                                                className={`rounded-lg border bg-surface p-2 text-center transition-colors ${
                                                                    isSelected ? 'border-accent' : 'border-border hover:border-accent/50'
                                                                } ${isDisabled ? 'opacity-35 cursor-not-allowed' : ''}`}
                                                            >
                                                                <div className="mx-auto w-9 h-9 rounded bg-elevated flex items-center justify-center text-[10px] font-bold text-textSecondary">
                                                                    {getItemMark(item)}
                                                                </div>
                                                                <p className={`mt-1 text-[9px] font-mono ${rarityClass}`}>Lv.{item.item_level || 1}</p>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {matchingItems.length === 0 && (
                                                    <p className="text-[10px] text-danger mt-1">No matching items in inventory.</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {error && <p className="text-sm text-danger mb-3">{error}</p>}

                                <button onClick={handleCraft} disabled={isCrafting} className="btn-primary w-full">
                                    {isCrafting ? 'Crafting...' : 'Craft'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatActionResult(result) {
    if (!result) return '';
    const itemsText = getDroppedItemsText(result.items_dropped);
    const moneyText = result.money_dropped ? `, Money +${parseInt(result.money_dropped).toLocaleString()}` : '';
    const itemText = itemsText ? `, found ${itemsText}` : '';
    const sweepText = result.sweep_event ? `${result.sweep_event.label}: ` : '';
    return `${sweepText}Energy -${result.energy_cost}, EXP +${result.player_exp}${itemText}${moneyText}.`;
}

function ActionResultDetails({ result }) {
    if (!result) return null;

    const moneyValue = parseInt(result.money_dropped) || 0;

    return (
        <div className="mt-2 space-y-1 text-xs text-textSecondary">
            <p>
                Energy -{result.energy_cost}, EXP +{result.player_exp}
                {moneyValue > 0 ? `, Money +${moneyValue.toLocaleString()}` : ''}.
            </p>
            <p>
                Found: <DroppedItemsInline items={result.items_dropped} />
            </p>
        </div>
    );
}

function formatCurrencyName(value) {
    return String(value || '')
        .split('_')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function CurrencyExchangeSheet({ playerId, character, onClose, onUpdate, onNotify }) {
    const [market, setMarket] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [executingKey, setExecutingKey] = useState('');
    const [error, setError] = useState('');
    const money = parseInt(character?.money ?? character?.copper ?? 0);

    useEffect(() => {
        let isMounted = true;
        async function loadMarket() {
            setIsLoading(true);
            setError('');
            try {
                const result = await getCurrencyMarket();
                if (isMounted) setMarket(result.data || []);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }
        loadMarket();
        return () => { isMounted = false; };
    }, []);

    function updateQuantity(currency, value) {
        setQuantities(current => ({
            ...current,
            [currency]: Math.max(1, parseInt(value) || 1),
        }));
    }

    async function handleExchange(config) {
        const { currency, side } = config;
        const quantity = quantities[currency] || 1;
        setExecutingKey(`${currency}:${side}`);
        setError('');
        try {
            await exchangeCurrency(playerId, currency, quantity, side);
            onNotify(`${side === 'buy' ? 'Bought' : 'Sold'} ${quantity} ${formatCurrencyName(currency)}.`, 'success');
            await onUpdate?.();
        } catch (err) {
            setError(err.message);
            onNotify(err.message, 'error');
        } finally {
            setExecutingKey('');
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="card w-full sm:max-w-xl max-h-[88vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h3 className="font-semibold">Currency Exchange</h3>
                        <p className="text-xs text-textMuted mt-1">Money balance: {money.toLocaleString()}</p>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                {isLoading && <p className="text-sm text-textMuted py-6 text-center">Loading market...</p>}
                {error && <p className="text-sm text-danger mb-3">{error}</p>}
                {!isLoading && (
                    <div className="space-y-3">
                        {market.map(item => {
                            const quantity = quantities[item.currency] || 1;
                            const coinBalance = parseInt(character?.[item.currency] || 0);
                            return (
                                <div key={item.currency} className="card p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold">{item.label || formatCurrencyName(item.currency)}</p>
                                            <p className="text-xs text-textMuted mt-1">
                                                Buy {parseInt(item.buy_price).toLocaleString()} Money | Sell {parseInt(item.sell_price).toLocaleString()} Money
                                            </p>
                                            <p className="text-[11px] text-textMuted mt-1">Owned: {coinBalance.toLocaleString()}</p>
                                        </div>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={event => updateQuantity(item.currency, event.target.value)}
                                            className="input-field w-20 text-center"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        <button
                                            type="button"
                                            onClick={() => handleExchange({ currency: item.currency, side: 'buy' })}
                                            disabled={Boolean(executingKey)}
                                            className="btn-primary text-sm"
                                        >
                                            {executingKey === `${item.currency}:buy` ? 'Buying...' : 'Buy'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleExchange({ currency: item.currency, side: 'sell' })}
                                            disabled={Boolean(executingKey)}
                                            className="btn-secondary text-sm"
                                        >
                                            {executingKey === `${item.currency}:sell` ? 'Selling...' : 'Sell'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function formatDropTable(dropTable) {
    if (!Array.isArray(dropTable) || dropTable.length === 0) return 'No drop data';
    return dropTable
        .map(drop => `${drop.tag_query} ${Math.round((drop.chance || 0) * 100)}%`)
        .join(' | ');
}

function getActivityEnergyCost(activityData, activityType) {
    const costKey = activityType === 'dungeon' ? 'sweep' : activityType;
    const cost = activityData?.resource_costs?.[costKey];
    return parseInt(cost?.energyCost || cost?.energy_cost || cost?.energy) || 0;
}

function getTargetEnergyCost(activityData, activityType, target) {
    const targetCost = target?.resource_cost;
    const energyCost = parseInt(targetCost?.energyCost || targetCost?.energy_cost || targetCost?.energy) || 0;
    return energyCost > 0 ? energyCost : getActivityEnergyCost(activityData, activityType);
}

function canSpendEnergy(character, energyCost) {
    return (parseInt(character?.current_energy) || 0) >= energyCost;
}

function getEnergyErrorMessage(character, energyCost) {
    const currentEnergy = parseInt(character?.current_energy) || 0;
    return `Not enough energy. Need ${energyCost}, current ${currentEnergy}.`;
}

function ActivityListSheet({ activityType, activityData, character, inventory, isLoading, error, onClose, onExecute, executingId }) {
    const [combatEnemy, setCombatEnemy] = useState(null);
    const [sheetError, setSheetError] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [resultData, setResultData] = useState(null);
    if (!activityType) return null;

    const titleMap = {
        enemy: 'Find enemies',
        scavenge: 'Scavenge',
        gather: 'Gather',
        sweep: 'Sweep',
        dungeon: 'Sweep',
    };
    const list = activityType === 'enemy'
        ? (activityData?.enemies || [])
        : (activityType === 'scavenge'
            ? (activityData?.scavengeables || [])
            : (activityType === 'gather' ? (activityData?.gatherables || []) : []));
    const sweep = activityData?.sweep || activityData?.dungeon;

    async function startActivity(options) {
        const { item, mode } = options;
        const targetEnergyCost = getTargetEnergyCost(activityData, activityType, item);
        if (targetEnergyCost > 0 && !canSpendEnergy(character, targetEnergyCost)) {
            setSheetError(getEnergyErrorMessage(character, targetEnergyCost));
            return;
        }

        setSheetError('');
        setResultMessage('');
        setResultData(null);
        if (activityType === 'enemy') {
            setCombatEnemy(item);
            return;
        }

        const result = await onExecute?.(item, mode ? { mode } : undefined);
        if (['scavenge', 'gather'].includes(activityType) && result?.success !== false) {
            const verb = activityType === 'gather' ? 'Gathered from' : 'Found something in';
            setResultMessage(`${verb} ${item.name}.`);
            setResultData(result.data);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="card w-full sm:max-w-lg max-h-[88vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold">{titleMap[activityType]}</h3>
                        <p className="text-xs text-textMuted mt-1 truncate">
                            {activityData?.poi?.display_name || 'POI'} | Lv.{activityData?.zone?.level_gap || activityData?.zone?.min_player_lv || 1}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                {isLoading && <p className="text-sm text-textMuted py-6 text-center">Loading...</p>}
                {(error || sheetError) && <p className="text-sm text-danger mb-3">{error || sheetError}</p>}
                {resultMessage && (
                    <div className="mb-3 rounded-lg border border-success/40 bg-success/10 px-3 py-2">
                        <p className="text-sm font-semibold text-success">Search result</p>
                        <p className="text-xs text-textSecondary mt-1">{resultMessage}</p>
                        <ActionResultDetails result={resultData} />
                    </div>
                )}
                {!isLoading && activityType === 'enemy' && combatEnemy && (
                    <CombatMiniGame
                        enemy={combatEnemy}
                        character={character}
                        inventory={inventory}
                        isExecuting={Boolean(executingId)}
                        onBack={() => setCombatEnemy(null)}
                        onAttack={options => onExecute?.(combatEnemy, options)}
                    />
                )}

                {!isLoading && activityType !== 'sweep' && activityType !== 'dungeon' && !(activityType === 'enemy' && combatEnemy) && (
                    <div className="space-y-2">
                        {list.map(item => (
                            <div key={item.id} className="card p-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-[10px] font-bold text-accent flex-shrink-0">
                                    {activityType === 'enemy' ? item.threat?.slice(0, 2).toUpperCase() : (activityType === 'gather' ? 'GA' : 'SC')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{item.name}</p>
                                    {activityType === 'enemy' ? (
                                        <>
                                            <p className="text-xs text-textMuted truncate">
                                                Lv.{item.level} | HP {item.health} | ATK {item.attack} | DEF {item.defense}
                                            </p>
                                            <p className="text-[11px] text-textMuted truncate">
                                                Drops: {formatDropTable(item.drop_table)}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-xs text-textMuted truncate">
                                                Zone Lv.{item.item_level} | {item.category_label || item.category} | Energy {getTargetEnergyCost(activityData, activityType, item)}
                                            </p>
                                            <p className="text-[11px] text-textMuted truncate">
                                                {item.reward_hint}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => startActivity({ item })}
                                    disabled={Boolean(executingId)}
                                    className="btn-primary px-3 py-2 text-xs flex-shrink-0"
                                >
                                    {executingId === item.id ? 'Working...' : (activityType === 'enemy' ? 'Engage' : (activityType === 'gather' ? 'Gather' : 'Search'))}
                                </button>
                            </div>
                        ))}
                        {list.length === 0 && (
                            <p className="text-sm text-textMuted py-6 text-center">Nothing available here.</p>
                        )}
                    </div>
                )}

                {!isLoading && (activityType === 'sweep' || activityType === 'dungeon') && (
                    sweep ? (
                        <div className="space-y-3">
                            <div className="card p-4">
                                <p className="font-semibold">{sweep.name}</p>
                                <p className="text-xs text-textMuted mt-1">Map Lv.{sweep.map_level} | Boss Lv.{sweep.boss_level}</p>
                                {sweep.event_pool?.length > 0 && (
                                    <p className="text-[11px] text-textMuted mt-1 truncate">
                                        Events: {sweep.event_pool.map(event => event.label).join(' | ')}
                                    </p>
                                )}
                            </div>
                            <div className="w-full card p-3 text-left">
                                <p className="text-sm font-semibold">Next sweep turn</p>
                                <p className="text-xs text-textMuted mt-1">{sweep.normal.reward_hint}</p>
                                <button
                                    type="button"
                                    onClick={() => startActivity({ item: sweep, mode: 'normal' })}
                                    disabled={Boolean(executingId)}
                                    className="btn-primary mt-3 px-3 py-2 text-xs"
                                >
                                    {executingId === `${sweep.id}:normal` ? 'Sweeping...' : 'Sweep'}
                                </button>
                            </div>
                            <div className="w-full card p-3 text-left">
                                <p className="text-sm font-semibold">Boss</p>
                                <p className="text-xs text-textMuted mt-1">{sweep.hard.monster_level_rule} | {sweep.hard.reward_hint}</p>
                                <button
                                    type="button"
                                    onClick={() => startActivity({ item: sweep, mode: 'retreat' })}
                                    disabled={Boolean(executingId)}
                                    className="btn-secondary mt-3 px-3 py-2 text-xs"
                                >
                                    {executingId === `${sweep.id}:retreat` ? 'Retreating...' : 'Retreat'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-textMuted py-6 text-center">This POI has no sweep route yet.</p>
                    )
                )}
            </div>
        </div>
    );
}

function PoiActionSheet({ poi, onClose, onOpenActivity }) {
    if (!poi) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="card w-full sm:max-w-lg max-h-[88vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold truncate">{poi.display_name}</h3>
                    </div>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                <div className="space-y-2">
                    {getPoiActionOptions().map(option => (
                        <button
                            key={option.type}
                            type="button"
                            disabled={!option.isAvailable}
                            onClick={() => option.isAvailable && onOpenActivity?.(poi, option.type)}
                            className={`w-full p-3 rounded-lg border text-left transition-colors ${
                                option.isAvailable
                                    ? 'border-border hover:border-accent/50'
                                    : 'border-border/50 opacity-40 cursor-not-allowed'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold">{option.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FactionSheet({ playerId, onClose, onNotify }) {
    const [faction, setFaction] = useState(null);
    const [allFactions, setAllFactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [newFactionName, setNewFactionName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function loadFactionData() {
        setIsLoading(true);
        setError('');
        try {
            const mine = await getMyFaction(playerId);
            setFaction(mine.data);
            if (!mine.data) {
                const list = await getFactions();
                setAllFactions(list.data || []);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadFactionData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleCreate() {
        const cleanName = newFactionName.trim();
        if (!cleanName) return;
        setIsSubmitting(true);
        try {
            await createFaction(playerId, cleanName);
            onNotify?.('Faction created.', 'success');
            setNewFactionName('');
            await loadFactionData();
        } catch (err) {
            onNotify?.(err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleJoin(factionId) {
        setIsSubmitting(true);
        try {
            await joinFaction(playerId, factionId);
            onNotify?.('Joined faction.', 'success');
            await loadFactionData();
        } catch (err) {
            onNotify?.(err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleLeave() {
        setIsSubmitting(true);
        try {
            await leaveFaction(playerId);
            onNotify?.('You left the faction.', 'success');
            await loadFactionData();
        } catch (err) {
            onNotify?.(err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60" onClick={onClose}>
            <div className="card w-full sm:max-w-lg max-h-[88vh] overflow-y-auto p-5 animate-slideup" onClick={event => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-semibold">Faction</h3>
                    <button onClick={onClose} className="text-textMuted hover:text-textPrimary">x</button>
                </div>

                {isLoading && <p className="text-sm text-textMuted py-6 text-center">Loading...</p>}
                {error && <p className="text-sm text-danger mb-3">{error}</p>}

                {!isLoading && faction && (
                    <div className="space-y-3">
                        <div className="card p-3">
                            <p className="font-semibold">{faction.name}</p>
                            <p className="text-xs text-textMuted mt-1">{faction.members?.length || 0} member(s)</p>
                        </div>
                        <div className="space-y-2">
                            {(faction.members || []).map(member => (
                                <div key={member.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-surface">
                                    <span>{member.character_name}</span>
                                    <span className="text-xs text-textMuted">
                                        Lv.{member.player_level}{member.id === faction.leader_player_id ? ' | Leader' : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleLeave} disabled={isSubmitting} className="btn-secondary w-full">
                            {isSubmitting ? 'Leaving...' : 'Leave Faction'}
                        </button>
                    </div>
                )}

                {!isLoading && !faction && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-textMuted mb-2">Create a new faction</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newFactionName}
                                    onChange={event => setNewFactionName(event.target.value)}
                                    placeholder="Faction name"
                                    className="input-field flex-1"
                                    maxLength={50}
                                />
                                <button onClick={handleCreate} disabled={isSubmitting || !newFactionName.trim()} className="btn-primary px-4">
                                    Create
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-textMuted mb-2">Or join an existing faction</p>
                            <div className="space-y-2">
                                {allFactions.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-surface">
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold truncate">{item.name}</p>
                                            <p className="text-xs text-textMuted">{item.member_count} member(s) | Leader: {item.leader_name}</p>
                                        </div>
                                        <button
                                            onClick={() => handleJoin(item.id)}
                                            disabled={isSubmitting}
                                            className="btn-secondary px-3 py-1.5 text-xs flex-shrink-0"
                                        >
                                            Join
                                        </button>
                                    </div>
                                ))}
                                {allFactions.length === 0 && (
                                    <p className="text-sm text-textMuted">No factions yet. Be the first to create one!</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SafeHousePanel({ playerId, character, onBack, onOpenCrafting, onUpdate, onNotify }) {
    const [localCharacter, setLocalCharacter] = useState(character);
    const [activeMode, setActiveMode] = useState('INFO');
    const [isResting, setIsResting] = useState(false);
    const [restSeconds, setRestSeconds] = useState(0);
    const [restError, setRestError] = useState('');

    useEffect(() => {
        setLocalCharacter(character);
    }, [character]);

    useEffect(() => {
        if (!isResting) return undefined;

        const timerId = setInterval(() => {
            setRestSeconds(value => value + 1);
        }, 1000);

        const tickId = setInterval(async () => {
            try {
                const result = await restAtSafeHouse(playerId, 10);
                setLocalCharacter(current => ({
                    ...current,
                    current_energy: result.data.current_energy,
                    max_energy: result.data.max_energy,
                }));
                setRestError('');
                await onUpdate?.();
            } catch (err) {
                setRestError(err.message);
                setIsResting(false);
            }
        }, 10000);

        return () => {
            clearInterval(timerId);
            clearInterval(tickId);
        };
    }, [isResting, playerId, onUpdate]);

    const energyCurrent = parseInt(localCharacter?.current_energy) || 0;
    const energyMax = Math.max(1, parseInt(localCharacter?.max_energy) || 1);
    const isFullyRested = energyCurrent >= energyMax;
    const restMinutes = Math.floor(restSeconds / 60);
    const restClock = `${String(restMinutes).padStart(2, '0')}:${String(restSeconds % 60).padStart(2, '0')}`;

    function handleRestClick() {
        setActiveMode('REST');
        setRestError('');
        setIsResting(value => !value);
    }

    function handleCookingClick() {
        setActiveMode('COOK');
        onNotify?.('Cooking is not wired yet.', 'error');
    }

    function handleCraftClick() {
        setActiveMode('CRAFT');
        onOpenCrafting?.();
    }

    function renderFunctionContent() {
        if (activeMode === 'REST') {
            return (
                <div className="card p-4 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="font-semibold">AFK Rest</p>
                            <p className="text-xs text-textMuted mt-1">Energy recovers every 10 seconds.</p>
                        </div>
                        <span className="text-lg font-mono text-accent">{restClock}</span>
                    </div>
                    <div className="space-y-3">
                        <ResourceMeter label="Energy" current={energyCurrent} max={energyMax} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-surface p-3">
                            <p className="text-textMuted">Home efficiency</p>
                            <p className="font-semibold mt-1">Lv.{SAFE_HOUSE_INFO.level}</p>
                        </div>
                        <div className="rounded-lg bg-surface p-3">
                            <p className="text-textMuted">Bed efficiency</p>
                            <p className="font-semibold mt-1">Bed Lv.{SAFE_HOUSE_INFO.bedLevel}</p>
                        </div>
                    </div>
                    {restError && <p className="text-sm text-danger">{restError}</p>}
                    {isFullyRested && <p className="text-sm text-success">You are fully rested.</p>}
                    <button
                        type="button"
                        onClick={handleRestClick}
                        disabled={isFullyRested && !isResting}
                        className={isResting ? 'btn-secondary w-full' : 'btn-primary w-full'}
                    >
                        {isResting ? 'Stop Resting' : 'Start Resting'}
                    </button>
                </div>
            );
        }

        if (activeMode === 'COOK') {
            return (
                <div className="card p-4">
                    <p className="font-semibold">Cooking</p>
                    <p className="text-sm text-textMuted mt-2">Basic cooking will use the Cooking Fire. This screen is reserved for the next pass.</p>
                </div>
            );
        }

        if (activeMode === 'CRAFT') {
            return (
                <div className="card p-4">
                    <p className="font-semibold">Crafting</p>
                    <p className="text-sm text-textMuted mt-2">The existing crafting sheet is open. Choose a recipe and materials there.</p>
                </div>
            );
        }

        return (
            <div className="card p-4">
                <p className="font-semibold">Safe House Information</p>
                <p className="text-sm text-textMuted mt-2">
                    A basic personal shelter. Higher levels and better beds will improve rest efficiency later.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <button onClick={onBack} className="w-full btn-secondary text-left">
                Back to Refugee Camp
            </button>

            <section className="card p-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated text-cyan mb-2">HOME</span>
                        <h2 className="text-lg font-bold">{SAFE_HOUSE_INFO.name} Lv.{SAFE_HOUSE_INFO.level}</h2>
                        <p className="text-xs text-textMuted mt-1">Condition: {SAFE_HOUSE_INFO.condition}</p>
                    </div>
                    <span className="text-3xl font-bold text-accent/30">HM</span>
                </div>

                <div>
                    <h3 className="text-sm font-semibold mb-2">Workstations</h3>
                    <div className="space-y-2">
                        {SAFE_HOUSE_INFO.workstations.map(station => (
                            <div key={station.id} className="flex items-center justify-between gap-3 rounded-lg bg-surface p-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate">{station.name} Lv.{station.level}</p>
                                    <p className="text-xs text-textMuted mt-1">{station.status}</p>
                                </div>
                                <span className="text-xs font-mono text-accent flex-shrink-0">{station.breaksIn}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold mb-2">House Slots</h3>
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: SAFE_HOUSE_INFO.slots }).map((_, index) => (
                        <div key={index} className="aspect-square rounded-lg border border-dashed border-border bg-surface/40 flex items-center justify-center text-[10px] text-textMuted">
                            Empty
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold mb-2">Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={handleRestClick} className="card card-hover p-3 text-left">
                        <span className="text-[10px] font-bold text-accent block mb-1">RS</span>
                        <span className="text-sm font-semibold block">Rest</span>
                    </button>
                    <button type="button" onClick={handleCookingClick} className="card card-hover p-3 text-left">
                        <span className="text-[10px] font-bold text-accent block mb-1">CK</span>
                        <span className="text-sm font-semibold block">Cook</span>
                    </button>
                    <button type="button" onClick={handleCraftClick} className="card card-hover p-3 text-left">
                        <span className="text-[10px] font-bold text-accent block mb-1">CR</span>
                        <span className="text-sm font-semibold block">Craft</span>
                    </button>
                    <button type="button" onClick={() => setActiveMode('INFO')} className="card card-hover p-3 text-left">
                        <span className="text-[10px] font-bold text-accent block mb-1">IN</span>
                        <span className="text-sm font-semibold block">Home Info</span>
                    </button>
                </div>
            </section>

            {renderFunctionContent()}
        </div>
    );
}

export default function MainPanel({ playerId, character, zones, inventory, onUpdate }) {
    const [showZonePicker, setShowZonePicker] = useState(false);
    const [showCrafting, setShowCrafting] = useState(false);
    const [showFaction, setShowFaction] = useState(false);
    const [showSafeHouse, setShowSafeHouse] = useState(false);
    const [showCurrencyExchange, setShowCurrencyExchange] = useState(false);
    const [showTrading, setShowTrading] = useState(false);
    const [currentExpeditionZone, setCurrentExpeditionZone] = useState(null);
    const [selectedPoi, setSelectedPoi] = useState(null);
    const [activitySheet, setActivitySheet] = useState(null);
    const [executingActivityId, setExecutingActivityId] = useState('');
    const [notification, setNotification] = useState(null);
    const [poiRotationSlot, setPoiRotationSlot] = useState(getPoiRotationSlot);

    useEffect(() => {
        const timerId = setInterval(() => setPoiRotationSlot(getPoiRotationSlot()), 60000);
        return () => clearInterval(timerId);
    }, []);

    function notify(message, type) {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3500);
    }

    async function openPoiActivity(poi, type) {
        setSelectedPoi(null);
        setExecutingActivityId('');
        setActivitySheet({ type, poi, data: null, isLoading: true, error: '' });
        try {
            const result = await getPoiActivities(poi.id, type);
            setActivitySheet({ type, poi, data: result.data, isLoading: false, error: '' });
        } catch (err) {
            setActivitySheet({ type, poi, data: null, isLoading: false, error: err.message });
        }
    }

    async function executeActivity(target, options = {}) {
        if (!activitySheet?.poi || !activitySheet?.type) return;
        const executionId = activitySheet.type === 'sweep' || activitySheet.type === 'dungeon'
            ? `${target.id}:${options.mode || 'normal'}`
            : target.id;
        setExecutingActivityId(executionId);
        setActivitySheet(current => current ? { ...current, error: '' } : current);
        try {
            const result = await executePoiActivity(
                playerId,
                activitySheet.poi.id,
                activitySheet.type,
                target.id,
                options
            );
            const refreshed = await getPoiActivities(activitySheet.poi.id, activitySheet.type);
            setActivitySheet(current => current ? { ...current, data: refreshed.data, error: '' } : current);
            if (!['scavenge', 'gather'].includes(activitySheet.type)) {
                notify(formatActionResult(result.data), 'success');
            }
            await onUpdate?.();
            return result;
        } catch (err) {
            setActivitySheet(current => current ? { ...current, error: err.message } : current);
            notify(err.message, 'error');
            return { success: false, error: err.message };
        } finally {
            setExecutingActivityId('');
        }
    }

    const safeZone = zones.find(zone => zone.zone_type === 'safe') || zones[0];
    const isExploring = Boolean(currentExpeditionZone);
    const isChoosingRoute = showZonePicker && !isExploring;
    const currentZone = currentExpeditionZone || safeZone;
    const banner = isChoosingRoute ? ZONE_BANNERS.urban : (ZONE_BANNERS[currentZone?.zone_type] || ZONE_BANNERS.safe);
    const playerLevel = character?.player_level || 1;
    const expeditionZones = zones
        .filter(zone => zone.zone_type !== 'safe')
        .sort((a, b) => getZoneLevel(a) - getZoneLevel(b) || a.display_name.localeCompare(b.display_name));
    const explorationGroups = EXPLORATION_RINGS.map(ring => ({
        ...ring,
        zones: expeditionZones.filter(zone => {
            const level = getZoneLevel(zone);
            return level >= ring.minLevel && level <= ring.maxLevel;
        }),
    }));
    const currentPois = getRotatingPois(currentExpeditionZone, poiRotationSlot);

    return (
        <div className="h-full overflow-y-auto">
            <PlayerStatusBar character={character} />

            <div className={`relative min-h-48 bg-gradient-to-b ${banner.gradient} flex items-end p-4`}>
                <span className="absolute top-4 right-4 text-3xl font-bold opacity-20">{banner.mark}</span>
                <div>
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated text-cyan mb-2">
                        {isExploring ? 'EXPLORING' : (showSafeHouse ? 'SAFE HOUSE' : (isChoosingRoute ? 'ROUTES' : 'REFUGEE CAMP'))}
                    </span>
                    <h1 className="text-xl font-bold">
                        {isExploring ? currentZone.display_name : (showSafeHouse ? 'Personal Home' : (isChoosingRoute ? 'Exploration Routes' : (character?.character_name || 'Survivor')))}
                    </h1>
                    <p className="text-sm text-textSecondary mt-1">
                        {isExploring
                            ? `Lv.${currentZone.level_gap || currentZone.min_player_lv} | ${getZoneTagLabels(currentZone)} | ${currentPois.length} POIs`
                            : (showSafeHouse
                                ? 'Rest, cook, craft, and manage the first version of your safe shelter.'
                                : (isChoosingRoute
                                ? 'Move outward from the camp edge toward distant high-risk zones.'
                                : 'Manage your base, meet NPCs, then choose an area to explore.'))}
                    </p>
                </div>
            </div>

            {notification && (
                <div className={`mx-4 mt-3 p-2.5 rounded-lg text-sm animate-slideup ${
                    notification.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                }`}>
                    {notification.message}
                </div>
            )}

            {!isExploring && !showZonePicker && !showSafeHouse ? (
                <div className="p-4 space-y-4">
                    <div className="space-y-3">
                        <button onClick={() => setShowZonePicker(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">EX</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Go Exploring</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Choose a level-appropriate area and leave camp.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowSafeHouse(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">HM</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Personal Home</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Rest, cook, craft, and manage your safe house.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowTrading(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">NPC</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Refugee Camp</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Trade with camp merchants and the black market.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowCurrencyExchange(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">EX</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Currency Exchange</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Exchange Money for silver and gold coins.</p>
                            </div>
                        </button>
                        <button onClick={() => setShowFaction(true)} className="w-full card card-hover p-4 text-left flex items-start gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">FC</span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold">Faction</p>
                                <p className="text-xs text-textMuted leading-relaxed mt-1">Create or join a faction, and see who else is in it.</p>
                            </div>
                        </button>
                    </div>

                </div>
            ) : showSafeHouse ? (
                <SafeHousePanel
                    playerId={playerId}
                    character={character}
                    onBack={() => setShowSafeHouse(false)}
                    onOpenCrafting={() => setShowCrafting(true)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            ) : isChoosingRoute ? (
                <div className="p-4 space-y-4">
                    <button
                        onClick={() => setShowZonePicker(false)}
                        className="w-full btn-secondary text-left"
                    >
                        Back to Refugee Camp
                    </button>

                    {explorationGroups.map(group => (
                        <section key={group.id}>
                            <div className="mb-3">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-sm font-semibold">{group.title}</h2>
                                    <span className="text-[10px] text-textMuted">{group.range}</span>
                                </div>
                                <p className="text-xs text-textMuted mt-1">{group.helper}</p>
                            </div>
                            <div className="space-y-2">
                                {group.zones.map(zone => {
                                    const isLocked = isZoneLockedForPlayer(zone, playerLevel);
                                    return (
                                        <button
                                            key={zone.id}
                                            onClick={() => !isLocked && setCurrentExpeditionZone(zone)}
                                            disabled={isLocked}
                                            className={`w-full card p-3 text-left transition-colors ${
                                                isLocked
                                                    ? 'opacity-45 cursor-not-allowed'
                                                    : 'card-hover'
                                            }`}
                                            type="button"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate mb-1">{zone.display_name}</p>
                                                    <p className="text-xs text-textMuted">
                                                        Lv.{zone.level_gap || zone.min_player_lv} | {getZoneTagLabels(zone)} | {zone.pois?.length || 0} POIs
                                                    </p>
                                                    {isLocked && (
                                                        <p className="text-[11px] text-danger mt-1">
                                                            Locked: requires a zone within +10 levels.
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-bold text-accent flex-shrink-0">
                                                    {isLocked ? 'LOCK' : (ZONE_BANNERS[zone.biome || zone.zone_type]?.mark || 'EX')}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                                {group.zones.length === 0 && (
                                    <p className="text-sm text-textMuted">No available areas in this route yet.</p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    <button
                        onClick={() => {
                            setCurrentExpeditionZone(null);
                            setSelectedPoi(null);
                            setShowZonePicker(true);
                        }}
                        className="w-full btn-secondary text-left"
                    >
                        Back to Exploration Routes
                    </button>

                    <div>
                        <h2 className="text-sm font-semibold mb-3">POIs</h2>
                        <div className="space-y-3">
                            {currentPois.map(poi => (
                                <button
                                    key={poi.id}
                                    type="button"
                                    onClick={() => setSelectedPoi(poi)}
                                    className="w-full card card-hover p-4 text-left"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate">{poi.display_name}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {currentPois.length === 0 && (
                                <p className="text-sm text-textMuted">No POIs have been mapped here yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {selectedPoi && (
                <PoiActionSheet
                    poi={selectedPoi}
                    onClose={() => setSelectedPoi(null)}
                    onOpenActivity={openPoiActivity}
                />
            )}

            {activitySheet && (
                <ActivityListSheet
                    activityType={activitySheet.type}
                    activityData={activitySheet.data}
                    character={character}
                    inventory={inventory}
                    isLoading={activitySheet.isLoading}
                    error={activitySheet.error}
                    executingId={executingActivityId}
                    onExecute={executeActivity}
                    onClose={() => setActivitySheet(null)}
                />
            )}

            {showCrafting && (
                <CraftingSheet
                    playerId={playerId}
                    inventory={inventory}
                    onClose={() => setShowCrafting(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            )}

            {showFaction && (
                <FactionSheet
                    playerId={playerId}
                    onClose={() => setShowFaction(false)}
                    onNotify={notify}
                />
            )}

            {showCurrencyExchange && (
                <CurrencyExchangeSheet
                    playerId={playerId}
                    character={character}
                    onClose={() => setShowCurrencyExchange(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            )}
            {showTrading && (
                <TradingSheet
                    playerId={playerId}
                    character={character}
                    inventory={inventory}
                    onClose={() => setShowTrading(false)}
                    onUpdate={onUpdate}
                    onNotify={notify}
                />
            )}

        </div>
    );
}

// frontend/src/components/panels/components.panels.TradingSheet.jsx

import { useEffect, useMemo, useState } from 'react';
import {
    getNpcShop,
    buyNpcShopItem,
    sellItemToNpc,
    getBlackMarketListings,
    listBlackMarketItem,
    buyBlackMarketListing,
    cancelBlackMarketListing,
} from '../../api/api.game';

const MARKET_TABS = [
    { value: 'BUY', label: 'Buy', mark: 'CART' },
    { value: 'MY', label: 'My Market', mark: 'LIST' },
    { value: 'SELL', label: 'Sell', mark: 'TAG' },
];

const CATEGORY_MARKS = {
    FOOD: 'FD',
    MEDICINE: 'MD',
    WEAPON: 'WP',
    EQUIPMENT: 'EQ',
    TOOL: 'TL',
    MATERIAL: 'MT',
    BUILDING: 'BD',
};

const CATEGORY_SELL_MULTIPLIER = {
    WEAPON: 5,
    EQUIPMENT: 4,
    TOOL: 4,
    MEDICINE: 3,
    FOOD: 2,
    MATERIAL: 1,
    BUILDING: 2,
};

function formatMoney(value) {
    return (parseInt(value) || 0).toLocaleString();
}

function getItemMark(item) {
    const category = String(item?.category || '').toUpperCase();
    return CATEGORY_MARKS[category] || 'IT';
}

function getItemLevel(item) {
    return parseInt(item?.item_level) || 1;
}

function getItemDurability(item) {
    const currentValue = Number(item?.current_durability);
    const maxValue = Number(item?.max_durability);
    if (!Number.isFinite(currentValue) || !Number.isFinite(maxValue) || maxValue <= 0) return '-';
    return `${currentValue.toFixed(1)}/${maxValue.toFixed(1)}`;
}

function getItemSubtitle(item) {
    const tags = Array.isArray(item?.tags) ? item.tags : [];
    return tags.slice(0, 2).join(' | ') || item?.category || 'Item';
}

function estimateNpcSellPrice(item) {
    const category = String(item?.category || '').toUpperCase();
    const multiplier = CATEGORY_SELL_MULTIPLIER[category] || 1;
    const quantity = Math.max(1, parseInt(item?.quantity) || 1);
    return Math.max(1, getItemLevel(item) * multiplier * quantity);
}

function MarketTabRail({ activeTab, onChange }) {
    return (
        <nav className="grid grid-cols-3 sm:grid-cols-1 sm:w-24 flex-shrink-0 bg-black/25 border border-border">
            {MARKET_TABS.map(tab => (
                <button
                    key={tab.value}
                    type="button"
                    onClick={() => onChange(tab.value)}
                    className={`relative min-h-16 px-2 py-3 text-center border-border ${
                        activeTab === tab.value
                            ? 'bg-accent/15 text-accent'
                            : 'text-textMuted hover:text-textPrimary hover:bg-white/5'
                    } sm:border-b border-r sm:border-r-0 last:border-r-0 sm:last:border-b-0`}
                >
                    <span className="block text-[10px] font-bold leading-none">{tab.mark}</span>
                    <span className="block text-xs font-semibold mt-2">{tab.label}</span>
                    {activeTab === tab.value && <span className="absolute inset-x-2 bottom-1 h-0.5 bg-accent sm:inset-x-auto sm:inset-y-2 sm:left-1 sm:h-auto sm:w-0.5" />}
                </button>
            ))}
        </nav>
    );
}

function MarketHeader({ title, money, onClose }) {
    return (
        <header className="h-12 flex items-center justify-between gap-3 px-3 bg-black/45 border-b border-border">
            <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl leading-none text-textMuted">&lt;</span>
                <h3 className="font-semibold truncate">{title}</h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <span className="rounded bg-surface px-2 py-1 text-xs font-mono text-accent">{formatMoney(money)}</span>
                <button type="button" onClick={onClose} className="text-2xl leading-none text-textMuted hover:text-textPrimary">x</button>
            </div>
        </header>
    );
}

function MarketRow({ item, price, isSelected, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(item)}
            className={`w-full grid grid-cols-[44px_minmax(0,1fr)_54px_72px_58px] items-center gap-2 px-3 py-2 text-left border-b border-border/70 ${
                isSelected ? 'bg-accent/12' : 'hover:bg-white/5'
            }`}
        >
            <span className="w-9 h-9 bg-black/30 border border-border flex items-center justify-center text-[10px] font-bold text-accent">
                {getItemMark(item)}
            </span>
            <span className="min-w-0">
                <span className="block text-xs font-semibold text-accent truncate">{item.display_name || 'Item'}</span>
                <span className="block text-[10px] text-textMuted truncate">{getItemSubtitle(item)}</span>
            </span>
            <span className="text-xs text-textSecondary">Lv.{getItemLevel(item)}</span>
            <span className="text-[11px] text-textMuted">{getItemDurability(item)}</span>
            <span className="text-xs font-semibold text-right text-textSecondary">{formatMoney(price)}</span>
        </button>
    );
}

function MarketTable({ items, selectedItem, getPrice, onSelect, emptyText }) {
    return (
        <div className="min-h-0 flex-1 border border-border bg-black/20 overflow-hidden">
            <div className="grid grid-cols-[44px_minmax(0,1fr)_54px_72px_58px] gap-2 px-3 py-2 border-b border-border bg-black/25 text-[10px] font-semibold text-textMuted">
                <span />
                <span>Item Name/Type</span>
                <span>Level</span>
                <span>Durability</span>
                <span className="text-right">Price</span>
            </div>
            <div className="max-h-[46vh] sm:max-h-[58vh] overflow-y-auto">
                {items.length === 0 && <p className="text-sm text-textMuted text-center py-10">{emptyText}</p>}
                {items.map(item => (
                    <MarketRow
                        key={item.listing_id || item.id || item.code}
                        item={item}
                        price={getPrice(item)}
                        isSelected={(selectedItem?.listing_id || selectedItem?.id || selectedItem?.code) === (item.listing_id || item.id || item.code)}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}

function SelectedItemPanel({ item, mode, busyKey, listingPrice, onPriceChange, onAction, onNpcSell }) {
    if (!item) {
        return (
            <aside className="border border-border bg-black/20 min-h-44 sm:w-64 flex items-center justify-center text-sm text-textMuted">
                Select an item.
            </aside>
        );
    }

    const isOwnListing = Boolean(item.is_own_listing);
    const actionLabel = mode === 'SELL'
        ? 'List Item'
        : (isOwnListing ? 'Cancel Listing' : `Buy ${formatMoney(item.price_money || item.npc_buy_price)}`);

    return (
        <aside className="border border-border bg-black/20 p-3 sm:w-64 flex-shrink-0">
            <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-black/30 border border-border flex items-center justify-center text-xs font-bold text-accent">
                    {getItemMark(item)}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{item.display_name || 'Item'}</p>
                    <p className="text-xs text-textMuted mt-1">Lv.{getItemLevel(item)} | {String(item.rarity || 'COMMON').toUpperCase()}</p>
                    <p className="text-xs text-textMuted mt-1">{getItemSubtitle(item)}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="bg-surface/70 p-2">
                    <p className="text-textMuted">Fair</p>
                    <p className="font-semibold">{formatMoney(item.fair_price || item.npc_sell_price || item.npc_buy_price || estimateNpcSellPrice(item))}</p>
                </div>
                <div className="bg-surface/70 p-2">
                    <p className="text-textMuted">{mode === 'SELL' ? 'NPC offer' : 'Fee'}</p>
                    <p className="font-semibold">{mode === 'SELL' ? formatMoney(estimateNpcSellPrice(item)) : `${Math.round((item.market_fee_rate || 0) * 100)}%`}</p>
                </div>
            </div>

            {mode === 'SELL' && (
                <input
                    type="number"
                    min="1"
                    value={listingPrice}
                    onChange={event => onPriceChange(event.target.value)}
                    placeholder="Listing price"
                    className="input-field mt-3 text-sm"
                />
            )}

            {mode === 'SELL' && (
                <button
                    type="button"
                    onClick={() => onNpcSell(item)}
                    disabled={Boolean(busyKey)}
                    className="btn-secondary w-full mt-3 text-sm"
                >
                    {busyKey ? 'Working...' : 'Sell to NPC'}
                </button>
            )}

            <button
                type="button"
                onClick={() => onAction(item)}
                disabled={Boolean(busyKey)}
                className="btn-primary w-full mt-3 text-sm"
            >
                {busyKey ? 'Working...' : actionLabel}
            </button>
        </aside>
    );
}

export default function TradingSheet({ playerId, character, inventory, onClose, onUpdate, onNotify }) {
    const [activeTab, setActiveTab] = useState('BUY');
    const [npcShop, setNpcShop] = useState([]);
    const [marketListings, setMarketListings] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [listingPrice, setListingPrice] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [busyKey, setBusyKey] = useState('');
    const [error, setError] = useState('');

    const money = parseInt(character?.money ?? character?.copper ?? 0);
    const sellableItems = useMemo(() => (
        (inventory || []).filter(item => !item.is_equipped && !item.is_expired)
    ), [inventory]);
    const ownListings = marketListings.filter(item => item.is_own_listing);
    const buyRows = [...npcShop, ...marketListings.filter(item => !item.is_own_listing)];
    const rows = activeTab === 'BUY' ? buyRows : (activeTab === 'MY' ? ownListings : sellableItems);

    async function loadTradingData() {
        setIsLoading(true);
        setError('');
        try {
            const [shopResult, marketResult] = await Promise.all([
                getNpcShop(),
                getBlackMarketListings(playerId),
            ]);
            setNpcShop(shopResult.data || []);
            setMarketListings(marketResult.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadTradingData();
    }, [playerId]);

    useEffect(() => {
        setSelectedItem(rows[0] || null);
        setListingPrice('');
    }, [activeTab, npcShop.length, marketListings.length, sellableItems.length]);

    async function runTradeAction(config) {
        setBusyKey(config.busyKey);
        setError('');
        try {
            const result = await config.action();
            onNotify?.(config.successMessage(result), 'success');
            setListingPrice('');
            await Promise.all([loadTradingData(), onUpdate?.()]);
        } catch (err) {
            setError(err.message);
            onNotify?.(err.message, 'error');
        } finally {
            setBusyKey('');
        }
    }

    function getRowPrice(item) {
        if (activeTab === 'SELL') return estimateNpcSellPrice(item);
        return item.price_money || item.npc_buy_price || 0;
    }

    function handleAction(item) {
        if (activeTab === 'SELL') {
            runTradeAction({
                busyKey: `market:list:${item.id}`,
                action: () => listBlackMarketItem(playerId, item.id, listingPrice),
                successMessage: result => `Listed ${result.data.item_name} for ${formatMoney(result.data.price_money)} Money.`,
            });
            return;
        }

        if (item.is_own_listing) {
            runTradeAction({
                busyKey: `market:cancel:${item.listing_id}`,
                action: () => cancelBlackMarketListing(playerId, item.listing_id),
                successMessage: result => `Cancelled ${result.data.item_name}.`,
            });
            return;
        }

        const isNpcItem = Boolean(item.code && !item.listing_id);
        runTradeAction({
            busyKey: isNpcItem ? `npc:buy:${item.code}` : `market:buy:${item.listing_id}`,
            action: () => isNpcItem
                ? buyNpcShopItem(playerId, item.code)
                : buyBlackMarketListing(playerId, item.listing_id),
            successMessage: result => `Bought ${result.data.item_name}.`,
        });
    }

    function handleNpcSell(item) {
        runTradeAction({
            busyKey: `npc:sell:${item.id}`,
            action: () => sellItemToNpc(playerId, item.id),
            successMessage: result => `Sold ${result.data.item_name} for ${formatMoney(result.data.price_money)} Money.`,
        });
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/70 sm:flex sm:items-center sm:justify-center" onClick={onClose}>
            <div className="h-full sm:h-auto sm:max-h-[90vh] w-full sm:max-w-4xl bg-[#121318] border border-border overflow-hidden animate-slideup" onClick={event => event.stopPropagation()}>
                <MarketHeader title="Refugee Camp Trading" money={money} onClose={onClose} />
                <div className="flex flex-col sm:flex-row gap-2 p-2 min-h-0">
                    <MarketTabRail activeTab={activeTab} onChange={setActiveTab} />
                    <main className="min-w-0 flex-1 flex flex-col sm:flex-row gap-2">
                        <section className="min-w-0 flex-1 flex flex-col">
                            {error && <p className="text-sm text-danger mb-2 px-2">{error}</p>}
                            {isLoading ? (
                                <div className="border border-border bg-black/20 py-16 text-center text-sm text-textMuted">Loading market...</div>
                            ) : (
                                <MarketTable
                                    items={rows}
                                    selectedItem={selectedItem}
                                    getPrice={getRowPrice}
                                    onSelect={setSelectedItem}
                                    emptyText={activeTab === 'SELL' ? 'No sellable items.' : 'No listings available.'}
                                />
                            )}
                        </section>
                        <SelectedItemPanel
                            item={selectedItem}
                            mode={activeTab}
                            busyKey={busyKey}
                            listingPrice={listingPrice}
                            onPriceChange={setListingPrice}
                            onAction={handleAction}
                            onNpcSell={handleNpcSell}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

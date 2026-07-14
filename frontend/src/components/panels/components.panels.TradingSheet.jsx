// frontend/src/components/panels/components.panels.TradingSheet.jsx

import { useEffect, useMemo, useState } from 'react';
import {
    getNpcShop,
    buyNpcShopItem,
    sellItemToNpc,
    recycleWasteItems,
    getBlackMarketListings,
    listBlackMarketItem,
    buyBlackMarketListing,
    cancelBlackMarketListing,
} from '../../api/api.game';
import {
    getItemIconPath,
    getItemRarityIconFill,
} from './components.panels.mainPanel.shared';

function formatMoney(value) {
    return (parseInt(value) || 0).toLocaleString();
}

function getItemTitle(item) {
    const level = parseInt(item?.item_level) || 1;
    const rarity = String(item?.rarity || 'COMMON').toUpperCase();
    return `${item?.display_name || item?.name || 'Item'} Lv.${level} ${rarity}`;
}

function getItemTags(item) {
    if (!Array.isArray(item?.tags)) return '';
    return item.tags.slice(0, 4).join(' | ');
}

const SHOP_SELL_RULES = {
    quartermaster: { categories: ['WEAPON', 'EQUIPMENT', 'TOOL'], tags: [] },
    provisioner: { categories: ['FOOD', 'MEDICINE'], tags: [] },
    salvage_yard: { categories: ['MATERIAL', 'BUILDING'], tags: ['Rubbish', 'Junk', 'Recyclable', 'Scrap', 'Broken', 'Plastic', 'Cloth', 'Glass'] },
    hunter_butcher: { categories: ['MATERIAL', 'FOOD'], tags: ['Bone', 'Meat', 'Animal', 'Hide', 'Fat', 'Organic', 'Trophy', 'Rotten', 'Claw', 'Fang'] },
};

const SHOP_DEFINITIONS = [
    {
        key: 'quartermaster',
        name: 'Camp Quartermaster',
        role: 'Weapons, gear, and tools',
    },
    {
        key: 'provisioner',
        name: 'Camp Provisioner',
        role: 'Food and medicine',
    },
    {
        key: 'salvage_yard',
        name: 'Salvage Yard',
        role: 'Resources and waste buyback',
    },
    {
        key: 'hunter_butcher',
        name: 'Hunter Butcher',
        role: 'Meat, bones, and hides',
    },
];

function hasAnyTag(item, tags) {
    const itemTags = Array.isArray(item?.tags) ? item.tags.map(tag => String(tag).toLowerCase()) : [];
    return tags.some(tag => itemTags.includes(String(tag).toLowerCase()));
}

function canShopBuyItem(item, shopKey) {
    const rule = SHOP_SELL_RULES[shopKey];
    if (!rule) return true;

    const category = String(item?.category || item?.template_category || '').toUpperCase();
    return rule.categories.includes(category) || hasAnyTag(item, rule.tags);
}

function TradingItemIcon({ item }) {
    const iconPath = getItemIconPath(item);
    const fillClass = getItemRarityIconFill(item);

    return (
        <span className="w-10 h-10 rounded bg-elevated flex items-center justify-center flex-shrink-0">
            <span
                className={`w-8 h-8 ${fillClass} block`}
                style={{
                    WebkitMask: `url("${iconPath}") center / contain no-repeat`,
                    mask: `url("${iconPath}") center / contain no-repeat`,
                }}
                aria-hidden="true"
            />
        </span>
    );
}

function TradingItemCard({ item, actionLabel, isBusy, onAction, children }) {
    return (
        <div className="card p-3">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    <TradingItemIcon item={item} />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{getItemTitle(item)}</p>
                        <p className="text-[11px] text-textMuted mt-1 truncate">{getItemTags(item)}</p>
                        {children}
                    </div>
                </div>
                {actionLabel && (
                    <button
                        type="button"
                        onClick={onAction}
                        disabled={isBusy}
                        className="btn-primary text-xs px-3 py-2 flex-shrink-0"
                    >
                        {isBusy ? 'Working...' : actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function TradingSheet({ playerId, character, inventory, onClose, onUpdate, onNotify }) {
    const [activeTab, setActiveTab] = useState('NPC');
    const [activeShopKey, setActiveShopKey] = useState('quartermaster');
    const [npcShop, setNpcShop] = useState([]);
    const [marketListings, setMarketListings] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [listingPrice, setListingPrice] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [busyKey, setBusyKey] = useState('');
    const [error, setError] = useState('');

    const money = parseInt(character?.money ?? character?.copper ?? 0);
    const sellableItems = useMemo(() => (
        (inventory || []).filter(item => !item.is_equipped && !item.is_expired)
    ), [inventory]);
    const selectedShop = useMemo(() => (
        SHOP_DEFINITIONS.find(shop => shop.key === activeShopKey) || SHOP_DEFINITIONS[0]
    ), [activeShopKey]);
    const visibleNpcShop = useMemo(() => (
        npcShop.filter(item => !item.vendor_key || item.vendor_key === selectedShop?.key)
    ), [npcShop, selectedShop]);
    const selectedShopSellableItems = useMemo(() => (
        sellableItems.filter(item => canShopBuyItem(item, selectedShop?.key))
    ), [sellableItems, selectedShop]);

    async function loadTradingData() {
        setIsLoading(true);
        setError('');
        try {
            const [shopResult, marketResult] = await Promise.all([
                getNpcShop(playerId),
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

    async function runTradeAction(config) {
        setBusyKey(config.busyKey);
        setError('');
        try {
            const result = await config.action();
            onNotify?.(config.successMessage(result), 'success');
            setSelectedItemId('');
            setListingPrice('');
            await Promise.all([loadTradingData(), onUpdate?.()]);
        } catch (err) {
            setError(err.message);
            onNotify?.(err.message, 'error');
        } finally {
            setBusyKey('');
        }
    }

    function handleCreateListing() {
        if (!selectedItemId || !listingPrice) {
            setError('Choose an item and price first.');
            return;
        }

        runTradeAction({
            busyKey: 'market:list',
            action: () => listBlackMarketItem(playerId, selectedItemId, listingPrice),
            successMessage: result => `Listed ${result.data.item_name} for ${formatMoney(result.data.price_money)} Money.`,
        });
    }

    function handleRecycleWaste() {
        runTradeAction({
            busyKey: 'npc:recycle',
            action: () => recycleWasteItems(playerId),
            successMessage: result => (
                `Processed ${result.data.items_sold} item(s) for ${formatMoney(result.data.price_money)} Money.`
            ),
        });
    }

    function renderNpcShop() {
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    {SHOP_DEFINITIONS.map(shop => (
                        <button
                            key={shop.key}
                            type="button"
                            onClick={() => setActiveShopKey(shop.key)}
                            className={activeShopKey === shop.key ? 'btn-primary text-xs' : 'btn-secondary text-xs'}
                        >
                            {shop.name}
                        </button>
                    ))}
                </div>

                {selectedShop && (
                    <div>
                        <h4 className="text-sm font-semibold">{selectedShop.name}</h4>
                        <p className="text-[11px] text-textMuted mt-1">{selectedShop.role}</p>
                    </div>
                )}

                {activeShopKey === 'salvage_yard' && (
                    <div className="card p-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h4 className="text-sm font-semibold">Waste Processing</h4>
                                <p className="text-[11px] text-textMuted mt-1">
                                    Salvage junk, scrap, recyclable parts, and recipe-free monster trophies.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleRecycleWaste}
                                disabled={busyKey === 'npc:recycle'}
                                className="btn-primary text-xs px-3 py-2 flex-shrink-0"
                            >
                                {busyKey === 'npc:recycle' ? 'Working...' : 'Process All'}
                            </button>
                        </div>
                    </div>
                )}

                <div>
                    <h4 className="text-sm font-semibold mb-2">Shop Stock</h4>
                    <div className="space-y-2">
                        {visibleNpcShop.length === 0 && <p className="text-sm text-textMuted">No stock available.</p>}
                        {visibleNpcShop.map(item => (
                            <TradingItemCard
                                key={`${activeShopKey}:${item.code}`}
                                item={item}
                                actionLabel={`Buy ${formatMoney(item.npc_buy_price)}`}
                                isBusy={busyKey === `npc:buy:${item.code}`}
                                onAction={() => runTradeAction({
                                    busyKey: `npc:buy:${item.code}`,
                                    action: () => buyNpcShopItem(playerId, item.code, activeShopKey),
                                    successMessage: result => `Bought ${result.data.item_name}.`,
                                })}
                            >
                                <p className="text-[11px] text-textMuted mt-1">
                                    Price: {formatMoney(item.npc_buy_price)} Money
                                </p>
                            </TradingItemCard>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold mb-2">Sell Counter</h4>
                    <div className="space-y-2">
                        {selectedShopSellableItems.length === 0 && <p className="text-sm text-textMuted">No matching sellable items.</p>}
                        {selectedShopSellableItems.slice(0, 24).map(item => (
                            <TradingItemCard
                                key={item.id}
                                item={item}
                                actionLabel="Sell"
                                isBusy={busyKey === `npc:sell:${item.id}`}
                                onAction={() => runTradeAction({
                                    busyKey: `npc:sell:${item.id}`,
                                    action: () => sellItemToNpc(playerId, item.id),
                                    successMessage: result => `Sold ${result.data.item_name} for ${formatMoney(result.data.price_money)} Money.`,
                                })}
                            >
                                <p className="text-[11px] text-textMuted mt-1">Qty: {parseInt(item.quantity) || 1}</p>
                            </TradingItemCard>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    function renderBlackMarket() {
        return (
            <div className="space-y-4">
                <div className="card p-3">
                    <h4 className="text-sm font-semibold mb-3">Create Listing</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-2">
                        <select
                            value={selectedItemId}
                            onChange={event => setSelectedItemId(event.target.value)}
                            className="input-field text-sm"
                        >
                            <option value="">Choose item</option>
                            {sellableItems.map(item => (
                                <option key={item.id} value={item.id}>{getItemTitle(item)}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min="1"
                            value={listingPrice}
                            onChange={event => setListingPrice(event.target.value)}
                            placeholder="Price"
                            className="input-field text-sm"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleCreateListing}
                        disabled={busyKey === 'market:list'}
                        className="btn-primary w-full mt-3 text-sm"
                    >
                        {busyKey === 'market:list' ? 'Listing...' : 'List Item'}
                    </button>
                </div>

                <div>
                    <h4 className="text-sm font-semibold mb-2">Black Market</h4>
                    <div className="space-y-2">
                        {marketListings.length === 0 && <p className="text-sm text-textMuted">No active listings.</p>}
                        {marketListings.map(item => {
                            const actionLabel = item.is_own_listing ? 'Cancel' : `Buy ${formatMoney(item.price_money)}`;
                            const busyKeyValue = item.is_own_listing ? `market:cancel:${item.listing_id}` : `market:buy:${item.listing_id}`;
                            return (
                                <TradingItemCard
                                    key={item.listing_id}
                                    item={item}
                                    actionLabel={actionLabel}
                                    isBusy={busyKey === busyKeyValue}
                                    onAction={() => runTradeAction({
                                        busyKey: busyKeyValue,
                                        action: () => item.is_own_listing
                                            ? cancelBlackMarketListing(playerId, item.listing_id)
                                            : buyBlackMarketListing(playerId, item.listing_id),
                                        successMessage: result => item.is_own_listing
                                            ? `Cancelled ${result.data.item_name}.`
                                            : `Bought ${result.data.item_name}.`,
                                    })}
                                >
                                    <p className="text-[11px] text-textMuted mt-1">
                                        Seller: {item.seller_name} | Price: {formatMoney(item.price_money)} Money
                                    </p>
                                    <p className="text-[11px] text-textMuted mt-1">
                                        Fair: {formatMoney(item.fair_price)} | Fee: {Math.round((item.market_fee_rate || 0) * 100)}%
                                    </p>
                                </TradingItemCard>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <button onClick={onClose} className="w-full btn-secondary text-left">
                Back to Refugee Camp
            </button>

            <section className="card p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className="font-semibold">Trading</h3>
                        <p className="text-xs text-textMuted mt-1">Money balance: {money.toLocaleString()}</p>
                    </div>
                    <span className="text-[10px] font-bold text-accent flex-shrink-0">NPC</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab('NPC')}
                        className={activeTab === 'NPC' ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
                    >
                        NPC Shop
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('MARKET')}
                        className={activeTab === 'MARKET' ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
                    >
                        Black Market
                    </button>
                </div>

                {isLoading && <p className="text-sm text-textMuted py-6 text-center">Loading trading data...</p>}
                {error && <p className="text-sm text-danger mb-3">{error}</p>}
                {!isLoading && (activeTab === 'NPC' ? renderNpcShop() : renderBlackMarket())}
            </section>
        </div>
    );
}

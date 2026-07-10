// frontend/src/components/panels/components.panels.MainPanel.CurrencyExchangeSheet.jsx

import { useEffect, useState } from 'react';
import { exchangeCurrency, getCurrencyMarket } from '../../api/api.game';

function formatCurrencyName(value) {
    return String(value || '')
        .split('_')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

export default function CurrencyExchangeSheet({ playerId, character, onClose, onUpdate, onNotify }) {
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

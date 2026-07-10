// frontend/src/components/panels/components.panels.MainPanel.CraftingSheet.jsx

import { useEffect, useState } from 'react';
import { craftItem, getRecipe, getRecipes } from '../../api/api.game';
import {
    ITEM_RARITY_TEXT,
    getItemMark,
    itemMatchesIngredient,
} from './components.panels.mainPanel.shared';

export default function CraftingSheet({ playerId, inventory, onClose, onUpdate, onNotify }) {
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

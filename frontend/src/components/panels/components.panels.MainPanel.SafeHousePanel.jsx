// frontend/src/components/panels/components.panels.MainPanel.SafeHousePanel.jsx

import { useEffect, useState } from 'react';
import { restAtSafeHouse } from '../../api/api.game';
import { SAFE_HOUSE_INFO } from './components.panels.mainPanel.shared';
import { ResourceMeter } from './components.panels.MainPanel.Status';

export default function SafeHousePanel({ playerId, character, onBack, onOpenCrafting, onUpdate, onNotify }) {
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

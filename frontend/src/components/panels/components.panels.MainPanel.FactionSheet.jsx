// frontend/src/components/panels/components.panels.MainPanel.FactionSheet.jsx

import { useEffect, useState } from 'react';
import { createFaction, getFactions, getMyFaction, joinFaction, leaveFaction } from '../../api/api.faction';

export default function FactionSheet({ playerId, onClose, onNotify }) {
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
        <div className="p-4">
            <div className="w-full p-1">
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


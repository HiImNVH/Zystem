// frontend/src/components/panels/ChatPanel.jsx

import { useEffect, useState } from 'react';
import { getChatMessages, getPlayerEvents, markPlayerEventsRead, sendChatMessage } from '../../api/api.game';

const CHANNELS = ['GLOBAL', 'ZONE', 'GUILD', 'NOTI'];

function formatTime(value) {
    if (!value) return '';
    return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPanel({ character, initialChannel = 'GLOBAL' }) {
    const [activeChannel, setActiveChannel] = useState(initialChannel);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const playerId = character?.id;

    async function loadContent(channel = activeChannel) {
        if (!playerId) return;
        setIsLoading(true);
        setError('');
        try {
            if (channel === 'NOTI') {
                const result = await getPlayerEvents(playerId);
                setEvents(result.data || []);
                await markPlayerEventsRead(playerId);
            } else {
                const result = await getChatMessages(channel);
                setMessages(result.data || []);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadContent(activeChannel);
    }, [activeChannel, playerId]);

    useEffect(() => {
        setActiveChannel(initialChannel);
    }, [initialChannel]);

    async function handleSend() {
        const cleanMessage = message.trim();
        if (!cleanMessage || activeChannel === 'NOTI') return;

        setError('');
        try {
            await sendChatMessage(playerId, activeChannel, cleanMessage);
            setMessage('');
            await loadContent(activeChannel);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-1 px-3 py-2 border-b border-border flex-shrink-0">
                {CHANNELS.map(channel => (
                    <button
                        key={channel}
                        onClick={() => setActiveChannel(channel)}
                        className={`tab-pill ${activeChannel === channel ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                    >
                        {channel}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {isLoading && <p className="text-sm text-textMuted text-center py-8">Loading...</p>}
                {error && <p className="text-sm text-danger">{error}</p>}

                {!isLoading && activeChannel === 'NOTI' && events.map(event => (
                    <div key={event.id} className="card p-3">
                        <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-semibold">{event.title}</p>
                            <span className="text-[10px] text-textMuted flex-shrink-0">{formatTime(event.created_at)}</span>
                        </div>
                        <p className="text-xs text-textSecondary mt-1 leading-relaxed">{event.message}</p>
                        <p className="text-[10px] text-textMuted mt-2">{event.source}</p>
                    </div>
                ))}

                {!isLoading && activeChannel !== 'NOTI' && messages.map(chat => (
                    <div key={chat.id} className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-accent">{chat.sender_name}</span>
                            <span className="text-[10px] text-textMuted">{formatTime(chat.created_at)}</span>
                        </div>
                        <p className="text-sm text-textSecondary break-words">{chat.message}</p>
                    </div>
                ))}

                {!isLoading && activeChannel === 'NOTI' && events.length === 0 && (
                    <p className="text-sm text-textMuted text-center py-8">No notifications yet.</p>
                )}
                {!isLoading && activeChannel !== 'NOTI' && messages.length === 0 && (
                    <p className="text-sm text-textMuted text-center py-8">No messages yet.</p>
                )}
            </div>

            <div className="p-3 border-t border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') handleSend();
                        }}
                        placeholder={activeChannel === 'NOTI' ? 'Zystem notifications' : 'Type a message...'}
                        className="input-field flex-1"
                        disabled={activeChannel === 'NOTI'}
                        maxLength={256}
                    />
                    <button className="btn-primary px-4" disabled={activeChannel === 'NOTI' || !message.trim()} onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

// frontend/src/components/panels/ChatPanel.jsx

import { useEffect, useRef, useState } from 'react';
import { getChatMessages, getPlayerEvents, markPlayerEventsRead, sendChatMessage } from '../../api/api.game';
import { connectSocket } from '../../api/api.socket';

const CHANNELS = ['GLOBAL', 'GUILD', 'NOTI'];

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

    // Quan ly cuon: tu dong cuon xuong cuoi khi co noi dung moi, nhung chi khi
    // nguoi choi dang o gan day danh sach — neu ho da luot len xem lai tin cu
    // thi khong cuon giat, thay vao do hien nut "quay ve cuoi"
    const scrollContainerRef = useRef(null);
    const previousChannelRef = useRef(null);
    const isNearBottomRef = useRef(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [hasNewContent, setHasNewContent] = useState(false);

    const NEAR_BOTTOM_THRESHOLD_PX = 80;

    function scrollToBottom(behavior = 'smooth') {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.scrollTo({ top: container.scrollHeight, behavior });
        isNearBottomRef.current = true;
        setShowScrollButton(false);
        setHasNewContent(false);
    }

    function handleScroll() {
        const container = scrollContainerRef.current;
        if (!container) return;
        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        const nearBottom = distanceFromBottom < NEAR_BOTTOM_THRESHOLD_PX;
        isNearBottomRef.current = nearBottom;
        setShowScrollButton(!nearBottom);
        if (nearBottom) setHasNewContent(false);
    }

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

    // Moi khi doi kenh: nhay thang xuong cuoi ngay lap tuc (khong animation).
    // Moi khi co tin nhan/thong bao moi trong cung kenh: neu dang o gan cuoi
    // thi tu dong cuon muot xuong, neu khong thi chi bao co noi dung moi qua nut.
    useEffect(() => {
        const isChannelSwitch = previousChannelRef.current !== activeChannel;
        previousChannelRef.current = activeChannel;

        if (isChannelSwitch) {
            requestAnimationFrame(() => scrollToBottom('auto'));
            return;
        }

        if (isNearBottomRef.current) {
            requestAnimationFrame(() => scrollToBottom('smooth'));
        } else {
            setHasNewContent(true);
        }
    }, [messages, events]);

    // Lang nghe Socket.IO de nhan tin nhan/thong bao ngay lap tuc, khong can
    // cho vong poll cua Dashboard hay tu goi lai API sau khi gui
    useEffect(() => {
        const socket = connectSocket();
        if (!socket) return;

        function handleChatMessage(payload) {
            if (payload.channel !== activeChannel) return;
            setMessages(current => [...current, payload]);
        }

        function handlePlayerEvent(payload) {
            if (activeChannel !== 'NOTI') return;
            setEvents(current => [payload, ...current]);
        }

        socket.on('chat:message', handleChatMessage);
        socket.on('player:event', handlePlayerEvent);

        return () => {
            socket.off('chat:message', handleChatMessage);
            socket.off('player:event', handlePlayerEvent);
        };
    }, [activeChannel]);

    async function handleSend() {
        const cleanMessage = message.trim();
        if (!cleanMessage || activeChannel === 'NOTI') return;

        setError('');
        try {
            // Khong can tu goi lai loadContent: tin nhan vua gui se duoc chinh
            // server phat nguoc lai qua Socket.IO va duoc them vao o tren
            await sendChatMessage(playerId, activeChannel, cleanMessage);
            setMessage('');
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

            <div className="relative flex-1 min-h-0">
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="h-full overflow-y-auto p-3 space-y-3"
                >
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

                {showScrollButton && (
                    <button
                        type="button"
                        onClick={() => scrollToBottom('smooth')}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-black text-xs font-semibold shadow-lg hover:opacity-90 transition"
                    >
                        {hasNewContent ? 'New messages' : 'Back to bottom'}
                        <span aria-hidden="true">↓</span>
                    </button>
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

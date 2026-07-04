// frontend/src/components/panels/ChatPanel.jsx

import { useState } from 'react';

const CHANNELS = ['GLOBAL', 'ZONE', 'GUILD'];

export default function ChatPanel() {
    const [activeChannel, setActiveChannel] = useState('GLOBAL');
    const [message, setMessage] = useState('');

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
                <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-[200px]">
                        <div className="text-3xl mb-3 opacity-20">CHAT</div>
                        <p className="text-sm text-textSecondary mb-1">Chat sẽ mở sau</p>
                        <p className="text-xs text-textMuted leading-relaxed">
                            Hệ thống giao tiếp giữa người chơi chưa được kích hoạt trong bản này.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-3 border-t border-border flex-shrink-0">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="input-field flex-1"
                        disabled
                        maxLength={256}
                    />
                    <button className="btn-primary px-4" disabled>
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}

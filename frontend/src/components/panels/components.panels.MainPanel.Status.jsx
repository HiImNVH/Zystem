// frontend/src/components/panels/components.panels.MainPanel.Status.jsx

import {
    RESOURCE_METER_FILL_CLASSES,
    calculateExpRequiredForLevel,
} from './components.panels.mainPanel.shared';

export function ResourceMeter({ label, current, max }) {
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

export default function PlayerStatusBar({ character }) {
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

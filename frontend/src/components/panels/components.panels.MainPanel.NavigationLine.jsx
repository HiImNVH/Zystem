// frontend/src/components/panels/components.panels.MainPanel.NavigationLine.jsx

export default function NavigationLine({ items }) {
    const visibleItems = (items || []).filter(Boolean);
    if (visibleItems.length === 0) return null;

    return (
        <nav className="border-b border-border bg-panel/70 px-4 py-2 overflow-x-auto" aria-label="Current location">
            <ol className="flex items-center gap-2 text-[11px] whitespace-nowrap">
                {visibleItems.map((item, index) => {
                    const isCurrent = index === visibleItems.length - 1;
                    return (
                        <li key={`${item}-${index}`} className="flex items-center gap-2">
                            {index > 0 && <span className="text-textMuted">/</span>}
                            <span className={isCurrent ? 'text-accent font-semibold' : 'text-textMuted'}>
                                {item}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

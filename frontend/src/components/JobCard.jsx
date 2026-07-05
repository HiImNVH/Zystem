// frontend/src/components/JobCard.jsx

const CATEGORY_LABELS = {
    combat: 'Combat',
    survival: 'Survival',
    production: 'Production',
};

const CATEGORY_COLORS = {
    combat: 'text-danger',
    survival: 'text-accent',
    production: 'text-cyan',
};

const STAT_LABELS = {
    str_per_lv: 'STR',
    agi_per_lv: 'AGI',
    dex_per_lv: 'DEX',
    vit_per_lv: 'VIT',
    int_per_lv: 'INT',
    chr_per_lv: 'CHR',
};

const JOB_DISPLAY = {
    fighting:   { name: 'Fighting',   sub: 'Melee and ranged combat', mark: 'FG' },
    scavenging: { name: 'Scavenging', sub: 'Looting and searching', mark: 'SC' },
    cooking:    { name: 'Cooking',    sub: 'Food and first aid', mark: 'CO' },
    gathering:  { name: 'Gathering',  sub: 'Resource collection', mark: 'GA' },
    crafting:   { name: 'Crafting',   sub: 'Tools and equipment', mark: 'CR' },
    building:   { name: 'Building',   sub: 'Structures and workstations', mark: 'BU' },
};

export default function JobCard({ job, isSelected, onClick }) {
    const display = JOB_DISPLAY[job.code] || { name: job.display_name || job.code, sub: '', mark: job.code?.slice(0, 2).toUpperCase() };

    const statBonuses = Object.entries(STAT_LABELS)
        .filter(([key]) => parseFloat(job[key]) > 0)
        .map(([key, label]) => ({ label, total: parseFloat((job[key] * 20).toFixed(1)) }));

    return (
        <button onClick={onClick}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected ? 'border-accent bg-accent/5' : 'border-border bg-surface hover:border-border/60'
                }`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent">
                        {display.mark}
                    </div>
                    <div>
                        <p className={`text-sm font-semibold ${isSelected ? 'text-accent' : ''}`}>{display.name}</p>
                        <p className="text-xs text-textMuted">{display.sub}</p>
                    </div>
                </div>
                {isSelected && <span className="text-accent text-sm">✓</span>}
            </div>

            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-elevated mb-3 ${CATEGORY_COLORS[job.category] || 'text-textMuted'}`}>
                {CATEGORY_LABELS[job.category] || job.category}
            </span>

            <div className="flex flex-wrap gap-2">
                {statBonuses.map(({ label, total }) => (
                    <span key={label} className="text-xs">
                        <span className="text-textMuted">{label} </span>
                        <span className={isSelected ? 'text-accent font-semibold' : 'font-semibold'}>+{total}</span>
                    </span>
                ))}
            </div>
        </button>
    );
}

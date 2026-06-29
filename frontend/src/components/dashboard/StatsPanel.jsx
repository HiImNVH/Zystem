// frontend/src/components/dashboard/StatsPanel.jsx
// Version: 1.0
// Panel chi so: 6 stat goc + derived stats + nghe dang co

const STAT_INFO = {
    str: { label: 'STR', desc: 'Suc manh', effect: 'ATK · Tai trong · Khai thac' },
    agi: { label: 'AGI', desc: 'Nhanh nhen', effect: 'Ne duong · Giam thoi gian queue' },
    dex: { label: 'DEX', desc: 'Kheo leo', effect: 'Chi mang · Drop hiem' },
    vit: { label: 'VIT', desc: 'Suc song', effect: 'Max HP · Giam nhiem doc' },
    int: { label: 'INT', desc: 'Tri tue', effect: '+EXP nghe · Giam fail craft' },
    chr: { label: 'CHR', desc: 'Suc hut', effect: 'Thue cho den · NPC tro chien' },
};

const JOB_CAT_COLOR = {
    combat:   'text-danger',
    gather:   'text-amber',
    craft:    'text-phosphor',
    advanced: 'text-purple-400',
};

function StatRow({ statKey, total, base, fromJobs, fromTitle }) {
    const info = STAT_INFO[statKey];
    const totalVal = parseFloat(total || 0);

    return (
        <div className="flex items-center gap-2 py-2 border-b border-phosphor border-opacity-10">
            <div className="flex-shrink-0 text-amber" style={{ fontSize: '9px', width: '36px' }}>
                {info.label}
            </div>
            <div className="flex-1">
                <div className="text-phosphor opacity-40" style={{ fontSize: '6px' }}>
                    {info.effect}
                </div>
            </div>
            {/* Breakdown */}
            <div className="flex items-center gap-1 flex-shrink-0" style={{ fontSize: '7px' }}>
                <span className="text-phosphor opacity-40">{parseFloat(base||0).toFixed(1)}</span>
                {parseFloat(fromJobs||0) > 0 && (
                    <span className="text-amber">+{parseFloat(fromJobs).toFixed(1)}</span>
                )}
                {parseFloat(fromTitle||0) > 0 && (
                    <span className="text-purple-400">+{parseFloat(fromTitle).toFixed(1)}</span>
                )}
            </div>
            <div className="flex-shrink-0 text-phosphor glow-text font-bold"
                 style={{ fontSize: '10px', width: '44px', textAlign: 'right' }}>
                {totalVal.toFixed(1)}
            </div>
        </div>
    );
}

export default function StatsPanel({ stats, jobs }) {
    if (!stats) return (
        <div className="p-4 text-phosphor opacity-40" style={{ fontSize: '8px' }}>
            Dang tai chi so...
        </div>
    );

    const derived = stats.derived || {};
    const activeJobs = (jobs || []).filter(j => j.job_level > 0);

    return (
        <div className="h-full overflow-y-auto p-4">
            {/* Title */}
            <div className="text-amber mb-4" style={{ fontSize: '9px' }}>
                // CHI SO NHAN VAT
            </div>

            {/* 6 Primary Stats */}
            <div className="mb-4">
                {Object.keys(STAT_INFO).map(key => (
                    <StatRow
                        key={key}
                        statKey={key}
                        total={stats.total?.[key]}
                        base={stats.base?.[key]}
                        fromJobs={stats.from_jobs?.[key]}
                        fromTitle={stats.from_title?.[key]}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-3 mb-4" style={{ fontSize: '6px' }}>
                <span className="text-phosphor opacity-40">BASE</span>
                <span className="text-amber">+NGHE</span>
                <span className="text-purple-400">+TITLE</span>
            </div>

            {/* Derived Stats */}
            <div className="border border-phosphor border-opacity-20 p-3 mb-4">
                <div className="text-amber mb-2" style={{ fontSize: '8px' }}>CHIEN DICH</div>
                {[
                    ['MAX HP',    stats.derived?.max_hp,           ''],
                    ['NE DUONG',  stats.derived?.dodge_rate_pct,   '%'],
                    ['CHI MANG',  stats.derived?.crit_rate_pct,    '%'],
                ].map(([label, val, unit]) => (
                    <div key={label} className="flex justify-between py-1 border-b border-phosphor border-opacity-10"
                         style={{ fontSize: '8px' }}>
                        <span className="text-phosphor opacity-50">{label}</span>
                        <span className="text-phosphor">{val}{unit}</span>
                    </div>
                ))}
            </div>

            {/* Nghe dang hoc */}
            {activeJobs.length > 0 && (
                <div className="border border-phosphor border-opacity-20 p-3">
                    <div className="text-amber mb-2" style={{ fontSize: '8px' }}>NGHE NGHIEP</div>
                    <div className="space-y-2">
                        {activeJobs.map(job => (
                            <div key={job.id} className="flex items-center justify-between"
                                 style={{ fontSize: '7px' }}>
                                <span className={JOB_CAT_COLOR[job.category] || 'text-phosphor'}>
                                    {job.display_name?.split('(')[0].trim().toUpperCase()}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 border border-phosphor border-opacity-20 overflow-hidden"
                                         style={{ backgroundColor: '#0a0a0a' }}>
                                        <div className="h-full bg-phosphor bg-opacity-60"
                                             style={{ width: `${Math.min(100, (job.job_level / 60) * 100)}%` }} />
                                    </div>
                                    <span className="text-amber">LV {job.job_level}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

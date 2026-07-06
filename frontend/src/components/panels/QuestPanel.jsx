// frontend/src/components/panels/QuestPanel.jsx

import { useState, useEffect } from 'react';
import { getPlayerSkills, getRefundStatus, unlockSkill, refundSkill } from '../../api/api.game';

const JOB_LABELS = {
    fighting: 'Fighting',
    scavenging: 'Scavenging',
    cooking: 'Cooking',
    gathering: 'Gathering',
    crafting: 'Crafting',
    building: 'Building',
};

const BRANCH_LABELS = {
    melee: 'Melee',
    ranged: 'Ranged',
    looter: 'Looter',
    processing: 'Processing',
    foods: 'Foods',
    drinks: 'Drinks',
    spices: 'Spices',
    medicines: 'Medicines',
    foraging: 'Foraging',
    woods: 'Woods',
    minerals: 'Minerals',
    hunting: 'Hunting',
    refining: 'Refining',
    tool: 'Tool',
    weapon: 'Weapon',
    ammo: 'Ammo',
    armor_clothes: 'Armor and clothes',
    furniture: 'Furniture',
    workbench: 'Workbench',
    housing: 'Housing',
};

function getSkillInitials(skillName) {
    return String(skillName || 'SK')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

function SkillNode({ skill, jobLevel, canUnlock, playerId, refundsLeft, onAction, isFirst }) {
    const [isLoading, setIsLoading] = useState(false);
    const isUnlocked = skill.is_unlocked;
    const meetsLevel = jobLevel >= skill.lv_required;
    const isFree = skill.sp_cost === 0;
    const isReady = !isUnlocked && meetsLevel && canUnlock;

    async function handleUnlock() {
        setIsLoading(true);
        try {
            const result = await unlockSkill(playerId, skill.skill_code);
            onAction(result.message, 'success');
        } catch (err) {
            onAction(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRefund() {
        setIsLoading(true);
        try {
            const result = await refundSkill(playerId, skill.skill_code);
            onAction(result.message, 'success');
        } catch (err) {
            onAction(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative flex items-center flex-shrink-0">
            {!isFirst && (
                <div className={`w-8 h-px ${isUnlocked ? 'bg-accent/60' : 'bg-border'}`} />
            )}
            <div className={`w-[118px] min-h-[150px] rounded-lg border p-3 flex flex-col items-center text-center ${
                isUnlocked
                    ? 'border-accent bg-accent/10'
                    : (isReady ? 'border-cyan bg-cyan/10' : 'border-border bg-surface opacity-70')
            }`}>
                <div className={`w-14 h-14 flex items-center justify-center text-xs font-bold mb-2 ${
                    isUnlocked ? 'bg-accent text-base' : (isReady ? 'bg-cyan text-base' : 'bg-elevated text-textMuted')
                }`} style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)' }}>
                    {isUnlocked ? 'OK' : getSkillInitials(skill.skill_name)}
                </div>
                <p className="text-[10px] font-semibold text-textMuted mb-1">Lv.{skill.lv_required}</p>
                <p className="text-xs font-semibold leading-snug min-h-[32px] line-clamp-2">{skill.skill_name}</p>
                {skill.description && (
                    <p className="text-[10px] text-textMuted leading-snug mt-1 line-clamp-2">{skill.description}</p>
                )}
                <div className="mt-auto pt-3 w-full">
                    {isUnlocked && !isFree && (
                        <button onClick={handleRefund} disabled={isLoading || refundsLeft <= 0} className="btn-ghost text-[10px] w-full py-1.5">
                            {isLoading ? '...' : 'Refund'}
                        </button>
                    )}
                    {!isUnlocked && meetsLevel && canUnlock && (
                        <button
                            onClick={handleUnlock}
                            disabled={isLoading}
                            className={`${isFree ? 'btn-secondary' : 'btn-primary'} text-[10px] w-full py-1.5`}
                        >
                            {isLoading ? '...' : (isFree ? 'Free' : `${skill.sp_cost} SP`)}
                        </button>
                    )}
                    {!isUnlocked && (!meetsLevel || !canUnlock) && (
                        <span className="block text-[10px] text-textMuted py-1.5">
                            {!meetsLevel ? `Need Lv.${skill.lv_required}` : 'Prereq'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function QuestPanel({ playerId, jobs, skillPoints }) {
    const [skills, setSkills] = useState([]);
    const [refundStatus, setRefundStatus] = useState(null);
    const [selectedJobCode, setSelectedJobCode] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const unlockedJobs = (jobs || []).filter(job => job.job_level > 0);

    useEffect(() => {
        if (unlockedJobs.length > 0 && !selectedJobCode) {
            setSelectedJobCode(unlockedJobs[0].code);
        }
    }, [jobs, selectedJobCode, unlockedJobs]);

    async function loadSkills() {
        if (!playerId) return;
        setIsLoading(true);
        try {
            const [skillResult, refundResult] = await Promise.allSettled([
                getPlayerSkills(playerId),
                getRefundStatus(playerId)
            ]);
            if (skillResult.status === 'fulfilled') setSkills(skillResult.value.data);
            if (refundResult.status === 'fulfilled') setRefundStatus(refundResult.value.data);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { loadSkills(); }, [playerId]);

    function handleAction(message, type) {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3500);
        loadSkills();
    }

    function canUnlock(skill) {
        if (!skill.prerequisite_skill_code) return true;
        const prerequisite = skills.find(item => item.skill_code === skill.prerequisite_skill_code);
        return prerequisite?.is_unlocked === true;
    }

    const currentJob = (jobs || []).find(job => job.code === selectedJobCode);
    const jobSkills = skills.filter(skill => skill.job_code === selectedJobCode);
    const branchOrder = [...new Set(jobSkills.map(skill => skill.branch || 'general'))];
    const hasAnyJobLeveled = (jobs || []).some(job => job.job_level > 0);

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-sm font-semibold">Skill Tree</h2>
                        {currentJob && (
                            <p className="text-xs text-textMuted mt-0.5">
                                {JOB_LABELS[currentJob.code] || currentJob.display_name || currentJob.code} Lv.{currentJob.job_level}
                            </p>
                        )}
                    </div>
                    <div className="text-right">
                        <span className="block text-xs font-mono text-accent">{skillPoints} SP</span>
                        <span className="block text-[10px] text-textMuted">{refundStatus?.remaining_today ?? 0} refunds</span>
                    </div>
                </div>
                {unlockedJobs.length > 0 && (
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {unlockedJobs.map(job => (
                            <button
                                key={job.code}
                                onClick={() => setSelectedJobCode(job.code)}
                                className={`tab-pill flex-shrink-0 ${selectedJobCode === job.code ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                            >
                                {JOB_LABELS[job.code] || job.display_name || job.code}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {notification && (
                <div className={`mx-4 mt-3 p-2.5 rounded-lg text-sm animate-slideup flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                }`}>
                    {notification.message}
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                    <p className="text-sm text-textMuted">Loading...</p>
                ) : unlockedJobs.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-[240px]">
                            <div className="text-3xl mb-3 opacity-20">SP</div>
                            <p className="text-sm text-textSecondary mb-1">
                                {hasAnyJobLeveled ? 'No skill tree yet' : 'No skills unlocked'}
                            </p>
                            <p className="text-xs text-textMuted">
                                Complete AFK actions to level up and unlock skill branches.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {branchOrder.map(branch => {
                            const branchSkills = jobSkills
                                .filter(skill => (skill.branch || 'general') === branch)
                                .sort((a, b) => a.lv_required - b.lv_required || a.tier - b.tier || a.skill_name.localeCompare(b.skill_name));
                            if (!branchSkills.length) return null;
                            const unlockedCount = branchSkills.filter(skill => skill.is_unlocked).length;
                            return (
                                <div key={branch} className="card p-3 overflow-hidden">
                                    <div className="flex items-center justify-between gap-3 mb-3">
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold truncate">{BRANCH_LABELS[branch] || branch}</p>
                                            <p className="text-[10px] text-textMuted">{unlockedCount}/{branchSkills.length} unlocked</p>
                                        </div>
                                        <span className="text-[10px] font-semibold text-accent bg-elevated rounded px-2 py-1">
                                            Lv.{branchSkills[0]?.lv_required}-{branchSkills[branchSkills.length - 1]?.lv_required}
                                        </span>
                                    </div>

                                    <div className="overflow-x-auto pb-2">
                                        <div className="flex items-stretch min-w-max pr-2">
                                            {branchSkills.map((skill, index) => (
                                                <SkillNode
                                                    key={skill.skill_code}
                                                    skill={skill}
                                                    jobLevel={currentJob?.job_level || 0}
                                                    canUnlock={canUnlock(skill)}
                                                    playerId={playerId}
                                                    refundsLeft={refundStatus?.remaining_today ?? 0}
                                                    onAction={handleAction}
                                                    isFirst={index === 0}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

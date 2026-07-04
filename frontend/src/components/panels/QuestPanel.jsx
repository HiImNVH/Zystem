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

function SkillRow({ skill, jobLevel, canUnlock, playerId, refundsLeft, onAction }) {
    const [isLoading, setIsLoading] = useState(false);
    const isUnlocked = skill.is_unlocked;
    const meetsLevel = jobLevel >= skill.lv_required;
    const isFree = skill.sp_cost === 0;

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
        <div className={`card p-3 flex items-center gap-3 ${!meetsLevel ? 'opacity-40' : ''}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[9px] font-mono flex-shrink-0 ${
                isUnlocked ? 'bg-accent/15 text-accent' : 'bg-elevated text-textMuted'
            }`}>
                {isUnlocked ? '✓' : `Lv${skill.lv_required}`}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{skill.skill_name}</p>
                {skill.description && <p className="text-xs text-textMuted truncate">{skill.description}</p>}
            </div>
            <div className="flex-shrink-0">
                {isUnlocked && !isFree && (
                    <button onClick={handleRefund} disabled={isLoading || refundsLeft <= 0} className="btn-ghost text-xs">
                        {isLoading ? '...' : 'Thu hồi'}
                    </button>
                )}
                {!isUnlocked && !isFree && meetsLevel && canUnlock && (
                    <button onClick={handleUnlock} disabled={isLoading} className="btn-primary text-xs py-1.5 px-3">
                        {isLoading ? '...' : `${skill.sp_cost} SP`}
                    </button>
                )}
                {!isUnlocked && isFree && meetsLevel && canUnlock && (
                    <button onClick={handleUnlock} disabled={isLoading} className="btn-secondary text-xs py-1.5 px-3">
                        {isLoading ? '...' : 'Miễn phí'}
                    </button>
                )}
                {!isUnlocked && (!meetsLevel || !canUnlock) && (
                    <span className="text-xs text-textMuted">Khóa</span>
                )}
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
                    <h2 className="text-sm font-semibold">Cây kỹ năng</h2>
                    <span className="text-xs font-mono text-accent">{skillPoints} SP</span>
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
                    <p className="text-sm text-textMuted">Đang tải...</p>
                ) : unlockedJobs.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-[240px]">
                            <div className="text-3xl mb-3 opacity-20">SP</div>
                            <p className="text-sm text-textSecondary mb-1">
                                {hasAnyJobLeveled ? 'Chưa có cây kỹ năng' : 'Chưa mở kỹ năng'}
                            </p>
                            <p className="text-xs text-textMuted">
                                Hoàn thành hành động AFK để tăng cấp và mở nhánh kỹ năng.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {branchOrder.map(branch => {
                            const branchSkills = jobSkills.filter(skill => (skill.branch || 'general') === branch);
                            if (!branchSkills.length) return null;
                            return (
                                <div key={branch}>
                                    <p className="text-xs font-semibold text-textMuted mb-2">
                                        {(BRANCH_LABELS[branch] || branch).toUpperCase()}
                                    </p>
                                    <div className="space-y-2">
                                        {branchSkills.map(skill => (
                                            <SkillRow
                                                key={skill.skill_code}
                                                skill={skill}
                                                jobLevel={currentJob?.job_level || 0}
                                                canUnlock={canUnlock(skill)}
                                                playerId={playerId}
                                                refundsLeft={refundStatus?.remaining_today ?? 0}
                                                onAction={handleAction}
                                            />
                                        ))}
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

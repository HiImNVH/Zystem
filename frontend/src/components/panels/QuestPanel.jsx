// frontend/src/components/panels/QuestPanel.jsx

import { useState, useEffect, useRef } from 'react';
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

const JOB_ORDER = ['fighting', 'scavenging', 'cooking', 'gathering', 'crafting', 'building'];
const SKILL_LEVEL_GAPS = [1, 5, 10, 15, 20, 25, 30, 35, 40];

function SkillNode({ skill, jobLevel, canUnlock, isFirst, showLevel = true, isSelected, onSelect }) {
    const isUnlocked = skill.is_unlocked;
    const meetsLevel = jobLevel >= skill.lv_required;
    const isFree = skill.sp_cost === 0;
    const isReady = !isUnlocked && meetsLevel && canUnlock;

    return (
        <div className="relative flex items-center flex-shrink-0">
            {!isFirst && (
                <div className={`w-8 h-px ${isUnlocked ? 'bg-accent/60' : 'bg-border'}`} />
            )}
            <button
                onClick={event => {
                    event.stopPropagation();
                    onSelect(skill, event.currentTarget.getBoundingClientRect());
                }}
                className={`w-[118px] min-h-[96px] px-2 py-1 flex flex-col items-center text-center transition-opacity ${
                    isUnlocked || isReady ? '' : 'opacity-75'
                } ${isSelected ? 'text-cyan' : ''}`}
                type="button"
            >
                <div className={`relative w-16 h-16 flex items-center justify-center text-xs font-bold ${
                    isUnlocked ? 'bg-accent text-base' : (isReady ? 'bg-cyan text-base' : 'bg-elevated text-textPrimary')
                } ${isSelected ? 'ring-2 ring-cyan ring-offset-2 ring-offset-base' : ''}`} style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)' }}>
                    <span>{isFree ? 'AUTO' : (isUnlocked ? 'OK' : getSkillInitials(skill.skill_name))}</span>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-base/80">
                        {isFree ? 'AUTO' : (isUnlocked ? 'OK' : `${skill.sp_cost}SP`)}
                    </span>
                </div>
                {showLevel && <p className="text-[10px] font-semibold text-textMuted mb-1">Lv.{skill.lv_required}</p>}
                <p className="mt-2 text-xs font-semibold leading-snug min-h-[42px] max-w-[96px] whitespace-normal break-words text-textPrimary">
                    {skill.skill_name}
                </p>
            </button>
        </div>
    );
}

function SkillDetailCard({ skill, jobLevel, canUnlock, hasUnlockedChild, playerId, refundsLeft, onAction, onClose, position }) {
    const [isLoading, setIsLoading] = useState(false);
    if (!skill) return null;

    const isUnlocked = skill.is_unlocked;
    const isFree = skill.sp_cost === 0;
    const meetsLevel = jobLevel >= skill.lv_required;
    const canLearn = !isFree && !isUnlocked && meetsLevel && canUnlock;
    const canForget = isUnlocked && !isFree && !hasUnlockedChild && refundsLeft > 0;
    const lockedReason = !meetsLevel ? `Need Lv.${skill.lv_required}` : (!canUnlock ? 'Prerequisite required' : '');

    async function handleUnlock() {
        setIsLoading(true);
        try {
            const result = await unlockSkill(playerId, skill.skill_code);
            onAction(result.message, 'success');
            onClose();
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
            onClose();
        } catch (err) {
            onAction(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className="card p-4 animate-slideup absolute z-30 max-h-[46vh] overflow-y-auto shadow-xl pointer-events-auto"
            style={{
                top: position?.top || 120,
                left: position?.left || 16,
                width: position?.width || 320,
            }}
            onClick={event => event.stopPropagation()}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                    <p className="font-semibold">{skill.skill_name}</p>
                    <p className="text-xs text-textMuted mt-1">
                        Lv.{skill.lv_required} | {isFree ? 'AUTO' : `${skill.sp_cost} SP`} | {isUnlocked ? 'Learned' : 'Not learned'}
                    </p>
                </div>
                <button onClick={onClose} className="text-xs text-textMuted hover:text-textPrimary" type="button">Close</button>
            </div>

            <p className="text-xs text-textSecondary leading-relaxed mb-4">
                {skill.description || 'No description available.'}
            </p>

            {isFree && (
                <p className="text-xs text-accent">This node is learned automatically when the skill reaches the required level.</p>
            )}
            {!isFree && !isUnlocked && canLearn && (
                <button onClick={handleUnlock} disabled={isLoading} className="btn-primary w-full text-sm">
                    {isLoading ? 'Learning...' : `Learn for ${skill.sp_cost} SP`}
                </button>
            )}
            {!isFree && !isUnlocked && !canLearn && (
                <p className="text-xs text-textMuted">{lockedReason || 'This node cannot be learned yet.'}</p>
            )}
            {isUnlocked && !isFree && canForget && (
                <button onClick={handleRefund} disabled={isLoading} className="btn-ghost w-full text-sm">
                    {isLoading ? 'Forgetting...' : 'Forget'}
                </button>
            )}
            {isUnlocked && !isFree && hasUnlockedChild && (
                <p className="text-xs text-textMuted">Cannot forget while another learned node depends on this one.</p>
            )}
            {isUnlocked && !isFree && !hasUnlockedChild && refundsLeft <= 0 && (
                <p className="text-xs text-textMuted">No refunds left today.</p>
            )}
        </div>
    );
}

function JobSkillCard({ job, isSelected, onClick }) {
    const name = JOB_LABELS[job.code] || job.display_name || job.code;
    return (
        <button
            onClick={onClick}
            className={`w-full card card-hover p-4 text-left ${isSelected ? 'border-accent bg-accent/5' : ''}`}
            type="button"
        >
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
                    {job.code?.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{name}</p>
                    <p className="text-xs text-textMuted mt-0.5">Lv.{job.job_level || 1} | {job.category}</p>
                </div>
                <span className="text-xs text-textMuted">Open</span>
            </div>
        </button>
    );
}

function BranchCard({ branch, skills, onClick }) {
    const unlockedCount = skills.filter(skill => skill.is_unlocked).length;
    const levels = [...new Set(skills.map(skill => skill.lv_required))].sort((a, b) => a - b);

    return (
        <button onClick={onClick} className="w-full card card-hover p-4 text-left" type="button">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="font-semibold truncate">{BRANCH_LABELS[branch] || branch}</p>
                    <p className="text-xs text-textMuted mt-1">{unlockedCount}/{skills.length} learned</p>
                </div>
                <span className="text-[10px] font-semibold text-accent bg-elevated rounded px-2 py-1 flex-shrink-0">
                    Lv.{levels[0]}-{levels[levels.length - 1]}
                </span>
            </div>
        </button>
    );
}

export default function QuestPanel({ playerId, jobs, skillPoints }) {
    const [skills, setSkills] = useState([]);
    const [refundStatus, setRefundStatus] = useState(null);
    const [selectedJobCode, setSelectedJobCode] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedSkillCode, setSelectedSkillCode] = useState(null);
    const [skillPopoverPosition, setSkillPopoverPosition] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const skillTreeRef = useRef(null);

    useEffect(() => {
        if (selectedJobCode && !(jobs || []).some(job => job.code === selectedJobCode)) {
            setSelectedJobCode(null);
            setSelectedBranch(null);
            setSelectedSkillCode(null);
            setSkillPopoverPosition(null);
        }
    }, [jobs, selectedJobCode]);

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

    function openSkillPopover(skill, rect) {
        const bounds = skillTreeRef.current?.getBoundingClientRect();
        const width = Math.min(320, (bounds?.width || window.innerWidth) - 24);
        const relativeLeft = bounds ? rect.left - bounds.left : rect.left;
        const relativeTop = bounds ? rect.top - bounds.top : rect.top;
        const left = Math.max(12, Math.min(relativeLeft + (rect.width / 2) - (width / 2), (bounds?.width || window.innerWidth) - width - 12));
        const top = relativeTop + rect.height + 8;
        setSelectedSkillCode(skill.skill_code);
        setSkillPopoverPosition({ top, left, width });
    }

    function closeSkillPopover() {
        setSelectedSkillCode(null);
        setSkillPopoverPosition(null);
    }

    function canUnlock(skill) {
        if (!skill.prerequisite_skill_code) return true;
        const prerequisite = skills.find(item => item.skill_code === skill.prerequisite_skill_code);
        return prerequisite?.is_unlocked === true;
    }

    const allJobs = [...(jobs || [])].sort((a, b) => {
        const aIndex = JOB_ORDER.indexOf(a.code);
        const bIndex = JOB_ORDER.indexOf(b.code);
        return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });
    const currentJob = allJobs.find(job => job.code === selectedJobCode);
    const jobSkills = skills.filter(skill => skill.job_code === selectedJobCode);
    const branchOrder = [...new Set(jobSkills.map(skill => skill.branch || 'general'))].sort((a, b) => {
        return (BRANCH_LABELS[a] || a).localeCompare(BRANCH_LABELS[b] || b);
    });
    const currentBranchSkills = jobSkills
        .filter(skill => (skill.branch || 'general') === selectedBranch)
        .sort((a, b) => a.lv_required - b.lv_required || a.tier - b.tier || a.skill_name.localeCompare(b.skill_name));
    const usedBranchLevels = [...new Set(currentBranchSkills.map(skill => skill.lv_required))].sort((a, b) => a - b);
    const firstBranchLevel = usedBranchLevels[0] || 1;
    const lastBranchLevel = usedBranchLevels[usedBranchLevels.length - 1] || 40;
    const levelColumns = SKILL_LEVEL_GAPS
        .filter(level => level >= firstBranchLevel && level <= lastBranchLevel)
        .map(level => ({
            level,
            skills: currentBranchSkills.filter(skill => skill.lv_required === level),
        }));
    const selectedSkill = currentBranchSkills.find(skill => skill.skill_code === selectedSkillCode) || null;
    const selectedSkillHasUnlockedChild = selectedSkill
        ? currentBranchSkills.some(skill => skill.prerequisite_skill_code === selectedSkill.skill_code && skill.is_unlocked)
        : false;
    const viewTitle = selectedBranch
        ? (BRANCH_LABELS[selectedBranch] || selectedBranch)
        : (currentJob ? (JOB_LABELS[currentJob.code] || currentJob.display_name || currentJob.code) : 'Skills');

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        {(selectedJobCode || selectedBranch) && (
                            <button
                                onClick={() => {
                                    if (selectedBranch) {
                                        setSelectedBranch(null);
                                        setSelectedSkillCode(null);
                                        setSkillPopoverPosition(null);
                                    } else {
                                        setSelectedJobCode(null);
                                        setSelectedSkillCode(null);
                                        setSkillPopoverPosition(null);
                                    }
                                }}
                                className="text-xs text-textMuted hover:text-textPrimary mb-1"
                                type="button"
                            >
                                Back
                            </button>
                        )}
                        <h2 className="text-sm font-semibold">{viewTitle}</h2>
                        <p className="text-xs text-textMuted mt-0.5">
                            {selectedBranch
                                ? `${JOB_LABELS[currentJob?.code] || currentJob?.display_name || currentJob?.code} Lv.${currentJob?.job_level || 1}`
                                : (currentJob ? 'Choose a branch' : 'Choose a skill')}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs font-mono text-accent">{skillPoints} SP</span>
                        <span className="block text-[10px] text-textMuted">{refundStatus?.remaining_today ?? 0} refunds</span>
                    </div>
                </div>
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
                ) : allJobs.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-[240px]">
                            <div className="text-3xl mb-3 opacity-20">SP</div>
                            <p className="text-sm text-textSecondary mb-1">No skills available</p>
                            <p className="text-xs text-textMuted">The skill catalog has not loaded yet.</p>
                        </div>
                    </div>
                ) : !selectedJobCode ? (
                    <div className="space-y-2">
                        {allJobs.map(job => (
                            <JobSkillCard
                                key={job.code}
                                job={job}
                                isSelected={selectedJobCode === job.code}
                                onClick={() => {
                                    setSelectedJobCode(job.code);
                                    setSelectedBranch(null);
                                    setSelectedSkillCode(null);
                                    setSkillPopoverPosition(null);
                                }}
                            />
                        ))}
                    </div>
                ) : !selectedBranch ? (
                    <div className="space-y-2">
                        {branchOrder.map(branch => {
                            const branchSkills = jobSkills
                                .filter(skill => (skill.branch || 'general') === branch)
                                .sort((a, b) => a.lv_required - b.lv_required || a.tier - b.tier || a.skill_name.localeCompare(b.skill_name));
                            return (
                                <BranchCard
                                    key={branch}
                                    branch={branch}
                                    skills={branchSkills}
                                    onClick={() => {
                                        setSelectedBranch(branch);
                                        setSelectedSkillCode(null);
                                        setSkillPopoverPosition(null);
                                    }}
                                />
                            );
                        })}
                        {branchOrder.length === 0 && (
                            <p className="text-sm text-textMuted">No branches available for this skill.</p>
                        )}
                    </div>
                ) : (
                    <div
                        className="card p-3 overflow-visible relative z-30"
                        onClick={closeSkillPopover}
                        ref={skillTreeRef}
                    >
                        <div className="overflow-x-auto pb-2" onClick={closeSkillPopover}>
                            <div className="flex items-start min-w-max pr-2">
                                {levelColumns.map((group, groupIndex) => (
                                    <div key={group.level} className="flex items-stretch">
                                        {groupIndex > 0 && <div className="w-8 h-px bg-border mt-[84px]" />}
                                        <div className="w-[132px] flex-shrink-0">
                                            <div className="h-8 flex items-center justify-center border-b border-border mb-3">
                                                <span className="text-xs font-semibold text-accent">Lv.{group.level}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {group.skills.length === 0 ? (
                                                    <div className="w-[118px] min-h-[96px] flex items-start justify-center pt-8">
                                                        <span className="block w-full h-px bg-border/80" />
                                                    </div>
                                                ) : group.skills.map((skill, index) => (
                                                    <SkillNode
                                                        key={skill.skill_code}
                                                        skill={skill}
                                                        jobLevel={currentJob?.job_level || 0}
                                                        canUnlock={canUnlock(skill)}
                                                        isFirst={true}
                                                        showLevel={false}
                                                        isSelected={selectedSkillCode === skill.skill_code}
                                                        onSelect={openSkillPopover}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {levelColumns.length === 0 && (
                            <p className="text-sm text-textMuted">No skill nodes available.</p>
                        )}
                        {selectedSkill && (
                            <div className="absolute inset-0 z-20 pointer-events-none">
                        <SkillDetailCard
                            skill={selectedSkill}
                            jobLevel={currentJob?.job_level || 0}
                            canUnlock={selectedSkill ? canUnlock(selectedSkill) : false}
                            hasUnlockedChild={selectedSkillHasUnlockedChild}
                            playerId={playerId}
                            refundsLeft={refundStatus?.remaining_today ?? 0}
                            onAction={handleAction}
                            onClose={closeSkillPopover}
                            position={skillPopoverPosition}
                        />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selectedSkill && (
                <div className="fixed inset-0 z-20" onClick={closeSkillPopover} />
            )}
        </div>
    );
}

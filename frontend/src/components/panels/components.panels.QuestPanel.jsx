// frontend/src/components/panels/components.panels.QuestPanel.jsx

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
const ROMAN_CHAIN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const SKILL_NODE_ROW_HEIGHT = 124;
const SHEET_ROW_GROUPS = {
    'fighting|melee': [
        ['brawler'], ['one_handed'], ['two_handed'], ['stab'], ['swing'], ['slash'],
    ],
    'fighting|ranged': [
        ['shooter'], ['bow_and_crossbow'], ['gun'], ['bullseye'],
    ],
    'scavenging|looter': [
        ['carrier'], ['treasure_hunter'], ['quick_hand'],
    ],
    'cooking|processing': [
        ['grinding', 'drying', 'charring', 'smoking'],
    ],
    'cooking|foods': [
        ['grilling'],
        ['frying'],
        ['boiling'],
        ['steaming'],
        ['noodle', 'bread', 'burger', 'sandwich', 'pizza', 'cake', 'ramen'],
        ['canned_food'],
    ],
    'cooking|drinks': [
        ['contaminated_water', 'warter', 'mineral_water'],
        ['juice', 'smoothie'],
        ['coffe'],
        ['alcohol'],
    ],
    'cooking|spices': [
        ['salt', 'sugar', 'vinegar', 'soysauce'],
        ['yeast', 'butter', 'cheese'],
        ['fat', 'veg_oil'],
    ],
    'cooking|medicines': [
        ['medicine'],
        ['booster'],
        ['bandage', 'first_aid_kit'],
    ],
    'gathering|foraging': [
        ['seed'], ['foraging'],
    ],
    'gathering|woods': [
        ['wood'],
    ],
    'gathering|minerals': [
        ['rock', 'amethys'],
        ['ore'],
        ['chemical_minerals'],
    ],
    'gathering|hunting': [
        ['meat', 'bone'],
        ['leather'],
    ],
    'crafting|refining': [
        ['smelting_i'],
        ['salvage_processing'],
        ['smelting_ii'],
    ],
    'crafting|tool': [
        ['tool'],
        ['cooking_tool'],
        ['building_tool'],
    ],
    'crafting|weapon': [
        ['stone_weapon', 'bone_weapon', 'metal_weapon'],
        ['bow', 'crossbow', 'inproved_bow', 'improved_crossbow'],
        ['gun'],
    ],
    'crafting|ammo': [
        ['arrow'],
        ['gunpowder', 'ammo'],
    ],
    'crafting|armor_and_clothes': [
        ['armor'],
        ['cooking_clothes'],
        ['building_clothes'],
        ['gathering_clothes'],
        ['scaving_clothes'],
        ['crafting_clothes'],
        ['backpack'],
    ],
    'building|funiture': [
        ['tent', 'bed'],
        ['container'],
        ['funiture_set'],
    ],
    'building|workbench': [
        ['campfire', 'kitchen'],
        ['workstation'],
        ['medical_lab'],
        ['smelter'],
    ],
    'building|housing': [
        ['wooden_structure', 'stone_structure'],
        ['wooden_fence', 'stone_fence'],
    ],
};

function normalizeSkillChainName(name) {
    return String(name || '')
        .replace(/\s+(I|II|III|IV|V|VI)$/i, '')
        .trim()
        .toLowerCase();
}

function normalizeSheetKey(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function getSheetRowKey(skill) {
    const branchKey = `${skill.job_code}|${skill.branch || 'general'}`;
    const baseName = normalizeSheetKey(normalizeSkillChainName(skill.skill_name).split(':')[0]);
    const rowGroups = SHEET_ROW_GROUPS[branchKey] || [];
    const rowIndex = rowGroups.findIndex(group => group.includes(baseName));

    return rowIndex >= 0 ? `${branchKey}|row_${rowIndex}` : `${branchKey}|${baseName}`;
}

function getSheetRowOrder(rowKey) {
    const match = String(rowKey || '').match(/\|row_(\d+)$/);
    return match ? parseInt(match[1]) : null;
}

function inferPrerequisiteSkill(skill, branchSkills) {
    if (skill.prerequisite_skill_code) {
        return branchSkills.find(item => item.skill_code === skill.prerequisite_skill_code) || null;
    }

    return inferRomanChainPrerequisiteSkill(skill, branchSkills);
}

function inferRomanChainPrerequisiteSkill(skill, branchSkills) {
    const match = String(skill.skill_name || '').match(/\s+(I|II|III|IV|V|VI)$/i);
    if (!match) return null;

    const currentIndex = ROMAN_CHAIN.indexOf(match[1].toUpperCase());
    if (currentIndex <= 0) return null;

    const expectedName = normalizeSkillChainName(skill.skill_name);
    const previousRoman = ROMAN_CHAIN[currentIndex - 1];
    return branchSkills.find(item =>
        normalizeSkillChainName(item.skill_name) === expectedName &&
        new RegExp(`\\s${previousRoman}$`, 'i').test(item.skill_name || '')
    ) || null;
}

function buildAlignedSkillColumns(branchSkills, levelGaps) {
    const rowBySkillCode = {};
    const sortedSkills = [...branchSkills].sort((a, b) =>
        a.lv_required - b.lv_required ||
        a.tier - b.tier ||
        a.skill_name.localeCompare(b.skill_name)
    );

    const componentsByRoot = {};
    sortedSkills.forEach(skill => {
        const root = skill.row_group || getSheetRowKey(skill);
        if (!componentsByRoot[root]) componentsByRoot[root] = [];
        componentsByRoot[root].push(skill);
    });

    const componentRows = Object.entries(componentsByRoot)
        .map(([root, componentSkills]) => ({
            root,
            skills: componentSkills,
            firstLevel: Math.min(...componentSkills.map(skill => skill.lv_required)),
            firstTier: Math.min(...componentSkills.map(skill => skill.tier || 0)),
            sheetOrder: getSheetRowOrder(root),
            name: componentSkills
                .slice()
                .sort((a, b) => a.lv_required - b.lv_required || a.skill_name.localeCompare(b.skill_name))[0]?.skill_name || root,
        }))
        .sort((a, b) => {
            if (a.sheetOrder !== null && b.sheetOrder !== null) return a.sheetOrder - b.sheetOrder;
            if (a.sheetOrder !== null) return -1;
            if (b.sheetOrder !== null) return 1;
            return a.firstLevel - b.firstLevel || a.firstTier - b.firstTier || a.name.localeCompare(b.name);
        });

    componentRows.forEach((component, rowIndex) => {
        component.skills.forEach(skill => {
            rowBySkillCode[skill.skill_code] = rowIndex;
        });
    });

    const occupiedRowsByLevel = {};
    sortedSkills.forEach(skill => {
        const level = skill.lv_required;
        if (!occupiedRowsByLevel[level]) occupiedRowsByLevel[level] = new Set();
        let row = rowBySkillCode[skill.skill_code];
        while (occupiedRowsByLevel[level].has(row)) row++;
        occupiedRowsByLevel[level].add(row);
        rowBySkillCode[skill.skill_code] = row;
    });

    const maxRow = Math.max(0, componentRows.length - 1, ...Object.values(rowBySkillCode));
    return levelGaps.map(level => {
        const rows = Array.from({ length: maxRow + 1 }, () => null);
        sortedSkills
            .filter(skill => skill.lv_required === level)
            .forEach(skill => {
                rows[rowBySkillCode[skill.skill_code]] = skill;
            });
        return { level, rows };
    });
}

function SkillNode({ skill, jobLevel, canUnlock, showLevel = true, isSelected, onSelect, onMeasure }) {
    const nodeRef = useRef(null);
    const isUnlocked = skill.is_unlocked;
    const meetsLevel = jobLevel >= skill.lv_required;
    const isFree = skill.sp_cost === 0;
    const isReady = !isUnlocked && meetsLevel && canUnlock;

    useEffect(() => {
        if (nodeRef.current) onMeasure?.(skill.skill_code, nodeRef.current);
    });

    return (
        <div className="relative flex items-center flex-shrink-0">
            <button
                ref={nodeRef}
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

function SkillConnectorOverlay({ connectors, width, height }) {
    if (!connectors.length || width <= 0 || height <= 0) return null;

    return (
        <svg
            className="absolute left-0 top-0 z-0 pointer-events-none"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            <defs>
                <marker id="skill-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#2a2d37" />
                </marker>
            </defs>
            {connectors.map(connector => (
                <path
                    key={`${connector.from}-${connector.to}`}
                    d={connector.y1 === connector.y2
                        ? `M ${connector.x1} ${connector.y1} L ${connector.x2} ${connector.y2}`
                        : `M ${connector.x1} ${connector.y1} L ${connector.midX} ${connector.y1} L ${connector.midX} ${connector.y2} L ${connector.x2} ${connector.y2}`}
                    stroke="#2a2d37"
                    strokeWidth="1"
                    fill="none"
                    markerEnd="url(#skill-arrow)"
                />
            ))}
        </svg>
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
    const [nodeRects, setNodeRects] = useState({});
    const [treeCanvasSize, setTreeCanvasSize] = useState({ width: 0, height: 0 });
    const [isPanningTree, setIsPanningTree] = useState(false);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const skillTreeRef = useRef(null);
    const skillScrollRef = useRef(null);
    const panStateRef = useRef(null);
    const suppressNodeClickRef = useRef(false);

    useEffect(() => {
        if (selectedJobCode && !(jobs || []).some(job => job.code === selectedJobCode)) {
            setSelectedJobCode(null);
            setSelectedBranch(null);
            setSelectedSkillCode(null);
            setSkillPopoverPosition(null);
        }
    }, [jobs, selectedJobCode]);

    useEffect(() => {
        setNodeRects({});
        setTreeCanvasSize({ width: 0, height: 0 });
        requestAnimationFrame(updateTreeCanvasSize);
    }, [selectedJobCode, selectedBranch, skills]);

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
        if (suppressNodeClickRef.current) return;

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

    function startTreePan(event) {
        if (event.button !== undefined && event.button !== 0) return;
        if (event.target?.closest?.('button')) return;
        const element = skillScrollRef.current;
        if (!element) return;

        panStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop,
            moved: false,
        };
        element.setPointerCapture?.(event.pointerId);
    }

    function moveTreePan(event) {
        const state = panStateRef.current;
        const element = skillScrollRef.current;
        if (!state || !element || state.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - state.startX;
        const deltaY = event.clientY - state.startY;
        if (!state.moved && Math.hypot(deltaX, deltaY) > 5) {
            state.moved = true;
            setIsPanningTree(true);
            closeSkillPopover();
        }

        if (state.moved) {
            event.preventDefault();
            element.scrollLeft = state.scrollLeft - deltaX;
            element.scrollTop = state.scrollTop - deltaY;
            updateTreeCanvasSize();
        }
    }

    function endTreePan(event) {
        const state = panStateRef.current;
        const element = skillScrollRef.current;
        if (!state || state.pointerId !== event.pointerId) return;

        element?.releasePointerCapture?.(event.pointerId);
        suppressNodeClickRef.current = state.moved;
        panStateRef.current = null;
        setTimeout(() => {
            suppressNodeClickRef.current = false;
            setIsPanningTree(false);
        }, 0);
    }

    function measureSkillNode(skillCode, element) {
        const scrollElement = skillScrollRef.current;
        if (!scrollElement || !element) return;

        const scrollRect = scrollElement.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        const nextRect = {
            left: rect.left - scrollRect.left + scrollElement.scrollLeft,
            top: rect.top - scrollRect.top + scrollElement.scrollTop,
            width: rect.width,
            height: rect.height,
        };

        setNodeRects(current => {
            const previous = current[skillCode];
            if (
                previous &&
                Math.abs(previous.left - nextRect.left) < 0.5 &&
                Math.abs(previous.top - nextRect.top) < 0.5 &&
                Math.abs(previous.width - nextRect.width) < 0.5 &&
                Math.abs(previous.height - nextRect.height) < 0.5
            ) {
                return current;
            }
            return { ...current, [skillCode]: nextRect };
        });
    }

    function updateTreeCanvasSize() {
        const element = skillScrollRef.current;
        if (!element) return;
        const nextSize = {
            width: element.scrollWidth,
            height: element.scrollHeight,
        };
        setTreeCanvasSize(current => (
            current.width === nextSize.width && current.height === nextSize.height ? current : nextSize
        ));
    }

    function canUnlock(skill) {
        const sameBranchSkills = skills.filter(item => item.job_code === skill.job_code && (item.branch || 'general') === (skill.branch || 'general'));
        const prerequisite = inferPrerequisiteSkill(skill, sameBranchSkills);
        if (!prerequisite) return true;
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
    const lastBranchLevel = usedBranchLevels[usedBranchLevels.length - 1] || 40;
    const levelColumns = SKILL_LEVEL_GAPS
        .filter(level => level <= lastBranchLevel);
    const alignedLevelColumns = buildAlignedSkillColumns(currentBranchSkills, levelColumns);
    const selectedSkill = currentBranchSkills.find(skill => skill.skill_code === selectedSkillCode) || null;
    const selectedSkillHasUnlockedChild = selectedSkill
        ? currentBranchSkills.some(skill => inferPrerequisiteSkill(skill, currentBranchSkills)?.skill_code === selectedSkill.skill_code && skill.is_unlocked)
        : false;
    const skillConnectors = currentBranchSkills
        .map(skill => ({ skill, prerequisite: inferRomanChainPrerequisiteSkill(skill, currentBranchSkills) }))
        .filter(({ skill, prerequisite }) => prerequisite && nodeRects[skill.skill_code] && nodeRects[prerequisite.skill_code])
        .map(({ skill, prerequisite }) => {
            const from = nodeRects[prerequisite.skill_code];
            const to = nodeRects[skill.skill_code];
            const gap = 10;
            return {
                from: prerequisite.skill_code,
                to: skill.skill_code,
                x1: from.left + from.width + gap,
                y1: from.top + 32,
                x2: to.left - gap,
                y2: to.top + 32,
                midX: from.left + from.width + ((to.left - from.left - from.width) / 2),
            };
        });
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
                        className="card p-3 overflow-visible relative z-30 h-full min-h-[360px]"
                        onClick={closeSkillPopover}
                        ref={skillTreeRef}
                    >
                        <div
                            ref={skillScrollRef}
                            className={`h-full overflow-auto pb-2 relative touch-none select-none ${isPanningTree ? 'cursor-grabbing' : 'cursor-grab'}`}
                            onClick={closeSkillPopover}
                            onPointerDown={startTreePan}
                            onPointerMove={moveTreePan}
                            onPointerUp={endTreePan}
                            onPointerCancel={endTreePan}
                            onPointerLeave={endTreePan}
                            onScroll={updateTreeCanvasSize}
                        >
                            <SkillConnectorOverlay
                                connectors={skillConnectors}
                                width={treeCanvasSize.width}
                                height={treeCanvasSize.height}
                            />
                            <div className="relative z-10 flex items-start min-w-max pr-2">
                                {alignedLevelColumns.map((group, groupIndex) => (
                                    <div key={group.level} className="flex items-stretch">
                                        {groupIndex > 0 && <div className="w-8 flex-shrink-0" />}
                                        <div className="w-[132px] flex-shrink-0">
                                            <div className="h-8 flex items-center justify-center border-b border-border mb-3">
                                                <span className="text-xs font-semibold text-accent">Lv.{group.level}</span>
                                            </div>
                                            <div>
                                                {group.rows.map((skill, rowIndex) => (
                                                    <div
                                                        key={skill?.skill_code || `${group.level}-placeholder-${rowIndex}`}
                                                        className="flex items-start justify-center"
                                                        style={{ height: SKILL_NODE_ROW_HEIGHT }}
                                                    >
                                                        {skill ? (
                                                            <SkillNode
                                                                skill={skill}
                                                                jobLevel={currentJob?.job_level || 0}
                                                                canUnlock={canUnlock(skill)}
                                                                showLevel={false}
                                                                isSelected={selectedSkillCode === skill.skill_code}
                                                                onSelect={openSkillPopover}
                                                                onMeasure={measureSkillNode}
                                                            />
                                                        ) : (
                                                            <div className="w-[118px] min-h-[96px] opacity-0 pointer-events-none" aria-hidden="true" />
                                                        )}
                                                    </div>
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
        </div>
    );
}

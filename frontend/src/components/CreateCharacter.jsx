// frontend/src/components/CreateCharacter.jsx
// Version: 1.0
// Man hinh tao nhan vat: chon nghe -> dat ten -> xac nhan

import { useState, useEffect } from 'react';
import { getJobs, createCharacter } from '../api/api.character';
import JobCard from './JobCard';

const CATEGORY_ORDER = ['combat', 'gather', 'craft'];
const CATEGORY_LABELS = {
    combat: '⚔ HE CHIEN DAU',
    gather: '⛏ HE KHAI THAC',
    craft:  '🔨 HE SAN XUAT',
};

export default function CreateCharacter({ account, onCharacterCreated }) {
    const [step, setStep] = useState(1); // 1: chon nghe, 2: dat ten + confirm
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [characterName, setCharacterName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadJobs() {
            try {
                const result = await getJobs();
                // Chi lay cac nghe available (bo qua doctor)
                setJobs(result.data.filter(j => j.is_available));
            } catch (err) {
                setError('Khong the tai danh sach nghe. Thu lai sau.');
            } finally {
                setIsLoading(false);
            }
        }
        loadJobs();
    }, []);

    function handleSelectJob(job) {
        setSelectedJob(job);
        setError('');
    }

    function handleNextStep() {
        if (!selectedJob) {
            setError('Vui long chon mot nghe khoi dau.');
            return;
        }
        setStep(2);
        setError('');
    }

    async function handleCreate() {
        if (!characterName.trim()) {
            setError('Ten nhan vat khong duoc de trong.');
            return;
        }
        if (characterName.trim().length < 3) {
            setError('Ten nhan vat phai co it nhat 3 ky tu.');
            return;
        }
        if (characterName.trim().length > 50) {
            setError('Ten nhan vat toi da 50 ky tu.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const result = await createCharacter(characterName.trim(), selectedJob.code);
            onCharacterCreated(result.data);
        } catch (err) {
            setError(err.message);
            setIsSubmitting(false);
        }
    }

    // Nhom job theo category
    const jobsByCategory = CATEGORY_ORDER.reduce((acc, cat) => {
        acc[cat] = jobs.filter(j => j.category === cat);
        return acc;
    }, {});

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-phosphor text-center">
                    <div style={{ fontSize: '10px' }} className="animate-blink mb-4">
                        DANG TAI DU LIEU...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-phosphor border-opacity-20 p-4 flex items-center justify-between flex-shrink-0">
                <div>
                    <div className="text-phosphor glow-text animate-flicker" style={{ fontSize: '11px', letterSpacing: '4px' }}>
                        ZYSTEM
                    </div>
                    <div className="text-phosphor opacity-40 mt-1" style={{ fontSize: '7px' }}>
                        XIN CHAO, {account?.username?.toUpperCase()} — TAO NHAN VAT
                    </div>
                </div>
                {/* Step indicator */}
                <div className="flex items-center gap-3">
                    {[1, 2].map(s => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-6 h-6 flex items-center justify-center border-2 ${
                                s === step ? 'border-amber text-amber bg-amber bg-opacity-10' :
                                s < step  ? 'border-phosphor text-phosphor bg-phosphor bg-opacity-10' :
                                            'border-phosphor border-opacity-30 text-phosphor opacity-30'
                            }`} style={{ fontSize: '8px' }}>
                                {s < step ? '✓' : s}
                            </div>
                            {s < 2 && <div className="text-phosphor opacity-20" style={{ fontSize: '8px' }}>──</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* STEP 1: Chon nghe */}
            {step === 1 && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="p-6 flex-shrink-0">
                        <div className="text-amber glow-text-amber mb-1" style={{ fontSize: '11px' }}>
                            // BUOC 1: CHON NGHE KHOI DAU
                        </div>
                        <div className="text-phosphor opacity-50" style={{ fontSize: '8px', lineHeight: '2' }}>
                            Nghe nay se duoc nang cap thang cap 20. Chi so se cong vao nhan vat ngay tu dau.<br/>
                            Cac chi so khac bat dau tu 0. Day la lua chon duy nhat — khong the thay doi sau khi tao.
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 pb-6">
                        {CATEGORY_ORDER.map(cat => (
                            jobsByCategory[cat]?.length > 0 && (
                                <div key={cat} className="mb-6">
                                    <div className="text-amber mb-3" style={{ fontSize: '8px' }}>
                                        ── {CATEGORY_LABELS[cat]} ──────────────
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                        {jobsByCategory[cat].map(job => (
                                            <JobCard
                                                key={job.id}
                                                job={job}
                                                isSelected={selectedJob?.id === job.id}
                                                onClick={() => handleSelectJob(job)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Footer sticky */}
                    <div className="flex-shrink-0 border-t border-phosphor border-opacity-20 p-4">
                        {error && (
                            <div className="text-danger mb-3" style={{ fontSize: '8px' }}>⚠ {error}</div>
                        )}
                        <div className="flex items-center gap-4">
                            {selectedJob && (
                                <div className="flex-1 text-amber" style={{ fontSize: '8px' }}>
                                    ► DA CHON: {selectedJob.code.toUpperCase()}
                                </div>
                            )}
                            <button
                                onClick={handleNextStep}
                                disabled={!selectedJob}
                                className="pixel-btn pixel-btn-primary"
                                style={{ fontSize: '9px', width: 'auto', padding: '12px 24px' }}
                            >
                                TIEP THEO ►
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 2: Dat ten + xac nhan */}
            {step === 2 && (
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-lg">
                        <div className="text-amber glow-text-amber mb-6" style={{ fontSize: '11px' }}>
                            // BUOC 2: DAT TEN NHAN VAT
                        </div>

                        {/* Selected job summary */}
                        <div className="pixel-card p-4 mb-6">
                            <div className="text-phosphor opacity-50 mb-2" style={{ fontSize: '7px' }}>
                                NGHE DA CHON:
                            </div>
                            <div className="text-amber" style={{ fontSize: '10px' }}>
                                {selectedJob.code.toUpperCase()}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {['str_per_lv','agi_per_lv','dex_per_lv','vit_per_lv','int_per_lv','chr_per_lv']
                                    .filter(k => parseFloat(selectedJob[k]) > 0)
                                    .map(k => (
                                        <div key={k} className="text-phosphor" style={{ fontSize: '8px' }}>
                                            <span className="opacity-50">{k.replace('_per_lv','').toUpperCase()} </span>
                                            <span className="text-amber">+{(selectedJob[k]*20).toFixed(1)}</span>
                                            <span className="opacity-30"> (cap 20)</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Input ten */}
                        <div className="mb-4">
                            <label className="block text-phosphor opacity-70 mb-2" style={{ fontSize: '8px' }}>
                                {'>'} TEN NHAN VAT
                            </label>
                            <input
                                type="text"
                                value={characterName}
                                onChange={e => { setCharacterName(e.target.value); setError(''); }}
                                placeholder="VD: SurvivorX, NVHWarrior..."
                                className="pixel-input"
                                maxLength={50}
                                autoFocus
                                disabled={isSubmitting}
                                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                            />
                            <div className="text-phosphor opacity-30 mt-1 text-right" style={{ fontSize: '7px' }}>
                                {characterName.length}/50
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="border border-danger border-opacity-40 p-3 mb-4"
                             style={{ backgroundColor: 'rgba(255,49,49,0.05)' }}>
                            <p className="text-danger opacity-70" style={{ fontSize: '7px', lineHeight: '2' }}>
                                ⚠ CANH BAO: KHONG THE THAY DOI TEN VA NGHE SAU KHI TAO.<br/>
                                MOI TAI KHOAN CHI DUOC TAO 1 NHAN VAT DUY NHAT.
                            </p>
                        </div>

                        {error && (
                            <div className="border border-danger p-3 mb-4"
                                 style={{ backgroundColor: 'rgba(255,49,49,0.08)' }}>
                                <p className="text-danger" style={{ fontSize: '8px' }}>⚠ {error}</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setStep(1); setError(''); }}
                                disabled={isSubmitting}
                                className="pixel-btn pixel-btn-secondary"
                                style={{ fontSize: '9px' }}
                            >
                                ◄ QUAY LAI
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={isSubmitting || !characterName.trim()}
                                className="pixel-btn pixel-btn-primary flex-1"
                                style={{ fontSize: '9px' }}
                            >
                                {isSubmitting ? '[ DANG TAO... ]' : '[ XAC NHAN TAO NHAN VAT ]'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

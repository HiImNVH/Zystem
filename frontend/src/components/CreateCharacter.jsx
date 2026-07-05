// frontend/src/components/CreateCharacter.jsx

import { useState, useEffect } from 'react';
import { getJobs, createCharacter } from '../api/api.character';
import JobCard from './JobCard';

const CATEGORY_ORDER = ['combat', 'survival', 'production'];
const CATEGORY_LABELS = {
    combat: 'Combat',
    survival: 'Survival',
    production: 'Production',
};

export default function CreateCharacter({ account, onCharacterCreated, onLogout }) {
    const [step, setStep] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [characterName, setCharacterName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        getJobs()
            .then(result => setJobs(result.data.filter(job => job.is_available)))
            .catch(() => setError('Could not load the skill list.'))
            .finally(() => setIsLoading(false));
    }, []);

    function handleNextStep() {
        if (!selectedJob) {
            setError('Choose a starting skill.');
            return;
        }
        setStep(2);
        setError('');
    }

    async function handleCreate() {
        if (!characterName.trim() || characterName.trim().length < 3) {
            setError('Character name must be at least 3 characters.');
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

    const jobsByCategory = CATEGORY_ORDER.reduce((acc, category) => {
        acc[category] = jobs.filter(job => job.category === category);
        return acc;
    }, {});

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base">
                <p className="text-sm text-textMuted">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base flex flex-col">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="font-bold">ZYSTEM</h1>
                    <p className="text-xs text-textMuted">Welcome {account?.username}, create your character</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {[1, 2].map(item => (
                            <div key={item} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                item === step ? 'bg-accent text-base' : item < step ? 'bg-success/20 text-success' : 'bg-elevated text-textMuted'
                            }`}>
                                {item < step ? '✓' : item}
                            </div>
                        ))}
                    </div>
                    {onLogout && (
                        <button onClick={onLogout} className="text-xs text-textMuted hover:text-danger transition-colors">
                            Switch account
                        </button>
                    )}
                </div>
            </div>

            {step === 1 && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 py-5 flex-shrink-0 max-w-3xl">
                        <h2 className="text-lg font-bold mb-1">Choose a Starting Skill</h2>
                        <p className="text-sm text-textMuted">
                            Your selected skill starts at level 20 and grants stat bonuses when the character is created.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 pb-6">
                        {CATEGORY_ORDER.map(category => jobsByCategory[category]?.length > 0 && (
                            <div key={category} className="mb-6">
                                <p className="text-xs font-semibold text-textMuted mb-3">{CATEGORY_LABELS[category].toUpperCase()}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {jobsByCategory[category].map(job => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            isSelected={selectedJob?.id === job.id}
                                            onClick={() => { setSelectedJob(job); setError(''); }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-border px-6 py-4 flex-shrink-0">
                        {error && <p className="text-sm text-danger mb-3">{error}</p>}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-textSecondary">
                                {selectedJob ? `Selected: ${selectedJob.display_name}` : 'No skill selected'}
                            </p>
                            <button onClick={handleNextStep} disabled={!selectedJob} className="btn-primary px-6">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <h2 className="text-lg font-bold mb-5">Name Your Character</h2>

                        <div className="card p-4 mb-5">
                            <p className="text-xs text-textMuted mb-2">Starting skill</p>
                            <p className="font-semibold mb-3">{selectedJob.display_name}</p>
                            <div className="flex flex-wrap gap-3 text-xs">
                                {['str_per_lv','agi_per_lv','dex_per_lv','vit_per_lv','int_per_lv','chr_per_lv']
                                    .filter(key => parseFloat(selectedJob[key]) > 0)
                                    .map(key => (
                                        <span key={key}>
                                            <span className="text-textMuted">{key.replace('_per_lv','').toUpperCase()} </span>
                                            <span className="text-accent font-semibold">+{(selectedJob[key] * 20).toFixed(1)}</span>
                                        </span>
                                    ))}
                            </div>
                        </div>

                        <label className="block text-xs font-medium text-textSecondary mb-1.5">Character name</label>
                        <input
                            type="text"
                            value={characterName}
                            onChange={event => { setCharacterName(event.target.value); setError(''); }}
                            placeholder="SurvivorX"
                            className="input-field mb-5"
                            maxLength={50}
                            autoFocus
                            disabled={isSubmitting}
                            onKeyDown={event => event.key === 'Enter' && handleCreate()}
                        />

                        <div className="bg-danger/10 rounded-lg p-3 mb-5">
                            <p className="text-xs text-danger">
                                Character name and starting skill cannot be changed after creation.
                            </p>
                        </div>

                        {error && <p className="text-sm text-danger mb-4">{error}</p>}

                        <div className="flex gap-3">
                            <button onClick={() => { setStep(1); setError(''); }} disabled={isSubmitting} className="btn-secondary">
                                Back
                            </button>
                            <button onClick={handleCreate} disabled={isSubmitting || !characterName.trim()} className="btn-primary flex-1">
                                {isSubmitting ? 'Creating...' : 'Create Character'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

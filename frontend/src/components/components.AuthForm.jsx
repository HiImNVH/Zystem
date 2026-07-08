// frontend/src/components/components.AuthForm.jsx

import { useState } from 'react';
import { loginAccount, registerAccount } from '../api/api.auth';

export default function AuthForm({ onAuthSuccess }) {
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e) {
        setError('');
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function switchMode(newMode) {
        setMode(newMode);
        setError('');
        setFormData({ username: '', email: '', password: '' });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Username and password cannot be empty.');
            return;
        }
        if (mode === 'register') {
            if (formData.username.trim().length < 3) { setError('Username must be at least 3 characters.'); return; }
            if (formData.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
            if (!formData.email.includes('@')) { setError('Invalid email address.'); return; }
        }

        setIsLoading(true);
        try {
            const result = mode === 'login'
                ? await loginAccount(formData.username.trim(), formData.password)
                : await registerAccount(formData.username.trim(), formData.email.trim(), formData.password);

            localStorage.setItem('zystem_token', result.data.token);
            localStorage.setItem('zystem_account', JSON.stringify(result.data.account));
            onAuthSuccess(result.data);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base p-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-extrabold tracking-tight mb-1">ZYSTEM</h1>
                    <p className="text-xs text-textMuted">Post-apocalypse survival MMORPG</p>
                </div>

                <div className="card p-6">
                    {/* Mode tabs */}
                    <div className="flex gap-1 mb-6 p-1 bg-base rounded-lg">
                        <button onClick={() => switchMode('login')}
                                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                                    mode === 'login' ? 'bg-elevated text-textPrimary' : 'text-textMuted'
                                }`}>
                            Log In
                        </button>
                        <button onClick={() => switchMode('register')}
                                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                                    mode === 'register' ? 'bg-elevated text-textPrimary' : 'text-textMuted'
                                }`}>
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-textSecondary mb-1.5">Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}
                                   placeholder="SurvivorX" className="input-field" disabled={isLoading} maxLength={32} />
                        </div>

                        {mode === 'register' && (
                            <div className="animate-slideup">
                                <label className="block text-xs font-medium text-textSecondary mb-1.5">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       placeholder="survivor@wasteland.com" className="input-field" disabled={isLoading} />
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-textSecondary mb-1.5">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange}
                                   placeholder={mode === 'register' ? 'Min. 6 characters' : 'Password'}
                                   className="input-field" disabled={isLoading} />
                        </div>

                        {error && (
                            <div className="text-sm text-danger bg-danger/10 rounded-lg p-3 animate-slideup">
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-primary w-full">
                            {isLoading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-textMuted mt-5">
                    Alpha build - data may be reset at any time
                </p>
            </div>
        </div>
    );
}

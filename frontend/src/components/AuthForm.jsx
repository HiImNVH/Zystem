// frontend/src/components/AuthForm.jsx
// Version: 1.0
// Form dang nhap / dang ky — pixel art style, xu ly loi ro rang

import { useState } from 'react';
import { loginAccount, registerAccount } from '../api/api.auth';

export default function AuthForm({ onAuthSuccess }) {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    function handleChange(e) {
        setError('');
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function switchMode(newMode) {
        setMode(newMode);
        setError('');
        setSuccessMsg('');
        setFormData({ username: '', email: '', password: '' });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        // Validation co ban
        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Ten dang nhap va mat khau khong duoc de trong.');
            return;
        }

        if (mode === 'register') {
            if (formData.username.trim().length < 3) {
                setError('Ten dang nhap phai co it nhat 3 ky tu.');
                return;
            }
            if (formData.password.length < 6) {
                setError('Mat khau phai co it nhat 6 ky tu.');
                return;
            }
            if (!formData.email.includes('@')) {
                setError('Email khong hop le.');
                return;
            }
        }

        setIsLoading(true);

        try {
            let result;

            if (mode === 'login') {
                result = await loginAccount(formData.username.trim(), formData.password);
            } else {
                result = await registerAccount(
                    formData.username.trim(),
                    formData.email.trim(),
                    formData.password
                );
            }

            // Luu token vao localStorage
            localStorage.setItem('zystem_token', result.data.token);
            localStorage.setItem('zystem_account', JSON.stringify(result.data.account));

            setSuccessMsg(mode === 'login'
                ? `Chao mung tro lai, ${result.data.account.username}!`
                : `Tai khoan da tao! Chuc may man song sot...`
            );

            // Chuyen sang man hinh chinh sau 1s
            setTimeout(() => onAuthSuccess(result.data), 1000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-full flex flex-col justify-center p-8">
            {/* Tab chon Login / Register */}
            <div className="flex mb-8 gap-1">
                <button
                    onClick={() => switchMode('login')}
                    className={`pixel-btn flex-1 ${mode === 'login' ? 'pixel-btn-primary' : 'pixel-btn-secondary'}`}
                    style={{ fontSize: '9px' }}
                >
                    ► DANG NHAP
                </button>
                <button
                    onClick={() => switchMode('register')}
                    className={`pixel-btn flex-1 ${mode === 'register' ? 'pixel-btn-primary' : 'pixel-btn-secondary'}`}
                    style={{ fontSize: '9px' }}
                >
                    ► DANG KY
                </button>
            </div>

            {/* Title */}
            <div className="mb-6">
                <div className="text-amber glow-text-amber animate-flicker mb-2"
                     style={{ fontSize: '11px' }}>
                    {mode === 'login' ? '// XAC THUC DANH TINH' : '// TAO TAI KHOAN MOI'}
                </div>
                <div className="text-phosphor opacity-40" style={{ fontSize: '8px' }}>
                    {mode === 'login'
                        ? 'Nhap thong tin de truy cap he thong sinh ton.'
                        : 'Dang ky de tham gia the gioi post-apocalypse.'}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                    <label className="block text-phosphor mb-2 opacity-70"
                           style={{ fontSize: '8px' }}>
                        {'>'} TEN NGUOI DUNG
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="VD: SurvivorX"
                        className="pixel-input"
                        autoComplete="username"
                        disabled={isLoading}
                        maxLength={32}
                    />
                </div>

                {/* Email — chi hien thi khi register */}
                {mode === 'register' && (
                    <div className="animate-slideup">
                        <label className="block text-phosphor mb-2 opacity-70"
                               style={{ fontSize: '8px' }}>
                            {'>'} EMAIL
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="VD: survivor@wasteland.com"
                            className="pixel-input"
                            autoComplete="email"
                            disabled={isLoading}
                        />
                    </div>
                )}

                {/* Password */}
                <div>
                    <label className="block text-phosphor mb-2 opacity-70"
                           style={{ fontSize: '8px' }}>
                        {'>'} MAT KHAU
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={mode === 'register' ? 'Toi thieu 6 ky tu' : '••••••••'}
                        className="pixel-input"
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        disabled={isLoading}
                    />
                </div>

                {/* Error message */}
                {error && (
                    <div className="animate-slideup border border-danger p-3"
                         style={{ backgroundColor: 'rgba(255, 49, 49, 0.08)' }}>
                        <p className="text-danger" style={{ fontSize: '8px', lineHeight: '1.8' }}>
                            ⚠ {error}
                        </p>
                    </div>
                )}

                {/* Success message */}
                {successMsg && (
                    <div className="animate-slideup border border-phosphor p-3"
                         style={{ backgroundColor: 'rgba(57, 255, 20, 0.08)' }}>
                        <p className="text-phosphor glow-text" style={{ fontSize: '8px', lineHeight: '1.8' }}>
                            ✓ {successMsg}
                        </p>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="pixel-btn pixel-btn-primary mt-2"
                    style={{ fontSize: '10px' }}
                >
                    {isLoading
                        ? '[ DANG XU LY... ]'
                        : mode === 'login'
                            ? '[ VAO HE THONG ]'
                            : '[ TAO TAI KHOAN ]'
                    }
                </button>
            </form>

            {/* Divider va luu y */}
            <hr className="pixel-divider mt-6" />
            <div className="text-center mt-4" style={{ fontSize: '7px' }}>
                <span className="text-phosphor opacity-30">
                    {mode === 'login'
                        ? 'CHUA CO TAI KHOAN? BAM [DANG KY] O TREN'
                        : 'DA CO TAI KHOAN? BAM [DANG NHAP] O TREN'}
                </span>
            </div>

            {/* Warning lore */}
            <div className="mt-4 p-3 border border-amber border-opacity-30"
                 style={{ backgroundColor: 'rgba(245, 197, 24, 0.04)' }}>
                <p className="text-amber opacity-60 text-center" style={{ fontSize: '7px', lineHeight: '2' }}>
                    ⚠ CANH BAO: ALPHA BUILD.<br/>
                    DU LIEU CO THE BI XOA BAT KY LUC.<br/>
                    SINH TON LA TRACH NHIEM CUA BAN.
                </p>
            </div>
        </div>
    );
}

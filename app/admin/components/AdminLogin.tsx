'use client';

import { useState } from 'react';
import { ADMIN_PASSWORD_KEY, DEFAULT_PASSWORD } from './types';

type Props = { onLogin: () => void };

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === stored) {
      sessionStorage.setItem('admin_auth', 'true');
      onLogin();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 5) {
        setLocked(true);
        setError('Too many attempts. Refresh the page to try again.');
      } else {
        setError(`Incorrect password. ${5 - next} attempts remaining.`);
        setPassword('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <img src="/Logo Mahrousa.png" alt="Mahrousa" className="h-20 w-auto mx-auto" />
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">Admin Portal</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-2">Secure Operations Access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/[0.03] border border-white/8 rounded-3xl p-8">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full bg-black/60 border rounded-2xl p-4 outline-none text-center text-2xl tracking-[0.5em] text-white placeholder-white/10 transition-colors ${
                error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/60'
              }`}
              placeholder="••••••"
              disabled={locked}
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <span className="text-red-400 text-sm">⚠️</span>
              <p className="text-red-400 text-[10px] font-black uppercase tracking-wider">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={locked || !password}
            className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {locked ? '🔒 Access Locked' : 'Unlock Dashboard →'}
          </button>
        </form>

        <p className="text-center text-[9px] text-white/10 uppercase tracking-widest">
          Mahrousa Restaurant Group · Admin Only
        </p>
      </div>
    </div>
  );
}

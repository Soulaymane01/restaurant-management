'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fix: redirect AFTER render using useEffect, not during render
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while checking session storage
  if (isLoading) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
            <span className="text-white text-3xl font-black">N</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-secondary">Notifications</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20 mt-2">
            Real-Time Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-secondary/5 border border-secondary/10 rounded-3xl p-8 shadow-sm">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-foreground/30">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className="w-full bg-card border border-secondary/10 rounded-2xl p-4 outline-none text-base text-secondary placeholder-secondary/10 transition-colors focus:border-primary/60"
              placeholder="Enter your username"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-foreground/30">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-card border border-secondary/10 rounded-2xl p-4 outline-none text-base text-secondary placeholder-secondary/10 transition-colors focus:border-primary/60"
              placeholder="Enter your password"
              disabled={loading}
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
            disabled={loading || !username || !password}
            className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl hover:bg-secondary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p className="text-center text-[9px] text-white/10 uppercase tracking-widest">
          Notification System · Real-Time Dashboard
        </p>
      </div>
    </div>
  );
}

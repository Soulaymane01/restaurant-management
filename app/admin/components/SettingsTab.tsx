'use client';

import { useState, useEffect } from 'react';
import { Notification, NOTIFICATIONS_KEY, ORDERS_KEY, MENU_KEY, ADMIN_PASSWORD_KEY, DEFAULT_PASSWORD } from './types';
import { branches, menuItems as initialMenuItems } from '../../lib/branch-data';

type Props = {
  onLogout: () => void;
  onSettingsMessage: (msg: string) => void;
  settingsMsg: string;
};

type BusinessHours = Record<string, { open: string; close: string; closed: boolean }>;

const DEFAULT_HOURS: BusinessHours = {
  Monday:    { open: '11:00', close: '23:30', closed: false },
  Tuesday:   { open: '11:00', close: '23:30', closed: false },
  Wednesday: { open: '11:00', close: '23:30', closed: false },
  Thursday:  { open: '11:00', close: '23:30', closed: false },
  Friday:    { open: '11:00', close: '00:00', closed: false },
  Saturday:  { open: '11:00', close: '00:00', closed: false },
  Sunday:    { open: '12:00', close: '23:00', closed: false },
};

export default function SettingsTab({ onLogout, onSettingsMessage, settingsMsg }: Props) {
  const [branchStatus, setBranchStatus] = useState<Record<string, boolean>>({});
  const [hours, setHours] = useState<BusinessHours>(DEFAULT_HOURS);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [restaurantName, setRestaurantName] = useState('MAHROUSA');
  const [restaurantPhone, setRestaurantPhone] = useState('+212600000000');
  const [restaurantCity, setRestaurantCity] = useState('Tangier, Morocco');
  const [autoNotify, setAutoNotify] = useState(true);

  useEffect(() => {
    const bs: Record<string, boolean> = {};
    branches.forEach(b => { bs[b.id] = JSON.parse(localStorage.getItem(`branch_active_${b.id}`) || 'true'); });
    setBranchStatus(bs);

    const savedHours = JSON.parse(localStorage.getItem('admin_hours') || 'null');
    if (savedHours) setHours(savedHours);

    const info = JSON.parse(localStorage.getItem('admin_restaurant_info') || 'null');
    if (info) { setRestaurantName(info.name || 'MAHROUSA'); setRestaurantPhone(info.phone || ''); setRestaurantCity(info.city || ''); }

    setAutoNotify(JSON.parse(localStorage.getItem('admin_auto_notify') || 'true'));
  }, []);

  const toggleBranch = (id: string) => {
    const next = !branchStatus[id];
    setBranchStatus(prev => ({ ...prev, [id]: next }));
    localStorage.setItem(`branch_active_${id}`, JSON.stringify(next));
    onSettingsMessage(`✅ Branch "${id}" ${next ? 'activated' : 'deactivated'}.`);
  };

  const saveHours = () => {
    localStorage.setItem('admin_hours', JSON.stringify(hours));
    onSettingsMessage('✅ Business hours saved.');
  };

  const saveInfo = () => {
    localStorage.setItem('admin_restaurant_info', JSON.stringify({ name: restaurantName, phone: restaurantPhone, city: restaurantCity }));
    onSettingsMessage('✅ Restaurant info saved.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (currentPass !== stored) { onSettingsMessage('❌ Current password is incorrect.'); return; }
    if (newPass.length < 6)     { onSettingsMessage('❌ New password must be at least 6 characters.'); return; }
    if (newPass !== confirmPass) { onSettingsMessage('❌ New passwords do not match.'); return; }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
    onSettingsMessage('✅ Password updated successfully!');
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
  };

  const clearOrders = () => {
    if (!confirm('Clear ALL orders permanently?')) return;
    localStorage.removeItem(ORDERS_KEY);
    onSettingsMessage('✅ All orders cleared.');
    window.location.reload();
  };

  const resetMenu = () => {
    if (!confirm('Reset menu to factory defaults?')) return;
    localStorage.setItem(MENU_KEY, JSON.stringify(initialMenuItems));
    onSettingsMessage('✅ Menu reset to defaults.');
    window.location.reload();
  };

  const clearNotifications = () => {
    localStorage.removeItem(NOTIFICATIONS_KEY);
    onSettingsMessage('✅ Notifications cleared.');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-secondary">Settings</h1>
        <p className="text-foreground/30 text-xs uppercase tracking-widest mt-1">System Configuration</p>
      </div>

      {settingsMsg && (
        <div className={`px-5 py-3 rounded-xl text-sm font-black border ${settingsMsg.startsWith('✅') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
          {settingsMsg}
        </div>
      )}

      {/* Restaurant Info */}
      <section className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="font-black uppercase tracking-widest text-xs text-foreground/40">Restaurant Information</h2>
        <div className="space-y-3">
          {[
            { label: 'Restaurant Name', value: restaurantName, setter: setRestaurantName },
            { label: 'Main Phone', value: restaurantPhone, setter: setRestaurantPhone },
            { label: 'City', value: restaurantCity, setter: setRestaurantCity },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[8px] font-black uppercase tracking-widest text-foreground/30 mb-1 block">{f.label}</label>
              <input value={f.value} onChange={e => f.setter(e.target.value)}
                className="w-full bg-secondary/5 border border-secondary/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-secondary transition-colors" />
            </div>
          ))}
        </div>
        <button onClick={saveInfo} className="px-6 py-2.5 bg-primary rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all">
          Save Info
        </button>
      </section>

      {/* Branch Status */}
      <section className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-sm">
        <h2 className="font-black uppercase tracking-widest text-xs text-foreground/40">Branch Availability</h2>
        {branches.map(b => (
          <div key={b.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <p className="font-black text-secondary">{b.names.en}</p>
              <p className="text-xs text-foreground/30">{b.locations?.en}</p>
              <p className="text-[9px] text-foreground/20 font-black">{b.phone}</p>
            </div>
            <button onClick={() => toggleBranch(b.id)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 shadow-inner ${branchStatus[b.id] !== false ? 'bg-primary' : 'bg-secondary/10'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${branchStatus[b.id] !== false ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </section>

      {/* Business Hours */}
      <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="font-black uppercase tracking-widest text-xs text-white/40">Business Hours</h2>
        <div className="space-y-3">
          {Object.entries(hours).map(([day, h]) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-24 text-sm font-black text-secondary/60 shrink-0">{day}</span>
              <label className="flex items-center gap-2 text-xs font-black cursor-pointer shrink-0">
                <input type="checkbox" checked={h.closed} onChange={e => setHours(prev => ({ ...prev, [day]: { ...h, closed: e.target.checked } }))} className="accent-red-500" />
                <span className="text-secondary/40">Closed</span>
              </label>
              {!h.closed && (
                <>
                  <input type="time" value={h.open} onChange={e => setHours(prev => ({ ...prev, [day]: { ...h, open: e.target.value } }))}
                    className="bg-secondary/5 border border-secondary/10 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-primary/50 text-secondary" />
                  <span className="text-secondary/30">→</span>
                  <input type="time" value={h.close} onChange={e => setHours(prev => ({ ...prev, [day]: { ...h, close: e.target.value } }))}
                    className="bg-secondary/5 border border-secondary/10 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-primary/50 text-secondary" />
                </>
              )}
            </div>
          ))}
        </div>
        <button onClick={saveHours} className="px-6 py-2.5 bg-primary rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all">
          Save Hours
        </button>
      </section>

      {/* Notifications */}
      <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="font-black uppercase tracking-widest text-xs text-white/40">Notification Settings</h2>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-black text-sm text-secondary">Auto-notify on new orders</p>
            <p className="text-xs text-foreground/30 mt-0.5">Create a notification for every new pending order</p>
          </div>
          <button onClick={() => { const n = !autoNotify; setAutoNotify(n); localStorage.setItem('admin_auto_notify', JSON.stringify(n)); }}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 shadow-inner ${autoNotify ? 'bg-primary' : 'bg-secondary/10'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${autoNotify ? 'left-7' : 'left-1'}`} />
          </button>
        </label>
        <button onClick={clearNotifications} className="px-6 py-2.5 bg-secondary/5 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-secondary/10 transition-all text-secondary/40">
          Clear All Notifications
        </button>
      </section>

      {/* Change Password */}
      <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="font-black uppercase tracking-widest text-xs text-white/40">Change Admin Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-3">
          {[
            { label: 'Current Password', val: currentPass, set: setCurrentPass },
            { label: 'New Password (min 6)', val: newPass, set: setNewPass },
            { label: 'Confirm New Password', val: confirmPass, set: setConfirmPass },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[8px] font-black uppercase tracking-widest text-foreground/30 mb-1 block">{f.label}</label>
              <input type="password" value={f.val} onChange={e => f.set(e.target.value)}
                className="w-full bg-secondary/5 border border-secondary/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-secondary transition-colors" />
            </div>
          ))}
          <button type="submit" className="px-6 py-2.5 bg-primary rounded-xl text-[9px] font-black uppercase text-white hover:bg-secondary transition-all">
            Update Password
          </button>
        </form>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6 space-y-4">
        <h2 className="font-black uppercase tracking-widest text-xs text-red-400">⚠️ Danger Zone</h2>
        <div className="space-y-2">
          {[
            { label: 'Reset Menu to Defaults', action: resetMenu, sub: 'Loses all custom items and prices' },
            { label: 'Clear All Orders', action: clearOrders, sub: 'Permanently deletes all order history' },
          ].map(btn => (
            <div key={btn.label} className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
              <div>
                <p className="font-black text-sm text-red-300">{btn.label}</p>
                <p className="text-[9px] text-red-400/40 mt-0.5">{btn.sub}</p>
              </div>
              <button onClick={btn.action} className="px-4 py-2 bg-red-500/15 text-red-400 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-red-500/25 transition-all shrink-0">
                Execute
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Logout */}
      <button onClick={onLogout} className="w-full py-3 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-wider text-white/30 hover:text-red-400 hover:border-red-500/20 transition-all">
        🚪 Sign Out of Dashboard
      </button>
    </div>
  );
}

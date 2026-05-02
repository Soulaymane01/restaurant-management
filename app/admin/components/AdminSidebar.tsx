'use client';

import { Tab, STATUS_CONFIG, Notification } from './types';
import { Order } from './types';

type Props = {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  orders: Order[];
  notifications: Notification[];
  onLogout: () => void;
};

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'orders',        label: 'Orders',        icon: '📋' },
  { id: 'analytics',     label: 'Analytics',     icon: '📊' },
  { id: 'crm',           label: 'Clients',       icon: '👥' },
  { id: 'menu',          label: 'Menu',          icon: '🍽️' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'settings',      label: 'Settings',      icon: '⚙️' },
];

export default function AdminSidebar({ activeTab, setActiveTab, orders, notifications, onLogout }: Props) {
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/5 p-6 gap-2 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8 shrink-0">
          <img src="/Logo Mahrousa.png" alt="Mahrousa" className="h-14 w-auto mb-3" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Operations Control</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {tabs.map(tab => {
            const badge = tab.id === 'orders' ? pendingCount : tab.id === 'notifications' ? unreadCount : 0;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="flex-1">{tab.label}</span>
                {badge > 0 && (
                  <span className="bg-yellow-400 text-black text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Status summary at bottom */}
        <div className="shrink-0 border-t border-white/5 pt-4 mt-2 space-y-2">
          <p className="text-[8px] uppercase tracking-widest text-white/20 mb-3">Live Status</p>
          {(Object.entries(STATUS_CONFIG) as [keyof typeof STATUS_CONFIG, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([s, cfg]) => {
            const count = orders.filter(o => o.status === s).length;
            return count > 0 ? (
              <div key={s} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className="text-[9px] font-black text-white/30 uppercase">{cfg.label}</span>
                </div>
                <span className="text-[10px] font-black text-white/50">{count}</span>
              </div>
            ) : null;
          })}
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all mt-2 shrink-0"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#080808] border-t border-white/5 flex">
        {tabs.map(tab => {
          const badge = tab.id === 'orders' ? pendingCount : tab.id === 'notifications' ? unreadCount : 0;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-3 flex flex-col items-center gap-1 text-[7px] font-black uppercase tracking-wide transition-colors relative ${
                activeTab === tab.id ? 'text-primary' : 'text-white/25'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
              {badge > 0 && (
                <span className="absolute top-1 right-1 bg-yellow-400 text-black text-[7px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

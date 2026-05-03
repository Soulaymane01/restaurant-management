'use client';

import { useState } from 'react';
import { Notification, NOTIFICATIONS_KEY } from './types';

type Props = {
  notifications: Notification[];
  setNotifications: (n: Notification[]) => void;
};

export default function NotificationsTab({ notifications, setNotifications }: Props) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const save = (updated: Notification[]) => {
    setNotifications(updated);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  };

  const markRead = (id: number) => save(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => save(notifications.map(n => ({ ...n, read: true })));
  const deleteNote = (id: number) => save(notifications.filter(n => n.id !== id));
  const clearAll = () => save([]);

  const visible = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const TYPE_ICON: Record<string, string> = { order: '📋', info: 'ℹ️', warning: '⚠️' };
  const TYPE_COLOR: Record<string, string> = {
    order:   'bg-blue-100 border-blue-200 text-blue-700',
    info:    'bg-secondary/5 border-secondary/10 text-secondary/40',
    warning: 'bg-yellow-100 border-yellow-200 text-yellow-700',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-secondary">Notifications</h1>
          <p className="text-foreground/30 text-xs uppercase tracking-widest mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="px-4 py-2 bg-secondary/5 border border-secondary/10 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-secondary/10 transition-all text-secondary/60">
              ✓ Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button onClick={clearAll} className="px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-red-200 transition-all">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="flex bg-secondary/5 border border-secondary/10 p-1 rounded-2xl w-fit">
        {(['all', 'unread'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl text-[9px] uppercase font-black tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/30 hover:text-secondary'}`}>
            {f} {f === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {visible.length === 0 ? (
        <div className="text-center py-20 text-white/20">
          <div className="text-5xl mb-4">🔔</div>
          <p className="font-black uppercase tracking-widest text-sm">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </p>
          <p className="text-xs mt-2 text-white/10">Updates from orders and system events appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {[...visible].sort((a, b) => b.id - a.id).map(n => (
            <div key={n.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${n.read ? 'bg-card border-border opacity-70' : `${TYPE_COLOR[n.type]} shadow-sm`}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-base ${TYPE_COLOR[n.type]}`}>
                {TYPE_ICON[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-black leading-snug ${n.read ? 'text-secondary/60' : 'text-secondary'}`}>{n.message}</p>
                <p className="text-[9px] text-foreground/20 mt-1">{new Date(n.date).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!n.read && (
                  <button onClick={() => markRead(n.id)}
                    className="w-7 h-7 rounded-xl bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center text-xs text-secondary/60 hover:text-secondary transition-all"
                    title="Mark as read">
                    ✓
                  </button>
                )}
                <button onClick={() => deleteNote(n.id)}
                  className="w-7 h-7 rounded-xl bg-red-100 hover:bg-red-200 flex items-center justify-center text-xs text-red-700 transition-all font-bold"
                  title="Delete">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

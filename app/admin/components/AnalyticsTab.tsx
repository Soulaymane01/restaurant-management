'use client';

import { useState, useMemo } from 'react';
import { Order, STATUS_CONFIG } from './types';
import { branches, menuItems as initialMenuItems } from '../../lib/branch-data';

type Props = { orders: Order[]; menuItems: any[] };

export default function AnalyticsTab({ orders, menuItems }: Props) {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [revenueGoal, setRevenueGoal] = useState<number>(() => {
    if (typeof window !== 'undefined') return Number(localStorage.getItem('admin_revenue_goal') || 5000);
    return 5000;
  });
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');

  const saveGoal = () => {
    const val = Number(goalInput);
    if (val > 0) {
      setRevenueGoal(val);
      localStorage.setItem('admin_revenue_goal', String(val));
    }
    setEditingGoal(false);
  };

  const analytics = useMemo(() => {
    const now = new Date();
    const inPeriod = (d: string) => {
      const date = new Date(d);
      if (period === 'daily')  return date.toDateString() === now.toDateString();
      if (period === 'weekly') return date >= new Date(now.getTime() - 7 * 86400000);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    };

    const periodOrders = orders.filter(o => inPeriod(o.date));
    const active = periodOrders.filter(o => o.status !== 'cancelled');
    const revenue = active.reduce((s, o) => s + o.total, 0);
    const avgOrder = active.length ? Math.round(revenue / active.length) : 0;
    const cancelled = periodOrders.filter(o => o.status === 'cancelled').length;
    const conversionRate = periodOrders.length ? Math.round((active.length / periodOrders.length) * 100) : 0;

    // Revenue per branch
    const byBranch = branches.map(b => {
      const bOrders = active.filter(o => o.branch === b.id);
      return { name: b.names.en, total: bOrders.reduce((s, o) => s + o.total, 0), count: bOrders.length };
    });
    const maxBranch = Math.max(...byBranch.map(b => b.total), 1);

    // Hourly distribution (0-23)
    const hourly = Array(24).fill(0);
    active.forEach(o => { const h = new Date(o.date).getHours(); hourly[h]++; });
    const maxHourly = Math.max(...hourly, 1);

    // Top items
    const itemCount: Record<string, number> = {};
    active.forEach(o => o.items.forEach(i => { itemCount[i.name] = (itemCount[i.name] || 0) + i.quantity; }));
    const topItems = Object.entries(itemCount).sort((a, b) => b[1] - a[1]).slice(0, 7);

    // Daily revenue for the last 14 days
    const dailyRevenue: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString('en-CA');
      dailyRevenue[key] = 0;
    }
    orders.filter(o => o.status !== 'cancelled').forEach(o => {
      const key = new Date(o.date).toLocaleDateString('en-CA');
      if (dailyRevenue[key] !== undefined) dailyRevenue[key] += o.total;
    });
    const dailyPoints = Object.entries(dailyRevenue);
    const maxDaily = Math.max(...dailyPoints.map(([, v]) => v), 1);

    // Repeat customers
    const phoneCounts: Record<string, number> = {};
    orders.forEach(o => { phoneCounts[o.phone] = (phoneCounts[o.phone] || 0) + 1; });
    const repeatCustomers = Object.values(phoneCounts).filter(c => c > 1).length;
    const totalCustomers = Object.keys(phoneCounts).length;

    return { periodOrders, active, revenue, avgOrder, cancelled, conversionRate, byBranch, maxBranch, hourly, maxHourly, topItems, dailyPoints, maxDaily, repeatCustomers, totalCustomers };
  }, [orders, period, menuItems]);

  const goalPct = Math.min(100, Math.round((analytics.revenue / revenueGoal) * 100));

  const peakHours = analytics.hourly
    .map((c, h) => ({ h, c }))
    .sort((a, b) => b.c - a.c)
    .slice(0, 3)
    .map(({ h }) => `${h}:00`);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Analytics</h1>
          <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Performance Insights</p>
        </div>
        <div className="flex bg-white/5 border border-white/8 p-1 rounded-2xl">
          {(['daily', 'weekly', 'monthly'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${period === p ? 'bg-primary text-white' : 'text-white/30 hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Goal Tracker */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Revenue Goal Progress</p>
          {editingGoal ? (
            <div className="flex gap-2">
              <input type="number" value={goalInput} onChange={e => setGoalInput(e.target.value)} autoFocus
                className="w-28 bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-primary/50 text-white"
                placeholder="Goal DH" />
              <button onClick={saveGoal} className="px-3 py-1.5 bg-primary rounded-xl text-[9px] font-black uppercase hover:bg-white hover:text-black transition-all">Set</button>
              <button onClick={() => setEditingGoal(false)} className="px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black uppercase hover:bg-white/10 transition-all">✕</button>
            </div>
          ) : (
            <button onClick={() => { setEditingGoal(true); setGoalInput(String(revenueGoal)); }}
              className="text-[9px] font-black uppercase tracking-wider text-primary hover:text-white transition-colors">
              Edit Goal
            </button>
          )}
        </div>
        <div className="flex items-end justify-between">
          <p className="text-4xl font-black tracking-tighter text-primary">{analytics.revenue.toLocaleString()} DH</p>
          <p className="text-white/30 text-sm font-black">/ {revenueGoal.toLocaleString()} DH goal <span className={`font-black ${goalPct >= 100 ? 'text-green-400' : 'text-white/50'}`}>({goalPct}%)</span></p>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${goalPct >= 100 ? 'bg-green-400' : 'bg-primary'}`} style={{ width: `${goalPct}%` }} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Orders', value: analytics.active.length, sub: `${analytics.cancelled} cancelled`, accent: 'text-white' },
          { label: 'Avg Order', value: `${analytics.avgOrder} DH`, sub: 'Per transaction', accent: 'text-secondary' },
          { label: 'Conversion', value: `${analytics.conversionRate}%`, sub: 'Non-cancelled rate', accent: 'text-green-400' },
          { label: 'Repeat Rate', value: analytics.totalCustomers > 0 ? `${Math.round((analytics.repeatCustomers / analytics.totalCustomers) * 100)}%` : '0%', sub: `${analytics.repeatCustomers} returning`, accent: 'text-primary' },
        ].map(card => (
          <div key={card.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{card.label}</p>
            <p className={`text-3xl font-black tracking-tighter ${card.accent}`}>{card.value}</p>
            <p className="text-[10px] text-white/20">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* 14-day Revenue Sparkline */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30">14-Day Revenue Trend</p>
          <p className="text-primary font-black text-sm">Peak: {Math.max(...analytics.dailyPoints.map(([,v]) => v))} DH</p>
        </div>
        <div className="flex items-end gap-1.5 h-24">
          {analytics.dailyPoints.map(([date, val], i) => {
            const h = analytics.maxDaily > 0 ? (val / analytics.maxDaily) * 100 : 0;
            const isToday = date === new Date().toLocaleDateString('en-CA');
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-1 group" title={`${date}: ${val} DH`}>
                <div className={`w-full rounded-t-sm transition-all duration-700 ${isToday ? 'bg-primary' : 'bg-white/10 group-hover:bg-primary/60'}`}
                  style={{ height: `${Math.max(h, 2)}%`, minHeight: '3px' }} />
                {(i % 7 === 0 || isToday) && (
                  <span className={`text-[6px] font-black uppercase ${isToday ? 'text-primary' : 'text-white/20'}`}>
                    {isToday ? 'Today' : new Date(date + 'T12:00').toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue by Branch */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-5">Revenue by Branch</p>
          <div className="space-y-4">
            {analytics.byBranch.map(b => (
              <div key={b.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-black">{b.name}</span>
                  <span className="text-primary font-black">{b.total} DH <span className="text-white/30">({b.count})</span></span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${(b.total / analytics.maxBranch) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Heatmap */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Hourly Order Heatmap</p>
            <p className="text-[9px] text-white/30">Peak: {peakHours.join(', ')}</p>
          </div>
          <div className="grid grid-cols-12 gap-1">
            {analytics.hourly.map((count, h) => {
              const intensity = analytics.maxHourly > 0 ? count / analytics.maxHourly : 0;
              return (
                <div key={h} title={`${h}:00 — ${count} orders`}
                  className="aspect-square rounded-sm cursor-default transition-all"
                  style={{ backgroundColor: `rgba(236, 63, 40, ${Math.max(intensity * 0.9, count > 0 ? 0.08 : 0)})` }} />
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[7px] text-white/20">00:00</span>
            <span className="text-[7px] text-white/20">12:00</span>
            <span className="text-[7px] text-white/20">23:00</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Items */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-5">Top Selling Items</p>
          {analytics.topItems.length === 0 ? (
            <p className="text-white/20 text-xs text-center py-6">No data yet</p>
          ) : (
            <div className="space-y-3">
              {analytics.topItems.map(([name, qty], i) => {
                const pct = (qty / analytics.topItems[0][1]) * 100;
                return (
                  <div key={name} className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-white/20 w-4 shrink-0">#{i + 1}</span>
                      <span className="flex-1 text-sm font-black truncate">{name}</span>
                      <span className="text-primary font-black text-sm shrink-0">{qty} <span className="text-white/30 text-xs">sold</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 shrink-0" />
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/60 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status breakdown */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-5">Status Breakdown</p>
          <div className="space-y-4">
            {(Object.entries(STATUS_CONFIG) as [keyof typeof STATUS_CONFIG, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([s, cfg]) => {
              const count = analytics.periodOrders.filter(o => o.status === s).length;
              const pct = analytics.periodOrders.length ? Math.round((count / analytics.periodOrders.length) * 100) : 0;
              return (
                <div key={s} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className={`font-black ${cfg.color.split(' ')[1]}`}>{cfg.label}</span>
                    <span className="text-white/40">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${cfg.dot} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

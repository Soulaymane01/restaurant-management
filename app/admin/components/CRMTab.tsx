'use client';

import { useState, useMemo } from 'react';
import { Order, Client } from './types';
import { branches } from '../../lib/branch-data';

type Props = { orders: Order[] };

function getSegment(orderCount: number, totalSpent: number): Client['segment'] {
  if (totalSpent >= 500 || orderCount >= 5) return 'vip';
  if (orderCount >= 2) return 'regular';
  return 'new';
}

const SEGMENT_CONFIG = {
  vip:     { label: '⭐ VIP',     color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  regular: { label: '✅ Regular', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  new:     { label: '🆕 New',     color: 'bg-green-100 text-green-700 border-green-200' },
};

function exportClientsCSV(clients: Client[]) {
  const headers = ['Name', 'Phone', 'Orders', 'Total Spent (DH)', 'Avg Order (DH)', 'Segment', 'Fav Branch', 'Last Order'];
  const rows = clients.map(c => [
    c.name, c.phone, c.orderCount, c.totalSpent,
    c.orderCount ? Math.round(c.totalSpent / c.orderCount) : 0,
    c.segment, c.favBranch, new Date(c.lastOrder).toLocaleDateString(),
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `mahrousa_clients_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
}

export default function CRMTab({ orders }: Props) {
  const [sort, setSort] = useState<'spent' | 'orders' | 'recent'>('spent');
  const [segmentFilter, setSegmentFilter] = useState<'all' | 'vip' | 'regular' | 'new'>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const clients: Client[] = useMemo(() => {
    const map: Record<string, { name: string; phone: string; orders: Order[] }> = {};
    orders.forEach(o => {
      if (!map[o.phone]) map[o.phone] = { name: o.customer, phone: o.phone, orders: [] };
      map[o.phone].orders.push(o);
    });

    return Object.values(map).map(c => {
      const activeOrders = c.orders.filter(o => o.status !== 'cancelled');
      const totalSpent = activeOrders.reduce((s, o) => s + o.total, 0);
      const orderCount = c.orders.length;
      const bc: Record<string, number> = {};
      c.orders.forEach(o => { bc[o.branch] = (bc[o.branch] || 0) + 1; });
      const topBranch = Object.entries(bc).sort((a, b) => b[1] - a[1])[0];
      return {
        name: c.name, phone: c.phone, orders: c.orders, totalSpent, orderCount,
        lastOrder: c.orders.sort((a, b) => b.id - a.id)[0]?.date,
        favBranch: branches.find(b => b.id === topBranch?.[0])?.names.en || '—',
        segment: getSegment(orderCount, totalSpent),
      };
    })
    .filter(c => segmentFilter === 'all' || c.segment === segmentFilter)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))
    .sort((a, b) => {
      if (sort === 'spent')   return b.totalSpent - a.totalSpent;
      if (sort === 'orders')  return b.orderCount - a.orderCount;
      return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime();
    });
  }, [orders, sort, segmentFilter, search]);

  const stats = useMemo(() => {
    const all = clients;
    const vip = all.filter(c => c.segment === 'vip').length;
    const avgSpend = all.length ? Math.round(all.reduce((s, c) => s + c.totalSpent, 0) / all.length) : 0;
    return { total: all.length, vip, avgSpend };
  }, [clients]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-secondary">Clients</h1>
          <p className="text-foreground/30 text-xs uppercase tracking-widest mt-1">{stats.total} customers · {stats.vip} VIP</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => exportClientsCSV(clients)} className="flex items-center gap-2 px-4 py-2 bg-secondary/5 border border-secondary/10 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-secondary/10 transition-all text-secondary/60">
            ⬇️ Export CSV
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Clients', value: stats.total, accent: 'text-secondary' },
          { label: 'VIP Clients', value: stats.vip, accent: 'text-yellow-600' },
          { label: 'Avg Lifetime Value', value: `${stats.avgSpend} DH`, accent: 'text-primary' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <p className="text-[8px] font-black uppercase tracking-widest text-foreground/30 mb-1">{s.label}</p>
            <p className={`text-2xl font-black tracking-tighter ${s.accent}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or phone…"
          className="bg-secondary/5 border border-secondary/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 flex-1 min-w-48 placeholder-secondary/20 text-secondary transition-colors" />
        <div className="flex bg-secondary/5 border border-secondary/10 p-1 rounded-2xl">
          {(['all', 'vip', 'regular', 'new'] as const).map(s => (
            <button key={s} onClick={() => setSegmentFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-[9px] uppercase font-black tracking-wider transition-all ${segmentFilter === s ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/30 hover:text-secondary'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex bg-secondary/5 border border-secondary/10 p-1 rounded-2xl">
          {([['spent', 'Spend'], ['orders', 'Orders'], ['recent', 'Recent']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setSort(k)}
              className={`px-3 py-1.5 rounded-xl text-[9px] uppercase font-black tracking-wider transition-all ${sort === k ? 'bg-secondary/10 text-secondary' : 'text-foreground/30 hover:text-secondary'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Client Grid */}
      {clients.length === 0 ? (
        <div className="text-center py-20 text-white/20">
          <div className="text-5xl mb-4">👥</div>
          <p className="font-black uppercase tracking-widest text-sm">No clients match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((c, i) => {
            const segCfg = SEGMENT_CONFIG[c.segment];
            const clientOrders = c.orders.sort((a, b) => b.id - a.id).slice(0, 3);
            const isExp = expanded === c.phone;
            const avgOrder = c.orderCount ? Math.round(c.totalSpent / c.orderCount) : 0;

            return (
              <div key={c.phone} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-secondary/20 transition-all shadow-sm">
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black leading-tight text-secondary">{c.name}</h3>
                          {i < 3 && <span className="text-[8px]">{['🥇','🥈','🥉'][i]}</span>}
                        </div>
                        <p className="text-primary text-xs font-black">{c.phone}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full border shrink-0 ${segCfg.color}`}>{segCfg.label}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                    {[
                      { label: 'Orders', value: c.orderCount },
                      { label: 'Lifetime', value: `${c.totalSpent} DH`, accent: 'text-primary' },
                      { label: 'Avg Order', value: `${avgOrder} DH` },
                      { label: 'Fav Branch', value: c.favBranch },
                    ].map(f => (
                      <div key={f.label}>
                        <p className="text-[7px] uppercase tracking-widest text-foreground/25 mb-0.5">{f.label}</p>
                        <p className={`font-black text-sm text-secondary ${(f as any).accent || ''}`}>{f.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent orders toggle */}
                  <button onClick={() => setExpanded(isExp ? null : c.phone)}
                    className="w-full text-[9px] font-black uppercase tracking-wider text-white/30 hover:text-white transition-colors py-1 border-t border-white/5">
                    {isExp ? '▲ Hide orders' : `▼ See last ${Math.min(3, c.orders.length)} orders`}
                  </button>

                  {isExp && (
                    <div className="space-y-2">
                      {clientOrders.map(o => (
                        <div key={o.id} className="flex items-center justify-between bg-white/[0.02] rounded-xl px-3 py-2">
                          <span className="text-[9px] text-white/40">#{String(o.id).slice(-5)}</span>
                          <span className="text-[9px] text-white/60 font-black">{o.total} DH</span>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full bg-white/5 text-white/40`}>{o.status}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <a href={`https://wa.me/${c.phone.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all text-[8px] font-black uppercase tracking-wider">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      WhatsApp
                    </a>
                    <a href={`tel:${c.phone}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all text-[8px] font-black uppercase tracking-wider">
                      📞
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

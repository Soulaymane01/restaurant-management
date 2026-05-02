'use client';

import { useState, useMemo } from 'react';
import { Order, OrderStatus, STATUS_CONFIG, ORDERS_KEY } from './types';
import { branches } from '../../lib/branch-data';

type Props = {
  orders: Order[];
  setOrders: (o: Order[]) => void;
  onNewNotification: (msg: string) => void;
};

function printReceipt(order: Order) {
  const branch = branches.find(b => b.id === order.branch);
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`
    <html><head><title>Receipt #${order.id}</title>
    <style>
      body { font-family: monospace; padding: 20px; max-width: 300px; margin: 0 auto; }
      h2 { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; }
      .row { display: flex; justify-content: space-between; margin: 4px 0; }
      .total { font-weight: bold; border-top: 2px solid #000; padding-top: 8px; margin-top: 8px; }
      .footer { text-align: center; margin-top: 20px; font-size: 11px; }
    </style></head><body>
    <h2>MAHROUSA</h2>
    <p style="text-align:center; font-size:12px">${branch?.names.en || order.branch}</p>
    <p style="text-align:center; font-size:11px">Order #${String(order.id).slice(-5)}</p>
    <p style="text-align:center; font-size:11px">${new Date(order.date).toLocaleString()}</p>
    <hr/>
    <p><strong>${order.customer}</strong></p>
    <p>${order.phone}</p>
    <p>${order.address}</p>
    <hr/>
    ${order.items.map(i => `<div class="row"><span>${i.name} ×${i.quantity}</span><span>${i.price * i.quantity} DH</span></div>`).join('')}
    <div class="row total"><span>TOTAL</span><span>${order.total} DH</span></div>
    ${order.note ? `<p style="font-size:11px; margin-top:8px">Note: ${order.note}</p>` : ''}
    <div class="footer">Merci / شكرًا · Tangier, Morocco</div>
    </body></html>
  `);
  win.document.close();
  win.print();
}

function exportCSV(orders: Order[]) {
  const headers = ['ID', 'Date', 'Customer', 'Phone', 'Branch', 'Address', 'Items', 'Total', 'Status', 'Note'];
  const rows = orders.map(o => [
    o.id, new Date(o.date).toLocaleString(), o.customer, o.phone, o.branch, o.address,
    o.items.map(i => `${i.name}x${i.quantity}`).join('; '),
    o.total, o.status, o.note || '',
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mahrousa_orders_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

export default function OrdersTab({ orders, setOrders, onNewNotification }: Props) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [noteEditing, setNoteEditing] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<OrderStatus>('confirmed');
  const [showBulk, setShowBulk] = useState(false);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  };

  const updateStatus = (id: number, status: OrderStatus) => {
    saveOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    onNewNotification(`Order #${String(id).slice(-5)} updated to ${status}`);
  };

  const saveNote = (id: number) => {
    saveOrders(orders.map(o => o.id === id ? { ...o, note: noteText } : o));
    setNoteEditing(null);
  };

  const deleteOrder = (id: number) => {
    if (!confirm('Delete this order permanently?')) return;
    saveOrders(orders.filter(o => o.id !== id));
  };

  const toggleSelect = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const bulkUpdate = () => {
    saveOrders(orders.map(o => selected.has(o.id) ? { ...o, status: bulkStatus } : o));
    setSelected(new Set());
    setShowBulk(false);
    onNewNotification(`${selected.size} orders updated to ${bulkStatus}`);
  };

  const filtered = useMemo(() =>
    orders
      .filter(o => statusFilter === 'all' || o.status === statusFilter)
      .filter(o => branchFilter === 'all' || o.branch === branchFilter)
      .filter(o => !search || [o.customer, o.phone, String(o.id)].some(v => v.toLowerCase().includes(search.toLowerCase())))
      .sort((a, b) => b.id - a.id),
    [orders, statusFilter, branchFilter, search]
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Orders</h1>
          <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{filtered.length} results</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => exportCSV(orders)} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/8 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white/10 transition-all">
            ⬇️ Export CSV
          </button>
          {selected.size > 0 && (
            <button onClick={() => setShowBulk(v => !v)} className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-xl text-[9px] font-black uppercase tracking-wider text-primary hover:bg-primary/30 transition-all">
              ☑ Bulk ({selected.size})
            </button>
          )}
        </div>
      </div>

      {/* Bulk status panel */}
      {showBulk && selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <span className="text-[9px] font-black uppercase tracking-wider text-primary">Set {selected.size} orders to:</span>
          <select value={bulkStatus} onChange={e => setBulkStatus(e.target.value as OrderStatus)}
            className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs outline-none text-white cursor-pointer">
            {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map(s => <option key={s} value={s} className="bg-black">{STATUS_CONFIG[s].label}</option>)}
          </select>
          <button onClick={bulkUpdate} className="px-4 py-2 bg-primary rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all">Apply</button>
          <button onClick={() => { setSelected(new Set()); setShowBulk(false); }} className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white/10 transition-all">Cancel</button>
        </div>
      )}

      {/* Quick status strip */}
      <div className="grid grid-cols-5 gap-2">
        {(Object.entries(STATUS_CONFIG) as [OrderStatus, typeof STATUS_CONFIG[OrderStatus]][]).map(([s, cfg]) => (
          <button key={s} onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
            className={`flex flex-col items-center py-3 px-2 rounded-xl border transition-all ${statusFilter === s ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/[0.02] hover:border-white/15'}`}>
            <div className={`w-2 h-2 rounded-full ${cfg.dot} mb-1`} />
            <span className={`text-lg font-black ${cfg.color.split(' ')[1]}`}>{orders.filter(o => o.status === s).length}</span>
            <span className="text-[7px] font-black uppercase tracking-widest text-white/25 mt-1">{cfg.label}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customer, phone, ID…"
          className="bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 flex-1 min-w-48 placeholder-white/20 text-white transition-colors" />
        <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)}
          className="bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm outline-none text-white/70 cursor-pointer">
          <option value="all" className="bg-black">All Branches</option>
          {branches.map(b => <option key={b.id} value={b.id} className="bg-black">{b.names.en}</option>)}
        </select>
      </div>

      {/* Order list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/20">
          <div className="text-5xl mb-4">📭</div>
          <p className="font-black uppercase tracking-widest text-sm">No orders found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(order => {
            const cfg = STATUS_CONFIG[order.status];
            const isExp = expanded === order.id;
            const branch = branches.find(b => b.id === order.branch);
            const isSel = selected.has(order.id);
            return (
              <div key={order.id} className={`bg-white/[0.02] border rounded-2xl overflow-hidden transition-all ${isSel ? 'border-primary/30 bg-primary/5' : 'border-white/5 hover:border-white/10'}`}>
                {/* Order header row */}
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <input type="checkbox" checked={isSel} onChange={() => toggleSelect(order.id)} className="w-4 h-4 accent-primary rounded shrink-0" />
                  <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                  <span className="text-primary font-black text-sm shrink-0">#{String(order.id).slice(-5)}</span>
                  <span className="font-black truncate">{order.customer}</span>
                  <span className="text-white/30 text-xs hidden sm:block">{order.phone}</span>
                  <div className="flex items-center gap-2 ml-auto shrink-0">
                    <span className="text-white/20 text-xs hidden md:block">{branch?.names.en}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${cfg.color}`}>{cfg.label}</span>
                    <span className="font-black">{order.total}<span className="text-xs text-white/30 ml-1">DH</span></span>
                    <button onClick={() => setExpanded(isExp ? null : order.id)} className="text-white/20 hover:text-white transition-colors ml-1">
                      {isExp ? '▲' : '▼'}
                    </button>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExp && (
                  <div className="border-t border-white/5 p-5 space-y-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {[
                        { label: 'Customer', value: order.customer },
                        { label: 'Phone', value: order.phone },
                        { label: 'Address', value: order.address || '—' },
                        { label: 'Date', value: new Date(order.date).toLocaleString() },
                      ].map(f => (
                        <div key={f.label}>
                          <p className="text-[8px] uppercase tracking-widest text-white/30 mb-1">{f.label}</p>
                          <p className="font-medium text-sm leading-snug">{f.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-[8px] uppercase tracking-widest text-white/30 mb-2">Items</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <span key={i} className="bg-white/5 border border-white/8 px-3 py-1.5 rounded-xl text-xs font-black">
                            {item.name} <span className="text-primary">×{item.quantity}</span>
                            <span className="text-white/30 ml-1">({item.price * item.quantity} DH)</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <p className="text-[8px] uppercase tracking-widest text-white/30 mb-2">Order Note</p>
                      {noteEditing === order.id ? (
                        <div className="flex gap-2">
                          <input value={noteText} onChange={e => setNoteText(e.target.value)}
                            className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary/50 text-white placeholder-white/20"
                            placeholder="Add internal note…" />
                          <button onClick={() => saveNote(order.id)} className="px-4 py-2 bg-primary rounded-xl text-[9px] font-black uppercase hover:bg-white hover:text-black transition-all">Save</button>
                          <button onClick={() => setNoteEditing(null)} className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase hover:bg-white/10 transition-all">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => { setNoteEditing(order.id); setNoteText(order.note || ''); }}
                          className="text-xs text-white/30 hover:text-white transition-colors italic">
                          {order.note || '+ Add note…'}
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <p className="text-[9px] uppercase tracking-widest text-white/30 mr-1">Status:</p>
                      {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map(s => (
                        <button key={s} onClick={() => updateStatus(order.id, s)} disabled={order.status === s}
                          className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${order.status === s ? 'bg-primary text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'} disabled:cursor-default`}>
                          {STATUS_CONFIG[s].label}
                        </button>
                      ))}
                      <div className="flex gap-2 ml-auto">
                        <button onClick={() => printReceipt(order)} className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                          🖨️ Print
                        </button>
                        <a href={`https://wa.me/${order.phone.replace(/\D/g,'')}?text=${encodeURIComponent(`Hi ${order.customer}! Your order #${String(order.id).slice(-5)} is ${order.status}. Total: ${order.total} DH. Thank you!`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all">
                          💬 WhatsApp
                        </a>
                        <button onClick={() => deleteOrder(order.id)} className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

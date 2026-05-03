'use client';

import { useState, useMemo } from 'react';
import { MenuItem, MENU_KEY } from './types';
import { menuCategories, menuItems as initialMenuItems } from '../../lib/branch-data';

type Props = {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
};

const BLANK_ITEM: Partial<MenuItem> = {
  names: { en: '', fr: '', ar: '' },
  descriptions: { en: '', fr: '', ar: '' },
  price: 0,
  categoryId: 'burgers',
  image: '',
  featured: false,
  available: true,
  options: [],
};

export default function MenuTab({ menuItems, setMenuItems }: Props) {
  const [catFilter, setCatFilter] = useState('all');
  const [search, setSearch]       = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem]         = useState<Partial<MenuItem> | null>(null);
  const [previewImg, setPreviewImg]   = useState<string | null>(null);
  const [bulkPct, setBulkPct]         = useState('');
  const [showBulkPrice, setShowBulkPrice] = useState(false);

  const save = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem(MENU_KEY, JSON.stringify(items));
  };

  const updateField = (id: number, field: keyof MenuItem, value: any) =>
    save(menuItems.map(i => i.id === id ? { ...i, [field]: value } : i));

  const toggleFeatured  = (id: number) => updateField(id, 'featured',  !menuItems.find(i => i.id === id)?.featured);
  const toggleAvailable = (id: number) => updateField(id, 'available', !menuItems.find(i => i.id === id)?.available);

  const deleteItem = (id: number) => {
    if (!confirm('Delete this item?')) return;
    save(menuItems.filter(i => i.id !== id));
  };

  const commitEdit = () => {
    if (!editingItem) return;
    save(menuItems.map(i => i.id === editingItem.id ? editingItem : i));
    setEditingItem(null);
  };

  const commitNew = () => {
    if (!newItem?.names?.en) { alert('Item name (EN) is required.'); return; }
    const item: MenuItem = {
      id: Date.now(),
      featured: false,
      available: true,
      options: [],
      names: { en: '', fr: '', ar: '' },
      descriptions: { en: '', fr: '', ar: '' },
      price: 0,
      image: '',
      categoryId: 'burgers',
      ...newItem,
    };
    save([...menuItems, item]);
    setNewItem(null);
  };

  const applyBulkPrice = () => {
    const pct = parseFloat(bulkPct);
    if (isNaN(pct)) return;
    save(menuItems.map(i => ({ ...i, price: Math.round(i.price * (1 + pct / 100)) })));
    setBulkPct('');
    setShowBulkPrice(false);
  };

  const filtered = useMemo(() =>
    menuItems
      .filter(i => catFilter === 'all' || i.categoryId === catFilter)
      .filter(i => !search || (i.names?.en || '').toLowerCase().includes(search.toLowerCase())),
    [menuItems, catFilter, search]
  );

  const cats = menuCategories.filter(c => c.id !== 'featured');
  const itemsByCat = useMemo(() => {
    const out: Record<string, number> = {};
    cats.forEach(c => { out[c.id] = menuItems.filter(i => i.categoryId === c.id).length; });
    return out;
  }, [menuItems]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Image Preview Modal */}
      {previewImg && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="Preview" className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-secondary">Menu</h1>
          <p className="text-foreground/30 text-xs uppercase tracking-widest mt-1">{menuItems.length} items · {menuItems.filter(i => !i.available).length} unavailable</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowBulkPrice(v => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/5 border border-secondary/10 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-secondary/10 transition-all text-secondary/60">
            📈 Bulk Price
          </button>
          <button onClick={() => setNewItem({ ...BLANK_ITEM })}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all">
            + Add Item
          </button>
        </div>
      </div>

      {/* Bulk Price Panel */}
      {showBulkPrice && (
        <div className="flex flex-wrap items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm">
          <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Adjust all prices by %</p>
          <input type="number" value={bulkPct} onChange={e => setBulkPct(e.target.value)} placeholder="e.g. +10 or -5"
            className="w-32 bg-secondary/5 border border-secondary/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary/50 text-secondary" />
          <button onClick={applyBulkPrice} className="px-5 py-2 bg-primary rounded-xl text-[9px] font-black uppercase text-white hover:bg-secondary transition-all">Apply to All</button>
          <button onClick={() => setShowBulkPrice(false)} className="px-5 py-2 bg-secondary/5 rounded-xl text-[9px] font-black uppercase hover:bg-secondary/10 transition-all">Cancel</button>
          <p className="text-[8px] text-white/20 italic">Positive = increase, negative = decrease. Applied to current filtered view.</p>
        </div>
      )}

      {/* Category Pills with counts */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button onClick={() => setCatFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap border transition-all ${catFilter === 'all' ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/5 border-secondary/5 text-foreground/30 hover:text-secondary'}`}>
          All <span className="bg-foreground/5 px-1.5 py-0.5 rounded-full">{menuItems.length}</span>
        </button>
        {cats.map(c => (
          <button key={c.id} onClick={() => setCatFilter(c.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap border transition-all ${catFilter === c.id ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/5 border-secondary/5 text-foreground/30 hover:text-secondary'}`}>
            {c.icon} {c.name} <span className="bg-foreground/5 px-1.5 py-0.5 rounded-full">{itemsByCat[c.id] || 0}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items by name…"
        className="w-full bg-secondary/5 border border-secondary/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 placeholder-secondary/20 text-secondary transition-colors" />

      {/* New Item Form */}
      {newItem && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-black uppercase tracking-widest text-sm text-primary">➕ New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(['en', 'fr', 'ar'] as const).map(lang => (
              <input key={lang} value={(newItem.names as any)?.[lang] || ''} onChange={e => setNewItem({ ...newItem, names: { ...(newItem.names as any), [lang]: e.target.value } })}
                placeholder={`Name (${lang.toUpperCase()})`}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 placeholder-white/20 text-white" />
            ))}
            {(['en', 'fr', 'ar'] as const).map(lang => (
              <textarea key={`d-${lang}`} value={(newItem.descriptions as any)?.[lang] || ''} onChange={e => setNewItem({ ...newItem, descriptions: { ...(newItem.descriptions as any), [lang]: e.target.value } })}
                placeholder={`Description (${lang.toUpperCase()})`} rows={2}
                className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 placeholder-white/20 text-white resize-none" />
            ))}
            <input value={newItem.image || ''} onChange={e => setNewItem({ ...newItem, image: e.target.value })} placeholder="Image URL"
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 placeholder-white/20 text-white md:col-span-2" />
            <input type="number" value={newItem.price || ''} onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} placeholder="Price DH"
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/50 placeholder-white/20 text-white" />
            <select value={newItem.categoryId} onChange={e => setNewItem({ ...newItem, categoryId: e.target.value })}
              className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none text-white cursor-pointer md:col-span-2">
              {cats.map(c => <option key={c.id} value={c.id} className="bg-black">{c.icon} {c.name}</option>)}
            </select>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-black cursor-pointer">
                <input type="checkbox" checked={!!newItem.featured} onChange={e => setNewItem({ ...newItem, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                Featured 🔥
              </label>
              <label className="flex items-center gap-2 text-sm font-black cursor-pointer">
                <input type="checkbox" checked={newItem.available !== false} onChange={e => setNewItem({ ...newItem, available: e.target.checked })} className="w-4 h-4 accent-primary" />
                Available
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={commitNew} className="px-6 py-2.5 bg-primary rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all">Save Item</button>
            <button onClick={() => setNewItem(null)} className="px-6 py-2.5 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white/10 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filtered.map(item => {
          const isEditing = editingItem?.id === item.id;
          const cat = cats.find(c => c.id === item.categoryId);
          const isUnavailable = item.available === false;

          if (isEditing) {
            return (
              <div key={item.id} className="bg-primary/10 border border-primary/30 rounded-2xl p-5 space-y-3 lg:col-span-2">
                <h4 className="font-black uppercase tracking-widest text-xs text-primary">✏️ Editing: {item.names.en}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['en', 'fr', 'ar'] as const).map(lang => (
                    <input key={lang} value={editingItem?.names?.[lang] || ''} onChange={e => setEditingItem({ ...editingItem!, names: { ...editingItem!.names, [lang]: e.target.value } })}
                      placeholder={`Name ${lang.toUpperCase()}`}
                      className="bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 text-white" />
                  ))}
                  {(['en', 'fr', 'ar'] as const).map(lang => (
                    <textarea key={`d-${lang}`} value={editingItem?.descriptions?.[lang] || ''} onChange={e => setEditingItem({ ...editingItem!, descriptions: { ...editingItem!.descriptions, [lang]: e.target.value } })}
                      placeholder={`Description ${lang.toUpperCase()}`} rows={2}
                      className="bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 text-white resize-none" />
                  ))}
                  <input value={editingItem?.image || ''} onChange={e => setEditingItem({ ...editingItem!, image: e.target.value })}
                    placeholder="Image URL" className="bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 text-white md:col-span-2" />
                  <input type="number" value={editingItem?.price || ''} onChange={e => setEditingItem({ ...editingItem!, price: parseFloat(e.target.value) })}
                    className="bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary/50 text-white" placeholder="Price DH" />
                  <select value={editingItem?.categoryId} onChange={e => setEditingItem({ ...editingItem!, categoryId: e.target.value })}
                    className="bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white cursor-pointer">
                    {cats.map(c => <option key={c.id} value={c.id} className="bg-black">{c.name}</option>)}
                  </select>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm font-black cursor-pointer">
                      <input type="checkbox" checked={!!editingItem?.featured} onChange={e => setEditingItem({ ...editingItem!, featured: e.target.checked })} className="accent-primary" />
                      Featured 🔥
                    </label>
                    <label className="flex items-center gap-2 text-sm font-black cursor-pointer">
                      <input type="checkbox" checked={editingItem?.available !== false} onChange={e => setEditingItem({ ...editingItem!, available: e.target.checked })} className="accent-primary" />
                      Available
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={commitEdit} className="px-5 py-2 bg-primary rounded-xl text-[9px] font-black uppercase hover:bg-white hover:text-black transition-all">Save Changes</button>
                  <button onClick={() => setEditingItem(null)} className="px-5 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase hover:bg-white/10 transition-all">Cancel</button>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className={`bg-card border rounded-2xl overflow-hidden transition-all hover:border-secondary/20 shadow-sm ${isUnavailable ? 'opacity-50 border-red-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-4 p-4">
                <div className="relative shrink-0 cursor-pointer" onClick={() => setPreviewImg(item.image)}>
                  <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-white/5"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=60'; }} />
                  <div className="absolute inset-0 rounded-xl bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all">
                    <span className="text-white opacity-0 hover:opacity-100 text-xs">🔍</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h4 className="font-black truncate text-secondary">{item.names?.en}</h4>
                    {item.featured && <span className="text-[7px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-black uppercase">🔥 Featured</span>}
                    {isUnavailable && <span className="text-[7px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-black uppercase">❌ Out of Stock</span>}
                  </div>
                  <p className="text-[9px] text-foreground/30 uppercase tracking-wider">{cat?.icon} {cat?.name}</p>
                  <p className="text-primary font-black mt-1 text-sm">{item.price} <span className="text-foreground/20 text-xs">DH</span></p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => toggleAvailable(item.id)} title="Toggle availability"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${isUnavailable ? 'bg-red-500/10 text-red-500 font-bold' : 'bg-secondary/5 text-foreground/30 hover:text-secondary'}`}>
                    {isUnavailable ? '❌' : '✅'}
                  </button>
                  <button onClick={() => toggleFeatured(item.id)} title="Toggle featured"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${item.featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/20 hover:text-white'}`}>
                    🔥
                  </button>
                  <button onClick={() => setEditingItem({ ...item })}
                    className="w-8 h-8 rounded-xl bg-white/5 text-white/30 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all">
                    ✏️
                  </button>
                  <button onClick={() => deleteItem(item.id)}
                    className="w-8 h-8 rounded-xl bg-red-500/5 text-red-400/40 hover:text-red-400 hover:bg-red-500/15 flex items-center justify-center transition-all">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

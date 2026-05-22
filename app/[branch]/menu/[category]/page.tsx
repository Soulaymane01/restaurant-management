'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/app/components/LanguageProvider';
import { useCart } from '@/app/components/CartProvider';
import { menuCategories, menuItems as initialMenuItems } from '@/app/lib/branch-data';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ItemDetailModal from '@/app/components/ItemDetailModal';

export default function CategoryItemsPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const { cart, addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('curated');
  const [priceFilter, setPriceFilter] = useState('all');

  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('@/app/actions/menu').then(m => m.getMenuItems().then(items => {
      if (items && items.length > 0) setMenuItems(items);
    }));
  }, []);

  const category = menuCategories.find(c => c.id === params.category);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item: any) => {
      const itemName = item.names?.[language as keyof typeof item.names] || item.nameFr || item.nameEn || item.name || '';
      const itemDesc = item.descriptions?.[language as keyof typeof item.descriptions] || item.descFr || item.descEn || item.description || '';
      
      const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           itemDesc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = params.category === 'featured' ? item.featured : item.categoryId === params.category;
      
      const matchesPrice = priceFilter === 'all' 
        ? true 
        : priceFilter === 'under-40' 
          ? item.price < 40 
          : priceFilter === '40-60' 
            ? (item.price >= 40 && item.price <= 60) 
            : item.price > 60;
      
      return matchesSearch && matchesCategory && matchesPrice && item.available !== false;
    });
  }, [params.category, searchQuery, priceFilter, menuItems, language]);

  const handleQuickAdd = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    const localizedName = item.names?.[language as keyof typeof item.names] || item.nameFr || item.nameEn || item.name;
    addToCart({ ...item, name: localizedName });
  };

  if (!category) return (
    <div className="p-8 text-center bg-black h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-black text-white mb-8 serif italic">Category Not Found</h2>
      <Link href={`/${params.branch}/menu`} className="btn-primary">Return to Menu</Link>
    </div>
  );

  const categoryName = (t.categories as any)[category.id] || category.name;

  return (
    <div className="pt-40 md:pt-60 container relative min-h-screen px-8 md:px-12 pb-64">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -z-10" />
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-10 animate-fade-in">
        <div className="max-w-3xl space-y-8">
          <Link 
            href={`/${params.branch}/menu`}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-secondary/40 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            ← {t.menu_labels?.back_to_categories || 'Retour aux catégories'}
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-6xl md:text-8xl">{category.icon}</span>
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none text-secondary serif italic">
              {categoryName}
            </h2>
          </div>
        </div>
      </div>

      {/* Search & Filter Control Center */}
      <div className="bg-card/40 border border-border/80 rounded-[2.5rem] p-6 md:p-8 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)] backdrop-blur-xl space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          {/* Search Input Box */}
          <div className="relative w-full lg:max-w-md group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-40 text-lg transition-opacity group-focus-within:opacity-80">🔍</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu_labels?.search || 'Rechercher...'}
              className="w-full bg-secondary/5 border border-secondary/10 py-4 pl-12 pr-12 rounded-full outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-base tracking-tight text-secondary placeholder-secondary/35"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary transition-colors text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Action Row containing Price Filters & Sorting */}
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between lg:justify-end">
            
            {/* Price Range Filters */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 px-1">
                {t.menu_labels?.price_filter || 'Filtre de prix'}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: t.menu_labels?.all || 'Tous' },
                  { id: 'under-40', label: t.menu_labels?.under_40 || 'Moins de 40 DH' },
                  { id: '40-60', label: t.menu_labels?.between_40_60 || '40 - 60 DH' },
                  { id: 'over-60', label: t.menu_labels?.over_60 || 'Plus de 60 DH' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setPriceFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border transition-all duration-300 cursor-pointer ${
                      priceFilter === filter.id
                        ? 'bg-primary text-white border-primary shadow-[0_5px_15px_rgba(236,63,40,0.15)] scale-[1.02]'
                        : 'bg-secondary/5 border-secondary/10 text-secondary/60 hover:text-secondary hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting Control */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 px-1">
                {t.menu_labels?.sort_by || 'Trier par'}
              </span>
              <div className="flex gap-2">
                {[
                  { id: 'curated', label: t.menu_labels?.curated || 'Recommandé' },
                  { id: 'price-low', label: t.menu_labels?.price_low || 'Prix Min' },
                  { id: 'price-high', label: t.menu_labels?.price_high || 'Prix Max' }
                ].map(sort => (
                  <button
                    key={sort.id}
                    onClick={() => setSortType(sort.id)}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border transition-all duration-300 cursor-pointer ${
                      sortType === sort.id
                        ? 'bg-primary text-white border-primary shadow-[0_5px_15px_rgba(236,63,40,0.15)] scale-[1.02]'
                        : 'bg-secondary/5 border-secondary/10 text-secondary/60 hover:text-secondary hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <span className="text-6xl block opacity-20">🍽️</span>
          <p className="text-foreground/40 font-light text-xl">Aucun article trouvé dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-x-12 md:gap-y-24">
          {filteredItems
            .sort((a: any, b: any) => {
              if (sortType === 'price-low') return a.price - b.price;
              if (sortType === 'price-high') return b.price - a.price;
              return 0;
            })
            .map((item: any, idx: number) => {
              const itemName = item.names?.[language as keyof typeof item.names] || item.nameFr || item.nameEn || item.name || '';
              const itemDesc = item.descriptions?.[language as keyof typeof item.descriptions] || item.descFr || item.descEn || item.description || '';
              
              return (
              <div key={item.id} className="group animate-fade-in space-y-6" style={{ animationDelay: `${0.05 * idx}s` }}>
                {/* Image Card */}
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-border bg-card shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-1000 group-hover:scale-[1.02] group-hover:border-primary/30 cursor-pointer"
                >
                  <img src={item.image} alt={itemName} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* Item name */}
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight serif italic text-white drop-shadow-lg">{itemName}</h3>
                  </div>
                </div>

                {/* Info Row */}
                <div className="px-2 flex items-center gap-4">
                  <div className="shrink-0 text-left">
                    <span className="text-xl font-black text-primary tracking-tighter leading-none block">{item.price}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-secondary/40">DH</span>
                  </div>

                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="group relative flex-1 py-3 overflow-hidden rounded-full bg-secondary/5 border border-secondary/10 text-[8px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-secondary transition-all text-center"
                  >
                    <span className="relative z-10">{t.menu_labels?.narrative || 'Découvrir'} →</span>
                    <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                  </button>

                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="shrink-0 w-12 h-12 bg-primary hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center text-xl font-black shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 outline-none border border-white/10"
                  >
                    +
                  </button>
                </div>

                {/* Description */}
                {itemDesc && (
                  <p className="px-2 text-xs font-light text-foreground/40 leading-relaxed italic serif line-clamp-2">"{itemDesc}"</p>
                )}
              </div>
            )})
          }
        </div>
      )}



      <ItemDetailModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../components/LanguageProvider';
import { useCart } from '../../components/CartProvider';
import { branches, menuCategories, menuItems as initialMenuItems } from '../../lib/branch-data';
import OrderModal from '../../components/OrderModal';
import ItemDetailModal from '../../components/ItemDetailModal';
import CartSidebar from '../../components/CartSidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function MenuPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const { cart, totalPrice, addToCart } = useCart();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [sortType, setSortType] = useState('curated');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const branch = branches.find(b => b.id === params.branch);

  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const customMenu = JSON.parse(localStorage.getItem('restaurant_custom_menu') || 'null');
    if (customMenu) setMenuItems(customMenu);
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item: any) => {
      const itemName = item.names?.[language as keyof typeof item.names] || item.name || '';
      const itemDesc = item.descriptions?.[language as keyof typeof item.descriptions] || item.description || '';
      
      const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           itemDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'featured' ? item.featured : item.categoryId === activeCategory;
      return matchesSearch && (searchQuery ? true : matchesCategory);
    });
  }, [activeCategory, searchQuery, menuItems, language]);

  const handleQuickAdd = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    const localizedName = item.names[language as keyof typeof item.names] || item.name;
    addToCart({ ...item, name: localizedName });
  };

  if (!branch) return (
    <div className="p-8 text-center bg-black h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-black text-white mb-8 serif italic">Branch Expired or Not Found</h2>
      <Link href="/" className="btn-primary">Return to Heritage</Link>
    </div>
  );

  const branchName = branch.names[language as keyof typeof branch.names] || branch.id;
  const branchLocation = branch.locations[language as keyof typeof branch.locations] || '';

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary">
      <Navbar scrolled={scrolled} variant="menu" onCartOpen={() => setIsCartSidebarOpen(true)} />

      {/* Page Canvas - Enhanced Spacing */}
      <div className="pt-56 md:pt-80 container relative min-h-screen px-8 md:px-12">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-20 animate-fade-in">
          <div className="max-w-3xl space-y-8">
            <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-2">{branchName}</p>
            <h2 className="text-8xl md:text-[11rem] font-black tracking-tighter leading-none mb-10 text-secondary">
              LE <span className="text-primary italic serif">MENU.</span>
            </h2>
            <div className="relative inline-block w-full">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu_labels.search}
                className="bg-transparent border-b border-secondary/10 py-6 pr-16 w-full md:w-[450px] outline-none focus:border-primary transition-all serif italic text-2xl md:text-3xl tracking-tight text-secondary"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 text-2xl">🔍</span>
            </div>
          </div>
          
          </div>
          
        {/* Dynamic Navigation & Insights */}
        <div className={`sticky top-28 z-[100] -mx-8 md:-mx-12 px-8 md:px-12 py-4 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-3xl border-b border-border shadow-2xl' : ''}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Minimalist Filters */}
            <nav className="flex gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto scroll-smooth py-1">
              {menuCategories.map((cat) => {
                const count = (menuItems as any[]).filter((item: any) => cat.id === 'featured' ? item.featured : item.categoryId === cat.id).length;
                const isActive = activeCategory === cat.id && !searchQuery;
                const translatedName = (t.categories as any)[cat.id] || cat.name;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                    className={`group flex items-center gap-4 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border ${
                      isActive 
                        ? 'bg-primary border-primary text-white shadow-lg' 
                        : 'bg-secondary/5 border-secondary/10 text-secondary/40 hover:border-secondary/20 hover:text-secondary'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span>{translatedName}</span>
                    {count > 0 && (
                      <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black ${isActive ? 'bg-white/10 text-white' : 'bg-secondary/10 text-secondary/40'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Advanced Filters & Sorting */}
            <div className="flex items-center gap-6 w-full lg:w-auto justify-end">
              <div className="flex items-center gap-4 bg-secondary/5 border border-secondary/10 p-2 rounded-full px-6 backdrop-blur-3xl group hover:border-primary/40 transition-colors">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t.menu_labels.sort_by}</span>
                <select 
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-transparent border-none outline-none font-black text-[9px] uppercase tracking-[0.1em] text-primary cursor-pointer hover:text-secondary transition-colors"
                >
                  <option value="curated" className="bg-white">{t.menu_labels.curated}</option>
                  <option value="price-low" className="bg-white">{t.menu_labels.price_low}</option>
                  <option value="price-high" className="bg-white">{t.menu_labels.price_high}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-x-12 md:gap-y-24 pb-64 pt-20">
          {filteredItems
            .sort((a: any, b: any) => {
              if (sortType === 'price-low') return a.price - b.price;
              if (sortType === 'price-high') return b.price - a.price;
              return 0;
            })
            .map((item: any, idx: number) => {
              const itemName = item.names?.[language as keyof typeof item.names] || item.name || '';
              const itemDesc = item.descriptions?.[language as keyof typeof item.descriptions] || item.description || '';
              
              return (
              <div key={item.id} className="group animate-fade-in space-y-6" style={{ animationDelay: `${0.1 * idx}s` }}>
                {/* Image Card — clean overlay, no button overlap */}
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-border bg-card shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-1000 group-hover:scale-[1.02] group-hover:border-primary/30 cursor-pointer"
                >
                  <img src={item.image} alt={itemName} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* Item name — full width, no button interference */}
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight serif italic text-white drop-shadow-lg">{itemName}</h3>
                  </div>
                </div>

                {/* Info Row — price, explore button, and + button all in one clean band */}
                <div className="px-2 flex items-center gap-4">
                  {/* Price block */}
                  <div className="shrink-0 text-left">
                    <span className="text-xl font-black text-primary tracking-tighter leading-none block">{item.price}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-secondary/40">DH</span>
                  </div>

                  {/* Explore button — fills remaining space */}
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="group relative flex-1 py-3 overflow-hidden rounded-full bg-secondary/5 border border-secondary/10 text-[8px] font-black uppercase tracking-[0.3em] text-secondary/40 hover:text-secondary transition-all text-center"
                  >
                    <span className="relative z-10">{t.menu_labels.narrative} →</span>
                    <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                  </button>

                  {/* Quick Add — clean hover, no overlay bleed */}
                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="shrink-0 w-12 h-12 bg-primary hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center text-xl font-black shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 outline-none border border-white/10"
                  >
                    +
                  </button>
                </div>

                {/* Description — subtle, beneath the action row */}
                <p className="px-2 text-xs font-light text-foreground/40 leading-relaxed italic serif line-clamp-2">"{itemDesc}"</p>
              </div>
            )})
          }
        </div>
      </div>

      <Footer />

      {/* Floating Cart CTA - Fully Solid */}
      {cart.length > 0 && (
        <div className="fixed bottom-12 left-0 right-0 flex justify-center px-6 z-[120] animate-fade-in">
          <button
            onClick={() => setIsCartSidebarOpen(true)}
            className="w-full max-w-lg bg-[#EC3F28] text-white py-6 px-10 rounded-full shadow-2xl flex justify-between items-center group active:scale-95 transition-all outline-none border border-white"
          >
            {/* Content Left */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-black text-sm shadow-xl group-hover:scale-110 transition-transform">
                {cart.length}
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/60">{t.order_labels.selection}</span>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em]">{t.cart_labels.subtitle}</span>
              </div>
            </div>

            {/* Content Right */}
            <div className="flex items-center gap-8">
              <div className="text-right pr-8 border-r border-white/40">
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/60 mb-0.5">{t.total}</span>
                <div className="font-black text-3xl tracking-tighter flex items-end gap-1 leading-none">
                  {totalPrice}
                  <span className="text-[10px] font-bold mb-0.5">DH</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-2xl group-hover:translate-x-2 transition-transform duration-500">
                →
              </div>
            </div>
          </button>
        </div>
      )}

      <ItemDetailModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} onCheckout={() => { setIsCartSidebarOpen(false); setIsOrderModalOpen(true); }} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} branch={branch} />
    </main>
  );
}
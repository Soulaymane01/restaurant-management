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

  const menuItems = useMemo(() => {
    if (typeof window === 'undefined') return initialMenuItems;
    const customMenu = JSON.parse(localStorage.getItem('restaurant_custom_menu') || 'null');
    return customMenu || initialMenuItems;
  }, []);

  const filteredItems = useMemo(() => {
    return (menuItems as any[] || initialMenuItems).filter((item: any) => {
      const itemName = item.names?.[language] || item.name || '';
      const itemDesc = item.descriptions?.[language] || item.description || '';
      
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

  const branchName = (branch as any).names[language as keyof typeof branch.names];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary">
      <Navbar scrolled={scrolled} variant="menu" onCartOpen={() => setIsCartSidebarOpen(true)} />

      {/* Page Canvas - Enhanced Spacing */}
      <div className="pt-56 md:pt-80 container relative min-h-screen px-8 md:px-12">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-20 animate-fade-in">
          <div className="max-w-3xl space-y-8">
            <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-2">{branchName}</p>
            <h2 className="text-8xl md:text-[11rem] font-black tracking-tighter leading-none mb-10">
              LE <span className="text-primary italic serif">MENU.</span>
            </h2>
            <div className="relative inline-block w-full">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu_labels.search}
                className="bg-transparent border-b border-white/10 py-6 pr-16 w-full md:w-[450px] outline-none focus:border-primary transition-all serif italic text-2xl md:text-3xl tracking-tight"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 text-2xl">🔍</span>
            </div>
          </div>
          
          </div>
          
        {/* Dynamic Navigation & Insights */}
        <div className={`sticky top-28 z-[100] -mx-8 md:-mx-12 px-8 md:px-12 py-6 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl' : ''}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Categories */}
            <nav className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar w-full lg:w-auto scroll-smooth py-1">
              {menuCategories.map((cat) => {
                const count = (menuItems as any[]).filter((item: any) => cat.id === 'featured' ? item.featured : item.categoryId === cat.id).length;
                const isActive = activeCategory === cat.id && !searchQuery;
                const translatedName = (t.categories as any)[cat.id] || cat.name;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                    className={`group relative flex items-center gap-4 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap transition-all border shrink-0 ${
                      isActive 
                        ? 'bg-white text-black border-white shadow-[0_20px_50px_rgba(255,255,255,0.1)]' 
                        : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl group-hover:rotate-12 transition-transform">{cat.icon}</span>
                    <span>{translatedName}</span>
                    {count > 0 && (
                      <span className={`ml-2 px-2 py-0.5 rounded-lg text-[8px] font-black ${isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-white/30'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Advanced Filters & Sorting */}
            <div className="flex items-center gap-6 w-full lg:w-auto justify-end">
              <div className="flex items-center gap-4 bg-white/5 border border-white/8 p-3 rounded-xl px-6 backdrop-blur-3xl group hover:border-primary/40 transition-colors">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t.menu_labels.sort_by}</span>
                <select 
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-[0.2em] text-primary cursor-pointer hover:text-white transition-colors"
                >
                  <option value="curated" className="bg-[#050505]">{t.menu_labels.curated}</option>
                  <option value="price-low" className="bg-[#050505]">{t.menu_labels.price_low}</option>
                  <option value="price-high" className="bg-[#050505]">{t.menu_labels.price_high}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-x-12 md:gap-y-32 pb-64 pt-24">
          {filteredItems
            .sort((a: any, b: any) => {
              if (sortType === 'price-low') return a.price - b.price;
              if (sortType === 'price-high') return b.price - a.price;
              return 0;
            })
            .map((item: any, idx: number) => {
              const itemName = item.names[language as keyof typeof item.names] || item.name;
              const itemDesc = item.descriptions[language as keyof typeof item.descriptions] || item.description;
              
              return (
              <div key={item.id} className="group animate-fade-in space-y-12" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-[3/4] rounded-[5rem] overflow-hidden border border-white/5 bg-white/5 shadow-2xl transition-all duration-1000 group-hover:scale-[1.03] group-hover:border-primary/40 cursor-pointer"
                >
                  <img src={item.image} alt={itemName} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-all duration-700" />
                  
                  <button 
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="group absolute bottom-14 right-14 w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-black shadow-[0_20px_50px_rgba(255,90,0,0.4)] hover:scale-110 active:scale-95 transition-all z-20 outline-none overflow-hidden border border-white/10"
                  >
                    <span className="relative z-10 font-light">+</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="absolute inset-0 flex items-center justify-center text-black font-black text-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                      +
                    </span>
                  </button>

                  <div className="absolute bottom-12 left-12 z-10 pr-24 space-y-4">
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary italic">{t.menu_labels.heritage}</span>
                        <div className="w-10 h-[1px] bg-primary/40" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-none serif italic text-white">{itemName}</h3>
                  </div>
                </div>

                <div className="px-6 flex justify-between items-start gap-10">
                  <div className="space-y-6 flex-1">
                    <p className="text-sm font-light text-white/50 leading-relaxed italic serif line-clamp-2 hover:line-clamp-none transition-all">"{itemDesc}"</p>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="group relative px-8 py-4 overflow-hidden rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl"
                    >
                      <span className="relative z-10">{t.menu_labels.narrative} →</span>
                      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                      <span className="absolute inset-0 flex items-center justify-center text-white font-black uppercase tracking-[0.4em] text-[9px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                        Explore →
                      </span>
                    </button>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-3xl font-black text-primary tracking-tighter block leading-none">{item.price}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 mt-1 block">DH</span>
                  </div>
                </div>
              </div>
            )})
          }
        </div>
      </div>

      <Footer />

      {/* Floating Cart CTA - Refined & Solid */}
      {cart.length > 0 && (
        <div className="fixed bottom-12 left-0 right-0 flex justify-center px-6 z-[120] animate-fade-in">
          <button 
            onClick={() => setIsCartSidebarOpen(true)} 
            className="w-full max-w-lg bg-primary text-white py-6 px-10 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex justify-between items-center group active:scale-95 transition-all outline-none border border-white/10"
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
              <div className="text-right pr-8 border-r border-white/20">
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/60 mb-0.5">{t.total}</span>
                <div className="font-black text-3xl tracking-tighter flex items-end gap-1 leading-none">
                  {totalPrice} 
                  <span className="text-[10px] opacity-60 font-bold mb-0.5">DH</span>
                </div>
              </div>

              {/* Animation Arrow */}
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

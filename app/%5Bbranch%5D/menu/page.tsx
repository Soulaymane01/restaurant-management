'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../components/LanguageProvider';
import { useCart } from '../../components/CartProvider';
import { branches, menuCategories, menuItems as initialMenuItems } from '../../lib/branch-data';
import OrderModal from '../../components/OrderModal';
import ItemDetailModal from '../../components/ItemDetailModal';
import CartSidebar from '../../components/CartSidebar';
import { useState, useEffect, useMemo, useRef } from 'react';
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const branch = branches.find(b => b.id === params.branch);

  const menuItems = useMemo(() => {
    const customMenu = JSON.parse(localStorage.getItem('restaurant_custom_menu') || 'null');
    return customMenu || initialMenuItems;
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item: any) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'featured' ? item.featured : item.categoryId === activeCategory;
      return matchesSearch && (searchQuery ? true : matchesCategory);
    });
  }, [activeCategory, searchQuery, menuItems]);

  const handleQuickAdd = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    addToCart(item);
  };

  if (!branch) return <div className="p-8 text-center bg-black h-screen flex flex-col items-center justify-center">
    <h2 className="text-4xl font-black text-white mb-8 serif italic">Branch Expired or Not Found</h2>
    <Link href="/" className="btn-primary">Return to Heritage</Link>
  </div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-primary">
      {/* Elite Menu Header */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-2xl py-4 shadow-2xl' : 'py-10'}`}>
        <div className="container flex items-center justify-between gap-6">
          <button 
            onClick={() => router.push('/')} 
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-primary transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
          </button>
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter serif italic">{branch.name}</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.4em] opacity-40">{branch.location}</p>
          </div>

          <button 
            onClick={() => setIsCartSidebarOpen(true)}
            className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-primary transition-all relative"
          >
            🛒
            {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">{cart.length}</span>}
          </button>
        </div>
      </header>

      {/* Page Canvas */}
      <div className="pt-40 md:pt-60 container relative">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12 animate-fade-in">
          <div className="max-w-2xl">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6">
              LE <span className="text-primary italic serif">MENU.</span>
            </h2>
            <div className="relative inline-block">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Seek a specific flavour..."
                className="bg-transparent border-b-2 border-white/10 py-4 pr-12 w-full md:w-80 outline-none focus:border-primary transition-all serif italic text-xl md:text-2xl"
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
            </div>
          </div>
          
          <nav className="flex gap-4 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat.id && !searchQuery ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-primary/40'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24 pb-40">
          {filteredItems.map((item: any, idx: number) => (
            <div 
              key={item.id} 
              className="group animate-fade-in"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div 
                onClick={() => setSelectedItem(item)}
                className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-8 border border-white/5 bg-white/5 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:border-primary/20 cursor-pointer"
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                
                {/*
                  FIX: Removed the nested overlay <div> and duplicate <span> that used
                  `group-hover:translate-y-0` — because `group` here refers to the card's
                  parent div, so hovering anywhere on the card was sliding a white div up
                  behind the + sign. Now it's a plain button with a direct hover color swap.
                */}
                <button 
                  onClick={(e) => handleQuickAdd(e, item)}
                  className="absolute bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black shadow-2xl hover:scale-110 hover:bg-white hover:text-black active:scale-95 transition-all z-20 outline-none"
                >
                  +
                </button>

                <div className="absolute bottom-10 left-10 z-10 pr-20">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Discover</span>
                  <h3 className="text-3xl font-black tracking-tighter leading-none serif italic">{item.name}</h3>
                </div>
              </div>
              <div className="px-4 flex justify-between items-start gap-4">
                <div>
                  <p className="text-xs font-medium opacity-30 line-clamp-2 leading-relaxed mb-4">{item.description}</p>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="text-[9px] font-black uppercase tracking-[0.2em] border-b border-white/10 pb-1 hover:border-primary hover:text-primary transition-all"
                  >
                    View Details
                  </button>
                </div>
                <span className="text-xl font-black text-primary tracking-tighter shrink-0">{item.price} DH</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elite Floating checkout button */}
      {cart.length > 0 && (
        <div className="fixed bottom-12 left-0 right-0 flex justify-center px-10 z-[110]">
          <button onClick={() => setIsCartSidebarOpen(true)} className="w-full max-w-lg bg-white text-black p-6 rounded-[2.5rem] shadow-2xl flex justify-between items-center group relative" style={{isolation: 'isolate'}}>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-black group-hover:bg-white group-hover:text-black transition-colors">{cart.length}</div>
              <span className="font-black text-xs uppercase tracking-[0.2em] group-hover:text-white transition-colors">Review Selection</span>
            </div>
            <div className="relative z-10 font-black text-3xl tracking-tighter group-hover:text-white transition-colors">
              {totalPrice} <span className="text-xs opacity-40 font-bold group-hover:text-white">DH</span>
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
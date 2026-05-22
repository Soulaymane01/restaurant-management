'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import CartSidebar from '@/app/components/CartSidebar';
import OrderModal from '@/app/components/OrderModal';
import UpsellModal from '@/app/components/UpsellModal';
import { useCart } from '@/app/components/CartProvider';
import { branches } from '@/app/lib/branch-data';

import { useParams } from 'next/navigation';

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const branch = branches.find(b => b.id === params.branch);

  const handleCheckout = () => {
    setIsCartSidebarOpen(false);
    
    // Check if cart has drinks
    const hasDrinks = cart.some(item => ['boissons', 'jus', 'jus_presse', 'jus_za3za3'].includes(item.categoryId));
    
    if (!hasDrinks) {
      setIsUpsellModalOpen(true);
    } else {
      setIsOrderModalOpen(true);
    }
  };

  const handleUpsellProceed = () => {
    setIsUpsellModalOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary flex flex-col">
      <Navbar scrolled={scrolled} variant="menu" onCartOpen={() => setIsCartSidebarOpen(true)} />
      
      <div className="flex-1">
        {children}
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
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/60">SELECTION</span>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em]">View Cart</span>
              </div>
            </div>

            {/* Content Right */}
            <div className="flex items-center gap-8">
              <div className="text-right pr-8 border-r border-white/40">
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/60 mb-0.5">Total</span>
                <div className="font-black text-3xl tracking-tighter flex items-end gap-1 leading-none">
                  {cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
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

      {/* Global Modals for Menu Area */}
      <CartSidebar 
        isOpen={isCartSidebarOpen} 
        onClose={() => setIsCartSidebarOpen(false)} 
        onCheckout={handleCheckout} 
      />
      
      <UpsellModal 
        isOpen={isUpsellModalOpen} 
        onClose={() => setIsUpsellModalOpen(false)} 
        onProceed={handleUpsellProceed} 
      />
      
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        branch={branch} 
      />
    </div>
  );
}

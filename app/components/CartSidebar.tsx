'use client';

import { useCart } from './CartProvider';
import { useLanguage } from './LanguageProvider';

export default function CartSidebar({ isOpen, onClose, onCheckout }: { isOpen: boolean; onClose: () => void; onCheckout: () => void }) {
  const { cart, totalPrice, removeFromCart, addToCart } = useCart();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] h-full shadow-[0_0_80px_rgba(0,0,0,0.9)] border-l border-white/8 flex flex-col animate-slide-left">
        
        {/* Header */}
        <header className="px-10 py-8 border-b border-white/5 flex justify-between items-center shrink-0">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter serif italic text-white leading-none">{t.cart_labels.title}</h2>
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <p className="text-[9px] uppercase font-black tracking-[0.4em] text-primary">{t.cart_labels.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white/40 hover:text-white transition-all text-xl font-light leading-none"
          >
            ×
          </button>
        </header>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
              <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-3xl">🥘</div>
              <div className="space-y-4">
                <p className="serif italic text-xl text-white/40 leading-relaxed max-w-[220px]">{t.cart_labels.empty}</p>
                <button 
                  onClick={onClose} 
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-primary hover:text-white transition-colors border-b border-primary/30 hover:border-white pb-1"
                >
                  ← {t.cart_labels.explore_menu}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 p-5 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
                  {/* Item Thumbnail */}
                  <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/5 group-hover:border-primary/20 transition-colors flex items-center justify-center text-2xl">
                    ✨
                  </div>
                  {/* Item Info */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-black text-sm uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">{item.name}</h4>
                      <span className="font-black text-primary text-lg tracking-tighter shrink-0">{item.price * item.quantity}<span className="text-[10px] text-primary/60 ml-1">DH</span></span>
                    </div>
                    <div className="flex items-center gap-5">
                      {/* Qty Controls */}
                      <div className="flex items-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white font-black text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-black text-white">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)} 
                          className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white font-black text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-red-400 transition-all"
                      >
                        {t.remove || "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <footer className="px-10 py-8 bg-black/60 border-t border-white/5 space-y-6 shrink-0 backdrop-blur-xl">
            {/* Subtotal Row */}
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
              <span>{cart.reduce((a, i) => a + i.quantity, 0)} {t.cart_labels.items}</span>
              <span>{totalPrice} DH</span>
            </div>
            {/* Total Row */}
            <div className="flex justify-between items-baseline pt-4 border-t border-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">{t.total}</span>
              <div className="text-right">
                <span className="text-4xl font-black text-white tracking-tighter block leading-none">{totalPrice}</span>
                <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest">Moroccan Dirhams</span>
              </div>
            </div>

            <button 
              disabled={cart.length === 0}
              onClick={onCheckout}
              className="w-full py-6 bg-primary text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-white hover:text-black transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_rgba(255,90,0,0.3)] disabled:opacity-20 flex items-center justify-center gap-4 group"
            >
              {t.cart_labels.proceed} <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

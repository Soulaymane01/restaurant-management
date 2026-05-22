'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';

export default function UpsellModal({ isOpen, onClose, onProceed }: { isOpen: boolean, onClose: () => void, onProceed: () => void }) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [upsellItems, setUpsellItems] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      import('../actions/menu').then(m => m.getMenuItems().then(items => {
        // Filter drinks
        const drinks = items.filter(i => ['boissons', 'jus', 'jus_presse', 'jus_za3za3'].includes(i.categoryId) && i.available);
        // Take up to 3 random items
        const shuffled = drinks.sort(() => 0.5 - Math.random());
        setUpsellItems(shuffled.slice(0, 3));
      }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-white/95 backdrop-blur-3xl animate-fade-in">
      <div className="bg-card border border-border w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.1)] relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary/5 border border-secondary/10 hover:bg-primary hover:border-primary text-secondary/40 hover:text-white transition-all flex items-center justify-center text-xl font-light leading-none z-10"
        >
          ×
        </button>
        
        <div className="p-10 md:p-14 space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-[10px] uppercase font-black tracking-[0.7em] text-primary">Pour accompagner</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-secondary serif italic leading-tight">Soif ?</h2>
            <p className="text-foreground/40 text-sm">Ajoutez une boisson rafraîchissante à votre commande.</p>
          </div>

          <div className="space-y-4">
            {upsellItems.map(item => {
              const itemName = item.names?.[language] || item.nameFr || item.nameEn;
              return (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-border bg-secondary/5 group">
                  <div>
                    <h4 className="font-black text-secondary">{itemName}</h4>
                    <span className="text-primary font-black text-sm">{item.price} DH</span>
                  </div>
                  <button 
                    onClick={() => { addToCart({ ...item, name: itemName }); onProceed(); }}
                    className="w-10 h-10 bg-primary hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center text-xl font-black shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 outline-none border border-white/10 shrink-0"
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-border flex justify-center">
            <button 
              onClick={onProceed}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/40 hover:text-secondary transition-colors"
            >
              Non merci, passer à la caisse →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

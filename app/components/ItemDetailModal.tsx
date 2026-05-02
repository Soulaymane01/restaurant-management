'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';

export default function ItemDetailModal({ 
  item, 
  isOpen, 
  onClose 
}: { 
  item: any, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!isOpen || !item) return null;

  const itemName = item.names[language as keyof typeof item.names] || item.name;
  const itemDesc = item.descriptions[language as keyof typeof item.descriptions] || item.description;

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleAdd = () => {
    const itemWithExtras = {
      ...item,
      name: `${itemName}${selectedOptions.length > 0 ? ` (${selectedOptions.join(', ')})` : ''}`,
    };
    addToCart(itemWithExtras);
    onClose();
    setSelectedOptions([]);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-3xl animate-fade-in">
      <div className="bg-[#050505] border border-white/10 w-full max-w-2xl rounded-t-[4rem] md:rounded-[4rem] overflow-hidden relative max-h-[95vh] flex flex-col shadow-[0_0_150px_rgba(0,0,0,1)]">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 z-50 w-14 h-14 flex items-center justify-center bg-black/60 border border-white/10 backdrop-blur-xl rounded-full text-4xl hover:bg-white hover:text-black transition-all"
        >
          ×
        </button>
        
        {/* Elite Imagery */}
        <div className="h-80 md:h-[450px] overflow-hidden shrink-0 relative">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          {item.featured && (
             <div className="absolute top-10 left-10 scale-125">
                <span className="bg-primary px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">{t.modal.signature}</span>
             </div>
          )}
        </div>

        {/* Narrative Content */}
        <div className="p-10  overflow-y-auto no-scrollbar flex-1 -mt-20 relative z-10">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-4 max-w-md">
                 <p className="text-primary font-black uppercase tracking-[0.6em] text-[9px]">{t.modal.masterpiece}</p>
                 <h2 className="text-6xl md:text-7xl font-black tracking-tighter serif italic leading-none">{itemName}</h2>
              </div>
              <span className="text-4xl font-black text-primary tracking-tighter leading-none pt-2">{item.price} DH</span>
            </div>
            
            <p className="text-xl md:text-2xl font-light text-white/40 italic leading-relaxed serif">
              "{itemDesc}"
            </p>
            
            <div className="w-full h-px bg-white/5" />

            {item.options && item.options.length > 0 && (
              <div className="space-y-8 pb-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic serif">{t.modal.refine}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.options.map((opt: any) => {
                    const optLabel = typeof opt === 'object' ? opt[language as keyof typeof opt] : opt;
                    const isSelected = selectedOptions.includes(optLabel);

                    return (
                      <button
                        key={optLabel}
                        onClick={() => toggleOption(optLabel)}
                        className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 ${
                          isSelected 
                            ? 'border-primary bg-primary/5 text-primary scale-95' 
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <span className="text-xs font-black uppercase tracking-widest">{optLabel}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-primary bg-primary scale-110' : 'border-white/10'
                        }`}>
                          {isSelected && <span className="text-white text-[10px]">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="p-10 pt-0 md:p-16 md:pt-0">
          <button 
            onClick={handleAdd} 
            className="group relative w-full py-8 overflow-hidden rounded-full bg-[#EC3F28] text-white font-black uppercase tracking-[0.4em] text-[10px] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
          >
            <span className="relative z-10">{t.modal.incorporate} • {item.price} DH</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
            <span className="absolute inset-0 flex items-center justify-center text-black font-black uppercase tracking-[0.4em] text-[10px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
              {t.modal.incorporate} →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

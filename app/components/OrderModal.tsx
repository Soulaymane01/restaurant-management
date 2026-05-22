'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';

export default function OrderModal({ isOpen, onClose, branch }: { isOpen: boolean, onClose: () => void, branch: any }) {
  const { t, language } = useLanguage();
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const { createOrder } = await import('../actions/orders');
      const order = await createOrder({
        customer: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: cart,
        total: totalPrice,
        branch: branch.id,
      });

      const orderDetails = cart.map(item => `   ▫️ ${item.quantity}x ${item.name} | ${item.price * item.quantity} DH`).join('\n');
      const branchName = branch.names?.[language] || branch.name || 'Heritage';
      const message = `🏛️ *RESTAURANT ATELIER - REÇU #${order.id}*\n━━━━━━━━━━━━━━━━━━━━\n\n📍 *DESTINATION:* ${branchName.toUpperCase()}\n\n👤 *CLIENT:* ${formData.name}\n📞 *CONTACT:* ${formData.phone}\n🏠 *ADRESSE:* ${formData.address}\n\n🥗 *SÉLECTION CULINAIRE:*\n${orderDetails}\n\n━━━━━━━━━━━━━━━━━━━━\n💰 *VALEUR TOTALE: ${totalPrice} DH*\n━━━━━━━━━━━━━━━━━━━━\n\n_Commande transmise via le site officiel._`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${branch.phone.replace('+', '').replace(/\s/g, '')}?text=${encodedMessage}`;

      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        clearCart();
        setIsSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to create order:', error);
      setIsProcessing(false);
    }
  };

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
          {isSuccess ? (
            <div className="text-center py-16 space-y-8 animate-fade-in">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl mx-auto shadow-[0_20px_60px_rgba(236,63,40,0.4)] text-white">✓</div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter serif italic text-secondary">{t.order_labels.success_title}</h2>
                <p className="text-[10px] uppercase font-black tracking-[0.4em] text-foreground/30">{t.order_labels.success_subtitle}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-black tracking-[0.7em] text-primary">{t.order_labels.concierge}</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-secondary serif italic leading-tight">{t.order_labels.finalize}</h2>
              </div>

              {/* Order Summary Strip */}
              <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-5 space-y-3">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-foreground/30 mb-4">{t.order_labels.selection}</p>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-secondary/60 font-bold">{item.quantity}× {item.name}</span>
                    <span className="text-primary font-black">{item.price * item.quantity} DH</span>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fields */}
                <div className="space-y-4">
                  {[
                    { id: 'name', label: t.name, key: 'name', type: 'text', placeholder: t.order_labels.fullname_placeholder },
                    { id: 'phone', label: t.number, key: 'phone', type: 'tel', placeholder: t.order_labels.phone_placeholder },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 block">{field.label}</label>
                      <input 
                        required
                        type={field.type}
                        value={(formData as any)[field.key]}
                        onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full bg-secondary/5 border border-secondary/10 p-4 rounded-xl text-secondary placeholder-secondary/20 outline-none focus:border-primary transition-all font-semibold text-base"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.5em] text-foreground/40 block">{t.address}</label>
                    <textarea 
                      required
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-secondary/5 border border-secondary/10 p-4 rounded-xl text-secondary placeholder-secondary/20 outline-none focus:border-primary transition-all font-semibold h-24 no-scrollbar text-base resize-none"
                      placeholder={t.order_labels.address_placeholder}
                    />
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-6 border-t border-border space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">{t.total}</span>
                    <span className="text-4xl font-black text-primary tracking-tighter leading-none">{totalPrice} <span className="text-base text-primary/60">DH</span></span>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full py-5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-2xl relative overflow-hidden group shadow-[0_10px_40px_rgba(236,63,40,0.2)] hover:shadow-[0_15px_50px_rgba(236,63,40,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.order_labels.sending}
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-500">
                          {t.order_labels.confirm_wa}
                          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                        </span>
                        <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

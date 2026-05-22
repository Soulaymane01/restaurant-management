'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';
import { useState } from 'react';

export default function Navbar({ scrolled, variant = 'landing', onCartOpen }: { scrolled: boolean, variant?: 'landing' | 'menu', onCartOpen?: () => void }) {
  const { t, setLanguage, language } = useLanguage();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[150] transition-all duration-700 pointer-events-none ${scrolled ? 'bg-white/90 backdrop-blur-2xl py-5 border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.05)]' : 'py-12'}`}>
        <div className="container flex justify-between items-center px-8 md:px-12 pointer-events-auto">
          
          {/* Brand */}
          <div className="flex items-center gap-14">
            <Link href="/" className="flex items-center gap-4 group">
              <img src="/Logo Mahrousa.png" alt="Mahrousa Logo" className="h-16 md:h-20 w-auto group-hover:scale-110 transition-transform duration-700" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12 text-[9px] uppercase font-black tracking-[0.5em] text-foreground/40 relative z-50">
              <a href="/#signature" className="hover:text-primary hover:text-opacity-100 transition-all relative group py-2">
                {t.nav.masterpieces}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="/#locations" className="hover:text-primary transition-all relative group py-2">
                {t.nav.ateliers}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <Link href="/admin" className="hover:text-primary transition-all relative group py-2">
                {t.nav.backstage}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            {/* Language Switcher */}
            <div className="hidden sm:flex p-1 rounded-full border border-secondary/10 bg-secondary/5 relative z-50">
              {['en', 'fr', 'ar'].map((lang) => (
                <button 
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang as any)} 
                  className={`px-4 py-2 rounded-full text-[8px] font-black tracking-widest transition-all ${language === lang ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary/40 hover:text-secondary'}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Cart Button (menu pages only) */}
            {variant === 'menu' && (
              <button 
                onClick={onCartOpen}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-full border font-black text-[10px] uppercase tracking-widest transition-all ${cart.length > 0 ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40' : 'bg-secondary/5 border-secondary/10 text-secondary/40 hover:bg-secondary/10 hover:text-secondary'}`}
              >
                <span className="text-base leading-none">🛒</span>
                {cart.length > 0 && <span className="tabular-nums">{cart.length}</span>}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
            >
              <span className="w-6 h-[2px] bg-foreground/60 group-hover:bg-primary transition-all rounded-full" />
              <span className="w-4 h-[2px] bg-foreground/60 self-end group-hover:bg-primary group-hover:w-6 transition-all rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[200] bg-white/98 backdrop-blur-3xl transition-all duration-500 flex flex-col items-center justify-center text-center p-10 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="absolute top-8 right-8 w-12 h-12 rounded-full bg-secondary/5 border border-secondary/10 hover:bg-primary hover:border-primary text-secondary/50 hover:text-white transition-all flex items-center justify-center text-2xl font-light"
        >
          ×
        </button>
        
        <div className="space-y-10">
          {[
            { label: t.nav.masterpieces, href: '/#signature' },
            { label: t.nav.ateliers, href: '/#locations' },
            { label: t.nav.backstage, href: '/admin' },
          ].map((link, idx) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-5xl md:text-6xl font-black tracking-tighter hover:text-primary transition-all transform hover:translate-x-4 serif italic text-secondary animate-fade-in"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {link.label}.
            </a>
          ))}
        </div>

        <div className="absolute bottom-16 flex gap-3">
          {['en', 'fr', 'ar'].map((lang) => (
            <button 
              key={lang}
              type="button"
              onClick={() => { setLanguage(lang as any); setMobileMenuOpen(false); }} 
              className={`px-8 py-3 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${language === lang ? 'bg-primary border-primary text-white' : 'bg-secondary/5 border-secondary/10 text-secondary/50 hover:text-secondary'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

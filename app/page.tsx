'use client';

import { useLanguage } from './components/LanguageProvider';
import { branches, menuItems } from './lib/branch-data';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/homePage/Hero';
import SignatureDish from './components/homePage/SignatureDish';
import Ateliers from './components/homePage/Ateliers';

export default function LandingPage() {
  const { t, language } = useLanguage();
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    const orders = JSON.parse(localStorage.getItem('restaurant_orders') || '[]');
    if (orders.length > 0) {
      const latest = orders[orders.length - 1];
      if (latest.status !== 'cancelled' && latest.status !== 'delivered') {
        setActiveOrder(latest);
      }
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featured = menuItems[0];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar scrolled={scrolled} variant="landing" />

      <Hero t={t} />

      {/* ─── DIVIDER: hero → signature ───────────────────────────────────── */}
      {/* (handled by section padding in SignatureDish — no extra gap needed) */}

      <SignatureDish featured={featured} t={t} language={language} />

      {/* ─── ATELIERS / LOCATIONS ────────────────────────────────────────── */}
      <Ateliers branches={branches} t={t} language={language} />

      <Footer />
    </main>
  );
}
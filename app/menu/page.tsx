'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Ateliers from '../components/homePage/Ateliers';
import { useLanguage } from '../components/LanguageProvider';
import { branches } from '../lib/branch-data';

export default function GlobalMenu() {
  const { t, language } = useLanguage();
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar scrolled={true} variant="menu" />
      <div className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-8 mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 brand-font uppercase text-primary">Our Menu</h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            {t.select_branch || 'Please select a branch to view our available menu items and place an order.'}
          </p>
        </div>
        
        <Ateliers branches={branches} t={t} language={language} />
      </div>
      <Footer />
    </main>
  );
}

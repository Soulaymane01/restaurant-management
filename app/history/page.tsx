'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../components/LanguageProvider';

export default function OurHistory() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar scrolled={true} variant="menu" />
      <div className="container mx-auto pt-32 pb-20 px-8 flex-1">
        <h1 className="text-5xl md:text-7xl font-black mb-8 brand-font uppercase text-primary">Our History</h1>
        <div className="max-w-3xl space-y-6 text-lg text-secondary">
          <p>The story of Mahrousa began with a vision to redefine what it means to truly taste.</p>
          <p>Over the years, our passionate chefs have continuously refined the sacred art of hospitality, meticulously adapting it for the modern world while preserving our rich heritage.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

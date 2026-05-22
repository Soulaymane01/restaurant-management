'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../components/LanguageProvider';

export default function AboutUs() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar scrolled={true} variant="menu" />
      <div className="container mx-auto pt-32 pb-20 px-8 flex-1">
        <h1 className="text-5xl md:text-7xl font-black mb-8 brand-font uppercase text-primary">About Us</h1>
        <div className="max-w-3xl space-y-6 text-lg text-secondary">
          <p>Welcome to Mahrousa. We pride ourselves on delivering an exceptional culinary experience, blending Mediterranean heritage with contemporary precision.</p>
          <p>Our commitment to authentic excellence ensures that every dish is crafted with meticulous care, using the finest ingredients.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

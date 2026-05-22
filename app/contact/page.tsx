'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../components/LanguageProvider';

export default function ContactUs() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar scrolled={true} variant="menu" />
      <div className="container mx-auto pt-32 pb-20 px-8 flex-1">
        <h1 className="text-5xl md:text-7xl font-black mb-8 brand-font uppercase text-primary">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6 text-lg text-secondary">
            <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
            <p>We would love to hear from you. Reach out to us for any inquiries, reservations, or feedback.</p>
            
            <div className="mt-8 space-y-4">
              <p><strong>Location:</strong> Tangier, Morocco</p>
              <p><strong>Phone:</strong> +212 706 84 90 81</p>
              <p><strong>Email:</strong> contact@mahrousa.com</p>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input type="text" className="w-full p-4 rounded-xl" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <input type="email" className="w-full p-4 rounded-xl" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea className="w-full p-4 rounded-xl min-h-[150px]" placeholder="How can we help you?"></textarea>
              </div>
              <button className="btn-primary w-full py-4 text-lg">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

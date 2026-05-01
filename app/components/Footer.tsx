'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { branches } from '../lib/branch-data';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer id="footer" className="bg-[#020202] text-white py-32 md:py-48 relative overflow-hidden border-t border-white/[0.04]">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-primary/[0.04] rounded-full blur-[150px]" />
      
      <div className="container relative z-10 px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-24 lg:gap-40 mb-24">
          
          {/* Brand */}
          <div className="space-y-10 max-w-sm">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white">
                RESTAURANT<br/>
                <span className="text-primary italic serif">HERITAGE.</span>
              </h2>
            </div>
            <p className="text-lg font-light text-white/30 leading-relaxed italic serif">
              "{t.footer.quote}"
            </p>
            {/* Social row */}
            {/* Social row */}
            <div className="flex gap-4">
              {[
                { id: 'IG', icon: <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /> },
                { id: 'WA', icon: <path d="M12.031 2C6.446 2 1.921 6.541 1.921 12.129c0 1.783.469 3.523 1.357 5.068L2 22l4.981-1.306c1.5 1.01 3.272 1.547 5.05 1.547h.001c5.586 0 10.111-4.54 10.111-10.128C22.143 6.541 17.618 2 12.031 2zm6.757 14.316c-.279.782-1.626 1.523-2.245 1.621-.579.091-1.135.127-1.135.127-2.31 0-4.662-1.282-6.26-2.88-1.597-1.598-2.88-3.95-2.88-6.26 0 0 .036-.554.127-1.135.097-.619.839-1.966 1.621-2.245.249-.089.522-.132.784-.132.33 0 .66.195.834.505l1.373 3.324c.092.219.049.468-.113.634l-.999.999c-.195.195-.236.467-.101.706.464.832 1.137 1.6 1.996 2.459.859.859 1.627 1.533 2.459 1.996.239.135.511.094.706-.101l.999-.999c.166-.162.415-.205.634-.113l3.324 1.373c.31.174.505.504.505.833 0 .262-.043.535-.132.784z" /> },
                { id: 'TK', icon: <path d="M12.525.02c1.31 0 2.59.3 3.73.88l-.05 1.25c-.01 2.37 1.92 4.3 4.29 4.31v3.42c-1.19-.01-2.35-.42-3.29-1.18-.01 3.51-.01 7-.02 10.5-.02 3.86-3.15 6.99-7.01 6.99a6.995 6.995 0 0 1-7.01-7.01C3.15 15.3 6.3 12.15 10.15 12.14v3.42a3.575 3.575 0 0 0-3.58 3.58 3.575 3.575 0 0 0 3.58 3.58 3.585 3.585 0 0 0 3.59-3.59V.03l-1.22-.01z" /> }
              ].map(s => (
                <a key={s.id} href="#" className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center group hover:border-primary hover:bg-primary/5 transition-all duration-500">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/20 group-hover:fill-primary transition-colors">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-3 gap-16 md:gap-20">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">{t.footer.navigate}</h4>
              <ul className="space-y-5">
                {[
                  { label: t.nav.masterpieces, href: '#signature' },
                  { label: t.nav.ateliers, href: '#locations' },
                  { label: t.nav.backstage, href: '/admin' },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">{t.footer.ateliers}</h4>
              <ul className="space-y-5">
                {branches.map(branch => (
                  <li key={branch.id}>
                    <Link href={`/${branch.id}/menu`} className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                      {(branch as any).names[language as keyof typeof branch.names]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">{t.footer.connect}</h4>
              <ul className="space-y-5">
                {['Instagram', 'WhatsApp', 'Mail'].map(s => (
                  <li key={s}>
                    <a href="#" className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/[0.04]">
          <div className="flex flex-col md:flex-row gap-8 items-center text-[9px] font-black uppercase tracking-[0.6em] text-white/20">
            <p>© 2026 {t.footer.rights}</p>
            <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
            <p>{t.footer.location}</p>
          </div>
          
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>

          <div className="w-16 h-16 border border-white/[0.06] rounded-full flex items-center justify-center">
            <span className="text-primary text-lg font-black serif italic">H.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

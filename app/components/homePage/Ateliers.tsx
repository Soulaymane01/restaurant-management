'use client';

import Link from 'next/link';

interface AteliersProps {
  branches: any[];
  t: any;
  language: string;
}

export default function Ateliers({ branches, t, language }: AteliersProps) {
  return (
    <section id="locations" className="relative py-32 md:py-48 lg:py-64 scroll-mt-20 overflow-hidden">
      {/* Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-32 left-1/2 -translate-x-1/2 text-[14rem] md:text-[25rem] font-black opacity-[0.05] tracking-[0.2em] leading-none whitespace-nowrap text-secondary"
      >
        {t.ateliers.watermark}
      </span>

      {/* Section heading */}
      <div className="container relative z-10 text-center mb-32 md:mb-48">
        <div className="inline-flex items-center gap-6 mb-10">
          <span className="w-12 h-px bg-primary/40" />
          <p className="text-primary font-black uppercase tracking-[1em] text-[11px]">
            {t.ateliers.eyebrow}
          </p>
          <span className="w-12 h-px bg-primary/40" />
        </div>
        <h3 className="text-6xl md:text-9xl lg:text-[11rem] font-black tracking-tighter serif italic leading-[0.8] text-secondary">
          {t.ateliers.title}
        </h3>
      </div>

      {/* Branch cards */}
      <div className="container px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        {branches.map((branch, idx) => (
          <Link
            href={`/${branch.id}/menu`}
            key={branch.id}
            className="group relative h-[700px] md:h-[800px] bg-card rounded-[4rem] md:rounded-[5rem] overflow-hidden flex flex-col justify-end p-12 md:p-20 transition-all duration-1000 border border-border hover:border-primary/30 shadow-2xl"
          >
            {/* Background image */}
            <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-[1500ms] grayscale group-hover:grayscale-0">
              <img
                src={`https://images.unsplash.com/photo-1517248135467-4c7ed9d42177?w=1200&q=80&idx=${idx}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2000ms]"
                alt={branch.names[language as keyof typeof branch.names]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>

            {/* Card content */}
            <div className="relative z-10 space-y-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-1000">
              <div className="flex items-center gap-6">
                <span className="text-lg font-black text-white/30 tracking-widest uppercase italic">
                  0{idx + 1}
                </span>
                <div className="w-12 h-px bg-primary/40 group-hover:w-32 transition-all duration-1000" />
              </div>
              <h4 className="text-6xl md:text-8xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors serif italic text-white">
                Atelier {branch.names[language as keyof typeof branch.names]}.
              </h4>
              <div className="flex flex-wrap items-center gap-10 text-[12px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-white transition-all">
                <span className="flex items-center gap-3">📍 {branch.locations[language as keyof typeof branch.locations]}</span>
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="flex items-center gap-3">🕒 {branch.hours[language as keyof typeof branch.hours]}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

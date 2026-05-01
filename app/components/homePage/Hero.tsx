'use client';

interface HeroProps {
  t: any;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505] z-10" />
        <img
          src="https://images.unsplash.com/photo-1550966841-3ee3ad55ffa7?w=1920&q=90"
          alt="Elite Background"
          className="w-full h-full object-cover scale-110 animate-pulse-slow opacity-60"
        />
      </div>

      {/* Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none overflow-hidden">
        <h1 className="text-[25vw] font-black text-stroke uppercase tracking-[0.1em] opacity-5 leading-none select-none">
          SAVOUR
        </h1>
      </div>

      <div className="container relative z-20 text-center px-8 md:px-10">
        <div className="animate-fade-in space-y-12">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-6">
            <span className="w-16 h-[1px] bg-primary/40" />
            <span className="serif italic text-primary text-xl md:text-3xl tracking-[0.3em]">
              {t.hero.eyebrow}
            </span>
            <span className="w-16 h-[1px] bg-primary/40" />
          </div>

          {/* Headline */}
          <div className="space-y-8">
            <h2 className="text-6xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter uppercase text-white">
              <span className="block mb-2">{t.hero.beyond}</span>
              <span className="block text-primary">{t.hero.dining}</span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl md:text-3xl font-light text-white/50 leading-relaxed tracking-wide italic serif px-6">
              "{t.hero.description}"
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
            <a
              href="#locations"
              className="group relative px-14 py-7 overflow-hidden rounded-full bg-primary text-white font-black uppercase tracking-[0.3em] text-[11px] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 border border-primary/20"
            >
              <span className="relative z-10">{t.hero.select_atelier}</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-black uppercase tracking-[0.3em] text-[11px] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                {t.hero.select_atelier} →
              </span>
            </a>
            <a
              href="#signature"
              className="group px-14 py-7 rounded-full border border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-[0.5em] text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              {t.hero.signature_piece}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 animate-bounce">
        <span className="text-[10px] uppercase font-black tracking-[0.6em]">{t.hero.explore}</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

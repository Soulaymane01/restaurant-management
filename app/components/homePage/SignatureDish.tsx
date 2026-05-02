'use client';

interface SignatureDishProps {
  featured: any;
  t: any;
  language: string;
}

export default function SignatureDish({ featured, t, language }: SignatureDishProps) {
  const itemName = featured.names[language as keyof typeof featured.names] || featured.name;
  const itemDesc = featured.descriptions[language as keyof typeof featured.descriptions] || featured.description;

  return (
    <section
      id="signature"
      className="py-32 md:py-48 lg:py-64 bg-[#080808] relative overflow-hidden scroll-mt-20 border-y border-white/[0.03]"
    >
      <div className="container px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
        {/* Image column */}
        <div className="relative group animate-fade-in">
          <div className="absolute -inset-20 bg-primary/10 rounded-full blur-[150px] group-hover:bg-primary/20 transition-all duration-1000" />
          <div className="relative aspect-square rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 animate-float">
            <img
              src={featured.image}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
              alt={itemName}
            />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-16 -right-8 md:-right-16 w-56 h-56 bg-secondary text-white rounded-full flex flex-col items-center justify-center p-10 text-center shadow-2xl border-[16px] border-[#080808] rotate-12 group-hover:rotate-0 transition-all duration-1000">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">
              Authentic Excellence
            </span>
            <span className="serif text-5xl font-black italic leading-none">#01</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-60">
              Tangier Edition
            </span>
          </div>
        </div>

        {/* Text column */}
        <div className="space-y-16 animate-fade-in lg:pt-0" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-6">
            <p className="text-primary font-black uppercase tracking-[1em] text-[11px] mb-4">
              {t.signature.eyebrow}
            </p>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] serif italic text-white">
              The {itemName}.
            </h2>
          </div>
          <p className="text-2xl md:text-4xl font-light text-white/50 leading-[1.6] serif italic max-w-2xl">
            "{itemDesc}"
          </p>
          <div className="pt-10 flex items-center gap-12">
            <div className="h-[2px] w-16 bg-primary/40" />
            <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20 whitespace-nowrap">
              {t.signature.crafted}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useLanguage } from '@/app/components/LanguageProvider';
import { branches, menuCategories } from '@/app/lib/branch-data';
import Link from 'next/link';

export default function CategorySelectionPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  
  const branch = branches.find(b => b.id === params.branch);

  if (!branch) return (
    <div className="p-8 text-center bg-black h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-black text-white mb-8 serif italic">Branch Expired or Not Found</h2>
      <Link href="/" className="btn-primary">Return to Heritage</Link>
    </div>
  );

  const branchName = branch.names[language as keyof typeof branch.names] || branch.id;

  return (
    <div className="pt-40 md:pt-60 container relative min-h-screen px-8 md:px-12 pb-32">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-3xl space-y-8 mb-20 animate-fade-in">
        <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-2">{branchName}</p>
        <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none text-secondary">
          {t.menu_labels?.title_part1 || 'LE'} <span className="text-primary italic serif">{t.menu_labels?.title_part2 || 'MENU.'}</span>
        </h2>
        <p className="text-foreground/50 text-xl md:text-2xl font-light">
          {t.menu_labels?.subtitle || 'Choisissez une catégorie pour explorer nos créations.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuCategories.map((category, idx) => {
          const translatedName = (t.categories as any)[category.id] || category.name;
          
          // Fallback images for categories to make them look premium
          const categoryImages: Record<string, string> = {
            featured: "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80",
            burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
            sandwichs: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
            shawarmas: "https://images.unsplash.com/photo-1648827453303-317bd1270b22?w=800&q=80",
            plats: "https://images.unsplash.com/photo-1544025162-811114cd811a?w=800&q=80",
            pizzas: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
            tacos: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80",
            salades: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
            extras: "https://images.unsplash.com/photo-1573016608964-f4b0af1df535?w=800&q=80",
            boissons: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=800&q=80",
            jus: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
            jus_presse: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80",
            jus_za3za3: "https://images.unsplash.com/photo-1553530666-ba11a7ddbb86?w=800&q=80",
          };

          const image = categoryImages[category.id] || categoryImages.featured;

          return (
            <Link 
              href={`/${params.branch}/menu/${category.id}`} 
              key={category.id}
              className="group animate-fade-in relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-card border border-border shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-700 block"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <img 
                src={image} 
                alt={translatedName} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between">
                <div>
                  <span className="text-4xl mb-2 block">{category.icon}</span>
                  <h3 className="text-3xl font-black tracking-tighter leading-none text-white serif italic">{translatedName}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary transition-colors duration-500">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-8">
      <div className="space-y-6 animate-fade-in max-w-lg">
        <h1 className="text-9xl font-black text-secondary/10 tracking-tighter serif italic">404</h1>
        <h2 className="text-4xl font-black text-secondary tracking-tighter">Page Not Found</h2>
        <p className="text-foreground/50 text-sm">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-8">
          <Link href="/" className="px-8 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20 inline-block">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

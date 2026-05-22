'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-8">
      <div className="space-y-6 animate-fade-in max-w-lg">
        <h1 className="text-9xl font-black text-primary/20 tracking-tighter serif italic">500</h1>
        <h2 className="text-4xl font-black text-secondary tracking-tighter">Something went wrong</h2>
        <p className="text-foreground/50 text-sm">
          We apologize for the inconvenience. Our team has been notified.
        </p>
        <div className="pt-8 flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Try Again
          </button>
          <Link href="/" className="px-8 py-4 bg-secondary/5 text-secondary rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-secondary/10 transition-all flex items-center">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

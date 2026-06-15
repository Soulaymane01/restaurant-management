'use client';

import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: '⚡',
      title: 'Real-Time',
      desc: 'Notifications delivered instantly via Redis pub/sub and Server-Sent Events.',
    },
    {
      icon: '📡',
      title: 'Live Channels',
      desc: 'Subscribe to custom channels and receive only what matters to you.',
    },
    {
      icon: '📜',
      title: 'History',
      desc: 'Recent notifications stored with automatic TTL expiration.',
    },
    {
      icon: '🔐',
      title: 'Secure',
      desc: 'Simple authentication system to protect your notification streams.',
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl space-y-8">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/30">
            <span className="text-white text-5xl font-black">N</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-secondary">
              Notifications
            </h1>
            <p className="text-lg md:text-xl font-light text-foreground/40 max-w-lg mx-auto">
              A real-time notification system powered by <strong className="text-foreground font-semibold">Redis pub/sub</strong> and <strong className="text-foreground font-semibold">Python</strong>.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl hover:bg-secondary transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-secondary/20"
          >
            Get Started →
          </Link>
        </div>

        <div className="absolute bottom-10 text-[9px] text-foreground/10 font-black uppercase tracking-widest animate-pulse">
          Scroll to explore
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Features</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-secondary">
              Everything you need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-3xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-all space-y-4"
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="text-xl font-black tracking-tight text-secondary">{f.title}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border text-center">
        <p className="text-[9px] text-foreground/10 font-black uppercase tracking-widest">
          Real-Time Notification System · Python + Redis + Next.js
        </p>
      </footer>
    </main>
  );
}

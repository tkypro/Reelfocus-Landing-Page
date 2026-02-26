'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import { OceanRipples } from "@/components/ocean-ripples"

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [signupStatus, setSignupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [signupMessage, setSignupMessage] = useState<string>("");

  const handleEarlyAccessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupStatus("loading");
    setSignupMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg =
          (body && typeof body === "object" && "error" in body && typeof (body as any).error === "string"
            ? (body as any).error
            : "Sign up failed. Please try again.");
        setSignupStatus("error");
        setSignupMessage(msg);
        return;
      }

      form.reset();
      setSignupStatus("success");
      setSignupMessage("You’re in! We’ll email you soon.");
    } catch {
      setSignupStatus("error");
      setSignupMessage("Network error. Please try again.");
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen bg-white text-foreground bg-dotted-grid-light ${inter.className}`}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .glimmer-card {
          position: relative;
          background: rgb(248, 248, 248);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .glimmer-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.03),
            rgba(236, 72, 153, 0.06),
            rgba(236, 72, 153, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .glimmer-pill {
          position: relative;
          background: rgb(248, 248, 248);
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .glimmer-pill::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(236, 72, 153, 0.03),
            rgba(236, 72, 153, 0.06),
            rgba(236, 72, 153, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          top: 85%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 600px;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.28) 0%,
            rgba(255, 255, 255, 0.10) 35%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
        }

        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Ocean/Lake hero background (stops before steps) */}
      <div className="relative overflow-hidden">
        <OceanRipples />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-white/70 pointer-events-none" />

        {/* Navigation */}
        <header className="relative z-10 flex items-center justify-between py-4 px-6 border-b border-white/25 bg-white/10 backdrop-blur-sm">
          <Link
            href="/"
            className={`text-2xl md:text-3xl font-medium text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] ${playfair.className}`}
          >
            ReelFocus
          </Link>
          <nav className="flex items-center gap-4">
            <Button
              size="sm"
              className="rounded-full bg-black/20 text-white border border-white/30 hover:bg-black/25 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              How it works
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-black/20 text-white border border-white/30 hover:bg-black/25 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              onClick={() => {
                document.getElementById('early-access-form')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
            >
              Sign Up
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6 relative">
          <div className="hero-glow" />
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            {/* Logo */}
            <div className="mb-4">
              <img
                src="/images/logo.png"
                alt="ReelFocus Logo"
                className="w-36 h-36 mx-auto object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,0.25)] rounded-2xl"
              />
            </div>
            <div className="inline-flex items-center px-6 py-2 text-base font-semibold text-sky-950 mb-8 glimmer-pill fade-in bg-white/80 border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <span className={playfair.className}>An Anti-Procrastination App</span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-medium mb-6 tracking-tight fade-in delay-1 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)] ${playfair.className}`}>
              Catch your momentum, not just your goals
            </h1>
            <p className="text-lg text-white/95 mb-8 fade-in delay-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
              Join our beta test today to receive exclusive rewards!
            </p>
            <div className="fade-in delay-3">
              <Button
                size="lg"
                className="rounded-full bg-white text-sky-900 hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                onClick={() => {
                  document.getElementById('early-access-form')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }}
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </section>
      </div>

      <main className="flex-grow">

        {/* Feature Sections - Alternating image & text */}
        <section id="how-it-works" className="pt-12 md:pt-16 pb-0 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-16">
            <h2 className={`text-3xl md:text-4xl font-medium text-neutral-900 text-center mb-4 ${playfair.className}`}>
              Reduce procrastination in 4 steps:
            </h2>
            {/* Row 1: Text left, Image right */}
            <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2 flex flex-col justify-center md:order-1">
                <h2 className={`text-3xl md:text-4xl font-medium text-neutral-900 mb-4 leading-tight ${playfair.className}`}>
                  Release
                </h2>
                <p className="text-neutral-600 text-lg">
                  Let go of the emotional weight that makes starting feel impossible. ReelFocus helps you pause, breathe, and unload self-doubt through gentle check-ins and reassuring prompts.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:order-2">
                <div className="w-full max-w-[200px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
                  <img src="/images/step-release.png" alt="How are you feeling now — check-in" className="w-full aspect-[9/19] object-cover" />
                </div>
              </div>
            </div>

            {/* Row 2: Image left, Text right */}
            <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 bg-sky-50/40 -mx-6 px-6 py-8 md:py-10 rounded-2xl">
              <div className="w-full md:w-1/2 flex justify-center md:order-1">
                <div className="w-full max-w-[200px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
                  <img src="/images/step-untangle.png" alt="New Task — break work into steps" className="w-full aspect-[9/19] object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center md:order-2">
                <h2 className={`text-3xl md:text-4xl font-medium text-neutral-900 mb-4 leading-tight ${playfair.className}`}>
                  Untangle
                </h2>
                <p className="text-neutral-600 text-lg">
                Big tasks can feel overwhelming when they’re unclear. ReelFocus breaks assignments into small, manageable next steps so you always know exactly where to begin.
                </p>
              </div>
            </div>

            {/* Row 3: Text left, Image right */}
            <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
              <div className="w-full md:w-1/2 flex flex-col justify-center md:order-1">
                <h2 className={`text-3xl md:text-4xl font-medium text-neutral-900 mb-4 leading-tight ${playfair.className}`}>
                  Cast
                </h2>
                <p className="text-neutral-600 text-lg">
                Once you have one simple step, it’s time to focus. With a calm timer and distraction-free space, ReelFocus helps you commit to just a few minutes of progress.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:order-2">
                <div className="w-full max-w-[200px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
                  <img src="/images/step-cast.png" alt="Focus timer — cast and concentrate" className="w-full aspect-[9/19] object-cover" />
                </div>
              </div>
            </div>

            {/* Row 4: Image left, Text right */}
            <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 bg-sky-50/40 -mx-6 px-6 py-8 md:py-10 rounded-2xl">
              <div className="w-full md:w-1/2 flex justify-center md:order-1">
                <div className="w-full max-w-[200px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200">
                  <img src="/images/step-reel-in.png" alt="Reflect on your catch — celebrate progress" className="w-full aspect-[9/19] object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center md:order-2">
                <h2 className={`text-3xl md:text-4xl font-medium text-neutral-900 mb-4 leading-tight ${playfair.className}`}>
                  Reel In
                </h2>
                <p className="text-neutral-600 text-lg">
                Every effort deserves recognition. ReelFocus rewards your progress with reflection, encouragement, and a sense of accomplishment, helping you build confidence, not pressure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pt-0 pb-12 md:pb-16 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-medium mb-3 ${playfair.className}`}>Play Together. Stay Motivated</h2>
              <p className="text-neutral-400 text-lg">Transform your ideas into reality with three simple prompts.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative max-w-5xl mx-auto md:items-stretch">
              <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-green-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <h3 className={`text-xl font-medium mb-3 group-hover:text-green-400 transition-colors ${playfair.className}`}>Fish Together</h3>
                <p className="text-neutral-400 leading-relaxed">
                Team up with friends and fish side-by-side in real time. Seeing others stay active creates a sense of shared momentum, helping you mirror productive behavior and stay focused instead of procrastinating.
                </p>
              </div>

              <div className="flex justify-center items-center">
                <img src="/images/fish-together-hero.png" alt="Add your tasks to start Fishing — fish with friends" className="rounded-2xl shadow-lg border border-neutral-200 w-full max-w-[220px] object-cover" />
              </div>

              <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-green-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4z"/>
                  </svg>
                </div>
                <h3 className={`text-xl font-medium mb-3 group-hover:text-green-400 transition-colors ${playfair.className}`}>Streaks</h3>
                <p className="text-neutral-400 leading-relaxed">
                Build daily streaks by showing up consistently. Visual progress keeps you accountable and turns small actions into lasting habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Form Section */}
        <section id="early-access-form" className="py-12 md:py-16 px-6 bg-sky-50/40">
          <div className="max-w-[1200px] mx-auto text-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-medium mb-4 ${playfair.className}`}>Get Early Access</h2>
              <p className="text-neutral-600 mb-12">Be the first to experience ReelFocus.</p>
            </div>
            <form className="max-w-[400px] mx-auto space-y-4 text-left" onSubmit={handleEarlyAccessSubmit}>
              <div>
                <label htmlFor="early-name" className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
                <input
                  id="early-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30"
                  required
                />
              </div>
              <div>
                <label htmlFor="early-email" className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                <input
                  id="early-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={signupStatus === "loading"}>
                {signupStatus === "loading" ? "Signing up..." : "Sign up"}
              </Button>
              {signupMessage ? (
                <p
                  className={
                    signupStatus === "success"
                      ? "text-sm text-green-700"
                      : signupStatus === "error"
                        ? "text-sm text-red-700"
                        : "text-sm text-neutral-600"
                  }
                >
                  {signupMessage}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-neutral-200 bg-sky-50/20 scroll-animation">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="text-sm text-neutral-400">
            © 2026 ReelFocus. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <span className="sr-only">Discord</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6h0a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v0"/>
                <path d="M6 18v-7a3 3 0 0 1 3-3h7"/>
                <circle cx="8" cy="12" r="1"/>
                <circle cx="16" cy="12" r="1"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black relative overflow-hidden">
      {/* Background gradient orb */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-5 py-2 rounded-3xl backdrop-blur">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Now Hiring Top Talent
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
            We Build Digital<br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Experiences That Win</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-md">
            Premium web development, mobile apps, and brand experiences for ambitious businesses.
          </p>

          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-10" asChild>
              <Link href="/booking">
                Book a Strategy Call <ArrowRight className="ml-3" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Play className="mr-3" /> Watch 2-min Video
            </Button>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <div>Trusted by</div>
            <div className="flex gap-6 opacity-70">
              <span className="font-semibold">Stripe</span>
              <span className="font-semibold">Notion</span>
              <span className="font-semibold">Vercel</span>
            </div>
          </div>
        </div>

        {/* Right side visual */}
        <div className="hidden md:block relative">
          <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-3xl p-2">
            <div className="w-full h-full bg-zinc-900 rounded-3xl flex items-center justify-center text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
              DH
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
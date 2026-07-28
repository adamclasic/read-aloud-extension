import React from 'react';
import { Heart, Github, Sparkles, Coffee, ArrowRight } from 'lucide-react';

export const DonationCta: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-rose-50 via-pink-50/50 to-orange-50/50 border border-rose-200/80 p-8 sm:p-12 shadow-lg overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-96 h-96 bg-gradient-to-br from-rose-400/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                <span>Support Open Source Development</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Help Keep Read Aloud AI Free, Ad-Free & Privacy-First
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We believe accessibility tools should never monetize your personal browsing habits or lock core features behind subscription paywalls. If Read Aloud AI saves you time or enhances your reading experience, consider sponsoring Adam Clasic on GitHub.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-700 pt-1">
                <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-rose-100 shadow-2xs">
                  <Coffee className="w-4 h-4 text-orange-500" />
                  <span>Buy coffee or sponsor tiers</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-rose-100 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Fund new voice models & features</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://github.com/adamclasic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto md:w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-xl shadow-rose-500/25 hover:shadow-rose-500/35 active:scale-[0.98] transition-all group"
              >
                <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                <span>Sponsor on GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/adamclasic/read-aloud-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto md:w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all shadow-2xs"
              >
                <Github className="w-4 h-4" />
                <span>Star Repository</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

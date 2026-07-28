import React from 'react';
import { Volume2, Github, Shield, Sparkles, Download, Heart } from 'lucide-react';
import { PageTab } from '../types';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenInstall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenInstall }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Volume2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-slate-900">Read Aloud AI</span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-semibold">Open Source</span>
            </div>
            <p className="text-xs text-slate-500 -mt-0.5">ElevenLabs Neural & Eco-TTS</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-sm font-medium">
          <button
            onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentTab === 'home'
                ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Overview & Demo
          </button>
          
          {currentTab === 'home' && (
            <>
              <a
                href="#features"
                className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all"
              >
                Features
              </a>
              <a
                href="#demo"
                className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all flex items-center gap-1.5 text-blue-600 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Live Demo
              </a>
              <a
                href="#compare"
                className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all"
              >
                Compare
              </a>
              <a
                href="#faq"
                className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-all"
              >
                FAQ
              </a>
            </>
          )}

          <button
            onClick={() => { onSelectTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'privacy'
                ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy Policy
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/adamclasic"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 hover:text-rose-800 text-sm font-semibold shadow-2xs transition-all group"
            title="Sponsor & support Adam Clasic on GitHub"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover:scale-110 transition-transform" />
            <span>Sponsor</span>
          </a>

          <a
            href="https://github.com/adamclasic/read-aloud-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 text-sm font-medium shadow-2xs transition-colors"
            title="View open-source repository on GitHub"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <button
            onClick={onOpenInstall}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Add to Chrome</span>
          </button>
        </div>
      </div>
    </header>
  );
};

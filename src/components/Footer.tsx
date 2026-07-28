import React from 'react';
import { Volume2, Github, Shield, Heart, ExternalLink } from 'lucide-react';
import { PageTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenInstall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenInstall }) => {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <Volume2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-slate-900 font-bold text-lg tracking-tight">Read Aloud AI</span>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              An open-source, privacy-first Chrome extension designed to read web pages aloud using lifelike ElevenLabs neural voices or zero-latency offline browser speech synthesis.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/adamclasic/read-aloud-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors shadow-2xs"
              >
                <Github className="w-4 h-4" />
                <span>github.com/adamclasic</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 transition-colors font-medium"
                >
                  Homepage & Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('home'); setTimeout(() => { window.location.hash = 'demo'; }, 50); }}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Interactive Speech Demo</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('home'); setTimeout(() => { window.location.hash = 'compare'; }, 50); }}
                  className="hover:text-blue-600 transition-colors font-medium"
                >
                  Vs. Competitors (ReadAloud.net)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectTab('home'); setTimeout(() => { window.location.hash = 'faq'; }, 50); }}
                  className="hover:text-blue-600 transition-colors font-medium"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider">Privacy & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onSelectTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-700 transition-colors flex items-center gap-1.5 text-blue-600 font-semibold"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy & Justifications</span>
                </button>
              </li>
              <li className="text-xs text-slate-500 pt-2 leading-relaxed">
                Certified under Single Purpose Chrome Extension standards. Zero tracking, zero telemetry, and zero remote code execution.
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenInstall}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  Install Extension v1.2.0 &rarr;
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1.5">
            <span>Built with open-source ethos by</span>
            <a
              href="https://github.com/adamclasic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 underline underline-offset-2 font-semibold"
            >
              Adam Clasic
            </a>
            <span>&bull; Licensed under MIT</span>
          </p>
          <div className="flex items-center gap-6">
            <span className="font-medium">Chrome Extension Manifest v3 Compliant</span>
            <span>&bull;</span>
            <button
              onClick={() => { onSelectTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-slate-800 font-medium"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

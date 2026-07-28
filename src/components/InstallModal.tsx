import React from 'react';
import { X, Download, Github, Sparkles, Key, CheckCircle2, ArrowRight } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Install Read Aloud AI</h3>
              <p className="text-xs text-slate-500">Version 1.2.0 • Open Source Chrome Extension</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Steps */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600">
              3 Simple Steps to Get Started:
            </h4>

            {/* Step 1 */}
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                1
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Download & Install in Chrome</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Install directly from the Chrome Web Store or download the latest packed release from GitHub.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://github.com/adamclasic/read-aloud-extension/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download v1.2.0 Release</span>
                  </a>
                  <a
                    href="https://github.com/adamclasic/read-aloud-extension"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors border border-slate-300 shadow-2xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                2
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">Right-Click Any Article to Read</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Highlight any paragraph or webpage text, right-click, and select <strong className="text-slate-900 font-semibold">'Listen to selected text'</strong>. Our floating audio player will appear instantly on screen.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                3
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span>Optional: Add Your ElevenLabs API Key</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-mono font-semibold border border-blue-100">Neural Audio</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In the extension popup settings, paste your ElevenLabs API key for studio neural voices. Don't have a key? No problem! The extension defaults to zero-cost <strong className="text-slate-900 font-semibold">Eco-Friendly Browser TTS</strong> offline.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-800">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Verified Single Purpose Manifest • Zero tracking • Zero telemetry</span>
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shrink-0 ml-2 shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

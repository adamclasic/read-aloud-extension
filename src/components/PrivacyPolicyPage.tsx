import React, { useState } from 'react';
import { PRIVACY_POLICY_SECTIONS } from '../data/content';
import { Shield, Target, Lock, Database, Award, Github, CheckCircle2, ArrowLeft, ExternalLink, KeyRound, AlertTriangle, FileText } from 'lucide-react';
import { PageTab } from '../types';

interface PrivacyPolicyPageProps {
  onSelectTab: (tab: PageTab) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onSelectTab }) => {
  const [activeSection, setActiveSection] = useState<string>(PRIVACY_POLICY_SECTIONS[0].id);

  const renderIcon = (name: string) => {
    const props = { className: "w-5 h-5 stroke-[2.2]" };
    switch (name) {
      case 'Target': return <Target {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Github': return <Github {...props} />;
      default: return <Shield {...props} />;
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-900 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Breadcrumb */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <button
              onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview & Demo</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Privacy Policy & Transparency Report
                </h1>
                <p className="text-sm text-slate-600 mt-0.5">
                  Official Chrome Extension Single Purpose Declaration & Permission Justifications
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/adamclasic/read-aloud-extension"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold transition-all shadow-2xs"
            >
              <Github className="w-4 h-4" />
              <span>Audit Source Code</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* High-Level Trust Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Target className="w-4 h-4" />
              <span>Single Purpose Guarantee</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read Aloud AI exists solely to read web page text aloud using custom ElevenLabs neural voices or browser speech synthesis.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <KeyRound className="w-4 h-4" />
              <span>100% Local Storage</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your ElevenLabs API key and voice settings are encrypted and stored strictly on your device using <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded font-mono font-semibold">chrome.storage.local</code>.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Zero Data Monetization</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Certified under Chrome Web Store guidelines: zero telemetry, zero ad tracking, and guaranteed no third-party data sales.
            </p>
          </div>
        </div>

        {/* Layout with sticky TOC on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents Sidebar */}
          <div className="lg:col-span-4 sticky top-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Table of Contents</span>
            </h3>
            <nav className="space-y-1.5">
              {PRIVACY_POLICY_SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                    activeSection === sec.id
                      ? 'bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {sec.title}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <div className="text-xs font-semibold text-slate-900">Need custom voice configurations?</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                You can switch between ElevenLabs API voices and offline Eco-Friendly browser TTS at any time inside the extension popup.
              </p>
            </div>
          </div>

          {/* Main Legal Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {PRIVACY_POLICY_SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 p-6 sm:p-10 rounded-2xl bg-white border border-slate-200/90 shadow-md space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    {renderIcon(sec.iconName)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{sec.title}</h2>
                    <p className="text-xs text-slate-500">{sec.summary}</p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-700 text-base leading-relaxed">
                  {sec.content.map((para, pIdx) => (
                    <p key={pIdx} className="font-normal">{para}</p>
                  ))}
                </div>

                {/* If section has detailed permission justifications, render visual cards */}
                {sec.permissions && (
                  <div className="mt-6 space-y-4 pt-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Manifest v3 Permission Breakdown:
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {sec.permissions.map((perm, permIdx) => (
                        <div
                          key={permIdx}
                          className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 font-mono font-bold text-base text-slate-900">
                              <span className="text-blue-600">&bull;</span>
                              <code>{perm.name}</code>
                            </div>
                            <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                              {perm.badge}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            <strong className="text-slate-900 font-semibold">Justification:</strong> {perm.justification}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specific highlight for Declarations & Data Usage */}
                {sec.id === 'data-usage' && (
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 pt-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>Formal Data Usage Summary</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 min-w-[140px]">Remote Code:</span>
                        <span>No, remote code is not used. Justification field is empty as required by Chrome policies.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 min-w-[140px]">Data Collected:</span>
                        <span>Website content (text, images, sounds, videos, or hyperlinks). Only highlighted text is read.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 min-w-[140px]">Data Storage:</span>
                        <span>chrome.storage.local for API keys, playback speed, voice choice, and Eco-TTS preferences.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action for Security Researchers */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-200 shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <Github className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 max-w-xl mx-auto">
            Auditing Our Codebase is 100% Free & Open
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We invite developers and security researchers to inspect our manifest permissions, local storage handling, and ElevenLabs API integration on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/adamclasic/read-aloud-extension"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
            >
              View GitHub Repository &rarr;
            </a>
            <button
              onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-colors shadow-2xs"
            >
              Back to Interactive Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

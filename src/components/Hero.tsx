import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Github, Play, Pause, FastForward, Volume2, Shield, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { PageTab } from '../types';

interface HeroProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenInstall: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTab, onOpenInstall }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [speed, setSpeed] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1.25x');
  const [voiceMode, setVoiceMode] = useState<'elevenlabs' | 'eco'>('elevenlabs');

  // Simulate audio progress when playing in hero preview
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.5;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleSpeed = () => {
    const speeds: ('1x' | '1.25x' | '1.5x' | '2x')[] = ['1x', '1.25x', '1.5x', '2x'];
    const currentIndex = speeds.indexOf(speed);
    setSpeed(speeds[(currentIndex + 1) % speeds.length]);
  };

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white text-slate-900">
      {/* Background architectural glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-sky-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-blue-600 text-xs font-semibold shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Source Chrome Extension &bull; v1.2.0 Released</span>
            <a 
              href="https://github.com/adamclasic/read-aloud-extension" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 hover:underline flex items-center gap-1 ml-1"
            >
              <span>GitHub</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Turn Any Webpage Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Lifelike Neural Audio.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Read selected text aloud using your custom <strong className="text-slate-900 font-semibold">ElevenLabs API key</strong> or zero-latency <strong className="text-slate-900 font-semibold">Eco-Friendly browser TTS</strong>. Highlight text, right-click, or press play—with zero tracking and 100% open-source transparency.
          </p>

          {/* Key Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700 pt-2 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Right-Click Instant Trigger</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Floating In-Page Player</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>No Telemetry / No Ads</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenInstall}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Add to Chrome &mdash; Free</span>
            </button>

            <a
              href="#demo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-base shadow-sm transition-all"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Test Live Interactive Demo</span>
            </a>

            <button
              onClick={() => { onSelectTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              <Shield className="w-4 h-4 text-slate-500" />
              <span>Privacy Policy</span>
            </button>
          </div>

          {/* Donation / Sponsor Call to Action */}
          <div className="pt-5 flex items-center justify-center animate-fade-in">
            <a
              href="https://github.com/adamclasic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm group"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500 text-white shadow-2xs group-hover:scale-110 transition-transform">
                <Heart className="w-3.5 h-3.5 fill-white" />
              </span>
              <span>100% free & ad-free. Consider supporting Adam Clasic's open-source work on GitHub &rarr;</span>
            </a>
          </div>
        </div>

        {/* Interactive Browser Widget Simulation */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-2 sm:p-4 shadow-xl">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 text-xs text-slate-500 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1 rounded-md border border-slate-200 text-slate-600 w-64 sm:w-96 truncate">
              <Shield className="w-3 h-3 text-blue-600 shrink-0" />
              <span className="truncate">https://en.wikipedia.org/wiki/Speech_synthesis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-[10px] shadow-2xs">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Simulated Web Article Content */}
          <div className="p-4 sm:p-8 bg-slate-50/60 rounded-xl text-slate-700 font-serif leading-relaxed text-base sm:text-lg space-y-4 relative border border-slate-100">
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 border-b border-slate-200 pb-2">
              Artificial Intelligence and Neural Voice Synthesis
            </h3>
            <p>
              In recent years, text-to-speech (TTS) technology has transitioned from basic mechanical algorithms to deep neural network architectures. Modern AI models analyze emotional context, syntactic phrasing, and breath cadences.
            </p>
            
            {/* Highlighted text representing active selection */}
            <div className="relative">
              <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border-b-2 border-blue-500 font-medium">
                "With Read Aloud AI, users can highlight any paragraph, right-click, and listen to studio-grade ElevenLabs narration or offline Eco-TTS instantly without leaving their workflow."
              </span>
              
              {/* Floating Context Menu indicator */}
              <div className="absolute -top-3 right-0 sm:right-10 bg-white border border-slate-200 rounded-lg shadow-xl px-2.5 py-1 text-xs font-sans font-semibold text-slate-800 flex items-center gap-1.5 animate-bounce">
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Right-click &rarr; 'Listen to selected text'</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base">
              By running as a single-purpose, open-source extension, Read Aloud AI ensures that no browsing habits or private documents are ever logged or monetized by third parties.
            </p>

            {/* Simulated Floating Audio Player Widget (Injected onto page) */}
            <div className="mt-8 pt-4">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
                {/* Play/Pause & Voice Selector */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 transition-transform active:scale-95"
                    title={isPlaying ? 'Pause narration' : 'Play narration'}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                  </button>

                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Floating Widget</span>
                      <span className="text-[10px] bg-blue-50 px-1.5 py-0.5 rounded text-blue-600 font-mono font-semibold border border-blue-100">Active Tab</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <button
                        onClick={() => setVoiceMode(voiceMode === 'elevenlabs' ? 'eco' : 'elevenlabs')}
                        className={`text-xs px-2 py-0.5 rounded font-medium transition-all ${
                          voiceMode === 'elevenlabs'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        ElevenLabs (Neural)
                      </button>
                      <button
                        onClick={() => setVoiceMode(voiceMode === 'eco' ? 'elevenlabs' : 'eco')}
                        className={`text-xs px-2 py-0.5 rounded font-medium transition-all ${
                          voiceMode === 'eco'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Eco-TTS (Offline)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scrubber Progress Bar */}
                <div className="w-full sm:flex-1 px-0 sm:px-6">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-mono">
                    <span>{isPlaying ? '0:12' : '0:00'}</span>
                    <span className="text-blue-600 font-semibold">
                      {voiceMode === 'elevenlabs' ? 'Voice: Rachel (Studio)' : 'Voice: Standard Browser Speech'}
                    </span>
                    <span>0:34</span>
                  </div>
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      setProgress(Math.max(0, Math.min(100, pos * 100)));
                    }}
                    className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden cursor-pointer border border-slate-200"
                  >
                    <div 
                      className="h-full bg-blue-600 transition-all duration-200 relative rounded-full"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>

                {/* Speed Controls & Settings */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={toggleSpeed}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-mono font-bold transition-all"
                    title="Toggle playback speed"
                  >
                    <FastForward className="w-3.5 h-3.5 text-blue-600" />
                    <span>{speed}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-3 pb-1 text-xs text-slate-500 font-medium">
            &uarr; Interactive simulation of Read Aloud AI's lightweight floating audio player injected via the <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded border border-blue-100 font-mono">scripting</code> permission.
          </div>
        </div>
      </div>
    </section>
  );
};

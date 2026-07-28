import React, { useState, useEffect } from 'react';
import { DEMO_ARTICLES } from '../data/content';
import { Play, Pause, Volume2, FastForward, Sparkles, RefreshCw, Check, BookOpen, Edit3, Eye, EyeOff, CheckCircle2, ChevronDown } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(DEMO_ARTICLES[0].id);
  const [customText, setCustomText] = useState<string>('');
  const [isEditingCustom, setIsEditingCustom] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeVoiceMode, setActiveVoiceMode] = useState<'elevenlabs' | 'eco'>('elevenlabs');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  // Popup Replica State matching user screenshot
  const [apiKeyVisible, setApiKeyVisible] = useState<boolean>(false);
  const [forceEcoMode, setForceEcoMode] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('Roger - Laid-Back, Casual, Resonant (american)');
  const [selectedModel, setSelectedModel] = useState<string>('eleven_flash_v2_5 (Fastest / Cheapest)');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const currentArticle = DEMO_ARTICLES.find(a => a.id === selectedArticleId) || DEMO_ARTICLES[0];
  const activeText = isEditingCustom && customText.trim().length > 0 ? customText : currentArticle.content;
  const words = activeText.split(' ');

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Sync Eco mode with activeVoiceMode
  useEffect(() => {
    if (forceEcoMode) {
      setActiveVoiceMode('eco');
    } else {
      setActiveVoiceMode('elevenlabs');
    }
  }, [forceEcoMode]);

  // Handle actual speech synthesis or simulated neural progression
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      if (activeVoiceMode === 'eco' && speechSupported && typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeText);
        utterance.rate = playbackSpeed;
        
        // Try to pick a natural English voice if available
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        utterance.onend = () => {
          setIsPlaying(false);
          setActiveWordIndex(0);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
      }

      // Simulate word-by-word reading highlight
      interval = setInterval(() => {
        setActiveWordIndex((prev) => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            if (activeVoiceMode === 'eco' && typeof window !== 'undefined') {
              window.speechSynthesis.cancel();
            }
            return 0;
          }
          return prev + 1;
        });
      }, 280 / playbackSpeed);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, activeVoiceMode, playbackSpeed, activeText, words.length, speechSupported]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <section id="demo" className="py-24 bg-white text-slate-900 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Speech Simulator & Extension Settings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Test Drive Read Aloud AI in Action
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Experience our floating audio reader and customize settings in our live replica of the extension popup. Switch between <strong className="text-slate-900">ElevenLabs Neural Voices</strong> and zero-cost <strong className="text-slate-900">Eco-Friendly Browser TTS</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Article Selector / Custom Input Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">
                Select Sample Article or Paste Your Own
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {DEMO_ARTICLES.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      setSelectedArticleId(article.id);
                      setIsEditingCustom(false);
                      setIsPlaying(false);
                      setActiveWordIndex(0);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      !isEditingCustom && selectedArticleId === article.id
                        ? 'bg-blue-50/70 border-blue-600 shadow-md shadow-blue-500/5'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className={!isEditingCustom && selectedArticleId === article.id ? 'text-blue-600 font-bold' : 'text-slate-500'}>
                        {article.category}
                      </span>
                      {!isEditingCustom && selectedArticleId === article.id && (
                        <Check className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-900 mb-1">{article.title}</div>
                    <div className="text-[11px] text-slate-500">{article.source}</div>
                  </button>
                ))}

                <button
                  onClick={() => {
                    setIsEditingCustom(true);
                    setIsPlaying(false);
                    setActiveWordIndex(0);
                    if (!customText) {
                      setCustomText("Welcome to Read Aloud AI! Type or paste any custom article, research paper snippet, or email here, and our speech synthesizer will read it out loud instantly.");
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    isEditingCustom
                      ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-500/15 text-white'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isEditingCustom ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${isEditingCustom ? 'text-white' : 'text-slate-900'}`}>Custom Text Sandbox</div>
                    <div className={`text-xs ${isEditingCustom ? 'text-blue-100' : 'text-slate-500'}`}>Paste your own paragraph to test</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Extension Settings Popup Replica (Directly matching user screenshot design) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg space-y-5 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-blue-600 stroke-[2.5]" />
                  <span className="font-bold text-slate-900 text-base">Read Aloud AI</span>
                </div>
                <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 uppercase">
                  ElevenLabs
                </span>
              </div>

              {/* Connected Status Card */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-xs font-medium text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Connected &mdash; 23 voices available</span>
              </div>

              {/* API Key Section */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>ElevenLabs API Key</span>
                  <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-0.5 font-medium">
                    <span>Get Key</span>
                    <span className="text-[10px]">&nearr;</span>
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={apiKeyVisible ? 'text' : 'password'}
                    value="el_sk_live_8a992837482019283749201"
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 pr-10 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {apiKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Stored securely in local extension storage. Never synced to cloud.
                </p>
              </div>

              {/* Force Browser TTS Mode (Eco) Card */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <span className="text-amber-500">&#9889;</span>
                    <span>Force Browser TTS Mode</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      &#127793; Eco
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Bypasses ElevenLabs API and forces local browser speech synthesis
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setForceEcoMode(!forceEcoMode)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                    forceEcoMode ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Voice Dropdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Voice</span>
                  <button type="button" className="text-blue-600 hover:underline flex items-center gap-1 text-[11px] font-medium">
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                >
                  <option value="Roger - Laid-Back, Casual, Resonant (american)">Roger - Laid-Back, Casual, Resonant (american)</option>
                  <option value="Rachel - Clear, Professional, Narrator">Rachel - Clear, Professional, Narrator</option>
                  <option value="Clyde - Warm, Deep, Audiobook">Clyde - Warm, Deep, Audiobook</option>
                  <option value="Fin - Lively, Expressive, Energetic">Fin - Lively, Expressive, Energetic</option>
                </select>
              </div>

              {/* Model Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-800 block">Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-2xs"
                >
                  <option value="eleven_flash_v2_5 (Fastest / Cheapest)">eleven_flash_v2_5 (Fastest / Cheapest)</option>
                  <option value="eleven_multilingual_v2 (Highest Quality)">eleven_multilingual_v2 (Highest Quality)</option>
                  <option value="eleven_turbo_v2_5 (Ultra Low Latency)">eleven_turbo_v2_5 (Ultra Low Latency)</option>
                </select>
              </div>

              {/* Advanced Voice Settings Accordion */}
              <div className="border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-50/40 cursor-pointer hover:bg-slate-100/50 transition-colors">
                <span>Advanced Voice Settings</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>

              {/* Save Settings Button */}
              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Settings Saved!</span>
                  </>
                ) : (
                  <span>Save Settings</span>
                )}
              </button>
            </div>
          </div>

          {/* Reader Viewport & Floating Player */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xl flex flex-col">
            {/* Top Toolbar */}
            <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">
                  {isEditingCustom ? 'Custom Sandbox Article' : currentArticle.title}
                </span>
              </div>

              {/* Voice Mode Selector Pill */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => { setActiveVoiceMode('elevenlabs'); setForceEcoMode(false); setIsPlaying(false); }}
                  className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                    activeVoiceMode === 'elevenlabs'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ElevenLabs (Neural)</span>
                </button>
                <button
                  onClick={() => { setActiveVoiceMode('eco'); setForceEcoMode(true); setIsPlaying(false); }}
                  className={`px-3 py-1 rounded-md transition-all font-semibold ${
                    activeVoiceMode === 'eco'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Eco-TTS (Live Browser)
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6 sm:p-10 min-h-[320px] text-base sm:text-lg leading-relaxed font-serif text-slate-800 relative bg-white">
              {isEditingCustom ? (
                <div className="space-y-3">
                  <label className="text-xs font-sans font-bold uppercase tracking-wider text-blue-600">
                    Type or paste text below:
                  </label>
                  <textarea
                    rows={8}
                    value={customText}
                    onChange={(e) => { setCustomText(e.target.value); setIsPlaying(false); setActiveWordIndex(0); }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-slate-900 font-sans text-base focus:outline-none focus:border-blue-600 transition-colors shadow-inner"
                    placeholder="Type or paste any paragraph here..."
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-sans text-slate-400 uppercase tracking-widest font-semibold">
                    {currentArticle.source}
                  </div>
                  
                  {/* Interactive Word-by-Word Highlight Rendering */}
                  <p className="select-text text-slate-700">
                    {words.map((word, idx) => (
                      <span
                        key={idx}
                        onClick={() => { setActiveWordIndex(idx); if (!isPlaying) setIsPlaying(true); }}
                        className={`inline-block mr-1.5 px-1 py-0.5 rounded transition-all cursor-pointer ${
                          isPlaying && idx === activeWordIndex
                            ? 'bg-blue-600 text-white font-bold scale-105 shadow-2xs'
                            : isPlaying && idx < activeWordIndex
                            ? 'text-slate-400'
                            : 'hover:bg-slate-100'
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause Reading</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>Listen to Article</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSpeedChange}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono font-bold transition-colors shadow-2xs"
                  >
                    <FastForward className="w-3.5 h-3.5 text-blue-600" />
                    <span>{playbackSpeed}x Speed</span>
                  </button>

                  <button
                    onClick={() => { setIsPlaying(false); setActiveWordIndex(0); }}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 text-xs transition-colors shadow-2xs"
                    title="Reset reading progress"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Animated Waveform / Status */}
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 w-full sm:w-auto justify-between sm:justify-start shadow-2xs">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isPlaying
                            ? activeVoiceMode === 'elevenlabs'
                              ? 'bg-blue-600 animate-pulse'
                              : 'bg-emerald-600 animate-pulse'
                            : 'bg-slate-300 h-2'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(6, (Math.sin(i * 2 + activeWordIndex) * 12) + 12)}px` : '8px'
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      {activeVoiceMode === 'elevenlabs' ? 'ElevenLabs Engine' : 'Browser Web Speech Engine'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {isPlaying ? 'Synthesizing selected text...' : 'Ready to speak selection'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

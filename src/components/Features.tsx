import React from 'react';
import { FEATURES_DATA } from '../data/content';
import { Sparkles, Leaf, MousePointerClick, Volume2, ShieldCheck, Code2 } from 'lucide-react';

export const Features: React.FC = () => {
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 stroke-[2.2]" };
    switch (name) {
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'MousePointerClick': return <MousePointerClick {...props} />;
      case 'Volume2': return <Volume2 {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Code2': return <Code2 {...props} />;
      default: return <Volume2 {...props} />;
    }
  };

  return (
    <section id="features" className="py-24 bg-slate-50/50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Speed, Quality, and Total Privacy
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Unlike commercial text-to-speech readers that monetize user browsing habits, Read Aloud AI is built from the ground up to give you complete control over your voice engines and your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="group p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-xl transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    {renderIcon(feature.iconName)}
                  </div>
                  {feature.badge && (
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-blue-300 transition-colors">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Verified Manifest v3</span>
                <span className="text-blue-600 font-mono font-medium">Zero Telemetry</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

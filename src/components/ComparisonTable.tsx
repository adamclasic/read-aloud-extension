import React from 'react';
import { COMPARISON_DATA } from '../data/content';
import { CheckCircle2, XCircle, HelpCircle, Shield, Volume2 } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const renderCell = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-600">
          <XCircle className="w-5 h-5 stroke-[2.5]" />
        </span>
      );
    }
    return <span className="text-xs sm:text-sm font-semibold text-slate-700">{val}</span>;
  };

  return (
    <section id="compare" className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-200 shadow-2xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Competitive Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Switch to Read Aloud AI?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We believe reading web pages aloud should be free, customizable, and respectful of your privacy. Here is how we stack up against proprietary alternatives like ReadAloud.net.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs sm:text-sm uppercase tracking-wider text-slate-500">
                <th className="p-4 sm:p-6 font-bold text-slate-900 min-w-[240px]">Feature & Security Benchmark</th>
                <th className="p-4 sm:p-6 font-bold text-blue-600 bg-blue-50/60 text-center min-w-[180px] border-x border-slate-200">
                  <div className="flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-600" />
                    <span>Read Aloud AI</span>
                  </div>
                  <div className="text-[10px] text-blue-600 font-normal mt-0.5 font-mono font-semibold">Open Source Extension</div>
                </th>
                <th className="p-4 sm:p-6 font-semibold text-slate-700 text-center min-w-[160px]">
                  <div>ReadAloud.net</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">Proprietary Competitor</div>
                </th>
                <th className="p-4 sm:p-6 font-semibold text-slate-600 text-center min-w-[140px]">
                  <div>Basic OS TTS</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">Built-in Reader</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 sm:p-6 text-slate-800 font-medium flex items-center justify-between gap-2">
                    <span>{row.feature}</span>
                    {row.tooltip && (
                      <div className="group relative cursor-help">
                        <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2.5 bg-slate-900 text-white text-xs rounded-lg shadow-xl border border-slate-800 z-20 font-normal leading-relaxed">
                          {row.tooltip}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-4 sm:p-6 text-center bg-blue-50/40 border-x border-slate-200 font-semibold">
                    {renderCell(row.readAloudAi)}
                  </td>
                  <td className="p-4 sm:p-6 text-center">
                    {renderCell(row.competitor)}
                  </td>
                  <td className="p-4 sm:p-6 text-center">
                    {renderCell(row.standardTts)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
          <p>
            <strong className="text-slate-900">Note on Business Model:</strong> Read Aloud AI is freely distributed under the MIT license without advertisements or subscription paywalls.
          </p>
          <a
            href="https://github.com/adamclasic/read-aloud-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold shrink-0"
          >
            Verify source code on GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

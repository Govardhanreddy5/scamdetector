import React from 'react';
import { HelpCircle, SearchCode, ShieldAlert } from 'lucide-react';
import { RedFlag, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface WhyFlaggedSectionProps {
  redFlags: RedFlag[];
  language?: Language;
}

export const WhyFlaggedSection: React.FC<WhyFlaggedSectionProps> = ({
  redFlags,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];

  if (redFlags.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-md border border-slate-800">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <SearchCode className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {t.whyFlagged}
          </h3>
          <p className="text-xs text-slate-400">
            Transparent breakdown of the exact text triggers that activated safety rules
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {redFlags.map((flag, idx) => (
          <div
            key={idx}
            className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start gap-2.5 mb-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Triggered Phrase in Message:
                </span>
                <div className="font-mono text-sm text-amber-200 bg-slate-950/80 px-3 py-1.5 rounded border border-slate-700/60 mt-1 break-words">
                  "{flag.evidence}"
                </div>
              </div>
            </div>

            <div className="mt-2.5 pl-6 text-xs text-slate-300 leading-relaxed border-l-2 border-slate-700">
              <span className="text-slate-400 font-semibold">Regulatory & Safety Context: </span>
              {flag.explanation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

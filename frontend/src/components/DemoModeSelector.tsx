import React from 'react';
import { Sparkles, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface DemoModeSelectorProps {
  onSelectCase: (caseId: string) => void;
  language?: Language;
  isLoading?: boolean;
}

export const DemoModeSelector: React.FC<DemoModeSelectorProps> = ({
  onSelectCase,
  language = 'en',
  isLoading = false,
}) => {
  const t = TRANSLATIONS[language];

  const cases = [
    {
      id: 'case-1-high-risk',
      title: t.demoCase1,
      tag: 'High Risk',
      icon: AlertTriangle,
      color: 'border-rose-300 bg-rose-50/70 hover:bg-rose-100/70 text-rose-950',
      badgeColor: 'bg-rose-200 text-rose-900',
    },
    {
      id: 'case-2-misleading',
      title: t.demoCase2,
      tag: 'Misleading Claim',
      icon: AlertCircle,
      color: 'border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 text-amber-950',
      badgeColor: 'bg-amber-200 text-amber-900',
    },
    {
      id: 'case-3-educational',
      title: t.demoCase3,
      tag: 'Low Risk',
      icon: ShieldCheck,
      color: 'border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-950',
      badgeColor: 'bg-emerald-200 text-emerald-900',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-900 text-white rounded-2xl p-5 mb-8 border border-slate-700/80 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-saffron-500/20 text-saffron-500 border border-saffron-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-tight text-white">
                {t.demoModeTitle}
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-saffron-500/30 text-amber-300 border border-saffron-500/40">
                {t.demoModeBadge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {t.demoPrompt}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              type="button"
              disabled={isLoading}
              onClick={() => onSelectCase(c.id)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer disabled:opacity-50 ${c.color}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                  {c.tag}
                </span>
                <Icon className="w-4 h-4 shrink-0 opacity-80" />
              </div>
              <p className="text-xs font-semibold leading-snug line-clamp-2">
                {c.title}
              </p>
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-slate-400 mt-2.5 text-center italic">
        * Clearly labeled demonstration scenarios with simulated statutory verification for rapid hackathon testing.
      </p>
    </div>
  );
};

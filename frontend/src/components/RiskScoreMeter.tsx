import React from 'react';
import { Info } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface RiskScoreMeterProps {
  score: number; // 0 to 10
  language?: Language;
}

export const RiskScoreMeter: React.FC<RiskScoreMeterProps> = ({ score, language = 'en' }) => {
  const t = TRANSLATIONS[language];
  const boundedScore = Math.min(10, Math.max(0, score));
  const percentage = (boundedScore / 10) * 100;

  let colorClass = 'bg-emerald-500';
  let textClass = 'text-emerald-700';
  if (boundedScore >= 7) {
    colorClass = 'bg-rose-500';
    textClass = 'text-rose-700';
  } else if (boundedScore >= 4) {
    colorClass = 'bg-amber-500';
    textClass = 'text-amber-700';
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.riskScoreLabel}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className={`text-3xl font-extrabold tracking-tight ${textClass}`}>
              {boundedScore}
            </span>
            <span className="text-slate-400 font-semibold text-sm">/ 10</span>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md ${
              boundedScore >= 7
                ? 'bg-rose-100 text-rose-800'
                : boundedScore >= 4
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {boundedScore >= 7 ? 'Critical Indicators' : boundedScore >= 4 ? 'Cautionary Signals' : 'Low Risk Signals'}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass}`}
          style={{ width: `${Math.max(percentage, 5)}%` }}
          role="progressbar"
          aria-valuenow={boundedScore}
          aria-valuemin={0}
          aria-valuemax={10}
        />
      </div>

      <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-1.5 px-0.5">
        <span>0 (Benign)</span>
        <span>5 (Moderate)</span>
        <span>10 (High Risk)</span>
      </div>

      {/* Important Clarification Note */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          {t.riskScoreClarification}
        </p>
      </div>
    </div>
  );
};

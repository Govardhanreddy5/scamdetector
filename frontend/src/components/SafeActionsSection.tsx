import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SafeActionsSectionProps {
  safeActions: string[];
  avoidActions: string[];
  language?: Language;
}

export const SafeActionsSection: React.FC<SafeActionsSectionProps> = ({
  safeActions,
  avoidActions,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {t.safeNextSteps}
          </h3>
          <p className="text-xs text-slate-500">
            Mandatory safety practices recommended by SEBI and Indian cyber authorities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* DO LIST */}
        <div className="bg-emerald-50/60 rounded-xl border border-emerald-200/80 p-5">
          <div className="flex items-center gap-2 mb-3.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <h4 className="font-bold text-emerald-950 text-sm tracking-wide uppercase">
              {t.dosHeading}
            </h4>
          </div>
          <ul className="space-y-2.5">
            {safeActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-emerald-950 leading-relaxed">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'T LIST */}
        <div className="bg-rose-50/60 rounded-xl border border-rose-200/80 p-5">
          <div className="flex items-center gap-2 mb-3.5">
            <XCircle className="w-4 h-4 text-rose-700 shrink-0" />
            <h4 className="font-bold text-rose-950 text-sm tracking-wide uppercase">
              {t.dontsHeading}
            </h4>
          </div>
          <ul className="space-y-2.5">
            {avoidActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-rose-950 leading-relaxed">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Official Emergency Contact Badges */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <PhoneCall className="w-4 h-4 text-brand-600" />
          <span>Immediate Cyber Financial Fraud Helpline: <strong className="text-slate-900 underline font-bold">1930</strong> (Free Toll-Free)</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1 hover:underline"
          >
            cybercrime.gov.in <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1 hover:underline"
          >
            SEBI SCORES <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Shield, Lock, ExternalLink, AlertOctagon } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Brand info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                ScamLens Bharat
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              AI-powered investor protection and misinformation detection platform engineered for Indian retail investors, Tier-2/3 citizens, and first-time savers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{t.privacyNoticeTitle}: No passwords, OTPs, or messages are ever retained.</span>
            </div>
          </div>

          {/* Statutory Emergency Helplines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Official Indian Grievance Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>National Cyber Crime Reporting Portal (1930)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>SEBI Complaints Redress System (SCORES)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sachet.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>RBI Sachet Portal (Unregulated Schemes)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://investor.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>SEBI Investor Education Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimers & Ethics */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              <span>Safety & Non-Advisory Notice</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.officialDisclaimers}
            </p>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              ScamLens Bharat is an independent public-good research platform. It does not provide stock buy/sell tips, predict returns, or endorse any broker or scheme.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScamLens Bharat. Built with pride for Indian investor safety.</p>
          <p className="text-[11px]">
            Designed for Bharat • English • हिन्दी • తెలుగు
          </p>
        </div>
      </div>
    </footer>
  );
};

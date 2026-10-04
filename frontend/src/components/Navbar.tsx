import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigateHome,
  onOpenDemo,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-xs group-hover:bg-brand-800 transition-colors">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                ScamLens
              </span>
              <span className="text-xs font-black px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-300">
                BHARAT
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {t.brandTagline}
            </p>
          </div>
        </button>

        {/* Right Nav actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenDemo}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.demoModeBadge}</span>
          </button>

          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
};

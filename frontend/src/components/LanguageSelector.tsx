import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'hi', label: 'HI', native: 'हिन्दी' },
    { code: 'te', label: 'TE', native: 'తెలుగు' },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-lg border border-slate-200">
      <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" aria-hidden="true" />
      <div className="flex gap-1" role="group" aria-label="Select application language">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              aria-pressed={isActive}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title={lang.native}
            >
              <span>{lang.native}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

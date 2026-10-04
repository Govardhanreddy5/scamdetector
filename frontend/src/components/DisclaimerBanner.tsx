import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface DisclaimerBannerProps {
  language?: Language;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language = 'en' }) => {
  const t = TRANSLATIONS[language];

  return (
    <aside
      aria-label="Statutory Safety Notice"
      className="bg-amber-50/90 border border-amber-200 text-amber-900 rounded-xl p-3.5 flex items-start gap-3 text-xs leading-relaxed"
    >
      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
      <p>
        <strong className="font-semibold">Investor Safety Notice: </strong>
        {t.officialDisclaimers}
      </p>
    </aside>
  );
};

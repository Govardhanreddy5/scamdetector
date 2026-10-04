import React from 'react';
import { AlertTriangle, AlertCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { RiskLevel, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface RiskBadgeProps {
  level: RiskLevel;
  language?: Language;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  language = 'en',
  size = 'md',
}) => {
  const t = TRANSLATIONS[language];

  let config = {
    label: t.lowRiskBadge,
    icon: ShieldCheck,
    bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    iconColor: 'text-emerald-600',
  };

  switch (level) {
    case 'HIGH':
      config = {
        label: t.highRiskBadge,
        icon: AlertTriangle,
        bgClass: 'bg-rose-50 text-rose-800 border-rose-300',
        iconColor: 'text-rose-600',
      };
      break;
    case 'MEDIUM':
      config = {
        label: t.mediumRiskBadge,
        icon: AlertCircle,
        bgClass: 'bg-amber-50 text-amber-900 border-amber-300',
        iconColor: 'text-amber-600',
      };
      break;
    case 'UNABLE_TO_VERIFY':
      config = {
        label: t.unverifiedBadge,
        icon: HelpCircle,
        bgClass: 'bg-slate-100 text-slate-800 border-slate-300',
        iconColor: 'text-slate-600',
      };
      break;
  }

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5 font-bold',
  }[size];

  return (
    <div
      role="status"
      aria-label={`Risk level: ${config.label}`}
      className={`inline-flex items-center rounded-full border font-semibold shadow-xs ${config.bgClass} ${sizeClasses}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <span>{config.label}</span>
    </div>
  );
};

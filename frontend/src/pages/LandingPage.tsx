import React from 'react';
import {
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Smartphone,
  Lock,
  MessageSquare,
  Globe2,
  AlertTriangle,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface LandingPageProps {
  language: Language;
  onStartAnalysis: () => void;
  onOpenDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onStartAnalysis,
  onOpenDemo,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-6 shadow-2xs">
          <ShieldAlert className="w-3.5 h-3.5 text-brand-600" />
          <span>Public-Good Investor Protection Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t.heroHeadline}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onStartAnalysis}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>{t.analyzeBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Try Sample Scenarios ({t.demoModeBadge})</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Zero Data Storage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <span>English • हिन्दी • తెలుగు</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
            <span>SEBI & RBI Regulatory Heuristics</span>
          </div>
        </div>
      </section>

      {/* Statutory Disclaimer */}
      <section className="max-w-4xl mx-auto px-4">
        <DisclaimerBanner language={language} />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            Combining deterministic statutory rule checking with AI claim extraction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {t.howStep1Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.howStep1Desc}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {t.howStep2Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.howStep2Desc}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {t.howStep3Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.howStep3Desc}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {t.howStep4Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.howStep4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Common Scam Patterns in India */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t.commonScamsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
              <h3 className="text-sm font-bold text-amber-300 mb-1.5">
                {t.commonScam1Title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.commonScam1Desc}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
              <h3 className="text-sm font-bold text-amber-300 mb-1.5">
                {t.commonScam2Title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.commonScam2Desc}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
              <h3 className="text-sm font-bold text-amber-300 mb-1.5">
                {t.commonScam3Title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.commonScam3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bharat First Accessibility & Privacy */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-800">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Bharat-First Regional Accessibility
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Designed specifically for first-time investors, Tier-2 and Tier-3 city savers, and elderly citizens who receive financial forwards on WhatsApp. All explanations avoid complex institutional jargon and can be toggled into simplified regional languages.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {t.privacyNoticeTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.privacyNoticeDesc}
          </p>
        </div>
      </section>
    </div>
  );
};

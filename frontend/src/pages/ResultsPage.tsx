import React, { useState } from 'react';
import {
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  FileCheck2,
  Globe2,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { AnalysisResult, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { RiskBadge } from '../components/RiskBadge';
import { RiskScoreMeter } from '../components/RiskScoreMeter';
import { RedFlagCard } from '../components/RedFlagCard';
import { ClaimCard } from '../components/ClaimCard';
import { WhyFlaggedSection } from '../components/WhyFlaggedSection';
import { SafeActionsSection } from '../components/SafeActionsSection';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface ResultsPageProps {
  result: AnalysisResult;
  language: Language;
  onAnalyzeAnother: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  language,
  onAnalyzeAnother,
}) => {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  const handleCopySummary = async () => {
    const textToCopy = `ScamLens Bharat Investor Safety Report:
Risk Level: ${result.riskLevel} (${result.riskScore}/10)
Summary: ${result.summary}
Red Flags Detected: ${result.redFlags.length}
Key Safe Steps:
${result.safeActions.map((a) => `• ${a}`).join('\n')}

Audit performed on ${new Date(result.analyzedAt).toLocaleDateString()} via ScamLens Bharat.`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failure
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner & Demo Label if applicable */}
      {result.isDemo && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>{t.demoModeBadge}:</strong> Displaying pre-analyzed Indian scenario.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900">
            Simulated Audit
          </span>
        </div>
      )}

      {/* Main Risk Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.riskAssessment}
            </span>
            <div className="mt-2 flex items-center gap-3">
              <RiskBadge level={result.riskLevel} language={language} size="lg" />
            </div>
          </div>

          {/* Simple Explanation Mode Toggle */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsSimpleMode(!isSimpleMode)}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer"
            >
              {isSimpleMode ? (
                <ToggleRight className="w-6 h-6 text-brand-600" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400" />
              )}
              <span>{t.simpleExplanationToggle}</span>
            </button>
          </div>
        </div>

        {/* Meter and Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
          <RiskScoreMeter score={result.riskScore} language={language} />

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              {isSimpleMode ? 'Plain Language Summary' : 'Safety Audit Overview'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-100">
              {isSimpleMode
                ? result.riskLevel === 'HIGH'
                  ? 'यह संदेश या ऑफर आपके पैसे के लिए बहुत खतरनाक हो सकता है। किसी भी तरह से पैसे न भेजें और अपना पासवर्ड/ओटीपी कभी न बताएं।'
                  : result.summary
                : result.summary}
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-3">
              <span>Deterministic Signals: <strong>{result.ruleSignalsCount}</strong></span>
              <span>•</span>
              <span>Confidence: <strong>{result.confidence}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Was This Flagged? (Evidence & Snippet Inspection) */}
      {result.redFlags.length > 0 && (
        <WhyFlaggedSection redFlags={result.redFlags} language={language} />
      )}

      {/* Detected Red Flags Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.redFlagsDetected} ({result.redFlags.length})
            </h3>
          </div>
        </div>

        {result.redFlags.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-xs text-emerald-800">
            {t.noRedFlags}
          </div>
        ) : (
          <div className="space-y-3">
            {result.redFlags.map((flag, idx) => (
              <RedFlagCard key={idx} flag={flag} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Claim Extraction & Verification Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.claimsDetected}
            </h3>
            <p className="text-xs text-slate-500">
              Claims extracted from content and checked against statutory guidelines
            </p>
          </div>
        </div>

        {result.claims.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-xs text-slate-500">
            {t.noClaims}
          </div>
        ) : (
          <div className="space-y-3">
            {result.claims.map((claim, idx) => (
              <ClaimCard key={idx} claim={claim} />
            ))}
          </div>
        )}
      </section>

      {/* Safe Actions (DOs & DON'Ts) */}
      <SafeActionsSection
        safeActions={result.safeActions}
        avoidActions={result.avoidActions}
        language={language}
      />

      {/* Disclaimer Banner */}
      <DisclaimerBanner language={language} />

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onAnalyzeAnother}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.analyzeAnother}</span>
        </button>

        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 shadow-2xs transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Copied Safety Report!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Safety Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

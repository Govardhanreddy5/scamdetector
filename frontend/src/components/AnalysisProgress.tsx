import React, { useEffect, useState } from 'react';
import { FileSearch, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AnalysisProgressProps {
  language?: Language;
}

const STEPS = [
  { id: 'extract', label: 'Extracting content & entities', icon: FileSearch },
  { id: 'claims', label: 'Detecting statutory & financial claims', icon: Sparkles },
  { id: 'rules', label: 'Checking risk signals against SEBI/RBI rules', icon: ShieldAlert },
  { id: 'explain', label: 'Synthesizing plain explanation & safe next steps', icon: CheckCircle2 },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center max-w-xl mx-auto my-6">
      <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-600 mb-4 animate-pulse">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Auditing Content Safety
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Running deterministic rule checks and multimodal financial verification...
      </p>

      {/* Steps List */}
      <div className="space-y-3 text-left max-w-md mx-auto">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-brand-50/70 border-brand-300 text-brand-900 font-semibold'
                  : isDone
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-white border-transparent text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`p-1.5 rounded-full shrink-0 ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : isCurrent
                    ? 'bg-brand-500 text-white animate-spin'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <StepIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs">{step.label}</span>
              {isDone && (
                <span className="ml-auto text-[11px] font-bold text-emerald-600">
                  Done
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

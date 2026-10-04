import React from 'react';
import { AlertTriangle, AlertCircle, Quote } from 'lucide-react';
import { RedFlag } from '../types';

interface RedFlagCardProps {
  flag: RedFlag;
  index: number;
}

const RED_FLAG_TITLES: Record<string, string> = {
  GUARANTEED_RETURNS: 'Guaranteed Returns / Assured Yield Trap',
  UNREALISTIC_PROFIT: 'Unrealistic or Astronomical Profit Claim',
  ARTIFICIAL_URGENCY: 'Artificial Urgency & Scarcity Tactics',
  UNVERIFIED_AUTHORITY: 'Unverified Regulatory or Statutory Claim',
  IMPERSONATION: 'Impersonation of Reputed Figures or Brands',
  SUSPICIOUS_CONTACT: 'Informal or Unaudited Private Messaging Group',
  SENSITIVE_INFO_REQUEST: 'Critical Request for OTP, PIN, or Credentials',
  MONEY_TRANSFER_PRESSURE: 'Payment Pressure to Personal UPI or Crypto',
  SUSPICIOUS_URL: 'Suspicious Domain, Shortened Link, or Insecure Host',
  MISSING_REGULATORY_INFO: 'Absence of Mandatory Statutory Disclosures',
  ADVANCE_FEE: 'Advance Clearance Fee or Tax Demand Before Withdrawal',
  RISK_FREE_CLAIM: 'False Claim of "Risk-Free" Investment',
};

export const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag, index }) => {
  const isHigh = flag.severity === 'HIGH';
  const humanTitle = RED_FLAG_TITLES[flag.type] || flag.type.replace(/_/g, ' ');

  return (
    <div
      className={`rounded-xl border p-4.5 transition-all ${
        isHigh
          ? 'bg-rose-50/50 border-rose-200 text-rose-950'
          : 'bg-amber-50/50 border-amber-200 text-amber-950'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div
            className={`p-1.5 rounded-lg mt-0.5 shrink-0 ${
              isHigh ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {isHigh ? (
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Red Flag #{index + 1}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isHigh ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
                }`}
              >
                {flag.severity} SEVERITY
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-base mt-1">
              {humanTitle}
            </h4>
          </div>
        </div>
      </div>

      {/* Snippet / Triggered Text Evidence */}
      {flag.evidence && (
        <div className="mt-3 bg-white/90 border border-slate-200/80 rounded-lg p-3 flex items-start gap-2.5 text-xs text-slate-800">
          <Quote className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5 rotate-180" />
          <div className="font-mono text-slate-700 bg-slate-50/90 px-1.5 py-0.5 rounded border border-slate-200/50 w-full overflow-x-auto break-words">
            "{flag.evidence}"
          </div>
        </div>
      )}

      {/* Why It Matters */}
      <div className="mt-3 text-sm text-slate-700 leading-relaxed">
        <span className="font-semibold text-slate-900">Why this matters: </span>
        {flag.explanation}
      </div>
    </div>
  );
};

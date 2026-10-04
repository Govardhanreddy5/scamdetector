import React from 'react';
import { HelpCircle, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { ExtractedClaim } from '../types';

interface ClaimCardProps {
  claim: ExtractedClaim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  let statusBadge = {
    label: 'UNVERIFIED',
    bg: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: HelpCircle,
    color: 'text-slate-500',
  };

  switch (claim.status) {
    case 'MISLEADING':
    case 'DEBUNKED':
      statusBadge = {
        label: claim.status,
        bg: 'bg-rose-100 text-rose-800 border-rose-300',
        icon: XCircle,
        color: 'text-rose-600',
      };
      break;
    case 'PLAUSIBLE_BENIGN':
      statusBadge = {
        label: 'CONSISTENT WITH GUIDELINES',
        bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        icon: CheckCircle2,
        color: 'text-emerald-600',
      };
      break;
    default:
      statusBadge = {
        label: 'VERIFICATION UNAVAILABLE',
        bg: 'bg-slate-100 text-slate-800 border-slate-300',
        icon: AlertCircle,
        color: 'text-slate-600',
      };
  }

  const Icon = statusBadge.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
        <h5 className="font-semibold text-slate-900 text-sm">
          Claim: <span className="font-normal italic">"{claim.claim}"</span>
        </h5>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadge.bg}`}
        >
          <Icon className={`w-3.5 h-3.5 ${statusBadge.color}`} aria-hidden="true" />
          {statusBadge.label}
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <span className="font-medium text-slate-800">Verification Assessment: </span>
        {claim.explanation || 'Verification unavailable from statutory registry records.'}
      </p>
    </div>
  );
};

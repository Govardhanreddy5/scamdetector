export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNABLE_TO_VERIFY';

export type RedFlagSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

export type RedFlagType =
  | 'GUARANTEED_RETURNS'
  | 'UNREALISTIC_PROFIT'
  | 'ARTIFICIAL_URGENCY'
  | 'UNVERIFIED_AUTHORITY'
  | 'IMPERSONATION'
  | 'SUSPICIOUS_CONTACT'
  | 'SENSITIVE_INFO_REQUEST'
  | 'MONEY_TRANSFER_PRESSURE'
  | 'SUSPICIOUS_URL'
  | 'MISSING_REGULATORY_INFO'
  | 'ADVANCE_FEE'
  | 'RISK_FREE_CLAIM';

export interface RedFlag {
  type: RedFlagType;
  severity: RedFlagSeverity;
  evidence: string; // The exact text or signal that triggered warning
  explanation: string; // Why it matters in simple language
}

export type ClaimStatus = 'UNVERIFIED' | 'MISLEADING' | 'DEBUNKED' | 'PLAUSIBLE_BENIGN';

export interface ExtractedClaim {
  claim: string;
  status: ClaimStatus;
  explanation: string;
}

export interface RuleSignal {
  ruleId: string;
  category: RedFlagType;
  severity: RedFlagSeverity;
  matchedSnippet: string;
  reason: string;
  weight: number;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 10
  summary: string;
  redFlags: RedFlag[];
  claims: ExtractedClaim[];
  safeActions: string[];
  avoidActions: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  disclaimer: string;
  extractedText?: string;
  urlAnalysis?: {
    url: string;
    domain: string;
    isHttps: boolean;
    ipAddress?: string;
    isSuspiciousTld?: boolean;
    title?: string;
  };
  ruleSignalsCount: number;
  analyzedAt: string;
  language: 'en' | 'hi' | 'te';
  isDemo?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

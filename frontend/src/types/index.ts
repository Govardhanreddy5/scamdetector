export type Language = 'en' | 'hi' | 'te';

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
  evidence: string;
  explanation: string;
}

export type ClaimStatus = 'UNVERIFIED' | 'MISLEADING' | 'DEBUNKED' | 'PLAUSIBLE_BENIGN';

export interface ExtractedClaim {
  claim: string;
  status: ClaimStatus;
  explanation: string;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number;
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
  language: Language;
  isDemo?: boolean;
}

export interface DemoCaseItem {
  id: string;
  title: string;
  category: string;
  inputType: 'text' | 'screenshot' | 'url';
  sampleContent: string;
}

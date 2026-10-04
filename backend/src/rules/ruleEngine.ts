import { RedFlag, RedFlagSeverity, RedFlagType, RuleSignal } from '../types/index.js';

interface RulePattern {
  id: string;
  category: RedFlagType;
  severity: RedFlagSeverity;
  regex: RegExp;
  weight: number;
  reason: string;
  explanationTemplate: (match: string) => string;
}

export const DETERMINISTIC_RULES: RulePattern[] = [
  // 1. Guaranteed returns & Risk-free claims (supports phrases with percentages in between, e.g. guaranteed 30% return)
  {
    id: 'GUARANTEED_RETURNS_EXPLICIT',
    category: 'GUARANTEED_RETURNS',
    severity: 'HIGH',
    regex: /(guaranteed\s+([a-zA-Z0-9%+\-.]+\s+){0,3}(return|profit|income|gain|yield|payout)s?|100%\s*guaranteed|risk[- ]?free\s+(profit|return|income|investment)|fixed\s+(daily|weekly|monthly)\s+(return|profit|payout)s?|पक्का\s*मुनाफा|गारंटीड\s*रिटर्न|ఖచ్చితమైన\s*లాభం)/iu,
    weight: 4,
    reason: 'Promises of guaranteed returns in market investments violate SEBI regulations and are a primary hallmark of investment fraud.',
    explanationTemplate: (m) => `The phrase "${m}" promises zero-risk or assured returns. Regulated market investments can never legally guarantee fixed profit rates.`
  },
  {
    id: 'DOUBLE_MONEY_PROMISES',
    category: 'UNREALISTIC_PROFIT',
    severity: 'HIGH',
    regex: /(double\s+(your\s+)?money|2x\s+in\s+\d+|triple\s+your\s+money|10x\s+returns?|50%\s+(daily|weekly)|30%\s+monthly|पैसा\s*डबल|డబ్బు\s*డబుల్)/iu,
    weight: 4,
    reason: 'Offers promising unrealistic exponential wealth multiplication in short timeframes are typical Ponzi/pyramid schemes.',
    explanationTemplate: (m) => `Detected "${m}". No regulated financial instrument generates guaranteed double-digit daily or monthly compounding returns.`
  },

  // 2. Sensitive credential requests (CRITICAL RISK)
  {
    id: 'OTP_REQUEST',
    category: 'SENSITIVE_INFO_REQUEST',
    severity: 'HIGH',
    regex: /(share\s+(your\s+)?otp|send\s+(me\s+)?(the\s+)?otp|tell\s+(the\s+)?otp|provide\s+otp|send\s+otp|one[- ]time\s+password|ओटीपी|ఓటీపీ)/iu,
    weight: 5,
    reason: 'Direct requests for OTPs are almost universally unauthorized attempts to take over bank accounts, demat accounts, or payment apps.',
    explanationTemplate: (m) => `Detected explicit OTP request: "${m}". Legitimate brokers and banks NEVER ask you to reveal an OTP.`
  },
  {
    id: 'PASSWORD_OR_PIN_REQUEST',
    category: 'SENSITIVE_INFO_REQUEST',
    severity: 'HIGH',
    regex: /(share\s+(your\s+)?(password|pin|mpin|cvv|netbanking\s+password)|enter\s+your\s+mpin|पासवर्ड|పిన్)/iu,
    weight: 5,
    reason: 'No genuine financial advisor, broker, or regulatory body will EVER ask for your login password, MPIN, or card CVV.',
    explanationTemplate: (m) => `Request for sensitive credentials detected: "${m}". Revealing this can lead to immediate financial drain.`
  },

  // 3. Artificial urgency & high-pressure tactics
  {
    id: 'ARTIFICIAL_URGENCY',
    category: 'ARTIFICIAL_URGENCY',
    severity: 'MEDIUM',
    regex: /(limited\s+slots?\s*(left|only)?|act\s+fast|hurry\s+up|expires\s+in\s+\d+\s*(mins?|hours?)?|only\s+today|today\s+only\s+offer|last\s+chance|join\s+within\s+\d+\s*minutes?|जल्दी\s*करें|తొందరపడండి)/iu,
    weight: 2.5,
    reason: 'Scammers induce panic or FOMO (Fear Of Missing Out) to force victims to act before consulting trusted advisors or researching.',
    explanationTemplate: (m) => `High-urgency language detected: "${m}". Pressure tactics prevent you from verifying legitimacy.`
  },

  // 4. Fake regulatory claims & unauthorized authority
  {
    id: 'FAKE_REGULATORY_APPROVAL',
    category: 'UNVERIFIED_AUTHORITY',
    severity: 'HIGH',
    regex: /(sebi\s+approved\s+(trading\s+group|group|channel|club|signals?)|rbi\s+certified\s+profit|govt\s+approved\s+scheme|registered\s+by\s+sebi\s+for\s+assured\s+profit)/iu,
    weight: 3.5,
    reason: 'SEBI and RBI NEVER approve specific trading groups, WhatsApp/Telegram channels, or assured-profit plans.',
    explanationTemplate: (m) => `Unverified regulatory association: "${m}". Regulatory bodies explicitly state they never endorse trading channels or guarantee returns.`
  },

  // 5. Suspicious contact channels & exclusive VIP groups
  {
    id: 'SUSPICIOUS_CHANNELS',
    category: 'SUSPICIOUS_CONTACT',
    severity: 'MEDIUM',
    regex: /(join\s+(our\s+)?(vip\s+)?(telegram|whatsapp\s+group)|t\.me\/[a-zA-Z0-9_+]+|chat\.whatsapp\.com\/[a-zA-Z0-9]+|wa\.me\/\d+|inbox\s+me\s+privately|dm\s+for\s+joining)/iu,
    weight: 2.5,
    reason: 'Unregistered operators routinely use private Telegram or WhatsApp groups to distribute manipulated stock tips and "pump-and-dump" schemes.',
    explanationTemplate: (m) => `Detected invitation to unmonitored private channel: "${m}". Regulated brokers interact through officially audited corporate platforms.`
  },

  // 6. Suspicious payment instructions & personal UPI
  {
    id: 'PERSONAL_UPI_OR_CRYPTO_PAYMENT',
    category: 'MONEY_TRANSFER_PRESSURE',
    severity: 'HIGH',
    regex: /(send\s+(money|fees?)\s+to\s+upi|gpay\s+to\s+\d+|phonepe\s+number|transfer\s+to\s+personal\s+account|deposit\s+usdt|crypto\s+wallet\s+address|advance\s+(fee|tax|margin)\s+before\s+withdrawal)/iu,
    weight: 4,
    reason: 'Asking for payments to individual UPI IDs or demanding "advance clearance taxes/fees" before releasing profits is classic recovery/advance-fee fraud.',
    explanationTemplate: (m) => `Payment routing red flag: "${m}". Legitimate brokers only collect funds through dedicated verified merchant or bank settlement clearing accounts.`
  },

  // 7. Impersonation of prominent investors or institutions
  {
    id: 'PROMINENT_IMPERSONATION',
    category: 'IMPERSONATION',
    severity: 'HIGH',
    regex: /(rakesh\s+jhunjhunwala\s+(academy|portfolio|tips?)|mukesh\s+ambani\s+(investment|project|ai\s+platform)|tata\s+group\s+free\s+shares?|infosys\s+automated\s+trading|hdfc\s+secret\s+fund)/iu,
    weight: 4,
    reason: 'Deepfakes and impersonator accounts hijack the names of famous Indian industrialists and deceased investors to manipulate public trust.',
    explanationTemplate: (m) => `Likely impersonation of prominent Indian figures: "${m}". Official figures never run private messaging groups providing guaranteed stock tips.`
  },

  // 8. Suspicious shortener links / fake domains
  {
    id: 'SUSPICIOUS_SHORTENER_OR_DOMAIN',
    category: 'SUSPICIOUS_URL',
    severity: 'HIGH',
    regex: /(https?:\/\/(bit\.ly|tinyurl\.com|cutt\.ly|is\.gd|rb\.gy|t\.co)\/[a-zA-Z0-9_\-]+)/iu,
    weight: 3,
    reason: 'URL shorteners are heavily leveraged by malicious senders to conceal phishing domains, rogue APK download files, or cloned banking pages.',
    explanationTemplate: (m) => `Shortened link hiding real destination: "${m}". Never click masked URLs in financial messages.`
  },

  // 9. Rogue APK or unauthorized app installation
  {
    id: 'UNAUTHORIZED_APK_INSTALL',
    category: 'SENSITIVE_INFO_REQUEST',
    severity: 'HIGH',
    regex: /(download\s+(the\s+)?apk|install\s+this\s+app\s+from\s+link|enable\s+unknown\s+sources|mod\s+app|trading\.apk)/iu,
    weight: 4.5,
    reason: 'Fraudulent apps distributed as raw APK files can steal SMS messages, read OTPs, and mirror screens to compromise bank apps.',
    explanationTemplate: (m) => `Sideloaded application warning: "${m}". Regulated financial apps must only be installed through official app stores (Google Play / Apple App Store).`
  }
];

export interface RuleEngineResult {
  signals: RuleSignal[];
  redFlags: RedFlag[];
  totalWeight: number;
  criticalSignalDetected: boolean;
  computedScore: number; // 0 to 10 scale
}

export function runRuleEngine(content: string): RuleEngineResult {
  if (!content || typeof content !== 'string') {
    return {
      signals: [],
      redFlags: [],
      totalWeight: 0,
      criticalSignalDetected: false,
      computedScore: 0,
    };
  }

  const signals: RuleSignal[] = [];
  const redFlags: RedFlag[] = [];
  let totalWeight = 0;
  let criticalSignalDetected = false;

  for (const rule of DETERMINISTIC_RULES) {
    const match = content.match(rule.regex);
    if (match && match[0]) {
      const matchedSnippet = match[0];
      const weight = rule.weight;
      totalWeight += weight;

      if (rule.severity === 'HIGH') {
        criticalSignalDetected = true;
      }

      const signal: RuleSignal = {
        ruleId: rule.id,
        category: rule.category,
        severity: rule.severity,
        matchedSnippet,
        reason: rule.reason,
        weight,
      };
      signals.push(signal);

      // Create user-friendly RedFlag card
      redFlags.push({
        type: rule.category,
        severity: rule.severity,
        evidence: matchedSnippet,
        explanation: rule.explanationTemplate(matchedSnippet),
      });
    }
  }

  // Calculate score on 0-10 scale
  let rawScore = Math.min(10, Math.round(totalWeight * 1.5));
  if (criticalSignalDetected && rawScore < 7) {
    rawScore = 7; // Minimum score of 7 if critical high severity rules are violated
  }

  return {
    signals,
    redFlags,
    totalWeight,
    criticalSignalDetected,
    computedScore: rawScore,
  };
}

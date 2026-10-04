import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { AnalysisResult, RedFlag, ExtractedClaim, RiskLevel } from '../types/index.js';
import { RuleEngineResult } from '../rules/ruleEngine.js';

// Strict Zod schema for AI output validation
export const AiAnalysisSchema = z.object({
  riskLevel: z.enum(['HIGH', 'MEDIUM', 'LOW', 'UNABLE_TO_VERIFY']),
  riskScore: z.number().min(0).max(10),
  summary: z.string(),
  redFlags: z.array(
    z.object({
      type: z.enum([
        'GUARANTEED_RETURNS',
        'UNREALISTIC_PROFIT',
        'ARTIFICIAL_URGENCY',
        'UNVERIFIED_AUTHORITY',
        'IMPERSONATION',
        'SUSPICIOUS_CONTACT',
        'SENSITIVE_INFO_REQUEST',
        'MONEY_TRANSFER_PRESSURE',
        'SUSPICIOUS_URL',
        'MISSING_REGULATORY_INFO',
        'ADVANCE_FEE',
        'RISK_FREE_CLAIM'
      ]),
      severity: z.enum(['HIGH', 'MEDIUM', 'LOW']),
      evidence: z.string(),
      explanation: z.string(),
    })
  ),
  claims: z.array(
    z.object({
      claim: z.string(),
      status: z.enum(['UNVERIFIED', 'MISLEADING', 'DEBUNKED', 'PLAUSIBLE_BENIGN']),
      explanation: z.string(),
    })
  ),
  safeActions: z.array(z.string()),
  avoidActions: z.array(z.string()),
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  disclaimer: z.string(),
});

export type AiAnalysisOutput = z.infer<typeof AiAnalysisSchema>;

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

export function isGeminiConfigured(): boolean {
  return getGenAI() !== null;
}

/**
 * Extracts raw text from an image buffer using Gemini Vision OCR
 */
export async function extractTextFromImage(
  imageBuffer: Buffer,
  mimeType: string
): Promise<string> {
  const ai = getGenAI();
  if (!ai) {
    return 'Gemini API key is not configured for image OCR. Please configure GEMINI_API_KEY or provide text input directly.';
  }

  const base64Data = imageBuffer.toString('base64');

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: 'Extract and transcribe all readable text, chat messages, financial numbers, claims, handles, and URLs from this image exactly as shown. Return only the extracted text without commentary.'
          },
          {
            inlineData: {
              data: base64Data,
              mimeType
            }
          }
        ]
      }
    ]
  });

  return response.text?.trim() || '';
}

/**
 * Analyze content using Gemini combined with deterministic rule signals
 */
export async function analyzeWithGemini(
  content: string,
  ruleResult: RuleEngineResult,
  language: 'en' | 'hi' | 'te' = 'en',
  urlContext?: string
): Promise<AiAnalysisOutput | null> {
  const ai = getGenAI();
  if (!ai) {
    return null; // Fallback to rule engine standalone
  }

  const langInstruction =
    language === 'hi'
      ? 'Output all explanations, summaries, safeActions, and avoidActions in clear, accessible Hindi (Devanagari script).'
      : language === 'te'
      ? 'Output all explanations, summaries, safeActions, and avoidActions in clear, accessible Telugu (Telugu script).'
      : 'Output in simple, plain English accessible to first-time investors without complex financial jargon.';

  const prompt = `
You are the AI engine of "ScamLens Bharat", a public-good investor safety platform designed to protect Indian citizens from financial scams, fraudulent tip groups, fake schemes, and impersonation.

Content submitted by user:
"""
${content}
"""

${urlContext ? `URL Context & Fetched Metadata:\n"""\n${urlContext}\n"""\n` : ''}

Pre-computed Deterministic Rule Engine Signals:
- Total Signal Weight: ${ruleResult.totalWeight}
- Rule Computed Score: ${ruleResult.computedScore}/10
- Critical Signals Detected: ${ruleResult.criticalSignalDetected ? 'YES' : 'NO'}
- Detected Rule Violations: ${JSON.stringify(ruleResult.signals, null, 2)}

Strict Guidelines:
1. You MUST NEVER give buy/sell/hold stock advice, predict price targets, or encourage trading.
2. Communicate uncertainty carefully. Never claim something is definitely a 100% verified scam unless there is clear undeniable proof. Use terms like "High-risk indicators detected", "Potentially misleading", "Unable to verify this claim", "Exercise caution".
3. NEVER fabricate evidence or fake URLs/government registry numbers. If verification is unavailable, explicitly state "Verification unavailable".
4. If the deterministic rule engine flagged critical signals (OTP requests, password demands, 100% guaranteed return promises), the riskLevel MUST be at least "HIGH" and riskScore must be >= 7.
5. Highlight the exact words or phrases that trigger red flags in the "evidence" field.
6. Language constraint: ${langInstruction}

You must return ONLY a single valid JSON object following this exact structure with no Markdown wrapping or backticks:
{
  "riskLevel": "HIGH" | "MEDIUM" | "LOW" | "UNABLE_TO_VERIFY",
  "riskScore": <number from 0 to 10>,
  "summary": "<2-3 sentence overview of the risk assessment>",
  "redFlags": [
    {
      "type": "GUARANTEED_RETURNS" | "UNREALISTIC_PROFIT" | "ARTIFICIAL_URGENCY" | "UNVERIFIED_AUTHORITY" | "IMPERSONATION" | "SUSPICIOUS_CONTACT" | "SENSITIVE_INFO_REQUEST" | "MONEY_TRANSFER_PRESSURE" | "SUSPICIOUS_URL" | "MISSING_REGULATORY_INFO" | "ADVANCE_FEE" | "RISK_FREE_CLAIM",
      "severity": "HIGH" | "MEDIUM" | "LOW",
      "evidence": "<exact snippet from text>",
      "explanation": "<why this indicator poses a financial danger to retail investors>"
    }
  ],
  "claims": [
    {
      "claim": "<extracted assertion e.g. 'SEBI approved 30% monthly return'>",
      "status": "UNVERIFIED" | "MISLEADING" | "DEBUNKED" | "PLAUSIBLE_BENIGN",
      "explanation": "<factual assessment without inventing false external sources>"
    }
  ],
  "safeActions": [
    "<practical DO step for the citizen>"
  ],
  "avoidActions": [
    "<critical DON'T step to avoid financial loss>"
  ],
  "confidence": "HIGH" | "MEDIUM" | "LOW",
  "disclaimer": "ScamLens provides educational and safety information. It does not provide investment advice or guarantee the accuracy of its assessment."
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const rawText = response.text?.trim() || '';
    // Clean potential markdown quotes if any
    const cleanedJson = rawText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanedJson);
    const validated = AiAnalysisSchema.parse(parsed);

    // Enforce rule engine safety floor: AI cannot downplay critical rule violations
    if (ruleResult.criticalSignalDetected) {
      if (validated.riskLevel === 'LOW' || validated.riskLevel === 'UNABLE_TO_VERIFY') {
        validated.riskLevel = 'HIGH';
      }
      if (validated.riskScore < 7) {
        validated.riskScore = Math.max(validated.riskScore, ruleResult.computedScore);
      }
    }

    return validated;
  } catch (error) {
    console.error('Gemini API analysis failed or returned invalid JSON:', error);
    return null;
  }
}

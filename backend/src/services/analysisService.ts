import { AnalysisResult, RedFlag, ExtractedClaim, RiskLevel } from '../types/index.js';
import { runRuleEngine, RuleEngineResult } from '../rules/ruleEngine.js';
import { analyzeWithGemini, isGeminiConfigured } from '../ai/geminiService.js';
import { SafeUrlReport } from '../utils/urlAnalyzer.js';

export async function processContentAnalysis(params: {
  content: string;
  language?: 'en' | 'hi' | 'te';
  urlReport?: SafeUrlReport;
}): Promise<AnalysisResult> {
  const content = params.content || '';
  const language = params.language || 'en';
  const urlReport = params.urlReport;

  // 1. Run deterministic rule engine
  const ruleResult: RuleEngineResult = runRuleEngine(content);

  // 2. Prepare contextual URL information if available
  let urlContext: string | undefined;
  if (urlReport) {
    urlContext = `
URL: ${urlReport.normalizedUrl}
Domain: ${urlReport.domain}
HTTPS Secured: ${urlReport.isHttps}
Suspicious TLD: ${urlReport.isSuspiciousTld}
Page Title: ${urlReport.extractedTitle || 'None'}
Meta Description: ${urlReport.extractedMetaDescription || 'None'}
URL Heuristic Red Flags: ${urlReport.heuristicRedFlags.join('; ')}
`;
    // If URL has heuristic red flags, inject them into rule signals
    for (const flag of urlReport.heuristicRedFlags) {
      ruleResult.redFlags.push({
        type: 'SUSPICIOUS_URL',
        severity: urlReport.isPrivateOrInternal || urlReport.isSuspiciousTld ? 'HIGH' : 'MEDIUM',
        evidence: urlReport.normalizedUrl,
        explanation: flag,
      });
    }
  }

  // 3. Attempt Gemini AI analysis
  let aiOutput = null;
  if (isGeminiConfigured()) {
    try {
      aiOutput = await analyzeWithGemini(content, ruleResult, language, urlContext);
    } catch (err) {
      console.warn('Gemini analysis failed, falling back to deterministic synthesis:', err);
    }
  }

  // 4. If AI succeeded, merge and return
  if (aiOutput) {
    // Deduplicate red flags from rule engine and AI
    const combinedFlags: RedFlag[] = [...ruleResult.redFlags];
    for (const aiFlag of aiOutput.redFlags) {
      const alreadyPresent = combinedFlags.some(
        f => f.type === aiFlag.type && f.evidence.toLowerCase().includes(aiFlag.evidence.toLowerCase().slice(0, 15))
      );
      if (!alreadyPresent) {
        combinedFlags.push(aiFlag);
      }
    }

    return {
      riskLevel: aiOutput.riskLevel,
      riskScore: aiOutput.riskScore,
      summary: aiOutput.summary,
      redFlags: combinedFlags,
      claims: aiOutput.claims,
      safeActions: aiOutput.safeActions,
      avoidActions: aiOutput.avoidActions,
      confidence: aiOutput.confidence,
      disclaimer: aiOutput.disclaimer,
      extractedText: content,
      urlAnalysis: urlReport
        ? {
            url: urlReport.normalizedUrl,
            domain: urlReport.domain,
            isHttps: urlReport.isHttps,
            ipAddress: urlReport.resolvedIp,
            isSuspiciousTld: urlReport.isSuspiciousTld,
            title: urlReport.extractedTitle,
          }
        : undefined,
      ruleSignalsCount: ruleResult.signals.length,
      analyzedAt: new Date().toISOString(),
      language,
    };
  }

  // 5. Deterministic fallback synthesis (when Gemini API key is unset or unreachable)
  let riskLevel: RiskLevel = 'LOW';
  if (ruleResult.criticalSignalDetected || ruleResult.computedScore >= 7) {
    riskLevel = 'HIGH';
  } else if (ruleResult.computedScore >= 4) {
    riskLevel = 'MEDIUM';
  } else if (content.trim().length < 15 && ruleResult.signals.length === 0) {
    riskLevel = 'UNABLE_TO_VERIFY';
  }

  const localizedSummary = getLocalizedFallbackSummary(riskLevel, language);
  const localizedActions = getLocalizedFallbackActions(riskLevel, language);

  // Extract basic claims from content
  const claims: ExtractedClaim[] = [];
  if (content.toLowerCase().includes('sebi')) {
    claims.push({
      claim: 'Mentions SEBI regulation or approval',
      status: 'UNVERIFIED',
      explanation: 'Content references SEBI, but official regulatory endorsement could not be verified from public statutory records.',
    });
  }
  if (content.toLowerCase().includes('guaranteed') || content.toLowerCase().includes('पक्का') || content.toLowerCase().includes('ఖచ్చితమైన')) {
    claims.push({
      claim: 'Guaranteed or zero-risk return promise',
      status: 'MISLEADING',
      explanation: 'Statutory financial regulations in India strictly prohibit guaranteed return assurances in equity and market-linked instruments.',
    });
  }
  if (claims.length === 0 && content.length > 20) {
    claims.push({
      claim: 'General financial communication',
      status: riskLevel === 'LOW' ? 'PLAUSIBLE_BENIGN' : 'UNVERIFIED',
      explanation: 'Assessment evaluated against standard Indian retail investor safety heuristics.',
    });
  }

  return {
    riskLevel,
    riskScore: ruleResult.computedScore,
    summary: localizedSummary,
    redFlags: ruleResult.redFlags,
    claims,
    safeActions: localizedActions.safe,
    avoidActions: localizedActions.avoid,
    confidence: isGeminiConfigured() ? 'HIGH' : 'MEDIUM',
    disclaimer: 'ScamLens Bharat provides educational and safety information. It does not provide investment advice or guarantee the accuracy of its assessment.',
    extractedText: content,
    urlAnalysis: urlReport
      ? {
          url: urlReport.normalizedUrl,
          domain: urlReport.domain,
          isHttps: urlReport.isHttps,
          ipAddress: urlReport.resolvedIp,
          isSuspiciousTld: urlReport.isSuspiciousTld,
          title: urlReport.extractedTitle,
        }
      : undefined,
    ruleSignalsCount: ruleResult.signals.length,
    analyzedAt: new Date().toISOString(),
    language,
  };
}

function getLocalizedFallbackSummary(level: RiskLevel, lang: 'en' | 'hi' | 'te'): string {
  if (lang === 'hi') {
    switch (level) {
      case 'HIGH':
        return 'सावधानी: इस संदेश में अत्यधिक संदिग्ध और उच्च-जोखिम वाले वित्तीय धोखाधड़ी के संकेत मिले हैं। किसी भी वित्तीय लेनदेन से बचें।';
      case 'MEDIUM':
        return 'चेतावनी: इस सामग्री में कुछ भ्रामक या अवास्तविक वित्तीय वादे पाए गए हैं। आगे बढ़ने से पहले जांच अवश्य करें।';
      case 'LOW':
        return 'सामान्य: इस संदेश में कोई तत्काल उच्च जोखिम संकेत नहीं मिला। सामान्य सुरक्षा नियमों का पालन करें।';
      default:
        return 'अपर्याप्त डेटा: प्रदान की गई सामग्री के आधार पर स्पष्ट जोखिम स्तर का आकलन नहीं किया जा सका।';
    }
  }

  if (lang === 'te') {
    switch (level) {
      case 'HIGH':
        return 'హెచ్చరిక: ఈ సమాచారంలో తీవ్రమైన మోసపూరిత సంకేతాలు గుర్తించబడ్డాయి. ఎలాంటి లావాదేవీలు చేయవద్దు.';
      case 'MEDIUM':
        return 'జాగ్రత్త: ఈ సమాచారంలో కొన్ని తప్పుదోవ పట్టించే వాదనలు ఉన్నాయి. జాగ్రత్తగా సరిచూసుకోండి.';
      case 'LOW':
        return 'సాధారణం: ఇందులో ఎటువంటి స్పష్టమైన ప్రమాద సంకేతాలు కనిపించలేదు.';
      default:
        return 'సమాచారం సరిపోలేదు: ఈ వివరాలతో పూర్తి ప్రమాద స్థాయిని నిర్ధారించలేకపోయాము.';
    }
  }

  // English
  switch (level) {
    case 'HIGH':
      return 'High-risk indicators detected. The content exhibits clear red flags commonly associated with unauthorized investment schemes, credential theft, or financial fraud.';
    case 'MEDIUM':
      return 'Moderate risk indicators detected. The communication contains potentially misleading claims or unverified financial promises requiring strict independent verification.';
    case 'LOW':
      return 'Low risk indicators detected. The communication does not trigger common financial fraud patterns. Continue observing standard investor precautions.';
    default:
      return 'Unable to verify sufficient indicators from the provided content. Exercise independent caution before taking any action.';
  }
}

function getLocalizedFallbackActions(
  level: RiskLevel,
  lang: 'en' | 'hi' | 'te'
): { safe: string[]; avoid: string[] } {
  if (lang === 'hi') {
    return {
      safe: [
        'किसी भी संस्था की वैधता सेबी (sebi.gov.in) पर जांचें।',
        'संदिग्ध कॉल या संदेश की शिकायत राष्ट्रीय साइबर हेल्पलाइन 1930 पर करें।',
        'पैसा भेजने से पहले अपने प्रमाणित वित्तीय सलाहकार से सलाह लें।'
      ],
      avoid: [
        'अपना ओटीपी (OTP), पासवर्ड या पिन किसी के साथ साझा न करें।',
        'दबाव में आकर किसी भी व्यक्तिगत यूपीआई (UPI) पते पर पैसा न भेजें।'
      ]
    };
  }

  if (lang === 'te') {
    return {
      safe: [
        'సెబీ (sebi.gov.in) అధికారిక వెబ్‌సైట్‌లో బ్రోకర్ వివరాలను తనిఖీ చేయండి.',
        'సైబర్ హెల్ప్‌లైన్ 1930 కు కాల్ చేసి ఫిర్యాదు చేయండి.',
        'పెట్టుబడి పెట్టే ముందు నిపుణుల సలహా తీసుకోండి.'
      ],
      avoid: [
        'ఓటీపీ (OTP) లేదా పాస్‌వర్డ్ ఎవరితోనూ పంచుకోవద్దు.',
        'వ్యక్తిగత ఖాతాలకు లేదా యూపీఐకి డబ్బు బదిలీ చేయవద్దు.'
      ]
    };
  }

  return {
    safe: [
      'Verify the entity or advisor registration on the official SEBI portal (sebi.gov.in).',
      'Independently search for the official website and customer care numbers of the company.',
      'Report suspicious communications to the Cyber Crime Helpline at 1930 or cybercrime.gov.in.',
      'Take 24 hours of reflection before committing any funds to high-pressure offers.'
    ],
    avoid: [
      'Never share OTPs, netbanking passwords, or UPI PINs under any pretext.',
      'Do not transfer money to individual UPI IDs or personal savings accounts for investments.',
      'Do not install remote-access apps (AnyDesk, TeamViewer) or APK files sent via chat.'
    ]
  };
}

import { AnalysisResult } from '../types/index.js';

export interface DemoCase {
  id: string;
  title: string;
  category: string;
  inputType: 'text' | 'screenshot' | 'url';
  sampleContent: string;
  analysis: Record<'en' | 'hi' | 'te', AnalysisResult>;
}

export const DEMO_CASES: Record<string, DemoCase> = {
  'case-1-high-risk': {
    id: 'case-1-high-risk',
    title: 'High-Risk Investment Scheme (WhatsApp / Telegram)',
    category: 'HIGH_RISK_SCAM',
    inputType: 'text',
    sampleContent: `🔥 SEBI APPROVED VIP TRADING CLUB 🔥
Guaranteed 30% monthly return with ZERO risk!
Double your money in just 25 days!
Act fast! Only 5 slots left today!
Transfer ₹10,000 to UPI ID: quickwealth@okaxis to activate your automated AI trading account.
Share your OTP and Aadhaar copy with Admin on Telegram @StockGuruPro for instant VIP verification!`,
    analysis: {
      en: {
        riskLevel: 'HIGH',
        riskScore: 9,
        summary: 'High-risk indicators detected across multiple critical security dimensions. The message exhibits typical features of unregulated advance-fee and credential harvesting fraud.',
        redFlags: [
          {
            type: 'GUARANTEED_RETURNS',
            severity: 'HIGH',
            evidence: 'Guaranteed 30% monthly return with ZERO risk',
            explanation: 'Market investments inherently carry risk. Guarantees of zero-risk profits violate SEBI guidelines and indicate fraudulent solicitations.'
          },
          {
            type: 'SENSITIVE_INFO_REQUEST',
            severity: 'HIGH',
            evidence: 'Share your OTP and Aadhaar copy with Admin',
            explanation: 'Direct requests for one-time passwords (OTPs) and identity documents over messaging apps allow unauthorized takeover of banking or investment accounts.'
          },
          {
            type: 'UNVERIFIED_AUTHORITY',
            severity: 'HIGH',
            evidence: 'SEBI APPROVED VIP TRADING CLUB',
            explanation: 'SEBI regulates intermediaries and exchanges; it does not approve private messaging groups, clubs, or assured return schemes.'
          },
          {
            type: 'ARTIFICIAL_URGENCY',
            severity: 'MEDIUM',
            evidence: 'Act fast! Only 5 slots left today!',
            explanation: 'Artificial scarcity creates panic to prevent investors from conducting independent verification before sending funds.'
          },
          {
            type: 'MONEY_TRANSFER_PRESSURE',
            severity: 'HIGH',
            evidence: 'Transfer ₹10,000 to UPI ID: quickwealth@okaxis',
            explanation: 'Demanding funds to personal UPI handles rather than official client collateral accounts bypasses banking and regulatory safeguards.'
          }
        ],
        claims: [
          {
            claim: 'Entity is a SEBI-approved VIP trading club',
            status: 'UNVERIFIED',
            explanation: 'SEBI does not license or authorize informal VIP trading channels on messaging platforms.'
          },
          {
            claim: 'Guaranteed 30% monthly return with zero risk',
            status: 'MISLEADING',
            explanation: 'No regulated equity, debt, or derivative product in India offers zero-risk guaranteed 30% monthly yields.'
          }
        ],
        safeActions: [
          'Verify any intermediary credentials directly on the official SEBI portal (sebi.gov.in) before engaging.',
          'Never reveal OTPs, passwords, or PINs to anyone, including persons claiming to be account managers.',
          'Report the sender number to the National Cyber Crime Portal (cybercrime.gov.in) or call 1930.',
          'Cease all communication and block the sender immediately.'
        ],
        avoidActions: [
          'Do NOT transfer money to individual UPI IDs or private accounts.',
          'Do NOT send OTPs or photos of government identity cards.',
          'Do NOT install APK files or screen-sharing tools recommended in the group.'
        ],
        confidence: 'HIGH',
        disclaimer: 'ScamLens provides educational and safety information. It does not provide investment advice or guarantee the accuracy of its assessment.',
        ruleSignalsCount: 5,
        analyzedAt: new Date().toISOString(),
        language: 'en',
        isDemo: true
      },
      hi: {
        riskLevel: 'HIGH',
        riskScore: 9,
        summary: 'इस संदेश में कई उच्च-जोखिम वाले संकेत पाए गए हैं। यह संदेश अनधिकृत अग्रिम शुल्क और बैंक खाता हड़पने की धोखाधड़ी से मिलता-जुलता है।',
        redFlags: [
          {
            type: 'GUARANTEED_RETURNS',
            severity: 'HIGH',
            evidence: 'Guaranteed 30% monthly return with ZERO risk',
            explanation: 'शेयर बाजार में कोई भी निश्चित या बिना जोखिम का लाभ नहीं दिला सकता। ऐसा दावा सेबी (SEBI) नियमों के खिलाफ है।'
          },
          {
            type: 'SENSITIVE_INFO_REQUEST',
            severity: 'HIGH',
            evidence: 'Share your OTP and Aadhaar copy',
            explanation: 'ओटीपी (OTP) मांगना आपके बैंक खाते या वित्तीय खातों में सेंध लगाने का प्रयास है।'
          },
          {
            type: 'UNVERIFIED_AUTHORITY',
            severity: 'HIGH',
            evidence: 'SEBI APPROVED VIP TRADING CLUB',
            explanation: 'सेबी कभी भी किसी निजी टेलीग्राम या व्हाट्सएप ग्रुप को मंजूरी नहीं देता।'
          }
        ],
        claims: [
          {
            claim: 'सेबी द्वारा अनुमोदित वीआईपी ट्रेडिंग क्लब',
            status: 'UNVERIFIED',
            explanation: 'सेबी की आधिकारिक वेबसाइट पर ऐसे किसी ट्रेडिंग क्लब की पुष्टि नहीं है।'
          }
        ],
        safeActions: [
          'किसी भी सलाहकार की जांच आधिकारिक सेबी पोर्टल (sebi.gov.in) पर करें।',
          'अपना ओटीपी (OTP) या पिन कभी किसी को न बताएं।',
          'संदिग्ध नंबर की शिकायत 1930 पर या cybercrime.gov.in पर करें।'
        ],
        avoidActions: [
          'निजी यूपीआई (UPI) आईडी पर कभी पैसे न भेजें।',
          'किसी अज्ञात व्यक्ति के कहने पर कोई ऐप इंस्टॉल न करें।'
        ],
        confidence: 'HIGH',
        disclaimer: 'स्कैम-लेंस केवल जागरूकता और सुरक्षा जानकारी प्रदान करता है। यह कोई वित्तीय सलाह नहीं है।',
        ruleSignalsCount: 5,
        analyzedAt: new Date().toISOString(),
        language: 'hi',
        isDemo: true
      },
      te: {
        riskLevel: 'HIGH',
        riskScore: 9,
        summary: 'ఈ సందేశంలో తీవ్రమైన మోసపూరిత సంకేతాలు గుర్తించబడ్డాయి. ఇది పెట్టుబడిదారుల సొమ్మును కాజేసే అనుమానాస్పద స్కీమ్‌గా కనిపిస్తోంది.',
        redFlags: [
          {
            type: 'GUARANTEED_RETURNS',
            severity: 'HIGH',
            evidence: 'Guaranteed 30% monthly return with ZERO risk',
            explanation: 'స్టాక్ మార్కెట్లలో ఎలాంటి రిస్క్ లేకుండా ఖచ్చితమైన లాభాలు ఇవ్వడం చట్టవిరుద్ధం.'
          },
          {
            type: 'SENSITIVE_INFO_REQUEST',
            severity: 'HIGH',
            evidence: 'Share your OTP and Aadhaar copy',
            explanation: 'ఓటీపీ (OTP) అడగడం మీ బ్యాంక్ ఖాతాను దొంగిలించే ప్రయత్నం కావచ్చు.'
          }
        ],
        claims: [
          {
            claim: 'సెబీ ఆమోదించిన వీఐపీ ట్రేడింగ్ క్లబ్',
            status: 'UNVERIFIED',
            explanation: 'సెబీ ఎటువంటి టెలిగ్రామ్ లేదా వాట్సాప్ ట్రేడింగ్ గ్రూపులకు అనుమతి ఇవ్వదు.'
          }
        ],
        safeActions: [
          'అనుమానాస్పద నంబర్లను వెంటనే బ్లాక్ చేయండి.',
          'మీ ఓటీపీలు ఎవరికీ పంపకండి.',
          'సైబర్ హెల్ప్‌లైన్ 1930 లో ఫిర్యాదు చేయండి.'
        ],
        avoidActions: [
          'వ్యక్తిగత యూపీఐ ఖాతాలకు డబ్బు పంపవద్దు.',
          'ఏ విధమైన తెలియని యాప్‌లను డౌన్‌లోడ్ చేయవద్దు.'
        ],
        confidence: 'HIGH',
        disclaimer: 'స్కామ్‌లెన్స్ కేవలం అవగాహన మరియు భద్రతా సమాచారాన్ని అందిస్తుంది. ఇది పెట్టుబడి సలహా కాదు.',
        ruleSignalsCount: 5,
        analyzedAt: new Date().toISOString(),
        language: 'te',
        isDemo: true
      }
    }
  },

  'case-2-misleading': {
    id: 'case-2-misleading',
    title: 'Misleading Finfluencer Course / Secret Algorithm',
    category: 'MISLEADING_CLAIM',
    inputType: 'text',
    sampleContent: `Learn my 99.4% win-rate proprietary algorithmic indicator that beat NIFTY by 800% last year!
Join our exclusive masterclass this weekend. Over 50,000 successful students retired early.
Link to register: https://master-trade-signals.xyz/webinar
Past performance guaranteed to repeat. Reserve your seat before price increases!`,
    analysis: {
      en: {
        riskLevel: 'MEDIUM',
        riskScore: 6,
        summary: 'Potentially misleading financial claims detected. Content exhibits exaggerated win-rate claims and unregistered educational upsells with non-standard metrics.',
        redFlags: [
          {
            type: 'UNREALISTIC_PROFIT',
            severity: 'HIGH',
            evidence: '99.4% win-rate proprietary algorithmic indicator',
            explanation: 'A 99.4% consistent win-rate in financial markets is statistically implausible and commonly used as clickbait for unregulated courses.'
          },
          {
            type: 'GUARANTEED_RETURNS',
            severity: 'MEDIUM',
            evidence: 'Past performance guaranteed to repeat',
            explanation: 'Financial regulations explicitly mandate that past performance does not guarantee future results.'
          },
          {
            type: 'SUSPICIOUS_URL',
            severity: 'MEDIUM',
            evidence: 'https://master-trade-signals.xyz/webinar',
            explanation: 'The registration link uses a low-reputation domain extension (.xyz) commonly utilized in disposable promotional funnels.'
          }
        ],
        claims: [
          {
            claim: '99.4% win-rate trading algorithm',
            status: 'MISLEADING',
            explanation: 'No independent audited audit trail supports consistent 99%+ win-rates across market cycles.'
          },
          {
            claim: '50,000 students retired early',
            status: 'UNVERIFIED',
            explanation: 'Verification unavailable. Educational claims lack verified student outcomes or statutory disclosures.'
          }
        ],
        safeActions: [
          'Verify if the course instructor is a SEBI-registered Research Analyst (RA) or Investment Adviser (IA).',
          'Ask for audited P&L (verified brokerage statement) rather than relying on curated video screenshots.',
          'Review SEBI investor education resources at investor.sebi.gov.in.'
        ],
        avoidActions: [
          'Do NOT subscribe to expensive algorithmic indicators based on unverified backtests.',
          'Do NOT trade borrowed funds or life savings based on weekend workshop promises.'
        ],
        confidence: 'HIGH',
        disclaimer: 'ScamLens provides educational and safety information. It does not provide investment advice or guarantee the accuracy of its assessment.',
        ruleSignalsCount: 3,
        analyzedAt: new Date().toISOString(),
        language: 'en',
        isDemo: true
      },
      hi: {
        riskLevel: 'MEDIUM',
        riskScore: 6,
        summary: 'भ्रामक वित्तीय दावों के संकेत मिले हैं। अत्यधिक लाभ और 99.4% सफलता दर के दावे वास्तविकता से परे हैं।',
        redFlags: [
          {
            type: 'UNREALISTIC_PROFIT',
            severity: 'HIGH',
            evidence: '99.4% win-rate algorithmic indicator',
            explanation: 'बाजार में लगातार 99.4% जीत का दावा असंभव है और यह कोर्स बेचने का हथकंडा हो सकता है।'
          }
        ],
        claims: [
          {
            claim: '99.4% सफलता दर वाला ट्रेडिंग एल्गोरिदम',
            status: 'MISLEADING',
            explanation: 'इस दावे का कोई स्वतंत्र ऑडिट या कानूनी प्रमाण उपलब्ध नहीं है।'
          }
        ],
        safeActions: [
          'सलाहकार का सेबी (SEBI) रजिस्ट्रेशन नंबर अवश्य जांचें।',
          'केवल सरकारी व प्रमाणित स्रोतों से ही वित्तीय शिक्षा प्राप्त करें।'
        ],
        avoidActions: [
          'बिना सोचे-समझे महंगे ट्रेडिंग कोर्स न खरीदें।'
        ],
        confidence: 'HIGH',
        disclaimer: 'स्कैम-लेंस केवल सुरक्षा जानकारी प्रदान करता है।',
        ruleSignalsCount: 3,
        analyzedAt: new Date().toISOString(),
        language: 'hi',
        isDemo: true
      },
      te: {
        riskLevel: 'MEDIUM',
        riskScore: 6,
        summary: 'ఈ ప్రకటనలో తప్పుదోవ పట్టించే వాదనలు ఉన్నాయి. అవాస్తవ లాభాల మాటలు విని తొందరపడవద్దు.',
        redFlags: [
          {
            type: 'UNREALISTIC_PROFIT',
            severity: 'HIGH',
            evidence: '99.4% win-rate',
            explanation: 'స్టాక్ మార్కెట్లో 99.4% విజయవంతమయ్యే ఫార్ములా ఉండదు.'
          }
        ],
        claims: [
          {
            claim: '99.4% విజయం సాధించే అల్గారిథమ్',
            status: 'MISLEADING',
            explanation: 'ఈ వాదనకు ఎటువంటి ధృవీకరణ లేదు.'
          }
        ],
        safeActions: [
          'సెబీ నమోదిత విశ్లేషకులను మాత్రమే సంప్రదించండి.'
        ],
        avoidActions: [
          'భారీ ఫీజులు చెల్లించి అనుమానాస్పద కోర్సులలో చేరవద్దు.'
        ],
        confidence: 'HIGH',
        disclaimer: 'స్కామ్‌లెన్స్ కేవలం అవగాహన కోసం సమాచారాన్ని అందిస్తుంది.',
        ruleSignalsCount: 3,
        analyzedAt: new Date().toISOString(),
        language: 'te',
        isDemo: true
      }
    }
  },

  'case-3-educational': {
    id: 'case-3-educational',
    title: 'Low-Risk Educational Bulletin (Official Exchange Alert)',
    category: 'LOW_RISK_EDUCATIONAL',
    inputType: 'text',
    sampleContent: `NSE Investor Awareness Alert:
Never trade based on unsolicited stock recommendations received on SMS, WhatsApp, or Telegram.
Always verify that your stockbroker is registered with SEBI by checking https://www.sebi.gov.in.
Ensure your mobile number and email ID are updated with your depository (NSDL/CDSL) to receive official SMS alerts for all demat transactions.
Issued in public interest by National Stock Exchange of India.`,
    analysis: {
      en: {
        riskLevel: 'LOW',
        riskScore: 1,
        summary: 'Low-risk educational content. The message contains standard investor protection advice consistent with official regulatory guidelines from SEBI and Indian stock exchanges.',
        redFlags: [],
        claims: [
          {
            claim: 'Investors should verify broker registration on sebi.gov.in',
            status: 'PLAUSIBLE_BENIGN',
            explanation: 'Matches official statutory guidance provided by the Securities and Exchange Board of India.'
          },
          {
            claim: 'Updating mobile/email with depository enables official transaction alerts',
            status: 'PLAUSIBLE_BENIGN',
            explanation: 'Mandatory standard practice required by NSDL and CDSL to prevent unauthorized share transfers.'
          }
        ],
        safeActions: [
          'Verify your contact details with your Depository Participant (DP) periodically.',
          'Check official circulars directly on exchange websites (nseindia.com / bseindia.com).',
          'Share awareness messages with family members to safeguard them from imposter schemes.'
        ],
        avoidActions: [
          'No immediate warning triggers detected for this content.'
        ],
        confidence: 'HIGH',
        disclaimer: 'ScamLens provides educational and safety information. It does not provide investment advice or guarantee the accuracy of its assessment.',
        ruleSignalsCount: 0,
        analyzedAt: new Date().toISOString(),
        language: 'en',
        isDemo: true
      },
      hi: {
        riskLevel: 'LOW',
        riskScore: 1,
        summary: 'यह संदेश कम जोखिम वाला और जागरूकता संबंधी है। इसमें सेबी और नेशनल स्टॉक एक्सचेंज (NSE) के अधिकृत दिशा-निर्देश शामिल हैं।',
        redFlags: [],
        claims: [
          {
            claim: 'ब्रोकर का पंजीकरण sebi.gov.in पर जांचें',
            status: 'PLAUSIBLE_BENIGN',
            explanation: 'यह सेबी द्वारा जारी आधिकारिक सलाह से मेल खाता है।'
          }
        ],
        safeActions: [
          'अपने डिमैट खाते में सही मोबाइल नंबर और ईमेल अपडेट रखें।',
          'आधिकारिक वेबसाइट nseindia.com पर समय-समय पर सूचनाएं देखें।'
        ],
        avoidActions: [
          'इस संदेश में कोई जोखिम नहीं पाया गया।'
        ],
        confidence: 'HIGH',
        disclaimer: 'स्कैम-लेंस केवल सुरक्षा जानकारी प्रदान करता है।',
        ruleSignalsCount: 0,
        analyzedAt: new Date().toISOString(),
        language: 'hi',
        isDemo: true
      },
      te: {
        riskLevel: 'LOW',
        riskScore: 1,
        summary: 'ఇది తక్కువ రిస్క్ కలిగిన అధికారిక సమాచార హెచ్చరిక. ఇది పెట్టుబడిదారులకు అవగాహన కల్పించే సరైన మార్గదర్శకాలను కలిగి ఉంది.',
        redFlags: [],
        claims: [
          {
            claim: 'బ్రోకర్ వివరాలను సెబీ వెబ్‌సైట్‌లో సరిచూసుకోండి',
            status: 'PLAUSIBLE_BENIGN',
            explanation: 'ఇది అధికారిక నియంత్రణ సంస్థ మార్గదర్శకాలకు అనుగుణంగా ఉంది.'
          }
        ],
        safeActions: [
          'మీ డీమ్యాట్ ఖాతా వివరాలను ఎల్లప్పుడూ అప్‌డేట్‌గా ఉంచుకోండి.'
        ],
        avoidActions: [
          'ఈ సందేశంలో ఎటువంటి ప్రమాదం లేదు.'
        ],
        confidence: 'HIGH',
        disclaimer: 'స్కామ్‌లెన్స్ కేవలం అవగాహన కోసం సమాచారాన్ని అందిస్తుంది.',
        ruleSignalsCount: 0,
        analyzedAt: new Date().toISOString(),
        language: 'te',
        isDemo: true
      }
    }
  }
};

export function getDemoCase(caseId: string, language: 'en' | 'hi' | 'te' = 'en'): AnalysisResult | null {
  const c = DEMO_CASES[caseId];
  if (!c) return null;
  return c.analysis[language] || c.analysis.en;
}

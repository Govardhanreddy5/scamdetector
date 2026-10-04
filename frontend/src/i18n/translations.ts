import { Language } from '../types';

export interface TranslationStrings {
  brandTitle: string;
  brandTagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  analyzeBtn: string;
  seeHowItWorksBtn: string;
  tabText: string;
  tabScreenshot: string;
  tabUrl: string;
  textPlaceholder: string;
  urlPlaceholder: string;
  charCount: string;
  analyzeAction: string;
  analyzingText: string;
  demoModeTitle: string;
  demoModeBadge: string;
  demoPrompt: string;
  demoCase1: string;
  demoCase2: string;
  demoCase3: string;
  riskAssessment: string;
  riskScoreLabel: string;
  riskScoreClarification: string;
  redFlagsDetected: string;
  noRedFlags: string;
  claimsDetected: string;
  noClaims: string;
  whyFlagged: string;
  safeNextSteps: string;
  dosHeading: string;
  dontsHeading: string;
  simpleExplanationToggle: string;
  simpleExplanationDesc: string;
  reportScheme: string;
  cyberCrimeHelpline: string;
  sebiScores: string;
  analyzeAnother: string;
  privacyNoticeTitle: string;
  privacyNoticeDesc: string;
  howItWorksTitle: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;
  howStep4Title: string;
  howStep4Desc: string;
  commonScamsTitle: string;
  commonScam1Title: string;
  commonScam1Desc: string;
  commonScam2Title: string;
  commonScam2Desc: string;
  commonScam3Title: string;
  commonScam3Desc: string;
  officialDisclaimers: string;
  highRiskBadge: string;
  mediumRiskBadge: string;
  lowRiskBadge: string;
  unverifiedBadge: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    brandTitle: 'ScamLens Bharat',
    brandTagline: 'Investor Safety & Misinformation Detection Platform',
    heroHeadline: 'Before you trust it, check it.',
    heroSubtitle: 'Analyze suspicious investment messages, claims, and links for scam and misinformation signals.',
    analyzeBtn: 'Analyze Content',
    seeHowItWorksBtn: 'See How It Works',
    tabText: 'Paste Message',
    tabScreenshot: 'Upload Screenshot',
    tabUrl: 'Analyze URL',
    textPlaceholder: 'Paste suspicious WhatsApp forward, SMS, Telegram alert, or investment claim here (e.g., "Guaranteed 30% monthly return, transfer funds to UPI...")...',
    urlPlaceholder: 'Enter suspicious trading link, website, or portal URL (e.g., https://master-trade-signals.xyz)...',
    charCount: 'characters',
    analyzeAction: 'Analyze for Risk',
    analyzingText: 'Auditing Content Safety...',
    demoModeTitle: 'Interactive Demo Showcase',
    demoModeBadge: 'Demo Mode',
    demoPrompt: 'Select a pre-built Indian investor scenario to inspect:',
    demoCase1: 'High-Risk Investment Scheme (WhatsApp/Telegram)',
    demoCase2: 'Misleading Course Claim (Finfluencer Win-Rate)',
    demoCase3: 'Low-Risk Awareness Alert (Official Exchange Circular)',
    riskAssessment: 'Risk Assessment Overview',
    riskScoreLabel: 'Risk Indicator Intensity',
    riskScoreClarification: 'Rule & AI signal score (0–10). This indicates warning severity, NOT a mathematical probability of loss.',
    redFlagsDetected: 'Detected Red Flags',
    noRedFlags: 'No critical warning flags were triggered in this content.',
    claimsDetected: 'Extracted Claims & Verification Status',
    noClaims: 'No specific factual claims were isolated from the submission.',
    whyFlagged: 'Why Was This Flagged?',
    safeNextSteps: 'Safe Next Steps for Retail Investors',
    dosHeading: 'What You SHOULD Do',
    dontsHeading: 'What You MUST AVOID',
    simpleExplanationToggle: 'Simple Explanation Mode',
    simpleExplanationDesc: 'Plain language simplified for first-time investors without complex financial jargon',
    reportScheme: 'Official Reporting Portals',
    cyberCrimeHelpline: 'National Cyber Crime Helpline: 1930 / cybercrime.gov.in',
    sebiScores: 'SEBI SCORES Complaint Redressal: scores.sebi.gov.in',
    analyzeAnother: 'Analyze Another Message',
    privacyNoticeTitle: 'Zero-Storage Privacy by Design',
    privacyNoticeDesc: 'We do not save your submitted messages or images. Never enter bank passwords, MPINs, or private OTPs into any website.',
    howItWorksTitle: 'How ScamLens Bharat Protects You',
    howStep1Title: '1. Multi-Format Ingestion',
    howStep1Desc: 'Submit text messages, screenshot graphics, or web links safely.',
    howStep2Title: '2. Deterministic Rule Engine',
    howStep2Desc: 'Audits patterns against Indian statutory regulations (SEBI & RBI).',
    howStep3Title: '3. Claim Extraction & Verification',
    howStep3Desc: 'Isolates assertions like "SEBI approved" and flags unverified claims.',
    howStep4Title: '4. Actionable Next Steps',
    howStep4Desc: 'Provides plain DOs and DON’Ts and directs you to statutory helplines.',
    commonScamsTitle: 'Common Indian Investment Scams to Watch For',
    commonScam1Title: 'WhatsApp & Telegram VIP Tip Channels',
    commonScam1Desc: 'Promise 20%–50% assured monthly returns, claiming insider tips before demanding recovery fees.',
    commonScam2Title: 'Impersonation of SEBI & Veteran Investors',
    commonScam2Desc: 'Using late Rakesh Jhunjhunwala or top brokerage names to gain unearned credibility.',
    commonScam3Title: 'Rogue Trading APKs & Screen-Sharing',
    commonScam3Desc: 'Links distributed outside Google Play Store that siphon SMS and OTPs from your device.',
    officialDisclaimers: 'ScamLens provides educational and safety information. It does not provide investment advice or guarantee the accuracy of its assessment.',
    highRiskBadge: 'HIGH RISK DETECTED',
    mediumRiskBadge: 'MODERATE RISK DETECTED',
    lowRiskBadge: 'LOW RISK (BENIGN)',
    unverifiedBadge: 'UNABLE TO VERIFY',
  },
  hi: {
    brandTitle: 'स्कैम-लेंस भारत',
    brandTagline: 'भारतीय खुदरा निवेशकों के लिए एआई सुरक्षा मंच',
    heroHeadline: 'भरोसा करने से पहले, जांच अवश्य करें।',
    heroSubtitle: 'संदिग्ध व्हाट्सएप संदेश, एसएमएस, सोशल मीडिया विज्ञापनों और लिंक्स की तत्काल जांच करें।',
    analyzeBtn: 'संदेश की जांच करें',
    seeHowItWorksBtn: 'यह कैसे काम करता है',
    tabText: 'संदेश पेस्ट करें',
    tabScreenshot: 'स्क्रीनशॉट अपलोड करें',
    tabUrl: 'वेबसाइट लिंक जांचें',
    textPlaceholder: 'यहाँ संदिग्ध व्हाट्सएप, टेलीग्राम या एसएमएस संदेश पेस्ट करें (उदा: "गारंटीड 30% मुनाफा, तुरंत पैसे भेजें...")...',
    urlPlaceholder: 'संदिग्ध वेबसाइट या लिंक दर्ज करें (उदा: https://master-trade-signals.xyz)...',
    charCount: 'अक्षर',
    analyzeAction: 'जोखिम की जांच करें',
    analyzingText: 'सुरक्षा संकेतों का विश्लेषण जारी है...',
    demoModeTitle: 'डेमो मोड (नमूना मामले)',
    demoModeBadge: 'डेमो मोड',
    demoPrompt: 'जांच के लिए पहले से तैयार भारतीय निवेश परिदृश्य चुनें:',
    demoCase1: 'उच्च-जोखिम निवेश फर्जीवाड़ा (व्हाट्सएप/टेलीग्राम)',
    demoCase2: 'भ्रामक दावा (फिनफ्लुएंसर 99% सफलता दर)',
    demoCase3: 'कम-जोखिम जागरूकता संदेश (आधिकारिक एनएसई चेतावनी)',
    riskAssessment: 'जोखिम मूल्यांकन सारांश',
    riskScoreLabel: 'जोखिम सूचकांक स्कोर',
    riskScoreClarification: 'नियम व एआई संकेत स्कोर (0–10)। यह चेतावनी स्तर दर्शाता है, वित्तीय हानि की गणितीय संभावना नहीं।',
    redFlagsDetected: 'पहचाने गए खतरे (रेड फ्लैग्स)',
    noRedFlags: 'इस सामग्री में कोई गंभीर चेतावनी संकेत नहीं पाया गया।',
    claimsDetected: 'किए गए दावे और उनकी सत्यता स्थिति',
    noClaims: 'इस संदेश में कोई विशिष्ट वित्तीय दावा नहीं मिला।',
    whyFlagged: 'इसे संदिग्ध क्यों माना गया?',
    safeNextSteps: 'खुदरा निवेशकों के लिए सुरक्षित कदम',
    dosHeading: 'आपको क्या करना चाहिए (DO)',
    dontsHeading: 'आपको क्या कभी नहीं करना चाहिए (DON’T)',
    simpleExplanationToggle: 'सरल भाषा मोड',
    simpleExplanationDesc: 'बिना जटिल वित्तीय शब्दावली के आम भाषा में स्पष्टीकरण',
    reportScheme: 'आधिकारिक शिकायत पोर्टल',
    cyberCrimeHelpline: 'राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930 / cybercrime.gov.in',
    sebiScores: 'सेबी स्कोर्स (SCORES) शिकायत निवारण: scores.sebi.gov.in',
    analyzeAnother: 'अन्य संदेश की जांच करें',
    privacyNoticeTitle: 'गोपनीयता की गारंटी (शून्य डेटा संग्रह)',
    privacyNoticeDesc: 'हम आपका संदेश या स्क्रीनशॉट स्थायी रूप से कभी सुरक्षित नहीं रखते। अपना बैंक पासवर्ड या ओटीपी कभी दर्ज न करें।',
    howItWorksTitle: 'स्कैम-लेंस भारत कैसे आपकी रक्षा करता है',
    howStep1Title: '1. सामग्री अपलोड',
    howStep1Desc: 'टेक्स्ट, स्क्रीनशॉट या वेब लिंक सुरक्षित रूप से दर्ज करें।',
    howStep2Title: '2. स्वचालित नियम इंजन',
    howStep2Desc: 'सेबी और आरबीआई के सुरक्षा नियमों के आधार पर जोखिम की पहचान।',
    howStep3Title: '3. दावों का विश्लेषण',
    howStep3Desc: 'संदेश में किए गए "सेबी अनुमोदित" जैसे दावों की असलियत की पड़ताल।',
    howStep4Title: '4. सुरक्षित कदम',
    howStep4Desc: 'पैसे बचाने के लिए स्पष्ट सलाह और आधिकारिक हेल्पलाइन नंबर।',
    commonScamsTitle: 'भारत में प्रचलित सामान्य वित्तीय घोटाले',
    commonScam1Title: 'व्हाट्सएप व टेलीग्राम वीआईपी ग्रुप',
    commonScam1Desc: '20% से 50% मासिक पक्के मुनाफे का लालच देकर अग्रिम शुल्क की मांग।',
    commonScam2Title: 'सेबी या बड़े निवेशकों का फर्जी नाम',
    commonScam2Desc: 'राकेश झुनझुनवाला या मशहूर ब्रोकरों के नाम का गलत इस्तेमाल।',
    commonScam3Title: 'अनधिकृत एपीके (APK) फाइलें',
    commonScam3Desc: 'प्ले स्टोर के बाहर से ऐप डाउनलोड करवा कर बैंक ओटीपी चुराना।',
    officialDisclaimers: 'स्कैम-लेंस केवल सुरक्षा व जागरूकता जानकारी प्रदान करता है। यह कोई वित्तीय या निवेश सलाह नहीं है।',
    highRiskBadge: 'उच्च जोखिम (सावधान रहें)',
    mediumRiskBadge: 'मध्यम जोखिम (जांच जरूरी)',
    lowRiskBadge: 'कम जोखिम (सुरक्षित)',
    unverifiedBadge: 'सत्यापन असमर्थ',
  },
  te: {
    brandTitle: 'స్కామ్‌లెన్స్ భారత్',
    brandTagline: 'భారతీయ పెట్టుబడిదారుల రక్షణ మరియు తప్పుడు సమాచార గుర్తింపు వేదిక',
    heroHeadline: 'నమ్మే ముందు... సరిచూసుకోండి.',
    heroSubtitle: 'అనుమానాస్పద వాట్సాప్ సందేశాలు, ఎస్ఎంఎస్ లు మరియు పెట్టుబడి లింకులను క్షుణ్ణంగా విశ్లేషించండి.',
    analyzeBtn: 'సందేశాన్ని పరిశీలించండి',
    seeHowItWorksBtn: 'ఇది ఎలా పనిచేస్తుంది',
    tabText: 'సందేశం అతికించండి',
    tabScreenshot: 'స్క్రీన్‌షాట్ అప్‌లోడ్',
    tabUrl: 'వెబ్‌సైట్ లింక్',
    textPlaceholder: 'అనుమానాస్పద వాట్సాప్ ఫార్వర్డ్ లేదా పెట్టుబడి సందేశాన్ని ఇక్కడ అతికించండి (ఉదా: "నెలకు 30% ఖచ్చితమైన లాభం, యూపీఐ కి డబ్బు పంపండి...")...',
    urlPlaceholder: 'అనుమానాస్పద వెబ్‌సైట్ లేదా లింక్ నమోదు చేయండి...',
    charCount: 'అక్షరాలు',
    analyzeAction: 'ప్రమాద తీవ్రతను పరిశీలించండి',
    analyzingText: 'భద్రతా సంకేతాల పరిశీలన జరుగుతోంది...',
    demoModeTitle: 'డెమో మోడ్ (నమూనా కేసులు)',
    demoModeBadge: 'డెమో మోడ్',
    demoPrompt: 'పరిశీలించడానికి ఒక భారతీయ నమూనా కేసును ఎంచుకోండి:',
    demoCase1: 'తీవ్రమైన మోసపూరిత స్కీమ్ (వాట్సాప్/టెలిగ్రామ్)',
    demoCase2: 'తప్పుదోవ పట్టించే వాదన (ఫిన్‌ఫ్లూయెన్సర్ 99% లాభం)',
    demoCase3: 'అధికారిక అవగాహన హెచ్చరిక (ఎన్‌ఎస్‌ఈ సర్క్యులర్)',
    riskAssessment: 'రిస్క్ అంచనా సారాంశం',
    riskScoreLabel: 'రిస్క్ స్కోరు తీవ్రత',
    riskScoreClarification: 'నియమాలు & ఏఐ సంకేతాల స్కోరు (0–10). ఇది హెచ్చరిక స్థాయిని సూచిస్తుంది.',
    redFlagsDetected: 'గుర్తించబడిన ప్రమాద సంకేతాలు (రెడ్ ఫ్లాగ్స్)',
    noRedFlags: 'ఈ సందేశంలో ఎటువంటి తీవ్రమైన ప్రమాద సంకేతాలు లేవు.',
    claimsDetected: 'వాదనలు మరియు ధృవీకరణ వివరాలు',
    noClaims: 'ప్రత్యేక వాదనలేవీ గుర్తించబడలేదు.',
    whyFlagged: 'దీనిని ఎందుకు ప్రమాదకరంగా గుర్తించారు?',
    safeNextSteps: 'పెట్టుబడిదారులకు సురక్షితమైన చర్యలు',
    dosHeading: 'మీరు చేయవలసినవి (DO)',
    dontsHeading: 'మీరు ఎప్పటికీ చేయకూడనివి (DON’T)',
    simpleExplanationToggle: 'సులభమైన వివరణ మోడ్',
    simpleExplanationDesc: 'సాధారణ ప్రజలకు అర్థమయ్యే సరళమైన భాషలో సమాచారం',
    reportScheme: 'అధికారిక ఫిర్యాదు పోర్టల్స్',
    cyberCrimeHelpline: 'జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930 / cybercrime.gov.in',
    sebiScores: 'సెబీ స్కోర్స్ (SCORES) పోర్టల్: scores.sebi.gov.in',
    analyzeAnother: 'మరొక సందేశాన్ని తనిఖీ చేయండి',
    privacyNoticeTitle: 'గోప్యతకు హామీ (జీరో స్టోరేజ్)',
    privacyNoticeDesc: 'మేము మీ సందేశాలు లేదా స్క్రీన్‌షాట్‌లను భద్రపరచము. మీ బ్యాంక్ వివరాలు లేదా ఓటీపీలను ఎక్కడా నమోదు చేయవద్దు.',
    howItWorksTitle: 'స్కామ్‌లెన్స్ భారత్ ఎలా పనిచేస్తుంది',
    howStep1Title: '1. సమాచారాన్ని అందించడం',
    howStep1Desc: 'టెక్స్ట్, స్క్రీన్‌షాట్ లేదా లింక్ సురక్షితంగా సమర్పించండి.',
    howStep2Title: '2. రూల్ ఇంజిన్ విశ్లేషణ',
    howStep2Desc: 'సెబీ మరియు ఆర్బీఐ నిబంధనల ప్రకారం మోసాలను గుర్తిస్తుంది.',
    howStep3Title: '3. వాదనల పరిశీలన',
    howStep3Desc: 'అధికారిక అనుమతులు ఉన్నాయో లేదో నిర్ధారిస్తుంది.',
    howStep4Title: '4. సురక్షిత సూచనలు',
    howStep4Desc: 'మీ డబ్బును కాపాడుకోవడానికి చేయవలసిన మరియు చేయకూడని పనులు.',
    commonScamsTitle: 'భారతదేశంలో ఎక్కువగా జరిగే పెట్టుబడి మోసాలు',
    commonScam1Title: 'వాట్సాప్ & టెలిగ్రామ్ వీఐపీ గ్రూపులు',
    commonScam1Desc: 'అధిక లాభాలు ఆశజూపి అడ్వాన్స్ ఫీజులు డిమాండ్ చేస్తారు.',
    commonScam2Title: 'సెబీ పేరుతో లేదా ప్రముఖుల పేర్లతో మోసాలు',
    commonScam2Desc: 'రాకేష్ ఝున్‌ఝున్‌వాలా లేదా బడా బ్రోకర్ల పేర్లను దుర్వినియోగం చేస్తారు.',
    commonScam3Title: 'తెలియని ఏపీకే (APK) యాప్‌లు',
    commonScam3Desc: 'ప్లే స్టోర్ వెలుపలి యాప్‌ల ద్వారా ఓటీపీలు దొంగిలిస్తారు.',
    officialDisclaimers: 'స్కామ్‌లెన్స్ కేవలం అవగాహన మరియు భద్రతా సమాచారాన్ని అందిస్తుంది. ఇది పెట్టుబడి సలహా కాదు.',
    highRiskBadge: 'తీవ్రమైన ప్రమాదం (జాగ్రత్త)',
    mediumRiskBadge: 'మధ్యస్థ ప్రమాదం (సరిచూసుకోండి)',
    lowRiskBadge: 'తక్కువ ప్రమాదం (సురక్షితం)',
    unverifiedBadge: 'ధృవీకరించబడలేదు',
  },
};

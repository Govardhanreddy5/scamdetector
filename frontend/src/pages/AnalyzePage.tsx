import React, { useState } from 'react';
import { MessageSquare, Image as ImageIcon, Link as LinkIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { Language, AnalysisResult } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { UploadZone } from '../components/UploadZone';
import { DemoModeSelector } from '../components/DemoModeSelector';
import { AnalysisProgress } from '../components/AnalysisProgress';
import { ErrorState } from '../components/ErrorState';
import { analyzeText, analyzeImage, analyzeUrl, runDemoCase } from '../services/api';

interface AnalyzePageProps {
  language: Language;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({
  language,
  onAnalysisComplete,
}) => {
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<'text' | 'screenshot' | 'url'>('text');
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setErrorMessage(null);

    try {
      if (activeTab === 'text') {
        if (!textContent.trim()) {
          setErrorMessage('Please paste or type the message content before analyzing.');
          return;
        }
        setIsLoading(true);
        const result = await analyzeText(textContent, language);
        onAnalysisComplete(result);
      } else if (activeTab === 'screenshot') {
        if (!selectedFile) {
          setErrorMessage('Please upload a screenshot image to proceed.');
          return;
        }
        setIsLoading(true);
        const result = await analyzeImage(selectedFile, language);
        onAnalysisComplete(result);
      } else if (activeTab === 'url') {
        if (!urlInput.trim()) {
          setErrorMessage('Please enter a website link or portal URL to inspect.');
          return;
        }
        setIsLoading(true);
        const result = await analyzeUrl(urlInput.trim(), language);
        onAnalysisComplete(result);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Analysis could not be completed. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemoCase = async (caseId: string) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const demoResult = await runDemoCase(caseId, language);
      onAnalysisComplete(demoResult);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load demo scenario.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Demo Mode Quick Bar */}
      <DemoModeSelector
        onSelectCase={handleSelectDemoCase}
        language={language}
        isLoading={isLoading}
      />

      {/* Main Analysis Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Analyze Suspicious Financial Communication
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose an input method below to inspect claims, red flags, and compliance signals.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 mb-6 gap-2" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'text'}
            onClick={() => {
              setActiveTab('text');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'text'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.tabText}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'screenshot'}
            onClick={() => {
              setActiveTab('screenshot');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'screenshot'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{t.tabScreenshot}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'url'}
            onClick={() => {
              setActiveTab('url');
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'url'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>{t.tabUrl}</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'text' && (
          <div>
            <div className="relative">
              <textarea
                rows={6}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder={t.textPlaceholder}
                className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-y"
              />
              <div className="text-right text-[11px] text-slate-400 mt-1">
                {textContent.length} {t.charCount}
              </div>
            </div>

            {/* Quick Helper Chips */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Common examples:</span>
              <button
                type="button"
                onClick={() =>
                  setTextContent(
                    '🔥 SEBI APPROVED VIP TRADING CLUB 🔥\nGuaranteed 30% monthly return with ZERO risk!\nDouble your money in just 25 days!\nAct fast! Only 5 slots left today!\nTransfer ₹10,000 to UPI ID: quickwealth@okaxis'
                  )
                }
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors"
              >
                + Guaranteed Profit Scam
              </button>
              <button
                type="button"
                onClick={() =>
                  setTextContent(
                    'Dear Customer, your Demat KYC is expired. Share your OTP immediately to avoid account suspension.'
                  )
                }
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors"
              >
                + OTP Phishing Message
              </button>
            </div>
          </div>
        )}

        {activeTab === 'screenshot' && (
          <div>
            <UploadZone
              onFileSelected={(file) => setSelectedFile(file)}
              selectedFile={selectedFile}
            />
          </div>
        )}

        {activeTab === 'url' && (
          <div>
            <div className="relative">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={t.urlPlaceholder}
                className="w-full rounded-xl border border-slate-300 p-3.5 pl-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Safe backend inspection: ScamLens checks domain reputation, SSL encryption, and SSRF security without executing untrusted scripts in your browser.
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4">
            <ErrorState message={errorMessage} onRetry={handleAnalyze} />
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleAnalyze}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>{isLoading ? t.analyzingText : t.analyzeAction}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress state */}
      {isLoading && (
        <div className="mt-6">
          <AnalysisProgress language={language} />
        </div>
      )}
    </div>
  );
};

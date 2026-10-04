import React, { useState } from 'react';
import { Language, AnalysisResult } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ResultsPage } from './pages/ResultsPage';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'analyze' | 'results'>('landing');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleStartAnalysis = () => {
    setCurrentView('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeAnother = () => {
    setAnalysisResult(null);
    setCurrentView('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onNavigateHome={handleNavigateHome}
        onOpenDemo={handleStartAnalysis}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            language={currentLanguage}
            onStartAnalysis={handleStartAnalysis}
            onOpenDemo={handleStartAnalysis}
          />
        )}

        {currentView === 'analyze' && (
          <AnalyzePage
            language={currentLanguage}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {currentView === 'results' && analysisResult && (
          <ResultsPage
            result={analysisResult}
            language={currentLanguage}
            onAnalyzeAnother={handleAnalyzeAnother}
          />
        )}
      </main>

      {/* Footer */}
      <Footer language={currentLanguage} />
    </div>
  );
}

export default App;

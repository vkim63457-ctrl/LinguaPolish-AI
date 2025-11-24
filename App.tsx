import React, { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { AdModal } from './components/AdModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { correctText } from './services/geminiService';
import { CorrectionType, CorrectionResponse } from './types';
import { Wand2, Check, AlertCircle, Sparkles, Copy, ArrowRight, XCircle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'privacy'>('home');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<CorrectionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pro Feature State
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<CorrectionType | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (result) setResult(null); // Clear result when typing
    if (error) setError(null);
  };

  const executeCorrection = useCallback(async (type: CorrectionType) => {
    if (!inputText.trim()) {
      setError("Please enter some text to correct.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await correctText(inputText, type);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleActionClick = (type: CorrectionType) => {
    if (type === CorrectionType.ADVANCED && !isProUnlocked) {
      setPendingAction(type);
      setShowAdModal(true);
      return;
    }
    executeCorrection(type);
  };

  const handleAdComplete = () => {
    setIsProUnlocked(true);
    setShowAdModal(false);
    if (pendingAction) {
      executeCorrection(pendingAction);
      setPendingAction(null);
    }
  };

  const copyToClipboard = () => {
    if (result?.correctedText) {
      navigator.clipboard.writeText(result.correctedText);
    }
  };

  const clearEditor = () => {
    setInputText('');
    setResult(null);
    setError(null);
    if(textareaRef.current) textareaRef.current.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header isProUnlocked={isProUnlocked} onNavigate={setView} />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {view === 'privacy' ? (
          <PrivacyPolicy onBack={() => setView('home')} />
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-10 animate-in slide-in-from-top-4 duration-500">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Write Better, <span className="text-brand-600">Faster.</span>
              </h2>
              <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
                Instant grammar correction and professional style polishing powered by advanced AI.
              </p>
            </div>

            {/* Editor Area */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
              
              {/* Input Panel */}
              <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-6 bg-slate-50/30">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Original Text
                  </label>
                  {inputText && (
                     <button onClick={clearEditor} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                        <XCircle size={14} /> Clear
                     </button>
                  )}
                </div>
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Paste your text here to check grammar or improve style..."
                  className="flex-1 w-full bg-transparent border-0 resize-none focus:ring-0 p-0 text-slate-700 text-lg placeholder:text-slate-300 leading-relaxed outline-none"
                  spellCheck={false}
                />
                <div className="mt-4 flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200/60">
                   <Button 
                    variant="outline" 
                    onClick={() => handleActionClick(CorrectionType.BASIC)}
                    isLoading={isLoading}
                    disabled={!inputText.trim()}
                    icon={<Check size={18} />}
                    className="flex-1"
                   >
                     Fix Grammar (Free)
                   </Button>
                   <Button 
                    variant={isProUnlocked ? 'primary' : 'secondary'}
                    onClick={() => handleActionClick(CorrectionType.ADVANCED)}
                    isLoading={isLoading}
                    disabled={!inputText.trim()}
                    icon={isProUnlocked ? <Sparkles size={18} /> : <Wand2 size={18} />}
                    className="flex-1 group relative overflow-hidden"
                   >
                     <span className="relative z-10">
                       {isProUnlocked ? 'Professional Polish' : 'Deep Polish (Watch Ad)'}
                     </span>
                     {!isProUnlocked && (
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                     )}
                   </Button>
                </div>
              </div>

              {/* Output Panel */}
              <div className="flex-1 flex flex-col p-4 md:p-6 bg-white relative">
                 <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                    Corrected Result
                  </label>
                  {result && (
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Copy size={14} /> Copy
                    </button>
                  )}
                </div>

                <div className="flex-1 relative">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 animate-in fade-in duration-300">
                      <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-sm font-medium">Analyzing text structure...</p>
                    </div>
                  ) : error ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-in zoom-in-95 duration-200">
                      <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                        <AlertCircle size={24} />
                      </div>
                      <h3 className="text-slate-800 font-medium mb-1">Processing Error</h3>
                      <p className="text-slate-500 text-sm max-w-xs">{error}</p>
                    </div>
                  ) : result ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col">
                      <div className="prose prose-slate max-w-none flex-1 overflow-y-auto mb-4">
                        <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-wrap">
                          {result.correctedText}
                        </p>
                      </div>
                      
                      {result.explanation && (
                        <div className="mt-auto bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-sm text-indigo-800 flex gap-3">
                          <Sparkles className="w-5 h-5 flex-shrink-0 text-indigo-500 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-indigo-900 mb-1">AI Insights:</span>
                            {result.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 select-none">
                      <ArrowRight size={48} className="mb-4 opacity-20" />
                      <p className="text-sm">Corrected text will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features / SEO Content */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Check size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Instant Grammar Fixes</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our lightweight engine (Gemini Flash Lite) processes text in milliseconds to fix punctuation, spelling, and basic grammar errors instantly for free.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                 <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Smart Style Polish</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Unlock professional rewriting capabilities. We enhance tone, vocabulary, and sentence structure to make your writing sound native and authoritative.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                 <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Copy size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Privacy First</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  LinguaPolish is a stateless application. We don't store your text. Everything is processed in real-time and discarded immediately after generation.
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="container mx-auto px-4 py-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-sm text-slate-500">
               © {new Date().getFullYear()} LinguaPolish AI. All rights reserved.
             </p>
             <div className="flex gap-6 text-sm text-slate-500">
               <button onClick={() => setView('privacy')} className="hover:text-brand-600 transition-colors">Privacy Policy</button>
               <button onClick={() => setView('home')} className="hover:text-brand-600 transition-colors">Home</button>
               <a href="mailto:vk409633@gmail.com" className="hover:text-brand-600 transition-colors">Contact</a>
             </div>
           </div>
        </div>
      </footer>

      {/* Modals */}
      <AdModal 
        isOpen={showAdModal} 
        onClose={() => setShowAdModal(false)} 
        onAdComplete={handleAdComplete} 
      />
    </div>
  );
};

export default App;
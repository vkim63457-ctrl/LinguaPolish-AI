import React from 'react';
import { ArrowLeft, Shield, Lock, Server } from 'lucide-react';
import { Button } from './Button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl animate-in fade-in duration-300">
      <Button variant="ghost" onClick={onBack} className="mb-6 pl-0 hover:bg-transparent hover:text-brand-600">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Editor
      </Button>
      
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
        <div className="border-b border-slate-100 pb-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            At LinguaPolish AI, we prioritize your privacy above all else. We believe that a grammar checker should improve your writing without compromising your data. This policy outlines how we handle your information in our stateless application.
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Stateless Processing</h3>
              <p className="text-slate-600 text-sm">
                We do not store your text. Your input is sent to our AI engine for processing and is immediately discarded after the result is returned. No database, no history.
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
               <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Personal Data</h3>
              <p className="text-slate-600 text-sm">
                We do not require account creation, emails, or passwords. You use the service anonymously. We don't know who you are, and we like it that way.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h3>
          <p className="mb-4 text-slate-600">
            <strong className="text-slate-800">Input Text:</strong> When you use our service, you provide text for correction. This text is transmitted securely via HTTPS to the Google Gemini API for processing. It is not used to train our models and is not stored on our servers.
          </p>
          <p className="mb-4 text-slate-600">
            <strong className="text-slate-800">Usage Data:</strong> We may collect anonymous technical data such as browser type, operating system, and basic usage statistics to ensure the site functions correctly.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Third-Party Services</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4 text-slate-600">
            <li>
              <strong className="text-slate-800">Google Gemini API:</strong> We use Google's Generative AI to process your text. Google processes this data in accordance with their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Privacy Policy</a>.
            </li>
            <li>
              <strong className="text-slate-800">Advertising:</strong> To provide Pro features for free, we may display non-intrusive advertisements. These providers may use cookies to limit the number of times you see an ad.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h3>
          <p className="mb-4 text-slate-600">
            We implement standard industry security measures including Transport Layer Security (TLS/SSL) encryption for all data in transit. Since we do not store your data at rest, there is no database to be breached.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h3>
          <p className="text-slate-600">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:vk409633@gmail.com" className="text-brand-600 hover:underline">vk409633@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
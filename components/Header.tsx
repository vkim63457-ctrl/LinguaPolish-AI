import React from 'react';
import { PenTool, Crown } from 'lucide-react';

interface HeaderProps {
  isProUnlocked: boolean;
  onNavigate: (view: 'home' | 'privacy') => void;
}

export const Header: React.FC<HeaderProps> = ({ isProUnlocked, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
            <PenTool size={18} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-indigo-600">
            LinguaPolish
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {isProUnlocked ? (
             <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 text-sm font-medium animate-in fade-in slide-in-from-top-2">
               <Crown size={14} className="fill-indigo-600" />
               <span>Pro Active</span>
             </div>
          ) : (
            <div className="text-sm text-slate-500 hidden sm:block">
              Free Plan
            </div>
          )}
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => onNavigate('home')} className="hover:text-brand-600 transition-colors">Editor</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-brand-600 transition-colors">Privacy</button>
          </nav>
        </div>
      </div>
    </header>
  );
};
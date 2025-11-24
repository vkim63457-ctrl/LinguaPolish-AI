import React, { useEffect, useState } from 'react';
import { X, PlayCircle, Loader2 } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAdComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isOpen && isAdPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsAdPlaying(false);
      onAdComplete();
    }

    return () => clearInterval(timer);
  }, [isOpen, isAdPlaying, timeLeft, onAdComplete]);

  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(5);
      setIsAdPlaying(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg flex items-center">
            <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded mr-2">AD</span>
            Unlocking Pro Features
          </h3>
          {!isAdPlaying && (
            <button onClick={onClose} className="hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Ad Content Simulation */}
        <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center relative group">
           {/* Progress Bar */}
           {isAdPlaying && (
             <div className="absolute top-0 left-0 h-1 bg-yellow-400 z-10 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 5) * 100}%` }}></div>
           )}

           <div className="text-center p-6">
              {isAdPlaying ? (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                     <PlayCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">Cool SaaS Product Ad</h4>
                  <p className="text-slate-500 text-sm">Wait {timeLeft} seconds to unlock Pro features...</p>
                </>
              ) : (
                 <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
                    <p className="font-medium text-slate-700">Finalizing unlock...</p>
                 </div>
              )}
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 text-xs text-slate-400 text-center">
          LinguaPolish supports creators via non-intrusive ads.
        </div>
      </div>
    </div>
  );
};
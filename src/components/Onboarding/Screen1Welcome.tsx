import React from 'react';
import { ArrowLeft, ArrowRight, Check, Globe } from 'lucide-react';
import { SproutMascot } from '../Mascot/SproutMascot';
import { ProgressBar } from '../Common/ProgressBar';
import type { Language } from '../../types';

interface Screen1WelcomeProps {
  onNext: () => void;
  onBack: () => void;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Screen1Welcome: React.FC<Screen1WelcomeProps> = ({
  onNext,
  onBack,
  selectedLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[680px] bg-white rounded-3xl sm:border border-[#DCE8E0] sm:shadow-lg flex flex-col justify-between p-5 sm:p-6">
      {/* Top Header & Navigation */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#4B5E53] hover:bg-[#F2F8F4] active:scale-95 transition-all cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#176B45] flex items-center justify-center text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22V13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M12 16C12 11 7 10 6 13C6 17 11 17 12 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M12 13C12 8 17 7 18 10C18 14 13 14 12 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-sm text-[#17251D]">Sprout 2.0</span>
          </div>

          <div className="w-11" /> {/* Spacer */}
        </div>

        {/* Progress Bar (Step 1 of 5) */}
        <ProgressBar currentStep={1} totalSteps={5} stepName="Welcome" className="mb-6" />

        {/* Mascot Centerpiece */}
        <div className="flex justify-center my-4">
          <SproutMascot state="welcome" size={130} />
        </div>

        {/* Headings */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-extrabold text-[#17251D] tracking-tight">
            Small steps. <br />
            <span className="text-[#176B45]">Your investing journey.</span>
          </h2>
          <p className="text-[16px] text-[#526359] leading-relaxed">
            Get started at your own pace, with clear information at every step.
          </p>
        </div>

        {/* Language Selection Card */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-bold text-[#526359] uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#176B45]" />
            <span>Select Preferred Language</span>
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            {/* English Option */}
            <button
              type="button"
              onClick={() => onSelectLanguage('en')}
              className={`min-h-[48px] p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                selectedLanguage === 'en'
                  ? 'border-[#176B45] bg-[#E8F2EA]/60 text-[#17251D] font-bold shadow-xs'
                  : 'border-[#DCE8E0] hover:border-[#176B45]/40 text-[#4B5E53]'
              }`}
            >
              <div>
                <span className="text-sm block">English</span>
                <span className="text-[11px] text-[#63776C] font-normal">Default</span>
              </div>
              {selectedLanguage === 'en' && (
                <div className="w-5 h-5 rounded-full bg-[#176B45] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>

            {/* Hindi Option (With 'Coming Soon' Badge) */}
            <div
              className="min-h-[48px] p-3 rounded-xl border border-[#DCE8E0] bg-[#F8FAF7] text-left flex items-center justify-between opacity-85"
            >
              <div>
                <span className="text-sm font-semibold text-[#314337] block font-devanagari">हिन्दी</span>
                <span className="text-[10px] text-[#869A8E] font-medium">Coming soon</span>
              </div>
              <span className="text-[10px] bg-[#E2ECE5] text-[#475C50] font-semibold px-1.5 py-0.5 rounded">
                Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 border-t border-[#F2F8F4] space-y-2">
        <button
          onClick={onNext}
          className="w-full min-h-[50px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-[11px] text-center text-[#758A7E]">
          Explore investments starting from ₹100
        </p>
      </div>
    </div>
  );
};

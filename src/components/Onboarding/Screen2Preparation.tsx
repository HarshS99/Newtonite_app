import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, HelpCircle, X } from 'lucide-react';
import { SproutMascot } from '../Mascot/SproutMascot';
import { ProgressBar } from '../Common/ProgressBar';

interface Screen2PreparationProps {
  onNext: () => void;
  onBack: () => void;
  onLater: () => void;
}

export const Screen2Preparation: React.FC<Screen2PreparationProps> = ({
  onNext,
  onBack,
  onLater,
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[680px] bg-white rounded-3xl sm:border border-[#DCE8E0] sm:shadow-lg flex flex-col justify-between p-5 sm:p-6 relative">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#4B5E53] hover:bg-[#F2F8F4] active:scale-95 transition-all cursor-pointer"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-[#17251D]">Sprout 2.0</span>
          </div>

          <button
            onClick={onLater}
            className="min-h-[44px] min-w-[44px] px-2.5 rounded-lg flex items-center justify-center text-xs font-semibold text-[#667B70] hover:text-[#17251D] hover:bg-[#F2F8F4] transition-all cursor-pointer"
          >
            Skip for now
          </button>
        </div>

        {/* Progress Bar (Step 2 of 5) */}
        <ProgressBar currentStep={2} totalSteps={5} stepName="Preparation" className="mb-4" />

        {/* Mascot Centerpiece */}
        <div className="flex items-center justify-center gap-3 my-2 bg-[#F8FAF7] p-3 rounded-2xl border border-[#E4EFE8]">
          <SproutMascot state="explaining" size={85} />
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#176B45] uppercase tracking-wide">
              Quick Tip
            </span>
            <p className="text-xs text-[#46594E] leading-snug">
              Keep your Aadhaar-linked phone nearby to receive your verification code.
            </p>
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-1 mb-4 mt-3">
          <h2 className="text-2xl font-extrabold text-[#17251D] tracking-tight">
            A few things to get ready
          </h2>
          <p className="text-[16px] text-[#526359] leading-relaxed">
            Having these ready can make verification easier.
          </p>
        </div>

        {/* Checklist Cards */}
        <div className="space-y-2.5 mb-4">
          <div className="p-3.5 rounded-xl border border-[#DCE8E0] bg-[#F8FAF7] flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E8F2EA] text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#17251D]">PAN Card</h4>
              <p className="text-xs text-[#526359] leading-tight mt-0.5">
                Required for tax and identity identification under Indian mutual fund regulations.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DCE8E0] bg-[#F8FAF7] flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E8F2EA] text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#17251D]">Aadhaar Card</h4>
              <p className="text-xs text-[#526359] leading-tight mt-0.5">
                For electronic address and identity authentication via DigiLocker.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DCE8E0] bg-[#F8FAF7] flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#E8F2EA] text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#17251D]">Mobile linked to Aadhaar</h4>
              <p className="text-xs text-[#526359] leading-tight mt-0.5">
                To receive the official electronic OTP from UIDAI DigiLocker.
              </p>
            </div>
          </div>
        </div>

        {/* Time estimate banner & Help link */}
        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-[#F2F8F4] border border-[#CFE1D6] flex items-center gap-2.5 text-xs text-[#284232]">
            <Clock className="w-4 h-4 text-[#176B45] shrink-0" />
            <span>
              <strong>Allow around 5 minutes;</strong> verification may take longer.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45] hover:underline cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Why do we need these details?</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[#F2F8F4] space-y-2.5">
        <button
          onClick={onNext}
          className="w-full min-h-[50px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onLater}
          className="w-full min-h-[44px] text-xs font-semibold text-[#5A6D62] hover:text-[#17251D] transition-colors py-2 cursor-pointer"
        >
          I'll do this later
        </button>
      </div>

      {/* Why We Ask Help Modal */}
      {showHelpModal && (
        <div className="absolute inset-0 z-50 bg-[#17251D]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full bg-white rounded-2xl p-5 border border-[#DCE8E0] shadow-xl text-left space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#17251D]">Why KYC is Mandatory</h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#55695D] hover:bg-[#F2F8F4] cursor-pointer"
                aria-label="Close help modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#526359] leading-relaxed">
              In India, financial regulations require Know Your Customer (KYC) checks for investment accounts. This confirms your identity, prevents fraudulent activities, and ensures all purchased mutual fund units remain linked to your legal PAN.
            </p>
            <p className="text-xs text-[#526359] leading-relaxed">
              Your details are transmitted over encrypted connections solely for verification.
            </p>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full min-h-[44px] bg-[#176B45] text-white text-xs font-bold rounded-xl py-2 mt-2"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

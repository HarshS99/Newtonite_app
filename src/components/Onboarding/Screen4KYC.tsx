import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { SproutMascot } from '../Mascot/SproutMascot';
import { ProgressBar } from '../Common/ProgressBar';

interface Screen4KYCProps {
  onNext: () => void;
  onBack: () => void;
  pan: string;
  onPanChange: (pan: string) => void;
  aadhaarConsent: boolean;
  onToggleAadhaarConsent: (consent: boolean) => void;
}

export const Screen4KYC: React.FC<Screen4KYCProps> = ({
  onNext,
  onBack,
  pan,
  onPanChange,
  aadhaarConsent,
  onToggleAadhaarConsent,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo-only PAN format check: 5 uppercase letters, 4 digits, 1 uppercase letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!pan || !panRegex.test(pan)) {
      setErrorMsg('Enter a valid PAN format: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)');
      return;
    }
    if (!aadhaarConsent) {
      setErrorMsg('Please check the DigiLocker Aadhaar consent box to continue');
      return;
    }
    setErrorMsg('');
    onNext();
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[680px] bg-white rounded-3xl sm:border border-[#DCE8E0] sm:shadow-lg flex flex-col justify-between p-5 sm:p-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#4B5E53] hover:bg-[#F2F8F4] active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="font-bold text-sm text-[#17251D]">Sprout 2.0</span>
          <div className="w-11" />
        </div>

        {/* Progress Bar (Step 4 of 5) */}
        <ProgressBar currentStep={4} totalSteps={5} stepName="Identity Verification" className="mb-4" />

        {/* Mascot & Guide Banner */}
        <div className="flex items-center gap-3 bg-[#F8FAF7] p-3 rounded-2xl border border-[#DCE8E0] mb-5">
          <SproutMascot state="explaining" size={70} showShadow={false} />
          <div className="text-left">
            <span className="text-[11px] font-bold text-[#176B45] uppercase">Electronic Verification</span>
            <p className="text-xs text-[#526359] leading-tight mt-0.5">
              Verified directly via government DigiLocker servers. No physical visits needed.
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1 mb-5">
          <h2 className="text-2xl font-extrabold text-[#17251D] tracking-tight">
            Verify your identity
          </h2>
          <p className="text-[16px] text-[#526359] leading-relaxed">
            We need these details to complete your regulatory account verification.
          </p>
        </div>

        {/* PAN Input Field */}
        <div className="space-y-4">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="pan-input" className="text-xs font-bold text-[#4B5E53] uppercase tracking-wider">
                Permanent Account Number (PAN)
              </label>
              <span className="text-[11px] text-[#176B45] font-semibold">10 Characters</span>
            </div>

            <div className="relative">
              <input
                id="pan-input"
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => {
                  onPanChange(e.target.value.toUpperCase());
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full px-4 py-3 text-base font-mono font-bold tracking-wider uppercase text-[#17251D] rounded-xl border border-[#DCE8E0] focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 bg-[#F8FAF7] outline-none transition-all placeholder:text-[#A7B9AF]"
              />
              <div className="absolute right-3.5 top-3.5 text-[#176B45]">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-[#71877A]">As printed on your physical PAN card</p>
          </div>

          {/* DigiLocker Aadhaar Consent Card */}
          <div 
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'LABEL') {
                onToggleAadhaarConsent(!aadhaarConsent);
              }
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex items-start gap-3 ${
              aadhaarConsent
                ? 'border-[#176B45] bg-[#E8F2EA]/40'
                : 'border-[#DCE8E0] bg-[#F8FAF7] hover:border-[#176B45]/40'
            }`}
          >
            <input
              type="checkbox"
              id="aadhaar-consent"
              checked={aadhaarConsent}
              onChange={(e) => {
                e.stopPropagation();
                onToggleAadhaarConsent(e.target.checked);
              }}
              className="w-5 h-5 mt-0.5 accent-[#176B45] rounded cursor-pointer"
            />
            <label
              htmlFor="aadhaar-consent"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-[#35483C] leading-snug cursor-pointer select-none"
            >
              <strong className="block text-[#17251D] font-bold mb-0.5">
                Electronic Aadhaar Verification via DigiLocker
              </strong>
              I authorize Sprout 2.0 to fetch my KYC records from UIDAI / DigiLocker solely for the purpose of opening this investment account.
            </label>
          </div>

          {errorMsg && (
            <p className="text-xs text-[#D9383A] font-medium text-left">{errorMsg}</p>
          )}

          {/* Privacy Note */}
          <div className="flex items-center gap-1.5 text-xs text-[#526359]">
            <ShieldCheck className="w-4 h-4 text-[#176B45] shrink-0" />
            <span>Your personal data is encrypted and strictly confidential.</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 border-t border-[#F2F8F4] space-y-2">
        <button
          onClick={handleContinue}
          className="w-full min-h-[50px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to verification</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-center text-[#758A7E]">
          Prototype demo only — no real PAN or personal data is collected or transmitted
        </p>
      </div>
    </div>
  );
};

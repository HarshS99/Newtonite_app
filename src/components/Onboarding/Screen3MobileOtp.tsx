import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { ProgressBar } from '../Common/ProgressBar';

interface Screen3MobileOtpProps {
  onNext: () => void;
  onBack: () => void;
  mobile: string;
  onMobileChange: (mobile: string) => void;
}

export const Screen3MobileOtp: React.FC<Screen3MobileOtpProps> = ({
  onNext,
  onBack,
  mobile,
  onMobileChange,
}) => {
  const [stepStage, setStepStage] = useState<'enter-mobile' | 'enter-otp'>('enter-mobile');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(30);

  // Countdown timer for simulated OTP
  useEffect(() => {
    let interval: any = null;
    if (stepStage === 'enter-otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stepStage, timer]);

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setStepStage('enter-otp');
    setTimer(30);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const entered = otp.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP');
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
            onClick={() => {
              if (stepStage === 'enter-otp') {
                setStepStage('enter-mobile');
              } else {
                onBack();
              }
            }}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#4B5E53] hover:bg-[#F2F8F4] active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="font-bold text-sm text-[#17251D]">Sprout 2.0</span>
          <div className="w-11" />
        </div>

        {/* Progress Bar (Step 3 of 5) */}
        <ProgressBar currentStep={3} totalSteps={5} stepName="Account Setup" className="mb-6" />

        {stepStage === 'enter-mobile' ? (
          /* Sub-stage 1: Enter Mobile */
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-[#17251D] tracking-tight">
                Let's set up your account
              </h2>
              <p className="text-[16px] text-[#526359] mt-1 leading-relaxed">
                Enter your mobile number to continue.
              </p>
            </div>

            {/* Mobile Input Field */}
            <div className="space-y-1.5">
              <label htmlFor="mobile-input" className="text-xs font-bold text-[#4B5E53] uppercase tracking-wider block">
                Mobile Number
              </label>

              <div className="flex items-center rounded-xl border border-[#DCE8E0] focus-within:border-[#176B45] focus-within:ring-2 focus-within:ring-[#176B45]/20 bg-[#F8FAF7] transition-all overflow-hidden">
                {/* +91 Country selector */}
                <div className="px-3.5 py-3 border-r border-[#DCE8E0] bg-[#E8F2EA]/50 text-sm font-bold text-[#176B45] flex items-center gap-1.5 select-none">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>

                <input
                  id="mobile-input"
                  type="tel"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => {
                    onMobileChange(e.target.value.replace(/\D/g, ''));
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full px-3.5 py-3 text-base sm:text-lg font-semibold text-[#17251D] bg-transparent outline-none placeholder:text-[#9FB1A6]"
                  autoComplete="tel"
                />
              </div>

              {errorMsg ? (
                <p className="text-xs text-[#D9383A] font-medium pt-1">{errorMsg}</p>
              ) : (
                <p className="text-[11px] text-[#71877A]">We'll send a 6-digit confirmation code via SMS.</p>
              )}
            </div>

            {/* Consent & Privacy Notice */}
            <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E2ECE5] flex items-start gap-2.5 text-xs text-[#526359] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
              <span>
                By continuing, you agree that your mobile number will be used for account authentication, transactional updates, and regulatory KYC communication.
              </span>
            </div>
          </div>
        ) : (
          /* Sub-stage 2: Enter 6-digit OTP */
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E8F2EA] px-2.5 py-1 rounded-full">
                Verification Code
              </span>
              <h2 className="text-2xl font-extrabold text-[#17251D] tracking-tight mt-2">
                Enter the 6-digit code
              </h2>
              <p className="text-sm text-[#526359] mt-1">
                Sent to <strong className="text-[#17251D]">+91 {mobile || '9876543210'}</strong>
              </p>
            </div>

            {/* 6 Digit OTP inputs */}
            <div className="space-y-2">
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-11 sm:w-12 h-13 text-center text-lg sm:text-xl font-bold text-[#17251D] rounded-xl border border-[#DCE8E0] focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 bg-[#F8FAF7] outline-none transition-all"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-xs text-[#D9383A] font-medium pt-1 text-center">{errorMsg}</p>
              )}

              {/* Simulation hint */}
              <div className="p-2 bg-[#E8F2EA]/70 rounded-lg text-center text-[11px] text-[#176B45] font-medium">
                Prototype Demo: Enter any 6 digits (e.g. 1 2 3 4 5 6)
              </div>
            </div>

            {/* Resend Timer */}
            <div className="flex items-center justify-between text-xs text-[#526359] pt-2 min-h-[44px]">
              {timer > 0 ? (
                <span className="flex items-center">Resend OTP in <strong className="ml-1">{timer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimer(30)}
                  className="text-[#176B45] font-semibold flex items-center gap-1 hover:underline cursor-pointer min-h-[44px] py-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP via SMS</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setStepStage('enter-mobile')}
                className="text-[#176B45] font-semibold hover:underline cursor-pointer min-h-[44px] py-1 flex items-center"
              >
                Change number
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 border-t border-[#F2F8F4] space-y-2">
        {stepStage === 'enter-mobile' ? (
          <button
            onClick={handleMobileSubmit}
            className="w-full min-h-[50px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Send OTP</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            className="w-full min-h-[50px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Verify & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        <p className="text-[11px] text-center text-[#758A7E]">
          Protected by secure encryption protocols
        </p>
      </div>
    </div>
  );
};

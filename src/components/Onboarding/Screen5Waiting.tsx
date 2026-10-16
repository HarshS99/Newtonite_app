import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, Home, Mail, MessageSquare, Sparkles, X } from 'lucide-react';
import { SproutMascot } from '../Mascot/SproutMascot';
import { ProgressBar } from '../Common/ProgressBar';

interface Screen5WaitingProps {
  onBackToHome: () => void;
  onBackToKYC: () => void;
}

export const Screen5Waiting: React.FC<Screen5WaitingProps> = ({
  onBackToHome,
  onBackToKYC,
}) => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [simulatedApproved, setSimulatedApproved] = useState(false);

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-[680px] bg-white rounded-3xl sm:border border-[#DCE8E0] sm:shadow-lg flex flex-col justify-between p-5 sm:p-6 relative">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToKYC}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#4B5E53] hover:bg-[#F2F8F4] active:scale-95 transition-all cursor-pointer"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="font-bold text-sm text-[#17251D]">Sprout 2.0</span>

          <button
            onClick={() => setShowSupportModal(true)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#176B45] hover:bg-[#F2F8F4] cursor-pointer"
            aria-label="Need Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Step 5 of 5) */}
        <ProgressBar
          currentStep={5}
          totalSteps={5}
          stepName={simulatedApproved ? 'Account Approved' : 'Review in Progress'}
          className="mb-4"
        />

        {/* Centerpiece: Mascot in 'waiting' state (or 'celebration' if simulatedApproved) */}
        <div className="flex flex-col items-center justify-center my-4">
          <SproutMascot
            state={simulatedApproved ? 'celebration' : 'waiting'}
            size={135}
          />

          {/* Status Badge */}
          <div className="mt-3">
            {simulatedApproved ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2EA] text-[#176B45] text-xs font-bold border border-[#CFE1D6]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Demo: KYC Approved State</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4EE] text-[#176B45] text-xs font-bold border border-[#D5E5DB] animate-pulse">
                <Clock className="w-4 h-4" />
                <span>Verification in progress</span>
              </span>
            )}
          </div>
        </div>

        {/* Headings */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-extrabold text-[#17251D] tracking-tight">
            {simulatedApproved ? (
              <span>Your account is ready to invest!</span>
            ) : (
              <span>Your details are being reviewed</span>
            )}
          </h2>
          <p className="text-[16px] text-[#526359] leading-relaxed max-w-xs mx-auto">
            {simulatedApproved ? (
              <span>Congratulations! You can now make your first ₹100 investment securely.</span>
            ) : (
              <span>You can leave this screen. We'll let you know when there's an update.</span>
            )}
          </p>
        </div>

        {/* Reassurance Information Box */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#DCE8E0] space-y-2 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-[#17251D]">
            <span className="w-2 h-2 rounded-full bg-[#176B45]" />
            <span>What happens next?</span>
          </div>
          <p className="text-xs text-[#526359] leading-relaxed">
            {simulatedApproved
              ? 'Your KYC documents matched successfully. You are officially verified to invest.'
              : 'Our automated system is cross-checking your PAN and Aadhaar against official registries. Timing can vary. We will notify you via SMS when the status changes.'}
          </p>
        </div>

        {/* Interactive Prototype Toggle Button for Reviewers */}
        <div className="mt-3 text-center space-y-1">
          <button
            type="button"
            onClick={() => setSimulatedApproved(!simulatedApproved)}
            className="text-[11px] font-semibold text-[#176B45] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>
              {simulatedApproved ? '[Demo] Show Pending State' : '[Demo] Simulate Approval State'}
            </span>
          </button>
          <p className="text-[10px] text-[#8AA294]">Prototype-only toggle — no real verification occurs</p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[#F2F8F4] space-y-2.5">
        <button
          onClick={onBackToHome}
          className="w-full min-h-[50px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>{simulatedApproved ? 'Explore Investments' : 'Back to home'}</span>
        </button>

        <button
          onClick={() => setShowSupportModal(true)}
          className="w-full min-h-[44px] text-xs font-semibold text-[#5A6D62] hover:text-[#17251D] transition-colors py-2 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Need help with verification?</span>
        </button>
      </div>

      {/* Support / Help Modal */}
      {showSupportModal && (
        <div className="absolute inset-0 z-50 bg-[#17251D]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full bg-white rounded-2xl p-5 border border-[#DCE8E0] shadow-xl text-left space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#17251D]">Verification Support</h3>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#55695D] hover:bg-[#F2F8F4] cursor-pointer"
                aria-label="Close help modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#526359] leading-relaxed">
              Verification times depend on official UIDAI and DigiLocker registry response speeds. While automated checks often complete promptly, high traffic may extend review times. Our support team is here to help with any inquiries.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F8FAF7] border border-[#E2ECE5] flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#176B45]" />
                <span className="text-[#17251D] font-medium">support@sproutapp.in</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F8FAF7] border border-[#E2ECE5] flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#176B45]" />
                <span className="text-[#17251D] font-medium">Live Chat: Mon–Sat 9AM–7PM</span>
              </div>
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full min-h-[44px] bg-[#176B45] text-white text-xs font-bold rounded-xl py-2 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

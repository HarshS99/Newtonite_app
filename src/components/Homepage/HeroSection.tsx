import React from 'react';
import { ArrowRight, ShieldCheck, IndianRupee, Sparkles } from 'lucide-react';
import { SproutMascot } from '../Mascot/SproutMascot';
import { RiskDisclaimer } from '../Common/RiskDisclaimer';

interface HeroSectionProps {
  onGetStarted: () => void;
  isMobile?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onGetStarted,
  isMobile = false,
}) => {
  return (
    <section className="relative w-full pt-3 pb-10 sm:pt-6 sm:pb-16 overflow-hidden">
      {/* 1. Above-The-Fold Regulatory Risk Disclaimer (Visible immediately without scroll) */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-4 sm:mb-6">
        <RiskDisclaimer variant="card" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {isMobile ? (
          /* Mobile Stacked Layout (Headline -> Supporting -> CTAs -> Trust Badges -> Mascot Card Below) */
          <div className="flex flex-col items-start text-left space-y-4 w-full">
            {/* Value Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2EA] border border-[#CFE1D6] text-xs font-semibold text-[#176B45]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Micro-investing made simple for India</span>
            </div>

            {/* Hero Headline: Responsive 36-40px font size with natural wrapping */}
            <h1 className="text-[34px] sm:text-[38px] font-extrabold text-[#17251D] tracking-tight leading-[1.18] w-full">
              Your investing journey <br />
              <span className="text-[#176B45]">starts small.</span>
            </h1>

            {/* Supporting Copy (Minimum 16px body text) */}
            <p className="text-[16px] text-[#46594E] leading-relaxed w-full">
              Start exploring investments from <strong className="text-[#17251D] font-bold">₹100</strong>. Learn as you grow, at your own pace, with transparent information and clear fee disclosures.
            </p>

            {/* Call To Action Buttons (Cleanly stacked, min 44x44px touch targets) */}
            <div className="w-full pt-1 flex flex-col gap-2.5">
              <button
                onClick={onGetStarted}
                id="hero-primary-cta-mobile"
                className="w-full min-h-[48px] px-5 py-3 bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Started with ₹100</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#how-it-works"
                className="w-full min-h-[44px] px-4 py-2.5 border border-[#D5E2D9] hover:bg-[#E8F2EA]/50 text-[#25392D] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center text-center"
              >
                See How It Works (3 Steps)
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="w-full pt-3 grid grid-cols-3 gap-2 text-center text-xs text-[#4B5E53] border-t border-[#E2ECE5]">
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#176B45]">
                  <IndianRupee className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] leading-tight">From ₹100</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#176B45]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] leading-tight">Regulated</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#176B45]">
                  ✓
                </div>
                <span className="text-[11px] leading-tight">Digital KYC</span>
              </div>
            </div>

            {/* Mascot Card Below Hero Content */}
            <div className="w-full max-w-[340px] mx-auto mt-4 bg-white rounded-2xl p-5 border border-[#DCE8E0] shadow-2xs text-center">
              <div className="flex justify-center -mt-2 mb-2">
                <SproutMascot state="welcome" size={105} />
              </div>

              <div className="space-y-1.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8F2EA] text-[#176B45] text-[11px] font-semibold">
                  Meet Sprout — Your Guide
                </div>
                <h3 className="font-bold text-base text-[#17251D]">
                  Investing doesn't have to be intimidating.
                </h3>
                <p className="text-xs text-[#526359] leading-relaxed">
                  We break down complex financial jargon into simple, honest steps so you stay completely in control.
                </p>
              </div>

              {/* Micro interactive card inside hero */}
              <div className="mt-4 p-3 rounded-xl bg-[#F8FAF7] border border-[#E4EFE8] flex items-center justify-between">
                <div className="text-left">
                  <span className="block text-[10px] font-medium text-[#65796D] uppercase tracking-wide">
                    Minimum First Step
                  </span>
                  <span className="text-lg font-extrabold text-[#176B45]">
                    ₹100
                  </span>
                </div>
                <button
                  onClick={onGetStarted}
                  className="min-h-[44px] px-4 py-2 bg-[#176B45] hover:bg-[#115335] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Preserved 2-Column Layout (7 cols Left, 5 cols Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 text-left space-y-5">
              {/* Value Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F2EA] border border-[#CFE1D6] text-xs font-semibold text-[#176B45]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Micro-investing made simple for India</span>
              </div>

              {/* Hero Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17251D] tracking-tight leading-[1.18]">
                Your investing journey <br className="hidden sm:inline" />
                <span className="text-[#176B45]">starts small.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#46594E] leading-relaxed max-w-xl">
                Start exploring investments from <strong className="text-[#17251D] font-bold">₹100</strong>. Learn as you grow, at your own pace, with transparent information and clear fee disclosures.
              </p>

              {/* Call To Action Buttons (Min 44x44px touch targets) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onGetStarted}
                  id="hero-primary-cta"
                  className="min-h-[50px] px-7 py-3.5 bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Get Started with ₹100</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#how-it-works"
                  className="min-h-[48px] px-5 py-3 border border-[#D5E2D9] hover:bg-[#E8F2EA]/50 text-[#25392D] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center text-center"
                >
                  See How It Works (3 Steps)
                </a>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#4B5E53] border-t border-[#E2ECE5]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#176B45]">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                  <span>Start from just ₹100</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#176B45]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Regulated framework</span>
                </div>

                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <div className="w-6 h-6 rounded-full bg-[#E8F2EA] flex items-center justify-center text-[#176B45]">
                    ✓
                  </div>
                  <span>Digital verification</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sprout 2.0 Mascot & Interactive Visual Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-[340px] sm:max-w-[380px] bg-white rounded-2xl p-6 border border-[#DCE8E0] shadow-sm relative">
                {/* Sprout Mascot in 'Welcome' State */}
                <div className="flex justify-center -mt-4 mb-3">
                  <SproutMascot state="welcome" size={130} />
                </div>

                <div className="text-center space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8F2EA] text-[#176B45] text-xs font-semibold">
                    Meet Sprout — Your Friendly Guide
                  </div>
                  <h3 className="font-bold text-lg text-[#17251D]">
                    Investing doesn't have to be intimidating.
                  </h3>
                  <p className="text-xs text-[#526359] leading-relaxed">
                    We break down complex financial jargon into simple, honest steps so you stay completely in control.
                  </p>
                </div>

                {/* Micro interactive card inside hero */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E4EFE8] flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-medium text-[#65796D] uppercase tracking-wide">
                      Minimum First Step
                    </span>
                    <span className="text-xl font-extrabold text-[#176B45]">
                      ₹100
                    </span>
                  </div>
                  <button
                    onClick={onGetStarted}
                    className="min-h-[44px] px-3.5 py-2 bg-[#176B45] hover:bg-[#115335] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Try Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

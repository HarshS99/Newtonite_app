import React from 'react';
import { UserCheck, FileText, TrendingUp, ArrowRight } from 'lucide-react';

interface ThreeStepSectionProps {
  onStartStep: (stepNumber: number) => void;
  isMobile?: boolean;
}

export const ThreeStepSection: React.FC<ThreeStepSectionProps> = ({ 
  onStartStep,
  isMobile = false,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Create your account',
      desc: 'Enter your mobile number and confirm with a 6-digit one-time password (OTP).',
      icon: UserCheck,
      highlight: 'Simple signup',
    },
    {
      step: '02',
      title: 'Complete verification',
      desc: 'Verify your PAN and Aadhaar details electronically using standard DigiLocker authentication.',
      icon: FileText,
      highlight: 'Identity check',
    },
    {
      step: '03',
      title: 'Explore your first investment',
      desc: 'Pick your first fund and start with as little as ₹100. Learn how markets work without high commitments.',
      icon: TrendingUp,
      highlight: 'From ₹100 only',
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 sm:py-16 bg-white border-y border-[#E2ECE5] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#176B45] tracking-widest uppercase bg-[#E8F2EA] px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251D] mt-3 tracking-tight">
            How Sprout 2.0 works for you
          </h2>
          <p className="text-sm sm:text-base text-[#526359] mt-2">
            No endless paperwork. No confusing investment lingo. Just clear, honest progression.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className={`grid gap-5 relative ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#F8FAF7] border border-[#DCE8E0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#176B45]/40 transition-all hover:shadow-sm relative group"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#E8F2EA] text-[#176B45] font-extrabold text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-semibold text-[#176B45] bg-white border border-[#DCE8E0] px-2.5 py-0.5 rounded-full">
                    {item.highlight}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#176B45]/10 flex items-center justify-center text-[#176B45] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-[#17251D]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#526359] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Sub Action */}
                <button
                  onClick={() => onStartStep(index + 1)}
                  className="w-full min-h-[44px] py-2 px-3 border border-[#D5E2D9] group-hover:bg-[#176B45] group-hover:text-white group-hover:border-[#176B45] rounded-xl text-xs font-semibold text-[#293B30] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Experience Step {index + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

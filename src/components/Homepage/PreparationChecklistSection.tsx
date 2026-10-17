import React from 'react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { SproutMascot } from '../Mascot/SproutMascot';

interface PreparationChecklistSectionProps {
  onStartOnboarding: () => void;
  isMobile?: boolean;
}

export const PreparationChecklistSection: React.FC<PreparationChecklistSectionProps> = ({
  onStartOnboarding,
  isMobile = false,
}) => {
  const checklist = [
    {
      title: 'PAN Card Details',
      desc: 'Required under Indian tax and financial compliance laws for all investment accounts.',
      tag: 'Permanent Account Number',
    },
    {
      title: 'Aadhaar Card',
      desc: 'Used for electronic identity and address authentication via DigiLocker.',
      tag: 'Identity Verification',
    },
    {
      title: 'Mobile Linked to Aadhaar',
      desc: 'Needed to receive the official UIDAI one-time passcode (OTP) for electronic KYC verification.',
      tag: 'Active SIM Required',
    },
  ];

  return (
    <section id="documents" className="w-full py-10 sm:py-16 bg-[#F8FAF7] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid gap-6 items-center ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
          {/* Column 1: Mascot in 'Explaining' state & Reassurance Note */}
          <div className={`flex flex-col items-center text-center bg-white border border-[#DCE8E0] rounded-2xl p-5 sm:p-6 shadow-2xs ${isMobile ? 'w-full' : 'lg:col-span-5'}`}>
            <SproutMascot state="explaining" size={115} />
            <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider mt-2 bg-[#E8F2EA] px-2.5 py-1 rounded-full">
              Preparation Guide
            </span>
            <h3 className="font-extrabold text-lg sm:text-xl text-[#17251D] mt-2">
              Keep these ready for a smooth start
            </h3>
            <p className="text-xs text-[#526359] mt-1.5 leading-relaxed max-w-sm">
              Having these 3 items handy saves you from having to restart your registration later.
            </p>

            {/* Time Expectation Box */}
            <div className="w-full mt-4 p-3 rounded-xl bg-[#F2F8F4] border border-[#CFE1D6] flex items-center gap-3 text-left">
              <Clock className="w-5 h-5 text-[#176B45] shrink-0" />
              <div className="text-xs text-[#294233]">
                <strong className="block text-[#17251D]">Allow around 5 minutes</strong>
                <span>Verification may take longer depending on government database response times.</span>
              </div>
            </div>
          </div>

          {/* Column 2: 3 Checklist items */}
          <div className={`space-y-3.5 ${isMobile ? 'w-full' : 'lg:col-span-7'}`}>
            <div className="space-y-1 mb-2">
              <span className="text-xs font-bold text-[#176B45] uppercase tracking-wide">
                Requirements Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251D] tracking-tight">
                What you need before you begin
              </h2>
              <p className="text-sm text-[#526359]">
                In compliance with regulations, every Indian investor needs to complete a basic KYC identity check.
              </p>
            </div>

            <div className="space-y-3">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#DCE8E0] rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#176B45]/40 transition-colors shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-full bg-[#E8F2EA] text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-base text-[#17251D]">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-medium text-[#176B45] bg-[#E8F2EA] px-2 py-0.5 rounded-full w-fit">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#526359] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy note & Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#526359]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#176B45]" />
                <span>Your documents are encrypted and never shared with third parties.</span>
              </div>

              <button
                onClick={onStartOnboarding}
                className="min-h-[44px] px-5 py-2.5 bg-[#176B45] hover:bg-[#115335] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center"
              >
                I have these ready →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

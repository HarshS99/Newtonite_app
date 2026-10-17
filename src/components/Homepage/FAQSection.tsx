import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can I really start investing with only ₹100?',
      a: 'Yes! Several mutual fund schemes allow starting a Systematic Investment Plan (SIP) or lump sum from ₹100. Units are allocated based on the scheme Net Asset Value (NAV) corresponding to your invested amount.',
    },
    {
      q: 'Why are PAN and Aadhaar cards mandatory for verification?',
      a: 'Under Indian regulations, Know Your Customer (KYC) identity verification is legally required for all financial investments. This ensures regulatory compliance and verifies that all investment accounts are correctly associated with your legal identity.',
    },
    {
      q: 'Are returns guaranteed or risk-free?',
      a: 'No. Mutual fund and capital market investments are subject to market risks and returns are never guaranteed. Values may fluctuate based on market movements. You should always choose investment options that align with your financial goals and risk tolerance.',
    },
    {
      q: 'How long does the KYC verification process take?',
      a: 'Electronic verification via Aadhaar OTP often completes in around 5 minutes when government servers respond promptly. In cases requiring manual back-office audit or during server delays, verification may take longer, typically up to 24–48 hours.',
    },
    {
      q: 'Can I withdraw my money whenever I need it?',
      a: 'Yes, for all open-ended funds without a lock-in period, you can redeem your investment anytime directly to your verified bank account. Standard settlement takes 1 to 3 business days as per banking clearing cycles.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-12 sm:py-16 bg-[#F8FAF7] border-t border-[#E2ECE5] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#176B45] tracking-widest uppercase bg-[#E8F2EA] px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251D] mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#526359] mt-2">
            Clear, honest answers about investing with Sprout 2.0.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#DCE8E0] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full min-h-[48px] px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#17251D] hover:text-[#176B45] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#176B45] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#526359] leading-relaxed border-t border-[#F2F8F4]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

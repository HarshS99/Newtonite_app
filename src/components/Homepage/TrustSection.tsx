import React from 'react';
import { Lock, FileCheck, Eye, Layers } from 'lucide-react';

interface TrustSectionProps {
  isMobile?: boolean;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ isMobile = false }) => {
  const trustPoints = [
    {
      icon: Lock,
      title: 'Secure Data Transmission',
      desc: 'All communications are protected using modern transport layer security (HTTPS/TLS) to safeguard your personal information.',
    },
    {
      icon: FileCheck,
      title: 'Direct Investor Holding',
      desc: 'Investment applications are routed to authorized Asset Management Companies where mutual fund units are held directly under your name and PAN.',
    },
    {
      icon: Eye,
      title: 'Clear Fee Disclosures',
      desc: 'All scheme expense ratios and platform terms are stated clearly upfront with no undisclosed charges.',
    },
    {
      icon: Layers,
      title: 'Regular Portfolio Visibility',
      desc: 'Track your investments with daily Net Asset Value (NAV) updates and downloadable periodic account statements.',
    },
  ];

  return (
    <section id="trust" className="w-full py-10 sm:py-16 bg-white border-t border-[#E2ECE5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold text-[#176B45] tracking-widest uppercase bg-[#E8F2EA] px-3 py-1 rounded-full">
            Trust & Security
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251D] mt-3 tracking-tight">
            Built with transparency at every step
          </h2>
          <p className="text-sm sm:text-base text-[#526359] mt-2">
            We operate within the official Indian financial regulatory framework so your money and data remain in authorized hands.
          </p>
        </div>

        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
          {trustPoints.map((tp, i) => {
            const Icon = tp.icon;
            return (
              <div
                key={i}
                className="bg-[#F8FAF7] border border-[#DCE8E0] rounded-2xl p-5 flex flex-col justify-between hover:border-[#176B45]/50 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#E8F2EA] text-[#176B45] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#17251D] mb-1.5">
                    {tp.title}
                  </h3>
                  <p className="text-xs text-[#526359] leading-relaxed">
                    {tp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

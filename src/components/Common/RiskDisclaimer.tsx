import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RiskDisclaimerProps {
  className?: string;
  variant?: 'banner' | 'card' | 'inline';
}

export const RiskDisclaimer: React.FC<RiskDisclaimerProps> = ({
  className = '',
  variant = 'banner',
}) => {
  if (variant === 'card') {
    return (
      <aside 
        aria-label="Statutory risk disclaimer"
        className={`bg-[#F2F8F4] border border-[#CFE1D6] rounded-xl p-3.5 text-left text-[12px] sm:text-[13px] leading-relaxed text-[#2F4A39] flex items-start gap-2.5 ${className}`}
        style={{ fontSize: '12px' }}
      >
        <AlertCircle className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <span className="font-semibold text-[#17251D] block mb-0.5">Statutory Risk Disclaimer:</span>
          <span>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</span>
        </div>
      </aside>
    );
  }

  return (
    <div 
      role="region"
      aria-label="Regulatory disclosure"
      className={`w-full bg-[#EBF4EE] border-b border-[#D7E6DC] py-2 px-3 sm:px-4 text-[12px] sm:text-[13px] leading-tight text-[#284534] flex items-center justify-center text-center gap-1.5 font-medium ${className}`}
    >
      <AlertCircle className="w-3.5 h-3.5 text-[#176B45] shrink-0" aria-hidden="true" />
      <span>
        <strong>Market Risk Notice:</strong> Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.
      </span>
    </div>
  );
};

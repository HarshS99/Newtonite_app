import React from 'react';
import { smoothScrollToSection } from '../../utils/scroll';

interface FooterProps {
  isMobile?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isMobile = false }) => {
  return (
    <footer className="w-full bg-[#122218] text-[#D1DFD7] py-10 sm:py-12 border-t border-[#1F3A29]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid gap-6 mb-8 pb-8 border-b border-[#244230] ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
          {/* Brand Col */}
          <div className={`space-y-3 ${isMobile ? 'w-full' : 'md:col-span-5'}`}>
            <div 
              onClick={() => smoothScrollToSection('top', { duration: 400, offset: 0 })}
              className="flex items-center gap-2 cursor-pointer group w-fit"
              role="button"
              tabIndex={0}
              aria-label="Back to top"
            >
              <div className="w-8 h-8 rounded-lg bg-[#176B45] group-hover:bg-[#115335] transition-colors flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22V13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M12 16C12 11 7 10 6 13C6 17 11 17 12 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M12 13C12 8 17 7 18 10C18 14 13 14 12 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-extrabold text-lg text-white group-hover:text-[#44B77F] transition-colors">Sprout 2.0</span>
            </div>
            <p className="text-xs text-[#9BB5A7] leading-relaxed max-w-sm">
              Empowering first-time investors in India to start micro-investing from ₹100. Built for low-bandwidth mobile environments with complete regulatory transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-1.5 text-xs text-[#9BB5A7]">
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('how-it-works', { duration: 400, offset: 72 });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#documents" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('documents', { duration: 400, offset: 72 });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  KYC Checklist
                </a>
              </li>
              <li>
                <a 
                  href="#trust" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('trust', { duration: 400, offset: 72 });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Security & Trust
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-1.5 text-xs text-[#9BB5A7]">
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('faq', { duration: 400, offset: 72 });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help Center / FAQ
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Help & Guidance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-1.5 text-xs text-[#9BB5A7]">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Statutory Risk Disclosures</a></li>
            </ul>
          </div>
        </div>

        {/* Mandatory Regulatory Risk Disclaimer in Footer */}
        <div className="text-[12px] leading-relaxed text-[#8AA798] space-y-2">
          <p>
            <strong>Statutory Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Past performance does not indicate future results. No returns or capital preservation are guaranteed. This interface represents an evaluation UI/UX design prototype.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#718D7F] pt-4 border-t border-[#1C3626]">
            <span>© 2026 Sprout 2.0 • Designed by Harsh Singh.</span>
            <span>Created for Newtonite UI/UX Design Assignment Evaluation.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

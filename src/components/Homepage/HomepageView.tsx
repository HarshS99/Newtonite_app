import React, { useEffect } from 'react';
import { Navbar } from '../Common/Navbar';
import { HeroSection } from './HeroSection';
import { ThreeStepSection } from './ThreeStepSection';
import { PreparationChecklistSection } from './PreparationChecklistSection';
import { TrustSection } from './TrustSection';
import { FAQSection } from './FAQSection';
import { Footer } from './Footer';
import { smoothScrollToSection } from '../../utils/scroll';

interface HomepageViewProps {
  onStartOnboarding: () => void;
  onOpenStep: (stepNumber: number) => void;
  isMobile?: boolean;
}

export const HomepageView: React.FC<HomepageViewProps> = ({
  onStartOnboarding,
  onOpenStep,
  isMobile = false,
}) => {
  // If user navigated directly to a hash anchor, smoothly scroll to it immediately
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      smoothScrollToSection(window.location.hash);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8FAF7]">
      <Navbar onStartInvesting={onStartOnboarding} isMobile={isMobile} />

      <main className="flex-1 w-full">
        <HeroSection onGetStarted={onStartOnboarding} isMobile={isMobile} />
        <ThreeStepSection onStartStep={onOpenStep} isMobile={isMobile} />
        <PreparationChecklistSection onStartOnboarding={onStartOnboarding} isMobile={isMobile} />
        <TrustSection isMobile={isMobile} />
        <FAQSection />
      </main>

      <Footer isMobile={isMobile} />
    </div>
  );
};

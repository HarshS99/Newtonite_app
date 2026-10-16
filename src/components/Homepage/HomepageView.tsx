import React from 'react';
import { Navbar } from '../Common/Navbar';
import { HeroSection } from './HeroSection';
import { ThreeStepSection } from './ThreeStepSection';
import { PreparationChecklistSection } from './PreparationChecklistSection';
import { TrustSection } from './TrustSection';
import { FAQSection } from './FAQSection';
import { Footer } from './Footer';

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
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8FAF7] overflow-x-hidden">
      <Navbar onStartInvesting={onStartOnboarding} isMobile={isMobile} />

      <main className="flex-1 w-full overflow-x-hidden">
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

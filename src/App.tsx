import { useState } from 'react';
import type { ScreenType, ViewMode, Language } from './types';
import { PrototypeBar } from './components/PrototypeController/PrototypeBar';
import { HomepageView } from './components/Homepage/HomepageView';
import { Screen1Welcome } from './components/Onboarding/Screen1Welcome';
import { Screen2Preparation } from './components/Onboarding/Screen2Preparation';
import { Screen3MobileOtp } from './components/Onboarding/Screen3MobileOtp';
import { Screen4KYC } from './components/Onboarding/Screen4KYC';
import { Screen5Waiting } from './components/Onboarding/Screen5Waiting';
import { DesignSystemView } from './components/DesignSystem/DesignSystemView';
import { CaseStudyView } from './components/CaseStudy/CaseStudyView';
import { SproutChatbot } from './components/Chatbot/SproutChatbot';
import { useIsMobile } from './hooks/useIsMobile';
import { Wifi, Battery, Signal } from 'lucide-react';
import './App.css';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');
  const isWindowMobile = useIsMobile(768);

  // User onboarding state
  const [language, setLanguage] = useState<Language>('en');
  const [mobile, setMobile] = useState('9876543210');
  const [pan, setPan] = useState('');
  const [aadhaarConsent, setAadhaarConsent] = useState(true);

  // Render the currently selected screen
  const renderScreen = (isMobileMode = false) => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomepageView
            isMobile={isMobileMode}
            onStartOnboarding={() => setCurrentScreen('onboarding-1')}
            onOpenStep={(stepNum) => {
              if (stepNum === 1) setCurrentScreen('onboarding-1');
              if (stepNum === 2) setCurrentScreen('onboarding-4');
              if (stepNum === 3) setCurrentScreen('onboarding-5');
            }}
          />
        );

      case 'onboarding-1':
        return (
          <div className="py-3 sm:py-8 px-2 sm:px-4 flex items-start sm:items-center justify-center w-full min-h-full">
            <Screen1Welcome
              selectedLanguage={language}
              onSelectLanguage={setLanguage}
              onNext={() => setCurrentScreen('onboarding-2')}
              onBack={() => setCurrentScreen('home')}
            />
          </div>
        );

      case 'onboarding-2':
        return (
          <div className="py-3 sm:py-8 px-2 sm:px-4 flex items-start sm:items-center justify-center w-full min-h-full">
            <Screen2Preparation
              onNext={() => setCurrentScreen('onboarding-3')}
              onBack={() => setCurrentScreen('onboarding-1')}
              onLater={() => setCurrentScreen('home')}
            />
          </div>
        );

      case 'onboarding-3':
        return (
          <div className="py-3 sm:py-8 px-2 sm:px-4 flex items-start sm:items-center justify-center w-full min-h-full">
            <Screen3MobileOtp
              mobile={mobile}
              onMobileChange={setMobile}
              onNext={() => setCurrentScreen('onboarding-4')}
              onBack={() => setCurrentScreen('onboarding-2')}
            />
          </div>
        );

      case 'onboarding-4':
        return (
          <div className="py-3 sm:py-8 px-2 sm:px-4 flex items-start sm:items-center justify-center w-full min-h-full">
            <Screen4KYC
              pan={pan}
              onPanChange={setPan}
              aadhaarConsent={aadhaarConsent}
              onToggleAadhaarConsent={setAadhaarConsent}
              onNext={() => setCurrentScreen('onboarding-5')}
              onBack={() => setCurrentScreen('onboarding-3')}
            />
          </div>
        );

      case 'onboarding-5':
        return (
          <div className="py-3 sm:py-8 px-2 sm:px-4 flex items-start sm:items-center justify-center w-full min-h-full">
            <Screen5Waiting
              onBackToHome={() => setCurrentScreen('home')}
              onBackToKYC={() => setCurrentScreen('onboarding-4')}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#17251D] flex flex-col font-sans overflow-x-hidden">
      {/* 1. Global Prototype Navigation & Testing Bar */}
      <PrototypeBar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
      />

      {/* 2. Main Content Views */}
      <main className="flex-1 w-full flex flex-col items-center overflow-x-hidden">
        {/* Tab 1: Design System & Mascot View */}
        {viewMode === 'design-system' && <DesignSystemView />}

        {/* Tab 2: 12-Page UX Case Study View */}
        {viewMode === 'case-study' && <CaseStudyView />}

        {/* Tab 3: Responsive View */}
        {viewMode === 'responsive' && (
          <div className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
            {renderScreen(isWindowMobile)}
          </div>
        )}

        {/* Tab 4: 390px Mobile Frame Simulator (for screenshots & Figma testing) */}
        {viewMode === 'mobile-390' && (
          <div className="pt-3 pb-8 px-2 flex flex-col items-center w-full max-w-full overflow-x-hidden">
            <p className="text-center mb-3 text-[11px] text-[#526359]">
              <span className="font-bold text-[#176B45]">Mobile Device Frame</span> • 390 × 844 px
            </p>

            {/* Simulated Phone Chassis — fixed 390px wide, border outside via box-shadow */}
            <div
              className="relative mx-auto bg-[#F8FAF7] flex flex-col overflow-hidden"
              style={{
                width: '390px',
                minHeight: '844px',
                borderRadius: '44px',
                border: '10px solid #1C2C22',
                boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              }}
            >
              {/* Phone Status Bar */}
              <div className="w-full h-11 bg-white px-5 flex items-center justify-between text-xs font-semibold text-[#17251D] shrink-0 border-b border-[#F0F5F2] select-none">
                <span>9:41</span>
                <div className="w-24 h-4 bg-[#1C2C22] rounded-full" />
                <div className="flex items-center gap-1.5 text-[#17251D]">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {renderScreen(true)}
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-full h-7 bg-white flex items-center justify-center shrink-0 border-t border-[#F0F5F2]">
                <div className="w-32 h-1 bg-[#1C2C22] rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: 1440px Desktop Frame Simulator */}
        {viewMode === 'desktop-1440' && (
          <div className="py-8 px-4 flex flex-col items-center justify-center w-full max-w-[1440px]">
            <div className="text-center mb-3 text-xs text-[#526359]">
              <span className="font-bold text-[#176B45]">Desktop Viewport Frame</span> • 1440 px Width Target
            </div>

            {/* Browser Chassis */}
            <div className="w-full bg-white rounded-2xl border border-[#DCE8E0] shadow-xl overflow-hidden flex flex-col">
              {/* Browser Header Bar */}
              <div className="w-full bg-[#EBF2ED] px-4 py-2.5 flex items-center gap-3 border-b border-[#D7E3DA]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 max-w-md mx-auto bg-white rounded-lg px-3 py-1 text-xs text-center font-mono text-[#526359] border border-[#DCE8E0]">
                  https://app.sproutinvest.in
                </div>
              </div>

              {/* Screen Content */}
              <div className="w-full min-h-[800px] overflow-x-hidden bg-[#F8FAF7]">
                {renderScreen(false)}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Sprout AI RAG Assistant with Groq */}
      <SproutChatbot />
    </div>
  );
}

export default App;

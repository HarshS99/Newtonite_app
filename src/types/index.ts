export type ScreenType = 
  | 'home'
  | 'onboarding-1'
  | 'onboarding-2'
  | 'onboarding-3'
  | 'onboarding-4'
  | 'onboarding-5';

export type ViewMode = 
  | 'responsive'
  | 'mobile-390'
  | 'desktop-1440'
  | 'design-system'
  | 'case-study';

export type MascotState = 'welcome' | 'explaining' | 'waiting' | 'celebration';

export type Language = 'en' | 'hi';

export interface OnboardingData {
  language: Language;
  mobile: string;
  otp: string;
  pan: string;
  aadhaarLinked: boolean;
  status: 'pending' | 'reviewing' | 'verified';
}

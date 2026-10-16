export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'kyc' | 'investment' | 'compliance' | 'app' | 'security';
  keywords: string[];
  content: string;
  sourceUrl?: string;
}

export const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: 'kyc-pan-requirement',
    title: 'Why PAN Card is Mandatory for Mutual Funds',
    category: 'kyc',
    keywords: ['pan', 'tax', 'identity', 'sebi', 'mandatory', 'document', 'card', 'why pan', 'requirement'],
    content: `Under SEBI (Securities and Exchange Board of India) and Prevention of Money Laundering Act (PMLA) regulations, a Permanent Account Number (PAN) is strictly mandatory for all mutual fund investments in India.
Key Points:
- Identity Verification: PAN ensures all mutual fund investments and folio numbers are legally registered under your verified identity.
- Tax Reporting: Facilitates compliant tax computation (Capital Gains Tax) and links your investment gains to your official Income Tax profile.
- Single Folio Tracking: Prevents duplicate investment folios across multiple Asset Management Companies (AMCs).
- Strict Format: Indian PAN format consists of 10 alphanumeric characters: 5 uppercase letters, followed by 4 numeric digits, and 1 uppercase letter (e.g., ABCDE1234F).`,
  },
  {
    id: 'kyc-aadhaar-digilocker',
    title: 'DigiLocker & Electronic Aadhaar Verification',
    category: 'kyc',
    keywords: ['aadhaar', 'digilocker', 'uidai', 'otp', 'electronic', 'paperless', 'address', 'consent'],
    content: `Sprout 2.0 uses Government of India authorized DigiLocker and UIDAI electronic gateways for instant KYC verification.
Key Points:
- No Physical Paperwork: Your verified address and demographic records are fetched electronically with your explicit consent.
- Secure OTP Authentication: The one-time password (OTP) is sent directly to the mobile number linked to your Aadhaar card by UIDAI.
- Explicit User Consent: Authorization is strictly limited to retrieving verifiable KYC records for opening your investment account.
- Privacy & Storage: Your Aadhaar number and biometrics are never stored on unverified third-party servers.`,
  },
  {
    id: 'micro-investing-100',
    title: 'Starting Investments with ₹100',
    category: 'investment',
    keywords: ['100', 'ticket size', 'minimum', 'start small', 'sip', 'first time', 'lumpsum', 'rupee'],
    content: `Sprout 2.0 is designed to make micro-investing accessible to every first-time investor in India by setting the minimum entry threshold at ₹100.
Key Points:
- Lower Psychological Barrier: First-time investors can learn market dynamics without risking substantial personal savings.
- Systematic Investment Plans (SIP): Many SEBI-registered mutual fund schemes permit SIP investments starting from ₹100 per installment.
- Allocation of Real Units: When you invest ₹100, the mutual fund AMC allocates mutual fund units based on the prevailing Net Asset Value (NAV). Note that mutual fund units can have fractional quantities based on NAV calculation.
- Discipline Over Amount: Consistency and habit formation are more valuable than large initial capital when beginning an investing journey.`,
  },
  {
    id: 'market-risks-statutory-disclaimer',
    title: 'Statutory Market Risk & No Guaranteed Returns',
    category: 'compliance',
    keywords: ['risk', 'guarantee', 'returns', 'safe', 'loss', 'market risk', 'disclaimer', 'sebi', 'fluctuation'],
    content: `SEBI statutory disclaimer: "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully."
Key Compliance Points:
- Zero Guaranteed Returns: Capital market and mutual fund investments carry risk and returns are never guaranteed or risk-free.
- Market Fluctuations: NAVs rise and fall based on underlying equity and debt asset performance.
- Past Performance: Past performance of any mutual fund scheme does not guarantee or indicate future returns.
- Risk Profiling: Investors must assess their financial goals and risk tolerance before selecting index, equity, or hybrid funds.`,
  },
  {
    id: 'onboarding-flow-steps',
    title: 'Sprout 2.0 5-Step Onboarding Journey',
    category: 'app',
    keywords: ['onboarding', 'steps', 'flow', 'screen', 'how to start', 'welcome', 'stages', 'process'],
    content: `The Sprout 2.0 onboarding flow is broken down into 5 progressive steps:
1. Welcome Screen: Introduces the ₹100 micro-investing principle with language preferences (English default, Hindi support coming soon).
2. Preparation Checklist: Informs users about PAN, Aadhaar, and Aadhaar-linked mobile requirements before starting forms.
3. Mobile & OTP Signup: Verifies phone number with a 6-digit OTP code and a 30-second resend mechanism.
4. Identity Verification (KYC): Collects validated 10-character PAN and legal DigiLocker Aadhaar consent.
5. Verification Waiting State: Reassures the user while automated registry checks take place. Users can safely leave the app while status checks run.`,
  },
  {
    id: 'kyc-waiting-state-timeline',
    title: 'KYC Verification Status & Turnaround Time',
    category: 'kyc',
    keywords: ['waiting', 'time', 'how long', 'pending', 'review', 'approval', 'sms', 'notification'],
    content: `What happens during the verification waiting state:
- Automated Cross-Checking: Systems cross-check submitted PAN and Aadhaar against official DigiLocker and KRA (KYC Registration Agency) databases.
- Realistic Timelines: Most automated verifications complete within a few minutes, but response times depend on government registry traffic and can take longer.
- Safe to Leave: Users do not need to keep the app open. A confirmation SMS is triggered once status updates.
- Support Available: If a verification is delayed or fails to match registry names, support can be reached via support@sproutapp.in or live chat.`,
  },
  {
    id: 'sprout-mascot-guide',
    title: 'Sprout Mascot States and Guidance',
    category: 'app',
    keywords: ['mascot', 'sprout', 'guide', 'character', 'states', 'leaf'],
    content: `Sprout is a minimalist geometric botanical mascot built with pure SVG:
- Welcome State: Waves warmly on the opening screen to provide a friendly, non-intimidating welcome.
- Explaining State: Wears glasses with a pointer to highlight tips, such as keeping an Aadhaar phone nearby.
- Waiting State: Relaxes in a calm meditation posture to reduce user anxiety during the verification waiting phase.
- Celebration State: Waves golden stars when account verification is completed successfully.`,
  },
  {
    id: 'security-data-privacy',
    title: 'Data Security and Privacy Standards',
    category: 'security',
    keywords: ['security', 'privacy', 'encryption', 'safe', 'data', 'credentials', 'confidential'],
    content: `Sprout 2.0 maintains strict data confidentiality standards:
- Encrypted Transmission: All identity and personal verification data is transmitted over secure HTTPS/TLS encrypted connections.
- Minimal Data Retention: Data is used solely for the stated purpose of opening an investment account under SEBI and AMFI guidelines.
- No Unauthorized Third-Party Selling: Personal phone numbers, PAN details, and financial profiles are never sold to external marketing agencies.
- Transparent Permissions: No background location, SMS spying, or contact scraping permissions are requested.`,
  },
];

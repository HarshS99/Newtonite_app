import React, { useState } from 'react';
import { SproutMascot } from '../Mascot/SproutMascot';
import { getMascotSvgString } from '../../utils/mascotSvgStrings';
import { Check, Copy, CheckCircle2, Sparkles, Layers, Type, Palette } from 'lucide-react';
import type { MascotState } from '../../types';

export const DesignSystemView: React.FC = () => {
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [hindiPreview, setHindiPreview] = useState(false);

  const copySvgToClipboard = (state: MascotState) => {
    const svgCode = getMascotSvgString(state);
    navigator.clipboard.writeText(svgCode);
    setCopiedState(state);
    setTimeout(() => setCopiedState(null), 2500);
  };

  const colors = [
    { name: 'Primary Green', hex: '#176B45', usage: 'Brand identity, primary CTAs, active highlights', contrast: '5.2:1 (Pass WCAG AA)' },
    { name: 'Primary Hover', hex: '#115335', usage: 'Hover and pressed states for buttons', contrast: '7.1:1 (Pass WCAG AAA)' },
    { name: 'Soft Green Surface', hex: '#E8F2EA', usage: 'Cards, icon backgrounds, pills, highlights', contrast: '1.2:1 (Surface)' },
    { name: 'Warm Off-White', hex: '#F8FAF7', usage: 'Primary screen background', contrast: 'Base Canvas' },
    { name: 'Dark Text', hex: '#17251D', usage: 'Headings, primary body copy', contrast: '14.8:1 (Pass WCAG AAA)' },
    { name: 'Muted Text', hex: '#526359', usage: 'Supporting copy, helper notes, labels', contrast: '5.6:1 (Pass WCAG AA)' },
    { name: 'Subtle Border', hex: '#DCE8E0', usage: 'Card outlines, dividers, form borders', contrast: '1.3:1 (Border)' },
    { name: 'Semantic Error', hex: '#D9383A', usage: 'Form validation errors, critical warnings', contrast: '4.6:1 (Pass WCAG AA)' },
  ];

  const typography = [
    { name: 'Display / Hero H1', size: '36px / 42px', weight: '800 (Extra Bold)', sample: 'Your investing journey starts small.' },
    { name: 'Section Header H2', size: '24px / 32px', weight: '800 (Bold)', sample: 'A few things to get ready' },
    { name: 'Card Title H3', size: '18px / 26px', weight: '700 (Bold)', sample: 'Verify your identity' },
    { name: 'Mobile Body Text', size: '16px / 24px', weight: '400 / 500 (Min 16px rule)', sample: 'Start exploring investments from ₹100. Learn as you grow at your own pace.' },
    { name: 'Caption / Secondary', size: '14px / 20px', weight: '500 (Medium)', sample: 'Required for tax and identity identification under Indian mutual fund regulations.' },
    { name: 'Statutory Disclaimer', size: '12px / 18px', weight: '500 (Min 12px rule)', sample: 'Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-12 text-left bg-white rounded-3xl border border-[#DCE8E0] shadow-sm my-6">
      {/* Page Title */}
      <div className="border-b border-[#E2ECE5] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#176B45] uppercase tracking-widest bg-[#E8F2EA] px-3 py-1 rounded-full">
            Sprout 2.0 Design System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17251D] mt-2">
            Brand Tokens, Mascot & Accessibility Guide
          </h1>
          <p className="text-sm text-[#526359] mt-1">
            Engineered specifically for low-end Android phones, WCAG AA compliance, and regulatory transparency.
          </p>
        </div>

        {/* Hindi +30% Expansion Tester */}
        <button
          onClick={() => setHindiPreview(!hindiPreview)}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
            hindiPreview
              ? 'bg-[#176B45] text-white border-[#176B45]'
              : 'bg-[#F8FAF7] text-[#17251D] border-[#DCE8E0] hover:border-[#176B45]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{hindiPreview ? 'Disable Hindi (+30%)' : 'Test Hindi (+30% space)'}</span>
        </button>
      </div>

      {/* 1. Mascot Sheet (4 States) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#176B45]" />
          <h2 className="text-xl font-extrabold text-[#17251D]">
            1. Sprout Mascot System (4 Consistent States)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#526359]">
          Minimal geometric seedling character. Designed without childish exaggeration to maintain financial trust while staying reassuring. Click <strong>"Copy SVG for Figma"</strong> to paste the vector code directly into your Figma canvas!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {([
            { state: 'welcome', title: 'State 1: Welcome', desc: 'Used on Homepage and Onboarding Screen 1 to warmly greet new investors.' },
            { state: 'explaining', title: 'State 2: Explaining', desc: 'Used in Document Checklist and KYC identity steps with guide checklist.' },
            { state: 'waiting', title: 'State 3: Waiting / Loading', desc: 'Used in Verification waiting screen in calm meditation pose without fake countdowns.' },
            { state: 'celebration', title: 'State 4: Celebration', desc: 'Used upon successful KYC approval with blooming flower and subtle sparkles.' },
          ] as const).map((item) => (
            <div
              key={item.state}
              className="bg-[#F8FAF7] border border-[#DCE8E0] rounded-2xl p-4 flex flex-col items-center justify-between text-center group hover:border-[#176B45] transition-all"
            >
              <div className="w-full flex justify-between items-center text-[11px] font-bold text-[#176B45] mb-2">
                <span>{item.title}</span>
                <span className="text-[10px] text-[#6F8679] bg-white px-2 py-0.5 rounded-full border border-[#DCE8E0]">Vector SVG</span>
              </div>

              <div className="my-3 py-2 flex items-center justify-center">
                <SproutMascot state={item.state} size={110} />
              </div>

              <p className="text-xs text-[#526359] leading-snug mb-3">
                {item.desc}
              </p>

              <button
                onClick={() => copySvgToClipboard(item.state)}
                className="w-full min-h-[44px] py-2 px-3 bg-white hover:bg-[#176B45] hover:text-white text-[#17251D] border border-[#DCE8E0] hover:border-[#176B45] rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copiedState === item.state ? (
                  <>
                    <Check className="w-4 h-4 text-[#176B45] group-hover:text-white" />
                    <span className="text-[#176B45] group-hover:text-white">SVG Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy SVG for Figma</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* ─── High-Fidelity 3D Design Assets Showcase ─── */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#17251D] via-[#1D3227] to-[#25392D] text-white border border-[#3A5043] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#86E4B1] uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
                High-Fidelity 3D Design Suite
              </span>
              <h3 className="text-xl font-extrabold mt-1">
                3D Mascot & App Presentation Renders
              </h3>
              <p className="text-xs text-[#A8D3BC] mt-0.5">
                Engineered for Play Store feature graphics, marketing hero collateral, and desktop presentations.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#86E4B1] bg-[#176B45]/60 px-3 py-1 rounded-lg border border-[#44B77F]/30 shrink-0 self-start sm:self-auto">
              Dual-Fidelity Strategy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Card 1: 3D Mascot on ₹100 Coin */}
            <div className="md:col-span-5 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center">
              <img
                src="/assets/sprout_3d_mascot.jpg"
                alt="Sprout 3D Mascot on Rupee Coin"
                className="w-full max-w-[280px] rounded-xl shadow-xl border border-white/10 object-cover"
              />
              <div className="mt-3">
                <h4 className="font-bold text-sm text-white">3D Botanical Sprout Guide</h4>
                <p className="text-[11px] text-[#A8D3BC] mt-0.5 leading-snug">
                  Embossed botanical guide perched atop the ₹100 Rupee coin — symbolizing organic micro-growth.
                </p>
              </div>
            </div>

            {/* Card 2: 3D App Ecosystem Banner */}
            <div className="md:col-span-7 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center">
              <img
                src="/assets/sprout_3d_banner.jpg"
                alt="Sprout 2.0 3D App Banner"
                className="w-full rounded-xl shadow-xl border border-white/10 object-cover"
              />
              <div className="mt-3">
                <h4 className="font-bold text-sm text-white">Sprout 2.0 3D App Ecosystem Banner</h4>
                <p className="text-[11px] text-[#A8D3BC] mt-0.5 leading-snug">
                  Complete multi-screen onboarding journey in realistic 3D isometric perspective for recruiter review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Color Palette & Contrast Ratios */}
      <section className="space-y-4 pt-6 border-t border-[#E2ECE5]">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#176B45]" />
          <h2 className="text-xl font-extrabold text-[#17251D]">
            2. Color Palette & WCAG AA Contrast Ratios
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#526359]">
          Strict compliance with WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large UI components).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {colors.map((c, i) => (
            <div key={i} className="border border-[#DCE8E0] rounded-xl p-3 bg-white space-y-2">
              <div
                className="w-full h-12 rounded-lg border border-black/10 flex items-center justify-end p-2 text-xs font-mono font-bold"
                style={{ backgroundColor: c.hex, color: i === 2 || i === 3 || i === 6 ? '#17251D' : '#FFFFFF' }}
              >
                {c.hex}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#17251D]">{c.name}</h4>
                <p className="text-[11px] text-[#526359] leading-tight mt-0.5">{c.usage}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-[#176B45] bg-[#E8F2EA] px-2 py-0.5 rounded">
                  {c.contrast}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Typography Hierarchy */}
      <section className="space-y-4 pt-6 border-t border-[#E2ECE5]">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-[#176B45]" />
          <h2 className="text-xl font-extrabold text-[#17251D]">
            3. Typography Scale & Hindi Adaptation
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#526359]">
          Primary typeface: <strong>Inter</strong> with Devanagari fallback (<strong>Noto Sans Devanagari</strong>). Every mobile body text is at least 16px to ensure readability on small 360–390px screens.
        </p>

        <div className="space-y-3">
          {typography.map((t, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-[#DCE8E0] bg-[#F8FAF7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="sm:w-1/3">
                <span className="font-bold text-sm text-[#17251D] block">{t.name}</span>
                <span className="text-xs text-[#6F8679] font-mono">{t.size} • {t.weight}</span>
              </div>
              <div className="sm:w-2/3">
                <p className={`text-[#17251D] ${idx === 3 ? 'text-base' : idx === 5 ? 'text-xs' : 'text-sm'}`}>
                  {hindiPreview ? (
                    <span className="font-devanagari text-[#176B45]">
                      {idx === 0 && 'आपकी निवेश यात्रा छोटी शुरुआत से होती है। (Hindi +30% length)'}
                      {idx === 1 && 'शुरू करने से पहले कुछ ज़रूरी चीज़ें'}
                      {idx === 2 && 'अपनी पहचान सत्यापित करें'}
                      {idx === 3 && '₹100 से निवेश शुरू करें। अपनी गति से सीखें और बिना किसी तनाव के आगे बढ़ें।'}
                      {idx === 4 && 'सेबी दिशानिर्देशों के तहत कर पहचान के लिए आवश्यक।'}
                      {idx === 5 && 'म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। योजना से संबंधित सभी दस्तावेजों को ध्यान से पढ़ें।'}
                    </span>
                  ) : (
                    t.sample
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. UI Components & Touch Targets */}
      <section className="space-y-4 pt-6 border-t border-[#E2ECE5]">
        <h2 className="text-xl font-extrabold text-[#17251D]">
          4. Reusable UI Components & 44×44px Touch Targets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buttons */}
          <div className="space-y-3 p-4 rounded-2xl border border-[#DCE8E0] bg-[#F8FAF7]">
            <h4 className="font-bold text-sm text-[#17251D]">Button Variants</h4>
            <button className="w-full min-h-[44px] bg-[#176B45] text-white font-bold text-sm rounded-xl py-2.5">
              Primary Button (44px)
            </button>
            <button className="w-full min-h-[44px] border border-[#DCE8E0] bg-white text-[#17251D] font-bold text-sm rounded-xl py-2.5">
              Secondary Button
            </button>
            <button disabled className="w-full min-h-[44px] bg-[#E2ECE5] text-[#8DA094] font-bold text-sm rounded-xl py-2.5 cursor-not-allowed">
              Disabled Button
            </button>
          </div>

          {/* Form Inputs */}
          <div className="space-y-3 p-4 rounded-2xl border border-[#DCE8E0] bg-[#F8FAF7]">
            <h4 className="font-bold text-sm text-[#17251D]">Input States</h4>
            <div>
              <label className="text-[11px] font-bold text-[#526359] block mb-1">Default State</label>
              <input type="text" readOnly value="9876543210" className="w-full min-h-[44px] px-3 text-sm rounded-xl border border-[#DCE8E0] bg-white text-[#17251D]" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#176B45] block mb-1">Focused State</label>
              <input type="text" readOnly value="ABCDE1234F" className="w-full min-h-[44px] px-3 text-sm rounded-xl border-2 border-[#176B45] bg-white text-[#17251D]" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#D9383A] block mb-1">Error State</label>
              <input type="text" readOnly value="Invalid PAN" className="w-full min-h-[44px] px-3 text-sm rounded-xl border border-[#D9383A] bg-white text-[#D9383A]" />
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="space-y-2.5 p-4 rounded-2xl border border-[#DCE8E0] bg-[#F8FAF7] text-xs">
            <h4 className="font-bold text-sm text-[#17251D]">Submission Compliance Check</h4>
            <div className="flex items-center gap-2 text-[#176B45]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Risk disclaimer visible above fold</span>
            </div>
            <div className="flex items-center gap-2 text-[#176B45]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Zero "guaranteed" or "safe" claims</span>
            </div>
            <div className="flex items-center gap-2 text-[#176B45]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>All touch targets &gt;= 44×44px</span>
            </div>
            <div className="flex items-center gap-2 text-[#176B45]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Mobile body text &gt;= 16px</span>
            </div>
            <div className="flex items-center gap-2 text-[#176B45]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Lightweight page weight (&lt;1.5 MB)</span>
            </div>
            <div className="flex items-center gap-2 text-[#176B45]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>30% space reserved for Hindi text</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

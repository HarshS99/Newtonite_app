import React, { useState } from 'react';
import type { ScreenType, ViewMode } from '../../types';
import { Smartphone, Monitor, Palette, BookOpen, Layers, ChevronDown, X } from 'lucide-react';

interface PrototypeBarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
}

export const PrototypeBar: React.FC<PrototypeBarProps> = ({
  currentScreen,
  onSelectScreen,
  viewMode,
  onSelectViewMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const screens: { id: ScreenType; label: string; num: string }[] = [
    { id: 'home', label: 'Home', num: 'H' },
    { id: 'onboarding-1', label: '1. Welcome', num: '1' },
    { id: 'onboarding-2', label: '2. Prep', num: '2' },
    { id: 'onboarding-3', label: '3. OTP', num: '3' },
    { id: 'onboarding-4', label: '4. KYC', num: '4' },
    { id: 'onboarding-5', label: '5. Done', num: '5' },
  ];

  const viewModes: { id: ViewMode; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: 'responsive', label: 'Responsive', shortLabel: 'Live', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'mobile-390', label: 'Mobile 390px', shortLabel: '390', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'desktop-1440', label: 'Desktop 1440px', shortLabel: '1440', icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: 'design-system', label: 'Design System', shortLabel: 'DS', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'case-study', label: 'Case Study', shortLabel: 'PDF', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  const currentScreenLabel = screens.find(s => s.id === currentScreen)?.num ?? '?';

  const handleSelectScreen = (id: ScreenType) => {
    onSelectScreen(id);
    if (viewMode === 'design-system' || viewMode === 'case-study') {
      onSelectViewMode('responsive');
    }
    setDrawerOpen(false);
  };

  return (
    <div className="w-full bg-[#17251D] text-white border-b border-[#2B3E32] sticky top-0 z-50 text-xs shadow-md print:hidden">
      {/* ─── Single compact row (always one line) ─── */}
      <div className="w-full px-3 h-11 flex items-center justify-between gap-2 overflow-hidden">

        {/* Left: brand badge */}
        <div className="flex items-center gap-1.5 bg-[#25392D] px-2 py-1 rounded-lg border border-[#375242] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#44B77F] animate-pulse" />
          <span className="font-bold tracking-tight text-white text-[11px] leading-none hidden xs:inline">Sprout 2.0</span>
          <span className="font-bold tracking-tight text-white text-[11px] leading-none xs:hidden">S2</span>
        </div>

        {/* Center: view mode toggle — icons only on mobile, labels on desktop */}
        <div className="flex items-center bg-[#0F1913] p-0.5 rounded-lg border border-[#2B3E32] shrink-0 gap-0.5">
          {viewModes.slice(0, 3).map(vm => (
            <button
              key={vm.id}
              onClick={() => onSelectViewMode(vm.id)}
              title={vm.label}
              className={`h-7 px-1.5 sm:px-2.5 rounded-md font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                viewMode === vm.id
                  ? 'bg-[#176B45] text-white shadow-xs font-semibold'
                  : 'text-[#A0B5A8] hover:text-white'
              }`}
            >
              {vm.icon}
              <span className="hidden sm:inline text-[11px]">{vm.shortLabel}</span>
            </button>
          ))}
          <div className="w-px h-4 bg-[#2B3E32] mx-0.5" />
          {viewModes.slice(3).map(vm => (
            <button
              key={vm.id}
              onClick={() => onSelectViewMode(vm.id)}
              title={vm.label}
              className={`h-7 px-1.5 sm:px-2.5 rounded-md font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                viewMode === vm.id
                  ? 'bg-[#176B45] text-white ring-1 ring-white/20'
                  : vm.id === 'design-system' ? 'text-[#86E4B1] hover:text-white' : 'text-[#FFE898] hover:text-white'
              }`}
            >
              {vm.icon}
              <span className="hidden md:inline text-[11px]">{vm.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Right: screen jump — compact buttons on desktop, drawer toggle on mobile */}
        {/* Desktop (md+): show all screen pills */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {screens.map(sc => {
            const isActive = currentScreen === sc.id && ['responsive', 'mobile-390', 'desktop-1440'].includes(viewMode);
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScreen(sc.id)}
                className={`h-7 px-2 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#176B45] text-white font-bold ring-1 ring-white/20'
                    : 'bg-[#213328] hover:bg-[#2C4436] text-[#C2D6CA]'
                }`}
              >
                {sc.label}
              </button>
            );
          })}
        </div>

        {/* Mobile (< md): compact drawer trigger */}
        <button
          onClick={() => setDrawerOpen(d => !d)}
          className="md:hidden flex items-center gap-1 h-7 px-2 rounded-md bg-[#213328] hover:bg-[#2C4436] text-[#C2D6CA] cursor-pointer shrink-0 whitespace-nowrap"
          aria-expanded={drawerOpen}
          aria-label="Jump to screen"
        >
          <span className="text-[11px] font-semibold">Scr {currentScreenLabel}</span>
          {drawerOpen ? <X className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Drawer: full-width screen picker, shown only on mobile */}
      {drawerOpen && (
        <div className="md:hidden w-full bg-[#1B2D23] border-t border-[#2B3E32] px-3 py-2.5 flex flex-wrap gap-1.5">
          {screens.map(sc => {
            const isActive = currentScreen === sc.id && ['responsive', 'mobile-390', 'desktop-1440'].includes(viewMode);
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScreen(sc.id)}
                className={`h-8 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#176B45] text-white font-bold'
                    : 'bg-[#213328] hover:bg-[#2C4436] text-[#C2D6CA]'
                }`}
              >
                {sc.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

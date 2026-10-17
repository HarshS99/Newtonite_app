import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Menu, X, ChevronRight } from 'lucide-react';
import { smoothScrollToSection } from '../../utils/scroll';

interface NavbarProps {
  onStartInvesting: () => void;
  onOpenSection?: (sectionId: string) => void;
  currentLanguage?: 'en' | 'hi';
  isMobile?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartInvesting,
  onOpenSection,
  currentLanguage = 'en',
  isMobile = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#documents', label: 'What You Need' },
    { href: '#trust', label: 'Security & Verification' },
    { href: '#faq', label: 'FAQ' },
  ];

  // Active section tracking with IntersectionObserver (zero scroll event reflow overhead)
  useEffect(() => {
    const sectionIds = ['how-it-works', 'documents', 'trust', 'faq'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    smoothScrollToSection(href);
  };

  return (
    <header 
      style={{ top: 'var(--navbar-top, 44px)' }} 
      className="sticky z-40 w-full bg-[#F8FAF7]/95 backdrop-blur-md border-b border-[#E2ECE5] shadow-xs transition-[top] duration-150"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            smoothScrollToSection('top');
            if (onOpenSection) onOpenSection('hero');
          }} 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          role="button"
          tabIndex={0}
          aria-label="Sprout 2.0 Home"
        >
          <div className="w-9 h-9 rounded-xl bg-[#176B45] flex items-center justify-center shadow-sm group-hover:bg-[#115335] transition-colors">
            {/* Minimal Vector Sprout Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22V13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M12 16C12 11 7 10 6 13C6 17 11 17 12 17" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M12 13C12 8 17 7 18 10C18 14 13 14 12 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#17251D]">
              Sprout <span className="text-[#176B45] font-semibold">2.0</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Links (Hidden on mobile) */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#46574D]">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection(link.href);
                  }}
                  className={`relative py-2 transition-colors cursor-pointer text-sm font-medium ${
                    isActive ? 'text-[#176B45] font-semibold' : 'text-[#46574D] hover:text-[#176B45]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#176B45] rounded-full animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {/* Desktop Action Controls (Hidden on mobile) */}
        {!isMobile && (
          <div className="hidden md:flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector Pill */}
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D5E2D9] bg-white text-xs font-medium text-[#3A4E42]"
              title="Language selection - Hindi support coming soon"
            >
              <Globe className="w-3.5 h-3.5 text-[#176B45]" />
              <span>{currentLanguage === 'hi' ? 'हिन्दी' : 'English'}</span>
              <span className="hidden sm:inline-block text-[10px] bg-[#E8F2EA] text-[#176B45] font-semibold px-1.5 py-0.5 rounded">
                Hindi soon
              </span>
            </div>

            {/* Primary CTA */}
            <button
              onClick={onStartInvesting}
              id="nav-cta-btn"
              className="min-h-[44px] min-w-[44px] px-4 py-2 bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
              aria-label="Start Investing - opens onboarding"
            >
              <span>Start Investing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile Header Controls: Compact CTA + Hamburger Menu Button */}
        <div className={`flex items-center gap-2 ${!isMobile ? 'md:hidden' : ''}`}>
          <button
            onClick={onStartInvesting}
            className="min-h-[44px] px-3.5 py-2 bg-[#176B45] hover:bg-[#115335] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 cursor-pointer"
            aria-label="Start Investing from ₹100"
          >
            <span>Start</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 rounded-xl border border-[#D5E2D9] bg-white text-[#17251D] flex items-center justify-center hover:bg-[#F2F8F4] active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#176B45]" />
            ) : (
              <Menu className="w-5 h-5 text-[#17251D]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="w-full bg-[#F8FAF7] border-b border-[#DCE8E0] px-4 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="w-full min-h-[44px] px-3 py-2.5 text-left text-sm font-semibold text-[#17251D] hover:bg-[#E8F2EA] hover:text-[#176B45] rounded-xl transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#8AA294]" />
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#E2ECE5] flex items-center justify-between text-xs text-[#526359] px-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Globe className="w-4 h-4 text-[#176B45]" />
              Language: English
            </span>
            <span className="bg-[#E8F2EA] text-[#176B45] font-bold text-[10px] px-2 py-0.5 rounded-full">
              Hindi Coming Soon
            </span>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartInvesting();
              }}
              className="w-full min-h-[48px] bg-[#176B45] hover:bg-[#115335] active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Start Investing from ₹100</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

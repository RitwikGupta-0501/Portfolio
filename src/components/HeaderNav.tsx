import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { Send, Menu, X, ArrowUpRight } from 'lucide-react';
import { scrollToTop } from '../utils/smoothScroll';
import { PROFILE_MANIFEST } from '../data/profile_manifest';

interface HeaderNavProps {
  projects: Project[];
  activeProject: Project | null;
  onSelectProject: (p: Project) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionIds = [
      'architecture-lab',
      'engineering-process',
      'experience-log',
      'profile-skills-resume',
      'contact-handshake',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header + visual focal threshold
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page detection -> Activate Contact
      if (windowHeight + window.scrollY >= documentHeight - 80) {
        setActiveSection('contact-handshake');
        return;
      }

      // If at very top of page (hero section) before projects -> no section is active yet
      const firstSection = document.getElementById('architecture-lab');
      if (firstSection && window.scrollY + 120 < firstSection.offsetTop) {
        setActiveSection('');
        return;
      }

      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/[0.06] bg-[#1A1A1D]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Serif Brand Name Anchor */}
        <div className="flex items-center">
          <button
            onClick={() => scrollToTop(650)}
            className="font-serif-display font-medium text-xl sm:text-2xl text-[#EAEAEA] hover:text-white transition-opacity tracking-tight cursor-pointer text-left"
          >
            {PROFILE_MANIFEST.name}
          </button>
        </div>

        {/* Center: Geometric Sans Links with Dynamic Scroll-Spy Active Indicator */}
        <nav className="hidden md:flex items-center gap-8 text-sm sm:text-base font-sans font-medium tracking-wide">
          <button
            onClick={() => handleLinkClick('architecture-lab')}
            className={`group relative py-1 transition-colors duration-200 cursor-pointer ${
              activeSection === 'architecture-lab'
                ? 'text-white'
                : 'text-[#EAEAEA]/70 hover:text-[#EAEAEA]'
            }`}
          >
            <span>Projects</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#C59458] transition-all duration-300 ease-out ${
                activeSection === 'architecture-lab' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          <button
            onClick={() => handleLinkClick('engineering-process')}
            className={`group relative py-1 transition-colors duration-200 cursor-pointer ${
              activeSection === 'engineering-process'
                ? 'text-white'
                : 'text-[#EAEAEA]/70 hover:text-[#EAEAEA]'
            }`}
          >
            <span>Process</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#C59458] transition-all duration-300 ease-out ${
                activeSection === 'engineering-process' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          <button
            onClick={() => handleLinkClick('experience-log')}
            className={`group relative py-1 transition-colors duration-200 cursor-pointer ${
              activeSection === 'experience-log'
                ? 'text-white'
                : 'text-[#EAEAEA]/70 hover:text-[#EAEAEA]'
            }`}
          >
            <span>Experience</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#C59458] transition-all duration-300 ease-out ${
                activeSection === 'experience-log' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          <button
            onClick={() => handleLinkClick('profile-skills-resume')}
            className={`group relative py-1 transition-colors duration-200 cursor-pointer ${
              activeSection === 'profile-skills-resume'
                ? 'text-white'
                : 'text-[#EAEAEA]/70 hover:text-[#EAEAEA]'
            }`}
          >
            <span>Skills &amp; Resume</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#C59458] transition-all duration-300 ease-out ${
                activeSection === 'profile-skills-resume' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>
        </nav>

        {/* Right: Clean Connect Action with Active Status */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => handleLinkClick('contact-handshake')}
            className={`group relative py-1 text-sm sm:text-base font-sans font-medium tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSection === 'contact-handshake'
                ? 'text-white'
                : 'text-[#EAEAEA]/70 hover:text-white'
            }`}
          >
            <span>Contact</span>
            <ArrowUpRight
              className={`w-4 h-4 text-[#C59458] transition-transform duration-200 ${
                activeSection === 'contact-handshake'
                  ? 'translate-x-0.5 -translate-y-0.5'
                  : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#C59458] transition-all duration-300 ease-out ${
                activeSection === 'contact-handshake' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-white/10 bg-[#242428]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu with Active Highlights */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#1F1F23] p-5 space-y-3 font-sans text-xs tracking-wider uppercase">
          <button
            onClick={() => handleLinkClick('architecture-lab')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'architecture-lab'
                ? 'bg-[#28282D] text-white border-l-2 border-[#C59458] pl-2.5 font-semibold'
                : 'bg-[#28282D]/60 text-slate-300 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleLinkClick('engineering-process')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'engineering-process'
                ? 'bg-[#28282D] text-white border-l-2 border-[#C59458] pl-2.5 font-semibold'
                : 'bg-[#28282D]/60 text-slate-300 hover:text-white'
            }`}
          >
            Process
          </button>
          <button
            onClick={() => handleLinkClick('experience-log')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'experience-log'
                ? 'bg-[#28282D] text-white border-l-2 border-[#C59458] pl-2.5 font-semibold'
                : 'bg-[#28282D]/60 text-slate-300 hover:text-white'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => handleLinkClick('profile-skills-resume')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeSection === 'profile-skills-resume'
                ? 'bg-[#28282D] text-white border-l-2 border-[#C59458] pl-2.5 font-semibold'
                : 'bg-[#28282D]/60 text-slate-300 hover:text-white'
            }`}
          >
            Skills &amp; Resume
          </button>
          <button
            onClick={() => handleLinkClick('contact-handshake')}
            className="w-full btn-primary p-3 text-center font-bold flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      )}
    </header>
  );
};

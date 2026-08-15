import React, { useState } from 'react';
import { Project } from '../types';
import { Send, Menu, X, ArrowUpRight } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/[0.06] bg-[#1A1A1D]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Serif Brand Name Anchor (No Boxed Icon) */}
        <div className="flex items-center">
          <a
            href="#"
            className="font-serif-display font-medium text-xl sm:text-2xl text-[#EAEAEA] hover:text-white transition-opacity tracking-tight"
          >
            Ritwik Gupta
          </a>
        </div>

        {/* Center: Center-aligned Geometric Sans Links with increased scale, light color, tracking-wide, and animated underline hover */}
        <nav className="hidden md:flex items-center gap-8 text-sm sm:text-base font-sans font-medium tracking-wide">
          <button
            onClick={() => onNavigateSection('architecture-lab')}
            className="group relative py-1 text-[#EAEAEA]/70 hover:text-[#EAEAEA] transition-colors duration-200"
          >
            <span>Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B58E62] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigateSection('engineering-process')}
            className="group relative py-1 text-[#EAEAEA]/70 hover:text-[#EAEAEA] transition-colors duration-200"
          >
            <span>Process</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B58E62] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigateSection('experience-log')}
            className="group relative py-1 text-[#EAEAEA]/70 hover:text-[#EAEAEA] transition-colors duration-200"
          >
            <span>Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B58E62] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
          <button
            onClick={() => onNavigateSection('profile-skills-resume')}
            className="group relative py-1 text-[#EAEAEA]/70 hover:text-[#EAEAEA] transition-colors duration-200"
          >
            <span>Skills &amp; Resume</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B58E62] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
        </nav>

        {/* Right: Clean Connect Action */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => onNavigateSection('contact-handshake')}
            className="group relative py-1 text-[#EAEAEA]/70 hover:text-white text-sm sm:text-base font-sans font-medium tracking-wide flex items-center gap-1.5 transition-colors"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-4 h-4 text-[#B58E62] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B58E62] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-white/10 bg-[#242428]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#1F1F23] p-5 space-y-3 font-sans text-xs tracking-wider uppercase">
          <button
            onClick={() => {
              onNavigateSection('architecture-lab');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg bg-[#28282D] text-slate-200 hover:text-white"
          >
            Projects
          </button>
          <button
            onClick={() => {
              onNavigateSection('engineering-process');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg bg-[#28282D] text-slate-200 hover:text-white"
          >
            Process
          </button>
          <button
            onClick={() => {
              onNavigateSection('experience-log');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg bg-[#28282D] text-slate-200 hover:text-white"
          >
            Experience
          </button>
          <button
            onClick={() => {
              onNavigateSection('profile-skills-resume');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-lg bg-[#28282D] text-slate-200 hover:text-white"
          >
            Skills &amp; Resume
          </button>
          <button
            onClick={() => {
              onNavigateSection('contact-handshake');
              setMobileMenuOpen(false);
            }}
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

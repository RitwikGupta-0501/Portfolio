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
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090A0E]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Minimal Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 text-white hover:text-slate-200 transition group"
          >
            <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white shadow-inner">
              R
            </div>
            <span className="font-heading font-semibold text-base sm:text-lg tracking-tight text-white">
              Ritwik Gupta
            </span>
          </a>
        </div>

        {/* Center: Simplified Clean Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono font-medium tracking-wider text-slate-400">
          <button
            onClick={() => onNavigateSection('architecture-lab')}
            className="hover:text-white transition"
          >
            PROJECTS
          </button>
          <button
            onClick={() => onNavigateSection('engineering-process')}
            className="hover:text-white transition"
          >
            PROCESS
          </button>
          <button
            onClick={() => onNavigateSection('experience-log')}
            className="hover:text-white transition"
          >
            EXPERIENCE
          </button>
          <button
            onClick={() => onNavigateSection('profile-skills-resume')}
            className="hover:text-white transition"
          >
            SKILLS & RESUME
          </button>
        </nav>

        {/* Right: Connect Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onNavigateSection('contact-handshake')}
            className="btn-secondary px-3.5 py-1.5 text-xs flex items-center gap-1.5"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg border border-white/10 bg-[#12141A]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0E1017] p-4 space-y-2.5 font-mono text-xs">
          <button
            onClick={() => {
              onNavigateSection('architecture-lab');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2.5 rounded-lg bg-[#141720] text-slate-200 border border-white/10 hover:border-white/20"
          >
            PROJECTS
          </button>
          <button
            onClick={() => {
              onNavigateSection('experience-log');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2.5 rounded-lg bg-[#141720] text-slate-200 border border-white/10 hover:border-white/20"
          >
            EXPERIENCE
          </button>
          <button
            onClick={() => {
              onNavigateSection('profile-skills-resume');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2.5 rounded-lg bg-[#141720] text-slate-200 border border-white/10 hover:border-white/20"
          >
            SKILLS & RESUME
          </button>
          <button
            onClick={() => {
              onNavigateSection('contact-handshake');
              setMobileMenuOpen(false);
            }}
            className="w-full btn-primary p-2.5 text-center font-bold flex items-center justify-center gap-2 mt-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </button>
        </div>
      )}
    </header>
  );
};

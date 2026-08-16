import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDrawer } from './components/ProjectDrawer';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { ExecutionLog } from './components/ExecutionLog';
import { SkillsResumeSection } from './components/SkillsResumeSection';
import { ContactSection } from './components/ContactSection';
import { PROJECTS_DATA } from './data/projectsData';
import { PROFILE_MANIFEST } from './data/profile_manifest';
import { Project } from './types';
import { ArrowDown, Github, Mail, Linkedin } from 'lucide-react';
import { navigateToSection, scrollToTop } from './utils/smoothScroll';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // When active project changes, default state is Global View (selectedLayerId = null)
  useEffect(() => {
    setSelectedLayerId(null);
  }, [activeProject]);

  // ESC key listener to return to Global Context
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLayerId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentLayerIndex = activeProject
    ? activeProject.layers.findIndex((l) => l.id === selectedLayerId)
    : -1;

  const handleSelectNextLayer = () => {
    if (!activeProject) return;
    const nextIndex = (currentLayerIndex + 1) % activeProject.layers.length;
    setSelectedLayerId(activeProject.layers[nextIndex].id);
  };

  const handleSelectPrevLayer = () => {
    if (!activeProject) return;
    const prevIndex = (currentLayerIndex - 1 + activeProject.layers.length) % activeProject.layers.length;
    setSelectedLayerId(activeProject.layers[prevIndex].id);
  };

  const handleNavigateSection = (sectionId: string) => {
    navigateToSection(sectionId, 650, 80);
  };

  const handleSelectProject = (proj: Project) => {
    if (activeProject?.id === proj.id) {
      setActiveProject(null);
    } else {
      setActiveProject(proj);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1D] text-[#EAEAEA] relative selection:bg-[#B58E62] selection:text-[#1A1A1D] font-sans">
      {/* Top Header */}
      <HeaderNav
        projects={PROJECTS_DATA}
        activeProject={activeProject}
        onSelectProject={(p) => setActiveProject(p)}
        onNavigateSection={handleNavigateSection}
      />

      {/* HERO SECTION - Dedicated Full Viewport Landing */}
      <section className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] px-6 sm:px-8 max-w-4xl mx-auto flex flex-col justify-center items-start text-left py-12 sm:py-16">
        {/* The Eyebrow: Purely typographic, all-caps, wide letter spacing, bronze/brass accent (#C59458) */}
        <div className="text-xs font-sans uppercase font-medium tracking-[0.2em] text-[#C59458] mb-6">
          {PROFILE_MANIFEST.availability}
        </div>

        {/* The Name Anchor: Serif Display */}
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl font-normal text-[#EAEAEA] tracking-tight leading-[1.05] mb-4">
          {PROFILE_MANIFEST.name}
        </h1>

        {/* The Role Indicator: Single clean line separated by interpuncts */}
        <div className="text-base sm:text-lg md:text-xl font-sans font-normal text-[#EAEAEA]/80 tracking-wide mb-8">
          {PROFILE_MANIFEST.tagline}
        </div>

        {/* The Introduction: Generous Line-Height & Muted Slate Balance */}
        <p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] font-sans font-normal leading-relaxed md:leading-[1.85] max-w-3xl mb-10">
          Systems developer, open-source contributor, and freelance engineer. While the industry focuses on the latest tech, I focus on building the infrastructure that powers it. Dedicated to architecting solid, reliable backend systems.
        </p>

        {/* Action Controls: Single Primary Button + Minimalist Secondary Icons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => handleNavigateSection('architecture-lab')}
            className="group btn-primary px-6 py-3 text-sm font-sans font-semibold flex items-center gap-2.5 cursor-pointer select-none"
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4 text-[#121214] transition-transform duration-200 group-hover:translate-y-1" />
          </button>

          <div className="flex items-center gap-2">
            {/* GitHub */}
            <div className="relative group/tooltip">
              <a
                href={PROFILE_MANIFEST.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[#1C1C20] border border-white/10 rounded-md shadow-xl shadow-black/50 text-[11px] font-mono text-[#EAEAEA] whitespace-nowrap opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 delay-300 pointer-events-none z-30 flex items-center">
                <span>GitHub Profile</span>
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1C1C20] border-t border-l border-white/10" />
              </div>
            </div>

            {/* Email */}
            <div className="relative group/tooltip">
              <a
                href={`mailto:${PROFILE_MANIFEST.email}`}
                className="btn-icon"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[#1C1C20] border border-white/10 rounded-md shadow-xl shadow-black/50 text-[11px] font-mono text-[#EAEAEA] whitespace-nowrap opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 delay-300 pointer-events-none z-30 flex items-center">
                <span>Send Email</span>
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1C1C20] border-t border-l border-white/10" />
              </div>
            </div>

            {/* LinkedIn */}
            <div className="relative group/tooltip">
              <a
                href={PROFILE_MANIFEST.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[#1C1C20] border border-white/10 rounded-md shadow-xl shadow-black/50 text-[11px] font-mono text-[#EAEAEA] whitespace-nowrap opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 delay-300 pointer-events-none z-30 flex items-center">
                <span>LinkedIn Profile</span>
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1C1C20] border-t border-l border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PROJECTS & ARCHITECTURE WORKBENCH */}
      <ProjectsSection
        projects={PROJECTS_DATA}
        onSelectProject={handleSelectProject}
      />

      {/* SECTION 2: ENGINEERING PROCESS TIMELINE */}
      <ProcessTimelineSection />

      {/* SECTION 3: CAREER EXECUTION LOG */}
      <ExecutionLog />

      {/* SECTION 4: SKILLS, RESUME & PROFILES */}
      <SkillsResumeSection />

      {/* SECTION 5: CONTACT / HANDSHAKE */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 px-6 sm:px-12 text-xs font-mono text-gray-500 bg-[#141417]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} {PROFILE_MANIFEST.name} • Backend Systems &amp; Distributed Architecture
          </div>
          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href={PROFILE_MANIFEST.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#EAEAEA] transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PROFILE_MANIFEST.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#EAEAEA] transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={PROFILE_MANIFEST.leetcodeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#EAEAEA] transition-colors"
            >
              LeetCode
            </a>
            <span>•</span>
            <button
              onClick={() => scrollToTop(650)}
              className="hover:text-[#EAEAEA] transition-colors cursor-pointer"
            >
              Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* The Expanded View: Full-Screen Glassmorphic Slide-Out Drawer */}
      <ProjectDrawer
        project={activeProject}
        selectedLayerId={selectedLayerId}
        projectIndex={activeProject ? PROJECTS_DATA.findIndex((p) => p.id === activeProject.id) : 0}
        onClose={() => setActiveProject(null)}
        onSelectLayer={(layerId) => setSelectedLayerId(layerId)}
        onSelectNextLayer={handleSelectNextLayer}
        onSelectPrevLayer={handleSelectPrevLayer}
      />
    </div>
  );
}

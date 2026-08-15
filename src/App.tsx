import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDrawer } from './components/ProjectDrawer';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { ExecutionLog } from './components/ExecutionLog';
import { SkillsResumeSection } from './components/SkillsResumeSection';
import { ContactSection } from './components/ContactSection';
import { PROJECTS_DATA } from './data/projectsData';
import { Project } from './types';
import { ArrowDown, Github, Mail, FileText } from 'lucide-react';

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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* HERO SECTION - Refined Serif Identity & Editorial Introduction */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 px-6 sm:px-8 max-w-4xl mx-auto flex flex-col items-start text-left">
        {/* The Eyebrow: Purely typographic, all-caps, wide letter spacing, muted brass accent (#B58E62) */}
        <div className="text-xs font-sans uppercase font-medium tracking-[0.2em] text-[#B58E62] mb-6">
          OPEN TO 6-MONTH INTERNSHIPS &amp; FULL-TIME • 2027
        </div>

        {/* The Name Anchor: Serif Display */}
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl font-normal text-[#EAEAEA] tracking-tight leading-[1.05] mb-4">
          Ritwik Gupta
        </h1>

        {/* The Role Indicator: Single clean line separated by interpuncts */}
        <div className="text-base sm:text-lg md:text-xl font-sans font-normal text-[#EAEAEA]/80 tracking-wide mb-8">
          Backend Software Engineer • Distributed Systems
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
            <ArrowDown className="w-4 h-4 text-[#121214] arrow-drop-settle" />
          </button>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/RitwikGupta-0501"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="mailto:ritwikg.205@gmail.com"
              className="btn-icon"
              aria-label="Send Email"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleNavigateSection('profile-skills-resume')}
              className="btn-icon"
              aria-label="View Resume & Skills"
              title="View Resume & Skills"
            >
              <FileText className="w-4 h-4" />
            </button>
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
      <footer className="border-t border-white/[0.06] py-12 px-6 text-center font-sans text-xs text-[#A1A1AA] bg-[#141417]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Ritwik Gupta // Systems &amp; Distributed Architecture
          </div>
          <div className="flex items-center gap-6 text-[#A1A1AA]">
            <a href="mailto:ritwikg.205@gmail.com" className="hover:text-white transition">
              Email
            </a>
            <span>•</span>
            <button onClick={() => handleNavigateSection('profile-skills-resume')} className="hover:text-white transition">
              Resume
            </button>
            <span>•</span>
            <button onClick={() => handleNavigateSection('architecture-lab')} className="hover:text-white transition">
              Projects
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

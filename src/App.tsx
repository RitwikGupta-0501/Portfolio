import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessTimelineSection } from './components/ProcessTimelineSection';
import { ExecutionLog } from './components/ExecutionLog';
import { SkillsResumeSection } from './components/SkillsResumeSection';
import { ContactSection } from './components/ContactSection';
import { PROJECTS_DATA } from './data/projectsData';
import { Project } from './types';
import { ArrowDown } from 'lucide-react';

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
      // Smooth scroll to workspace after state update
      setTimeout(() => {
        const workspaceEl = document.getElementById('project-inspector-workspace');
        if (workspaceEl) {
          workspaceEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-200 relative selection:bg-white selection:text-black font-sans">
      {/* Top Header */}
      <HeaderNav
        projects={PROJECTS_DATA}
        activeProject={activeProject}
        onSelectProject={(p) => setActiveProject(p)}
        onNavigateSection={handleNavigateSection}
      />

      {/* HERO SECTION - Direct, Purposeful, Executive Introduction */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-start text-left">
        {/* Availability / Status indicator badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-xs mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Available for hire</span>
          <span className="text-slate-600">•</span>
          <span className="text-white font-medium">Summer 2025 / New Grad / Full-Time</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-white tracking-tight leading-[1.08] mb-6">
          Ritwik Gupta
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-sans font-light leading-relaxed mb-6">
          Computer Engineering student, systems developer, and open-source contributor building high-performance low-level infrastructure, GPU acceleration pipelines, and reliable distributed systems.
        </p>

        {/* Open For Roles Container */}
        <div className="w-full my-6 p-4 sm:p-5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
            <span className="text-amber-300 font-bold">●</span>
            <span>OPEN ROLES &amp; DOMAINS OF INTEREST:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Systems Software Engineer (C++ / Rust)',
              'GPU & CUDA Acceleration Engineer',
              'Distributed Systems & Infrastructure Engineer',
              'High-Performance Backend Engineer',
              'Full-Stack Systems Engineer',
            ].map((role) => (
              <span
                key={role}
                className="px-3 py-1.5 rounded-lg bg-[#141720] border border-white/10 text-slate-200 text-xs sm:text-sm font-mono font-medium flex items-center gap-1.5 hover:border-white/25 transition"
              >
                <span className="text-emerald-400 text-xs">✓</span>
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons & Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
          <button
            onClick={() => handleNavigateSection('architecture-lab')}
            className="btn-primary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <span>View Projects</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleNavigateSection('profile-skills-resume')}
            className="btn-secondary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <span>Resume &amp; Skills</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <a
            href="https://github.com/RitwikGupta-0501"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-subtle px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <span>GitHub</span>
          </a>

          <a
            href="mailto:ritwikg.205@gmail.com"
            className="btn-subtle px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <span>Email</span>
          </a>
        </div>
      </section>

      {/* SECTION 1: PROJECTS & ARCHITECTURE WORKBENCH */}
      <ProjectsSection
        projects={PROJECTS_DATA}
        activeProject={activeProject}
        selectedLayerId={selectedLayerId}
        onSelectProject={handleSelectProject}
        onCloseProject={() => setActiveProject(null)}
        onSelectLayer={(layerId) => setSelectedLayerId(layerId)}
        onSelectNextLayer={handleSelectNextLayer}
        onSelectPrevLayer={handleSelectPrevLayer}
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
      <footer className="border-t border-white/[0.08] py-10 px-4 text-center font-mono text-xs text-slate-500 bg-[#07080B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Ritwik Gupta // Systems &amp; Distributed Architecture
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="mailto:ritwikg.205@gmail.com" className="hover:text-white transition">
              EMAIL
            </a>
            <span>•</span>
            <button onClick={() => handleNavigateSection('profile-skills-resume')} className="hover:text-white transition">
              SKILLS &amp; RESUME
            </button>
            <span>•</span>
            <button onClick={() => handleNavigateSection('architecture-lab')} className="hover:text-white transition">
              PROJECTS
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

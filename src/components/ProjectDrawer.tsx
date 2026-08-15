import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, Github, ArrowUpRight } from 'lucide-react';

interface ProjectDrawerProps {
  project: Project | null;
  selectedLayerId: string | null;
  projectIndex: number;
  onClose: () => void;
  onSelectLayer: (layerId: string | null) => void;
  onSelectNextLayer: () => void;
  onSelectPrevLayer: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  project,
  selectedLayerId,
  projectIndex,
  onClose,
  onSelectLayer,
}) => {
  const [renderedProject, setRenderedProject] = useState<Project | null>(project);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setRenderedProject(project);
      setIsClosing(false);
      // Fluid enter trigger
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsOpen(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else if (renderedProject) {
      // 500ms smooth exit transition
      setIsClosing(true);
      setIsOpen(false);
      const timer = setTimeout(() => {
        setRenderedProject(null);
        setIsClosing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [project]);

  // Instant body scroll lock the exact millisecond drawer is active (prevents underlying shift)
  useEffect(() => {
    if (renderedProject) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      // Compensate for scrollbar width to prevent layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [renderedProject]);

  // Keyboard ESC trigger for smooth exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && renderedProject && !isClosing) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [renderedProject, isClosing, onClose]);

  if (!renderedProject) return null;

  const currentLayer = renderedProject.layers.find((l) => l.id === selectedLayerId) || null;
  const repoUrl = renderedProject.globalView?.deploymentStack?.repoUrl;
  const chapterFormatted = `0${projectIndex + 1}`;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* The Global Overlay: Fixed dark backdrop gently fading in/out over entire screen (500ms ease-out) */}
      <div
        onClick={() => {
          if (!isClosing) onClose();
        }}
        className={`fixed inset-0 w-screen h-screen min-h-screen bg-black/70 backdrop-blur-[3px] z-40 transition-opacity duration-500 ease-out pointer-events-auto ${
          isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* The Slide: Sleek frosted-glass panel gliding smoothly from right (exactly 60% viewport width, 500ms heavier physical ease-out) */}
      <div
        id="project-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${renderedProject.name} Architecture Specification`}
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[90%] md:w-[60vw] max-w-5xl bg-[#1A1A1D]/90 backdrop-blur-2xl border-l border-white/[0.06] shadow-2xl shadow-black/90 overflow-y-auto flex flex-col pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#1A1A1D]/95 backdrop-blur-xl border-b border-white/[0.05] px-6 sm:px-10 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
            <span className="text-[#B58E62] font-semibold">{chapterFormatted}</span>
            <span className="text-gray-500 uppercase tracking-widest truncate max-w-[280px] sm:max-w-md">
              • SPEC • {renderedProject.category}
            </span>
          </div>

          {/* Minimalist [ X ] / ESC Dismiss Button */}
          <button
            onClick={() => {
              if (!isClosing) onClose();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-[#A1A1AA] hover:text-white text-xs font-mono transition cursor-pointer"
            aria-label="Close Drawer (ESC)"
          >
            <span className="hidden sm:inline text-[10px] text-slate-500">ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Body Content */}
        <div className="p-6 sm:p-10 md:p-12 space-y-12 flex-1">
          {/* Top Title Banner with Source Code / GitHub Action Button */}
          <div className="space-y-3 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#EAEAEA] tracking-tight">
                {renderedProject.name}
              </h2>

              {/* GitHub Repository Action Button with subtle border and tactile hover */}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-gray-300 hover:text-white text-xs font-mono transition-all duration-150 shrink-0 group"
                  title="View GitHub Repository"
                  aria-label="View GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="font-sans text-xs">Source</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C59458] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              {renderedProject.subtitle}
            </p>

            <p className="font-sans text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-3xl pt-1">
              {renderedProject.globalView?.overviewParagraph || renderedProject.description}
            </p>
          </div>

          {/* Benchmark Metrics - Clean Minimal Typography & Unified Colors */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 pb-8 border-b border-white/[0.06]">
            <div className="space-y-1">
              <span className="text-xs font-sans text-gray-400 uppercase tracking-widest block font-medium">
                Latency Profile
              </span>
              <span className="text-lg sm:text-xl font-mono font-semibold text-[#EAEAEA] block whitespace-nowrap">
                {renderedProject.metrics.latency}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-sans text-gray-400 uppercase tracking-widest block font-medium">
                Throughput Peak
              </span>
              <span className="text-lg sm:text-xl font-mono font-semibold text-[#EAEAEA] block whitespace-nowrap">
                {renderedProject.metrics.throughput}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-sans text-gray-400 uppercase tracking-widest block font-medium">
                Memory Footprint
              </span>
              <span className="text-lg sm:text-xl font-mono font-semibold text-[#EAEAEA] block whitespace-nowrap">
                {renderedProject.metrics.memory}
              </span>
            </div>
          </div>

          {/* Editorial Section: SYSTEM ARCHITECTURE & LAYERS */}
          <div className="space-y-6">
            <div className="text-xs font-mono tracking-[0.2em] text-[#8C8C8C] uppercase font-medium">
              SYSTEM ARCHITECTURE &amp; LAYERS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* 1. Left Column: Purely Typographic Sticky Table of Contents */}
              <div className="md:col-span-4 space-y-1.5 md:sticky md:top-24">
                {/* System Overview Row */}
                <button
                  onClick={() => onSelectLayer(null)}
                  className={`w-full text-left py-2.5 pl-3 border-l cursor-pointer bg-transparent transition-colors duration-100 ${
                    selectedLayerId === null
                      ? 'border-[#C59458] text-[#EAEAEA] font-medium'
                      : 'border-transparent text-[#8C8C8C] hover:text-[#C4C4C8]'
                  }`}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs font-mono text-[#C59458] shrink-0">00</span>
                    <span className="text-sm font-sans">System Overview</span>
                  </div>
                </button>

                {/* Individual Layer Rows */}
                {renderedProject.layers.map((layer, idx) => {
                  const isSelected = selectedLayerId === layer.id;
                  const layerNum = `L${idx + 1}`;

                  return (
                    <button
                      key={layer.id}
                      onClick={() => onSelectLayer(layer.id)}
                      className={`w-full text-left py-2.5 pl-3 border-l cursor-pointer bg-transparent transition-colors duration-100 ${
                        isSelected
                          ? 'border-[#C59458] text-[#EAEAEA] font-medium'
                          : 'border-transparent text-[#8C8C8C] hover:text-[#C4C4C8]'
                      }`}
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-xs font-mono text-[#C59458] shrink-0">{layerNum}</span>
                        <span className="text-sm font-sans leading-snug">{layer.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 2. Right Column: The Narrative Detail (Directly on Glassmorphism with Smooth 180ms Cross-Fade) */}
              <div
                key={selectedLayerId || 'global-overview'}
                className="md:col-span-8 animate-cross-fade space-y-10 min-h-[280px]"
              >
                {selectedLayerId === null || !currentLayer ? (
                  /* Global System Narrative */
                  <>
                    {/* The Problem */}
                    <div>
                      <div className="text-xs font-mono tracking-[0.2em] text-[#C59458] uppercase font-semibold mb-2">
                        THE PROBLEM
                      </div>
                      <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                        {renderedProject.globalView?.problemStatement ||
                          'Traditional approaches bottleneck under high-concurrency workloads due to memory serialization and lock contention.'}
                      </p>
                    </div>

                    {/* Architectural Rationale */}
                    <div>
                      <div className="text-xs font-mono tracking-[0.2em] text-[#C59458] uppercase font-semibold mb-2">
                        ARCHITECTURAL RATIONALE
                      </div>
                      <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                        {renderedProject.globalView?.architecturalSolution ||
                          renderedProject.globalView?.overviewParagraph ||
                          renderedProject.description}
                      </p>
                    </div>

                    {/* Workload Baseline */}
                    {renderedProject.globalView?.benchmarksWorkload && (
                      <div>
                        <div className="text-xs font-mono tracking-[0.2em] text-[#C59458] uppercase font-semibold mb-2">
                          BENCHMARK WORKLOAD &amp; HARDWARE BASELINE
                        </div>
                        <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                          {renderedProject.globalView.benchmarksWorkload}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  /* Layer-Specific Deep Dive Narrative */
                  <>
                    {/* Subsystem Overview */}
                    <div>
                      <div className="text-xs font-mono tracking-[0.2em] text-[#C59458] uppercase font-semibold mb-2">
                        SUBSYSTEM CONTEXT
                      </div>
                      <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                        {currentLayer.description}
                      </p>
                    </div>

                    {/* Architectural Rationale */}
                    <div>
                      <div className="text-xs font-mono tracking-[0.2em] text-[#C59458] uppercase font-semibold mb-2">
                        ARCHITECTURAL RATIONALE
                      </div>
                      <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                        {currentLayer.architectureRationale}
                      </p>
                    </div>

                    {/* Protocols & Invariants */}
                    <div>
                      <div className="text-xs font-mono tracking-[0.2em] text-[#C59458] uppercase font-semibold mb-2">
                        PROTOCOLS &amp; LATENCY INVARIANTS
                      </div>
                      <p className="font-mono text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        {currentLayer.protocols.join(' • ')} • Latency: {currentLayer.latency} • Throughput: {currentLayer.throughput}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 3. The Tech Stack: Technical Index with Interpuncts & Spacing Buffer */}
          <div className="pt-8 pb-28 sm:pb-32 border-t border-white/[0.05] space-y-2">
            <div className="text-xs font-mono tracking-[0.2em] text-[#8C8C8C] uppercase font-medium">
              TECHNICAL INVARIANTS &amp; TOOLING
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              {renderedProject.techTags.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

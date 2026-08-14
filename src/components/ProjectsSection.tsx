import React, { useState } from 'react';
import { Project } from '../types';
import { ProjectRowCard } from './ProjectRowCard';
import { CssStackedCanvas } from './CssStackedCanvas';
import { LayerInspector } from './LayerInspector';
import { GlobalProjectInspector } from './GlobalProjectInspector';
import { Layers, X, Filter } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  activeProject: Project | null;
  selectedLayerId: string | null;
  onSelectProject: (project: Project) => void;
  onCloseProject: () => void;
  onSelectLayer: (layerId: string | null) => void;
  onSelectNextLayer: () => void;
  onSelectPrevLayer: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  activeProject,
  selectedLayerId,
  onSelectProject,
  onCloseProject,
  onSelectLayer,
  onSelectNextLayer,
  onSelectPrevLayer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'SYSTEMS & GPU', 'DISTRIBUTED', 'FULL STACK'];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'SYSTEMS & GPU') {
      return p.category.toUpperCase().includes('GPU') || p.category.toUpperCase().includes('KERNEL') || p.category.toUpperCase().includes('SYSTEM');
    }
    if (selectedFilter === 'DISTRIBUTED') {
      return p.category.toUpperCase().includes('DISTRIBUTED') || p.category.toUpperCase().includes('STORAGE') || p.category.toUpperCase().includes('CONSENSUS');
    }
    if (selectedFilter === 'FULL STACK') {
      return p.category.toUpperCase().includes('BACKEND') || p.category.toUpperCase().includes('FULL') || p.category.toUpperCase().includes('APPLICATION');
    }
    return true;
  });

  const currentLayer = activeProject
    ? activeProject.layers.find((l) => l.id === selectedLayerId) || activeProject.layers[0]
    : null;
  const currentLayerIndex = activeProject
    ? activeProject.layers.findIndex((l) => l.id === selectedLayerId)
    : -1;

  return (
    <section id="architecture-lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Section Header with Category Filters */}
      <div className="border-b border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-slate-400 font-medium mb-1.5 flex items-center gap-2 tracking-wider">
            <Layers className="w-3.5 h-3.5 text-slate-300" />
            <span>01 // ARCHITECTURE &amp; SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Projects
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-white text-black font-semibold border-white shadow-sm'
                  : 'bg-[#0E1017] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Spec List */}
      <div className="space-y-3.5">
        {filteredProjects.map((p, idx) => (
          <ProjectRowCard
            key={p.id}
            project={p}
            index={idx}
            isSelected={p.id === activeProject?.id}
            onSelect={onSelectProject}
          />
        ))}
      </div>

      {/* Expanded Interactive System Architecture Workbench */}
      {activeProject && (
        <div id="project-inspector-workspace" className="pt-8 space-y-6 border-t border-white/[0.08] transition-all duration-300">
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#0E1017] border border-white/10 rounded-xl font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-500">INSPECTING SPEC:</span>
              <span className="text-white font-bold tracking-wide uppercase">{activeProject.name}</span>
              <span className="text-slate-600 hidden sm:inline">//</span>
              <span className="text-amber-200/90 font-medium hidden sm:inline">{activeProject.subtitle}</span>
            </div>
            <button
              onClick={onCloseProject}
              className="btn-subtle text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>CLOSE SPEC</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Canvas Column */}
            <div className="lg:col-span-7 flex flex-col">
              <CssStackedCanvas
                project={activeProject}
                selectedLayerId={selectedLayerId}
                onSelectLayer={onSelectLayer}
              />
            </div>

            {/* Right Inspector Column */}
            <div className="lg:col-span-5 flex flex-col">
              {selectedLayerId !== null && currentLayer ? (
                <LayerInspector
                  layer={currentLayer}
                  totalLayers={activeProject.layers.length}
                  currentIndex={currentLayerIndex >= 0 ? currentLayerIndex : 0}
                  onSelectNext={onSelectNextLayer}
                  onSelectPrev={onSelectPrevLayer}
                  onReturnToGlobal={() => onSelectLayer(null)}
                />
              ) : (
                <GlobalProjectInspector
                  project={activeProject}
                  onSelectLayer={onSelectLayer}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

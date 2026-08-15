import React from 'react';
import { Project } from '../types';
import { ProjectEditorialCard } from './ProjectEditorialCard';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  return (
    <section id="architecture-lab" className="py-20 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="border-b border-white/[0.08] pb-6 flex items-baseline justify-between gap-6">
        <div>
          <div className="text-xs font-mono mb-1.5 flex items-center gap-2 tracking-wider uppercase">
            <span className="text-[#B58E62] font-semibold">01</span>
            <span className="text-gray-500">• ARCHITECTURE &amp; SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif-display text-[#EAEAEA] tracking-tight">
            Projects
          </h2>
        </div>
      </div>

      {/* The Collapsed View: The Editorial Grid (2-Column Architecture Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 lg:gap-16">
        {projects.map((p, idx) => (
          <ProjectEditorialCard
            key={p.id}
            project={p}
            index={idx}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};

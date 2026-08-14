import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectGridCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: (p: Project) => void;
}

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({
  project,
  isSelected,
  onSelect,
}) => {
  const repoUrl = project.globalView?.deploymentStack?.repoUrl;

  return (
    <div
      onClick={() => onSelect(project)}
      className={`glass-panel glass-panel-hover rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all duration-250 relative group ${
        isSelected
          ? 'border-white/40 bg-[#141824] ring-1 ring-white/20 shadow-2xl shadow-black/80'
          : 'hover:border-white/20'
      }`}
    >
      {/* Blueprint Image Preview Container */}
      <div className="relative h-40 bg-[#090A0E] border-b border-white/[0.06] overflow-hidden">
        <img
          src={project.blueprintImage}
          alt={project.name}
          className="w-full h-full object-cover opacity-35 mix-blend-luminosity group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-[#0E1017]/40 to-transparent" />

        {/* Top Badges overlay on image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase bg-[#090A0E]/90 text-slate-300 px-2 py-0.5 rounded border border-white/10 tracking-wider">
            {project.category}
          </span>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 bg-[#090A0E]/90 hover:bg-white/10 text-slate-300 hover:text-white rounded-md border border-white/10 hover:border-white/20 transition flex items-center gap-1 shadow-sm"
              title="View Source Repository on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-slate-200" />
            </a>
          )}
        </div>

        <div className="absolute bottom-2.5 right-3 flex items-center justify-end">
          <span className="text-[10px] font-mono text-slate-400 bg-[#090A0E]/90 px-2 py-0.5 rounded border border-white/10">
            {project.primaryLanguage}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-base font-bold font-heading text-white tracking-tight flex items-center gap-1.5">
              <span>{project.name}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 transition shrink-0 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
            </h3>
          </div>
          <p className="text-[11px] font-mono text-amber-200/80 font-medium mb-2">
            {project.subtitle}
          </p>
          <p className="text-xs font-sans text-slate-300/90 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Spec Snapshot Row */}
        <div className="pt-2 border-t border-white/[0.05] grid grid-cols-2 gap-2 font-mono text-[10px]">
          <div>
            <span className="text-slate-500 block">LATENCY</span>
            <span className="text-slate-200 font-semibold">{project.metrics.latency}</span>
          </div>
          <div>
            <span className="text-slate-500 block">THROUGHPUT</span>
            <span className="text-slate-200 font-semibold">{project.metrics.throughput}</span>
          </div>
        </div>
      </div>

      {/* Tags List */}
      <div className="bg-[#090A0E] border-t border-white/[0.06] px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono text-slate-400 no-scrollbar">
        {project.techTags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded text-slate-300 shrink-0">
            {tag}
          </span>
        ))}
        {project.techTags.length > 3 && (
          <span className="text-slate-500 shrink-0">+{project.techTags.length - 3}</span>
        )}
      </div>
    </div>
  );
};


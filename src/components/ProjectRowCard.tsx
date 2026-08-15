import React from 'react';
import { Project } from '../types';
import { Github, ArrowUpRight, Cpu, Zap, Activity } from 'lucide-react';

interface ProjectRowCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: (project: Project) => void;
  index: number;
}

export const ProjectRowCard: React.FC<ProjectRowCardProps> = ({
  project,
  isSelected,
  onSelect,
  index,
}) => {
  const repoUrl = project.globalView?.deploymentStack?.repoUrl;

  return (
    <div
      onClick={() => onSelect(project)}
      className={`glass-panel rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border relative group ${
        isSelected
          ? 'border-[#B58E62]/60 bg-[#28282D] ring-1 ring-[#B58E62]/30 shadow-2xl'
          : 'border-white/[0.07] bg-[#222226] hover:border-white/20 hover:bg-[#26262B]'
      }`}
    >
      <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Column: Number, Title, Subtitle & Description */}
        <div className="flex-1 space-y-2.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <span className="text-slate-500 font-semibold">0{index + 1}</span>
            <span className="text-slate-600">//</span>
            <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300 uppercase tracking-wider text-[10px]">
              {project.category}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[#B58E62] font-medium">
              {project.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-white tracking-tight group-hover:text-white transition">
              {project.name}
            </h3>
            <ArrowUpRight
              className={`w-4 h-4 transition ${
                isSelected ? 'text-[#B58E62] translate-x-0.5 -translate-y-0.5' : 'text-slate-500 group-hover:text-slate-300'
              }`}
            />
          </div>

          <p className="text-sm text-slate-300/90 font-sans leading-relaxed line-clamp-2 max-w-3xl">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#18181B] border border-white/[0.08] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Spec Readouts & Quick Actions */}
        <div className="flex flex-row md:flex-col items-end justify-between md:justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/[0.06] pt-4 md:pt-0 md:pl-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 text-right font-mono">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">LATENCY</span>
              <span className="text-sm font-semibold text-slate-200">{project.metrics.latency}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">THROUGHPUT</span>
              <span className="text-sm font-semibold text-slate-200">{project.metrics.throughput}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-subtle p-2 text-xs flex items-center gap-1.5"
                title="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'btn-secondary'
              }`}
            >
              {isSelected ? 'Viewing Spec' : 'Inspect Spec →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

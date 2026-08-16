import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectEditorialCardProps {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

export const ProjectEditorialCard: React.FC<ProjectEditorialCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const chapterFormatted = `0${index + 1}`;

  return (
    <div
      onClick={() => onSelect(project)}
      className="group cursor-pointer flex flex-col select-none transition-all duration-300"
    >
      {/* Visual Anchor: Large, Perfect 1:1 Squircle with Generously Rounded Corners */}
      <div className="relative w-full aspect-square rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#222226] border-0 mb-5 sm:mb-6 shadow-xl shadow-black/40 transition-all duration-300">
        {/* Abstract Technical Background Imagery */}
        <img
          src={project.blueprintImage}
          alt={project.name}
          className="w-full h-full object-cover object-center brightness-95 contrast-105 transition-all duration-500 ease-out group-hover:brightness-[0.82] group-hover:contrast-110"
        />

        {/* Minimal Vignette & Tone Overlay for Physical Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/85 via-transparent to-[#18181B]/40 pointer-events-none" />

        {/* Floating Top Invariants & Category Indicator */}
        <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 right-3.5 sm:right-5 flex items-center justify-between gap-2 pointer-events-none">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full bg-[#18181B]/85 backdrop-blur-md text-[#EAEAEA] border border-white/10 shadow-sm truncate max-w-[65%]">
            {project.category}
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-1 rounded-full bg-[#18181B]/85 backdrop-blur-md text-[#C59458] border border-white/10 font-semibold shadow-sm shrink-0">
            {project.primaryLanguage}
          </span>
        </div>

        {/* Bottom Spec Badge Floating in Squircle - Responsive Grid / Flex Wrap for Clean Mobile Display */}
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-[#EAEAEA]/80 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#18181B]/90 backdrop-blur-md border border-white/10 whitespace-nowrap min-w-0 max-w-[48%] sm:max-w-none">
            <span className="text-gray-400 text-[9px] sm:text-[10px]">LATENCY</span>
            <span className="font-semibold text-white truncate">{project.metrics.latency}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#18181B]/90 backdrop-blur-md border border-white/10 whitespace-nowrap min-w-0 max-w-[48%] sm:max-w-none">
            <span className="text-gray-400 text-[9px] sm:text-[10px]">THROUGHPUT</span>
            <span className="font-semibold text-white truncate">{project.metrics.throughput}</span>
          </div>
        </div>
      </div>

      {/* Typography: Title + Chapter Marker & Single Legible Sentence */}
      <div className="space-y-2 px-1">
        {/* Title Row with Elegant Serif Name + Chapter Number */}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#EAEAEA] tracking-tight transition-colors duration-300 group-hover:text-[#C59458] flex items-center gap-2">
            <span>{project.name}</span>
            <ArrowUpRight className="w-5 h-5 text-[#C59458] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          
          <span className="font-mono text-sm sm:text-base font-semibold text-[#C59458] shrink-0 tracking-wider">
            {chapterFormatted}
          </span>
        </div>

        {/* Single, Highly Legible Sans-Serif Sentence */}
        <p className="font-sans text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-normal">
          {project.tagline || project.subtitle}
        </p>
      </div>
    </div>
  );
};

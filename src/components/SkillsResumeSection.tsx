import React from 'react';
import { Download, Github, Linkedin, Code2, ArrowUpRight, Terminal } from 'lucide-react';
import {
  DOSSIER_PROFILE_LINKS,
  DOSSIER_CATEGORIES,
  DEVELOPER_TOOLING,
  RESUME_FILE_PATH,
} from '../data/skills_manifest';
import { ToolIcon } from './ToolIcon';

export const SkillsResumeSection: React.FC = () => {
  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-4 h-4 text-gray-400 group-hover:text-[#EAEAEA] transition-colors duration-200" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-[#EAEAEA] transition-colors duration-200" />;
      case 'leetcode':
        return <Code2 className="w-4 h-4 text-gray-400 group-hover:text-[#EAEAEA] transition-colors duration-200" />;
      default:
        return null;
    }
  };

  return (
    <section id="profile-skills-resume" className="py-16 sm:py-20 scroll-mt-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* 1. Header Anchor & Title */}
      <div className="mb-8">
        <div className="text-[#C59458] text-xs font-mono tracking-[0.2em] uppercase mb-2 font-medium">
          04 • TECHNICAL DOSSIER &amp; TOOLING
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#EAEAEA] tracking-tight">
          Skills &amp; Environment
        </h2>
      </div>

      {/* 2. Profile Action Bar Framing */}
      <div className="border-t border-b border-white/10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Profile Link Group (Left Flank) with Icons */}
        <div className="flex items-center flex-wrap gap-6 sm:gap-8 text-sm font-mono text-gray-400">
          {DOSSIER_PROFILE_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#EAEAEA] transition-colors duration-200 group"
            >
              {getPlatformIcon(link.iconType)}
              <span>{link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#C59458] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </a>
          ))}
        </div>

        {/* CV Download Action (Right Flank) - Metallic Darken on Hover, Zero Glow, Grounded */}
        <div>
          <a
            href={RESUME_FILE_PATH}
            download={RESUME_FILE_PATH.startsWith('http') ? undefined : 'Ritwik_Gupta_Resume.pdf'}
            target={RESUME_FILE_PATH.startsWith('http') ? '_blank' : undefined}
            rel={RESUME_FILE_PATH.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C59458] hover:bg-[#A27339] text-[#121214] text-xs font-mono font-semibold rounded border border-white/10 transition-colors duration-200 cursor-pointer shrink-0 group"
          >
            <span>Download CV</span>
            <Download className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-200" />
          </a>
        </div>
      </div>

      {/* 3. The 6-Category Architectural Spec Grid */}
      <div className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {DOSSIER_CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-4">
              {/* Category Header */}
              <span className="text-xs font-mono tracking-widest text-[#C59458] uppercase block font-medium">
                {category.title}
              </span>

              {/* Vertical Item Stacking */}
              <ul className="space-y-2.5">
                {category.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="font-sans text-sm sm:text-[15px] text-gray-300 font-light leading-relaxed hover:text-[#EAEAEA] transition-colors duration-150"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Architectural Shelf: Developer Tooling & Workflow (Quiet Luxury Stream) */}
      <div className="border-t border-white/5 border-b border-white/10 py-6">
        {/* Header Eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase font-semibold text-[#B58E62]">
            <span>&gt;_</span>
            <span>DEVELOPER TOOLING &amp; WORKFLOW</span>
          </div>
        </div>

        {/* Masked Marquee Conveyor with Muted Monochromatic Stream & Subtle Hover Illumination */}
        <div className="relative overflow-hidden w-full mask-marquee-edges group py-2">
          <div className="animate-marquee-belt flex items-center">
            {/* Track Loop 1 */}
            {DEVELOPER_TOOLING.map((tool, idx) => (
              <div key={`tool-1-${idx}`} className="inline-flex items-center shrink-0">
                <div className="inline-flex items-center gap-3 cursor-default shrink-0 group/item transition-colors duration-300 ease-out">
                  <span className="text-zinc-500 opacity-60 group-hover/item:opacity-100 group-hover/item:text-[#B58E62] transition-all duration-300 ease-out shrink-0 flex items-center justify-center">
                    <ToolIcon id={tool.iconId} className="w-5 h-5" />
                  </span>
                  <span className="font-sans font-medium text-sm sm:text-base tracking-normal text-zinc-500 group-hover/item:text-[#EAEAEA] transition-colors duration-300 ease-out whitespace-nowrap">
                    {tool.name}
                  </span>
                </div>
                <span className="mx-6 sm:mx-8 text-white/[0.08] select-none font-mono text-xs">•</span>
              </div>
            ))}

            {/* Track Loop 2 for continuous seamless loop */}
            {DEVELOPER_TOOLING.map((tool, idx) => (
              <div key={`tool-2-${idx}`} className="inline-flex items-center shrink-0">
                <div className="inline-flex items-center gap-3 cursor-default shrink-0 group/item transition-colors duration-300 ease-out">
                  <span className="text-zinc-500 opacity-60 group-hover/item:opacity-100 group-hover/item:text-[#B58E62] transition-all duration-300 ease-out shrink-0 flex items-center justify-center">
                    <ToolIcon id={tool.iconId} className="w-5 h-5" />
                  </span>
                  <span className="font-sans font-medium text-sm sm:text-base tracking-normal text-zinc-500 group-hover/item:text-[#EAEAEA] transition-colors duration-300 ease-out whitespace-nowrap">
                    {tool.name}
                  </span>
                </div>
                <span className="mx-6 sm:mx-8 text-white/[0.08] select-none font-mono text-xs">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

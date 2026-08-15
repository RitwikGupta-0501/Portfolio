import React from 'react';
import { Download, Github, Linkedin, Code2, ArrowUpRight } from 'lucide-react';
import {
  DOSSIER_PROFILE_LINKS,
  DOSSIER_CATEGORIES,
  RESUME_FILE_PATH,
} from '../data/skills_manifest';

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
    <section id="profile-skills-resume" className="max-w-7xl mx-auto px-6 md:px-12 py-24 sm:py-32">
      {/* 1. Header Anchor & Title */}
      <div className="mb-8">
        <span className="text-[#C59458] text-xs tracking-[0.2em] font-medium uppercase font-mono mb-2 block">
          04 • TECHNICAL DOSSIER &amp; TOOLING
        </span>
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
            download="Ritwik_Gupta_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C59458] hover:bg-[#A27339] text-[#121214] text-xs font-mono font-semibold rounded border border-white/10 transition-colors duration-200 cursor-pointer shrink-0 group"
          >
            <span>Download CV</span>
            <Download className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-200" />
          </a>
        </div>
      </div>

      {/* 3. The 4-Column Architectural Spec Grid */}
      <div className="border-b border-white/10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
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
    </section>
  );
};

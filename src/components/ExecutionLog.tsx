import React from 'react';
import { EXPERIENCE_MANIFEST } from '../data/experience_manifest';

export const ExecutionLog: React.FC = () => {
  return (
    <section id="experience-log" className="py-16 sm:py-20 scroll-mt-20 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Section Header & Total Metric Badge */}
      <div className="mb-12 border-b border-white/[0.06] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {/* Eyebrow in Tracked-Out Metallic Brass */}
          <div className="text-[#C59458] text-xs font-mono tracking-[0.2em] uppercase mb-2 font-medium">
            03 • CAREER TIMELINE
          </div>
          {/* Title in Serif Font */}
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#EAEAEA] tracking-tight">
            Work Experience
          </h2>
        </div>

        {/* Soft Slate Monospace Total Metric Badge */}
        <div className="font-mono text-xs text-gray-500 tracking-wider">
          {EXPERIENCE_MANIFEST.totalSummary}
        </div>
      </div>

      {/* The Architectural 2-Column Ledger */}
      <div className="flex flex-col">
        {EXPERIENCE_MANIFEST.items.map((exp) => (
          <div
            key={exp.id}
            className="border-b border-white/5 py-9 sm:py-10 first:pt-0 last:border-b-0 flex flex-col md:flex-row gap-6 md:gap-12 group"
          >
            {/* Left Column (Timeline Metadata, ~25% width) */}
            <div className="w-full md:w-1/4 shrink-0 space-y-1">
              <div className="font-mono text-sm sm:text-base text-[#EAEAEA] font-medium tracking-wide">
                {exp.period}
              </div>
              <div className="text-xs font-mono text-gray-500 tracking-wider uppercase">
                {exp.type}
              </div>
            </div>

            {/* Right Column (The Engineering Record, ~75% width) */}
            <div className="w-full md:w-3/4 space-y-4">
              {/* Role Title & Company Name */}
              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#EAEAEA] tracking-tight group-hover:text-[#C59458] transition-colors duration-300">
                  {exp.role}
                </h3>
                <div className="text-[#C59458] text-sm font-medium tracking-wide mt-1 font-sans">
                  {exp.company}
                </div>
              </div>

              {/* High-Level Summary */}
              <p className="text-gray-300 text-base leading-relaxed font-light">
                {exp.description}
              </p>

              {/* Key Deliverables (Simple, Indented Bullet Points) */}
              <ul className="space-y-2.5 pt-1 text-sm sm:text-base text-gray-300 font-light leading-relaxed list-disc list-outside pl-4 marker:text-[#C59458]">
                {exp.achievements.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Domain & Stack Footer (Understated inline list separated by interpuncts) */}
              <div className="pt-3">
                <p className="text-xs font-mono text-gray-400 tracking-wide leading-relaxed">
                  {exp.skills.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

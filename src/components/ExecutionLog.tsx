import React, { useState } from 'react';
import { EXPERIENCE_MANIFEST } from '../data/experience_manifest';
import { Briefcase, Calendar, CheckCircle2, ChevronDown, ChevronUp, Terminal, Shield } from 'lucide-react';

export const ExecutionLog: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('exp-1');

  return (
    <section id="experience-log" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 border-b border-white/[0.08] pb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-slate-400 font-medium mb-1.5 flex items-center gap-2 tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-slate-300" />
            <span>03 // CAREER TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Work Experience
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 hidden sm:block">
          {EXPERIENCE_MANIFEST.totalSummary}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-white/[0.1] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-8">
        {EXPERIENCE_MANIFEST.items.map((exp) => {
          const isExpanded = expandedId === exp.id;

          return (
            <div key={exp.id} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-2.5 w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                  isExpanded
                    ? 'bg-[#B58E62] border-[#B58E62] shadow-[0_0_8px_rgba(181,142,98,0.6)]'
                    : 'bg-[#1A1A1D] border-white/20 group-hover:border-white/60'
                }`}
              />

              {/* Glass Card */}
              <div className="glass-panel glass-panel-hover rounded-xl border border-white/[0.08] p-5 sm:p-6 transition-all duration-200 bg-[#222226]">
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                  className="flex flex-wrap items-start justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-300">{exp.period}</span>
                      <span className="text-slate-600">//</span>
                      <span className="text-slate-400">{exp.type}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-mono text-[#B58E62] font-medium flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#B58E62]" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <button className="btn-subtle px-2.5 py-1.5 text-xs font-mono flex items-center gap-1.5">
                    <span>{isExpanded ? 'COLLAPSE' : 'EXPAND DETAILS'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-4">
                  {exp.description}
                </p>

                {/* Achievements & Skills List */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-4">
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase mb-2.5 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#B58E62]" />
                        KEY ARCHITECTURAL DELIVERABLES:
                      </h4>
                      <ul className="space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
                        {exp.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B58E62] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase mb-2">
                        STACK & DOMAINS:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-[#18181B] border border-white/[0.08] text-slate-300 text-xs font-mono rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Project } from '../types';
import { Cpu, HardDrive, Zap, ExternalLink, ShieldCheck, FileText, Github, CheckCircle2, AlertTriangle } from 'lucide-react';

interface GlobalProjectInspectorProps {
  project: Project;
  onSelectLayer: (layerId: string) => void;
}

export const GlobalProjectInspector: React.FC<GlobalProjectInspectorProps> = ({
  project,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'benchmarks' | 'deployment'>('overview');

  const gv = project.globalView;

  return (
    <div className="glass-panel rounded-xl p-5 md:p-6 border border-white/10 text-slate-200 flex flex-col h-full shadow-2xl">
      {/* Header Info */}
      <div className="pb-4 border-b border-white/[0.08] mb-4">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] font-mono tracking-widest text-amber-200/90 uppercase bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
            SYSTEM ARCHITECTURE SPEC
          </span>
          <div className="flex items-center gap-2">
            {gv?.deploymentStack?.repoUrl && (
              <a
                href={gv.deploymentStack.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-[11px] font-mono px-2.5 py-1 flex items-center gap-1.5 rounded-md transition"
                title="View Source Repository on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}
          </div>
        </div>
        <h3 className="text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
          {project.name}
        </h3>
        <p className="text-xs font-mono text-slate-400 mt-1">
          {project.subtitle}
        </p>
      </div>

      {/* Pages / Tabs Switcher */}
      <div className="flex border-b border-white/[0.08] mb-5 font-mono text-xs gap-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 border-b-2 font-medium transition ${
            activeTab === 'overview'
              ? 'border-white text-white font-bold bg-white/[0.03]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-3 py-2 border-b-2 font-medium transition ${
            activeTab === 'benchmarks'
              ? 'border-white text-white font-bold bg-white/[0.03]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Benchmarks
        </button>

        <button
          onClick={() => setActiveTab('deployment')}
          className={`px-3 py-2 border-b-2 font-medium transition ${
            activeTab === 'deployment'
              ? 'border-white text-white font-bold bg-white/[0.03]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Tech Stack
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* VIEW 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* The What and Why Paragraph */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-300" />
                SYSTEM SUMMARY & ARCHITECTURE GOALS
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-sans bg-[#090A0E] p-4 rounded-xl border border-white/[0.07]">
                {gv?.overviewParagraph || project.description}
              </p>
            </div>

            {/* Problem & Solution Breakdown */}
            {gv?.problemStatement && (
              <div className="grid grid-cols-1 gap-3 font-mono text-xs">
                <div className="bg-[#090A0E] border-l-2 border-amber-400/80 p-3.5 rounded-r-lg border-y border-r border-white/[0.05]">
                  <span className="text-amber-200 font-semibold uppercase text-[10px] tracking-wider block mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-300" />
                    THE PROBLEM
                  </span>
                  <p className="text-slate-300 font-sans leading-normal">
                    {gv.problemStatement}
                  </p>
                </div>

                <div className="bg-[#090A0E] border-l-2 border-slate-300 p-3.5 rounded-r-lg border-y border-r border-white/[0.05]">
                  <span className="text-slate-200 font-semibold uppercase text-[10px] tracking-wider block mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-slate-300" />
                    THE ARCHITECTURAL SOLUTION
                  </span>
                  <p className="text-slate-300 font-sans leading-normal">
                    {gv.architecturalSolution}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: BENCHMARKS */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-5">
            {/* Workload baseline info */}
            <div className="bg-[#090A0E] p-3.5 rounded-xl border border-white/[0.07] font-mono text-xs">
              <span className="text-[10px] uppercase text-slate-500 tracking-wider block mb-1">
                BENCHMARK WORKLOAD & HARDWARE BASELINE
              </span>
              <p className="text-slate-200 font-medium">
                {gv?.benchmarksWorkload || 'Standard Low-Latency System Benchmarks'}
              </p>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              {gv?.benchmarksList ? (
                gv.benchmarksList.map((bm, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border bg-[#090A0E] transition ${
                      bm.highlight
                        ? 'border-white/25 shadow-lg shadow-black/50'
                        : 'border-white/[0.07]'
                    }`}
                  >
                    <div className="text-slate-400 text-[10px] uppercase font-semibold tracking-wider mb-1 flex items-center justify-between">
                      <span>{bm.label}</span>
                      {bm.highlight && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-white/10 text-white rounded border border-white/20">
                          PEAK
                        </span>
                      )}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-white tracking-tight my-1">
                      {bm.value}
                    </div>
                    {bm.subtext && (
                      <p className="text-[11px] text-slate-400 font-sans leading-snug">
                        {bm.subtext}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className="p-3.5 rounded-xl border border-white/[0.07] bg-[#090A0E]">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Latency</div>
                    <div className="text-xl font-bold text-white my-1">{project.metrics.latency}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/[0.07] bg-[#090A0E]">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Throughput</div>
                    <div className="text-xl font-bold text-white my-1">{project.metrics.throughput}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: DEPLOYMENT */}
        {activeTab === 'deployment' && (
          <div className="space-y-4 font-mono text-xs">
            {/* Core Systems & Build */}
            {gv?.deploymentStack ? (
              <>
                <div className="bg-[#090A0E] p-4 rounded-xl border border-white/[0.07] space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    CORE SYSTEMS & ENVIRONMENT
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 font-sans">
                    {gv.deploymentStack.coreSystems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#090A0E] p-4 rounded-xl border border-white/[0.07] space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-slate-400" />
                    BUILD & VALIDATION TOOLING
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 font-sans">
                    {gv.deploymentStack.buildValidation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#090A0E] p-4 rounded-xl border border-white/[0.07] space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                    LOW-LEVEL LIBRARIES & INTEROP
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 font-sans">
                    {gv.deploymentStack.libraries.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-[#090A0E] p-4 rounded-xl border border-white/[0.07]">
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                  System Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techTags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-[#141720] border border-white/10 text-slate-200 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer prompt */}
      <div className="pt-3 border-t border-white/[0.06] mt-4 text-slate-500 font-mono text-[11px] flex items-center justify-between">
        <span>Click any layer on the left to inspect architectural tradeoffs.</span>
      </div>
    </div>
  );
};

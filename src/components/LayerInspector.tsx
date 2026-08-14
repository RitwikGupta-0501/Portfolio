import React from 'react';
import { ArchLayer } from '../types';
import { ShieldCheck, ArrowLeft, Cpu, Activity } from 'lucide-react';

interface LayerInspectorProps {
  layer: ArchLayer;
  totalLayers: number;
  currentIndex: number;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  onReturnToGlobal: () => void;
}

export const LayerInspector: React.FC<LayerInspectorProps> = ({
  layer,
  totalLayers,
  currentIndex,
  onSelectNext,
  onSelectPrev,
  onReturnToGlobal,
}) => {
  return (
    <div className="glass-panel rounded-xl p-5 md:p-6 border border-white/15 text-slate-200 flex flex-col h-full shadow-2xl relative transition-all duration-250">
      {/* Return to Global Context Button */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
        <button
          onClick={onReturnToGlobal}
          className="text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition"
          title="Return to Global Project Overview"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Spec</span>
          <span className="keycap text-[9px] ml-1">ESC</span>
        </button>

        {/* Layer Step Next / Prev Controls */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={onSelectPrev}
            className="btn-subtle px-2 py-1 text-[11px]"
          >
            PREV
          </button>
          <span className="px-1.5 py-0.5 text-slate-400 text-[11px]">
            {currentIndex + 1}/{totalLayers}
          </span>
          <button
            onClick={onSelectNext}
            className="btn-subtle px-2 py-1 text-[11px]"
          >
            NEXT
          </button>
        </div>
      </div>

      {/* Layer Header */}
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 bg-amber-400" />
          <span>{layer.name}</span>
        </h3>
        <p className="text-xs font-mono text-slate-400 mt-1">
          {layer.subtitle}
        </p>
      </div>

      {/* Single Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 font-sans text-xs">
        {/* Layer Description */}
        <div>
          <h4 className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Functional Overview
          </h4>
          <p className="text-slate-300 leading-relaxed font-sans text-sm">
            {layer.description}
          </p>
        </div>

        {/* Architectural Decision Rationale */}
        <div className="bg-[#090A0E] border-l-2 border-slate-400 p-3.5 rounded-r-lg border-y border-r border-white/[0.06]">
          <h4 className="text-[11px] font-mono font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
            DESIGN RATIONALE & TRADE-OFFS
          </h4>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            {layer.architectureRationale}
          </p>
        </div>

        {/* Tech Stack & Protocols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-[#090A0E] p-3 rounded-lg border border-white/[0.06]">
            <h4 className="text-[10px] font-mono font-semibold text-slate-400 uppercase mb-2 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-slate-400" />
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {layer.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-[#141720] border border-white/10 text-slate-200 text-[11px] font-mono rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#090A0E] p-3 rounded-lg border border-white/[0.06]">
            <h4 className="text-[10px] font-mono font-semibold text-slate-400 uppercase mb-2 flex items-center gap-1">
              <Activity className="w-3 h-3 text-slate-400" />
              Protocols & Interfaces
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {layer.protocols.map((proto) => (
                <span
                  key={proto}
                  className="px-2 py-0.5 bg-[#141720] border border-white/10 text-slate-200 text-[11px] font-mono rounded"
                >
                  {proto}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-white/[0.06] mt-3 flex items-center justify-between font-mono text-[11px] text-slate-500">
        <span>LAYER IDENTIFIER: {layer.id}</span>
        <button
          onClick={onReturnToGlobal}
          className="text-slate-400 hover:text-white transition"
        >
          Return to Overview
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Project } from '../types';
import { Layers } from 'lucide-react';

interface CssStackedCanvasProps {
  project: Project;
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string | null) => void;
}

export const CssStackedCanvas: React.FC<CssStackedCanvasProps> = ({
  project,
  selectedLayerId,
  onSelectLayer,
}) => {
  return (
    <div className="w-full h-full min-h-[450px] bg-[#0A0C11] border border-white/[0.08] rounded-xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Layers className="w-4 h-4 text-slate-300" />
          <span className="text-white font-bold">{project.name}</span>
          <span className="text-slate-500">// Architecture Layers</span>
        </div>
        {selectedLayerId && (
          <button
            onClick={() => onSelectLayer(null)}
            className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-slate-200 hover:bg-white/15 rounded border border-white/20 transition"
          >
            ← FULL OVERVIEW
          </button>
        )}
      </div>

      {/* Stacked Layers Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 gap-3 sm:gap-3.5 my-auto max-w-xl mx-auto w-full">
        {project.layers.map((layer, index) => {
          const isSelected = selectedLayerId === layer.id;

          return (
            <div
              key={layer.id}
              onClick={() => onSelectLayer(isSelected ? null : layer.id)}
              className={`w-full p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer relative flex items-center justify-between gap-4 font-mono ${
                isSelected
                  ? 'bg-[#141824] border-white/40 shadow-xl shadow-black/80 translate-x-1'
                  : 'bg-[#0E1017] border-white/[0.06] hover:border-white/20 hover:bg-[#12151F]'
              }`}
            >
              {/* Left Title */}
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    L{index + 1} // {layer.category}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {layer.name}
                  </div>
                </div>
              </div>

              {/* Right Metrics & Badge */}
              <div className="flex items-center gap-2 shrink-0 text-right">
                <div className="hidden xs:block text-[11px] text-slate-400">
                  <span className="text-slate-500">LAT:</span> {layer.latency}
                </div>
                {isSelected ? (
                  <span className="px-2 py-0.5 bg-white/10 text-white border border-white/20 text-[10px] rounded">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-slate-600 text-xs">→</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-slate-500">
        <span className="text-[11px]">
          {selectedLayerId
            ? 'Click active layer again or [ ESC ] to return to Spec'
            : 'Select any layer to inspect architectural decisions'}
        </span>
        {selectedLayerId && (
          <button
            onClick={() => onSelectLayer(null)}
            className="text-[11px] text-slate-400 hover:text-white"
          >
            ← Return to Spec
          </button>
        )}
      </div>
    </div>
  );
};

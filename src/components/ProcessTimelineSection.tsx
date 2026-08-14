import React, { useState } from 'react';
import { Terminal, GitBranch, Cpu, ShieldCheck, Gauge, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProcessStep {
  phase: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  summary: string;
  methodologies: string[];
  deliverables: string;
  quote: string;
}

const ENGINEERING_PHASES: ProcessStep[] = [
  {
    phase: 'PHASE 01',
    number: '01',
    title: 'Mechanical Sympathy & Spec First',
    subtitle: 'Hardware Bounds & Memory Invariants',
    icon: <Cpu className="w-4 h-4 text-slate-300" />,
    summary:
      'Before writing a single line of implementation, I model the underlying hardware constraints. I identify cache hierarchy limits (L1/L2/L3), memory alignment requirements, lock contention risks, and PCIe/host-to-device bus bandwidth bottlenecks.',
    methodologies: [
      'Cache-line sizing (64-byte padding & false-sharing mitigation)',
      'Formal mathematical bounds on latency (p99/p99.9)',
      'Lock-free vs bounded ring buffer concurrency modeling',
      'Zero-copy memory layouts with explicit alignment invariants',
    ],
    deliverables: 'Formal Architecture RFC, Memory Budget Model, Hardware Invariant Spec',
    quote: '"Understand the physical machine first; high performance is never an afterthought."',
  },
  {
    phase: 'PHASE 02',
    number: '02',
    title: 'Core Engine & Kernel Architecture',
    subtitle: 'Isolated Low-Level Implementation',
    icon: <Terminal className="w-4 h-4 text-slate-300" />,
    summary:
      'I engineer the foundational core in modern C++, Rust, or CUDA kernels without framework abstraction overhead. Custom memory allocators (arena, pool, slab) are introduced early to eliminate runtime heap fragmentation.',
    methodologies: [
      'Custom memory allocators (Thread-local Arena & Slab)',
      'SIMD / AVX2 vectorization & warp-level CUDA intrinsics',
      'Asynchronous non-blocking I/O event loops (io_uring / epoll)',
      'Cache-conscious contiguous Struct of Arrays (SoA) layout',
    ],
    deliverables: 'Minimalist zero-dependency core engine, deterministic test harness',
    quote: '"Write small, modular kernels with clear ownership and zero implicit allocations."',
  },
  {
    phase: 'PHASE 03',
    number: '03',
    title: 'Consensus, Fault-Tolerance & State Safety',
    subtitle: 'Distributed Correctness & Recovery',
    icon: <ShieldCheck className="w-4 h-4 text-slate-300" />,
    summary:
      'For distributed and storage layers, correctness under partial failures is critical. I design strict consensus protocols (Raft, Paxos variants), deterministic write-ahead logging (WAL), and atomic snapshot restore cycles.',
    methodologies: [
      'Sequential Write-Ahead Log (WAL) with group commit sync',
      'Raft state machine replication with leader lease heartbeats',
      'Partition tolerance & split-brain fencing tokens',
      'Crash recovery idempotent replay verification',
    ],
    deliverables: 'Raft consensus cluster, WAL engine, cluster partition test suite',
    quote: '"Assume networks partition and nodes crash; design idempotent recovery from day one."',
  },
  {
    phase: 'PHASE 04',
    number: '04',
    title: 'Telemetry, Profiling & Micro-Benchmarking',
    subtitle: 'Perf, Flamegraphs & Stress Saturation',
    icon: <Gauge className="w-4 h-4 text-slate-300" />,
    summary:
      'I profile everything under synthetic load saturation. Using Linux perf, eBPF, Nsight Compute, and Criterion benchmarks, I eliminate hot paths, instruction pipeline stalls, and branch mispredictions.',
    methodologies: [
      'Linux perf + eBPF flamegraph profiling & cache miss counters',
      'NVIDIA Nsight Compute for GPU kernel occupancy and warp stalls',
      'Micro-benchmarks measuring clock cycles per operation (RDTSC)',
      'Fuzzing & fault-injection harness for edge case verification',
    ],
    deliverables: 'Reproducible benchmark harness, flamegraphs, optimization log',
    quote: '"Never guess what is slow. Let hardware instruction counters tell the truth."',
  },
];

export const ProcessTimelineSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = ENGINEERING_PHASES[activePhaseIndex];

  return (
    <section id="engineering-process" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="border-b border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-slate-400 font-medium mb-1.5 flex items-center gap-2 tracking-wider">
            <GitBranch className="w-3.5 h-3.5 text-slate-300" />
            <span>02 // ENGINEERING METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            How I Build Systems
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 max-w-md">
          A disciplined, hardware-conscious methodology for architecting low-latency backends, GPU kernels, and distributed state machines.
        </div>
      </div>

      {/* Process Interactive Timeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ENGINEERING_PHASES.map((phase, idx) => {
          const isActive = idx === activePhaseIndex;
          return (
            <button
              key={phase.number}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-4 sm:p-5 rounded-xl text-left transition-all border relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                isActive
                  ? 'bg-[#121622] border-white/30 ring-1 ring-white/20 shadow-xl'
                  : 'bg-[#0E1017] border-white/[0.07] hover:border-white/15 hover:bg-[#12141C]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className={`font-semibold ${isActive ? 'text-amber-300' : 'text-slate-500'}`}>
                    {phase.phase}
                  </span>
                  <span className="text-slate-600 font-mono text-xs">0{idx + 1}/04</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white font-heading leading-snug">
                  {phase.title}
                </h4>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 truncate">{phase.subtitle}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-1' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-[#0E1017] space-y-6">
        {/* Header of Active Phase */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-amber-200 font-medium">
                {activePhase.phase}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-mono text-xs">{activePhase.subtitle}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
              {activePhase.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 shrink-0">
            {activePhase.icon}
            <span>Phase {activePhase.number} Details</span>
          </div>
        </div>

        {/* Phase Summary & Philosophical Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base text-slate-300 leading-relaxed font-sans font-light">
              {activePhase.summary}
            </p>

            <div className="p-4 rounded-xl bg-[#090A0E] border border-white/[0.06] font-mono text-xs text-slate-300 italic">
              {activePhase.quote}
            </div>
          </div>

          {/* Key Methodologies & Deliverables */}
          <div className="lg:col-span-5 space-y-4 bg-[#090A0E] p-5 rounded-xl border border-white/[0.06]">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>CORE PRACTICES &amp; INVARIANTS</span>
            </div>

            <ul className="space-y-2.5">
              {activePhase.methodologies.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                  <span className="text-slate-500 mt-0.5">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/[0.06] text-xs font-mono">
              <span className="text-slate-500 block mb-1">TARGET ARTIFACTS:</span>
              <span className="text-slate-200 font-medium">{activePhase.deliverables}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

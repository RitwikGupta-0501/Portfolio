import { ExperienceItem } from '../types';

export interface ExperienceManifestConfig {
  totalSummary: string;
  items: ExperienceItem[];
}

export const EXPERIENCE_MANIFEST: ExperienceManifestConfig = {
  totalSummary: 'TOTAL EXPERIENCE: 7+ YEARS IN SYSTEMS & BACKEND ARCHITECTURE',
  items: [
    {
      id: 'exp-1',
      period: '2023 - PRESENT',
      role: 'Principal Systems & Infrastructure Architect',
      company: 'Apex High-Frequency Systems',
      type: 'Full-time',
      description: 'Architecting ultra-low latency distributed trading engines, custom Linux container execution runtimes, and GPU acceleration kernels.',
      achievements: [
        'Engineered WarpKV key-value store reducing p99 lookup latency from 1.2ms to 0.18ms via CUDA & PCIe DMA offloading.',
        'Designed kernel bypass DPDK networking pipeline handling 8.5 Million trades/second with sub-microsecond tick latency.',
        'Led infrastructure team migrating 450+ microservices to custom bare-metal eBPF Kubernetes nodes.'
      ],
      skills: ['C++20', 'CUDA', 'Rust', 'eBPF', 'DPDK', 'Distributed Systems', 'Linux Kernel']
    },
    {
      id: 'exp-2',
      period: '2020 - 2023',
      role: 'Senior Backend Systems Engineer',
      company: 'ScaleCloud Infrastructure Inc.',
      type: 'Full-time',
      description: 'Built distributed storage engines, Raft consensus consensus modules, and container orchestration operators.',
      achievements: [
        'Built custom Go/Rust Kubernetes operator for rootless micro-container sandboxes with sub-10ms boot times.',
        'Reduced memory footprint per node by 65% through custom jemalloc page allocators and SkipList memory arenas.',
        'Automated zero-downtime database snapshot synchronization across multi-region cloud deployment clusters.'
      ],
      skills: ['Go', 'Rust', 'Kubernetes CRD', 'Raft Consensus', 'RocksDB', 'gRPC']
    },
    {
      id: 'exp-3',
      period: '2017 - 2020',
      role: 'Infrastructure & Software Engineer',
      company: 'DataStream Platform Systems',
      type: 'Full-time',
      description: 'Focused on high-throughput event processing pipelines, memory-mapped I/O, and Linux socket tuning.',
      achievements: [
        'Optimized TCP memory socket buffers and epoll event loops for 500,000+ concurrent WebSocket streaming clients.',
        'Built automated CI/CD pipeline and integration benchmark suite measuring kernel syscall overhead.'
      ],
      skills: ['C++', 'Linux Systems', 'Socket Programming', 'Docker', 'Python']
    }
  ]
};

// Export shortcut for array access
export const CAREER_EXPERIENCE: ExperienceItem[] = EXPERIENCE_MANIFEST.items;

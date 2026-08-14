export interface Skill {
  name: string;
  isCore?: boolean;
  level?: 'Expert' | 'Advanced' | 'Proficient';
  experience?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconKey: 'cpu' | 'layers' | 'globe' | 'code';
  description: string;
  skills: Skill[];
}

export interface PlatformLink {
  name: string;
  handle: string;
  url: string;
  iconKey: 'github' | 'linkedin' | 'twitter' | 'mail';
}

export interface ResumeConfig {
  fileName: string;
  filePath: string;
  lastUpdated: string;
  email: string;
  candidateName: string;
  title: string;
  summary: string;
}

export const RESUME_CONFIG: ResumeConfig = {
  fileName: 'Ritwik_Gupta_Resume.pdf',
  filePath: '/Ritwik_Gupta_Resume.pdf',
  lastUpdated: 'August 2026',
  email: 'ritwikg.205@gmail.com',
  candidateName: 'Ritwik Gupta',
  title: 'Principal Systems & Software Engineer',
  summary: 'Systems engineer with 8+ years of experience designing low-latency C++/Rust services, memory lock-free algorithms, sharded Raft storage engines, and GPU compute pipelines.',
};

export const PLATFORM_LINKS: PlatformLink[] = [
  {
    name: 'GitHub',
    handle: '@RitwikGupta-0501',
    url: 'https://github.com/RitwikGupta-0501',
    iconKey: 'github',
  },
  {
    name: 'LinkedIn',
    handle: 'in/ritwikg',
    url: 'https://linkedin.com',
    iconKey: 'linkedin',
  },
  {
    name: 'X / Twitter',
    handle: '@ritwikg_arch',
    url: 'https://x.com',
    iconKey: 'twitter',
  },
  {
    name: 'Email Direct',
    handle: RESUME_CONFIG.email,
    url: `mailto:${RESUME_CONFIG.email}`,
    iconKey: 'mail',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'systems',
    title: 'Systems & Low-Latency Core',
    iconKey: 'cpu',
    description: 'Bare-metal C++/Rust performance, lock-free memory management, and hardware acceleration',
    skills: [
      { name: 'C++', isCore: true, level: 'Expert', experience: '8 yrs' },
      { name: 'Rust (Tokio / Async)', isCore: true, level: 'Expert', experience: '5 yrs' },
      { name: 'CUDA GPU Kernels', isCore: false, level: 'Advanced', experience: '3 yrs' },
      { name: 'SIMD / AVX-512 Instruction Sets', isCore: false, level: 'Advanced', experience: '4 yrs' },
      { name: 'Lock-Free Concurrent Queues', isCore: true, level: 'Expert', experience: '6 yrs' },
      { name: 'Custom Memory Allocators', isCore: true, level: 'Expert', experience: '7 yrs' },
      { name: 'eBPF Kernel Instrumentation', isCore: false, level: 'Advanced', experience: '3 yrs' },
      { name: 'Go (High-Concurrency Backend)', isCore: false, level: 'Advanced', experience: '4 yrs' },
    ],
  },
  {
    id: 'distributed',
    title: 'Distributed Systems & Storage',
    iconKey: 'layers',
    description: 'High-availability fault tolerance, consensus protocols, and sharded data stores',
    skills: [
      { name: 'Raft & Paxos Consensus', isCore: true, level: 'Expert', experience: '6 yrs' },
      { name: 'gRPC & Protocol Buffers', isCore: true, level: 'Expert', experience: '7 yrs' },
      { name: 'Apache Kafka & Event Streaming', isCore: false, level: 'Advanced', experience: '5 yrs' },
      { name: 'LSM-Tree Engine Storage', isCore: true, level: 'Expert', experience: '5 yrs' },
      { name: 'Sharded Key-Value Stores', isCore: false, level: 'Expert', experience: '6 yrs' },
      { name: 'Distributed Transactions', isCore: false, level: 'Advanced', experience: '4 yrs' },
      { name: 'Zero-Copy Ring Buffers', isCore: true, level: 'Expert', experience: '6 yrs' },
      { name: 'Redis Cluster & Caching', isCore: false, level: 'Advanced', experience: '6 yrs' },
    ],
  },
  {
    id: 'infra',
    title: 'Cloud Infrastructure & DevOps',
    iconKey: 'globe',
    description: 'Orchestration, Linux kernel tuning, container runtimes, and observability',
    skills: [
      { name: 'Linux Kernel Tuning & IPC', isCore: true, level: 'Expert', experience: '8 yrs' },
      { name: 'Docker & Containerd Engine', isCore: false, level: 'Expert', experience: '7 yrs' },
      { name: 'Kubernetes (K8s) Orchestration', isCore: false, level: 'Advanced', experience: '5 yrs' },
      { name: 'Prometheus & Grafana Tracing', isCore: false, level: 'Advanced', experience: '5 yrs' },
      { name: 'Terraform Infrastructure as Code', isCore: false, level: 'Proficient', experience: '3 yrs' },
      { name: 'CI/CD Pipeline Automation', isCore: false, level: 'Advanced', experience: '6 yrs' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack & Web Engines',
    iconKey: 'code',
    description: 'Modern web engines, WebGL/Three.js 3D rendering, and responsive architectures',
    skills: [
      { name: 'TypeScript & Node.js Runtime', isCore: true, level: 'Expert', experience: '7 yrs' },
      { name: 'React 18 / Next.js Framework', isCore: false, level: 'Expert', experience: '6 yrs' },
      { name: 'Three.js / WebGL Visualizations', isCore: false, level: 'Advanced', experience: '4 yrs' },
      { name: 'Tailwind CSS & Design Systems', isCore: false, level: 'Expert', experience: '5 yrs' },
      { name: 'WebAssembly (Wasm / C++)', isCore: false, level: 'Advanced', experience: '3 yrs' },
      { name: 'WebSockets & Real-Time Sync', isCore: false, level: 'Expert', experience: '6 yrs' },
    ],
  },
];

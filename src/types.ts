export interface BenchmarkMetric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface DeploymentStack {
  coreSystems: string[];
  buildValidation: string[];
  libraries: string[];
  repoUrl?: string;
}

export interface GlobalProjectViewData {
  overviewParagraph: string;
  problemStatement?: string;
  architecturalSolution?: string;
  benchmarksWorkload: string;
  benchmarksList: BenchmarkMetric[];
  deploymentStack: DeploymentStack;
}

export interface ArchLayer {
  id: string;
  name: string;
  subtitle: string;
  category: 'Ingress' | 'Compute' | 'Transport' | 'Consensus' | 'Storage' | 'Kernel' | 'Security' | 'Playback' | 'State' | 'Persistence' | 'Extensions' | 'Interface' | string;
  color: string; // e.g. '#00E5FF'
  description: string;
  architectureRationale: string;
  techStack: string[];
  latency: string;
  throughput: string;
  memoryFootprint: string;
  protocols: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  primaryLanguage: string;
  status: 'ACTIVE' | 'PRODUCTION' | 'CRITICAL' | 'LAB';
  description: string;
  blueprintImage: string;
  metrics: {
    memory: string;
    latency: string;
    throughput: string;
  };
  techTags: string[];
  globalView?: GlobalProjectViewData;
  layers: ArchLayer[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  type: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export type ViewPreset = '3d-exploded' | '3d-top' | '3d-isometric' | 'css-stacked';

export interface TrafficSimulation {
  active: boolean;
  currentLayerId: string | null;
  step: number;
  packetsCount: number;
  responsePayload?: string;
}

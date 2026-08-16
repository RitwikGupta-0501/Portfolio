import { ExperienceItem } from '../types';

export interface ExperienceManifestConfig {
  totalSummary: string;
  items: ExperienceItem[];
}

export const EXPERIENCE_MANIFEST: ExperienceManifestConfig = {
  totalSummary: 'INTERNSHIP, FREELANCE & OPEN SOURCE CONTRIBUTIONS',
  items: [
    {
      id: 'exp-1',
      period: 'JUNE 2026 — AUGUST 2026',
      role: 'Full Stack Engineer Intern',
      company: 'Tredence Inc. • Bengaluru, India',
      type: 'Internship',
      description: 'Engineered high-performance caching layers, multi-tier agentic memory graphs, and automated optimization engines for multi-node LLM agent architectures.',
      achievements: [
        'Reduced database write-amplification by 90% and eliminated MVCC bloat by designing a 7-module caching service (Redis/PostgreSQL) with an O(1) ZSET eviction index, replacing O(N) full-table scans.',
        'Achieved state-of-the-art recall with an 83 score on longmemeval by developing a 4-tier agentic memory service (Working, Episodic, Semantic, Procedural) utilizing single and multi-hop knowledge graphs.',
        'Cut compute costs for agent-optimization workflows by ~90% (reducing evaluation calls from 2500 to ~500) by building an Auto-tune optimizer for multi-node LangGraph agents utilizing DSPy and a successive-halving tournament algorithm.',
        'Prevented silent tool-calling failures across agent retry pipelines by uncovering and patching a critical LangGraph bug where model parameters were dropped after executing .bind_tools().'
      ],
      skills: ['Redis', 'PostgreSQL', 'LangGraph', 'DSPy', 'Knowledge Graphs', 'Python', 'Agentic Memory', 'FastAPI']
    },
    {
      id: 'exp-2',
      period: 'NOV 2025 — MARCH 2026',
      role: 'Freelance Software Engineer',
      company: 'Global Technologies • Remote, India',
      type: 'Freelance',
      description: 'Designed and deployed scalable RESTful APIs and CI/CD pipelines, performing database query plan optimizations and observability instrumentation.',
      achievements: [
        'Designed and built RESTful APIs using Django Ninja, and configured CI/CD pipelines to automate testing and frontend deployment.',
        'Optimized PostgreSQL performance via query plan analysis and custom indexing, resolving N + 1 query issues; added a pytest suite with structured logging for observability.'
      ],
      skills: ['Django Ninja', 'PostgreSQL', 'Query Optimization', 'CI/CD Pipelines', 'pytest', 'Python', 'Docker']
    },
    {
      id: 'exp-3',
      period: 'FEB 2026 — PRESENT',
      role: 'Open Source Contributor',
      company: 'Zulip • Remote',
      type: 'Open Source',
      description: 'Contributing to server-side reliability, core authentication workflows, and distributed messaging logic in Python.',
      achievements: [
        'Resolved critical cross-platform authentication bugs and patched server-side issues within a massive, high-concurrency Python distributed messaging platform.',
        'Enforced clean git hygiene — squashing commits pre-merge and applying clear branch/commit conventions — to meet Zulip’s contribution standards.'
      ],
      skills: ['Python', 'Distributed Messaging', 'Django', 'Authentication', 'Git Hygiene', 'Open Source']
    }
  ]
};

// Export shortcut for array access
export const CAREER_EXPERIENCE: ExperienceItem[] = EXPERIENCE_MANIFEST.items;

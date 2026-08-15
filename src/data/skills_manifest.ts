export interface SkillDossierCategory {
  title: string;
  items: string[];
}

export interface ProfileLink {
  label: string;
  url: string;
  iconType: 'github' | 'linkedin' | 'leetcode';
}

export const DOSSIER_PROFILE_LINKS: ProfileLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/RitwikGupta-0501',
    iconType: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/ritwikg',
    iconType: 'linkedin',
  },
  {
    label: 'LeetCode',
    url: 'https://leetcode.com/u/RitwikGupta-0501/',
    iconType: 'leetcode',
  },
];

export const DOSSIER_CATEGORIES: SkillDossierCategory[] = [
  {
    title: 'LANGUAGES & RUNTIMES',
    items: [
      'Python (FastAPI / Django)',
      'Go',
      'C++',
      'TypeScript / Node',
      'Bash',
    ],
  },
  {
    title: 'SYSTEMS & INFRA',
    items: [
      'Linux / POSIX',
      'Docker & Containerd',
      'Kubernetes',
      'Redis / PostgreSQL',
      'Git (Workflows)',
    ],
  },
  {
    title: 'AI & AGENT SYSTEMS',
    items: [
      'Model Context Protocol (MCP)',
      'vLLM / Ollama',
      'pgvector',
      'LangChain / LlamaIndex',
    ],
  },
  {
    title: 'ENVIRONMENT & TOOLING',
    items: [
      'Neovim / VS Code',
      'Linux CLI / Bash',
      'GDB / LLDB',
      'Postman',
      'PyTest / CI Pipelines',
    ],
  },
];

export const RESUME_FILE_PATH = '/Ritwik_Gupta_Resume.pdf';

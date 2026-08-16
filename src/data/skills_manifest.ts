import { PROFILE_MANIFEST, SOCIAL_LINKS } from './profile_manifest';

export interface SkillDossierCategory {
  title: string;
  items: string[];
}

export interface ProfileLink {
  label: string;
  url: string;
  iconType: 'github' | 'linkedin' | 'leetcode';
}

export const DOSSIER_PROFILE_LINKS: ProfileLink[] = SOCIAL_LINKS;

export const DOSSIER_CATEGORIES: SkillDossierCategory[] = [
  {
    title: 'LANGUAGES',
    items: [
      'Python',
      'C++ (CUDA)',
      'Rust',
      'Go',
      'TypeScript',
      'SQL & Bash',
    ],
  },
  {
    title: 'AI & AGENTS',
    items: [
      'LangGraph',
      'OpenAI / Anthropic APIs',
    ],
  },
  {
    title: 'BACKEND',
    items: [
      'FastAPI & Pydantic',
      'SQLAlchemy',
      'Django',
      'Tauri',
    ],
  },
  {
    title: 'DATABASES',
    items: [
      'PostgreSQL',
      'Redis',
      'SQLite',
      'MongoDB',
    ],
  },
  {
    title: 'CLOUD & DEVOPS',
    items: [
      'Kubernetes & Docker',
      'AWS / GCP',
      'GitHub Actions',
      'Elasticsearch',
    ],
  },
  {
    title: 'SYSTEMS & CONCURRENCY',
    items: [
      'Linux (Namespaces, cgroups, systemd)',
      'OpenMP & OpenMPI',
      'CUDA Programming',
    ],
  },
];

export interface DeveloperToolingItem {
  name: string;
  category?: string;
  iconId: string;
}

export const DEVELOPER_TOOLING: DeveloperToolingItem[] = [
  { name: 'Claude Code', category: 'Agentic', iconId: 'claude' },
  { name: 'Antigravity', category: 'AI IDE', iconId: 'antigravity' },
  { name: 'Neovim', category: 'Editor', iconId: 'neovim' },
  { name: 'Zed', category: 'Editor', iconId: 'zed' },
  { name: 'VS Code', category: 'Editor', iconId: 'vscode' },
  { name: 'Ghostty', category: 'Terminal', iconId: 'ghostty' },
  { name: 'Linux', category: 'Kernel & OS', iconId: 'linux' },
  { name: 'Hyprland', category: 'Compositor', iconId: 'hyprland' },
  { name: 'Obsidian', category: 'Knowledge', iconId: 'obsidian' },
  { name: 'CUDA / NVIDIA', category: 'GPU Architecture', iconId: 'cuda' },
  { name: 'Valgrind', category: 'Diagnostics', iconId: 'valgrind' },
  { name: 'Docker Compose', category: 'Containers', iconId: 'docker' },
  { name: 'Postman', category: 'API', iconId: 'postman' },
  { name: 'pytest', category: 'Testing', iconId: 'pytest' },
  { name: 'Git & GitHub Actions', category: 'VCS & CI', iconId: 'git' },
];

export const RESUME_FILE_PATH = PROFILE_MANIFEST.resumeUrl;

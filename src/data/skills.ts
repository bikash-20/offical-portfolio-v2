import {
  Layout,
  Server,
  Code2,
  Database,
  Cloud,
  Sparkles,
  Brain,
  Layers,
  ShieldCheck,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  accent: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: Layout,
    accent: 'from-fuchsia-500/30 to-violet-500/20',
    items: [
      'React 18',
      'Next.js 16',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Vite',
      'Vanilla JS',
      'Thymeleaf',
      'HTML / CSS',
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    accent: 'from-sky-500/30 to-cyan-500/20',
    items: ['Spring Boot 3', 'FastAPI', 'Node.js', 'REST APIs', 'WebSockets'],
  },
  {
    name: 'Languages',
    icon: Code2,
    accent: 'from-amber-500/30 to-orange-500/20',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Go', 'C++', 'C'],
  },
  {
    name: 'Database',
    icon: Database,
    accent: 'from-emerald-500/30 to-teal-500/20',
    items: ['PostgreSQL', 'SQLite', 'H2', 'Redis', 'Supabase'],
  },
  {
    name: 'DevOps',
    icon: Cloud,
    accent: 'from-blue-500/30 to-indigo-500/20',
    items: ['Docker', 'Cloudflare', 'Render', 'Vercel', 'GitHub Actions'],
  },
  {
    name: 'AI / ML',
    icon: Sparkles,
    accent: 'from-pink-500/30 to-rose-500/20',
    items: [
      'Ollama',
      'OpenRouter',
      'Whisper',
      'Piper',
      'RAG',
      'LangChain',
      'PyTorch',
      'NumPy',
    ],
  },
  {
    name: 'Deep Learning',
    icon: Brain,
    accent: 'from-violet-500/30 to-purple-500/20',
    items: ['Neural Networks', 'CNNs', 'Transfer Learning', 'PyTorch'],
  },
  {
    name: 'Architecture',
    icon: Layers,
    accent: 'from-orange-500/30 to-red-500/20',
    items: ['Microservices', 'Event Sourcing', 'CQRS', 'Saga Pattern'],
  },
  {
    name: 'Security',
    icon: ShieldCheck,
    accent: 'from-red-500/30 to-pink-500/20',
    items: ['Spring Security', 'JWT', 'OAuth2', 'mTLS', 'RBAC'],
  },
  {
    name: 'Testing',
    icon: FlaskConical,
    accent: 'from-lime-500/30 to-green-500/20',
    items: ['JUnit', 'Vitest', 'Playwright', 'k6'],
  },
];

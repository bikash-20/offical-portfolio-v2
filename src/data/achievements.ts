import {
  Trophy,
  Award,
  Star,
  Github,
  type LucideIcon,
} from 'lucide-react';

export interface Achievement {
  title: string;
  detail: string;
  org: string;
  year: string;
  icon: LucideIcon;
  cert?: string;
  highlight?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'PSTU National Hackathon 2026 Finalist',
    detail:
      'Built an Intelligent Emergency Response Platform as part of a 48-hour national hackathon.',
    org: 'Patuakhali Science & Technology University',
    year: '2026',
    icon: Trophy,
    cert: '/certificates/pstu-2026.pdf',
    highlight: 'Top 5 nationally',
  },
  {
    title: 'Codex Community Hackathon Finalist',
    detail:
      'Finalist at the SUST CSE Carnival Codex hackathon for a generative-AI product prototype.',
    org: 'SUST CSE Carnival 2026',
    year: '2026',
    icon: Award,
    cert: '/certificates/codex-2026.pdf',
    highlight: 'Finalist',
  },
  {
    title: '2,200+ GitHub Contributions',
    detail:
      'Consistent daily contributions across personal and academic projects for the past year.',
    org: 'github.com/bikash-20',
    year: '2025–2026',
    icon: Star,
    highlight: 'Top 1% Bangladesh',
  },
  {
    title: '82+ Public Repositories',
    detail:
      'One of the most active student developers — covering AI, full-stack systems, CLI tools and more.',
    org: 'github.com/bikash-20',
    year: 'Ongoing',
    icon: Github,
    highlight: 'Open source heavy',
  },
];

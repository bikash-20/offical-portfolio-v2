export interface Project {
  id: string;
  num: string;
  name: string;
  category: 'Client' | 'Personal';
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  thumbnail: string;
  featured?: boolean;
  /** Long-form layout for the featured sticky cards. */
  detail?: string;
  /** Set true if the featured card uses a single hero image instead of the 3-tile grid. */
  heroImage?: boolean;
  // Legacy 3-tile layout (kept for fallback)
  col1a?: string;
  col1b?: string;
  col2?: string;
}

const cdn = (key: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(
    `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${key}`
  )}&w=1280&q=85`;

export const projects: Project[] = [
  {
    id: 'nexora-ai',
    num: '01',
    name: 'Nexora AI',
    category: 'Personal',
    description:
      'AI-powered learning and productivity workspace with compare, podcast, summarizer and adaptive practice.',
    detail:
      'A full-stack AI platform for IELTS prep and language learning — featuring a multi-model compare lab, TTS podcast generator, summarizer and a personalized practice engine.',
    tech: ['React', 'Node.js', 'OpenRouter', 'Tailwind CSS'],
    live: 'https://old-ai-code.vercel.app/index.html',
    repo: 'https://github.com/bikash-20',
    thumbnail: '/Nexora ai.png',
    featured: true,
    heroImage: true,
  },
  {
    id: 'cendrix-ai',
    num: '02',
    name: 'CENDRIX AI',
    category: 'Personal',
    description:
      'IDE-grade editor with LLM benchmarking and a D3.js visualization lab for model comparison.',
    detail:
      'An IDE-grade editor that wraps TinyLlama (and other free models) with a D3.js visualization lab for benchmarking latency, token throughput and response quality across providers.',
    tech: ['React', 'FastAPI', 'D3.js', 'TinyLlama'],
    live: 'https://cendrix-ai.vercel.app/',
    repo: 'https://github.com/bikash-20',
    thumbnail: '/Cendrix AI.png',
    featured: true,
    heroImage: true,
  },
  {
    id: 'daybrief',
    num: '03',
    name: 'Daybrief',
    category: 'Personal',
    description:
      'AI-driven morning dashboard PWA — greeting, weather, calendar, alarms, headlines and an AI assistant with six-tier cascading support.',
    detail:
      'A personal AI-driven morning dashboard that brings all the day\u2019s essentials into one fast, installable PWA: greeting, local weather, calendar events, alarms, headlines, and an AI assistant with six-tier cascading support.',
    tech: ['PWA', 'OpenRouter', 'Open-Meteo', 'Calendar API'],
    live: 'https://daybrief-git-main-bikash-20s-projects.vercel.app/',
    repo: 'https://github.com/bikash-20',
    thumbnail: '/Daybrief.png',
    featured: true,
    heroImage: true,
  },
  {
    id: 'liquiguard',
    num: '04',
    name: 'LiquiGuard',
    category: 'Client',
    description:
      'Enterprise liquidity command center with EWMA forecasting, SSE streaming and live risk dashboards.',
    tech: ['Python', 'EWMA', 'PostgreSQL', 'SSE'],
    live: 'https://liquiguard-frontend.vercel.app/',
    repo: 'https://github.com/bikash-20/SUST-Final-hackathon-project',
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&q=80',
  },
  {
    id: 'pstu-wallet',
    num: '05',
    name: 'PSTU Wallet',
    category: 'Client',
    description:
      'Multi-provider mobile money movement system with reconciliation and audit trails.',
    tech: ['React', 'Spring Boot', 'PostgreSQL'],
    live: 'https://frontend-alpha-inky-87.vercel.app/',
    repo: 'https://github.com/bikash-20/pstu-hackathon-money-movement',
    thumbnail:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1280&q=80',
  },
  {
    id: 'walletsync',
    num: '06',
    name: 'WalletSync',
    category: 'Personal',
    description:
      'Multi-provider mobile money balance viewer (bKash, Nagad, Rocket) with fee calculator and festival-day forecasting for the Bangladeshi market.',
    tech: ['Next.js', 'SQLite', 'TypeScript'],
    repo: 'https://github.com/bikash-20/-multi-provider-mobile-money-balance-viewer-bKash-Nagad-Rocket-(WalletSync)',
    thumbnail:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1280&q=80',
  },
  {
    id: 'rentify',
    num: '07',
    name: 'Rentify',
    category: 'Client',
    description:
      'AI-powered car rental system with availability search, smart pricing and Spring Boot booking flows.',
    tech: ['Spring Boot 3', 'Thymeleaf', 'JPA'],
    live: 'https://rentify-ifs4.onrender.com/',
    repo: 'https://github.com/bikash-20/2nd-year-java-project',
    thumbnail:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1280&q=80',
  },
  {
    id: 'queuestorm',
    num: '08',
    name: 'QueueStorm Investigator',
    category: 'Personal',
    description:
      'Multi-lingual complaint parser with guardrails and routing rules for support teams.',
    tech: ['FastAPI', 'OpenRouter', 'Guardrails'],
    live: 'https://final-mock-test-sust-hackathon.onrender.com/',
    repo: 'https://github.com/bikash-20/FInal-Preliminary-Test-SUST-Hackathon',
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&q=80',
  },
  {
    id: 'healthcare-triage-ai',
    num: '09',
    name: 'Healthcare Triage AI',
    category: 'Personal',
    description:
      'Bilingual PWA for rural community health workers with offline-first triage workflows.',
    tech: ['React PWA', 'FastAPI', 'Cloudflare'],
    live: 'https://sust-hackathon-task.vercel.app/',
    repo: 'https://github.com/bikash-20/Healthcare-Triage-AI',
    thumbnail:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&q=80',
  },
  {
    id: 'cognexa-ai',
    num: '10',
    name: 'Cognexa AI',
    category: 'Personal',
    description:
      'Zero-signup AI chat assistant focused on document OCR, PDF Q&A and summarization.',
    tech: ['React', 'FastAPI', 'OCR/PDF'],
    live: 'https://cognexa-ai.vercel.app/',
    repo: 'https://github.com/bikash-20/Cognexa-AI',
    thumbnail:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1280&q=80',
  },
  {
    id: 'jarvis-mk1',
    num: '11',
    name: 'JARVIS MK-1',
    category: 'Personal',
    description:
      'Multi-model voice assistant with Whisper STT, OpenRouter routing and Piper TTS.',
    tech: ['Python', 'OpenRouter', 'TTS'],
    repo: 'https://github.com/bikash-20/AI-ENGINEERING-CODE',
    thumbnail:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1280&q=80',
  },
  {
    id: 'nocta',
    num: '12',
    name: 'Nocta',
    category: 'Personal',
    description:
      'Single-file Ollama chat interface with Whisper transcription and local persistence.',
    tech: ['Vanilla JS', 'Ollama', 'Whisper'],
    live: 'https://bikash-20.github.io/ollama-local-model-website/',
    repo: 'https://github.com/bikash-20/ollama-local-model-website',
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1280&q=80',
  },
  {
    id: 'openhospital-rms',
    num: '13',
    name: 'OpenHospital RMS',
    category: 'Client',
    description:
      'Hospital management system for records, appointments, billing and inventory.',
    tech: ['Spring Boot', 'Supabase', 'Vite'],
    live: 'https://hospital-management-system-eta-nine.vercel.app/login',
    repo: 'https://github.com/bikash-20/Hospital-Management-System',
    thumbnail:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1280&q=80',
  },
  {
    id: 'coffeeshop-ecommerce',
    num: '14',
    name: 'Coffeeshop E-Commerce',
    category: 'Personal',
    description:
      'AI-powered e-commerce storefront with a RAG-based shopping assistant and Cloudflare edge cache.',
    tech: ['Vite', 'RAG', 'Cloudflare'],
    live: 'https://bikash-20.github.io/Coffeshop-E-Commerce-Website/',
    repo: 'https://github.com/bikash-20/Coffeshop-E-Commerce-Website',
    thumbnail:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1280&q=80',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

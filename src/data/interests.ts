import {
  Sparkles,
  Network,
  MessageSquare,
  Cpu,
  Atom,
  type LucideIcon,
} from 'lucide-react';

export interface Interest {
  name: string;
  description: string;
  icon: LucideIcon;
  topics: string[];
}

export const interests: Interest[] = [
  {
    name: 'AI / ML',
    description:
      'Neural networks, deep learning and computer vision — applied to products people actually use.',
    icon: Sparkles,
    topics: ['Neural Networks', 'Computer Vision', 'PyTorch'],
  },
  {
    name: 'Deep Learning',
    description:
      'Architectures, training tricks and transfer learning for vision and sequence tasks.',
    icon: Network,
    topics: ['CNNs', 'Transformers', 'Transfer Learning'],
  },
  {
    name: 'NLP',
    description:
      'Transformers, retrieval and prompt design for production LLM applications.',
    icon: MessageSquare,
    topics: ['LLMs', 'RAG', 'Prompt Engineering'],
  },
  {
    name: 'LLM Engineering',
    description:
      'Routing across providers, guardrails, evals, latency tuning and cost-aware design.',
    icon: Cpu,
    topics: ['OpenRouter', 'Ollama', 'Evals'],
  },
  {
    name: 'Quantum Machine Learning',
    description:
      'Exploring how quantum computing primitives can accelerate classical ML workloads.',
    icon: Atom,
    topics: ['Quantum Kernels', 'Hybrid Models', 'Research'],
  },
];

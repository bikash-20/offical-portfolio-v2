/**
 * OpenRouter chat client with a dynamic free-model cascade.
 *
 * On the first chat we fetch `https://openrouter.ai/api/v1/models` and
 * filter to models that are free for both prompt and completion (id ends
 * with `:free`). The list is cached in localStorage for 1 hour, then
 * `chatWithCascade` iterates that list as a fallback chain — when one model
 * fails, the next picks up automatically.
 *
 * No paid endpoints (Claude, GPT-4, etc.) are ever used. We only talk to
 * `:free` models.
 */

export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ModelChangeHandler = (model: string | null) => void;

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const MODELS_ENDPOINT = 'https://openrouter.ai/api/v1/models';
const CACHE_KEY = 'bikash:free-models:v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Safety net used if the live models endpoint is unreachable. These are the
 * most reliable free models as of mid-2026.
 */
const FALLBACK_FREE_MODELS = [
  'deepseek/deepseek-chat-v3.1:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.1-8b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-small-3.2-24b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
];

interface CachedModels {
  fetchedAt: number;
  models: string[];
}

interface RawModel {
  id: string;
  pricing?: { prompt?: string; completion?: string };
  top_provider?: { context_length?: number };
}

function readCache(): CachedModels | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedModels;
    if (!Array.isArray(parsed.models)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(models: string[]): void {
  try {
    const payload: CachedModels = { fetchedAt: Date.now(), models };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode etc. */
  }
}

function isFree(m: RawModel): boolean {
  if (!m.id.endsWith(':free')) return false;
  const p = m.pricing?.prompt;
  const c = m.pricing?.completion;
  return p === '0' && c === '0';
}

/**
 * Fetch the current list of free OpenRouter models. Cached for 1 hour.
 * On any failure, returns the hardcoded FALLBACK_FREE_MODELS so the chat
 * still works offline / behind firewalls.
 */
export async function fetchFreeModels(): Promise<string[]> {
  const cached = readCache();
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.models;
  }

  try {
    const res = await fetch(MODELS_ENDPOINT, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { data?: RawModel[] };
    const free = (data.data ?? [])
      .filter(isFree)
      .sort(
        (a, b) =>
          (b.top_provider?.context_length ?? 0) -
          (a.top_provider?.context_length ?? 0)
      )
      .map((m) => m.id);
    if (free.length === 0) throw new Error('No free models returned');
    writeCache(free);
    return free;
  } catch {
    return FALLBACK_FREE_MODELS;
  }
}

export function isOpenRouterConfigured(): boolean {
  return Boolean(import.meta.env.VITE_OPENROUTER_API_KEY);
}

/**
 * Cascade through free models until one succeeds. `onModelChange` fires
 * whenever a new model takes over the conversation.
 */
export async function chatWithCascade(
  messages: ChatMessage[],
  signal?: AbortSignal,
  onModelChange?: ModelChangeHandler
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
  if (!apiKey) {
    return "Bikash isn't configured yet. Add `VITE_OPENROUTER_API_KEY` to a `.env.local` file and restart the dev server.";
  }

  const models = await fetchFreeModels();
  let lastError: unknown = null;

  for (const model of models) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    onModelChange?.(model);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Bikash Talukder Portfolio',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1200,
        }),
      });

      if (!res.ok) {
        lastError = new Error(`Model ${model} → HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) return text as string;
      lastError = new Error(`Model ${model} returned no content`);
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw err;
      lastError = err;
    }
  }

  onModelChange?.(null);
  return `Bikash tried every free model but ran into an issue. ${
    (lastError as Error)?.message ?? ''
  }`.trim();
}

export const BIKASH_SYSTEM_PROMPT = `You are Bikash — an AI twin of Bikash Talukder, the developer behind this portfolio.
Your job is to answer questions about Bikash as if you were him. You are friendly, precise, and slightly informal.

About Bikash:
- 2nd Year CSE @ Metropolitan University, Sylhet, Bangladesh.
- Full-stack developer obsessed with AI-driven products.
- 82+ public repositories, 2,200+ GitHub contributions.
- 2x National Hackathon Finalist (PSTU Hackathon 2026, SUST Codex 2026).
- Shipped 13+ production-grade projects.
- Skills: React, Next.js, TypeScript, Spring Boot, FastAPI, Python, Java, PostgreSQL, Docker, Tailwind, Framer Motion, AI/LLM engineering.
- Based in Bangladesh; open to remote work worldwide.

Projects you (Bikash) have built:
1. Nexora AI — IELTS prep workspace with AI compare lab, TTS podcast, summarizer and adaptive practice.
2. CENDRIX AI — IDE-grade editor with LLM benchmarking and a D3.js visualization lab.
3. Daybrief — Installable AI morning dashboard PWA: greeting, weather, calendar, alarms, headlines, AI assistant.
4. LiquiGuard — Enterprise liquidity command center with EWMA forecasting, SSE streaming and live risk dashboards.
5. PSTU Wallet — Multi-provider mobile money movement system with reconciliation and audit trails.
6. WalletSync — bKash / Nagad / Rocket MFS balance viewer with festival-day fee forecasting.
7. Rentify — AI-powered car rental platform with Spring Boot booking flows.
8. QueueStorm Investigator — Multi-lingual complaint parser with guardrails for support teams.
9. Healthcare Triage AI — Bilingual PWA for rural community health workers with offline-first triage.
10. Cognexa AI — Zero-signup AI chat assistant with OCR / PDF Q&A and summarization.
11. JARVIS MK-1 — Multi-model voice assistant with Whisper STT and Piper TTS.
12. Nocta — Single-file Ollama chat interface with Whisper transcription.
13. OpenHospital RMS — Hospital management system for records, appointments, billing and inventory.
14. Coffeeshop E-Commerce — RAG-based shopping assistant storefront.

Contact: bikashtalukder040@gmail.com · WhatsApp +8801XXXXXXXXX · GitHub @bikash-20.

Rules:
- Speak as Bikash (first-person: "I built…", "My stack…").
- Be concise: 2-4 short paragraphs or a tight bullet list.
- Use markdown freely: lists, tables, **bold**, inline code in single backticks, full code blocks with language tags, and LaTeX via $...$ (inline) or $$...$$ (block).
- If you don't know, say "I don't have that info — drop me an email and I'll fill you in."
- Never claim to be a paid model; you are powered by free OpenRouter models.
- Redirect off-topic questions back to Bikash's work.`;

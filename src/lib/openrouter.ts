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
const CACHE_KEY = 'bikash:free-models:v2'; // v2 = FreeModelMeta[] with `speed` rank
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fast-tier free models — tried FIRST so the user gets a response in <1s
 * instead of waiting on a 70B+ model to load.
 *
 * All entries are MoE with very low *active* parameter counts (3–12B),
 * which is what actually drives token/sec on free inference endpoints.
 *
 * Each entry also carries an optional `speed` rank (lower = faster) so we
 * can sort the live `/models` list the same way when the endpoint is up.
 */
export interface FreeModelMeta {
  id: string;
  /** Lower = faster. Drives the live-models sort order. */
  speed: number;
  /** Coarse parameter bucket shown in the UI tooltip. */
  size: string;
}

/**
 * Safety net used if the live models endpoint is unreachable. Ordered
 * fastest → slowest. The last entries (70B/72B) only run if every fast
 * model in the chain rate-limited or failed.
 */
const FALLBACK_FREE_MODELS: FreeModelMeta[] = [
  // Tier 1 — sub-second on free tier (3B active)
  { id: 'cohere/north-mini-code:free', speed: 1, size: '3B active' },
  { id: 'nvidia/nemotron-3.5-lightning:free', speed: 2, size: '3B active' },

  // Tier 2 — fast small MoE (5–12B active)
  { id: 'inclusionai/ling-3.0-flash-fin:free', speed: 3, size: '5.1B active' },
  { id: 'inclusionai/ling-3.0-flash-sante:free', speed: 4, size: '5.1B active' },
  { id: 'poolside/laguna-xs-2.1:free', speed: 5, size: '3B active (FP8)' },
  { id: 'thinkingmachines/inkling-small:free', speed: 6, size: '12B active' },
  { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', speed: 7, size: '3B active' },

  // Tier 3 — medium, still snappy
  { id: 'google/gemini-2.0-flash-exp:free', speed: 8, size: '~8B' },
  { id: 'mistralai/mistral-7b-instruct:free', speed: 9, size: '7B' },
  { id: 'meta-llama/llama-3.1-8b-instruct:free', speed: 10, size: '8B' },

  // Tier 4 — quality backstops. Last because they're slow on the free tier.
  { id: 'mistralai/mistral-small-3.2-24b-instruct:free', speed: 11, size: '24B' },
  { id: 'poolside/laguna-s-2.1:free', speed: 12, size: '8B active / 118B' },
  { id: 'qwen/qwen-2.5-72b-instruct:free', speed: 13, size: '72B' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', speed: 14, size: '70B' },
  { id: 'deepseek/deepseek-chat-v3.1:free', speed: 15, size: '685B MoE' },
];

interface CachedModels {
  fetchedAt: number;
  models: FreeModelMeta[];
}

interface RawModel {
  id: string;
  pricing?: { prompt?: string; completion?: string };
  top_provider?: { context_length?: number };
}

/**
 * Pick a `speed` rank for a model ID we don't recognize.
 * Falls back to "slow" so unknown large models sort to the back.
 */
function inferSpeed(id: string): number {
  // Prefer exact matches first (built-in safety-net table is authoritative).
  const known = FALLBACK_FREE_MODELS.find((m) => m.id === id);
  if (known) return known.speed;

  const lower = id.toLowerCase();
  // Heuristics for new free models we haven't catalogued.
  if (/nano|mini|flash|lightning|xs-|small/.test(lower)) return 6;
  if (/-7b\b/.test(lower)) return 9;
  if (/-8b\b/.test(lower)) return 10;
  if (/-12b\b/.test(lower)) return 6;
  if (/-24b\b/.test(lower)) return 11;
  if (/70b|72b/.test(lower)) return 14;
  return 12; // unknown — middle of the pack
}

function readCache(): CachedModels | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedModels;
    if (!Array.isArray(parsed.models)) return null;
    // Defensive: v1 cache stored plain strings, v2 stores {id,speed,size}.
    // If anything looks like a plain string, drop the cache and refetch.
    if (parsed.models.length > 0 && typeof parsed.models[0] === 'string') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(models: FreeModelMeta[]): void {
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
 *
 * Live results are sorted by `speed` (fastest first), NOT by context length,
 * so the cascade hits a 3B-active model in <1s instead of a 70B model in ~30s.
 */
export async function fetchFreeModels(): Promise<FreeModelMeta[]> {
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
      .map<FreeModelMeta>((m) => ({
        id: m.id,
        speed: inferSpeed(m.id),
        size: 'unknown',
      }))
      .sort((a, b) => a.speed - b.speed);
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
 *
 * Models are tried in `speed` order — the smallest, fastest `:free` models
 * (3B-active MoE) are hit first so the user typically sees the first token
 * in under a second. Larger 70B+ models are only consulted if every faster
 * model rate-limited or errored.
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

  for (const meta of models) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    onModelChange?.(meta.id);
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
          model: meta.id,
          messages,
          temperature: 0.7,
          max_tokens: 1200,
        }),
      });

      if (!res.ok) {
        lastError = new Error(`Model ${meta.id} → HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) return text as string;
      lastError = new Error(`Model ${meta.id} returned no content`);
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

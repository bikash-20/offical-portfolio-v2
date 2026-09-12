# Bikash Talukder — Portfolio

A single-page portfolio for **Bikash Talukder** — a 2nd-year Computer Science student at Metropolitan University (CGPA 3.65) and full-stack developer focused on AI-driven products.
<img width="1280" height="714" alt="image" src="https://github.com/user-attachments/assets/cb0c5af0-16ee-40af-82af-8aaa5743c07e" />
live:https://offical-portfolio-v2.vercel.app/

Visually modeled after the "Jack -- 3D Creator" reference (dark `#0C0C0C` background, Kanit font, big gradient headings, scroll-driven marquee, sticky-stacking project cards, magnetic hero portrait) and adapted with Bikash's real content: skills grid, 13 production projects, achievements, live dashboard, interests, contact panel, and an "Opus" AI chat widget.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Build

```bash
npm run build
npm run preview
```

## Configuration (optional)

Copy `.env.example` to `.env.local` and fill in any of:

| Variable | Purpose |
|---|---|
| `VITE_OPENROUTER_API_KEY` | Real LLM responses in the Opus chat widget. Free key at <https://openrouter.ai>. |
| `VITE_EMAILJS_*` | Real email delivery from the contact form (otherwise the form opens `mailto:`). |
| `VITE_GITHUB_HANDLE` / `VITE_LEETCODE_HANDLE` / `VITE_CODEFORCES_HANDLE` | Overrides for the live dashboard. |

When these are blank, the UI still works — the dashboard falls back to demo values and the AI chat shows a "not configured" hint.

## Tech

- Vite 5 + React 18 + TypeScript 5
- Tailwind CSS 3.4 + Framer Motion 12 + lucide-react 0.344
- Public APIs: GitHub, Open-Meteo, OpenRouter; LeetCode/Codeforces via third-party stat endpoints.

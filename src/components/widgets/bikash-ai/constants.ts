/**
 * Constants for the Bikash AI widget.
 */

export const GREETING =
  "Hey, I'm Bikash 👋 — your AI guide to my work. Ask me anything about my projects, skills, hackathons, or how we can build something together!";

export const SUGGESTIONS = [
  'What are your top 3 projects?',
  'How does the Nexora AI compare lab work?',
  'Which hackathons have you reached the finals of?',
  'Can you show me a Python hello world?',
  'What is $\\int x^2 \\, dx$?',
];

export const PANEL_SIZE_KEY = 'bikash:panel-size:v1';

export interface PanelSize {
  w: number;
  h: number;
}

export const DEFAULT_PANEL_SIZE: PanelSize = { w: 380, h: 560 };
export const MIN_PANEL_SIZE: PanelSize = { w: 320, h: 420 };
export const MAX_PANEL_SIZE: PanelSize = { w: 720, h: 720 };

export function loadPanelSize(): PanelSize {
  if (typeof window === 'undefined') return DEFAULT_PANEL_SIZE;
  try {
    const raw = localStorage.getItem(PANEL_SIZE_KEY);
    if (!raw) return DEFAULT_PANEL_SIZE;
    const parsed = JSON.parse(raw) as PanelSize;
    if (
      typeof parsed.w === 'number' &&
      typeof parsed.h === 'number' &&
      parsed.w >= MIN_PANEL_SIZE.w &&
      parsed.w <= MAX_PANEL_SIZE.w &&
      parsed.h >= MIN_PANEL_SIZE.h &&
      parsed.h <= MAX_PANEL_SIZE.h
    ) {
      return parsed;
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_PANEL_SIZE;
}

export function savePanelSize(size: PanelSize): void {
  try {
    localStorage.setItem(PANEL_SIZE_KEY, JSON.stringify(size));
  } catch {
    /* ignore */
  }
}

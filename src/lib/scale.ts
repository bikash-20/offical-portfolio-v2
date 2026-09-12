/**
 * Site-wide scale — single source of truth for spacing, typography and color.
 *
 * SPACING (8px base):
 *   xs  =  8px   (gap-2)
 *   sm  = 16px   (gap-4, p-4)
 *   md  = 24px   (gap-6, p-6)
 *   lg  = 32px   (gap-8)
 *   xl  = 48px   (gap-12)
 *   2xl = 64px   (gap-16)
 *   3xl = 96px   (gap-24, section py at md+)
 *   4xl = 128px  (gap-32, section pb for hero-stack)
 *
 * Section horizontal padding = px-5 (20) | sm:px-8 (32) | md:px-10 (40).
 * Section vertical padding   = py-20 (80) | sm:py-24 (96) | md:py-32 (128).
 *
 * TYPOGRAPHY (fluid clamp; one scale across all sections):
 *   display   = clamp(3rem, 12vw, 10rem)   — big section titles (About/Services/Projects).
 *   h2-section= clamp(2.5rem, 8vw, 7.5rem) — secondary titles (Dashboard/Interests/Contact/All Projects).
 *   h3-card   = clamp(1rem, 2vw, 1.6rem)   — card titles.
 *   body      = clamp(0.95rem, 1.5vw, 1.25rem) — paragraph / body text.
 *   small     = 0.75rem — meta / tags.
 *
 * COLOR (only):
 *   ink       #0C0C0C — backgrounds (dark sections), form fields.
 *   mist      #D7E2EA — primary text on dark, borders on dark.
 *   slate     #646973 → #BBCCD7 — gradient hero heading only.
 *   accent    #B600A8 — single accent (CTA, focus rings, hover borders, badges).
 *   white     #FFFFFF — Services + Skills section background.
 *
 * Draggable elements (Magnet card in hero, future ones):
 *   - Always render above text (z-index >= 50).
 *   - Have a solid background panel, 1–2px accent border, and a hard drop shadow.
 *   - On viewports < md (touch / unreliable drag), fall back to a fixed
 *     anchored position and disable magnetic effect.
 */

export const SPACING = {
  // Vertical rhythm inside sections
  gapStack: 'gap-10 sm:gap-14 md:gap-16',
  gapRow: 'gap-3 sm:gap-4 md:gap-5',
  // Section padding
  sectionPx: 'px-5 sm:px-8 md:px-10',
  sectionPy: 'py-20 sm:py-24 md:py-32',
  // Heading → first content gap
  headingGap: 'mb-12 sm:mb-16 md:mb-20',
  // Card padding
  card: 'p-5 sm:p-6 md:p-8',
};

export const TYPE = {
  display: 'clamp(3rem, 12vw, 10rem)',
  h2: 'clamp(2.5rem, 8vw, 7.5rem)',
  h3: 'clamp(1rem, 2vw, 1.6rem)',
  body: 'clamp(0.95rem, 1.5vw, 1.25rem)',
  small: '0.75rem',
};

export const COLOR = {
  ink: '#0C0C0C',
  mist: '#D7E2EA',
  accent: '#B600A8',
  white: '#FFFFFF',
};

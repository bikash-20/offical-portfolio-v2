import Magnet from '../ui/Magnet';
import FadeIn from '../ui/FadeIn';
import ContactButton from '../ui/ContactButton';
import { HERO_PORTRAIT_URL } from '../../data/profile';
import { COLOR } from '../../lib/scale';
import resumeUrl from '../../data/resume.pdf';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Price', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Draggable photo-card rule (site-wide):
 *
 *  - z-index: always above text (z-50+ vs text z-0..z-30).
 *  - Boundary: solid panel (bg-ink) + 1.5px mist border + heavy drop shadow.
 *  - Mobile (<md): Magnet effect is a no-op (onMouseMove only) so the card
 *    is pinned to a clean default position by CSS — no reliance on drag.
 *  - The card never renders above text in the same row — text and card are
 *    in separate stacked zones, so wherever the card lands it never hides
 *    letters.
 */
export default function HeroSection() {
  return (
    <main
      className="relative isolate flex h-screen w-full flex-col overflow-x-clip bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar — solid strip so nav text stays fully legible */}
      <FadeIn
        delay={0}
        duration={0.7}
        y={-20}
        className="relative z-50 w-full shrink-0 bg-[#0C0C0C]"
      >
        <nav className="flex w-full items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero stage — vertical stack: tag → headline → card → tagline row */}
      <div className="relative z-0 flex flex-1 flex-col items-stretch justify-center overflow-hidden px-5 sm:px-6 md:px-10">
        {/* Subhead tag */}
        <FadeIn
          delay={0.05}
          duration={0.5}
          y={10}
          className="relative z-10 mx-auto mb-4 md:mb-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-[#0C0C0C] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/80 backdrop-blur md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B600A8]" />
            Portfolio · 2026
          </span>
        </FadeIn>

        {/* Headline — full-width centered. No overlap with card.
            Font-size is fluid and capped so the headline always fits the row. */}
        <FadeIn
          delay={0.15}
          duration={0.7}
          y={40}
          className="relative z-10 mx-auto w-full max-w-full overflow-hidden text-center"
        >
          <h1
            className="block w-full whitespace-nowrap text-center font-black uppercase leading-[0.92] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2rem, 8.2vw, 9.5rem)',
              color: '#BBCCD7',
            }}
          >
            Hi, i&apos;m Bikash
          </h1>
        </FadeIn>

        {/* Photo card — centered below the headline, with clear vertical separation.
            z-50 ensures it stays above any decorative overlay. */}
        <FadeIn
          delay={0.6}
          duration={0.7}
          y={30}
          className="relative z-50 mt-4 flex justify-center sm:mt-6 md:mt-8"
        >
          <div className="pointer-events-auto">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <div
                className="overflow-hidden rounded-[24px] border-[1.5px] bg-[#0C0C0C] sm:rounded-[28px] md:rounded-[32px]"
                style={{
                  borderColor: COLOR.mist,
                  boxShadow:
                    '0 40px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(182,0,168,0.15)',
                  width: 'clamp(150px, 22vw, 300px)',
                }}
              >
                <img
                  src={HERO_PORTRAIT_URL}
                  alt="Bikash Talukder"
                  className="block h-auto w-full select-none"
                  draggable={false}
                />
              </div>
            </Magnet>
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="relative z-30 flex w-full shrink-0 items-end justify-between gap-4 bg-[#0C0C0C] px-5 pb-6 sm:px-10 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} duration={0.7} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            a full-stack developer &amp; ai systems builder shipping production-grade products
          </p>
        </FadeIn>
        <FadeIn delay={0.5} duration={0.7} y={20} className="flex flex-wrap justify-end gap-3">
          <ContactButton
            href={resumeUrl}
            download="Bikash-Talukder-Resume.pdf"
            label="Download Resume"
            className="px-5 sm:px-6 md:px-8"
          />
          <ContactButton href="#contact" label="Contact Me" className="px-5 sm:px-6 md:px-8" />
        </FadeIn>
      </div>
    </main>
  );
}

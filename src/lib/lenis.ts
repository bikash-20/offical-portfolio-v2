/**
 * Lenis smooth-scroll runtime.
 *
 * Mounts a single global Lenis instance with a RAF loop and bridges scroll
 * progress into GSAP's ScrollTrigger ticker so any Framer Motion sections
 * that use `useScroll` stay in sync.
 *
 * Importing this module also applies the `.lenis` class to <html> so the
 * CSS rules in index.css take effect (preventing native scrollbar doubling).
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

export function startLenis(): Lenis {
  if (instance) return instance;

  instance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
  });

  // Bridge Lenis -> ScrollTrigger so any GSAP-driven scroll animations update.
  instance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    instance?.raf(time);
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('lenis');
  }

  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function stopLenis(): void {
  if (!instance) return;
  instance.destroy();
  instance = null;
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('lenis');
  }
}

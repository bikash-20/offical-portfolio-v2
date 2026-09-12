/**
 * Lenis smooth-scroll runtime.
 *
 * Tuned for low-CPU scroll on long pages:
 *  - Short duration so the easing curve settles within a frame or two.
 *  - ScrollTrigger only ticks when Lenis actually scrolls (no idle work).
 *  - Lenis is paused while the tab is hidden so background tabs don't burn CPU.
 *  - RAF callback is throttled to gsap.ticker so we don't double-tick.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;
let visibilityHandler: (() => void) | null = null;
let rafForInstance: ((time: number) => void) | null = null;

export function startLenis(): Lenis {
  if (instance) return instance;

  instance = new Lenis({
    duration: 0.6,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
    // Don't waste CPU on sub-pixel updates.
    lerp: 0.15,
  });

  instance.on('scroll', ScrollTrigger.update);

  // Use gsap.ticker as the RAF source so we're already aligned with ScrollTrigger.
  const raf = (time: number) => {
    instance?.raf(time * 1000);
  };
  rafForInstance = raf;
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Pause when tab hidden.
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('lenis');
    const onVis = () => {
      if (document.hidden) instance?.stop();
      else instance?.start();
    };
    visibilityHandler = onVis;
    document.addEventListener('visibilitychange', onVis);
  }

  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function stopLenis(): void {
  if (!instance) return;
  if (rafForInstance) {
    gsap.ticker.remove(rafForInstance);
    rafForInstance = null;
  }
  instance.off('scroll', ScrollTrigger.update);
  instance.destroy();
  instance = null;
  if (typeof document !== 'undefined') {
    if (visibilityHandler) {
      document.removeEventListener('visibilitychange', visibilityHandler);
      visibilityHandler = null;
    }
    document.documentElement.classList.remove('lenis');
  }
}

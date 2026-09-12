/**
 * Subscribe to Lenis scroll events and expose the current scroll position.
 * Returns the underlying Lenis instance (or `null` during SSR / before mount).
 */
import { useEffect, useState } from 'react';
import { getLenis, startLenis } from '../lib/lenis';
import type Lenis from 'lenis';

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(() => getLenis());

  useEffect(() => {
    const l = startLenis();
    setLenis(l);
  }, []);

  return lenis;
}

/**
 * Convenience: a numeric scroll-position value that re-renders the consumer
 * on every Lenis frame. For animation, prefer Framer Motion's `useScroll`
 * with `container` set to the Lenis element — this hook is for components
 * that just need a `window.scrollY`-style number.
 */
export function useLenisScrollY(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    const l = startLenis();
    const handler = (e: { scroll: number }) => setY(e.scroll);
    l.on('scroll', handler);
    return () => {
      l.off('scroll', handler);
    };
  }, []);

  return y;
}

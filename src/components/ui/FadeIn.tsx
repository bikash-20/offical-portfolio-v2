import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'> {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  children?: ReactNode;
}

/**
 * Lightweight, scroll-cheap reveal:
 *  - Uses a single IntersectionObserver (built into framer's `whileInView`)
 *    with `once: true` so it stops watching after the first reveal.
 *  - After the reveal, the motion component is **inert** — no `useMotionValue`,
 *    no `useTransform`, no per-frame work.
 *  - The `will-change` hint is applied only for the duration of the animation,
 *    then removed so the GPU can evict the layer.
 *  - `initial` is `false` on the server / first render so there's no flash.
 */
export default function FadeIn({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  children,
  ...rest
}: FadeInProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // After the animation duration, drop will-change so the GPU can reclaim the layer.
  useEffect(() => {
    if (!revealed) return;
    const el = ref.current;
    if (!el) return;
    const total = (duration + delay) * 1000 + 50;
    const id = window.setTimeout(() => {
      el.style.willChange = 'auto';
    }, total);
    return () => window.clearTimeout(id);
  }, [revealed, duration, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onAnimationComplete={() => setRevealed(true)}
      style={{ willChange: revealed ? 'auto' : 'transform, opacity' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

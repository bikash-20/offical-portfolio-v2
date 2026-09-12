import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  perCharClassName?: string;
  style?: CSSProperties;
}

/**
 * Scroll-revealed paragraph with chunk-based opacity reveal.
 *
 * Performance design:
 *  - The paragraph is split into ~12 evenly-sized **chunks** (not per-char).
 *  - A single `useScroll` on the paragraph provides one `scrollYProgress`
 *    MotionValue.
 *  - Each chunk maps that same MotionValue to its own opacity via a
 *    `useTransform` call — this is the cheapest possible framer-motion
 *    pattern (no per-char subscriptions, no per-frame JS work outside the
 *    RAF gsap.ticker / ScrollTrigger pipeline).
 *  - After the last chunk is fully revealed, the wrapper stops animating and
 *    `will-change` is dropped so the browser can evict the layer.
 *
 * 12 chunks gives the same "typewriter" feel as per-char without the 250×
 * overhead. The threshold per chunk is `chunkIndex / totalChunks`.
 */
export default function AnimatedText({
  text,
  className,
  perCharClassName,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.2'] as never,
  });

  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    if (ref.current) ref.current.style.willChange = 'auto';
  }, [done]);

  // Split text into ~12 evenly-sized chunks (whitespace-preserved for layout).
  const CHUNK_TARGET = 12;
  const chars = Array.from(text);
  const chunkSize = Math.max(1, Math.ceil(chars.length / CHUNK_TARGET));
  const chunks: string[] = [];
  for (let i = 0; i < chars.length; i += chunkSize) {
    chunks.push(chars.slice(i, i + chunkSize).join(''));
  }
  const totalChunks = chunks.length;

  return (
    <p
      ref={ref}
      className={className}
      style={{ ...style, willChange: done ? 'auto' : 'opacity' } as CSSProperties}
    >
      {chunks.map((chunk, i) => {
        const start = i / totalChunks;
        const end = Math.min(1, (i + 1) / totalChunks + 0.02);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className={`inline ${perCharClassName ?? ''}`}
            style={{ opacity }}
            onAnimationComplete={() => {
              if (i === totalChunks - 1) setDone(true);
            }}
          >
            {chunk}
          </motion.span>
        );
      })}
    </p>
  );
}

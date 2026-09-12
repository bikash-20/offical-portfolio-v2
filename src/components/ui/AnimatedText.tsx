import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  perCharClassName?: string;
  style?: CSSProperties;
}

/**
 * Splits the text into characters and animates each character's opacity from
 * 0.2 -> 1 based on its position relative to the element's scroll progress.
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
    offset: ['start 0.8', 'end 0.2'] as never,
  });

  const words = text.split(' ');
  let charIndex = 0;
  const totalChars = text.replace(/\s/g, '').length;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const chars = word.split('');
        const wordEl = (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {chars.map((ch, ci) => {
              const start = totalChars > 0 ? charIndex / totalChars : 0;
              const end = Math.min(1, (charIndex + 1) / totalChars);
              charIndex += 1;
              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.05), end],
                [0.2, 1]
              );
              return (
                <span
                  key={`c-${wi}-${ci}`}
                  className="relative inline-block"
                  aria-hidden="true"
                >
                  {/* placeholder so layout is stable */}
                  <span className="invisible">{ch}</span>
                  <motion.span
                    className={`absolute inset-0 ${perCharClassName ?? ''}`}
                    style={{ opacity }}
                  >
                    {ch}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
        charIndex += 1; // space
        return (
          <span key={`w-${wi}`}>
            {wordEl}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}

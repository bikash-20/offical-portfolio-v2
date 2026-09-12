import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { row1Images, row2Images } from '../../data/marquee';
import { startLenis } from '../../lib/lenis';

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      draggable={false}
      className="h-[270px] w-[420px] flex-shrink-0 rounded-2xl object-cover"
      style={{ willChange: 'transform' }}
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sectionTop, setSectionTop] = useState(0);

  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSectionTop(rect.top + window.scrollY);
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const lenis = startLenis();
    const onScroll = (e: { scroll: number }) => {
      const offset =
        (e.scroll - sectionTop + window.innerHeight) * 0.3;
      x1.set(offset - 200);
      x2.set(-(offset - 200));
    };
    onScroll({ scroll: window.scrollY });
    lenis.on('scroll', onScroll as never);
    return () => {
      lenis.off('scroll', onScroll as never);
    };
  }, [sectionTop, x1, x2]);

  // Ensure we render at least one row even if scroll-driven values are 0.
  const fallbackX1 = useTransform(x1, (v) => v);
  const fallbackX2 = useTransform(x2, (v) => v);

  const row1 = [...row1Images, ...row1Images, ...row1Images];
  const row2 = [...row2Images, ...row2Images, ...row2Images];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40"
    >
      <motion.div
        className="flex w-max gap-3"
        style={{ x: fallbackX1, willChange: 'transform' }}
      >
        {row1.map((src, i) => (
          <Tile key={`r1-${i}`} src={src} />
        ))}
      </motion.div>
      <div className="h-3" />
      <motion.div
        className="flex w-max gap-3"
        style={{ x: fallbackX2, willChange: 'transform' }}
      >
        {row2.map((src, i) => (
          <Tile key={`r2-${i}`} src={src} />
        ))}
      </motion.div>
    </section>
  );
}

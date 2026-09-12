import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { featuredProjects } from '../../data/projects';

const totalCards = featuredProjects.length;

function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const range: [number, number] = [
    Math.max(0, index * 0.18),
    Math.min(1, (index + 1) * 0.18 + 0.1),
  ];
  const targetScale = 1 - (totalCards - 1 - index) * 0.02;
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);
  const p = project;

  return (
    <div className="sticky top-24 h-[85vh] md:top-32" style={{ top: `${index * 28}px` }}>
      <motion.div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, willChange: 'transform' }}
      >
        <div className="flex flex-col gap-4 border-b border-[#D7E2EA]/15 pb-4 sm:flex-row sm:items-end sm:justify-between md:pb-6">
          <div className="flex items-end gap-4 sm:gap-8">
            <span className="text-[clamp(2.5rem,7vw,90px)] font-black leading-none text-[#D7E2EA]">
              {p.num}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">{p.category}</span>
              <h3 className="text-[clamp(1.1rem,2.4vw,2.4rem)] font-medium uppercase leading-tight text-[#D7E2EA]">{p.name}</h3>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#D7E2EA] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-6 sm:py-2.5 sm:text-sm">
                <ArrowUpRight className="h-3.5 w-3.5" /> Live Project
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer noopener" aria-label="Source code" className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10">
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <div className="relative mt-4 flex-1 overflow-hidden rounded-[28px] sm:mt-6 sm:rounded-[36px] md:rounded-[48px]">
          <img src={p.thumbnail} alt={`${p.name} screenshot`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent p-5 sm:p-8">
            <p className="max-w-3xl text-sm font-light leading-relaxed text-[#D7E2EA]/90 sm:text-base md:text-lg">{p.detail ?? p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.map((t) => <span key={t} className="rounded-full border border-[#D7E2EA]/30 bg-[#0C0C0C]/50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/90 backdrop-blur">{t}</span>)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative -mt-10 w-full rounded-t-[40px] bg-[#0C0C0C] z-10 sm:-mt-12 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px]"
    >
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2
          className="hero-heading px-5 pb-12 pt-24 text-center font-black uppercase leading-none tracking-tight sm:px-8 sm:pb-16 md:px-10 md:pb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-32 sm:px-8 md:px-10">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

import { ExternalLink, Github, Star } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { projects } from '../../data/projects';

const nonFeatured = projects.filter((p) => !p.featured);

export default function AllProjectsGrid() {
  return (
    <section className="relative w-full bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
          All Projects
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nonFeatured.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.05} duration={0.6} y={20}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#D7E2EA]/15 bg-[#0C0C0C] transition-all duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]/40 hover:shadow-2xl">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.thumbnail}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#0C0C0C]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA] backdrop-blur">
                  <Star className="h-3 w-3" /> {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-[#D7E2EA]/40">
                    #{p.num}
                  </span>
                  <h3 className="text-xl font-medium uppercase tracking-wide text-[#D7E2EA]">
                    {p.name}
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/70">
                  {p.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#D7E2EA]/15 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[#D7E2EA]/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <a
                    href={p.live ?? '#'}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#D7E2EA] px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-opacity hover:opacity-80"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                  <a
                    href={p.repo ?? '#'}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/30 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

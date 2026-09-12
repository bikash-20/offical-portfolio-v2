import FadeIn from '../ui/FadeIn';
import { interests } from '../../data/interests';

export default function InterestsSection() {
  return (
    <section className="relative w-full bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
          Interests &amp; Research
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {interests.map((it, i) => {
          const Icon = it.icon;
          return (
            <FadeIn key={it.name} delay={i * 0.07} duration={0.6} y={20}>
              <article className="group flex h-full flex-col gap-3 rounded-3xl border border-[#D7E2EA]/15 bg-[#0C0C0C]/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B600A8]/60 hover:shadow-[0_20px_60px_rgba(182,0,168,0.2)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#18011F] via-[#7621B0] to-[#BE4C00] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium uppercase tracking-wide text-[#D7E2EA]">
                  {it.name}
                </h3>
                <p className="text-xs font-light leading-relaxed text-[#D7E2EA]/70">
                  {it.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {it.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#D7E2EA]/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#D7E2EA]/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
      <FadeIn delay={0.4} duration={0.7} y={20}>
        <div className="mx-auto mt-10 flex max-w-3xl justify-center">
          <span className="rounded-full border border-[#D7E2EA]/30 px-4 py-1.5 text-xs uppercase tracking-widest text-[#D7E2EA]/70">
            Future Learning Roadmap · 2026 → 2028
          </span>
        </div>
      </FadeIn>
    </section>
  );
}

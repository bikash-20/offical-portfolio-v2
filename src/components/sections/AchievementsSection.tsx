import FadeIn from '../ui/FadeIn';
import { achievements } from '../../data/achievements';

export default function AchievementsSection() {
  return (
    <section className="relative w-full bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}>
          Achievements
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Icon = a.icon;
          return (
            <FadeIn key={a.title} delay={i * 0.08} duration={0.6} y={20}>
              <article className="group flex h-full flex-col gap-4 rounded-3xl border border-[#D7E2EA]/15 bg-gradient-to-br from-[#0C0C0C] to-[#18011F]/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]/40 hover:shadow-[0_20px_60px_rgba(182,0,168,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#D7E2EA]/10 text-[#D7E2EA] transition-colors group-hover:bg-[#B600A8] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                    {a.year}
                  </span>
                </div>
                <div>
                  {a.highlight && (
                    <span className="mb-2 inline-block rounded-full bg-[#B600A8]/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-[#E879F9]">
                      {a.highlight}
                    </span>
                  )}
                  <h3 className="text-[clamp(1rem,1.8vw,1.4rem)] font-medium uppercase leading-tight text-[#D7E2EA]">
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/70">
                  {a.detail}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-[#D7E2EA]/50">
                  <span>{a.org}</span>
                  {a.cert && (
                    <a
                      href={a.cert}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-[#D7E2EA]/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
                    >
                      Certificate
                    </a>
                  )}
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

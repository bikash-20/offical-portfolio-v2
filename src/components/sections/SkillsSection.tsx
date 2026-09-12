import FadeIn from '../ui/FadeIn';
import { skillCategories } from '../../data/skills';

export default function SkillsSection() {
  return (
    <section className="relative w-full bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="mb-12 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
          Skills &amp; Tools
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <FadeIn key={cat.name} delay={i * 0.05} duration={0.6} y={20}>
              <div
                className={`group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${cat.accent}`}
                />
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0C0C0C] text-[#D7E2EA] transition-colors duration-300 group-hover:bg-[#B600A8]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-[#0C0C0C] text-[clamp(1rem,2vw,1.6rem)] font-medium uppercase leading-none">
                    {cat.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#0C0C0C]/15 bg-white px-3 py-1 text-xs text-[#0C0C0C]/80 transition-colors duration-200 group-hover:border-[#B600A8]/40 group-hover:text-[#0C0C0C]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

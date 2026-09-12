import FadeIn from '../ui/FadeIn';
import { services } from '../../data/services';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} duration={0.7} y={30}>
        <h2 className="mb-12 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-16 md:mb-20" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
          Services
        </h2>
      </FadeIn>
      <div className="mx-auto flex max-w-5xl flex-col">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} duration={0.7} y={20}>
            <div
              className={`flex flex-col items-start gap-6 py-8 sm:py-10 md:flex-row md:items-center md:gap-12 md:py-12 ${
                i === 0 ? '' : 'border-t'
              }`}
              style={{
                borderColor:
                  i === 0 ? 'transparent' : 'rgba(12, 12, 12, 0.15)',
              }}
            >
              <div className="flex-shrink-0 text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">
                {s.num}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="font-medium uppercase leading-tight text-[#0C0C0C]" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}>
                  {s.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed opacity-60"
                  style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)', color: '#0C0C0C' }}
                >
                  {s.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

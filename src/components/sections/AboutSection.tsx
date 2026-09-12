import FadeIn from '../ui/FadeIn';
import AnimatedText from '../ui/AnimatedText';
import ContactButton from '../ui/ContactButton';
import { ABOUT_PORTRAIT_URL, PROFILE } from '../../data/profile';

const ABOUT_TEXT =
  "Hi, I'm Bikash — a computer science student and a full-stack developer obsessed with AI-driven products. With 82+ public repos, 13+ shipped projects, and two national hackathon finals under my belt, I focus on building production-grade systems that blend clean engineering with thoughtful design. Let's build something incredible together!";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-[#0C0C0C] px-5 py-20 sm:gap-14 sm:px-8 sm:py-24 md:gap-16 md:px-10 md:py-32"
    >
      {/* Decorative images */}
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>
      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>
      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>
      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      {/* Heading */}
      <FadeIn delay={0} duration={0.7} y={40}>
        <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
          About me
        </h2>
      </FadeIn>

      {/* Animated paragraph + portrait */}
      <div className="z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
        />
        <FadeIn delay={0.2} duration={0.7} y={20} className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <img
            src={ABOUT_PORTRAIT_URL}
            alt={PROFILE.name}
            className="h-32 w-32 rounded-full border-2 border-[#D7E2EA] object-cover shadow-2xl"
          />
          <ContactButton href="#contact" label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  );
}

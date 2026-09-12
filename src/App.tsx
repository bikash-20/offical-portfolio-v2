import { useEffect, lazy, Suspense } from 'react';
import HeroSection from './components/sections/HeroSection';
import MarqueeSection from './components/sections/MarqueeSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AllProjectsGrid from './components/sections/AllProjectsGrid';
import AchievementsSection from './components/sections/AchievementsSection';
import DashboardSection from './components/sections/DashboardSection';
import InterestsSection from './components/sections/InterestsSection';
import ContactSection from './components/sections/ContactSection';
import { startLenis, stopLenis } from './lib/lenis';

// Lazy-load the chatbot — it pulls in react-markdown, KaTeX, syntax
// highlighting and the OpenRouter client. Keeping it out of the initial
// bundle keeps first paint fast.
const BikashAI = lazy(() => import('./components/widgets/bikash-ai'));

export default function App() {
  useEffect(() => {
    startLenis();
    return stopLenis;
  }, []);

  return (
    <div className="relative w-full overflow-x-clip bg-[#0C0C0C] text-mist">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <AllProjectsGrid />
      <AchievementsSection />
      <DashboardSection />
      <InterestsSection />
      <ContactSection />
      <Suspense fallback={null}>
        <BikashAI />
      </Suspense>
    </div>
  );
}

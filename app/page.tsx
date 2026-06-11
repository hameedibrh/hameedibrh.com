import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Resume from '@/components/sections/Resume';
import Portfolio from '@/components/sections/Portfolio';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Contact from '@/components/sections/Contact';
import Terminal from '@/components/easter-eggs/Terminal';
import KonamiCode from '@/components/easter-eggs/KonamiCode';
import ConsoleGreeting from '@/components/easter-eggs/ConsoleGreeting';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Resume />
        <Portfolio />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />

      {/* Easter eggs */}
      <Terminal />
      <KonamiCode />
      <ConsoleGreeting />
    </>
  );
}

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { KonamiCode } from '@/components/easter-eggs/KonamiCode';
import { CursorTracker } from '@/components/easter-eggs/CursorTracker';
import {
  getPersonalInfo,
  getSocialLinks,
  getSkills,
  getExperience,
  getEducation,
  getPortfolio,
  getServices,
  getContactInfo,
} from '@/lib/content';

export default function Home() {
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const skills = getSkills();
  const experience = getExperience();
  const education = getEducation();
  const portfolio = getPortfolio();
  const services = getServices();
  const contactInfo = getContactInfo();

  return (
    <>
      <KonamiCode />
      <CursorTracker>
        <HeroSection personalInfo={personalInfo} socialLinks={socialLinks} />
      </CursorTracker>
      <AboutSection personalInfo={personalInfo} skills={skills} />
      <ResumeSection experience={experience} education={education} />
      <PortfolioSection items={portfolio} />
      <ServicesSection services={services} />
      <ContactSection contactInfo={contactInfo} />
    </>
  );
}

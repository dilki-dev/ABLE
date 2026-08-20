import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectSpotlight } from "@/components/sections/project-spotlight";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <LogoCloud />
        <ServicesSection />
        <ProcessSection />
        <ProjectSpotlight />
        <TestimonialSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}

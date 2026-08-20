import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MapSection } from "@/components/sections/map-section";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { ServiceAreas } from "@/components/sections/service-areas";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { MobileCallBar } from "@/components/ui/mobile-call-bar";
import { services } from "@/data/site-content";
import { siteConfig } from "@/lib/site-config";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteConfig.description,
  telephone: siteConfig.phoneRaw,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "65/62 Kahawita Mawatha, Attidiya",
    addressLocality: "Dehiwala",
    addressCountry: "LK",
  },
  areaServed: [
    { "@type": "City", name: "Colombo" },
    { "@type": "Country", name: "Sri Lanka" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property maintenance services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.text },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <WhyChooseUs />
        <Projects />
        <Process />
        <Testimonials />
        <ServiceAreas />
        <FAQ />
        <MapSection />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCallBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}

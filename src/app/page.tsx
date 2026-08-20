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
import { getSiteContent } from "@/backend/content-repository";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

export default async function HomePage() {
  const content = await getSiteContent();
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: content.business.name,
    url: siteConfig.siteUrl,
    description: content.business.description,
    telephone: content.business.phoneRaw,
    email: content.business.email,
    address: { "@type": "PostalAddress", streetAddress: content.business.address, addressCountry: "LK" },
    areaServed: [{ "@type": "City", name: "Colombo" }, { "@type": "Country", name: "Sri Lanka" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Property maintenance services",
      itemListElement: content.services.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title, description: service.text } })),
    },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header business={content.business} navigation={content.navigation} />
      <main id="main-content">
        <Hero business={content.business} content={content.hero} />
        <TrustBar items={content.trustItems} />
        <Services copy={content.servicesSection} services={content.services} />
        <About content={content.about} />
        <WhyChooseUs content={content.whyChoose} />
        <Projects copy={content.projectsSection} projects={content.projects} />
        <Process copy={content.processSection} steps={content.processSteps} />
        <Testimonials content={content.testimonials} />
        <ServiceAreas content={content.areas} />
        <FAQ copy={content.faqSection} faqs={content.faqs} />
        <MapSection business={content.business} content={content.map} />
        <Contact business={content.business} content={content.contact} services={content.services} />
        <FinalCTA business={content.business} content={content.finalCta} />
      </main>
      <Footer business={content.business} navigation={content.navigation} />
      <FloatingWhatsApp business={content.business} />
      <MobileCallBar business={content.business} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}

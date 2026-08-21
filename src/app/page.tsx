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
import { getSiteContent } from "@/backend/content-repository";
import { siteConfig } from "@/lib/site-config";
import { listPublishedProjects, listPublishedTestimonials } from "@/backend/portfolio";

export const revalidate = 300;

export default async function HomePage() {
  const [content, projects, testimonials] = await Promise.all([getSiteContent(), listPublishedProjects(), listPublishedTestimonials()]);
  const navigation = projects.length ? content.navigation : content.navigation.filter((item) => item.href !== "#projects");
  const absoluteImageUrl = content.hero.image.startsWith("http") ? content.hero.image : `${siteConfig.siteUrl}${content.hero.image}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteConfig.siteUrl}/#website`, url: siteConfig.siteUrl, name: content.business.name, description: content.business.description, inLanguage: "en-LK", publisher: { "@id": `${siteConfig.siteUrl}/#business` } },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteConfig.siteUrl}/#business`,
        name: content.business.name,
        url: siteConfig.siteUrl,
        image: absoluteImageUrl,
        description: content.business.description,
        telephone: content.business.phoneRaw,
        email: content.business.email,
        address: { "@type": "PostalAddress", streetAddress: content.business.address, addressCountry: "LK" },
        areaServed: [{ "@type": "AdministrativeArea", name: "Greater Colombo" }, { "@type": "Country", name: "Sri Lanka" }],
        contactPoint: { "@type": "ContactPoint", telephone: content.business.phoneRaw, email: content.business.email, contactType: "customer service", areaServed: "LK", availableLanguage: ["English"] },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Property maintenance services", itemListElement: content.services.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title, description: service.text, areaServed: "Greater Colombo, Sri Lanka" } })) },
      },
      { "@type": "FAQPage", "@id": `${siteConfig.siteUrl}/#faq`, mainEntity: content.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header business={content.business} navigation={navigation} />
      <main id="main-content">
        <Hero business={content.business} content={content.hero} />
        <TrustBar items={content.trustItems} />
        <Services copy={content.servicesSection} services={content.services} />
        <About content={content.about} />
        <WhyChooseUs content={content.whyChoose} />
        <Projects copy={content.projectsSection} projects={projects} />
        <Process copy={content.processSection} steps={content.processSteps} />
        <Testimonials content={content.testimonials} testimonials={testimonials} />
        <ServiceAreas content={content.areas} />
        <FAQ copy={content.faqSection} faqs={content.faqs} />
        <MapSection business={content.business} content={content.map} />
        <Contact business={content.business} content={content.contact} services={content.services} />
        <FinalCTA business={content.business} content={content.finalCta} />
      </main>
      <Footer business={content.business} navigation={navigation} />
      <FloatingWhatsApp business={content.business} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}

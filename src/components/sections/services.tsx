import type { SiteContent } from "@/cms/content-schema";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";

export function Services({ copy, services }: { copy: SiteContent["servicesSection"]; services: SiteContent["services"] }) {
  return (
    <section id="services" className="section-space bg-[var(--soft)]">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} /></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => <Reveal key={service.title} delay={(index % 4) * .04}><ServiceCard {...service} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

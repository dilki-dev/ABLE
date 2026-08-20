import { services } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";

export function Services() {
  return (
    <section id="services" className="section-space bg-[#f7f7f5]">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow="Services" title="Practical care for every part of your property" description="From a focused repair to a wider refurbishment, choose the service that best matches what needs attention." /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => <Reveal key={service.title} delay={(index % 4) * .04}><ServiceCard {...service} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

import { MapPin, Siren } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MapSection } from "./map-section";

export function ServiceAreas({ business, content, map }: { business: SiteContent["business"]; content: SiteContent["areas"]; map: SiteContent["map"] }) {
  return (
    <section id="areas" className="section-space relative overflow-hidden bg-[var(--sky-soft)]">
      <div className="architectural-grid absolute inset-0 opacity-50" />
      <div className="site-container relative grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center xl:gap-16">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {content.items.map((area) => <span key={area} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 text-xs font-extrabold text-[var(--ink)]"><MapPin aria-hidden="true" className="h-3.5 w-3.5 text-sky-600" />{area}</span>)}
          </div>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-orange-200 bg-white p-5 shadow-[0_10px_30px_rgba(21,23,20,.05)]">
            <Siren aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#f97316]" />
            <div><h3 className="font-extrabold">{content.urgentTitle}</h3><p className="mt-1 text-sm leading-6 text-[#64645f]">{content.urgentText}</p></div>
          </div>
        </Reveal>
        <Reveal><MapSection business={business} content={map} /></Reveal>
      </div>
    </section>
  );
}

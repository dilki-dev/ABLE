import { MapPin, Siren } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServiceAreas({ content }: { content: SiteContent["areas"] }) {
  return (
    <section id="areas" className="section-space relative overflow-hidden bg-sky-50">
      <div className="absolute inset-0 dot-texture opacity-40" />
      <div className="site-container relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <div className="mt-7 flex items-start gap-4 rounded-2xl border border-orange-200 bg-white p-5">
            <Siren aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#f97316]" />
            <div><h3 className="font-extrabold">{content.urgentTitle}</h3><p className="mt-1 text-sm leading-6 text-[#64645f]">{content.urgentText}</p></div>
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {content.items.map((area) => <div key={area} className="flex min-h-24 flex-col items-center justify-center rounded-2xl border border-sky-200 bg-white p-4 text-center shadow-sm"><MapPin aria-hidden="true" className="h-5 w-5 text-[#38bdf8]" /><span className="mt-2 text-sm font-extrabold">{area}</span></div>)}
        </Reveal>
      </div>
    </section>
  );
}

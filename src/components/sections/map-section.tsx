import { ExternalLink, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

export function MapSection() {
  return (
    <section aria-labelledby="map-title" className="bg-[#111111] py-12 text-white">
      <div className="site-container grid overflow-hidden rounded-3xl bg-[#1a1a1a] lg:grid-cols-[.85fr_1.4fr]">
        <Reveal className="flex flex-col justify-center p-8 sm:p-12">
          <MapPin aria-hidden="true" className="h-8 w-8 text-[#38bdf8]" />
          <h2 id="map-title" className="mt-6 text-3xl font-extrabold tracking-[-.03em]">Find ABLE in Attidiya</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">{siteConfig.address}</p>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-[#f97316] px-5 py-3 text-sm font-extrabold text-white">Get directions <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
        </Reveal>
        <iframe title="Map showing ABLE Property Maintenance in Attidiya, Dehiwala" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-[380px] w-full border-0 grayscale-[.15]" />
      </div>
    </section>
  );
}

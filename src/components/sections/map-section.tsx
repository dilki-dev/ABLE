import { ExternalLink, MapPin } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";

export function MapSection({ business, content }: { business: SiteContent["business"]; content: SiteContent["map"] }) {
  const config = publicConfig(business);
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-sky-200 bg-white shadow-[0_24px_65px_rgba(21,23,20,.1)]">
      <iframe title="Map showing ABLE Property Maintenance location" src={content.embedUrl || config.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-[360px] w-full border-0 grayscale-[.08] sm:min-h-[430px]" />
      <div className="flex flex-col gap-5 border-t border-[#e4e5df] bg-[#151714] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 gap-3"><MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" /><div><h3 id="map-title" className="font-extrabold">{content.title}</h3><p className="mt-1 text-xs leading-5 text-white/60">{content.description}</p></div></div>
        <a href={config.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary shrink-0 px-4">Get directions <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
      </div>
    </div>
  );
}

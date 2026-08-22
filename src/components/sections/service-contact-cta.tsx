import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ServiceContactCTA({ service }: { service: string }) {
  const quoteHref = `/?service=${encodeURIComponent(service)}#contact`;
  return <section className="section-space bg-[#151714] text-white">
    <div className="site-container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
      <div><p className="eyebrow text-orange-300">Request a site assessment</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">Tell us about the building and the work required.</h2><p className="mt-4 max-w-3xl text-base leading-8 text-white/65">Send the location, building type, photographs and the exterior areas that need attention. ABLE will review whether the enquiry is a suitable fit and what assessment is needed.</p></div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <Link href={quoteHref} className="btn btn-primary">Request a quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        <a href={siteConfig.phoneHref} className="btn border-white/20 bg-white/5 text-white hover:bg-white/10"><Phone aria-hidden="true" className="h-4 w-4" />Call</a>
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="btn border-green-400/25 bg-green-400/10 text-green-200 hover:bg-green-400/15"><MessageCircle aria-hidden="true" className="h-4 w-4" />WhatsApp</a>
      </div>
    </div>
  </section>;
}

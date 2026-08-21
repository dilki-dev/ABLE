import { ArrowRight, Phone } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { Reveal } from "@/components/ui/reveal";

export function FinalCTA({ business, content }: { business: SiteContent["business"]; content: SiteContent["finalCta"] }) {
  const config = publicConfig(business);
  return (
    <section className="relative overflow-hidden bg-[#161815] py-16 text-white sm:py-20">
      <div className="absolute inset-0 architectural-grid opacity-20" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
      <Reveal className="site-container relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-orange-400">{content.eyebrow}</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">{content.title}</h2></div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={config.phoneHref} className="btn border border-white/25 bg-white/5 text-white hover:bg-white/10"><Phone aria-hidden="true" className="h-4 w-4" /> Call ABLE</a>
          <a href="#contact" className="btn btn-primary">Request a quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </div>
      </Reveal>
    </section>
  );
}

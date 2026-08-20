import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f97316] py-16 text-white sm:py-20">
      <div className="absolute inset-0 grid-texture opacity-25" />
      <div className="site-container relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-orange-100">Ready when your property needs attention</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">Let’s make the next repair easier to organise.</h2></div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-4 text-sm font-extrabold"><Phone aria-hidden="true" className="h-4 w-4" /> Call ABLE</a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-4 text-sm font-extrabold text-[#111111]">Request a quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

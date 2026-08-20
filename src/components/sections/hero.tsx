import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[680px] overflow-hidden bg-[#111111] text-white">
      <Image src="/images/hero-property-maintenance.png" alt="Property maintenance professional repairing a modern home in Sri Lanka" fill priority sizes="100vw" className="-z-20 object-cover object-[66%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,.97)_0%,rgba(10,10,10,.87)_38%,rgba(10,10,10,.25)_72%,rgba(10,10,10,.1)_100%)]" />
      <div className="absolute inset-0 -z-10 grid-texture opacity-30" />
      <div className="site-container flex min-h-[680px] items-center py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-orange-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-400" /> Emergency repair enquiries welcome
          </div>
          <p className="mt-8 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-sky-300"><MapPin aria-hidden="true" className="h-4 w-4" /> Colombo & throughout Sri Lanka</p>
          <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-.045em] sm:text-6xl lg:text-7xl">Reliable Property Care.<br /><span className="text-[#f97316]">Built to Last.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-xl">{siteConfig.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f97316] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#df5f0e]"><Phone aria-hidden="true" className="h-4 w-4" /> Call now</a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white hover:text-[#111111]">Request a quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-extrabold text-white backdrop-blur transition hover:border-green-400 hover:bg-green-600"><MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-white/70">
            <span className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="h-4 w-4 text-sky-300" /> Multi-service support</span>
            <span className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="h-4 w-4 text-sky-300" /> Clear project communication</span>
          </div>
        </div>
      </div>
    </section>
  );
}

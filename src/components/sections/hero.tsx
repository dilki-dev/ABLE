import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone, Wrench } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { Reveal } from "@/components/ui/reveal";

export function Hero({ business, content }: { business: SiteContent["business"]; content: SiteContent["hero"] }) {
  const config = publicConfig(business);
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[var(--canvas)] text-[var(--ink)]">
      <div className="architectural-grid absolute inset-0 -z-20 opacity-70" />
      <div className="absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-orange-100/65 blur-3xl" />
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="site-container grid items-center gap-12 py-12 sm:gap-14 sm:py-16 lg:min-h-[690px] lg:grid-cols-[minmax(0,1fr)_minmax(440px,.9fr)] lg:py-20 xl:gap-20">
        <Reveal className="min-w-0 py-2 sm:py-4">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-[11px] font-extrabold uppercase leading-5 tracking-[.14em] text-orange-800">
            <span className="status-pulse h-2 w-2 shrink-0 rounded-full bg-[#f36b16]" /> {content.badge}
          </div>
          <p className="mt-7 flex items-start gap-2 text-xs font-extrabold uppercase leading-6 tracking-[.14em] text-sky-700"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> {content.location}</p>
          <h1 className="mt-4 max-w-4xl break-words text-[clamp(2.25rem,11vw,5.3rem)] font-black leading-[1.02] tracking-[-.055em] text-balance lg:leading-[.98] lg:tracking-[-.06em]">{content.headline}<br /><span className="text-[#f36b16]">{content.headlineAccent}</span></h1>
          <p className="body-copy mt-7 max-w-2xl text-base sm:text-lg">{content.description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="btn btn-primary hero-quote-button">Request a quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            <a href={config.phoneHref} className="btn btn-dark"><Phone aria-hidden="true" className="h-4 w-4" /> Call Us</a>
            <a href={config.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary"><MessageCircle aria-hidden="true" className="h-4 w-4 text-green-600" /> WhatsApp</a>
          </div>
          <div className="mt-9 grid max-w-2xl gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
            {[...content.bullets, "Selected island-wide projects"].slice(0, 3).map((bullet) => <span key={bullet} className="flex items-start gap-2 text-xs font-bold leading-5 text-[var(--muted)]"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /> {bullet}</span>)}
          </div>
        </Reveal>
        <Reveal className="relative mx-auto w-full max-w-[620px] lg:mx-0">
          <div className="absolute -left-5 -top-5 h-28 w-28 rounded-[1.5rem] border border-sky-200 bg-sky-100/75" />
          <div className="absolute -bottom-5 -right-4 h-36 w-36 rounded-[1.5rem] bg-orange-100" />
          <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.5rem] border-[6px] border-white bg-stone-100 shadow-[0_30px_90px_rgba(21,23,20,.18)] sm:aspect-[5/4] sm:rounded-[2rem] sm:border-[10px] lg:aspect-[4/4.35]">
            <Image src={content.image} alt="Property maintenance professional working in a modern Sri Lankan home" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="absolute -bottom-4 left-4 right-8 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 text-[#151714] shadow-[0_18px_45px_rgba(21,23,20,.16)] backdrop-blur sm:left-8 sm:right-auto sm:max-w-xs">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#f36b16]"><Wrench aria-hidden="true" className="h-5 w-5" /></span>
            <span><span className="block text-sm font-black">One team, practical support</span><span className="mt-1 block text-xs leading-5 text-[#656861]">Repairs, maintenance and planned improvements.</span></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

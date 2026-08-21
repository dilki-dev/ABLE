import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="about" className="section-space overflow-hidden bg-[var(--surface)]">
      <div className="site-container grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
        <Reveal className="relative">
          <div className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] border border-sky-200 bg-sky-50" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-stone-100 shadow-[0_26px_70px_rgba(21,23,20,.12)]"><Image src={content.image} alt="ABLE property maintenance team reviewing a wall repair in a Sri Lankan home" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" /></div>
          <div className="absolute -bottom-5 right-3 rounded-2xl border border-white/10 bg-[#151714] p-5 text-white shadow-xl sm:right-7"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-sky-300">{content.badgeLabel}</p><p className="mt-2 flex items-center gap-2 font-extrabold"><MapPin aria-hidden="true" className="h-4 w-4 text-orange-400" /> {content.badgeValue}</p></div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <p className="body-copy mt-6">{content.body}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {content.bullets.map((item) => <li key={item} className="flex items-center gap-3 border-b border-[var(--line)] pb-3 text-sm font-bold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700"><Check aria-hidden="true" className="h-4 w-4" /></span>{item}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

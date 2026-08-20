import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="about" className="section-space overflow-hidden bg-white">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100"><Image src={content.image} alt="ABLE property maintenance team reviewing a wall repair in a Sri Lankan home" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
          <div className="absolute -bottom-5 -right-2 rounded-2xl bg-[#111111] p-5 text-white shadow-xl sm:right-5"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-sky-300">{content.badgeLabel}</p><p className="mt-2 flex items-center gap-2 font-extrabold"><MapPin aria-hidden="true" className="h-4 w-4 text-orange-400" /> {content.badgeValue}</p></div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <p className="mt-6 leading-7 text-[#64645f]">{content.body}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {content.bullets.map((item) => <li key={item} className="flex items-center gap-3 text-sm font-bold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700"><Check aria-hidden="true" className="h-4 w-4" /></span>{item}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

import { CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyChooseUs({ content }: { content: SiteContent["whyChoose"] }) {
  return (
    <section className="section-space relative overflow-hidden bg-[#111111] text-white">
      <div className="absolute inset-0 grid-texture opacity-40" />
      <div className="site-container relative">
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} inverted /></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 3) * .05} className="relative h-full bg-[#181a17] p-7 sm:p-8">
              <span className="absolute right-6 top-5 text-4xl font-black tracking-[-.05em] text-white/[.06]">0{index + 1}</span>
              <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-sky-300" />
              <h3 className="mt-5 text-xl font-extrabold">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{reason.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

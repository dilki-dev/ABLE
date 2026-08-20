import { ArrowDown, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process({ copy, steps }: { copy: SiteContent["processSection"]; steps: SiteContent["processSteps"] }) {
  return (
    <section id="process" className="section-space bg-[#f7f7f5]">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} align="center" /></Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * .06} className="relative rounded-2xl border border-[#e7e7e3] bg-white p-7">
              <span className="text-4xl font-black text-orange-200">{step.number}</span>
              <h3 className="mt-6 text-xl font-extrabold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#64645f]">{step.text}</p>
              {index < steps.length - 1 ? <><ArrowRight aria-hidden="true" className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 rounded-full bg-[#38bdf8] p-2 text-[#111111] lg:block" /><ArrowDown aria-hidden="true" className="absolute -bottom-4 left-1/2 z-10 h-8 w-8 rounded-full bg-[#38bdf8] p-2 text-[#111111] lg:hidden" /></> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

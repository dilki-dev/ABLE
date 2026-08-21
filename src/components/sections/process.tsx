import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process({ copy, steps }: { copy: SiteContent["processSection"]; steps: SiteContent["processSteps"] }) {
  return (
    <section id="process" className="section-space bg-[var(--surface)]">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} align="center" /></Reveal>
        <div className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6 before:absolute before:left-[12.5%] before:right-[12.5%] before:top-7 before:hidden before:h-px before:bg-[#d9dad4] lg:before:block">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * .06} className="relative grid grid-cols-[56px_1fr] gap-5 lg:block lg:text-center">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--surface)] bg-[#151714] text-sm font-black text-white shadow-[0_0_0_1px_var(--line)] lg:mx-auto">{step.number}</span>
              <div><h3 className="text-lg font-extrabold lg:mt-6">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2 } from "lucide-react";
import { reasons } from "@/data/site-content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyChooseUs() {
  return (
    <section className="section-space relative overflow-hidden bg-[#111111] text-white">
      <div className="absolute inset-0 grid-texture opacity-40" />
      <div className="site-container relative">
        <Reveal><SectionHeading eyebrow="Why choose us" title="Less friction. More confidence in the work." description="A straightforward service experience built around communication, respect and useful results." inverted /></Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 3) * .05} className="h-full bg-[#171717] p-7 sm:p-8">
              <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-[#38bdf8]" />
              <h3 className="mt-5 text-xl font-extrabold">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{reason.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

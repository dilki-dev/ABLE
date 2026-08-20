import { MessageSquareQuote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow="Customer feedback" title="A home for verified reviews" description="This section is intentionally transparent: real customer feedback should only be added after the customer has approved the wording and attribution." align="center" /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {["Homeowner review", "Landlord review", "Property manager review"].map((title, index) => (
            <Reveal key={title} delay={index * .06} className="rounded-2xl border border-dashed border-[#cacac4] bg-[#fafaf8] p-7 text-center">
              <MessageSquareQuote aria-hidden="true" className="mx-auto h-8 w-8 text-[#38bdf8]" />
              <h3 className="mt-5 font-extrabold">{title} placeholder</h3>
              <p className="mt-3 text-sm leading-6 text-[#777771]">Add a genuine, permission-approved customer quote here. Do not publish invented reviews.</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

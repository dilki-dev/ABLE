import { MessageSquareQuote } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials({ content }: { content: SiteContent["testimonials"] }) {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {content.items.map((item, index) => (
            <Reveal key={item.title} delay={index * .06} className="rounded-2xl border border-dashed border-[#cacac4] bg-[#fafaf8] p-7 text-center">
              <MessageSquareQuote aria-hidden="true" className="mx-auto h-8 w-8 text-[#38bdf8]" />
              <h3 className="mt-5 font-extrabold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#777771]">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

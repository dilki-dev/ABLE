import { MessageSquareQuote } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/backend/portfolio";

export function Testimonials({ content, testimonials }: { content: SiteContent["testimonials"]; testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * .06} className="rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-7 text-center shadow-sm">
              <MessageSquareQuote aria-hidden="true" className="mx-auto h-8 w-8 text-[#38bdf8]" />
              {item.rating ? <p aria-label={`${item.rating} out of 5 stars`} className="mt-4 text-sm tracking-[.15em] text-amber-500">{"★".repeat(item.rating)}<span className="text-[#cacac4]">{"★".repeat(5 - item.rating)}</span></p> : null}
              <blockquote className="mt-4 text-sm leading-7 text-[#64645f]">“{item.review}”</blockquote>
              <p className="mt-5 font-extrabold">{item.customer_name}</p>
              {item.location ? <p className="mt-1 text-xs text-[#777771]">{item.location}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

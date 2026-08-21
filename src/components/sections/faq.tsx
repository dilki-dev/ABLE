"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { SectionHeading } from "@/components/ui/section-heading";
import { publicConfig } from "@/cms/public-config";

export function FAQ({ business, copy, faqs }: { business: SiteContent["business"]; copy: SiteContent["faqSection"]; faqs: SiteContent["faqs"] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const config = publicConfig(business);
  return (
    <section id="faq" className="section-space bg-[var(--surface)]">
      <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start"><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} /><div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><a href={config.phoneHref} className="btn btn-dark"><Phone aria-hidden="true" className="h-4 w-4" />Call ABLE</a><a href={config.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-secondary"><MessageCircle aria-hidden="true" className="h-4 w-4 text-green-600" />WhatsApp</a></div></div>
        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_55px_rgba(21,23,20,.06)]">
          {faqs.map((faq, index) => {
            const open = index === openIndex;
            return (
              <div key={faq.question} className="border-b border-[var(--line)] last:border-b-0">
                <button id={`faq-button-${index}`} type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open} aria-controls={`faq-panel-${index}`} className="flex min-h-16 w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-extrabold transition hover:bg-[var(--soft)] sm:px-7 sm:text-lg">
                  {faq.question}<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50"><ChevronDown aria-hidden="true" className={`h-4 w-4 text-[#f36b16] transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></span>
                </button>
                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={!open} className="px-5 pb-6 pr-12 text-sm leading-7 text-[var(--muted)] sm:px-7 sm:pr-16">{faq.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

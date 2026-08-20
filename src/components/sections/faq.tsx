"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="section-space bg-white">
      <div className="site-container grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div><SectionHeading eyebrow="FAQ" title="Useful answers before you enquire" description="If your situation is different, send the details and ABLE can confirm whether the job is a suitable fit." /></div>
        <div className="divide-y divide-[#e7e7e3] border-y border-[#e7e7e3]">
          {faqs.map((faq, index) => {
            const open = index === openIndex;
            return (
              <div key={faq.question}>
                <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open} aria-controls={`faq-panel-${index}`} className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-extrabold sm:text-lg">
                  {faq.question}<ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-[#f97316] transition ${open ? "rotate-180" : ""}`} />
                </button>
                <div id={`faq-panel-${index}`} hidden={!open} className="pb-6 pr-10 text-sm leading-7 text-[#64645f]">{faq.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

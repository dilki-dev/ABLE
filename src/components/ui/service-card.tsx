import { ArrowUpRight } from "lucide-react";
import type { IconName } from "@/data/site-content";
import { ServiceIcon } from "./service-icon";

type ServiceCardProps = { icon: IconName; title: string; text: string };

export function ServiceCard({ icon, title, text }: ServiceCardProps) {
  return (
    <article className="group premium-card flex h-full flex-col p-6 transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_18px_45px_rgba(21,23,20,.07)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#f36b16] transition duration-200 group-hover:bg-[#f36b16] group-hover:text-white">
        <ServiceIcon name={icon} />
      </div>
      <h3 className="mt-5 text-lg font-extrabold tracking-[-0.025em]">{title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-6 text-[var(--muted)]">{text}</p>
      <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--ink)] transition hover:text-[#f36b16]" aria-label={`Request a quote for ${title}`}>
        Request this service <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </article>
  );
}

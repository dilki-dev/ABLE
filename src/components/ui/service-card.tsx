import { ArrowUpRight } from "lucide-react";
import type { IconName } from "@/data/site-content";
import { ServiceIcon } from "./service-icon";

type ServiceCardProps = { icon: IconName; title: string; text: string };

export function ServiceCard({ icon, title, text }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#e7e7e3] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_22px_55px_rgba(17,17,17,.08)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#f97316] transition group-hover:bg-[#f97316] group-hover:text-white">
        <ServiceIcon name={icon} />
      </div>
      <h3 className="mt-6 text-xl font-extrabold tracking-[-0.02em]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[#64645f]">{text}</p>
      <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#111111] hover:text-[#f97316]" aria-label={`Request a quote for ${title}`}>
        Request this service <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </article>
  );
}

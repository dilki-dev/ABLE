import type { SiteContent } from "@/cms/content-schema";
import { ServiceIcon } from "@/components/ui/service-icon";

export function TrustBar({ items }: { items: SiteContent["trustItems"] }) {
  return (
    <section aria-label="Why property owners contact ABLE" className="border-b border-[#e7e7e3] bg-white">
      <div className="site-container grid sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={item.title} className={`flex gap-4 py-7 sm:px-5 ${index > 0 ? "lg:border-l lg:border-[#e7e7e3]" : ""}`}>
            <ServiceIcon name={item.icon} className="mt-0.5 h-6 w-6 shrink-0 text-[#38bdf8]" />
            <div><h2 className="text-sm font-extrabold">{item.title}</h2><p className="mt-1 text-xs leading-5 text-[#777771]">{item.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

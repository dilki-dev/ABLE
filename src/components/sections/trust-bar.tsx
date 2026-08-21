import type { SiteContent } from "@/cms/content-schema";
import { ServiceIcon } from "@/components/ui/service-icon";

export function TrustBar({ items }: { items: SiteContent["trustItems"] }) {
  return (
    <section aria-label="Why property owners contact ABLE" className="border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="site-container grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={item.title} className={`flex flex-col gap-3 py-6 odd:pr-4 even:border-l even:border-[var(--line)] even:pl-4 sm:flex-row sm:gap-4 sm:px-6 lg:py-7 ${index > 0 ? "lg:border-l lg:border-[var(--line)]" : ""}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><ServiceIcon name={item.icon} className="h-5 w-5" /></span>
            <div><h2 className="text-sm font-extrabold leading-5">{item.title}</h2><p className="mt-1 hidden text-xs leading-5 text-[var(--muted)] sm:block">{item.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

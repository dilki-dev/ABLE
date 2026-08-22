import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Breadcrumbs({ current, path }: { current: string; path: string }) {
  const items = [{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: current, href: path }];
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteConfig.siteUrl}${item.href}` })) };
  return <><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-[var(--muted)]">
    {items.map((item, index) => <span key={item.href} className="inline-flex items-center gap-1.5">{index ? <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" /> : null}{index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.href} className="hover:text-[var(--orange)]">{item.name}</Link>}</span>)}
  </nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /></>;
}

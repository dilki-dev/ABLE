import Link from "next/link";
import type { SiteContent } from "@/cms/content-schema";
import { siteConfig } from "@/lib/site-config";
import { Header } from "./header";
import { Footer } from "./footer";

export function LegalPage({ business, navigation, document, path, hasProjects }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; document: SiteContent["legal"]["privacy"]; path: "/privacy" | "/terms"; hasProjects: boolean }) {
  const visibleNavigation = hasProjects ? navigation : navigation.filter((item) => item.href !== "#projects");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${siteConfig.siteUrl}${path}#webpage`, url: `${siteConfig.siteUrl}${path}`, name: document.title, description: document.intro, isPartOf: { "@id": `${siteConfig.siteUrl}/#website` }, inLanguage: "en-LK" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl }, { "@type": "ListItem", position: 2, name: document.title, item: `${siteConfig.siteUrl}${path}` }] },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header business={business} navigation={visibleNavigation} homeLinks />
      <main id="main-content" className="bg-[var(--soft)] py-14 sm:py-24">
        <article className="site-container max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-[var(--muted)]"><Link href="/" className="font-bold hover:text-[var(--orange)]">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{document.title}</span></nav>
          <header className="relative overflow-hidden rounded-[2rem] bg-[#161815] p-7 text-white sm:p-12 lg:p-16">
            <div className="architectural-grid absolute inset-0 opacity-15" />
            <div className="relative">
            <p className="eyebrow text-[#38bdf8]">{business.name}</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-.04em] sm:text-6xl">{document.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{document.intro}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.12em] text-white/45">Last updated: {document.lastUpdated}</p></div>
          </header>
          <div className="mt-8 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-2 shadow-[var(--shadow-sm)] sm:px-10">
            {document.sections.map((section) => <section key={section.heading} className="border-b border-[var(--line)] py-8 last:border-0 sm:py-10"><h2 className="text-xl font-black tracking-[-.02em] text-[var(--ink)] sm:text-2xl">{section.heading}</h2><p className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8">{section.body}</p></section>)}
          </div>
        </article>
      </main>
      <Footer business={business} navigation={visibleNavigation} homeLinks />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}

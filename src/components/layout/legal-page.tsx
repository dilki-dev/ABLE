import Link from "next/link";
import type { SiteContent } from "@/cms/content-schema";
import { siteConfig } from "@/lib/site-config";
import { Header } from "./header";
import { Footer } from "./footer";

export function LegalPage({ business, navigation, document, path }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; document: SiteContent["legal"]["privacy"]; path: "/privacy" | "/terms" }) {
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
      <Header business={business} navigation={navigation} homeLinks />
      <main id="main-content" className="bg-[#f7f7f5] py-16 sm:py-24">
        <article className="site-container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-[#64645f]"><Link href="/" className="font-bold hover:text-[#f97316]">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{document.title}</span></nav>
          <header className="rounded-3xl bg-[#111111] p-7 text-white sm:p-12">
            <p className="eyebrow text-[#38bdf8]">ABLE Property Maintenance</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-.04em] sm:text-6xl">{document.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{document.intro}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.12em] text-white/45">Last updated: {document.lastUpdated}</p>
          </header>
          <div className="mt-8 space-y-4">
            {document.sections.map((section) => <section key={section.heading} className="rounded-2xl border border-[#e7e7e3] bg-white p-6 sm:p-8"><h2 className="text-xl font-black tracking-[-.02em] sm:text-2xl">{section.heading}</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#64645f] sm:text-base sm:leading-8">{section.body}</p></section>)}
          </div>
          <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">This page provides general website information. Business-specific legal advice should be obtained from a qualified Sri Lankan professional when needed.</p>
        </article>
      </main>
      <Footer business={business} navigation={navigation} homeLinks />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}

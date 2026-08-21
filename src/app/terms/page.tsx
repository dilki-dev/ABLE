import type { Metadata } from "next";
import { getFreshSiteContent } from "@/backend/content-repository";
import { LegalPage } from "@/components/layout/legal-page";
import { listPublishedProjects } from "@/backend/portfolio";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFreshSiteContent();
  return {
    title: content.legal.terms.title,
    description: content.legal.terms.intro,
    alternates: { canonical: "/terms", languages: { "en-LK": "/terms" } },
    openGraph: { type: "website", locale: "en_LK", url: "/terms", siteName: content.business.name, title: content.legal.terms.title, description: content.legal.terms.intro, images: [{ url: "/opengraph-image", alt: `${content.business.name} property maintenance` }] },
    twitter: { card: "summary_large_image", title: content.legal.terms.title, description: content.legal.terms.intro, images: ["/opengraph-image"] },
  };
}

export default async function TermsPage() {
  const [content, projects] = await Promise.all([getFreshSiteContent(), listPublishedProjects()]);
  return <LegalPage business={content.business} navigation={content.navigation} document={content.legal.terms} path="/terms" hasProjects={projects.length > 0} />;
}

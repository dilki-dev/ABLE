import type { Metadata } from "next";
import { getFreshSiteContent } from "@/backend/content-repository";
import { LegalPage } from "@/components/layout/legal-page";
import { listPublishedProjects } from "@/backend/portfolio";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFreshSiteContent();
  return {
    title: content.legal.privacy.title,
    description: content.legal.privacy.intro,
    alternates: { canonical: "/privacy", languages: { "en-LK": "/privacy" } },
    openGraph: { type: "website", locale: "en_LK", url: "/privacy", siteName: content.business.name, title: content.legal.privacy.title, description: content.legal.privacy.intro, images: [{ url: "/opengraph-image", alt: `${content.business.name} property maintenance` }] },
    twitter: { card: "summary_large_image", title: content.legal.privacy.title, description: content.legal.privacy.intro, images: ["/opengraph-image"] },
  };
}

export default async function PrivacyPage() {
  const [content, projects] = await Promise.all([getFreshSiteContent(), listPublishedProjects()]);
  return <LegalPage business={content.business} navigation={content.navigation} document={content.legal.privacy} path="/privacy" hasProjects={projects.length > 0} />;
}

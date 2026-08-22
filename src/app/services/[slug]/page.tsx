import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/backend/content-repository";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SpecialistServicePage } from "@/components/sections/specialist-service-page";
import { highRiseHub, specialistServiceBySlug, specialistServices } from "@/data/specialist-services";
import { HighRiseHubPage } from "@/components/sections/high-rise-hub-page";

export const revalidate = 300;

export function generateStaticParams() {
  return [highRiseHub.slug, ...specialistServices.map((service) => service.slug)].map((slug) => ({ slug }));
}

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = slug === highRiseHub.slug ? highRiseHub : specialistServiceBySlug(slug);
  if (!page) return { title: "Service not found", robots: { index: false, follow: false } };
  const path = `/services/${slug}`;
  return { title: { absolute: page.title }, description: page.description, alternates: { canonical: path }, openGraph: { type: "website", url: path, title: page.title, description: page.description, images: [{ url: "/opengraph-image", alt: `${page.h1} from ABLE Property Maintenance` }] }, twitter: { card: "summary_large_image", title: page.title, description: page.description, images: ["/opengraph-image"] } };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const service = specialistServiceBySlug(slug);
  if (slug !== highRiseHub.slug && !service) notFound();
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header business={content.business} navigation={content.navigation} homeLinks /><main id="main-content">{slug === highRiseHub.slug ? <HighRiseHubPage /> : <SpecialistServicePage service={service!} />}</main><Footer business={content.business} navigation={content.navigation} homeLinks /></>;
}

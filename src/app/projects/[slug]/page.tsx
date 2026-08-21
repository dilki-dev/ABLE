import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublishedProject } from "@/backend/portfolio";
import { getSiteContent } from "@/backend/content-repository";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  const title = project.seo_title || project.title;
  const description = project.seo_description || project.short_description;
  return { title, description, alternates: { canonical: `/projects/${project.slug}` }, openGraph: { type: "article", url: `/projects/${project.slug}`, title, description, images: [{ url: project.cover_image, alt: project.cover_alt }] }, twitter: { card: "summary_large_image", title, description, images: [project.cover_image] } };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, content] = await Promise.all([getPublishedProject(slug), getSiteContent()]);
  if (!project) notFound();
  const structuredData = { "@context": "https://schema.org", "@type": "Article", headline: project.title, description: project.short_description, image: [project.cover_image, ...project.gallery.map((image) => image.url)], datePublished: project.completion_date || project.created_at, dateModified: project.updated_at, author: { "@type": "Organization", name: content.business.name, url: siteConfig.siteUrl }, mainEntityOfPage: `${siteConfig.siteUrl}/projects/${project.slug}`, contentLocation: { "@type": "Place", name: project.location } };
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header business={content.business} navigation={content.navigation} homeLinks /><main id="main-content" className="bg-[#f7f7f5] pb-20"><div className="site-container py-8"><Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#64645f] hover:text-[#f97316]"><ArrowLeft className="h-4 w-4" />Back to projects</Link></div><article><header className="site-container grid gap-8 pb-12 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><p className="eyebrow">{project.category}</p><h1 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-6xl">{project.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#64645f]">{project.short_description}</p><div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-[#64645f]"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#38bdf8]" />{project.location}</span>{project.completion_date ? <time dateTime={project.completion_date} className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#f97316]" />{new Intl.DateTimeFormat("en-LK", { year: "numeric", month: "long" }).format(new Date(`${project.completion_date}T00:00:00Z`))}</time> : null}</div></div><div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100 shadow-xl"><Image src={project.cover_image} alt={project.cover_alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div></header><div className="bg-white"><div className="site-container grid gap-12 py-14 lg:grid-cols-[.7fr_1.3fr]"><h2 className="text-3xl font-black tracking-[-.03em]">Project details</h2><div className="whitespace-pre-line text-base leading-8 text-[#64645f]">{project.description}</div></div>{project.gallery.length ? <div className="site-container grid gap-4 pb-16 sm:grid-cols-2"><h2 className="sr-only">Project gallery</h2>{project.gallery.map((image, index) => <div key={`${image.url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100"><Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>)}</div> : null}</div></article></main><Footer business={content.business} navigation={content.navigation} homeLinks /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></>;
}

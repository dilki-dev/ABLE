import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { listPublishedProjects } from "@/backend/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await listPublishedProjects();
  return [
    { url: siteConfig.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...projects.map((project) => ({ url: `${siteConfig.siteUrl}/projects/${project.slug}`, lastModified: new Date(project.updated_at), changeFrequency: "monthly" as const, priority: project.featured ? 0.8 : 0.6 })),
  ];
}

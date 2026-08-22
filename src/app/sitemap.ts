import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { listPublishedProjects } from "@/backend/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await listPublishedProjects();
  const contentLastModified = new Date("2026-08-22T00:00:00+05:30");
  const publicPaths = [
    "",
    "/services",
    "/services/high-rise-rope-access",
    "/services/rope-access-painting",
    "/services/rope-access-building-repairs",
    "/services/rope-access-glass-cladding-cleaning",
    "/services/gondola-access-services",
    "/service-areas",
    "/privacy",
    "/terms",
  ];
  return [
    ...publicPaths.map((path) => ({ url: `${siteConfig.siteUrl}${path}`, lastModified: contentLastModified })),
    ...projects.map((project) => ({ url: `${siteConfig.siteUrl}/projects/${project.slug}`, lastModified: new Date(project.updated_at) })),
  ];
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

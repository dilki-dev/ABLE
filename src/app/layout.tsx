import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getSiteContent } from "@/backend/content-repository";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: `${content.business.name} | ${content.business.tagline}`, template: `%s | ${content.business.name}` },
    description: content.business.description,
    keywords: ["property maintenance Sri Lanka", "property repairs Colombo", "plumbing Dehiwala", "electrical repairs Colombo", "property refurbishment Sri Lanka"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_LK",
      url: "/",
      siteName: content.business.name,
      title: `${content.business.name} | ${content.business.tagline}`,
      description: content.business.description,
      images: [{ url: content.hero.image, alt: "ABLE property maintenance professional working on a modern Sri Lankan home" }],
    },
    twitter: { card: "summary_large_image", title: content.business.name, description: content.business.description, images: [content.hero.image] },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}

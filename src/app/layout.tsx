import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { getSiteContent } from "@/backend/content-repository";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const themeScript = `(function(){try{var saved=localStorage.getItem('able-theme');var dark=saved==='dark'||(!saved&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light'}catch(e){}})()`;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#101211" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const seoTitle = `${content.business.name} | Property Maintenance Colombo`;
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: seoTitle, template: `%s | ${content.business.name}` },
    description: content.business.description,
    applicationName: content.business.name,
    authors: [{ name: content.business.name }],
    creator: content.business.name,
    publisher: content.business.name,
    category: "Property maintenance",
    keywords: ["property maintenance Sri Lanka", "property repairs Colombo", "plumbing Dehiwala", "electrical repairs Colombo", "property refurbishment Sri Lanka"],
    alternates: { canonical: "/", languages: { "en-LK": "/" } },
    formatDetection: { email: false, address: false, telephone: false },
    icons: { icon: "/favicon.ico" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: "website",
      locale: "en_LK",
      url: "/",
      siteName: content.business.name,
      title: seoTitle,
      description: content.business.description,
      images: [{ url: content.hero.image, alt: "ABLE property maintenance professional working on a modern Sri Lankan home" }],
    },
    twitter: { card: "summary_large_image", title: seoTitle, description: content.business.description, images: [content.hero.image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-LK" className={manrope.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

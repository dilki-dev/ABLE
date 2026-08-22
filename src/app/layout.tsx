import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getSiteContent } from "@/backend/content-repository";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const themeScript = `(function(){try{var saved=localStorage.getItem('able-theme');var dark=saved==='dark'||(!saved&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light'}catch(e){}})()`;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
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
  const seoTitle = "ABLE Property Maintenance | Repairs, Renovation & High-Rise Services Colombo";
  const seoDescription = "Property maintenance, renovation and specialist high-rise access services for homes, businesses and managed buildings across Colombo and Greater Colombo.";
  const shareImage = "/opengraph-image";
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: seoTitle, template: `%s | ${content.business.name}` },
    description: seoDescription,
    applicationName: content.business.name,
    authors: [{ name: content.business.name }],
    creator: content.business.name,
    publisher: content.business.name,
    category: "Property maintenance",
    keywords: ["property maintenance Colombo", "property repairs Colombo", "rope access painting Colombo", "high-rise building repairs Colombo", "gondola services Colombo"],
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
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
      description: seoDescription,
      images: [{ url: shareImage, alt: `${content.business.name} property maintenance and renovation services` }],
    },
    twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [shareImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-LK" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}

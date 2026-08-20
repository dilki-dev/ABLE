import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "ABLE Property Maintenance | Reliable Property Care in Sri Lanka",
    template: "%s | ABLE Property Maintenance",
  },
  description:
    "Professional property maintenance, repairs and improvements across Colombo and throughout Sri Lanka.",
  keywords: [
    "property maintenance Sri Lanka",
    "property repairs Colombo",
    "plumbing Dehiwala",
    "electrical repairs Colombo",
    "property refurbishment Sri Lanka",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "/",
    siteName: siteConfig.name,
    title: "ABLE Property Maintenance | Reliable Property Care. Built to Last.",
    description:
      "Professional maintenance, repairs and property improvements across Colombo and throughout Sri Lanka.",
    images: [
      {
        url: "/images/hero-property-maintenance.png",
        width: 1536,
        height: 1024,
        alt: "ABLE property maintenance professional working on a modern Sri Lankan home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABLE Property Maintenance",
    description: "Reliable property care across Colombo and Sri Lanka.",
    images: ["/images/hero-property-maintenance.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { Logo } from "./logo";

export function Footer({ business, navigation, homeLinks = false }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const config = publicConfig(business);
  return (
    <footer className="relative overflow-hidden bg-[#111310] pb-8 pt-16 text-white">
      <div className="architectural-grid absolute inset-0 opacity-10" />
      <div className="site-container relative grid gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_.7fr_1fr_.55fr]">
        <div>
          <Logo light image={business.logoImage} name={business.name} tagline={business.tagline} width={business.footerLogoWidth} height={business.footerLogoHeight} titleSize={business.logoTitleSize} sloganSize={business.logoSloganSize} placement="footer" />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">{business.description}</p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-sky-400">Property care across Colombo &amp; Greater Colombo</p>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white/45">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-5 space-y-3">
            {navigation.map((item) => <a key={item.href} href={homeLinks ? `/${item.href}` : item.href} className="block text-sm font-semibold text-white/70 hover:text-white">{item.label}</a>)}
          </nav>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white/45">Contact</h2>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            <a href={config.phoneHref} className="flex gap-3 hover:text-white"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{business.phoneDisplay}</a>
            <a href={`mailto:${business.email}`} className="flex gap-3 break-all hover:text-white"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{business.email}</a>
            <a href={config.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 leading-6 hover:text-white"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{business.address}</a>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white/45">Legal</h2>
          <nav aria-label="Legal navigation" className="mt-5 space-y-3 text-sm font-semibold text-white/70">
            <Link href="/privacy" className="block hover:text-white">Privacy policy</Link>
            <Link href="/terms" className="block hover:text-white">Terms &amp; conditions</Link>
          </nav>
        </div>
      </div>
      <div className="site-container relative mt-7 flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p>Serving {business.coverage}.</p>
      </div>
    </footer>
  );
}

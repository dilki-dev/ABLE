import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import Link from "next/link";

export function Footer({ business, navigation, homeLinks = false }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const config = publicConfig(business);
  return (
    <footer className="bg-[#0d0d0d] pb-8 pt-16 text-white">
      <div className="site-container grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_1fr]">
        <div>
          <Logo light image={business.logoImage} name={business.name} tagline={business.tagline} width={business.footerLogoWidth} height={business.footerLogoHeight} titleSize={business.logoTitleSize} sloganSize={business.logoSloganSize} placement="footer" />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">{business.description}</p>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white/45">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-5 grid grid-cols-2 gap-3">
            {navigation.map((item) => <a key={item.href} href={homeLinks ? `/${item.href}` : item.href} className="text-sm font-semibold text-white/70 hover:text-white">{item.label}</a>)}
          </nav>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[.18em] text-white/45">Contact</h2>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            <a href={config.phoneHref} className="flex gap-3 hover:text-white"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{business.phoneDisplay}</a>
            <a href={`mailto:${business.email}`} className="flex gap-3 break-all hover:text-white"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{business.email}</a>
            <a href={config.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 leading-6 hover:text-white"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />{business.address}</a>
            <p className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-5 text-amber-200">Secondary number supplied: {business.secondaryPhoneDisplay}. Verify the full international format before publishing it as a call link.</p>
            {/* TODO: Add verified social profile links here when ABLE provides them. */}
          </div>
        </div>
      </div>
      <div className="site-container mt-7 flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2"><p>Serving {business.coverage}.</p><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link></div>
      </div>
    </footer>
  );
}

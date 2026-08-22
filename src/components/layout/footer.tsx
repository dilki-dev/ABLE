import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { Logo } from "./logo";

export function Footer({ business, navigation }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const config = publicConfig(business);
  const exploreLinks = [
    ...navigation
      .filter((item) => item.label !== "Projects")
      .map((item) => ({ ...item, href: item.href.startsWith("#") ? `/${item.href}` : item.href })),
    { label: "High-Rise Services", href: "/services/high-rise-rope-access" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#101210] text-white">
      <div className="architectural-grid absolute inset-0 opacity-[.07]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

      <div className="site-container relative py-14 sm:py-16 lg:py-20">
        <div className="grid min-w-0 gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(12rem,.72fr)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <Logo light image={business.logoImage} name={business.name} tagline={business.tagline} width={business.footerLogoWidth} height={business.footerLogoHeight} titleSize={business.logoTitleSize} sloganSize={business.logoSloganSize} placement="footer" />
            <p className="font-display mt-8 max-w-lg text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.025em] text-white">Property care with a more considered finish.</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">Property maintenance, renovation and specialist high-rise services across Colombo and Greater Colombo.</p>
            <p className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-sky-300"><span aria-hidden="true" className="h-px w-7 bg-sky-400/70" />Based in Attidiya, Dehiwala</p>
          </div>

          <div className="min-w-0">
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.16em] text-white/45">Explore</h2>
            <nav aria-label="Footer navigation" className="mt-5 grid gap-1">
              {exploreLinks.map((item) => (
                <a key={item.href} href={item.href} className="group flex min-h-11 w-full min-w-0 items-center justify-between gap-4 rounded-lg py-2 text-sm font-semibold text-white/72 transition-colors duration-200 hover:text-orange-300">
                  <span>{item.label}</span>
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-white/25 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-300" />
                </a>
              ))}
            </nav>
          </div>

          <div className="min-w-0">
            <h2 className="text-[11px] font-extrabold uppercase tracking-[.16em] text-white/45">Contact</h2>
            <div className="mt-5 grid gap-2 text-sm text-white/72">
              <FooterContactLink href={config.phoneHref} icon={<Phone aria-hidden="true" />} label="Call ABLE" value={business.phoneDisplay} />
              <FooterContactLink href={`mailto:${business.email}`} icon={<Mail aria-hidden="true" />} label="Email" value={business.email} breakAnywhere />
              <FooterContactLink href={config.mapsUrl} icon={<MapPin aria-hidden="true" />} label="Visit" value={business.address} external />
            </div>
          </div>
        </div>

        <div className="mt-14 flex min-w-0 flex-col gap-6 border-t border-white/10 pt-7 text-xs text-white/45 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-6">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2 font-semibold text-white/65">
            <Link href="/privacy" className="inline-flex min-h-11 items-center transition-colors hover:text-orange-300">Privacy</Link>
            <Link href="/terms" className="inline-flex min-h-11 items-center transition-colors hover:text-orange-300">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterContactLink({ href, icon, label, value, external = false, breakAnywhere = false }: { href: string; icon: React.ReactNode; label: string; value: string; external?: boolean; breakAnywhere?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="group flex min-h-14 min-w-0 items-start gap-3 rounded-xl border border-white/[.08] bg-white/[.025] px-4 py-3.5 transition duration-200 hover:border-orange-300/30 hover:bg-white/[.045]">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[.06] text-orange-300 transition group-hover:bg-orange-400/15 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-white/35">{label}</span><span className={`mt-1 block leading-6 text-white/75 transition group-hover:text-white ${breakAnywhere ? "[overflow-wrap:anywhere]" : ""}`}>{value}</span></span>
    </a>
  );
}

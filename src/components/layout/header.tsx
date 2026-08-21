"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header({ business, navigation, homeLinks = false }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const config = publicConfig(business);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-[0_8px_30px_rgba(17,17,17,.1)]" : ""}`}>
      <div className="hidden bg-[#111111] py-2 text-xs text-white/75 md:block">
        <div className="site-container flex items-center justify-between gap-6">
          <span className="flex min-w-0 items-center gap-2"><MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" /><span className="truncate">{business.address}</span></span>
          <a href={config.phoneHref} className="flex items-center gap-2 font-bold text-white hover:text-orange-300"><Phone aria-hidden="true" className="h-3.5 w-3.5" />{business.phoneDisplay}</a>
        </div>
      </div>
      <div className="relative border-b border-[#e7e7e3] bg-white/95 backdrop-blur-lg">
        <div className="site-container flex h-[76px] items-center justify-between gap-5">
          <Logo image={business.logoImage} name={business.name} tagline={business.tagline} width={business.logoWidth} height={business.logoHeight} titleSize={business.logoTitleSize} sloganSize={business.logoSloganSize} placement="header" />
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => <a key={item.href} href={homeLinks ? `/${item.href}` : item.href} className="text-sm font-bold text-[#4d4d48] transition hover:text-[#f97316]">{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={homeLinks ? "/#contact" : "#contact"} className="header-quote-button hidden rounded-xl px-5 py-3 text-sm font-extrabold transition lg:inline-flex">Request a quote</a>
            <MobileMenu business={business} navigation={navigation} homeLinks={homeLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}

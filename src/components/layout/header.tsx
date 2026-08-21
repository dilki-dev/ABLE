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
    <header className={`sticky top-0 z-50 transition-[box-shadow] duration-200 ${scrolled ? "shadow-[0_12px_35px_rgba(21,23,20,.1)]" : ""}`}>
      <div className="hidden bg-[#151714] py-2 text-xs text-white/70 md:block">
        <div className="site-container flex items-center justify-between gap-6">
          <span className="flex min-w-0 items-center gap-2"><MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-sky-300" /><span className="truncate">Based in Attidiya, Dehiwala · Serving Colombo &amp; Greater Colombo</span></span>
          <a href={config.phoneHref} className="flex items-center gap-2 font-extrabold text-white transition hover:text-orange-300"><Phone aria-hidden="true" className="h-3.5 w-3.5" />{business.phoneDisplay}</a>
        </div>
      </div>
      <div className={`relative border-b bg-white/95 backdrop-blur-lg transition-colors ${scrolled ? "border-[#ddded8]" : "border-[#e7e7e3]"}`}>
        <div className="site-container flex h-[68px] items-center justify-between gap-3 sm:h-[74px] lg:h-[78px]">
          <Logo image={business.logoImage} name={business.name} tagline={business.tagline} width={business.logoWidth} height={business.logoHeight} titleSize={business.logoTitleSize} sloganSize={business.logoSloganSize} placement="header" />
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
            {navigation.map((item) => <a key={item.href} href={homeLinks ? `/${item.href}` : item.href} className="relative py-3 text-[13px] font-extrabold text-[#4d4f49] transition after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#f36b16] after:transition-transform hover:text-[#151714] hover:after:scale-x-100">{item.label}</a>)}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle className="hidden xl:inline-flex" />
            <a href={homeLinks ? "/#contact" : "#contact"} className="header-quote-button hidden min-h-11 items-center rounded-xl px-5 py-3 text-sm font-extrabold transition xl:inline-flex">Request a quote</a>
            <MobileMenu business={business} navigation={navigation} homeLinks={homeLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}

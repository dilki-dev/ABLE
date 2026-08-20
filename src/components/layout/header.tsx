"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
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
          <span className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#38bdf8]" />{siteConfig.address}</span>
          <a href={siteConfig.phoneHref} className="flex items-center gap-2 font-bold text-white hover:text-orange-300"><Phone aria-hidden="true" className="h-3.5 w-3.5" />{siteConfig.phoneDisplay}</a>
        </div>
      </div>
      <div className="relative border-b border-[#e7e7e3] bg-white/95 backdrop-blur-lg">
        <div className="site-container flex h-[76px] items-center justify-between gap-5">
          <Logo />
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => <a key={item.href} href={item.href} className="text-sm font-bold text-[#4d4d48] transition hover:text-[#f97316]">{item.label}</a>)}
          </nav>
          <div className="hidden lg:block">
            <a href="#contact" className="inline-flex rounded-xl bg-[#f97316] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#df5f0e]">Request a quote</a>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

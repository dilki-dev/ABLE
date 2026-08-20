"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";

export function MobileMenu({ business, navigation }: { business: SiteContent["business"]; navigation: SiteContent["navigation"] }) {
  const [open, setOpen] = useState(false);
  const config = publicConfig(business);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e7e7e3] bg-white">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-[#e7e7e3] bg-white p-5 shadow-2xl">
          <nav aria-label="Mobile navigation" className="site-container flex flex-col">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[#eeeeea] py-3.5 text-base font-bold">{item.label}</a>
            ))}
            <a href={config.phoneHref} className="mt-5 rounded-xl bg-[#f97316] px-5 py-4 text-center text-sm font-extrabold text-white">Call {business.phoneDisplay}</a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

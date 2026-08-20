"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-config";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e7e7e3] bg-white">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full border-t border-[#e7e7e3] bg-white p-5 shadow-2xl">
          <nav aria-label="Mobile navigation" className="site-container flex flex-col">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-[#eeeeea] py-3.5 text-base font-bold">{item.label}</a>
            ))}
            <a href={siteConfig.phoneHref} className="mt-5 rounded-xl bg-[#f97316] px-5 py-4 text-center text-sm font-extrabold text-white">Call {siteConfig.phoneDisplay}</a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

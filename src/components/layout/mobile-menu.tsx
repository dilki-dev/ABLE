"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";

export function MobileMenu({ business, navigation, homeLinks = false }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const config = publicConfig(business);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = [...menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKey); };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button ref={buttonRef} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e7e7e3] bg-white">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? <div className="fixed inset-x-0 bottom-0 top-[74px] md:top-[106px]">
        <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute inset-0 h-full w-full bg-[#151714]/45 backdrop-blur-[2px]" />
        <div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute right-0 top-0 h-full w-[min(92vw,420px)] overflow-y-auto border-l border-[#e7e7e3] bg-white p-6 shadow-2xl">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.16em] text-[#f36b16]">Explore ABLE</p>
            {navigation.map((item) => (
              <a key={item.href} href={homeLinks ? `/${item.href}` : item.href} onClick={() => setOpen(false)} className="border-b border-[#eeeeea] py-4 text-base font-extrabold transition hover:pl-1 hover:text-[#f36b16]">{item.label}</a>
            ))}
            <a href={homeLinks ? "/#contact" : "#contact"} onClick={() => setOpen(false)} className="btn btn-primary mt-6">Request a quote</a>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={config.phoneHref} className="btn btn-secondary px-3"><Phone aria-hidden="true" className="h-4 w-4" />Call</a>
              <a href={config.whatsappUrl} target="_blank" rel="noreferrer" className="btn border-green-200 bg-green-50 px-3 text-green-800"><MessageCircle aria-hidden="true" className="h-4 w-4" />WhatsApp</a>
            </div>
            <p className="mt-6 text-xs leading-6 text-[#777771]">{business.address}</p>
          </nav>
        </div>
      </div> : null}
    </div>
  );
}

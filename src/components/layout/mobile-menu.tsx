"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MobileMenu({ business, navigation, homeLinks = false }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const config = publicConfig(business);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const handleDesktop = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false); };
    desktop.addEventListener("change", handleDesktop);
    return () => desktop.removeEventListener("change", handleDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const previousOverflow = document.body.style.overflow;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
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
    return () => {
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.body.style.overflow = previousOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      window.removeEventListener("keydown", handleKey);
    };
  }, [closeMenu, open]);

  return (
    <div className="xl:hidden">
      <button ref={buttonRef} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e7e7e3] bg-white">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? <div className="fixed inset-x-0 bottom-0 top-[68px] sm:top-[74px] md:top-[106px]">
        <button type="button" aria-label="Close navigation" onClick={() => closeMenu(true)} className="absolute inset-0 h-full w-full bg-[#151714]/45 backdrop-blur-[2px]" />
        <div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title" className="absolute right-0 top-0 h-full w-full max-w-[420px] min-w-0 overflow-y-auto overscroll-contain border-l border-[#e7e7e3] bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 shadow-2xl sm:px-6 sm:pt-6">
          <nav aria-label="Mobile navigation" className="flex min-h-full flex-col">
            <p id="mobile-navigation-title" className="mb-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#f36b16]">Explore ABLE</p>
            {navigation.map((item) => (
              <a key={item.href} href={homeLinks ? `/${item.href}` : item.href} onClick={() => closeMenu()} className="flex min-h-12 items-center border-b border-[#eeeeea] py-3 text-base font-extrabold transition hover:pl-1 hover:text-[#f36b16]">{item.label}</a>
            ))}
            <a href={homeLinks ? "/#contact" : "#contact"} onClick={() => closeMenu()} className="btn btn-primary mt-5">Request a quote</a>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={config.phoneHref} className="btn btn-secondary px-3"><Phone aria-hidden="true" className="h-4 w-4" />Call</a>
              <a href={config.whatsappUrl} target="_blank" rel="noreferrer" className="btn border-green-200 bg-green-50 px-3 text-green-800"><MessageCircle aria-hidden="true" className="h-4 w-4" />WhatsApp</a>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#eeeeea] pt-4"><p className="min-w-0 text-xs leading-5 text-[#777771]">{business.address}</p><ThemeToggle /></div>
          </nav>
        </div>
      </div> : null}
    </div>
  );
}

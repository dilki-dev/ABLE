"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "./logo";

export function MobileMenu({ business, navigation, homeLinks = false }: { business: SiteContent["business"]; navigation: SiteContent["navigation"]; homeLinks?: boolean }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const config = publicConfig(business);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };
    desktop.addEventListener("change", handleDesktop);
    return () => desktop.removeEventListener("change", handleDesktop);
  }, [closeMenu]);

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
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.body.style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKey);
    };
  }, [closeMenu, open]);

  const sheet = open && typeof document !== "undefined" ? createPortal(
    <div ref={sheetRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title" className="fixed inset-0 z-[80] h-[100dvh] w-full overflow-y-auto overscroll-contain bg-[#111310] text-white xl:hidden">
      <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:px-8">
        <div className="flex min-h-[68px] shrink-0 items-center justify-between gap-4 border-b border-white/10">
          <Logo light image={business.logoImage} name={business.name} tagline={business.tagline} width={business.logoWidth} height={business.logoHeight} titleSize={business.logoTitleSize} sloganSize={business.logoSloganSize} placement="header" />
          <button ref={closeRef} type="button" aria-label="Close navigation" onClick={() => closeMenu(true)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="py-6">
          <p id="mobile-navigation-title" className="mb-3 text-xs font-extrabold uppercase tracking-[.18em] text-orange-400">Explore ABLE</p>
          <div>
            {navigation.map((item) => (
              <a key={item.href} href={homeLinks && item.href.startsWith("#") ? `/${item.href}` : item.href} onClick={() => closeMenu()} className="group flex min-h-13 items-center justify-between gap-4 border-b border-white/10 py-3 text-xl font-extrabold tracking-[-.02em] text-white transition hover:text-orange-300">
                <span>{item.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-white/35 transition group-hover:translate-x-1 group-hover:text-orange-300" />
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <a href={homeLinks ? "/#contact" : "#contact"} onClick={() => closeMenu()} className="btn btn-primary w-full">Request a quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={config.phoneHref} className="btn border-white/15 bg-white/5 px-3 text-white hover:bg-white/10"><Phone aria-hidden="true" className="h-4 w-4" />Call</a>
            <a href={config.whatsappUrl} target="_blank" rel="noreferrer" className="btn border-green-400/25 bg-green-400/10 px-3 text-green-200 hover:bg-green-400/15"><MessageCircle aria-hidden="true" className="h-4 w-4" />WhatsApp</a>
          </div>
          <div className="mt-4 flex min-h-14 items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[.04] px-4 py-2">
            <div><p className="text-sm font-extrabold">Appearance</p><p className="mt-0.5 text-xs text-white/45">Light or dark theme</p></div>
            <ThemeToggle className="border-white/15 bg-white/10 text-white hover:border-orange-300" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  ) : null;

  return (
    <div className="xl:hidden">
      <button ref={triggerRef} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e7e7e3] bg-white">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {sheet}
    </div>
  );
}

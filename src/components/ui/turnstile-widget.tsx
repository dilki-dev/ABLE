"use client";

import Script from "next/script";

declare global {
  interface Window { turnstile?: { reset: () => void } }
}

export function TurnstileWidget({ siteKey, action }: { siteKey: string; action: "quote" | "admin-login" }) {
  if (!siteKey) return <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950">The security check is not configured. Please use the phone or WhatsApp contact option.</p>;
  return <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="cf-turnstile min-h-[65px]" data-sitekey={siteKey} data-action={action} data-theme="auto" /></>;
}

export function resetTurnstile() {
  window.turnstile?.reset();
}

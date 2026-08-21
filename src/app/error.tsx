"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("A public page failed to render.", { digest: error.digest }); }, [error]);
  return <main className="flex min-h-[70vh] items-center justify-center bg-[var(--soft)] p-6"><div className="max-w-xl rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-lg)]"><p className="text-xs font-black uppercase tracking-[.18em] text-[var(--orange)]">Temporary problem</p><h1 className="mt-4 text-3xl font-black tracking-[-.03em] text-[var(--ink)]">We could not load this page.</h1><p className="mt-4 leading-7 text-[var(--muted)]">Please try again. If the problem continues, contact ABLE by phone or WhatsApp.</p><button onClick={reset} className="btn btn-dark mt-7">Try again</button></div></main>;
}

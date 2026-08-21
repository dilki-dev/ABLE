"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("A public page failed to render.", { digest: error.digest }); }, [error]);
  return <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f7f5] p-6"><div className="max-w-xl rounded-3xl border border-[#e7e7e3] bg-white p-8 text-center shadow-xl"><p className="text-xs font-black uppercase tracking-[.18em] text-[#f97316]">Temporary problem</p><h1 className="mt-4 text-3xl font-black tracking-[-.03em]">We could not load this page.</h1><p className="mt-4 leading-7 text-[#64645f]">Please try again. If the problem continues, contact ABLE by phone or WhatsApp.</p><button onClick={reset} className="mt-7 min-h-12 rounded-xl bg-[#111111] px-6 text-sm font-extrabold text-white">Try again</button></div></main>;
}

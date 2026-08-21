import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-[#111111] p-6 text-white"><div className="max-w-xl text-center"><p className="text-sm font-black uppercase tracking-[.18em] text-[#38bdf8]">404 · Page not found</p><h1 className="mt-5 text-4xl font-black tracking-[-.04em] sm:text-6xl">This page is not available.</h1><p className="mt-5 leading-7 text-white/65">The address may have changed, or the project may no longer be published.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#f97316] px-6 text-sm font-extrabold text-white">Return to the homepage</Link></div></main>;
}

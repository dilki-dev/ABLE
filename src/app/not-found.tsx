import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#161815] p-6 text-white">
      <div className="architectural-grid absolute inset-0 opacity-15" />
      <div className="absolute h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative max-w-xl text-center">
        <p className="text-sm font-black uppercase tracking-[.18em] text-sky-400">404 · Page not found</p>
        <h1 className="mt-5 text-4xl font-black tracking-[-.04em] sm:text-6xl">This page is not available.</h1>
        <p className="mt-5 leading-7 text-white/65">The address may have changed, or the project may no longer be published.</p>
        <Link href="/" className="btn btn-primary mt-8">Return to the homepage</Link>
      </div>
    </main>
  );
}

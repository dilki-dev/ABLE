import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="#top" aria-label="ABLE Property Maintenance home" className="inline-flex items-center gap-3">
      {/* Replace this CSS mark with next/image when the final logo asset is supplied. */}
      <span aria-hidden="true" className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-black text-white shadow-[inset_-7px_0_0_#38bdf8]">A</span>
      <span className="leading-none">
        <span className={`block text-lg font-black tracking-[.14em] ${light ? "text-white" : "text-[#111111]"}`}>ABLE</span>
        <span className={`mt-1 block text-[9px] font-extrabold uppercase tracking-[.12em] ${light ? "text-white/55" : "text-[#64645f]"}`}>Property Maintenance</span>
      </span>
    </Link>
  );
}

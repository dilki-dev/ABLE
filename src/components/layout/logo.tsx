import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export function Logo({ light = false, image = "", name = "ABLE Property Maintenance", width = 180, height = 44 }: { light?: boolean; image?: string; name?: string; width?: number; height?: number }) {
  const logoStyle = { "--logo-width": `${width}px`, "--logo-height": `${height}px` } as CSSProperties;
  return (
    <Link href="/" aria-label="ABLE Property Maintenance home" className="inline-flex items-center gap-3">
      {image ? <span className="uploaded-nav-logo relative block shrink-0" style={logoStyle}><Image src={image} alt={`${name} logo`} fill sizes="(max-width: 640px) 150px, 240px" className="object-contain" /></span> : <><span aria-hidden="true" className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-black text-white shadow-[inset_-7px_0_0_#38bdf8]">A</span><span className="leading-none"><span className={`block text-lg font-black tracking-[.14em] ${light ? "text-white" : "text-[#111111]"}`}>ABLE</span><span className={`mt-1 block text-[9px] font-extrabold uppercase tracking-[.12em] ${light ? "text-white/55" : "text-[#64645f]"}`}>Property Maintenance</span></span></>}
    </Link>
  );
}

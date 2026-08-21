import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

type LogoProps = {
  light?: boolean;
  image?: string;
  name?: string;
  tagline?: string;
  width?: number;
  height?: number;
  titleSize?: number;
  sloganSize?: number;
  placement?: "header" | "footer";
};

export function Logo({ light = false, image = "", name = "ABLE Property Maintenance", tagline = "Reliable property care", width = 180, height = 44, titleSize = 18, sloganSize = 10, placement = "header" }: LogoProps) {
  const logoStyle = { "--logo-width": `${width}px`, "--logo-height": `${height}px`, "--logo-title-size": `${titleSize}px`, "--logo-slogan-size": `${sloganSize}px` } as CSSProperties;
  return (
    <Link href="/" aria-label={`${name} home`} style={logoStyle} className={`brand-lockup ${placement === "header" ? "header-brand-lockup" : "footer-brand-lockup"} inline-flex min-w-0 items-center gap-3`}>
      {image ? <span className="brand-logo-image relative block shrink-0"><Image src={image} alt={`${name} logo`} fill sizes={placement === "header" ? "(max-width: 640px) 68px, 240px" : "(max-width: 640px) 200px, 280px"} className="object-contain" /></span> : <span aria-hidden="true" className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-black text-white shadow-[inset_-7px_0_0_#38bdf8]">A</span>}
      <span className="brand-logo-copy min-w-0 leading-none"><span className={`brand-logo-title block font-black tracking-[-.02em] ${light ? "text-white" : "text-[#111111]"}`}>{name}</span><span className={`brand-logo-slogan mt-1.5 block font-extrabold uppercase tracking-[.1em] ${light ? "text-orange-300" : "text-[#64645f]"}`}>{tagline}</span></span>
    </Link>
  );
}

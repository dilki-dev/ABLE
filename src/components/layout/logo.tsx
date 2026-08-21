import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false, image = "", name = "ABLE Property Maintenance" }: { light?: boolean; image?: string; name?: string }) {
  return (
    <Link href="/" aria-label="ABLE Property Maintenance home" className="inline-flex items-center gap-3">
      {image ? <Image src={image} alt={`${name} logo`} width={220} height={56} sizes="(max-width: 640px) 150px, 190px" className="h-11 w-auto max-w-[150px] object-contain sm:max-w-[190px]" /> : <><span aria-hidden="true" className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#f97316] text-lg font-black text-white shadow-[inset_-7px_0_0_#38bdf8]">A</span><span className="leading-none"><span className={`block text-lg font-black tracking-[.14em] ${light ? "text-white" : "text-[#111111]"}`}>ABLE</span><span className={`mt-1 block text-[9px] font-extrabold uppercase tracking-[.12em] ${light ? "text-white/55" : "text-[#64645f]"}`}>Property Maintenance</span></span></>}
    </Link>
  );
}

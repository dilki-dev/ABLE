import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#111111] p-2.5 sm:hidden">
      <a href={siteConfig.phoneHref} className="flex items-center justify-center gap-2 rounded-xl bg-[#f97316] px-4 py-3 text-sm font-extrabold text-white">
        <Phone aria-hidden="true" className="h-4 w-4" /> Call {siteConfig.phoneDisplay}
      </a>
    </div>
  );
}

import { MessageCircle } from "lucide-react";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";

export function FloatingWhatsApp({ business }: { business: SiteContent["business"] }) {
  const config = publicConfig(business);
  return (
    <a href={config.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with ABLE on WhatsApp" className="floating-whatsapp fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_14px_38px_rgba(22,163,74,.35)] transition hover:-translate-y-1 hover:bg-[#15803d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600 sm:right-6">
      <MessageCircle aria-hidden="true" className="h-7 w-7" />
    </a>
  );
}

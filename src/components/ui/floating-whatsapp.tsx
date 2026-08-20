import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FloatingWhatsApp() {
  return (
    <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with ABLE on WhatsApp" className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_14px_38px_rgba(22,163,74,.35)] transition hover:-translate-y-1 hover:bg-[#15803d] sm:bottom-6 sm:right-6">
      <MessageCircle aria-hidden="true" className="h-7 w-7" />
    </a>
  );
}

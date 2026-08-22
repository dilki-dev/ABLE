import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactElement } from "react";
import { ContactForm } from "@/components/ui/contact-form";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";

export function Contact({ business, content, services }: { business: SiteContent["business"]; content: SiteContent["contact"]; services: readonly string[] }) {
  const config = publicConfig(business);
  return (
    <section id="contact" className="section-space bg-[var(--soft)]">
      <div className="site-container grid items-start gap-7 lg:grid-cols-[.78fr_1.22fr] xl:gap-10">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-[#151714] p-7 text-white sm:p-10 lg:sticky lg:top-32">
          <div className="absolute inset-0 grid-texture opacity-35" />
          <div className="relative">
          <p className="eyebrow text-orange-300">{content.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-black leading-[1.02] tracking-[-.055em] text-balance">{content.title}</h2>
          <p className="mt-5 text-base leading-8 text-white/65">{content.description}</p>
          <div className="mt-8 space-y-3">
            <ContactLink icon={<Phone />} label="Call" value={business.phoneDisplay} href={config.phoneHref} />
            <ContactLink icon={<MessageCircle />} label="WhatsApp" value="Message ABLE" href={config.whatsappUrl} external />
            <ContactLink icon={<Mail />} label="Email" value={business.email} href={`mailto:${business.email}`} />
            <ContactLink icon={<MapPin />} label="Address" value={business.address} href={config.mapsUrl} external />
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-xs font-semibold leading-6 text-white/50">Share the work, location and any useful details. ABLE will review the enquiry and confirm the appropriate next step.</p>
          </div>
        </Reveal>
        <Reveal><ContactForm services={services} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} antiBotReady={Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) || (process.env.NODE_ENV !== "production" && process.env.TURNSTILE_DEV_BYPASS === "true")} /></Reveal>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href, external = false }: { icon: ReactElement; label: string; value: string; href: string; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="group flex min-h-12 items-start gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:border-orange-300/40 hover:bg-white/[.07]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300 transition group-hover:bg-[#f36b16] group-hover:text-white [&>svg]:h-5 [&>svg]:w-5">{icon}</span><span className="min-w-0"><span className="block text-[10px] font-extrabold uppercase tracking-[.14em] text-white/40">{label}</span><span className="mt-1 block break-all text-sm font-bold leading-6 text-white/85">{value}</span></span></a>;
}

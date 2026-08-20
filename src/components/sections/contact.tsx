import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactElement } from "react";
import { ContactForm } from "@/components/ui/contact-form";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";

export function Contact({ business, content, services }: { business: SiteContent["business"]; content: SiteContent["contact"]; services: SiteContent["services"] }) {
  const config = publicConfig(business);
  return (
    <section id="contact" className="section-space bg-[#f7f7f5]">
      <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <Reveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-.035em] sm:text-5xl">{content.title}</h2>
          <p className="mt-5 text-base leading-7 text-[#64645f]">{content.description}</p>
          <div className="mt-8 space-y-5">
            <ContactLink icon={<Phone />} label="Call" value={business.phoneDisplay} href={config.phoneHref} />
            <ContactLink icon={<MessageCircle />} label="WhatsApp" value="Message ABLE" href={config.whatsappUrl} external />
            <ContactLink icon={<Mail />} label="Email" value={business.email} href={`mailto:${business.email}`} />
            <ContactLink icon={<MapPin />} label="Address" value={business.address} href={config.mapsUrl} external />
          </div>
        </Reveal>
        <Reveal><ContactForm services={services.map((service) => service.title)} /></Reveal>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href, external = false }: { icon: ReactElement; label: string; value: string; href: string; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="flex items-start gap-4 rounded-2xl border border-[#e7e7e3] bg-white p-4 transition hover:border-orange-200"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#f97316] [&>svg]:h-5 [&>svg]:w-5">{icon}</span><span><span className="block text-xs font-extrabold uppercase tracking-[.12em] text-[#8a8a84]">{label}</span><span className="mt-1 block break-all text-sm font-bold leading-6">{value}</span></span></a>;
}

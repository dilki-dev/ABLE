import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  return (
    <section id="contact" className="section-space bg-[#f7f7f5]">
      <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <Reveal>
          <p className="eyebrow">Request a quote</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-.035em] sm:text-5xl">Tell us what needs attention.</h2>
          <p className="mt-5 text-base leading-7 text-[#64645f]">Share the service, location and useful project details. For the fastest current response, call or use WhatsApp.</p>
          <div className="mt-8 space-y-5">
            <ContactLink icon={<Phone />} label="Call" value={siteConfig.phoneDisplay} href={siteConfig.phoneHref} />
            <ContactLink icon={<MessageCircle />} label="WhatsApp" value="Message ABLE" href={siteConfig.whatsappUrl} external />
            <ContactLink icon={<Mail />} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactLink icon={<MapPin />} label="Address" value={siteConfig.address} href={siteConfig.mapsUrl} external />
          </div>
        </Reveal>
        <Reveal><ContactForm /></Reveal>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href, external = false }: { icon: React.ReactElement; label: string; value: string; href: string; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="flex items-start gap-4 rounded-2xl border border-[#e7e7e3] bg-white p-4 transition hover:border-orange-200"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#f97316] [&>svg]:h-5 [&>svg]:w-5">{icon}</span><span><span className="block text-xs font-extrabold uppercase tracking-[.12em] text-[#8a8a84]">{label}</span><span className="mt-1 block break-all text-sm font-bold leading-6">{value}</span></span></a>;
}

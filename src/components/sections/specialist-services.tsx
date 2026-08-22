import Link from "next/link";
import { ArrowRight, Building2, Paintbrush, PanelsTopLeft, Sparkles } from "lucide-react";
import { specialistServices } from "@/data/specialist-services";

const icons = [Paintbrush, Building2, Sparkles, PanelsTopLeft];

export function SpecialistServices() {
  return (
    <section className="section-space relative overflow-hidden bg-[#151714] text-white" aria-labelledby="specialist-services-title">
      <div className="architectural-grid absolute inset-0 opacity-20" />
      <div className="site-container relative">
        <p className="eyebrow text-orange-300">Specialist high-rise services</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_.62fr] lg:items-end">
          <h2 id="specialist-services-title" className="section-title max-w-3xl">Access solutions for external high-rise maintenance</h2>
          <p className="max-w-xl text-sm leading-7 text-white/65">Painting, repairs, glass and cladding cleaning, and gondola-based maintenance for suitable buildings across Colombo and Greater Colombo.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {specialistServices.map((service, index) => {
            const Icon = icons[index];
            return <Link key={service.slug} href={`/services/${service.slug}`} className="group min-w-0 rounded-2xl border border-white/12 bg-white/[.055] p-6 transition hover:-translate-y-1 hover:border-orange-300/50 hover:bg-white/[.085]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/15 text-orange-300"><Icon aria-hidden="true" className="h-5 w-5" /></span>
              <h3 className="mt-6 text-xl font-black tracking-[-.03em]">{service.shortTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{service.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-orange-300">View service <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>;
          })}
        </div>
        <Link href="/services/high-rise-rope-access" className="btn btn-light mt-8">Explore all high-rise services <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

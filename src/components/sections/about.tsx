import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="section-space overflow-hidden bg-white">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100"><Image src="/images/about-able-team.png" alt="ABLE property maintenance team reviewing a wall repair in a Sri Lankan home" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
          <div className="absolute -bottom-5 -right-2 rounded-2xl bg-[#111111] p-5 text-white shadow-xl sm:right-5"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-sky-300">Based in</p><p className="mt-2 flex items-center gap-2 font-extrabold"><MapPin aria-hidden="true" className="h-4 w-4 text-orange-400" /> Attidiya, Dehiwala</p></div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow="About ABLE" title="Property care that feels clear, capable and personal" description="ABLE Property Maintenance is being built as a dependable point of contact for repairs, upkeep and thoughtful home improvements in Colombo and beyond." />
          <p className="mt-6 leading-7 text-[#64645f]">The approach is simple: understand the issue, recommend a practical route forward and carry out the agreed work with care for the property. Whether you are a homeowner, landlord or property manager, the goal is to make maintenance easier to organise.</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Residential maintenance", "Landlord support", "Focused repairs", "Room improvements"].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-bold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700"><Check aria-hidden="true" className="h-4 w-4" /></span>{item}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

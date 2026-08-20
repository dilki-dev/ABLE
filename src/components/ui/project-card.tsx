import Image from "next/image";
import { MapPin } from "lucide-react";

type ProjectCardProps = { title: string; service: string; location: string; image: string; priority?: boolean };

export function ProjectCard({ title, service, location, image, priority = false }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e7e7e3] bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image src={image} alt={`${service} generated placeholder example`} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 rounded-full bg-[#111111]/85 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-white backdrop-blur">Placeholder image</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#f97316]">{service}</p>
        <h3 className="mt-2 text-lg font-extrabold">{title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-[#64645f]"><MapPin aria-hidden="true" className="h-4 w-4 text-[#38bdf8]" />{location}</p>
      </div>
    </article>
  );
}

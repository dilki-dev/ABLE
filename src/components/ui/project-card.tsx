import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Project } from "@/backend/portfolio";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="premium-card group relative h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image src={project.cover_image} alt={project.cover_alt} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-6">
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#f97316]">{project.category}</p>
        <h3 className="mt-2 text-lg font-extrabold text-[var(--ink)]"><Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">{project.title}</Link></h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.short_description}</p>
        <p className="mt-4 flex items-center gap-2 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]"><MapPin aria-hidden="true" className="h-4 w-4 text-[#38bdf8]" />{project.location}</p>
      </div>
    </article>
  );
}

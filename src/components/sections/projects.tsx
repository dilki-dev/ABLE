import type { SiteContent } from "@/cms/content-schema";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Project } from "@/backend/portfolio";

export function Projects({ copy, projects }: { copy: SiteContent["projectsSection"]; projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section id="projects" className="section-space bg-[var(--surface)]">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} /></Reveal>
          {copy.notice ? <p className="max-w-sm rounded-xl border border-sky-200 bg-sky-50 p-4 text-xs leading-5 text-sky-950">{copy.notice}</p> : null}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => <Reveal key={project.id} delay={(index % 3) * .05}><ProjectCard project={project} priority={index < 3} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

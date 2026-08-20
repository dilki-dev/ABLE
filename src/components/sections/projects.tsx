import type { SiteContent } from "@/cms/content-schema";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects({ copy, projects }: { copy: SiteContent["projectsSection"]; projects: SiteContent["projects"] }) {
  return (
    <section id="projects" className="section-space bg-white">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} /></Reveal>
          <p className="max-w-sm rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">{copy.notice}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => <Reveal key={`${project.title}-${index}`} delay={(index % 3) * .05}><ProjectCard {...project} priority={index < 3} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

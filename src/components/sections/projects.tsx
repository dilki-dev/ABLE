import { projects } from "@/data/site-content";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  return (
    <section id="projects" className="section-space bg-white">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal><SectionHeading eyebrow="Project gallery" title="A preview of the work ABLE can showcase" description="These generated images demonstrate the intended gallery style. Replace them with verified ABLE project photos and accurate locations before presenting them as completed work." /></Reveal>
          <p className="max-w-sm rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">No completed projects are being claimed here. Every card is clearly marked as placeholder content.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => <Reveal key={`${project.title}-${index}`} delay={(index % 3) * .05}><ProjectCard {...project} priority={index < 3} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

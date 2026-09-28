import { Check } from "lucide-react";

import type { Project, ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/utils";

const bars = [45, 70, 55, 85, 65];

// Decorative mock-ups so each category has a recognisable cover without stock photos.
const covers: Record<ProjectCategory, () => React.JSX.Element> = {
  Website: () => (
    <div className="absolute inset-x-6 bottom-0 h-28 rounded-t-xl bg-surface p-3 shadow-soft-lg">
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-border" />
      </div>
      <div className="mt-3 flex items-center gap-4 px-1">
        <div className="flex-1 space-y-2">
          <span className="block h-2.5 w-4/5 rounded-full bg-heading/80" />
          <span className="block h-2 w-3/5 rounded-full bg-border" />
          <span className="mt-3 block h-5 w-16 rounded-full bg-brand-gradient" />
        </div>
        <span className="h-16 w-20 rounded-lg bg-tint" />
      </div>
    </div>
  ),
  "Web App": () => (
    <div className="absolute inset-x-6 bottom-0 flex h-28 gap-3 rounded-t-xl bg-surface p-3 shadow-soft-lg">
      <div className="w-10 space-y-2 rounded-lg bg-tint p-2">
        <span className="block h-1.5 rounded-full bg-primary/40" />
        <span className="block h-1.5 rounded-full bg-primary/20" />
        <span className="block h-1.5 rounded-full bg-primary/20" />
      </div>
      <div className="flex flex-1 items-end gap-1.5 rounded-lg border p-2">
        {bars.map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  ),
  "Mobile App": () => (
    <div className="absolute bottom-0 left-1/2 h-32 w-28 -translate-x-1/2 rounded-t-3xl border-4 border-b-0 border-background bg-surface p-2.5 shadow-soft-lg">
      <span className="mx-auto block h-1.5 w-8 rounded-full bg-background" />
      <span className="mt-3 block h-10 rounded-lg bg-brand-gradient" />
      <span className="mt-2 block h-2 w-4/5 rounded-full bg-border" />
      <span className="mt-1.5 block h-2 w-3/5 rounded-full bg-border" />
    </div>
  ),
  "AI & Automation": () => (
    <div className="absolute inset-x-6 bottom-5 space-y-2.5">
      <div className="w-3/4 rounded-2xl rounded-bl-sm bg-primary-foreground/15 p-3 backdrop-blur">
        <span className="block h-2 w-full rounded-full bg-primary-foreground/50" />
        <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-primary-foreground/30" />
      </div>
      <div className="ml-auto w-2/3 rounded-2xl rounded-br-sm bg-brand-gradient p-3 shadow-glow">
        <span className="block h-2 w-full rounded-full bg-primary-foreground/80" />
        <span className="mt-1.5 block h-2 w-1/2 rounded-full bg-primary-foreground/60" />
      </div>
    </div>
  ),
};

const coverBackgrounds: Record<ProjectCategory, string> = {
  Website: "bg-brand-gradient",
  "Web App": "bg-gradient-to-br from-primary-hover to-primary",
  "Mobile App": "bg-gradient-to-br from-accent to-primary",
  "AI & Automation": "bg-background",
};

export function ProjectCard({ project }: { project: Project }) {
  const Cover = covers[project.category];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
      <div aria-hidden="true" className={cn("relative h-44 overflow-hidden", coverBackgrounds[project.category])}>
        <span className="absolute -right-10 -top-10 size-40 rounded-full bg-primary-foreground/10" />
        <span className="absolute -bottom-16 left-8 size-44 rounded-full bg-accent/20 blur-xl" />
        <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-1">
          <Cover />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-tint px-3 py-1 text-accent">{project.category}</span>
          <span>{project.client}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{project.summary}</p>
        <ul className="mt-5 space-y-2">
          {project.results.map((result) => (
            <li key={result} className="flex items-start gap-2 text-sm font-medium text-heading">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {result}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2 border-t pt-5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md border px-2 py-1 text-xs">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

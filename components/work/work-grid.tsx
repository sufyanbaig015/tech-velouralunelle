"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { projectCategories, type Project, type ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "All";

const filters: Filter[] = ["All", ...projectCategories];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  const matches = (filter: Filter) =>
    filter === "All" ? projects : projects.filter((project) => project.category === filter);
  const visible = matches(active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => {
          const selected = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:rounded-full",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-surface text-heading hover:border-primary/30 hover:bg-tint",
              )}
            >
              {filter}
              <span className={cn("ml-1.5", selected ? "text-primary-foreground" : "text-body")}>
                ({matches(filter).length})
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-center text-sm">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active !== "All" && ` in ${active}`}
      </p>

      <ul className="mt-10 flex flex-wrap justify-center gap-6">
        {visible.map((project) => (
          <li
            key={project.slug}
            className="w-full motion-safe:duration-500 motion-safe:animate-in motion-safe:fade-in-0 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

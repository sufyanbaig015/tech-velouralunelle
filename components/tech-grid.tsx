import { TechLogo } from "@/components/tech-logo";
import { techStack, type TechId } from "@/content/tech";

export function TechGrid({ ids }: { ids: TechId[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {ids.map((id) => {
        const tech = techStack[id];
        return (
          <li
            key={id}
            className="flex w-[calc(50%-0.375rem)] items-center gap-3 rounded-2xl border bg-surface px-4 py-3.5 shadow-soft transition-colors hover:border-primary/30 sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(20%-0.6rem)]"
          >
            <TechLogo tech={tech} className="size-6 shrink-0 text-heading" />
            <span className="text-sm font-medium text-heading">{tech.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

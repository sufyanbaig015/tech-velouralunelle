import type { Tech } from "@/content/tech";
import { cn } from "@/lib/utils";

export function TechLogo({ tech, className }: { tech: Tech; className?: string }) {
  if ("path" in tech) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
        <path d={tech.path} />
      </svg>
    );
  }

  const Icon = tech.icon;
  return <Icon aria-hidden="true" className={cn("stroke-[1.75]", className)} />;
}

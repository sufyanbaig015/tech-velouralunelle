import { Check } from "lucide-react";

import type { Service } from "@/content/services";

// Decorative hero graphic for service pages: the service icon on a gradient tile with a preview card.
export function ServiceHeroVisual({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-md select-none lg:block">
      <span className="absolute -left-8 top-4 size-56 rounded-full bg-primary/25 blur-3xl" />
      <span className="absolute -right-4 bottom-0 size-64 rounded-full bg-accent/30 blur-3xl" />

      <div className="glass relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border-accent/30 bg-card-glow shadow-glow">
        <span className="absolute size-[88%] rounded-full border border-accent/10" />
        <span className="absolute size-[66%] rounded-full border border-accent/20" />
        <span className="absolute size-[44%] rounded-full bg-primary/25 blur-2xl" />
        <span className="relative flex size-32 items-center justify-center rounded-[1.75rem] bg-gradient-to-b from-primary-light to-primary text-primary-foreground shadow-button">
          <Icon className="size-16" strokeWidth={1.5} />
        </span>
      </div>

      <div className="absolute -bottom-8 -left-10 w-64 rounded-2xl border bg-surface p-5 shadow-soft-lg motion-safe:animate-float">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Included</p>
        <ul className="mt-3 space-y-2">
          {service.included.slice(0, 3).map((item) => (
            <li key={item.title} className="flex items-start gap-2 text-sm font-medium text-heading">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

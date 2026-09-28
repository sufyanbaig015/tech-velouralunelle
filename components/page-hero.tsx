import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { GlyphField } from "@/components/glyph-field";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description: string;
  /** Call-to-action buttons shown under the description. */
  actions?: ReactNode;
  /** Optional content for the right-hand column on large screens. */
  aside?: ReactNode;
};

export function PageHero({ breadcrumbs, eyebrow, title, description, actions, aside }: PageHeroProps) {
  return (
    // Negative top margin pulls the glow up behind the floating header.
    <section aria-labelledby="page-title" className="relative isolate -mt-24 overflow-hidden border-b pt-24">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-beam" />
      <GlyphField className="-right-10 top-10 -z-10 hidden md:block" seed={5} />

      <div className={cn("container grid items-center gap-12 py-12 sm:py-16 lg:py-20", aside && "lg:grid-cols-2")}>
        <div className="max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && (
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          )}
          <h1
            id="page-title"
            className={cn(
              "text-gradient text-4xl font-medium leading-[1.1] sm:text-5xl lg:text-6xl",
              eyebrow ? "mt-3" : "mt-8",
            )}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{description}</p>
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}

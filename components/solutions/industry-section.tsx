import { ArrowRight, Check, CircleAlert } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import type { Industry } from "@/content/industries";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export function IndustrySection({ industry, tinted = false }: { industry: Industry; tinted?: boolean }) {
  const Icon = industry.icon;
  const relatedServices = services.filter((service) => industry.services.includes(service.slug));
  const titleId = `${industry.slug}-title`;

  return (
    <section id={industry.slug} aria-labelledby={titleId} className={cn("py-20 sm:py-24", tinted && "bg-tint")}>
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground shadow-glow">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <h2 id={titleId} className="mt-6 text-3xl font-semibold sm:text-4xl">
            {industry.name}
          </h2>
          <p className="mt-3 text-lg font-semibold text-accent">{industry.tagline}</p>
          <p className="mt-4 leading-relaxed">{industry.description}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-heading">Common challenges</h3>
          <ul className="mt-4 space-y-3">
            {industry.challenges.map((challenge) => (
              <li key={challenge} className="flex items-start gap-3 text-sm">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-heading">How we help</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {industry.solutions.map((solution, index) => (
              <li key={solution.title}>
                <Reveal delay={(index % 2) * 0.06} className="h-full rounded-2xl border bg-surface p-6 shadow-soft">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-tint text-accent">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-semibold">{solution.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed">{solution.description}</p>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-medium text-heading">Related services:</span>
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group inline-flex items-center gap-1 rounded-full border bg-surface px-3.5 py-1.5 text-sm font-medium text-accent transition-colors hover:border-primary/30 hover:bg-tint focus-visible:rounded-full"
              >
                {service.title}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

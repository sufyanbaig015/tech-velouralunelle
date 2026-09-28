import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import type { Service } from "@/content/services";

type ServiceCardProps = {
  service: Service;
  /** Show the first few "what's included" items under the summary. */
  showHighlights?: boolean;
};

export function ServiceCard({ service, showHighlights = false }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="glass group flex h-full flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow focus-visible:rounded-2xl"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-primary-light to-primary text-primary-foreground shadow-button transition-transform group-hover:-translate-y-0.5">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
      <div className="mt-2 flex-1">
        <p className="text-sm leading-relaxed">{service.summary}</p>
        {showHighlights && (
          <ul className="mt-4 space-y-2">
            {service.included.slice(0, 3).map((item) => (
              <li key={item.title} className="flex items-start gap-2 text-sm text-heading">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Learn more
        <span className="sr-only">about {service.title}</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

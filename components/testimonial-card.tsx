import { Quote } from "lucide-react";

import type { Testimonial } from "@/content/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-soft sm:p-8">
      <Quote className="size-8 text-accent" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 leading-relaxed text-heading">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t pt-6">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-primary-foreground"
        >
          {initials(testimonial.name)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-heading">{testimonial.name}</span>
          {testimonial.role}, {testimonial.company}
        </span>
      </figcaption>
    </figure>
  );
}

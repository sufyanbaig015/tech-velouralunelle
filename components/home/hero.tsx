import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { GlyphField } from "@/components/glyph-field";
import { HeroShowcase } from "@/components/home/hero-showcase";
import { BookCallButton } from "@/components/layout/book-call-button";
import { Button } from "@/components/ui/button";
import { hero } from "@/content/home";

export function Hero() {
  return (
    // Negative top margin pulls the hero's glow up behind the floating header.
    <section aria-labelledby="hero-title" className="relative isolate -mt-24 overflow-hidden pt-24">
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-beam" />
      <GlyphField className="-left-10 top-16 -z-10 hidden md:block" seed={3} />
      <GlyphField className="-right-16 top-72 -z-10 hidden md:block" seed={11} />

      <div className="container pb-8 pt-14 text-center sm:pt-20 lg:pt-24">
        <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-heading/90 sm:text-sm">
          <span className="size-2 rounded-full bg-accent shadow-glow" aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="mx-auto mt-7 max-w-5xl font-heading text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">{hero.titleStart} </span>
          <span className="bg-brand-text bg-clip-text pb-1 text-transparent">{hero.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed">{hero.description}</p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <BookCallButton size="lg" label="Book a Free Call" />
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              View Services
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {hero.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 text-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <HeroShowcase />
      </div>
    </section>
  );
}

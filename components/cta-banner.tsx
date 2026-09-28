import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { GlyphField } from "@/components/glyph-field";
import { BookCallButton } from "@/components/layout/book-call-button";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

type CTABannerProps = {
  title: string;
  description: string;
};

export function CTABanner({ title, description }: CTABannerProps) {
  return (
    <section aria-labelledby="cta-banner-title" className="py-20 sm:py-24">
      <div className="container">
        <Reveal className="glass relative isolate overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-24">
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-section-glow" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-beam" />
          <span
            aria-hidden="true"
            className="absolute -bottom-40 left-1/2 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-full bg-primary/40 blur-3xl"
          />
          <GlyphField className="-left-8 top-0 -z-10 hidden sm:block" seed={19} />
          <GlyphField className="-right-8 bottom-0 -z-10 hidden sm:block" seed={23} />
          <h2
            id="cta-banner-title"
            className="text-gradient mx-auto max-w-3xl text-3xl font-medium leading-tight sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed">{description}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <BookCallButton size="lg" label="Book a Free Call" />
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Send us a message
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

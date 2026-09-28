import { Quote, Target } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { CTABanner } from "@/components/cta-banner";
import { LinkedInIcon } from "@/components/icons/brand-icons";
import { BookCallButton } from "@/components/layout/book-call-button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { aboutPage as page, founder, values } from "@/content/about";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/about",
  socialTitle: page.title,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        actions={<BookCallButton size="lg" label="Book a Free Call" />}
        aside={
          <div className="relative overflow-hidden rounded-2xl border bg-surface p-6 shadow-soft-lg sm:p-8 lg:ml-auto lg:max-w-md">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-brand-gradient" />
            <span className="flex size-12 items-center justify-center rounded-xl bg-tint text-accent">
              <Target className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold">Our mission</h2>
            <p className="mt-3 text-lg leading-relaxed text-heading">{page.mission}</p>
          </div>
        }
      />

      <section aria-labelledby="story-title" className="py-20 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="story-title"
            eyebrow="Our story"
            title={page.story.title}
            align="left"
            className="lg:col-span-5"
          />
          <div className="space-y-5 text-lg leading-relaxed lg:col-span-7">
            {page.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-tint py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="values-title"
            eyebrow="Our values"
            title={page.valuesTitle}
            description={page.valuesDescription}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <li key={value.title}>
                  <Reveal delay={(index % 3) * 0.06} className="h-full rounded-2xl bg-surface p-6 shadow-soft sm:p-7">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{value.description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="founder-title" className="py-20 sm:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl"
            />
            <Image
              src={founder.photo}
              alt={founder.photoAlt}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 40vw, 384px"
              unoptimized={founder.photo.endsWith(".svg")}
              className="aspect-square w-full rounded-3xl border bg-surface object-cover shadow-soft-lg"
            />
          </Reveal>

          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Meet the founder</p>
            <h2 id="founder-title" className="mt-3 text-3xl font-semibold sm:text-4xl">
              {founder.name}
            </h2>
            <p className="mt-2 font-medium text-heading">{founder.role}</p>
            <div className="mt-6 space-y-4 leading-relaxed">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-8 flex gap-4 rounded-2xl border-l-4 border-accent bg-tint p-6">
              <Quote className="size-6 shrink-0 text-accent" aria-hidden="true" />
              <p className="font-heading text-lg font-semibold text-heading">{founder.quote}</p>
            </blockquote>
            <Button asChild variant="outline" className="mt-8">
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon />
                Connect on LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      <CTABanner title={page.cta.title} description={page.cta.description} />
    </>
  );
}

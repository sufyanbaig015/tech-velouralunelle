import { ArrowDown } from "lucide-react";
import type { Metadata } from "next";

import { CTABanner } from "@/components/cta-banner";
import { BookCallButton } from "@/components/layout/book-call-button";
import { PageHero } from "@/components/page-hero";
import { IndustrySection } from "@/components/solutions/industry-section";
import { industries, solutionsPage as page } from "@/content/industries";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/solutions",
  socialTitle: page.title,
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        actions={<BookCallButton size="lg" label="Book a Free Call" />}
        aside={
          <nav
            aria-labelledby="jump-title"
            className="rounded-2xl border bg-surface p-6 shadow-soft-lg sm:p-8 lg:ml-auto lg:w-full lg:max-w-sm"
          >
            <h2 id="jump-title" className="text-lg font-semibold">
              {page.jumpTitle}
            </h2>
            <ul className="mt-4 space-y-1">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <li key={industry.slug}>
                    <a
                      href={`#${industry.slug}`}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-heading transition-colors hover:bg-tint focus-visible:rounded-xl"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-tint text-accent transition-colors group-hover:bg-surface">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex-1">{industry.name}</span>
                      <ArrowDown
                        className="size-4 text-accent opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        }
      />

      {industries.map((industry, index) => (
        <IndustrySection key={industry.slug} industry={industry} tinted={index % 2 === 1} />
      ))}

      <CTABanner title={page.cta.title} description={page.cta.description} />
    </>
  );
}

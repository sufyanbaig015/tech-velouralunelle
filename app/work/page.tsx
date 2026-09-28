import type { Metadata } from "next";

import { CTABanner } from "@/components/cta-banner";
import { BookCallButton } from "@/components/layout/book-call-button";
import { PageHero } from "@/components/page-hero";
import { WorkGrid } from "@/components/work/work-grid";
import { projects, workPage as page } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/work",
  socialTitle: page.title,
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        actions={<BookCallButton size="lg" label="Book a Free Call" />}
      />

      <section aria-labelledby="projects-title" className="py-16 sm:py-24">
        <div className="container">
          <h2 id="projects-title" className="sr-only">
            All projects
          </h2>
          <WorkGrid projects={projects} />
        </div>
      </section>

      <CTABanner title={page.cta.title} description={page.cta.description} />
    </>
  );
}

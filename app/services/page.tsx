import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";

import { CTABanner } from "@/components/cta-banner";
import { BookCallButton } from "@/components/layout/book-call-button";
import { PageHero } from "@/components/page-hero";
import { ProcessSteps } from "@/components/process-steps";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { processSteps } from "@/content/process";
import { services } from "@/content/services";
import { servicesOverview as page } from "@/content/services/overview";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/services",
  socialTitle: page.title,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        actions={<BookCallButton size="lg" label="Book a Free Call" />}
        aside={
          <div className="rounded-2xl border bg-surface p-6 shadow-soft-lg sm:p-8 lg:ml-auto lg:w-full lg:max-w-sm">
            <h2 className="text-lg font-semibold">{page.promisesTitle}</h2>
            <ul className="mt-5 space-y-4">
              {page.promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3 text-heading">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section aria-labelledby="services-grid-title" className="py-20 sm:py-28">
        <div className="container">
          <SectionHeading id="services-grid-title" title={page.gridTitle} description={page.gridDescription} />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Reveal delay={(index % 4) * 0.06} className="h-full">
                  <ServiceCard service={service} showHighlights />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-title" className="bg-tint py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="The same clear process for every project"
            description="Five steps from first call to long-term support. You always know what happens next."
          />
          <div className="mt-14">
            <ProcessSteps steps={processSteps} />
          </div>
        </div>
      </section>

      <CTABanner title={page.cta.title} description={page.cta.description} />
    </>
  );
}

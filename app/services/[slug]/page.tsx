import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CTABanner } from "@/components/cta-banner";
import { FAQSection } from "@/components/faq-section";
import { BookCallButton } from "@/components/layout/book-call-button";
import { PageHero } from "@/components/page-hero";
import { ProcessSteps } from "@/components/process-steps";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceHeroVisual } from "@/components/services/service-hero-visual";
import { JsonLd } from "@/components/json-ld";
import { TechGrid } from "@/components/tech-grid";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/content/process";
import { getRelatedServices, getService, services } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  return createMetadata({
    title: `${service.title} Services`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    socialTitle: service.headline,
    image: `/services/${service.slug}/opengraph-image`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const steps = processSteps.map((step) => ({ ...step, description: service.process[step.id] }));

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={service.title}
        title={service.headline}
        description={service.intro}
        actions={
          <>
            <BookCallButton size="lg" label="Book a Free Call" />
            <Button asChild variant="outline" size="lg">
              <a href="#included">See what&apos;s included</a>
            </Button>
          </>
        }
        aside={<ServiceHeroVisual service={service} />}
      />

      <section id="included" aria-labelledby="included-title" className="py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="included-title"
            eyebrow="What's included"
            title="Everything you need, handled by one team"
            description="Pick what you need now. We can add the rest as your business grows."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={(index % 3) * 0.06}
                  className="flex h-full gap-4 rounded-2xl border bg-surface p-6 shadow-soft"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tint text-accent">
                    <Check className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="benefits-title" className="bg-tint py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="benefits-title"
            eyebrow="Benefits"
            title="What this means for your business"
            description="Good software isn't just about features. It should save time, win customers, and make work easier."
            align="left"
            className="lg:col-span-5"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {service.benefits.map((benefit, index) => (
              <li key={benefit.title}>
                <Reveal delay={(index % 2) * 0.06} className="h-full rounded-2xl bg-surface p-6 shadow-soft">
                  <span className="font-heading text-sm font-semibold text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{benefit.description}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tech-title" className="py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="tech-title"
            eyebrow="Tech we use"
            title="Proven tools, chosen for your needs"
            description="We pick well-supported technology that fits your goals and budget, not whatever is trendy this month."
          />
          <div className="mt-14">
            <TechGrid ids={service.tech} />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="border-y bg-surface py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="Our process"
            title="How your project comes together"
            description="Five clear steps, with a check-in at every stage, so there are no surprises."
          />
          <div className="mt-14">
            <ProcessSteps steps={steps} />
          </div>
        </div>
      </section>

      <FAQSection
        faqs={service.faqs}
        title={`${service.title} questions`}
        description="Quick answers to what clients usually ask. Still unsure? Send us a message and we'll reply within one business day."
      />

      <section aria-labelledby="related-title" className="bg-tint py-20 sm:py-28">
        <div className="container">
          <SectionHeading id="related-title" eyebrow="Keep exploring" title="Related services" />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {getRelatedServices(service.slug).map((related) => (
              <li key={related.slug}>
                <ServiceCard service={related} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner title={service.cta.title} description={service.cta.description} />
    </>
  );
}

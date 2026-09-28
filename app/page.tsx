import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CTABanner } from "@/components/cta-banner";
import { GlyphField } from "@/components/glyph-field";
import { FAQSection } from "@/components/faq-section";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { JsonLd } from "@/components/json-ld";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { homeFaqs } from "@/content/faqs";
import { finalCta } from "@/content/home";
import { processSteps } from "@/content/process";
import { featuredProjects } from "@/content/projects";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { createMetadata } from "@/lib/metadata";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: `Websites, Apps & AI Automation | ${siteConfig.shortName}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

// Centers a lone last card in 2-column (tablet) grids.
const centerOrphan =
  "md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-0.75rem)] lg:last:odd:col-span-1 lg:last:odd:mx-0 lg:last:odd:w-auto";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <Hero />
      <TrustStrip />

      <section aria-labelledby="services-title" className="py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Everything you need to build and grow online"
            description="From your first website to AI that runs parts of your business, we design, build, and support it all."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Reveal delay={(index % 4) * 0.06} className="h-full">
                  <ServiceCard service={service} />
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                Explore all services
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="relative isolate overflow-hidden bg-tint py-20 sm:py-28">
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-section-glow" />
        <GlyphField className="-left-10 top-10 -z-10 hidden lg:block" seed={17} />
        <GlyphField className="-right-10 bottom-0 -z-10 hidden lg:block" seed={41} />
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="A simple process with no surprises"
            description="Five clear steps from first call to long-term support. You always know what happens next."
          />
          <div className="mt-14">
            <ProcessSteps steps={processSteps} />
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section aria-labelledby="work-title" className="border-y bg-tint py-20 sm:py-28">
        <div className="container">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <SectionHeading
              id="work-title"
              eyebrow="Featured work"
              title="Projects that solve real problems"
              description="A look at how we help businesses save time, win customers, and grow."
              align="left"
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/work">
                See all work
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <li key={project.slug} className={centerOrphan}>
                <Reveal delay={index * 0.08} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="testimonials-title" className="py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            id="testimonials-title"
            eyebrow="Client stories"
            title="What our clients say"
            description="We measure success by how our clients feel after launch, and a year later."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <li key={testimonial.name} className={centerOrphan}>
                <Reveal delay={index * 0.08} className="h-full">
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection faqs={homeFaqs} />

      <CTABanner title={finalCta.title} description={finalCta.description} />
    </>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FAQAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import type { Faq } from "@/content/faqs";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

type FAQSectionProps = {
  faqs: Faq[];
  title?: string;
  description?: string;
  className?: string;
};

export function FAQSection({
  faqs,
  title = "Questions we hear a lot",
  description = "Can't find what you're looking for? Send us a message and we'll reply within one business day.",
  className,
}: FAQSectionProps) {
  return (
    <section aria-labelledby="faq-title" className={cn("py-20 sm:py-28", className)}>
      <JsonLd data={faqSchema(faqs)} />
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="faq-title" eyebrow="FAQ" title={title} description={description} align="left" />
          <Button asChild variant="outline" className="mt-8">
            <Link href="/contact">
              Ask us a question
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="lg:col-span-7">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}

import { Scheduler } from "@/components/booking/scheduler";
import { FAQSection } from "@/components/faq-section";
import { PageHero } from "@/components/page-hero";
import { bookingFaqs, bookingPage } from "@/content/booking";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Book a Free Call",
  description:
    "Pick a time for a free 30-minute call with Veloura Lunelle Technologies. See open times in your own time zone and get a Google Meet link straight away.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a call" }]}
        eyebrow="Free consultation"
        title={bookingPage.title}
        description={bookingPage.description}
      />
      <section aria-label="Pick a time" className="container py-12 sm:py-16">
        <Scheduler mode="book" />
      </section>
      <FAQSection
        faqs={bookingFaqs}
        title="Before you book"
        description="Quick answers about the call. Anything else? Send us a message and we'll reply within one business day."
        className="border-t bg-tint"
      />
    </>
  );
}

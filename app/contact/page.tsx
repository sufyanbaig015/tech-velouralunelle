import { CalendarDays, Mail } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { BookCallButton } from "@/components/layout/book-call-button";
import { PageHero } from "@/components/page-hero";
import { budgetOptions, contactPage as page, serviceOptions } from "@/content/contact";
import { formatPhone, siteConfig, whatsappUrl } from "@/lib/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/contact",
  socialTitle: page.title,
});

const contactLinks = [
  {
    label: "Email us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: <Mail className="size-5" aria-hidden="true" />,
    external: false,
  },
  {
    label: "Chat on WhatsApp",
    value: formatPhone(siteConfig.whatsappNumber),
    href: whatsappUrl(),
    icon: <WhatsAppIcon className="size-5" />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      <section aria-labelledby="form-title" className="py-16 sm:py-24">
        <div className="container grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-2xl border bg-surface p-6 shadow-soft-lg sm:p-8 lg:col-span-7 lg:self-start">
            <h2 id="form-title" className="text-2xl font-semibold">
              {page.formTitle}
            </h2>
            <p className="mt-2 text-sm">{page.formDescription}</p>
            <div className="mt-8">
              <ContactForm
                serviceOptions={serviceOptions}
                budgetOptions={budgetOptions}
                success={page.success}
                fallbackEmail={siteConfig.email}
              />
            </div>
          </div>

          <aside aria-label="Other ways to reach us" className="space-y-6 lg:col-span-5">
            <div className="relative isolate overflow-hidden glass rounded-2xl border-accent/30 bg-card-glow p-6 text-primary-foreground shadow-glow sm:p-8">
              <span aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-48 rounded-full bg-primary/60 blur-3xl" />
              <span aria-hidden="true" className="absolute -bottom-20 -left-10 -z-10 size-48 rounded-full bg-accent/40 blur-3xl" />
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <CalendarDays className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-primary-foreground">{page.callTitle}</h2>
              <p className="mt-2 leading-relaxed text-primary-foreground/80">{page.callDescription}</p>
              <BookCallButton label="Pick a time" variant="inverse" className="mt-6" />
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center gap-4 rounded-2xl border bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 focus-visible:rounded-2xl"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent">
                      {link.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm">{link.label}</span>
                      <span className="block truncate font-semibold text-heading group-hover:text-accent">
                        {link.value}
                      </span>
                      {link.external && <span className="sr-only">(opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border bg-tint p-6 sm:p-8">
              <h2 className="text-lg font-semibold">{page.nextStepsTitle}</h2>
              <ol className="mt-5 space-y-4">
                {page.nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-heading">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

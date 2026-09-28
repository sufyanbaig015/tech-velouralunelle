import { PageHero } from "@/components/page-hero";
import type { LegalDocument } from "@/content/legal";

// "2026-09-28" → "September 28, 2026". UTC so the day never shifts with the server's time zone.
const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(isoDate));

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: document.title }]}
        title={document.title}
        description={document.intro}
      />
      <article className="container max-w-3xl py-16 sm:py-20">
        <p className="text-sm font-medium text-heading">
          Last updated: <time dateTime={document.lastUpdated}>{formatDate(document.lastUpdated)}</time>
        </p>
        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
              <div className="mt-3 space-y-4 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}

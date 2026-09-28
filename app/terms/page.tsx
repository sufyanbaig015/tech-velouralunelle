import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { termsOfService } from "@/content/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: termsOfService.title,
  description: termsOfService.metaDescription,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage document={termsOfService} />;
}

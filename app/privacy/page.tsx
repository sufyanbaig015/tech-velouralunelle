import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { privacyPolicy } from "@/content/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.metaDescription,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}

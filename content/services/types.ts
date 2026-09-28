import type { LucideIcon } from "lucide-react";

import type { Faq } from "@/content/faqs";
import type { ProcessStageId } from "@/content/process";
import type { TechId } from "@/content/tech";

export type ServiceItem = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  /** One-line description used on cards. */
  summary: string;
  icon: LucideIcon;
  /** Search result description for the service page (about 150 characters). */
  metaDescription: string;
  headline: string;
  intro: string;
  included: ServiceItem[];
  benefits: ServiceItem[];
  tech: TechId[];
  /** Service-specific description for each of the five process stages. */
  process: Record<ProcessStageId, string>;
  faqs: Faq[];
  cta: {
    title: string;
    description: string;
  };
};

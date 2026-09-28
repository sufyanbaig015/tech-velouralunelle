import type { MetadataRoute } from "next";

import { privacyPolicy, termsOfService } from "@/content/legal";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Defaults to siteConfig.contentUpdated. */
  lastModified?: string;
  /** Share image for Google Images. Defaults to the site-wide image. */
  image?: string;
};

const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...services.map(
    (service): Entry => ({
      path: `/services/${service.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
      image: `/services/${service.slug}/opengraph-image`,
    }),
  ),
  { path: "/solutions", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", lastModified: privacyPolicy.lastUpdated },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", lastModified: termsOfService.lastUpdated },
];

const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

// Real content dates (not the build time), so Google can trust <lastmod>.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency, lastModified, image = "/opengraph-image" }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified ?? siteConfig.contentUpdated,
    changeFrequency,
    priority,
    images: [absoluteUrl(image)],
  }));
}

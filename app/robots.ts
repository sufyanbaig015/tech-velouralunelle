import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Booking management links are private; the admin area and API aren't pages.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/book/manage/"] },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}

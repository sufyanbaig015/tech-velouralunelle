import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  /** Page title. The layout adds " | Veloura Lunelle" unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Path of the page, e.g. "/services". Used for the canonical URL and og:url. */
  path: string;
  /** Optional different title for social previews. */
  socialTitle?: string;
  absoluteTitle?: boolean;
  /** Share image path. Defaults to the site-wide image from app/opengraph-image.tsx. */
  image?: string;
};

// Next.js replaces (rather than merges) nested openGraph/twitter objects, so every page
// builds the full set here to keep siteName, locale, card type, and image consistent.
export function createMetadata({
  title,
  description,
  path,
  socialTitle,
  absoluteTitle,
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const shareTitle = socialTitle ?? title;
  const images = [{ url: image, width: 1200, height: 630, alt: shareTitle }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: path,
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  };
}

import { renderOgImage } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export { ogImageSize as size } from "@/lib/og-image";
export const contentType = "image/png";
export const alt = `${siteConfig.name}: websites, apps, and AI automation for growing businesses`;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Software & AI studio",
    title: "Websites, apps, and AI that help your business grow",
  });
}

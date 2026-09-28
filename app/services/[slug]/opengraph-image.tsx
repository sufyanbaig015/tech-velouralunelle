import { getService, services } from "@/content/services";
import { renderOgImage } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export { ogImageSize as size } from "@/lib/og-image";
export const contentType = "image/png";
export const alt = `${siteConfig.name} service`;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  return renderOgImage({
    eyebrow: service?.title ?? "Our services",
    title: service?.headline ?? siteConfig.description,
  });
}

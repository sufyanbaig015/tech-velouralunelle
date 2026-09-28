export const siteConfig = {
  name: "Veloura Lunelle Technologies",
  shortName: "Veloura Lunelle",
  description:
    "Veloura Lunelle Technologies builds websites, web apps, mobile apps, and AI-powered automation for startups and small-to-mid businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tech.velouralunelle.com",
  /** Date the page content last changed. Update it when you edit /content, so the sitemap stays accurate. */
  contentUpdated: "2026-09-28",
  email: "hello@velouralunelle.com",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/velouralunelle/free-consultation",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15555550123",
  socials: {
    linkedin: "https://www.linkedin.com/company/velouralunelle",
    x: "https://x.com/velouralunelle",
    github: "https://github.com/velouralunelle",
  },
} as const;

export function whatsappUrl(message = "Hi Veloura Lunelle, I'd like to talk about a project.") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatPhone(digits: string) {
  return `+${digits}`;
}

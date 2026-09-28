import { aiAgentsAutomation } from "./ai-agents-automation";
import { aiIntegration } from "./ai-integration";
import { customSoftwareDevelopment } from "./custom-software-development";
import { devopsCloud } from "./devops-cloud";
import { mobileAppDevelopment } from "./mobile-app-development";
import type { Service } from "./types";
import { webAppDevelopment } from "./web-app-development";
import { websiteDevelopment } from "./website-development";
import { websiteSecurityMaintenance } from "./website-security-maintenance";

export type { Service } from "./types";

// Display order across the site (menus, grids, footer).
export const services: Service[] = [
  websiteDevelopment,
  webAppDevelopment,
  mobileAppDevelopment,
  customSoftwareDevelopment,
  aiAgentsAutomation,
  aiIntegration,
  devopsCloud,
  websiteSecurityMaintenance,
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** The next few services after the given one, wrapping around the list. */
export function getRelatedServices(slug: string, count = 3) {
  const index = services.findIndex((service) => service.slug === slug);
  return Array.from({ length: count }, (_, offset) => services[(index + offset + 1) % services.length]);
}

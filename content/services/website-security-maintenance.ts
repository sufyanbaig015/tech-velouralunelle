import { ShieldCheck } from "lucide-react";

import type { Service } from "./types";

export const websiteSecurityMaintenance: Service = {
  slug: "website-security-maintenance",
  title: "Website Security & Maintenance",
  summary: "Malware cleanup, speed fixes, backups, and updates so your site stays safe and fast.",
  icon: ShieldCheck,
  metaDescription:
    "Website security and maintenance: malware cleanup, speed optimization, backups, uptime monitoring, and regular updates for WordPress and custom sites.",
  headline: "Keep your website safe, fast, and always up to date",
  intro:
    "Outdated plugins, slow pages, and hacked sites cost you customers and trust. We fix problems fast, then keep your website healthy with regular updates, backups, and monitoring.",
  included: [
    {
      title: "Malware cleanup",
      description: "We remove malware, close the gap it came through, and help restore your Google standing.",
    },
    {
      title: "Speed optimization",
      description: "Faster pages through image compression, caching, and code clean-up.",
    },
    {
      title: "Updates and patches",
      description: "Safe, tested updates for WordPress core, themes, and plugins.",
    },
    {
      title: "Daily backups",
      description: "Automatic off-site backups, with quick restores when you need them.",
    },
    {
      title: "Uptime and security monitoring",
      description: "Round-the-clock checks that alert us the moment something goes wrong.",
    },
    {
      title: "Small changes included",
      description: "Text edits, new images, and minor fixes handled as part of your monthly plan.",
    },
  ],
  benefits: [
    {
      title: "Peace of mind",
      description: "Experts watch your site so you can focus on running your business.",
    },
    {
      title: "Better search rankings",
      description: "Speed and security both affect how Google ranks your site.",
    },
    {
      title: "Fewer surprises",
      description: "Regular care prevents most emergencies before they happen.",
    },
    {
      title: "Fast help",
      description: "When something breaks, you have a team that already knows your site.",
    },
  ],
  tech: ["wordpress", "woocommerce", "php", "cloudflare", "letsencrypt", "nginx", "lighthouse", "searchConsole"],
  process: {
    discover: "We audit your site's security, speed, and plugins, and share a clear report of what needs attention.",
    design: "We rank the fixes by risk and put together a care plan that fits your site and budget.",
    build: "We clean up malware, apply updates, and speed up your pages, testing each change carefully.",
    launch: "We put monitoring and backups in place and confirm everything runs smoothly.",
    support: "Each month we update, back up, and monitor your site, and send you a short health report.",
  },
  faqs: [
    {
      question: "My site has been hacked. How fast can you help?",
      answer:
        "Contact us right away by WhatsApp or email. For urgent cleanups we aim to start the same business day, remove the malware, and secure the site against repeat attacks.",
    },
    {
      question: "Do you only support WordPress?",
      answer:
        "WordPress is the most common platform we look after, but we also maintain Next.js, custom PHP, and other modern websites.",
    },
    {
      question: "What is included in a monthly plan?",
      answer:
        "Updates, daily backups, uptime and security monitoring, speed checks, a monthly report, and a set amount of time for small changes.",
    },
    {
      question: "Can you make my slow website faster?",
      answer:
        "Yes. We run a speed audit, then optimize images, caching, code, and hosting. Most sites see a clear improvement in load time and performance scores.",
    },
  ],
  cta: {
    title: "Is your website slow, outdated, or hacked?",
    description:
      "Book a free call or message us on WhatsApp. We'll check your site and tell you exactly what it needs.",
  },
};

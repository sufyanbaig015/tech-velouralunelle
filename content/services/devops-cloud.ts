import { Cloud } from "lucide-react";

import type { Service } from "./types";

export const devopsCloud: Service = {
  slug: "devops-cloud",
  title: "DevOps & Cloud",
  summary: "AWS setup, CI/CD pipelines, Docker, hosting, and monitoring that keep you online.",
  icon: Cloud,
  metaDescription:
    "DevOps and cloud services: AWS setup, CI/CD pipelines, Docker, reliable hosting, and monitoring that keep your apps fast, secure, and online.",
  headline: "Cloud infrastructure that stays fast, secure, and online",
  intro:
    "Slow deploys, surprise downtime, and rising cloud bills hold teams back. We set up clean, automated infrastructure so you can ship with confidence and sleep well at night.",
  included: [
    {
      title: "AWS setup and management",
      description: "Well-structured AWS accounts, networking, and services set up with best practices.",
    },
    {
      title: "CI/CD pipelines",
      description: "Automatic testing and deployment on every change, using GitHub Actions.",
    },
    {
      title: "Docker and containers",
      description: "Consistent environments from a developer's laptop all the way to production.",
    },
    {
      title: "Hosting and migrations",
      description: "Move to faster, more reliable hosting with little or no downtime.",
    },
    {
      title: "Monitoring and alerts",
      description: "Uptime checks, error tracking, and dashboards that warn you before users notice.",
    },
    {
      title: "Cloud cost optimization",
      description: "Right-size servers and remove waste to lower your monthly bill.",
    },
  ],
  benefits: [
    {
      title: "Ship faster",
      description: "Automated deploys turn a stressful release day into a routine click.",
    },
    {
      title: "Less downtime",
      description: "Health checks, backups, and alerts help you catch problems early.",
    },
    {
      title: "Lower cloud bills",
      description: "Pay for what you actually use, not for idle servers.",
    },
    {
      title: "Stronger security",
      description: "Least-privilege access, encrypted data, and patched systems by default.",
    },
  ],
  tech: [
    "aws",
    "docker",
    "kubernetes",
    "terraform",
    "githubActions",
    "vercel",
    "cloudflare",
    "nginx",
    "grafana",
    "sentry",
  ],
  process: {
    discover: "We review your current setup, costs, and pain points, and agree on priorities.",
    design: "We plan the target architecture, security rules, and a safe migration path.",
    build: "We set up infrastructure as code, pipelines, and monitoring, and test it all in staging.",
    launch: "We switch over during a quiet window, with a tested rollback plan ready.",
    support: "We monitor, patch, and optimize on an ongoing plan, and document everything for your team.",
  },
  faqs: [
    {
      question: "Do we really need DevOps as a small team?",
      answer:
        "You don't need a full DevOps team, but you do benefit from automated deploys, backups, and monitoring. We set these up once so your small team can move faster, safely.",
    },
    {
      question: "Can you reduce our AWS bill?",
      answer:
        "Often, yes. Common savings come from right-sizing servers, removing unused resources, using reserved pricing, and moving suitable workloads to cheaper services.",
    },
    {
      question: "Will the migration cause downtime?",
      answer:
        "We plan migrations to avoid or minimize downtime, test everything in staging first, and always keep a rollback plan ready.",
    },
    {
      question: "Do you only work with AWS?",
      answer:
        "AWS is our main platform, but we also work with Google Cloud, DigitalOcean, Vercel, and Cloudflare, depending on what fits your needs and budget.",
    },
  ],
  cta: {
    title: "Want deploys that just work?",
    description:
      "Book a free call. We'll review your current setup and point out quick wins for speed, reliability, and cost.",
  },
};

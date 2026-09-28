import { LayoutDashboard } from "lucide-react";

import type { Service } from "./types";

export const webAppDevelopment: Service = {
  slug: "web-app-development",
  title: "Web App Development",
  summary: "SaaS products, dashboards, client portals, and CRMs that are easy to use and ready to scale.",
  icon: LayoutDashboard,
  metaDescription:
    "Custom web app development for SaaS products, dashboards, client portals, and CRMs. Built with React, Next.js, and Node.js to scale with your business.",
  headline: "Web apps that make your business run smoother",
  intro:
    "Spreadsheets and email threads only go so far. We build web apps that put your data, customers, and workflows in one place, with a clean interface your team will actually enjoy using.",
  included: [
    {
      title: "SaaS products",
      description: "From MVP to paying customers: sign-up, billing, user roles, and admin tools.",
    },
    {
      title: "Dashboards and reporting",
      description: "Live charts and reports that pull data from your tools so you can decide faster.",
    },
    {
      title: "Client and partner portals",
      description: "Secure logins where customers can view orders, share files, and track progress.",
    },
    {
      title: "Custom CRMs",
      description: "Track leads, deals, and follow-ups in a system built around your sales process.",
    },
    {
      title: "Integrations and APIs",
      description: "Connect payments, email, accounting, and the other tools you already use.",
    },
    {
      title: "Secure user management",
      description: "Logins, roles, permissions, and audit logs done right from day one.",
    },
  ],
  benefits: [
    {
      title: "Less manual work",
      description: "Automate data entry and routine tasks so your team can focus on real work.",
    },
    {
      title: "One source of truth",
      description: "Everyone sees the same up-to-date data. No more conflicting spreadsheets.",
    },
    {
      title: "Built to scale",
      description: "A solid architecture that handles more users and more data as you grow.",
    },
    {
      title: "Faster launch",
      description: "We ship a focused first version quickly, then improve it based on real feedback.",
    },
  ],
  tech: ["react", "nextjs", "typescript", "nodejs", "nestjs", "postgresql", "supabase", "prisma", "stripe", "aws"],
  process: {
    discover: "We map your users, workflows, and must-have features, then agree on a focused first version.",
    design: "We create wireframes and a clickable prototype so you can test the flow before code is written.",
    build: "We build in weekly sprints with a live staging link, so you see progress every week.",
    launch: "We load-test, secure, and deploy the app, then help onboard your first users.",
    support: "We monitor, fix issues fast, and keep shipping new features on a plan that suits you.",
  },
  faqs: [
    {
      question: "What is an MVP and do I need one?",
      answer:
        "An MVP (minimum viable product) is the smallest version of your app that solves the main problem. It lets you launch sooner, spend less, and learn from real users before building more.",
    },
    {
      question: "Can you take over an existing app?",
      answer:
        "Yes. We start with a code review, fix urgent issues, and then continue development. We'll be honest if parts need to be rebuilt.",
    },
    {
      question: "How do you keep user data secure?",
      answer:
        "We use proven authentication, encrypted connections, role-based access, and regular backups. For sensitive data, we add audit logs and collect only what the app truly needs.",
    },
    {
      question: "Can the app handle payments and subscriptions?",
      answer:
        "Yes. We integrate Stripe for one-time payments, subscriptions, invoices, and self-service billing portals.",
    },
  ],
  cta: {
    title: "Have an app idea or a messy process to fix?",
    description:
      "Tell us about it on a free call. We'll help you define a focused first version and give you a clear quote.",
  },
};

import { CodeXml } from "lucide-react";

import type { Service } from "./types";

export const customSoftwareDevelopment: Service = {
  slug: "custom-software-development",
  title: "Custom Software Development",
  summary: "Software shaped around how your business actually works, not the other way around.",
  icon: CodeXml,
  metaDescription:
    "Custom software development for businesses that have outgrown off-the-shelf tools. Internal systems, integrations, and automation built around your workflow.",
  headline: "Software built around the way your business works",
  intro:
    "Off-the-shelf tools make you change how you work. Custom software does the opposite. We build internal systems, integrations, and tools that fit your process and remove the busywork.",
  included: [
    {
      title: "Internal business tools",
      description: "Inventory, scheduling, quoting, and operations tools built for your team.",
    },
    {
      title: "System integrations",
      description: "Connect the apps you already use so data flows without copy and paste.",
    },
    {
      title: "Legacy modernization",
      description: "Move old desktop or spreadsheet-based systems to modern, secure web software.",
    },
    {
      title: "Data migration",
      description: "Move your records safely from old systems, with checks at every step.",
    },
    {
      title: "APIs and backends",
      description: "Robust APIs that power your apps, your partners, and your future products.",
    },
    {
      title: "Documentation and training",
      description: "Clear guides and hands-on training so your team is confident from day one.",
    },
  ],
  benefits: [
    {
      title: "Fits your process",
      description: "No workarounds and no unused features. Every screen serves a real task.",
    },
    {
      title: "Saves hours every week",
      description: "Automating routine steps adds up to big time savings across your team.",
    },
    {
      title: "Fewer errors",
      description: "Built-in checks and automation cut the mistakes that come with manual work.",
    },
    {
      title: "You own it",
      description: "No per-seat license fees. The software and the code belong to you.",
    },
  ],
  tech: ["typescript", "nodejs", "python", "fastapi", "react", "postgresql", "redis", "graphql", "docker", "aws"],
  process: {
    discover: "We sit with your team, map the current workflow, and find the steps that cost the most time.",
    design: "We plan the data model and design simple screens for each role on your team.",
    build: "We build and test module by module, with weekly demos and early access for key users.",
    launch: "We migrate your data, train your team, and roll out in stages to avoid disruption.",
    support: "We stay on call, fix issues quickly, and add improvements as your process evolves.",
  },
  faqs: [
    {
      question: "When does custom software make sense?",
      answer:
        "When your team spends hours on manual workarounds, juggles many disconnected tools, or pays for software that only fits half your needs. If an existing tool would do the job, we'll tell you.",
    },
    {
      question: "Is custom software expensive to maintain?",
      answer:
        "Not when it's built well. We use common, well-supported technologies and write clean, documented code, so maintenance stays simple and predictable.",
    },
    {
      question: "Can you work with our existing systems?",
      answer:
        "Yes. We integrate with most systems through APIs, databases, or file exports, and we can modernize older systems step by step.",
    },
    {
      question: "What if we want to change something later?",
      answer:
        "Custom software grows with you. We build in a modular way, so new features can be added without starting over.",
    },
  ],
  cta: {
    title: "Tired of working around your tools?",
    description:
      "Book a free call. We'll look at your workflow and show you where custom software could save the most time.",
  },
};

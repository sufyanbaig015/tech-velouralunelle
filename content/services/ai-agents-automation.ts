import { Bot } from "lucide-react";

import type { Service } from "./types";

export const aiAgentsAutomation: Service = {
  slug: "ai-agents-automation",
  title: "AI Agents & Automation",
  summary: "Claude-powered agents and n8n workflows that take repetitive work off your team's plate.",
  icon: Bot,
  metaDescription:
    "Claude AI agents and n8n workflow automation that handle repetitive tasks, qualify leads, process documents, and connect your business tools.",
  headline: "AI agents and automations that handle the busywork for you",
  intro:
    "Many tasks follow the same steps every time: answering common questions, copying data between tools, sorting emails, chasing follow-ups. We build AI agents and automated workflows that handle them reliably, day and night.",
  included: [
    {
      title: "Claude AI agents",
      description: "Agents that read, reason, and take action across your tools, within limits you control.",
    },
    {
      title: "Workflow automation with n8n",
      description: "Visual, easy-to-maintain workflows that connect your apps and run on a schedule or on demand.",
    },
    {
      title: "Lead capture and qualification",
      description: "Reply to new leads instantly, ask the right questions, and route hot leads to your team.",
    },
    {
      title: "Email and inbox automation",
      description: "Sort, summarize, and draft replies so your inbox stays under control.",
    },
    {
      title: "Document processing",
      description: "Pull data from invoices, forms, and contracts straight into your systems.",
    },
    {
      title: "Human approval steps",
      description: "Review points and activity logs, so people stay in charge of important decisions.",
    },
  ],
  benefits: [
    {
      title: "Hours back every week",
      description: "Your team stops doing repetitive tasks and focuses on work that needs a human.",
    },
    {
      title: "Faster response times",
      description: "Customers and leads get answers in seconds, not hours.",
    },
    {
      title: "Consistent results",
      description: "Automations follow the same steps every time, with fewer mistakes.",
    },
    {
      title: "Scale without hiring",
      description: "Handle more volume without adding headcount for routine work.",
    },
  ],
  tech: ["claude", "n8n", "openai", "python", "nodejs", "zapier", "make", "hubspot", "airtable", "googleSheets"],
  process: {
    discover: "We list your repetitive tasks and pick the ones where automation saves the most time.",
    design: "We map each workflow step by step, including where a person should review or approve.",
    build: "We build the agents and workflows, then test them on real examples from your business.",
    launch: "We switch automations on gradually, watch the results closely, and train your team.",
    support: "We track performance, tune prompts and rules, and add new automations over time.",
  },
  faqs: [
    {
      question: "What is an AI agent?",
      answer:
        "An AI agent is software that uses a model like Claude to understand a task, decide on the steps, and use tools such as your email, CRM, or calendar to complete it. We give every agent clear rules and limits.",
    },
    {
      question: "Why do you use n8n?",
      answer:
        "n8n is a powerful workflow tool that can be self-hosted. It keeps your data under your control, avoids per-task fees at high volume, and makes every workflow easy to see and change.",
    },
    {
      question: "Will the AI make mistakes?",
      answer:
        "It can, which is why we build in safeguards: clear instructions, validation checks, approval steps for important actions, and logs you can review at any time.",
    },
    {
      question: "Is my data safe?",
      answer:
        "We use business-grade AI APIs that don't train on your data by default, give each workflow access only to what it needs, and can self-host tools when required.",
    },
  ],
  cta: {
    title: "What would your team do with more free hours?",
    description:
      "Book a free call. We'll find the tasks in your business that are easiest to automate and show you what's possible.",
  },
};

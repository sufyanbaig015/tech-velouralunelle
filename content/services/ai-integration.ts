import { BrainCircuit } from "lucide-react";

import type { Service } from "./types";

export const aiIntegration: Service = {
  slug: "ai-integration",
  title: "AI Integration",
  summary: "Chatbots, smart search, and document AI added to your product with the Claude and OpenAI APIs.",
  icon: BrainCircuit,
  metaDescription:
    "Add AI to your website, app, or software with the Claude API and OpenAI API. Chatbots, RAG knowledge search, and document AI built for real business use.",
  headline: "Add practical AI to the products and tools you already have",
  intro:
    "AI is most useful when it lives inside the tools your customers and team already use. We integrate Claude and OpenAI into your website, app, or internal systems, with a focus on accuracy, safety, and cost.",
  included: [
    {
      title: "AI chatbots and assistants",
      description: "Helpful assistants for your website or app that answer from your own content.",
    },
    {
      title: "RAG knowledge search",
      description: "Ask questions across your documents, help center, or database and get answers with sources.",
    },
    {
      title: "Document AI",
      description: "Summarize, classify, and extract data from PDFs, emails, and scanned files.",
    },
    {
      title: "Claude and OpenAI APIs",
      description: "We pick the right model for each task, balancing quality, speed, and cost.",
    },
    {
      title: "AI features in your product",
      description: "Smart search, writing help, recommendations, and summaries built into your app.",
    },
    {
      title: "Testing and guardrails",
      description: "Evaluation, monitoring, and safety checks so answers stay accurate and on-brand.",
    },
  ],
  benefits: [
    {
      title: "Better customer experience",
      description: "Instant, accurate answers at any hour, in a tone that matches your brand.",
    },
    {
      title: "Faster teams",
      description: "Staff find information and finish tasks in minutes instead of hours.",
    },
    {
      title: "Predictable costs",
      description: "We tune prompts, caching, and model choice to keep your AI bills under control.",
    },
    {
      title: "Grounded answers",
      description: "Answers are based on your own data, with sources, to reduce made-up responses.",
    },
  ],
  tech: ["claude", "openai", "python", "fastapi", "langchain", "nextjs", "nodejs", "postgresql", "huggingface", "aws"],
  process: {
    discover: "We find where AI adds real value for your users and agree on how we'll measure success.",
    design: "We design the experience, choose models, and plan how your data will be prepared and secured.",
    build: "We build the integration, test it on real questions, and refine prompts and search.",
    launch: "We release to a small group first, monitor quality and cost, then roll out to everyone.",
    support: "We track accuracy and usage, update your knowledge base, and adopt better models as they arrive.",
  },
  faqs: [
    {
      question: "What is RAG?",
      answer:
        "RAG (retrieval-augmented generation) means the AI first searches your own documents or data, then writes an answer based on what it found. This makes answers more accurate and lets the AI show its sources.",
    },
    {
      question: "Claude or OpenAI: which do you use?",
      answer:
        "Both. We choose per task. Claude is excellent for long documents, careful reasoning, and natural writing. We compare options on your real examples before deciding.",
    },
    {
      question: "How much does it cost to run AI features?",
      answer:
        "It depends on usage, but most business use cases cost less than people expect. We estimate running costs upfront and use caching and smaller models where they do the job well.",
    },
    {
      question: "Can the chatbot hand off to a human?",
      answer:
        "Yes. We can route conversations to your team by email, WhatsApp, or live chat when the AI is unsure or the customer asks for a person.",
    },
  ],
  cta: {
    title: "Curious what AI could do for your business?",
    description:
      "Book a free call. We'll suggest practical AI features for your product or team, with honest estimates of cost and effort.",
  },
};

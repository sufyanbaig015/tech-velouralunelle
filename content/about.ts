import { Gem, Handshake, KeyRound, Lightbulb, MessageCircle, ReceiptText, type LucideIcon } from "lucide-react";

import { siteConfig } from "@/lib/site";

export type Value = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const aboutPage = {
  metaTitle: "About Us",
  metaDescription:
    "Meet Veloura Lunelle Technologies: a software development and AI company helping startups and growing businesses build websites, apps, and automation.",
  eyebrow: "About us",
  title: "We build software that helps growing businesses do more",
  description:
    "Veloura Lunelle Technologies is a software development and AI company. We partner with startups and small-to-mid businesses to design, build, and support the tools they need to grow.",
  mission:
    "To make great software and practical AI available to every growing business, with honest advice, clear pricing, and work we're proud to put our name on.",
  story: {
    title: "Why we started",
    paragraphs: [
      "We kept seeing the same problem. Growing businesses needed good software, but they were stuck choosing between cheap freelancers who disappeared and big agencies with big price tags.",
      "So we built the company we wished existed: a focused, senior team that explains things in plain English, gives fixed quotes, and treats every project as if our own business were on the line.",
      "Today we help startups and local businesses launch websites, apps, and AI automation that save time, win customers, and keep working as they grow.",
    ],
  },
  valuesTitle: "What we stand for",
  valuesDescription: "These values guide every decision we make, from the first call to years after launch.",
  cta: {
    title: "Let's build something great together",
    description:
      "Tell us about your business and your goals. We'll listen first, then suggest a clear plan with honest pricing.",
  },
};

export const values: Value[] = [
  {
    title: "Clarity over jargon",
    description: "We explain options in plain English so you can make confident decisions.",
    icon: MessageCircle,
  },
  {
    title: "Honest pricing",
    description: "Fixed quotes, a clear scope, and no surprise invoices along the way.",
    icon: ReceiptText,
  },
  {
    title: "Quality that lasts",
    description: "Clean code, tested features, and products that stay fast and secure.",
    icon: Gem,
  },
  {
    title: "You own your work",
    description: "Your code, your data, and your accounts. No lock-in, ever.",
    icon: KeyRound,
  },
  {
    title: "Partners, not vendors",
    description: "We care about your results long after launch day.",
    icon: Handshake,
  },
  {
    title: "Always learning",
    description: "We keep up with new tools, including AI, so you don't have to.",
    icon: Lightbulb,
  },
];

// Placeholder founder details. Replace the name, bio, and photo (put a square image in /public/images).
export const founder = {
  name: "Founder Name",
  role: "Founder & Lead Engineer",
  photo: "/images/founder-placeholder.svg",
  photoAlt: "Portrait of the founder of Veloura Lunelle Technologies",
  bio: [
    "Our founder is a full-stack engineer who has spent years building websites, web apps, and automation for businesses of every size.",
    "After seeing how much time small teams lose to clunky tools, they started Veloura Lunelle Technologies to bring senior-level engineering and practical AI to growing businesses.",
    "Today they lead every project personally, from the first call to launch, so clients always talk to someone who understands both the code and the business.",
  ],
  quote: "Great software should feel simple for the people who use it. That's the standard we hold ourselves to.",
  linkedin: siteConfig.socials.linkedin,
};

import { CalendarCheck, Gauge, HeartHandshake, Layers, ReceiptText, Sparkles, type LucideIcon } from "lucide-react";

export const hero = {
  eyebrow: "Software & AI studio for growing businesses",
  titleStart: "Websites, apps, and AI that",
  titleHighlight: "help your business grow",
  description:
    "We design and build fast websites, reliable web and mobile apps, and AI automation that saves your team hours every week. Clear process. Fixed quotes. Real people who reply.",
  highlights: ["Free 30-minute consultation", "Fixed-price quotes", "Reply within 24 hours"],
};

export type Reason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const reasons: Reason[] = [
  {
    title: "Clear, fixed quotes",
    description: "You get a detailed scope and price before we start. No surprise invoices halfway through.",
    icon: ReceiptText,
  },
  {
    title: "One team, full stack",
    description: "Design, development, AI, and cloud under one roof. One point of contact for everything.",
    icon: Layers,
  },
  {
    title: "AI-first thinking",
    description: "We look for places where automation can save you time and money, not just where it looks cool.",
    icon: Sparkles,
  },
  {
    title: "Weekly progress updates",
    description: "You see working software every week, so you always know where your project stands.",
    icon: CalendarCheck,
  },
  {
    title: "Built for speed and SEO",
    description: "Fast load times, clean code, and search-friendly structure come standard on every build.",
    icon: Gauge,
  },
  {
    title: "Support after launch",
    description: "We don't disappear at go-live. We stay on to fix, update, and improve what we built.",
    icon: HeartHandshake,
  },
];

export const finalCta = {
  title: "Don't have a website yet? Get a free consultation.",
  description:
    "Tell us about your business in a 30-minute call. We'll suggest the right next step and give you a clear, honest quote. No pressure, no jargon.",
};

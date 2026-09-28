import { services } from "@/content/services";

export const contactPage = {
  metaTitle: "Contact Us",
  metaDescription:
    "Contact Veloura Lunelle Technologies about your website, app, or AI project. Send a message, book a free call, or chat with us on WhatsApp.",
  eyebrow: "Contact",
  title: "Let's talk about your project",
  description:
    "Tell us what you need and we'll reply within one business day. Prefer to talk? Book a free call or message us on WhatsApp.",
  formTitle: "Send us a message",
  formDescription: "Fields marked with * are required. The more you share, the better our first reply will be.",
  success: {
    title: "Thanks, your message is on its way!",
    description: "We'll read it carefully and reply within one business day. Keep an eye on your inbox (and spam folder, just in case).",
  },
  callTitle: "Book a free call",
  callDescription: "Pick a time that suits you for a free 30-minute consultation. No pressure, no jargon.",
  nextStepsTitle: "What happens next",
  nextSteps: [
    "We reply within one business day with a few questions or next steps.",
    "We have a short call to understand your goals, budget, and timeline.",
    "You get a clear proposal with a fixed quote. No obligation.",
  ],
};

export const serviceOptions = [...services.map((service) => service.title), "Not sure yet"];

export const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

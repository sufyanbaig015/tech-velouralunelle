import { Building2, HeartPulse, Rocket, ShoppingBag, UtensilsCrossed, type LucideIcon } from "lucide-react";

export type Industry = {
  /** Also used as the section anchor, e.g. /solutions#healthcare */
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  challenges: string[];
  solutions: { title: string; description: string }[];
  /** Slugs from content/services that fit this industry best. */
  services: string[];
};

export const solutionsPage = {
  metaTitle: "Industries & Solutions",
  metaDescription:
    "Websites, apps, and AI automation for healthcare, real estate, e-commerce, restaurants and local businesses, and SaaS startups.",
  eyebrow: "Industries",
  title: "Software solutions for the industries we know best",
  description:
    "Every industry has its own headaches. We've learned the common ones, so we can suggest proven solutions from day one instead of starting from a blank page.",
  jumpTitle: "Jump to an industry",
  cta: {
    title: "Don't see your industry here?",
    description:
      "We work with businesses of all kinds. Tell us how your business runs, and we'll show you where software and AI can help most.",
  },
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    tagline: "Software that frees up more time for patient care",
    description:
      "Clinics and health practices lose hours to phone bookings, paperwork, and follow-ups. We build secure, easy-to-use tools that cut admin work and give patients a smoother experience.",
    challenges: [
      "Phone lines busy with booking and rescheduling calls",
      "Paper forms and manual data entry",
      "Missed appointments and no-shows",
      "Strict expectations for handling patient data",
    ],
    solutions: [
      {
        title: "Online booking and reminders",
        description: "Patients book any time, and automatic SMS or email reminders reduce no-shows.",
      },
      {
        title: "Patient portals",
        description: "Secure access to forms, invoices, and messages in one place, built with privacy in mind.",
      },
      {
        title: "Digital intake forms",
        description: "Patients fill in forms before they arrive, and the data flows straight into your system.",
      },
      {
        title: "AI front-desk assistant",
        description: "Answers common questions and handles routine requests, with a clear hand-off to your staff.",
      },
    ],
    services: ["web-app-development", "ai-agents-automation", "mobile-app-development"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: Building2,
    tagline: "Respond to leads faster and win more deals",
    description:
      "In real estate, the fastest reply often wins the client. We help agencies and property managers capture leads, respond instantly, and manage properties without drowning in admin.",
    challenges: [
      "Leads arriving at all hours from many sources",
      "Slow follow-up that loses buyers to competitors",
      "Listings spread across portals and spreadsheets",
      "Manual rent, maintenance, and owner reporting",
    ],
    solutions: [
      {
        title: "Property websites with live listings",
        description: "Fast, searchable listing sites that sync with your property data and rank well on Google.",
      },
      {
        title: "AI lead assistant",
        description: "Replies to enquiries in seconds, qualifies buyers and renters, and books viewings.",
      },
      {
        title: "CRM and pipeline tools",
        description: "Track every lead, viewing, and deal in a CRM that fits how your agents actually work.",
      },
      {
        title: "Property management portals",
        description: "Rent payments, maintenance requests, and owner statements, all in one place.",
      },
    ],
    services: ["website-development", "ai-agents-automation", "web-app-development"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    icon: ShoppingBag,
    tagline: "Online stores that sell more and run smoother",
    description:
      "Selling online means juggling products, orders, customers, and marketing. We build fast stores and automate the busywork behind them, so you can focus on growth.",
    challenges: [
      "Slow product pages that lose buyers",
      "Manual order, stock, and shipping updates",
      "Customer questions piling up in the inbox",
      "Tools that don't talk to each other",
    ],
    solutions: [
      {
        title: "High-converting stores",
        description: "Shopify, WooCommerce, or custom Next.js stores built for speed and an easy checkout.",
      },
      {
        title: "Inventory and order automation",
        description: "Sync stock, orders, and shipping across your store, warehouse, and marketplaces.",
      },
      {
        title: "AI shopping and support assistant",
        description: "Answers product and order questions instantly, using your own catalog and policies.",
      },
      {
        title: "Sales dashboards",
        description: "See sales, margins, and top products at a glance, always up to date.",
      },
    ],
    services: ["website-development", "ai-integration", "custom-software-development"],
  },
  {
    slug: "restaurants-local-business",
    name: "Restaurants & Local Business",
    icon: UtensilsCrossed,
    tagline: "Get found online and keep customers coming back",
    description:
      "Local businesses live on word of mouth and Google searches. We help restaurants, salons, studios, and shops look great online, take bookings and orders, and turn first-time visitors into regulars.",
    challenges: [
      "An outdated website, or no website at all",
      "Not showing up in local Google searches",
      "High fees from third-party ordering apps",
      "No easy way to reach past customers",
    ],
    solutions: [
      {
        title: "Local SEO websites",
        description: "Mobile-friendly sites with menus, services, maps, and reviews that help you rank locally.",
      },
      {
        title: "Direct ordering and booking",
        description: "Take orders and reservations yourself, without giving a big cut to marketplaces.",
      },
      {
        title: "Loyalty and ordering apps",
        description: "Branded apps with rewards and push offers that bring customers back again.",
      },
      {
        title: "WhatsApp and review automation",
        description: "Automatic booking confirmations, reminders, and review requests after each visit.",
      },
    ],
    services: ["website-development", "mobile-app-development", "website-security-maintenance"],
  },
  {
    slug: "saas-startups",
    name: "SaaS Startups",
    icon: Rocket,
    tagline: "From idea to launched product, without the tech headaches",
    description:
      "Founders need to move fast without building on shaky foundations. We act as your product and engineering team, helping you launch a solid MVP, win early customers, and scale with confidence.",
    challenges: [
      "Limited budget and a long feature wish list",
      "No in-house technical co-founder or team",
      "Pressure to launch before competitors do",
      "Early code that won't scale after traction",
    ],
    solutions: [
      {
        title: "MVP development",
        description: "A focused first version with the features that matter most, launched in weeks, not months.",
      },
      {
        title: "Subscriptions and user accounts",
        description: "Sign-up, teams, roles, and Stripe billing set up properly from day one.",
      },
      {
        title: "AI-powered features",
        description: "Claude or OpenAI features that make your product stand out from the crowd.",
      },
      {
        title: "Cloud setup that scales",
        description: "CI/CD, monitoring, and cloud infrastructure that is ready for growth.",
      },
    ],
    services: ["web-app-development", "ai-integration", "devops-cloud"],
  },
];

// Placeholder projects. Replace with real case studies before launch.

export const projectCategories = ["Website", "Web App", "Mobile App", "AI & Automation"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  summary: string;
  results: string[];
  tags: string[];
  featured?: boolean;
};

export const workPage = {
  metaTitle: "Our Work",
  metaDescription:
    "Selected websites, web apps, mobile apps, and AI automation projects built by Veloura Lunelle Technologies for growing businesses.",
  eyebrow: "Our work",
  title: "Projects that make a real difference",
  description:
    "A selection of websites, apps, and AI automation we've built for startups and growing businesses. Filter by type to find work like yours.",
  cta: {
    title: "Have a project in mind?",
    description:
      "Tell us what you want to build. We'll share similar work, suggest the best approach, and send a clear quote.",
  },
};

export const projects: Project[] = [
  {
    slug: "clinic-booking-platform",
    title: "Online booking platform for a dental clinic group",
    client: "Healthcare · 4 locations",
    category: "Web App",
    summary:
      "Replaced phone-only booking with an online system that syncs with each clinic's calendar and sends automatic reminders.",
    results: ["Fewer no-shows", "Front desk calls cut in half"],
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    featured: true,
  },
  {
    slug: "real-estate-lead-agent",
    title: "AI lead assistant for a real estate agency",
    client: "Real Estate · Brokerage",
    category: "AI & Automation",
    summary:
      "A Claude-powered assistant answers property questions 24/7, qualifies buyers, and books viewings straight into the agents' calendars.",
    results: ["Replies in seconds, day or night", "Qualified leads sent to CRM"],
    tags: ["Claude API", "n8n", "HubSpot"],
    featured: true,
  },
  {
    slug: "restaurant-ordering-app",
    title: "Ordering and loyalty app for a local restaurant chain",
    client: "Restaurants · 6 branches",
    category: "Mobile App",
    summary:
      "A cross-platform app for pickup orders, loyalty points, and push offers, connected to the existing point-of-sale system.",
    results: ["Live on iOS and Android", "Repeat orders growing month over month"],
    tags: ["Flutter", "Firebase", "Stripe"],
    featured: true,
  },
  {
    slug: "law-firm-website",
    title: "Lead-focused website for a boutique law firm",
    client: "Legal · Professional services",
    category: "Website",
    summary:
      "A fast Next.js site with clear practice-area pages, strong calls to action, and a simple consultation booking form.",
    results: ["Top performance scores on mobile", "More consultation requests from search"],
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "saas-analytics-dashboard",
    title: "Customer analytics dashboard for a B2B SaaS startup",
    client: "SaaS · Startup",
    category: "Web App",
    summary:
      "A customer-facing dashboard that turns raw usage data into clear charts and weekly email reports.",
    results: ["MVP launched in 10 weeks", "Now a key selling point in sales demos"],
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "invoice-processing-automation",
    title: "Invoice processing automation for an accounting firm",
    client: "Finance · Accounting",
    category: "AI & Automation",
    summary:
      "Claude reads incoming invoices, extracts the key fields, and sends them to the accounting system for one-click approval.",
    results: ["Most manual data entry removed", "Every invoice logged and traceable"],
    tags: ["Claude API", "n8n", "Python"],
  },
  {
    slug: "boutique-online-store",
    title: "WooCommerce store for a fashion boutique",
    client: "E-commerce · Retail",
    category: "Website",
    summary:
      "Moved a small boutique from social media messages to a full online store with payments, shipping rates, and stock sync.",
    results: ["Orders now come in around the clock", "Simple checkout on mobile"],
    tags: ["WordPress", "WooCommerce", "Stripe"],
  },
  {
    slug: "fitness-coaching-app",
    title: "Coaching app for a personal training studio",
    client: "Fitness · Local business",
    category: "Mobile App",
    summary:
      "Clients book sessions, follow workout plans, and message their coach, all in one simple app.",
    results: ["Bookings moved off group chats", "Available on iOS and Android"],
    tags: ["Flutter", "Firebase"],
  },
  {
    slug: "property-management-portal",
    title: "Tenant and owner portal for a property manager",
    client: "Real Estate · Property management",
    category: "Web App",
    summary:
      "One portal for rent payments, maintenance requests, and owner statements, replacing three separate tools.",
    results: ["Maintenance tracked in one place", "Owner reports generated automatically"],
    tags: ["Next.js", "Supabase", "Stripe"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

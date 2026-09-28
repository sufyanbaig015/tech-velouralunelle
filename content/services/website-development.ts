import { Globe } from "lucide-react";

import type { Service } from "./types";

export const websiteDevelopment: Service = {
  slug: "website-development",
  title: "Website Development",
  summary: "Fast, SEO-ready business websites and online stores, built on WordPress or Next.js.",
  icon: Globe,
  metaDescription:
    "Fast, SEO-ready business websites and online stores built on WordPress or Next.js. Mobile-first design, clear pricing, and support after launch.",
  headline: "Websites that load fast, rank well, and bring in customers",
  intro:
    "Your website is often the first place people meet your business. We design and build sites that look sharp on every screen, load in a blink, and make it easy for visitors to call, book, or buy.",
  included: [
    {
      title: "Custom design",
      description: "A unique design based on your brand. No generic templates that look like everyone else.",
    },
    {
      title: "WordPress or Next.js",
      description: "WordPress when you want to edit everything yourself. Next.js when speed and flexibility matter most.",
    },
    {
      title: "E-commerce stores",
      description: "WooCommerce or Shopify stores with payments, shipping, stock tracking, and order emails.",
    },
    {
      title: "Mobile-first build",
      description: "Every page is designed for phones first, then scaled up for tablets and desktops.",
    },
    {
      title: "SEO foundations",
      description: "Clean structure, fast pages, meta tags, sitemaps, and Google Search Console setup.",
    },
    {
      title: "Easy content editing",
      description: "Update text, images, and blog posts yourself without calling a developer.",
    },
  ],
  benefits: [
    {
      title: "More enquiries",
      description: "Clear calls to action and simple contact forms turn visitors into leads.",
    },
    {
      title: "Better Google rankings",
      description: "Fast, well-structured sites are easier for Google to understand and rank.",
    },
    {
      title: "A site you control",
      description: "You own the site, the domain, and the content. No lock-in, ever.",
    },
    {
      title: "Room to grow",
      description: "Start with the essentials and add pages, features, or a store later.",
    },
  ],
  tech: [
    "wordpress",
    "nextjs",
    "react",
    "tailwindcss",
    "woocommerce",
    "shopify",
    "elementor",
    "vercel",
    "googleAnalytics",
    "searchConsole",
  ],
  process: {
    discover: "We learn about your business, customers, and goals, and agree on the pages you need.",
    design: "We design the key pages so you can see and approve the look before we build.",
    build: "We build the site, add your content, and connect forms, analytics, and payments.",
    launch: "We test on real devices, set up hosting and your domain, and go live.",
    support: "We handle updates, backups, and small changes so your site stays fresh.",
  },
  faqs: [
    {
      question: "Should I choose WordPress or Next.js?",
      answer:
        "Choose WordPress if you want to edit lots of content yourself and use common plugins. Choose Next.js if speed, custom features, or top performance scores matter most. We'll recommend the best fit on our call.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes. We can refresh the design, move your content over, and protect your Google rankings with proper redirects.",
    },
    {
      question: "Will I be able to update the site myself?",
      answer:
        "Yes. We set up an easy editor and show you how to change text, images, and blog posts. You also get a short video guide to refer back to.",
    },
    {
      question: "Do you handle hosting and domains?",
      answer:
        "We can set up hosting, your domain, SSL, and business email for you, or work with the providers you already use.",
    },
  ],
  cta: {
    title: "Ready for a website that works as hard as you do?",
    description:
      "Book a free call. We'll look at your current site (or your idea) and suggest the simplest way to get results.",
  },
};

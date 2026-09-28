import { Smartphone } from "lucide-react";

import type { Service } from "./types";

export const mobileAppDevelopment: Service = {
  slug: "mobile-app-development",
  title: "Mobile App Development",
  summary: "Android and iOS apps, built native or cross-platform so you reach every customer.",
  icon: Smartphone,
  metaDescription:
    "Android and iOS app development, native or cross-platform with Flutter and React Native. From first idea to App Store launch and beyond.",
  headline: "Mobile apps your customers will keep on their home screen",
  intro:
    "We design and build smooth, reliable apps for Android and iOS. Most projects use one cross-platform codebase to save you time and money, with native code where it makes a real difference.",
  included: [
    {
      title: "Cross-platform apps",
      description: "One Flutter or React Native codebase that runs on both Android and iOS.",
    },
    {
      title: "Native development",
      description: "Swift and Kotlin when you need deep device features or peak performance.",
    },
    {
      title: "App design",
      description: "Simple, thumb-friendly screens that follow Apple and Google design guidelines.",
    },
    {
      title: "Backend and APIs",
      description: "Secure servers, databases, and admin panels to power your app.",
    },
    {
      title: "Push notifications",
      description: "Timely, targeted messages that bring users back to your app.",
    },
    {
      title: "App store launch",
      description: "We handle store listings, screenshots, review feedback, and release management.",
    },
  ],
  benefits: [
    {
      title: "Reach every customer",
      description: "Launch on both platforms at once without paying for two separate apps.",
    },
    {
      title: "Stronger loyalty",
      description: "An app keeps your brand one tap away and makes repeat purchases easy.",
    },
    {
      title: "Works offline",
      description: "Key features keep working even with a weak connection or none at all.",
    },
    {
      title: "Smooth approvals",
      description: "We know the store rules, so your app gets approved without long delays.",
    },
  ],
  tech: ["flutter", "reactNative", "expo", "swift", "kotlin", "firebase", "supabase", "nodejs", "android", "ios"],
  process: {
    discover: "We define your users, core features, and which platforms to launch on first.",
    design: "We design every screen and build a clickable prototype you can try on your own phone.",
    build: "We develop the app and backend in sprints, with test builds you can install each week.",
    launch: "We prepare store listings, submit to the App Store and Google Play, and handle review feedback.",
    support: "We release updates for new OS versions, fix bugs, and add features as you grow.",
  },
  faqs: [
    {
      question: "Flutter or native: which is better?",
      answer:
        "For most business apps, Flutter or React Native is faster and more affordable because one codebase runs on both platforms. We recommend native Swift or Kotlin when you need heavy device features, advanced graphics, or maximum performance.",
    },
    {
      question: "How long does it take to build an app?",
      answer:
        "A focused first version usually takes 8 to 14 weeks, including design, development, testing, and store approval.",
    },
    {
      question: "Do you publish the app to the stores for me?",
      answer:
        "Yes. We help set up your developer accounts, prepare listings and screenshots, and manage the submission and review process.",
    },
    {
      question: "Can my app connect to my website or existing system?",
      answer:
        "Yes. We can connect your app to your website, CRM, point-of-sale system, or any tool that offers an API.",
    },
  ],
  cta: {
    title: "Got an app idea? Let's make it real.",
    description:
      "Book a free call to talk through your idea. We'll suggest the right platform and a realistic plan for your first release.",
  },
};

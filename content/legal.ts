import { siteConfig } from "@/lib/site";

// General templates. Have both documents reviewed by a legal professional for your jurisdiction before launch.

export type LegalDocument = {
  title: string;
  metaDescription: string;
  /** ISO date (YYYY-MM-DD). Also used for the sitemap. */
  lastUpdated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  metaDescription: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  lastUpdated: "2026-09-28",
  intro: `This policy explains what information ${siteConfig.name} ("we", "us") collects when you use this website, how we use it, and the choices you have.`,
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "When you contact us through the form on this website, we collect the details you choose to share: your name, email address, phone number (optional), company name, the service you're interested in, your budget range, and your message.",
        "When you book a call on this website, we collect your name, email address, the time you choose and your time zone, plus your company, phone number and notes if you add them. We use these to schedule the call, send you the invite and reminders, and let you reschedule or cancel.",
        "If you email us or message us on WhatsApp, we receive the information you provide through those channels.",
        "Our hosting provider may also record basic technical data, such as your IP address and browser type, to keep the website secure and working properly.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "We use your information to reply to your enquiry, prepare proposals and quotes, deliver the services you ask for, and keep records of our conversations with you.",
        "We do not sell your personal information, and we do not use it for advertising.",
      ],
    },
    {
      heading: "Services we use",
      paragraphs: [
        "We rely on trusted providers to run this website and our business. These include Resend (to send contact form messages and booking emails), Google Calendar and Google Meet (to schedule and hold calls), Neon (to store call bookings), WhatsApp (for messaging), and Vercel (to host this website). Each provider handles data under its own privacy policy.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This website does not use advertising or tracking cookies. If we add analytics in the future, we will update this policy first.",
      ],
    },
    {
      heading: "How long we keep your information",
      paragraphs: [
        "We keep enquiry details only as long as we need them to respond to you, work with you, and meet our legal and accounting obligations. After that, we delete them.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `You can ask us to access, correct, or delete the personal information we hold about you at any time. Email ${siteConfig.email} and we'll respond within 30 days.`,
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. The date at the top of this page shows when it was last changed.",
      ],
    },
    {
      heading: "Contact us",
      paragraphs: [`If you have any questions about this policy or your data, email us at ${siteConfig.email}.`],
    },
  ],
};

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  metaDescription: `The terms that apply when you use the ${siteConfig.name} website.`,
  lastUpdated: "2026-09-28",
  intro: `These terms apply to your use of this website, operated by ${siteConfig.name} ("we", "us"). By using the website, you agree to them.`,
  sections: [
    {
      heading: "Using this website",
      paragraphs: [
        "You may use this website to learn about our services and to contact us. Please don't misuse it, for example by trying to break its security, sending spam through our forms, or copying large parts of it without permission.",
      ],
    },
    {
      heading: "Information on this website",
      paragraphs: [
        "We work hard to keep the information on this website accurate and up to date, but it is provided for general information only. Nothing on this website is a binding offer. Prices, timelines, and scope are confirmed only in a written proposal.",
      ],
    },
    {
      heading: "Our services",
      paragraphs: [
        "All projects are governed by a separate written proposal or agreement between you and us. That document sets out the scope, price, payment terms, timelines, and ownership of the work, and it takes priority over these terms.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The content, design, and branding of this website belong to us unless stated otherwise. Ownership of work we create for clients is set out in each client agreement.",
      ],
    },
    {
      heading: "Links to other websites",
      paragraphs: [
        "This website may link to other websites, such as booking or messaging tools. We are not responsible for the content or practices of those websites.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the extent allowed by law, we are not liable for any loss or damage arising from your use of this website or reliance on its content.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time. The date at the top of this page shows when they were last changed.",
      ],
    },
    {
      heading: "Contact us",
      paragraphs: [`If you have any questions about these terms, email us at ${siteConfig.email}.`],
    },
  ],
};

export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "How much does a website or app cost?",
    answer:
      "It depends on what you need. A simple business website costs far less than a custom web app. After a free call, we send a fixed quote with a clear scope, so you know the full price before any work starts.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most business websites take 2 to 4 weeks. Web and mobile apps usually take 6 to 12 weeks for a first version. We share a timeline with milestones in your quote.",
  },
  {
    question: "Do you work with small businesses and startups?",
    answer:
      "Yes. Most of our clients are startups and small-to-mid businesses. We keep the process simple and help you launch a solid first version, then improve it over time.",
  },
  {
    question: "Can you add AI to my existing website or software?",
    answer:
      "Usually, yes. We can connect Claude or OpenAI to your current tools to answer customer questions, process documents, or automate routine tasks, without rebuilding everything.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. We offer monthly support plans that cover updates, backups, security monitoring, and small improvements. You can also contact us for one-off fixes.",
  },
  {
    question: "Who owns the code and design?",
    answer:
      "You do. Once the project is paid for, you own the code, design files, and content. We hand over all accounts and access so you are never locked in.",
  },
];

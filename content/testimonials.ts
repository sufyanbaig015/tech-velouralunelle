// Placeholder testimonials. Replace with real client quotes (with permission) before launch.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They turned a messy idea into a clean, working product in weeks. The weekly demos meant we were never guessing what was happening.",
    name: "Sarah Mitchell",
    role: "Founder",
    company: "Brightpath Health",
  },
  {
    quote:
      "Our AI assistant now handles most first-contact questions. My agents spend their time on real buyers instead of answering the same emails.",
    name: "Daniel Ortiz",
    role: "Managing Director",
    company: "Harbor Realty",
  },
  {
    quote:
      "Clear pricing, fast replies, and a website that finally loads quickly. We started getting enquiries from Google within the first month.",
    name: "Priya Nair",
    role: "Owner",
    company: "Saffron Table",
  },
];

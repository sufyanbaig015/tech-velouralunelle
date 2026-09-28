import { z } from "zod";

// Shared by the contact form (instant feedback) and the server action (the real check).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Please enter a shorter email address.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30, "Please enter a shorter phone number.")
    .regex(/^[+()\d\s.-]*$/, "Please use only numbers, spaces, and + ( ) - ."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company or business name.")
    .max(120, "Please keep the company name under 120 characters."),
  service: z.string().min(1, "Please choose a service."),
  budget: z.string().min(1, "Please choose a budget range."),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactFormValues;

export type ContactFieldErrors = Partial<Record<ContactField, string[]>>;

export type ContactResult = { ok: true } | { ok: false; message: string; fieldErrors?: ContactFieldErrors };

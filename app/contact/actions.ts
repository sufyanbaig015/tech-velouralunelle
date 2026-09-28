"use server";

import { z } from "zod";

import { budgetOptions, serviceOptions } from "@/content/contact";
import { buildContactEmail } from "@/lib/email/contact-email";
import { sendEmail } from "@/lib/email/send-email";
import { siteConfig } from "@/lib/site";
import { contactSchema, type ContactFieldErrors, type ContactResult } from "@/lib/validations/contact";

const sendFailedMessage = `Sorry, we couldn't send your message. Please try again, or email us at ${siteConfig.email}.`;

export async function sendContactMessage(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot filled in: almost certainly a bot. Pretend it worked so it doesn't retry.
  if (data.website) return { ok: true };

  const fieldErrors: ContactFieldErrors = {};
  if (!serviceOptions.includes(data.service)) fieldErrors.service = ["Please choose a service from the list."];
  if (!budgetOptions.includes(data.budget)) fieldErrors.budget = ["Please choose a budget range from the list."];
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Please fix the highlighted fields and try again.", fieldErrors };
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.error("Contact form: CONTACT_EMAIL is not set.");
    return { ok: false, message: sendFailedMessage };
  }

  const sent = await sendEmail({ to, replyTo: data.email, ...buildContactEmail(data) }, "Contact form");
  return sent ? { ok: true } : { ok: false, message: sendFailedMessage };
}

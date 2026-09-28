import "server-only";

import { Resend } from "resend";

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: string; contentType?: string }[];
};

/** Sends through Resend. Returns false (and logs why) instead of throwing. */
export async function sendEmail(message: EmailMessage, context: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`${context}: RESEND_API_KEY is not set.`);
    return false;
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Veloura Lunelle Website <onboarding@resend.dev>",
      ...message,
    });
    if (error) {
      console.error(`${context}: Resend rejected the email.`, error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`${context}: failed to reach Resend.`, error);
    return false;
  }
}

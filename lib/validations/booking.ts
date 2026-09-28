import { z } from "zod";

import { isValidTimeZone } from "@/lib/booking/time";
import { contactSchema } from "@/lib/validations/contact";

const slotSchema = z.object({
  start: z.iso.datetime({ offset: true, message: "Please pick a time." }),
  timeZone: z.string().max(64).refine(isValidTimeZone, "Unknown time zone."),
});

// The guest's details. Shared by the booking form (instant feedback) and the server (the real check).
export const bookingDetailsSchema = z.object({
  name: contactSchema.shape.name,
  email: contactSchema.shape.email,
  company: z.string().trim().max(120, "Please keep the company name under 120 characters."),
  phone: contactSchema.shape.phone,
  notes: z.string().trim().max(2000, "Please keep this under 2,000 characters."),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().optional(),
});

export const bookingSchema = bookingDetailsSchema.extend(slotSchema.shape);

export const rescheduleSchema = slotSchema;

export type BookingDetailsValues = z.infer<typeof bookingDetailsSchema>;

export type BookingField = keyof BookingDetailsValues;

export type BookingFieldErrors = Partial<Record<BookingField, string[]>>;

/** What the browser is told about a booking. */
export type PublicBooking = {
  id: string;
  status: "confirmed" | "cancelled";
  start: string;
  end: string;
  /** The guest's time zone, used for display. */
  timeZone: string;
  name: string;
  email: string;
  meetUrl: string | null;
  /** True when Google Calendar sent the guest an invite (so we don't offer a second one). */
  calendarInviteSent: boolean;
};

export type BookingResult =
  | { ok: true; booking: PublicBooking }
  | { ok: false; message: string; code?: "slot_taken"; fieldErrors?: BookingFieldErrors };

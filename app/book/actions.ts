"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";

import { cancelBookingByToken, createBooking, rescheduleBooking } from "@/lib/booking/bookings";
import { meetingEnd } from "@/lib/booking/availability";
import { isDatabaseConfigured } from "@/lib/booking/db";
import { siteConfig } from "@/lib/site";
import { bookingSchema, rescheduleSchema, type BookingResult } from "@/lib/validations/booking";

const failed: BookingResult = {
  ok: false,
  message: `Sorry, something went wrong on our side. Please try again, or email us at ${siteConfig.email}.`,
};
const notSetUp: BookingResult = {
  ok: false,
  message: `Online booking isn't available right now. Please email us at ${siteConfig.email} to arrange a call.`,
};

const tokenSchema = z.string().min(20).max(100);
const reasonSchema = z.string().trim().max(500, "Please keep the reason under 500 characters.");

export async function bookCall(input: unknown): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const { start, timeZone, website, ...details } = parsed.data;
  const startDate = new Date(start);

  // Honeypot filled in: almost certainly a bot. Show success without booking anything.
  if (website) {
    return {
      ok: true,
      booking: {
        id: randomUUID(),
        status: "confirmed",
        start: startDate.toISOString(),
        end: meetingEnd(startDate).toISOString(),
        timeZone,
        name: details.name,
        email: details.email,
        meetUrl: null,
        calendarInviteSent: false,
      },
    };
  }

  if (!isDatabaseConfigured()) return notSetUp;
  try {
    return await createBooking(details, startDate, timeZone);
  } catch (error) {
    console.error("Booking: unexpected error while booking.", error);
    return failed;
  }
}

export async function rescheduleCall(token: unknown, input: unknown): Promise<BookingResult> {
  const parsedToken = tokenSchema.safeParse(token);
  const parsed = rescheduleSchema.safeParse(input);
  if (!parsedToken.success || !parsed.success) return { ok: false, message: "Please pick a new time." };
  if (!isDatabaseConfigured()) return notSetUp;

  try {
    return await rescheduleBooking(parsedToken.data, new Date(parsed.data.start), parsed.data.timeZone);
  } catch (error) {
    console.error("Booking: unexpected error while rescheduling.", error);
    return failed;
  }
}

export async function cancelCall(token: unknown, reason: unknown): Promise<BookingResult> {
  const parsedToken = tokenSchema.safeParse(token);
  const parsedReason = reasonSchema.safeParse(reason ?? "");
  if (!parsedToken.success) return { ok: false, message: "We couldn't find this booking." };
  if (!parsedReason.success) return { ok: false, message: parsedReason.error.issues[0].message };
  if (!isDatabaseConfigured()) return notSetUp;

  try {
    return await cancelBookingByToken(parsedToken.data, parsedReason.data);
  } catch (error) {
    console.error("Booking: unexpected error while cancelling.", error);
    return failed;
  }
}

import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { after } from "next/server";

import { bookingConfig } from "@/content/booking";
import { isSlotAvailable, meetingEnd } from "@/lib/booking/availability";
import { db, SLOT_TAKEN_ERROR, type BookingRow } from "@/lib/booking/db";
import { eventSummary, manageUrl, sendBookingEmails } from "@/lib/booking/emails";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  isGoogleCalendarConfigured,
  moveCalendarEvent,
} from "@/lib/booking/google-calendar";
import { siteConfig } from "@/lib/site";
import type { BookingDetailsValues, BookingResult, PublicBooking } from "@/lib/validations/booking";

type Result = BookingResult;

const failedMessage = `Sorry, something went wrong on our side. Please try again, or email us at ${siteConfig.email}.`;
const slotTaken: Result = {
  ok: false,
  code: "slot_taken",
  message: "Sorry, that time was just taken. Please pick another one.",
};

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

const isSlotTakenError = (error: unknown) =>
  typeof error === "object" && error !== null && "code" in error && error.code === SLOT_TAKEN_ERROR;

/** The call has started (or finished), so it can no longer be changed. */
export function hasStarted(booking: BookingRow) {
  return booking.start_at <= new Date();
}

export function toPublicBooking(row: BookingRow): PublicBooking {
  return {
    id: row.id,
    status: row.status,
    start: row.start_at.toISOString(),
    end: row.end_at.toISOString(),
    timeZone: row.guest_time_zone,
    name: row.name,
    email: row.email,
    meetUrl: row.meet_url,
    calendarInviteSent: Boolean(row.google_event_id),
  };
}

function calendarDescription(details: BookingDetailsValues, token: string) {
  return [
    `${bookingConfig.meetingTitle} with ${siteConfig.name}.`,
    details.company && `Company: ${details.company}`,
    details.phone && `Phone: ${details.phone}`,
    details.notes && `Notes: ${details.notes}`,
    `Need to reschedule or cancel? ${manageUrl(token)}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function createBooking(details: BookingDetailsValues, start: Date, timeZone: string): Promise<Result> {
  if (!(await isSlotAvailable(start))) return slotTaken;

  const sql = await db();
  const [{ upcoming }] = await sql<{ upcoming: number }[]>`
    select count(*)::int as upcoming from bookings
    where lower(email) = lower(${details.email}) and status = 'confirmed' and start_at > now()
  `;
  if (upcoming >= bookingConfig.maxUpcomingPerEmail) {
    return {
      ok: false,
      message: `You already have ${upcoming} upcoming calls with us. Please use the link in your confirmation email to reschedule one of them.`,
    };
  }

  const token = randomBytes(24).toString("base64url");
  let booking: BookingRow;
  try {
    [booking] = await sql<BookingRow[]>`
      insert into bookings (start_at, end_at, name, email, company, phone, notes, guest_time_zone, manage_token_hash)
      values (${start}, ${meetingEnd(start)}, ${details.name}, ${details.email}, ${details.company || null},
              ${details.phone || null}, ${details.notes || null}, ${timeZone}, ${hashToken(token)})
      returning *
    `;
  } catch (error) {
    if (isSlotTakenError(error)) return slotTaken;
    console.error("Booking: could not save the booking.", error);
    return { ok: false, message: failedMessage };
  }

  if (isGoogleCalendarConfigured()) {
    try {
      const { eventId, meetUrl } = await createCalendarEvent({
        requestId: booking.id,
        summary: eventSummary(details.name),
        description: calendarDescription(details, token),
        start: booking.start_at,
        end: booking.end_at,
        guest: { name: details.name, email: details.email },
      });
      [booking] = await sql<BookingRow[]>`
        update bookings set google_event_id = ${eventId}, meet_url = ${meetUrl}, updated_at = now()
        where id = ${booking.id} returning *
      `;
    } catch (error) {
      // No calendar event means no invite or Meet link, so undo the booking rather than half-book it.
      console.error("Booking: Google Calendar event failed, removing the booking.", error);
      await sql`delete from bookings where id = ${booking.id}`;
      return { ok: false, message: failedMessage };
    }
  }

  const confirmed = booking;
  after(() => sendBookingEmails(confirmed, { kind: "confirmed", manageToken: token }));
  return { ok: true, booking: toPublicBooking(confirmed) };
}

export async function getBookingByToken(token: string) {
  const sql = await db();
  const [booking] = await sql<BookingRow[]>`select * from bookings where manage_token_hash = ${hashToken(token)}`;
  return booking;
}

const notFound: Result = { ok: false, message: "We couldn't find this booking. Please check the link in your email." };
const alreadyPast: Result = { ok: false, message: "This call has already started, so it can't be changed." };

export async function rescheduleBooking(token: string, start: Date, timeZone: string): Promise<Result> {
  const booking = await getBookingByToken(token);
  if (!booking || booking.status !== "confirmed") return notFound;
  if (hasStarted(booking)) return alreadyPast;
  if (booking.start_at.getTime() === start.getTime()) return { ok: true, booking: toPublicBooking(booking) };

  const current = { id: booking.id, start: booking.start_at, end: booking.end_at };
  if (!(await isSlotAvailable(start, current))) return slotTaken;

  const sql = await db();
  let updated: BookingRow;
  try {
    [updated] = await sql<BookingRow[]>`
      update bookings set start_at = ${start}, end_at = ${meetingEnd(start)}, guest_time_zone = ${timeZone}, updated_at = now()
      where id = ${booking.id} and status = 'confirmed' returning *
    `;
  } catch (error) {
    if (isSlotTakenError(error)) return slotTaken;
    console.error("Booking: could not reschedule.", error);
    return { ok: false, message: failedMessage };
  }
  if (!updated) return notFound;

  if (updated.google_event_id) {
    try {
      await moveCalendarEvent(updated.google_event_id, updated.start_at, updated.end_at);
    } catch (error) {
      console.error("Booking: Google Calendar update failed, restoring the old time.", error);
      await sql`
        update bookings set start_at = ${booking.start_at}, end_at = ${booking.end_at},
          guest_time_zone = ${booking.guest_time_zone}, updated_at = now()
        where id = ${booking.id}
      `;
      return { ok: false, message: failedMessage };
    }
  }

  after(() =>
    sendBookingEmails(updated, {
      kind: "rescheduled",
      manageToken: token,
      previousStart: booking.start_at,
      previousEnd: booking.end_at,
    }),
  );
  return { ok: true, booking: toPublicBooking(updated) };
}

async function cancel(booking: BookingRow, reason: string, cancelledBy: "guest" | "host"): Promise<Result> {
  const sql = await db();
  const [cancelled] = await sql<BookingRow[]>`
    update bookings set status = 'cancelled', cancel_reason = ${reason || null}, updated_at = now()
    where id = ${booking.id} and status = 'confirmed' returning *
  `;
  // Already cancelled (e.g. a double click): nothing more to do.
  if (!cancelled) return { ok: true, booking: toPublicBooking(booking) };

  if (cancelled.google_event_id) {
    const eventId = cancelled.google_event_id;
    // The slot is already free; removing the calendar event can finish after the response.
    after(() =>
      deleteCalendarEvent(eventId).catch((error) =>
        console.error(`Booking: could not delete Google Calendar event ${eventId}. Remove it by hand.`, error),
      ),
    );
  }
  after(() => sendBookingEmails(cancelled, { kind: "cancelled", cancelledBy }));
  return { ok: true, booking: toPublicBooking(cancelled) };
}

export async function cancelBookingByToken(token: string, reason: string): Promise<Result> {
  const booking = await getBookingByToken(token);
  if (!booking) return notFound;
  if (booking.status === "confirmed" && hasStarted(booking)) return alreadyPast;
  return cancel(booking, reason, "guest");
}

export async function cancelBookingById(id: string, reason: string): Promise<Result> {
  const sql = await db();
  const [booking] = await sql<BookingRow[]>`select * from bookings where id = ${id}`;
  if (!booking) return notFound;
  return cancel(booking, reason, "host");
}

/** Bookings from the last week onwards, soonest first, for the admin page. */
export async function listRecentBookings() {
  const sql = await db();
  return sql<BookingRow[]>`
    select * from bookings where start_at > now() - interval '7 days' order by start_at asc limit 500
  `;
}

import "server-only";

import { bookingConfig } from "@/content/booking";
import { buildIcs } from "@/lib/booking/calendar-file";
import type { BookingRow } from "@/lib/booking/db";
import { formatMeetingTime, formatShortDate, formatTime, timeZoneAbbreviation } from "@/lib/booking/time";
import { escapeHtml } from "@/lib/email/escape-html";
import { sendEmail } from "@/lib/email/send-email";
import { siteConfig } from "@/lib/site";

export type BookingEmailEvent =
  | { kind: "confirmed"; manageToken: string }
  | { kind: "rescheduled"; manageToken?: string; previousStart: Date; previousEnd: Date }
  | { kind: "cancelled"; cancelledBy: "guest" | "host" };

type Row = { label: string; value: string; href?: string; struck?: boolean };

type EmailContent = {
  heading: string;
  intro: string;
  rows: Row[];
  buttons: { label: string; href: string }[];
  footnote?: string;
};

const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();
export const manageUrl = (token: string, action?: "reschedule" | "cancel") =>
  absoluteUrl(`/book/manage/${token}${action ? `?action=${action}` : ""}`);

export function eventSummary(guestName: string) {
  return `${bookingConfig.meetingTitle}: ${siteConfig.shortName} & ${guestName}`;
}

// Email clients need inline styles and fixed colours, so this template uses plain hex values.
function renderEmail({ heading, intro, rows, buttons, footnote }: EmailContent) {
  const rowHtml = rows
    .map(({ label, value, href, struck }) => {
      const text = escapeHtml(value).replace(/\n/g, "<br>");
      const content = href ? `<a href="${escapeHtml(href)}" style="color:#2563EB">${text}</a>` : text;
      return `<tr><td style="padding:8px 16px 8px 0;color:#64748B;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 0;color:#0F172A;font-weight:600;${struck ? "text-decoration:line-through;color:#94A3B8;" : ""}">${content}</td></tr>`;
    })
    .join("");
  const buttonHtml = buttons
    .map(
      ({ label, href }, index) =>
        `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:10px;font-weight:bold;text-decoration:none;${index === 0 ? "background:#2563EB;color:#FFFFFF" : "background:#EFF6FF;color:#1D4ED8"}">${escapeHtml(label)}</a>`,
    )
    .join("");

  const html = `<div style="margin:0;padding:32px 16px;background:#F1F5F9;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">
  <div style="max-width:560px;margin:0 auto;overflow:hidden;border:1px solid #E2E8F0;border-radius:16px;background:#FFFFFF">
    <div style="padding:18px 28px;background:#050A15;color:#F1F5F9;font-weight:bold">Veloura Lunelle <span style="color:#60A5FA">Technologies</span></div>
    <div style="padding:28px">
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#0F172A">${escapeHtml(heading)}</h1>
      <p style="margin:0 0 20px;color:#334155">${escapeHtml(intro)}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #E2E8F0;border-bottom:1px solid #E2E8F0;margin-bottom:24px">${rowHtml}</table>
      ${buttonHtml}
      ${footnote ? `<p style="margin:16px 0 0;color:#64748B;font-size:13px">${escapeHtml(footnote)}</p>` : ""}
    </div>
  </div>
</div>`;

  const text = [
    heading,
    "",
    intro,
    "",
    ...rows.map(({ label, value, href, struck }) => `${label}: ${struck ? `(was) ${value}` : value}${href && href !== value ? ` (${href})` : ""}`),
    "",
    ...buttons.map(({ label, href }) => `${label}: ${href}`),
    ...(footnote ? ["", footnote] : []),
  ].join("\n");

  return { html, text };
}

function whereRow(booking: BookingRow): Row {
  return booking.meet_url
    ? { label: "Where", value: booking.meet_url, href: booking.meet_url }
    : { label: "Where", value: "Online. We'll email you a meeting link before the call." };
}

function guestEmail(booking: BookingRow, event: BookingEmailEvent) {
  const firstName = booking.name.split(" ")[0];
  const when = formatMeetingTime(booking.start_at, booking.end_at, booking.guest_time_zone);
  const tz = booking.guest_time_zone;
  const shortWhen = `${formatShortDate(booking.start_at, tz)} at ${formatTime(booking.start_at, tz)} (${timeZoneAbbreviation(tz, booking.start_at)})`;
  const changeButtons = (token?: string) =>
    token
      ? [
          { label: "Reschedule", href: manageUrl(token, "reschedule") },
          { label: "Cancel", href: manageUrl(token, "cancel") },
        ]
      : [];
  const joinButton = booking.meet_url ? [{ label: "Join Google Meet", href: booking.meet_url }] : [];
  const footnote = booking.google_event_id
    ? "A Google Calendar invitation has also been sent to this address."
    : "We've attached a calendar file so you can add the call to your calendar.";

  if (event.kind === "confirmed") {
    return {
      subject: `Confirmed: ${bookingConfig.meetingTitle} on ${shortWhen}`,
      ...renderEmail({
        heading: "Your call is confirmed",
        intro: `Hi ${firstName}, thanks for booking a call with ${siteConfig.name}. We're looking forward to speaking with you.`,
        rows: [{ label: "What", value: bookingConfig.meetingTitle }, { label: "When", value: when }, whereRow(booking)],
        buttons: [...joinButton, ...changeButtons(event.manageToken)],
        footnote,
      }),
    };
  }

  if (event.kind === "rescheduled") {
    return {
      subject: `Updated: ${bookingConfig.meetingTitle} is now ${shortWhen}`,
      ...renderEmail({
        heading: "Your call has been moved",
        intro: `Hi ${firstName}, your call with ${siteConfig.name} now has a new time.`,
        rows: [
          { label: "Was", value: formatMeetingTime(event.previousStart, event.previousEnd, tz), struck: true },
          { label: "Now", value: when },
          whereRow(booking),
        ],
        buttons: [...joinButton, ...changeButtons(event.manageToken)],
        footnote: booking.google_event_id ? "Your Google Calendar invitation has been updated too." : footnote,
      }),
    };
  }

  return {
    subject: `Cancelled: ${bookingConfig.meetingTitle} on ${shortWhen}`,
    ...renderEmail({
      heading: "Your call has been cancelled",
      intro:
        event.cancelledBy === "guest"
          ? `Hi ${firstName}, your call has been cancelled as you asked. You're welcome to book a new time whenever it suits you.`
          : `Hi ${firstName}, sorry, we had to cancel your call. Please pick another time that works for you.`,
      rows: [
        { label: "Was", value: when, struck: true },
        ...(booking.cancel_reason ? [{ label: "Reason", value: booking.cancel_reason }] : []),
      ],
      buttons: [{ label: "Book a new time", href: absoluteUrl("/book") }],
    }),
  };
}

function hostEmail(booking: BookingRow, event: BookingEmailEvent) {
  const hostTz = bookingConfig.timeZone;
  const guestTimeRow: Row[] =
    booking.guest_time_zone === hostTz
      ? []
      : [
          {
            label: "Their time",
            value: formatMeetingTime(booking.start_at, booking.end_at, booking.guest_time_zone),
          },
        ];
  const guestRows: Row[] = [
    { label: "Name", value: booking.name },
    { label: "Email", value: booking.email, href: `mailto:${booking.email}` },
    ...(booking.company ? [{ label: "Company", value: booking.company }] : []),
    ...(booking.phone ? [{ label: "Phone", value: booking.phone }] : []),
  ];
  const buttons = [{ label: "View all bookings", href: absoluteUrl("/admin/bookings") }];
  const when = formatMeetingTime(booking.start_at, booking.end_at, hostTz);
  const shortWhen = `${formatShortDate(booking.start_at, hostTz)} ${formatTime(booking.start_at, hostTz)}`;

  if (event.kind === "confirmed") {
    return {
      subject: `New call booked: ${booking.name} – ${shortWhen}`,
      ...renderEmail({
        heading: "New call booked",
        intro: `${booking.name} booked a ${bookingConfig.meetingTitle.toLowerCase()}. Reply to this email to contact them.`,
        rows: [
          { label: "When", value: when },
          ...guestTimeRow,
          ...guestRows,
          ...(booking.meet_url ? [{ label: "Meet", value: booking.meet_url, href: booking.meet_url }] : []),
          { label: "Notes", value: booking.notes || "None" },
        ],
        buttons,
      }),
    };
  }

  if (event.kind === "rescheduled") {
    return {
      subject: `Call rescheduled: ${booking.name} – now ${shortWhen}`,
      ...renderEmail({
        heading: "Call rescheduled",
        intro: `${booking.name} moved their call to a new time.`,
        rows: [
          { label: "Was", value: formatMeetingTime(event.previousStart, event.previousEnd, hostTz), struck: true },
          { label: "Now", value: when },
          ...guestTimeRow,
          ...guestRows,
        ],
        buttons,
      }),
    };
  }

  return {
    subject: `Call cancelled: ${booking.name} – ${shortWhen}`,
    ...renderEmail({
      heading: "Call cancelled",
      intro:
        event.cancelledBy === "guest"
          ? `${booking.name} cancelled their call. The time is open again.`
          : `You cancelled this call. ${booking.name} has been told by email.`,
      rows: [
        { label: "Was", value: when, struck: true },
        ...guestRows,
        ...(booking.cancel_reason ? [{ label: "Reason", value: booking.cancel_reason }] : []),
      ],
      buttons,
    }),
  };
}

// Without Google Calendar, attach an .ics file so the call still lands in both calendars.
function calendarAttachment(booking: BookingRow, event: BookingEmailEvent) {
  if (booking.google_event_id) return undefined;
  const content = buildIcs(
    {
      uid: `${booking.id}@${new URL(siteConfig.url).hostname}`,
      start: booking.start_at,
      end: booking.end_at,
      summary: eventSummary(booking.name),
      description: `${bookingConfig.meetingTitle} with ${siteConfig.name}.`,
      location: booking.meet_url ?? undefined,
    },
    event.kind === "cancelled" ? "CANCEL" : "PUBLISH",
  );
  return [{ filename: "invite.ics", content, contentType: "text/calendar" }];
}

/** Emails the guest and the business. Failures are logged, never thrown: the booking itself already succeeded. */
export async function sendBookingEmails(booking: BookingRow, event: BookingEmailEvent) {
  const attachments = calendarAttachment(booking, event);
  const hostInbox = process.env.CONTACT_EMAIL;

  await Promise.all([
    sendEmail({ to: booking.email, ...guestEmail(booking, event), attachments }, `Booking (${event.kind}) guest email`),
    hostInbox
      ? sendEmail(
          { to: hostInbox, replyTo: booking.email, ...hostEmail(booking, event), attachments },
          `Booking (${event.kind}) host email`,
        )
      : console.error("Booking: CONTACT_EMAIL is not set, so the host notification was not sent."),
  ]);
}

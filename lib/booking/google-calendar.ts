import "server-only";

// Minimal Google Calendar client (plain fetch). Authenticates as the calendar owner with an
// OAuth refresh token, created once with `npm run google:auth`.

export type Interval = { start: Date; end: Date };

type CalendarEvent = {
  id: string;
  hangoutLink?: string;
  conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
};

const API_URL = "https://www.googleapis.com/calendar/v3";

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN,
  );
}

const calendarPath = () => `/calendars/${encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || "primary")}`;

let cachedToken: { value: string; expiresAt: number } | undefined;

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Google token refresh failed (${response.status}): ${await response.text()}`);

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function calendarRequest<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  { query, body }: { query?: Record<string, string>; body?: unknown } = {},
): Promise<T | undefined> {
  const url = new URL(API_URL + path);
  for (const [key, value] of Object.entries(query ?? {})) url.searchParams.set(key, value);

  const response = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${await getAccessToken()}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  // Already deleted in Google Calendar: nothing left to do.
  if (method === "DELETE" && (response.status === 404 || response.status === 410)) return undefined;
  if (!response.ok) {
    throw new Error(`Google Calendar ${method} ${path} failed (${response.status}): ${await response.text()}`);
  }
  return response.status === 204 ? undefined : ((await response.json()) as T);
}

/** Busy times on the owner's calendar (any event marked "busy", not only bookings). */
export async function getBusyTimes(from: Date, to: Date): Promise<Interval[]> {
  const data = await calendarRequest<{
    calendars: Record<string, { busy: { start: string; end: string }[]; errors?: unknown[] }>;
  }>("POST", "/freeBusy", {
    body: {
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      items: [{ id: process.env.GOOGLE_CALENDAR_ID || "primary" }],
    },
  });

  const calendar = Object.values(data?.calendars ?? {})[0];
  if (!calendar || calendar.errors?.length) {
    throw new Error(`Google Calendar free/busy failed: ${JSON.stringify(calendar?.errors ?? data)}`);
  }
  return calendar.busy.map((busy) => ({ start: new Date(busy.start), end: new Date(busy.end) }));
}

/** Creates the event with a Google Meet link. Google emails the invite to the guest. */
export async function createCalendarEvent(event: {
  requestId: string;
  summary: string;
  description: string;
  start: Date;
  end: Date;
  guest: { name: string; email: string };
}) {
  const created = await calendarRequest<CalendarEvent>("POST", `${calendarPath()}/events`, {
    query: { conferenceDataVersion: "1", sendUpdates: "all" },
    body: {
      summary: event.summary,
      description: event.description,
      start: { dateTime: event.start.toISOString() },
      end: { dateTime: event.end.toISOString() },
      attendees: [{ email: event.guest.email, displayName: event.guest.name }],
      guestsCanModify: false,
      conferenceData: {
        createRequest: { requestId: event.requestId, conferenceSolutionKey: { type: "hangoutsMeet" } },
      },
    },
  });
  if (!created) throw new Error("Google Calendar returned no event.");

  const meetUrl =
    created.hangoutLink ??
    created.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri ??
    null;
  return { eventId: created.id, meetUrl };
}

export async function moveCalendarEvent(eventId: string, start: Date, end: Date) {
  await calendarRequest("PATCH", `${calendarPath()}/events/${encodeURIComponent(eventId)}`, {
    query: { sendUpdates: "all" },
    body: { start: { dateTime: start.toISOString() }, end: { dateTime: end.toISOString() } },
  });
}

export async function deleteCalendarEvent(eventId: string) {
  await calendarRequest("DELETE", `${calendarPath()}/events/${encodeURIComponent(eventId)}`, {
    query: { sendUpdates: "all" },
  });
}

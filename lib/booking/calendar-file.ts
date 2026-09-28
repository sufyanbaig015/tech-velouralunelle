// .ics calendar files and "Add to Google Calendar" links. Used when Google Calendar isn't
// connected (so Google isn't sending the invite). Works on the server and in the browser.

type CalendarEntry = {
  uid: string;
  start: Date;
  end: Date;
  summary: string;
  description: string;
  location?: string;
};


const icsDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escapeText = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// iCalendar lines must be at most 75 bytes; longer ones continue on lines starting with a space.
function foldLine(line: string) {
  const encoder = new TextEncoder();
  const chunks: string[] = [];
  let current = "";
  for (const char of line) {
    if (encoder.encode(current + char).length > (chunks.length ? 74 : 75)) {
      chunks.push(current);
      current = "";
    }
    current += char;
  }
  chunks.push(current);
  return chunks.join("\r\n ");
}

/**
 * PUBLISH adds the event; CANCEL removes one added earlier with the same uid.
 * SEQUENCE must go up with every change so calendars replace the old copy; the current time always does.
 */
export function buildIcs(entry: CalendarEntry, method: "PUBLISH" | "CANCEL") {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Veloura Lunelle Technologies//Booking//EN",
    "CALSCALE:GREGORIAN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${entry.uid}`,
    `SEQUENCE:${Math.floor(Date.now() / 1000)}`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(entry.start)}`,
    `DTEND:${icsDate(entry.end)}`,
    `SUMMARY:${escapeText(entry.summary)}`,
    `DESCRIPTION:${escapeText(entry.description)}`,
    ...(entry.location ? [`LOCATION:${escapeText(entry.location)}`] : []),
    `STATUS:${method === "CANCEL" ? "CANCELLED" : "CONFIRMED"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

export function googleCalendarUrl(entry: Omit<CalendarEntry, "uid">) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: entry.summary,
    dates: `${icsDate(entry.start)}/${icsDate(entry.end)}`,
    details: entry.description,
    ...(entry.location && { location: entry.location }),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Time zone helpers built on Intl (no date library). Shared by the server and the scheduler UI.
// A "date key" is a calendar day written as "YYYY-MM-DD".

const formatters = new Map<string, Intl.DateTimeFormat>();

function cachedFormatter(key: string, create: () => Intl.DateTimeFormat) {
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = create();
    formatters.set(key, formatter);
  }
  return formatter;
}

function zonedParts(date: Date, timeZone: string) {
  const formatter = cachedFormatter(`parts:${timeZone}`, () =>
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, Number(part.value)]));
  return parts as Record<"year" | "month" | "day" | "hour" | "minute" | "second", number>;
}

/** Milliseconds the time zone is ahead of UTC at this instant. */
function offsetMs(date: Date, timeZone: string) {
  const p = zonedParts(date, timeZone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - (date.getTime() - date.getMilliseconds());
}

/** The instant when the wall clock in `timeZone` shows `dateKey` at `time` ("HH:MM"). DST-safe. */
export function zonedTimeToUtc(dateKey: string, time: string, timeZone: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  // Two passes: the offset can differ between the first guess and the answer around DST changes.
  const firstGuess = wallClock - offsetMs(new Date(wallClock), timeZone);
  return new Date(wallClock - offsetMs(new Date(firstGuess), timeZone));
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Calendar day of `date` in `timeZone`. */
export function toDateKey(date: Date, timeZone: string) {
  const p = zonedParts(date, timeZone);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

export function addDays(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday. */
export function weekdayOf(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function isValidTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

export function formatTime(date: Date, timeZone: string, hour12 = true) {
  return cachedFormatter(`time:${timeZone}:${hour12}`, () =>
    new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit", hour12 }),
  ).format(date);
}

/** "Tuesday, September 29, 2026" */
export function formatLongDate(date: Date, timeZone: string) {
  return cachedFormatter(`long:${timeZone}`, () =>
    new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  ).format(date);
}

/** "Tue, Sep 29" */
export function formatShortDate(date: Date, timeZone: string) {
  return cachedFormatter(`short:${timeZone}`, () =>
    new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", month: "short", day: "numeric" }),
  ).format(date);
}

/** "EDT", or "GMT+5" where no abbreviation exists. */
export function timeZoneAbbreviation(timeZone: string, date = new Date()) {
  const formatter = cachedFormatter(`abbr:${timeZone}`, () =>
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }),
  );
  return formatter.formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

/** "GMT-4" */
export function timeZoneOffsetLabel(timeZone: string, date = new Date()) {
  const formatter = cachedFormatter(`offset:${timeZone}`, () =>
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" }),
  );
  return formatter.formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? "";
}

/** "10:00 AM – 10:30 AM, Tuesday, September 29, 2026 (EDT)" */
export function formatMeetingTime(start: Date, end: Date, timeZone: string) {
  return `${formatTime(start, timeZone)} – ${formatTime(end, timeZone)}, ${formatLongDate(start, timeZone)} (${timeZoneAbbreviation(timeZone, start)})`;
}

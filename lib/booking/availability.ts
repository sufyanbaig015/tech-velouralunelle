import "server-only";

import { bookingConfig } from "@/content/booking";
import { db } from "@/lib/booking/db";
import { getBusyTimes, isGoogleCalendarConfigured, type Interval } from "@/lib/booking/google-calendar";
import { addDays, toDateKey, weekdayOf, zonedTimeToUtc } from "@/lib/booking/time";

const MINUTE = 60_000;
const duration = bookingConfig.durationMinutes * MINUTE;
const buffer = bookingConfig.bufferMinutes * MINUTE;

/** A booking to leave out of the busy times, so it can be moved to an overlapping slot. */
export type IgnoredBooking = { id: string; start: Date; end: Date };

export function meetingEnd(start: Date) {
  return new Date(start.getTime() + duration);
}

/** The range of start times that can be booked right now. */
export function bookingWindow(now = new Date()) {
  return {
    earliest: new Date(now.getTime() + bookingConfig.minNoticeHours * 60 * MINUTE),
    latest: new Date(now.getTime() + bookingConfig.maxDaysAhead * 24 * 60 * MINUTE),
  };
}

/** Every slot inside working hours from `from` (inclusive) to `to` (exclusive). */
function workingHourSlots(from: Date, to: Date) {
  const { timeZone, weeklyHours, blockedDates, slotIntervalMinutes } = bookingConfig;
  const slots: Date[] = [];
  const lastDay = toDateKey(to, timeZone);

  for (let day = toDateKey(from, timeZone); day <= lastDay; day = addDays(day, 1)) {
    if (blockedDates.includes(day)) continue;
    for (const [startTime, endTime] of weeklyHours[weekdayOf(day)] ?? []) {
      const windowEnd = zonedTimeToUtc(day, endTime, timeZone).getTime();
      for (
        let start = zonedTimeToUtc(day, startTime, timeZone).getTime();
        start + duration <= windowEnd;
        start += slotIntervalMinutes * MINUTE
      ) {
        if (start >= from.getTime() && start < to.getTime()) slots.push(new Date(start));
      }
    }
  }
  return slots;
}

async function busyTimes(from: Date, to: Date, ignore?: IgnoredBooking): Promise<Interval[]> {
  const sql = await db();
  const rows = await sql<{ start_at: Date; end_at: Date }[]>`
    select start_at, end_at from bookings
    where status = 'confirmed' and start_at < ${to} and end_at > ${from}
    ${ignore ? sql`and id <> ${ignore.id}` : sql``}
  `;
  const busy = rows.map((row) => ({ start: row.start_at, end: row.end_at }));

  if (isGoogleCalendarConfigured()) {
    const calendarBusy = await getBusyTimes(from, to);
    // The booking being moved is also an event in Google Calendar; don't let it block itself.
    const isIgnored = (interval: Interval) =>
      ignore !== undefined &&
      interval.start.getTime() === ignore.start.getTime() &&
      interval.end.getTime() === ignore.end.getTime();
    busy.push(...calendarBusy.filter((interval) => !isIgnored(interval)));
  }
  return busy;
}

/** Open start times between `from` and `to`, after working hours, notice, bookings and calendar events. */
export async function getAvailableSlots(from: Date, to: Date, ignore?: IgnoredBooking) {
  const window = bookingWindow();
  const start = new Date(Math.max(from.getTime(), window.earliest.getTime()));
  const end = new Date(Math.min(to.getTime(), window.latest.getTime()));
  if (start >= end) return [];

  const candidates = workingHourSlots(start, end);
  if (candidates.length === 0) return [];

  const busy = await busyTimes(
    new Date(start.getTime() - duration - buffer),
    new Date(end.getTime() + duration + buffer),
    ignore,
  );
  // A slot is free when nothing is busy from `buffer` before it starts to `buffer` after it ends.
  return candidates.filter((slot) => {
    const blockedFrom = slot.getTime() - buffer;
    const blockedTo = slot.getTime() + duration + buffer;
    return !busy.some((interval) => interval.start.getTime() < blockedTo && interval.end.getTime() > blockedFrom);
  });
}

export async function isSlotAvailable(start: Date, ignore?: IgnoredBooking) {
  const slots = await getAvailableSlots(start, new Date(start.getTime() + 1), ignore);
  return slots.some((slot) => slot.getTime() === start.getTime());
}

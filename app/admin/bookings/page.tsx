import type { Metadata } from "next";
import { CalendarCheck2, CalendarX2, Clock3 } from "lucide-react";
import type { ReactNode } from "react";
import { connection } from "next/server";

import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button";
import { AdminCancelButton } from "@/components/booking/admin-cancel-button";
import { bookingConfig } from "@/content/booking";
import { hasStarted, listRecentBookings } from "@/lib/booking/bookings";
import { isDatabaseConfigured, type BookingRow } from "@/lib/booking/db";
import { isGoogleCalendarConfigured } from "@/lib/booking/google-calendar";
import { formatMeetingTime, formatShortDate, formatTime, timeZoneAbbreviation } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false, follow: false },
};

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        ok ? "border-teal/40 bg-teal/10 text-teal" : "border-danger/40 bg-danger-soft text-danger",
      )}
    >
      <span className={cn("size-1.5 rounded-full", ok ? "bg-teal" : "bg-danger")} aria-hidden="true" />
      {label}
    </span>
  );
}

function BookingCard({ booking, canCancel }: { booking: BookingRow; canCancel: boolean }) {
  const hostTz = bookingConfig.timeZone;
  const cancelled = booking.status === "cancelled";
  return (
    <li className={cn("glass rounded-2xl p-5 text-sm transition-colors hover:border-accent/40", cancelled && "opacity-70")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={cn("font-heading text-lg font-medium text-heading", cancelled && "line-through")}>
            {formatShortDate(booking.start_at, hostTz)}, {formatTime(booking.start_at, hostTz)} –{" "}
            {formatTime(booking.end_at, hostTz)} {timeZoneAbbreviation(hostTz, booking.start_at)}
          </p>
          {booking.guest_time_zone !== hostTz && (
            <p className="mt-0.5 text-xs">
              Their time: {formatMeetingTime(booking.start_at, booking.end_at, booking.guest_time_zone)}
            </p>
          )}
        </div>
        {canCancel && <AdminCancelButton bookingId={booking.id} guestName={booking.name} />}
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        <dt className="text-body">Name</dt>
        <dd className="font-medium text-heading">{booking.name}</dd>
        <dt className="text-body">Email</dt>
        <dd>
          <a href={`mailto:${booking.email}`} className="font-medium text-accent underline-offset-4 hover:underline">
            {booking.email}
          </a>
        </dd>
        {booking.company && (
          <>
            <dt className="text-body">Company</dt>
            <dd className="text-heading">{booking.company}</dd>
          </>
        )}
        {booking.phone && (
          <>
            <dt className="text-body">Phone</dt>
            <dd className="text-heading">{booking.phone}</dd>
          </>
        )}
        {booking.meet_url && !cancelled && (
          <>
            <dt className="text-body">Meet</dt>
            <dd>
              <a
                href={booking.meet_url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-accent underline-offset-4 hover:underline"
              >
                {booking.meet_url}
              </a>
            </dd>
          </>
        )}
        {booking.notes && (
          <>
            <dt className="text-body">Notes</dt>
            <dd className="whitespace-pre-wrap text-heading">{booking.notes}</dd>
          </>
        )}
        {cancelled && (
          <>
            <dt className="text-body">Cancelled</dt>
            <dd className="text-heading">{booking.cancel_reason || "No reason given"}</dd>
          </>
        )}
      </dl>
    </li>
  );
}

function BookingGroup({
  title,
  icon,
  bookings,
  canCancel = false,
}: {
  title: string;
  icon: ReactNode;
  bookings: BookingRow[];
  canCancel?: boolean;
}) {
  return (
    <section aria-label={title} className="mt-12">
      <h2 className="flex items-center gap-2.5 text-xl font-medium text-heading">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-accent">{icon}</span>
        {title} <span className="text-body">({bookings.length})</span>
      </h2>
      {bookings.length === 0 ? (
        <p className="mt-4 text-sm">Nothing here yet.</p>
      ) : (
        <ul className="mt-4 grid gap-4 lg:grid-cols-2">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} canCancel={canCancel} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function AdminBookingsPage() {
  await connection();

  if (!isDatabaseConfigured()) {
    return (
      <div className="container py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-medium text-heading">Bookings</h1>
          <AdminSignOutButton />
        </div>
        <p className="mt-4">Add DATABASE_URL to the environment variables to start taking bookings.</p>
      </div>
    );
  }

  const bookings = await listRecentBookings();
  const upcoming = bookings.filter((booking) => booking.status === "confirmed" && !hasStarted(booking));
  const past = bookings.filter((booking) => booking.status === "confirmed" && hasStarted(booking)).reverse();
  const cancelled = bookings.filter((booking) => booking.status === "cancelled");
  const calendarOk = isGoogleCalendarConfigured();

  return (
    <div className="container py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
          <h1 className="mt-2 text-3xl font-medium text-heading sm:text-4xl">Bookings</h1>
          <p className="mt-3 max-w-xl text-sm">
            Times in {bookingConfig.timeZone.replace(/_/g, " ")}. Upcoming calls, recent history, and cancellations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusPill ok={calendarOk} label={calendarOk ? "Google Calendar connected" : "Calendar not connected"} />
            <StatusPill ok label={`${upcoming.length} upcoming`} />
          </div>
        </div>
        <AdminSignOutButton />
      </div>

      <BookingGroup title="Upcoming" icon={<CalendarCheck2 className="size-4" aria-hidden="true" />} bookings={upcoming} canCancel />
      <BookingGroup title="Past 7 days" icon={<Clock3 className="size-4" aria-hidden="true" />} bookings={past} />
      <BookingGroup title="Cancelled" icon={<CalendarX2 className="size-4" aria-hidden="true" />} bookings={cancelled} />
    </div>
  );
}

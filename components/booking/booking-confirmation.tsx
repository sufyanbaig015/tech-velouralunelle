"use client";

import { ArrowRight, CalendarDays, CalendarPlus, Check, Download, Globe, Video } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { bookingConfig, bookingPage } from "@/content/booking";
import { buildIcs, googleCalendarUrl } from "@/lib/booking/calendar-file";
import { formatLongDate, formatTime, timeZoneAbbreviation } from "@/lib/booking/time";
import { siteConfig } from "@/lib/site";
import type { PublicBooking } from "@/lib/validations/booking";

type BookingConfirmationProps = {
  booking: PublicBooking;
  rescheduled?: boolean;
};

export function BookingConfirmation({ booking, rescheduled = false }: BookingConfirmationProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const start = new Date(booking.start);
  const end = new Date(booking.end);
  const { timeZone } = booking;
  const calendarEntry = {
    start,
    end,
    summary: `${bookingConfig.meetingTitle} with ${siteConfig.shortName}`,
    description: `${bookingConfig.meetingTitle} with ${siteConfig.name}.${booking.meetUrl ? `\nJoin: ${booking.meetUrl}` : ""}`,
    location: booking.meetUrl ?? undefined,
  };

  function downloadIcs() {
    const ics = buildIcs(
      { ...calendarEntry, uid: `${booking.id}@${new URL(siteConfig.url).hostname}` },
      "PUBLISH",
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    link.download = "veloura-lunelle-call.ics";
    link.click();
    // Revoking straight away can cancel the download in some browsers.
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  const details = [
    {
      icon: CalendarDays,
      text: `${formatTime(start, timeZone)} – ${formatTime(end, timeZone)}, ${formatLongDate(start, timeZone)}`,
    },
    { icon: Globe, text: `${timeZone.replace(/_/g, " ")} (${timeZoneAbbreviation(timeZone, start)})` },
  ];

  return (
    <div className="mx-auto max-w-xl px-6 py-12 text-center sm:py-16">
      <span className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-b from-primary-light to-primary text-primary-foreground shadow-glow duration-500 animate-in zoom-in-50">
        <Check className="size-8" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-3xl font-medium text-heading focus-visible:outline-none sm:text-4xl"
      >
        {rescheduled ? "Your call has been moved" : "You're booked in!"}
      </h2>
      <p className="mt-3 leading-relaxed">
        We&apos;ve sent the details to <strong className="font-semibold text-heading">{booking.email}</strong>.
      </p>

      <div className="glass mt-8 space-y-3 rounded-2xl p-6 text-left text-sm">
        <p className="font-heading text-lg font-medium text-heading">{bookingConfig.meetingTitle}</p>
        {details.map(({ icon: Icon, text }) => (
          <p key={text} className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            {text}
          </p>
        ))}
        <p className="flex gap-3">
          <Video className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          {booking.meetUrl ? (
            <a
              href={booking.meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-medium text-accent underline-offset-4 hover:underline"
            >
              {booking.meetUrl}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            `${bookingPage.location}. We'll email you the link before the call.`
          )}
        </p>
      </div>

      {booking.calendarInviteSent ? (
        <p className="mt-6 text-sm">A Google Calendar invite is on its way to your inbox.</p>
      ) : (
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <a href={googleCalendarUrl(calendarEntry)} target="_blank" rel="noopener noreferrer">
              <CalendarPlus aria-hidden="true" />
              Add to Google Calendar
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
          <Button variant="outline" onClick={downloadIcs}>
            <Download aria-hidden="true" />
            Apple / Outlook (.ics)
          </Button>
        </div>
      )}

      <Button asChild variant="ghost" className="mt-8">
        <Link href="/services">
          Explore our services while you wait
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}

"use client";

import { ArrowLeft, CalendarClock, CalendarDays, CalendarX, Globe, Loader2, Video } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";

import { cancelCall } from "@/app/book/actions";
import { Scheduler } from "@/components/booking/scheduler";
import { FormAlert } from "@/components/form-alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingConfig } from "@/content/booking";
import { formatLongDate, formatTime, timeZoneAbbreviation } from "@/lib/booking/time";
import { siteConfig } from "@/lib/site";
import type { PublicBooking } from "@/lib/validations/booking";

type View = "overview" | "reschedule" | "cancel";

type ManageBookingProps = {
  token: string;
  booking: PublicBooking;
  /** The call has already started or finished, so it can't be changed. */
  hasStarted: boolean;
  initialAction?: "reschedule" | "cancel";
};

export function ManageBooking({ token, booking: initialBooking, hasStarted, initialAction }: ManageBookingProps) {
  const [booking, setBooking] = useState(initialBooking);
  const canChange = booking.status === "confirmed" && !hasStarted;
  const [view, setView] = useState<View>(canChange && initialAction ? initialAction : "overview");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const viewChanged = useRef(false);

  useEffect(() => {
    if (!viewChanged.current) return;
    viewChanged.current = false;
    headingRef.current?.focus();
  }, [view, booking.status]);

  function show(next: View) {
    viewChanged.current = true;
    setError(null);
    setView(next);
  }

  function cancel(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await cancelCall(token, formData.get("reason"));
        if (!result.ok) return setError(result.message);
        viewChanged.current = true;
        setBooking(result.booking);
        setView("overview");
      } catch {
        setError(`Sorry, we couldn't cancel your call. Please try again, or email us at ${siteConfig.email}.`);
      }
    });
  }

  if (view === "reschedule") {
    return (
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => show("overview")}>
          <ArrowLeft aria-hidden="true" />
          Back to your booking
        </Button>
        <Scheduler mode="reschedule" token={token} current={booking} onRescheduled={setBooking} />
      </div>
    );
  }

  const start = new Date(booking.start);
  const end = new Date(booking.end);
  const cancelled = booking.status === "cancelled";
  const heading = cancelled
    ? "This call has been cancelled"
    : hasStarted
      ? "This call has already taken place"
      : view === "cancel"
        ? "Cancel your call?"
        : "Your upcoming call";

  return (
    <div className="glass mx-auto max-w-2xl rounded-3xl p-6 sm:p-10">
      <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-28 text-2xl font-medium text-heading focus-visible:outline-none">
        {heading}
      </h2>

      <div className="mt-6 space-y-3 rounded-2xl border bg-background/40 p-5 text-sm">
        <p className="font-heading text-base font-medium text-heading">{bookingConfig.meetingTitle}</p>
        <p className={cancelled ? "flex gap-3 line-through" : "flex gap-3"}>
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          {formatTime(start, booking.timeZone)} – {formatTime(end, booking.timeZone)}, {formatLongDate(start, booking.timeZone)}
        </p>
        <p className="flex gap-3">
          <Globe className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          {booking.timeZone.replace(/_/g, " ")} ({timeZoneAbbreviation(booking.timeZone, start)})
        </p>
        {booking.meetUrl && !cancelled && (
          <p className="flex gap-3">
            <Video className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            <a
              href={booking.meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-medium text-accent underline-offset-4 hover:underline"
            >
              {booking.meetUrl}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        )}
      </div>

      {error && <FormAlert className="mt-6">{error}</FormAlert>}

      {cancelled && (
        <div className="mt-8">
          <p className="leading-relaxed">We&apos;d still love to talk. Pick a new time whenever it suits you.</p>
          <Button asChild variant="gradient" className="mt-5">
            <Link href="/book">
              <CalendarDays aria-hidden="true" />
              Book a new time
            </Link>
          </Button>
        </div>
      )}

      {canChange && view === "overview" && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="gradient" onClick={() => show("reschedule")}>
            <CalendarClock aria-hidden="true" />
            Reschedule
          </Button>
          <Button variant="outline" onClick={() => show("cancel")}>
            <CalendarX aria-hidden="true" />
            Cancel call
          </Button>
        </div>
      )}

      {canChange && view === "cancel" && (
        <form action={cancel} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="cancel-reason">
              Reason for cancelling <span className="font-normal text-body">(optional)</span>
            </Label>
            <Textarea id="cancel-reason" name="reason" rows={3} maxLength={500} placeholder="Let us know if you'd like us to follow up." />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" onClick={() => show("overview")} disabled={pending}>
              <ArrowLeft aria-hidden="true" />
              Keep my call
            </Button>
            <Button type="submit" disabled={pending} className="bg-danger text-background hover:bg-danger/90">
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Cancelling...
                </>
              ) : (
                <>
                  <CalendarX aria-hidden="true" />
                  Yes, cancel call
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

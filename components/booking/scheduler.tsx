"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, CalendarClock, Loader2, Mail, RotateCw } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState, useTransition, type ReactNode } from "react";

import { rescheduleCall } from "@/app/book/actions";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import type { BookingDraft } from "@/components/booking/booking-details-form";
import { MeetingSummary } from "@/components/booking/meeting-summary";
import { MonthCalendar } from "@/components/booking/month-calendar";
import { TimeSlotList } from "@/components/booking/time-slot-list";
import { TimeZoneSelect } from "@/components/booking/time-zone-select";
import { useBookingSlots } from "@/components/booking/use-booking-slots";
import { useBrowserTimeZone } from "@/components/booking/use-browser-time-zone";
import { FormAlert } from "@/components/form-alert";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { bookingConfig } from "@/content/booking";
import { toDateKey } from "@/lib/booking/time";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { PublicBooking } from "@/lib/validations/booking";

// The details form (and its validation library) is only needed after a time is picked,
// so it loads on demand. Picking a time starts the download, so "Next" feels instant.
const loadDetailsForm = () => import("@/components/booking/booking-details-form");
const BookingDetailsForm = dynamic(() => loadDetailsForm().then((mod) => mod.BookingDetailsForm), {
  loading: () => (
    <p className="flex items-center gap-2 text-sm">
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      Loading form...
    </p>
  ),
});

type SchedulerProps =
  | { mode: "book" }
  | { mode: "reschedule"; token: string; current: PublicBooking; onRescheduled?: (booking: PublicBooking) => void };

type Step = "pick" | "details" | "done";

const MINUTE = 60_000;

function groupByDay(slots: Date[], timeZone: string) {
  const days = new Map<string, Date[]>();
  for (const slot of slots) {
    const day = toDateKey(slot, timeZone);
    days.set(day, [...(days.get(day) ?? []), slot]);
  }
  return days;
}

const stepMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: "easeOut" },
} as const;

export function Scheduler(props: SchedulerProps) {
  const rescheduling = props.mode === "reschedule" ? props : null;
  const { state, reload } = useBookingSlots(rescheduling?.token);

  const browserTimeZone = useBrowserTimeZone();
  const [chosenTimeZone, setChosenTimeZone] = useState<string | null>(null);
  const timeZone = chosenTimeZone ?? browserTimeZone ?? bookingConfig.timeZone;

  const [hour12, setHour12] = useState(true);
  const [month, setMonth] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [notice, setNotice] = useState<string | null>(null);
  const [draft, setDraft] = useState<BookingDraft>({});
  const [booking, setBooking] = useState<PublicBooking | null>(null);
  const [pending, startTransition] = useTransition();

  const slotsRef = useRef<HTMLDivElement>(null);
  const stepChanged = useRef(false);

  // When a new step's heading appears (after the exit animation), move focus to it,
  // so keyboard and screen reader users follow along.
  const focusStepHeading = useCallback((heading: HTMLHeadingElement | null) => {
    if (!heading || !stepChanged.current) return;
    stepChanged.current = false;
    heading.focus();
  }, []);

  function goTo(next: Step) {
    stepChanged.current = true;
    setStep(next);
  }

  const days = useMemo(
    () => (state.status === "ready" ? groupByDay(state.slots, timeZone) : new Map<string, Date[]>()),
    [state, timeZone],
  );
  const slotCounts = useMemo(() => new Map([...days].map(([day, slots]) => [day, slots.length])), [days]);

  if (step === "done" && booking) {
    return (
      <div className="glass overflow-hidden rounded-3xl">
        <BookingConfirmation booking={booking} rescheduled={Boolean(rescheduling)} />
      </div>
    );
  }

  const firstSlot = state.status === "ready" ? state.slots[0] : undefined;
  const today = state.status === "ready" ? toDateKey(state.loadedAt, timeZone) : null;
  const lastDay =
    state.status === "ready"
      ? toDateKey(new Date(state.loadedAt.getTime() + bookingConfig.maxDaysAhead * 24 * 60 * MINUTE), timeZone)
      : null;
  const minMonth = today?.slice(0, 7) ?? "";
  const maxMonth = lastDay?.slice(0, 7) ?? minMonth;
  const visibleMonth = month ?? (firstSlot ? toDateKey(firstSlot, timeZone).slice(0, 7) : minMonth);

  const selectedStart = selectedSlot ? new Date(selectedSlot) : null;
  const selectedMeeting = selectedStart && {
    start: selectedStart,
    end: new Date(selectedStart.getTime() + bookingConfig.durationMinutes * MINUTE),
    timeZone,
  };
  const currentMeeting = rescheduling && {
    start: new Date(rescheduling.current.start),
    end: new Date(rescheduling.current.end),
    timeZone,
  };

  function selectDate(day: string) {
    setSelectedDate(day);
    setSelectedSlot(null);
    setNotice(null);
    // On phones the times are below the calendar: bring them into view.
    if (window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => slotsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  function changeTimeZone(next: string) {
    setChosenTimeZone(next);
    // Same moment, but it may fall on a different day in the new time zone.
    setSelectedDate(selectedSlot ? toDateKey(new Date(selectedSlot), next) : null);
    setMonth(null);
  }

  function slotTaken(message: string) {
    setNotice(message);
    setSelectedSlot(null);
    reload();
    goTo("pick");
  }

  function confirmReschedule() {
    if (!rescheduling || !selectedSlot) return;
    setNotice(null);
    startTransition(async () => {
      try {
        const result = await rescheduleCall(rescheduling.token, { start: selectedSlot, timeZone });
        if (result.ok) {
          setBooking(result.booking);
          rescheduling.onRescheduled?.(result.booking);
          goTo("done");
          return;
        }
        if (result.code === "slot_taken") return slotTaken(result.message);
        setNotice(result.message);
      } catch {
        setNotice(`Sorry, we couldn't move your call. Please try again, or email us at ${siteConfig.email}.`);
      }
    });
  }

  function renderPicker() {
    if (state.status === "loading") return <PickerSkeleton />;
    if (state.status === "error") return <PickerError reason={state.reason} onRetry={reload} />;
    if (!firstSlot || !today) {
      return (
        <PickerMessage
          title="No times available right now"
          text={`Every slot in the next ${bookingConfig.maxDaysAhead} days is taken. Message us and we'll find a time that works.`}
        />
      );
    }

    return (
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_13.5rem]">
        <div>
          <MonthCalendar
            month={visibleMonth}
            minMonth={minMonth}
            maxMonth={maxMonth}
            onMonthChange={setMonth}
            slotCounts={slotCounts}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
            today={today}
          />
          <div className="mt-6">
            <TimeZoneSelect value={timeZone} onChange={changeTimeZone} at={state.loadedAt} />
          </div>
        </div>
        <div ref={slotsRef} className="scroll-mt-28">
          <TimeSlotList
            timeZone={timeZone}
            slots={selectedDate ? (days.get(selectedDate) ?? null) : null}
            selectedSlot={selectedSlot}
            onSelectSlot={(slot) => {
              setSelectedSlot(slot);
              if (!rescheduling) void loadDetailsForm();
            }}
            onConfirm={() => goTo("details")}
            hour12={hour12}
            onHour12Change={setHour12}
            nextAvailable={firstSlot}
            onJumpToNextAvailable={() => {
              const day = toDateKey(firstSlot, timeZone);
              setMonth(day.slice(0, 7));
              selectDate(day);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="glass grid overflow-hidden rounded-3xl lg:grid-cols-[20rem_minmax(0,1fr)]">
      <MeetingSummary
        selected={selectedMeeting ?? undefined}
        previous={currentMeeting ?? undefined}
        timeZone={timeZone}
        hour12={hour12}
        className="border-b bg-background/30 lg:border-b-0 lg:border-r"
      />

      <div className="min-w-0 p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {step === "pick" && (
            <m.div key="pick" {...stepMotion}>
              <h2 ref={focusStepHeading} tabIndex={-1} className="scroll-mt-28 text-xl font-medium text-heading focus-visible:outline-none">
                {rescheduling ? "Pick a new date & time" : "Select a date & time"}
              </h2>
              {notice && <FormAlert className="mt-4">{notice}</FormAlert>}
              <div className="mt-6">{renderPicker()}</div>
            </m.div>
          )}

          {step === "details" && selectedSlot && (
            <m.div key="details" {...stepMotion}>
              <h2 ref={focusStepHeading} tabIndex={-1} className="scroll-mt-28 text-xl font-medium text-heading focus-visible:outline-none">
                {rescheduling ? "Confirm your new time" : "Enter your details"}
              </h2>
              <div className="mt-6">
                {rescheduling ? (
                  <div className="space-y-5">
                    {notice && <FormAlert>{notice}</FormAlert>}
                    <p className="leading-relaxed">
                      We&apos;ll move your call and send an updated invite to{" "}
                      <strong className="font-semibold text-heading">{rescheduling.current.email}</strong>.
                    </p>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                      <Button variant="ghost" onClick={() => goTo("pick")} disabled={pending}>
                        <ArrowLeft aria-hidden="true" />
                        Change time
                      </Button>
                      <Button variant="gradient" size="lg" onClick={confirmReschedule} disabled={pending}>
                        {pending ? (
                          <>
                            <Loader2 className="animate-spin" aria-hidden="true" />
                            Moving your call...
                          </>
                        ) : (
                          <>
                            <CalendarClock aria-hidden="true" />
                            Confirm new time
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <BookingDetailsForm
                    start={selectedSlot}
                    timeZone={timeZone}
                    draft={draft}
                    onBack={(values) => {
                      setDraft(values);
                      goTo("pick");
                    }}
                    onBooked={(result) => {
                      setBooking(result);
                      goTo("done");
                    }}
                    onSlotTaken={(message, values) => {
                      setDraft(values);
                      slotTaken(message);
                    }}
                  />
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PickerSkeleton() {
  return (
    <div aria-busy="true" className="grid gap-8 md:grid-cols-[minmax(0,1fr)_13.5rem]">
      <span className="sr-only">Loading available times...</span>
      <div aria-hidden="true">
        <div className="h-7 w-40 animate-pulse rounded-lg bg-surface" />
        <div className="mt-8 grid grid-cols-7 gap-y-3">
          {Array.from({ length: 35 }, (_, index) => (
            <span key={index} className="mx-auto size-10 animate-pulse rounded-full bg-surface sm:size-11" />
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="space-y-2">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className="block h-12 animate-pulse rounded-xl bg-surface" />
        ))}
      </div>
    </div>
  );
}

function PickerMessage({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <p className="font-heading text-lg font-medium text-heading">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed">{text}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {children}
        <Button asChild variant="outline">
          <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Booking a call")}`}>
            <Mail aria-hidden="true" />
            Email us
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={whatsappUrl("Hi Veloura Lunelle, I'd like to book a call.")} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            WhatsApp
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

function PickerError({ reason, onRetry }: { reason: "not_configured" | "unavailable"; onRetry: () => void }) {
  if (reason === "not_configured") {
    return (
      <PickerMessage
        title="Online booking is coming soon"
        text="In the meantime, send us a message and we'll set up a call at a time that suits you."
      />
    );
  }
  return (
    <PickerMessage title="We couldn't load the available times" text="Please try again in a moment, or contact us directly.">
      <Button variant="gradient" onClick={onRetry}>
        <RotateCw aria-hidden="true" />
        Try again
      </Button>
    </PickerMessage>
  );
}


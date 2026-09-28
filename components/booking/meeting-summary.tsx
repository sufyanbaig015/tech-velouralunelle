import { CalendarCheck, CalendarDays, CalendarX, Check, Clock, Globe, Video } from "lucide-react";

import { bookingConfig, bookingPage } from "@/content/booking";
import { formatLongDate, formatTime, timeZoneAbbreviation } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

type Meeting = { start: Date; end: Date; timeZone: string };

function MeetingTime({ meeting, hour12 = true }: { meeting: Meeting; hour12?: boolean }) {
  const { start, end, timeZone } = meeting;
  return (
    <>
      <span className="block">
        {formatTime(start, timeZone, hour12)} – {formatTime(end, timeZone, hour12)}
      </span>
      <span className="block">{formatLongDate(start, timeZone)}</span>
    </>
  );
}

type MeetingSummaryProps = {
  /** The time being booked. */
  selected?: Meeting;
  /** The current time, when rescheduling. */
  previous?: Meeting;
  timeZone: string;
  hour12?: boolean;
  className?: string;
};

// Left-hand panel of the scheduler: who, how long, where, and the chosen time.
export function MeetingSummary({ selected, previous, timeZone, hour12, className }: MeetingSummaryProps) {
  const details = [
    { icon: Clock, text: `${bookingConfig.durationMinutes} minutes` },
    { icon: Video, text: `${bookingPage.location} (link sent after booking)` },
    { icon: Globe, text: `Times shown in ${timeZone.replace(/_/g, " ")} (${timeZoneAbbreviation(timeZone)})` },
  ];

  return (
    <div className={cn("p-6 sm:p-8", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-b from-primary-light to-primary text-primary-foreground shadow-button">
          <CalendarDays className="size-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium">{bookingPage.hostName}</p>
      </div>
      <h2 className="mt-5 text-2xl font-medium leading-snug text-heading">{bookingConfig.meetingTitle}</h2>

      <ul className="mt-5 space-y-3 text-sm">
        {details.map(({ icon: Icon, text }) => (
          <li key={text} className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            {text}
          </li>
        ))}
        {previous && (
          <li className="flex gap-3 text-body/80">
            <CalendarX className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              <span className="sr-only">Current time: </span>
              <span className="line-through">
                <MeetingTime meeting={previous} hour12={hour12} />
              </span>
            </span>
          </li>
        )}
        {selected && (
          <li className="flex gap-3 rounded-xl border border-accent/30 bg-primary/10 p-3 font-medium text-heading duration-300 animate-in fade-in-0">
            <CalendarCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            <span>
              <span className="sr-only">{previous ? "New time: " : "Selected time: "}</span>
              <MeetingTime meeting={selected} hour12={hour12} />
            </span>
          </li>
        )}
      </ul>

      <div className="mt-8 hidden border-t pt-6 lg:block">
        <p className="text-sm font-semibold text-heading">What we&apos;ll cover</p>
        <ul className="mt-3 space-y-2.5 text-sm">
          {bookingPage.agenda.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { ArrowRight, CalendarSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatLongDate, formatShortDate, formatTime } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

type TimeSlotListProps = {
  timeZone: string;
  /** Open slots for the selected day, or null when no day is selected. */
  slots: Date[] | null;
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  onConfirm: () => void;
  hour12: boolean;
  onHour12Change: (hour12: boolean) => void;
  /** First open slot overall, offered as a shortcut before a day is picked. */
  nextAvailable?: Date;
  onJumpToNextAvailable: () => void;
};

export function TimeSlotList({
  timeZone,
  slots,
  selectedSlot,
  onSelectSlot,
  onConfirm,
  hour12,
  onHour12Change,
  nextAvailable,
  onJumpToNextAvailable,
}: TimeSlotListProps) {
  if (!slots) {
    return (
      <div className="flex h-full min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center">
        <CalendarSearch className="size-8 text-accent" aria-hidden="true" />
        <p className="mt-3 text-sm">Pick a day to see the available times.</p>
        {nextAvailable && (
          <Button variant="glass" size="sm" className="mt-5" onClick={onJumpToNextAvailable}>
            Next available: {formatShortDate(nextAvailable, timeZone)}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-medium text-heading">
          {formatLongDate(slots[0], timeZone).replace(/, \d{4}$/, "")}
        </h3>
        <div role="group" aria-label="Time format" className="flex shrink-0 rounded-lg border bg-background/60 p-0.5 text-xs">
          {[true, false].map((option) => (
            <button
              key={String(option)}
              type="button"
              aria-pressed={hour12 === option}
              onClick={() => onHour12Change(option)}
              className={cn(
                "rounded-md px-2 py-1 font-medium transition-colors focus-visible:rounded-md",
                hour12 === option ? "bg-primary text-primary-foreground" : "text-body hover:text-heading",
              )}
            >
              {option ? "12h" : "24h"}
            </button>
          ))}
        </div>
      </div>

      <ul aria-label="Available times" className="mt-4 space-y-2 md:max-h-[26rem] md:overflow-y-auto md:pr-1">
        {slots.map((slot) => {
          const iso = slot.toISOString();
          const time = formatTime(slot, timeZone, hour12);
          const selected = iso === selectedSlot;
          return (
            <li key={iso} className={cn("grid gap-2", selected && "grid-cols-2")}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelectSlot(iso)}
                className={cn(
                  "h-12 rounded-xl border text-sm font-semibold transition-all focus-visible:rounded-xl",
                  selected
                    ? "border-transparent bg-surface text-heading"
                    : "border-accent/40 text-accent hover:border-accent hover:bg-primary/10",
                )}
              >
                {time}
              </button>
              {selected && (
                <Button
                  variant="gradient"
                  className="h-12 duration-200 animate-in fade-in-0 slide-in-from-left-2"
                  onClick={onConfirm}
                  aria-label={`Next: book ${time}`}
                >
                  Next
                  <ArrowRight aria-hidden="true" />
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

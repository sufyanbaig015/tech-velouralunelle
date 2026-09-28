"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { addDays, weekdayOf } from "@/lib/booking/time";
import { cn } from "@/lib/utils";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Month and day keys are plain calendar values, so format them as UTC to avoid any shift.
const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const dayLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

const keyToUtcDate = (key: string) => new Date(`${key.length === 7 ? `${key}-01` : key}T00:00:00Z`);

function shiftMonth(month: string, delta: number) {
  const date = keyToUtcDate(month);
  date.setUTCMonth(date.getUTCMonth() + delta);
  return date.toISOString().slice(0, 7);
}

function daysInMonth(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
}

const keyMoves: Record<string, (key: string) => string> = {
  ArrowLeft: (key) => addDays(key, -1),
  ArrowRight: (key) => addDays(key, 1),
  ArrowUp: (key) => addDays(key, -7),
  ArrowDown: (key) => addDays(key, 7),
  Home: (key) => addDays(key, -weekdayOf(key)),
  End: (key) => addDays(key, 6 - weekdayOf(key)),
  PageUp: (key) => `${shiftMonth(key.slice(0, 7), -1)}-01`,
  PageDown: (key) => `${shiftMonth(key.slice(0, 7), 1)}-01`,
};

type MonthCalendarProps = {
  /** "YYYY-MM" */
  month: string;
  minMonth: string;
  maxMonth: string;
  onMonthChange: (month: string) => void;
  /** Number of open slots per day ("YYYY-MM-DD"). Days not in the map can't be picked. */
  slotCounts: Map<string, number>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  today: string;
};

export function MonthCalendar({
  month,
  minMonth,
  maxMonth,
  onMonthChange,
  slotCounts,
  selectedDate,
  onSelectDate,
  today,
}: MonthCalendarProps) {
  const [focusedDate, setFocusedDate] = useState<string | null>(null);
  const moveFocus = useRef(false);
  const gridRef = useRef<HTMLTableElement>(null);

  // After arrow-key navigation (possibly into another month), move focus to the new day.
  useEffect(() => {
    if (!moveFocus.current || !focusedDate) return;
    moveFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusedDate}"]`)?.focus();
  }, [focusedDate, month]);

  const totalDays = daysInMonth(month);
  const days = Array.from({ length: totalDays }, (_, index) => `${month}-${String(index + 1).padStart(2, "0")}`);
  const leadingBlanks = weekdayOf(days[0]);
  const cells: (string | null)[] = [...Array<null>(leadingBlanks).fill(null), ...days];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));

  // One day in the grid is tabbable; arrow keys move between days (roving tabindex).
  const inMonth = (key: string | null) => (key?.startsWith(month) ? key : null);
  const tabbableDate =
    inMonth(focusedDate) ?? inMonth(selectedDate) ?? days.find((day) => slotCounts.has(day)) ?? days[0];

  function handleKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    const move = keyMoves[event.key];
    const current = (event.target as HTMLElement).dataset.date;
    if (!move || !current) return;
    event.preventDefault();

    const next = move(current);
    const nextMonth = next.slice(0, 7);
    if (nextMonth < minMonth || nextMonth > maxMonth) return;
    if (nextMonth !== month) onMonthChange(nextMonth);
    moveFocus.current = true;
    setFocusedDate(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p aria-live="polite" className="font-heading text-lg font-medium text-heading">
          {monthLabel.format(keyToUtcDate(month))}
        </p>
        <div className="flex gap-1.5">
          <Button
            variant="glass"
            size="icon"
            className="size-9 rounded-full focus-visible:rounded-full"
            onClick={() => onMonthChange(shiftMonth(month, -1))}
            disabled={month <= minMonth}
            aria-label="Previous month"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="size-9 rounded-full focus-visible:rounded-full"
            onClick={() => onMonthChange(shiftMonth(month, 1))}
            disabled={month >= maxMonth}
            aria-label="Next month"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      <table ref={gridRef} onKeyDown={handleKeyDown} className="mt-5 w-full table-fixed border-separate border-spacing-y-1">
        <caption className="sr-only">
          Available days in {monthLabel.format(keyToUtcDate(month))}. Use the arrow keys to move between days.
        </caption>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th
                key={weekday}
                scope="col"
                abbr={weekday}
                className="pb-2 text-center text-xs font-semibold uppercase tracking-wider text-body"
              >
                {weekday.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (!day) return <td key={`blank-${dayIndex}`} />;
                const count = slotCounts.get(day) ?? 0;
                const available = count > 0;
                const selected = day === selectedDate;
                const isToday = day === today;
                return (
                  <td key={day} className="text-center">
                    <button
                      type="button"
                      data-date={day}
                      tabIndex={day === tabbableDate ? 0 : -1}
                      aria-disabled={!available || undefined}
                      aria-pressed={available ? selected : undefined}
                      aria-current={isToday ? "date" : undefined}
                      aria-label={`${dayLabel.format(keyToUtcDate(day))}, ${
                        available ? `${count} ${count === 1 ? "time" : "times"} available` : "no times available"
                      }`}
                      onClick={() => {
                        setFocusedDate(day);
                        if (available) onSelectDate(day);
                      }}
                      className={cn(
                        "relative mx-auto flex size-10 items-center justify-center rounded-full text-sm transition-colors focus-visible:rounded-full sm:size-11",
                        available && !selected && "bg-primary/15 font-semibold text-accent hover:bg-primary/30",
                        selected && "bg-primary font-semibold text-primary-foreground shadow-glow",
                        !available && "cursor-default text-body/40",
                      )}
                    >
                      {Number(day.slice(8))}
                      {isToday && (
                        <span aria-hidden="true" className="absolute bottom-1.5 size-1 rounded-full bg-current" />
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

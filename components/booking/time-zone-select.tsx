"use client";

import { Globe } from "lucide-react";
import { useMemo, useState } from "react";

import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { timeZoneOffsetLabel } from "@/lib/booking/time";

// "GMT-4" → -240, "GMT+5:30" → 330, "GMT" → 0
function offsetMinutes(label: string) {
  const match = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(label);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3] ?? 0);
  return match[1] === "-" ? -minutes : minutes;
}

const cityName = (zone: string) => zone.split("/").slice(1).join(" – ").replace(/_/g, " ") || zone;

/** Time zones grouped by region ("America", "Europe", …), each sorted by UTC offset. */
function groupTimeZones(current: string, at: Date) {
  const zones = new Set(Intl.supportedValuesOf("timeZone"));
  zones.add(current);

  const groups = new Map<string, { zone: string; label: string; offset: number }[]>();
  for (const zone of zones) {
    const region = zone.includes("/") ? zone.split("/")[0] : "Other";
    const offsetLabel = timeZoneOffsetLabel(zone, at);
    const entry = { zone, label: `${cityName(zone)} (${offsetLabel})`, offset: offsetMinutes(offsetLabel) };
    groups.set(region, [...(groups.get(region) ?? []), entry]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([region, entries]) => ({
      region,
      entries: entries.sort((a, b) => a.offset - b.offset || a.label.localeCompare(b.label)),
    }));
}

type TimeZoneSelectProps = {
  value: string;
  onChange: (timeZone: string) => void;
  /** Moment used for the GMT offsets (they change with daylight saving). */
  at: Date;
};

export function TimeZoneSelect({ value, onChange, at }: TimeZoneSelectProps) {
  // Working out ~430 offsets is slow on phones, so the full list is only built once the
  // select is focused or pressed (before it opens). Until then it holds the current zone.
  const [expanded, setExpanded] = useState(false);
  const groups = useMemo(() => (expanded ? groupTimeZones(value, at) : null), [expanded, value, at]);
  const expand = () => setExpanded(true);

  return (
    <div className="space-y-2">
      <Label htmlFor="booking-time-zone" className="flex items-center gap-2">
        <Globe className="size-4 text-accent" aria-hidden="true" />
        Time zone
      </Label>
      <NativeSelect
        id="booking-time-zone"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={expand}
        onPointerDown={expand}
      >
        {!groups && <option value={value}>{`${cityName(value)} (${timeZoneOffsetLabel(value, at)})`}</option>}
        {groups?.map(({ region, entries }) => (
          <optgroup key={region} label={region}>
            {entries.map(({ zone, label }) => (
              <option key={zone} value={zone}>
                {label}
              </option>
            ))}
          </optgroup>
        ))}
      </NativeSelect>
    </div>
  );
}

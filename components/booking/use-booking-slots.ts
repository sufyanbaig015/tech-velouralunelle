"use client";

import { useCallback, useEffect, useState } from "react";

export type SlotsState =
  | { status: "loading" }
  | { status: "ready"; slots: Date[]; loadedAt: Date }
  | { status: "error"; reason: "not_configured" | "unavailable" };

/** Loads open start times from /api/booking/slots. Pass a manage token when rescheduling. */
export function useBookingSlots(token?: string) {
  const [state, setState] = useState<SlotsState>({ status: "loading" });
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const query = token ? `?token=${encodeURIComponent(token)}` : "";

    fetch(`/api/booking/slots${query}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as { slots?: string[]; error?: string };
        if (!response.ok || !data.slots) {
          setState({ status: "error", reason: data.error === "not_configured" ? "not_configured" : "unavailable" });
          return;
        }
        setState({ status: "ready", slots: data.slots.map((slot) => new Date(slot)), loadedAt: new Date() });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error", reason: "unavailable" });
      });

    return () => controller.abort();
  }, [token, requestId]);

  const reload = useCallback(() => {
    setState({ status: "loading" });
    setRequestId((id) => id + 1);
  }, []);

  return { state, reload };
}

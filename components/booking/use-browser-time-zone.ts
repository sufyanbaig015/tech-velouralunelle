"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getBrowserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

/** The visitor's time zone. Null while server rendering, so hydration never mismatches. */
export function useBrowserTimeZone() {
  return useSyncExternalStore(subscribe, getBrowserTimeZone, () => null);
}

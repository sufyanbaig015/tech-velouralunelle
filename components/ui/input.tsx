import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// Shared look for text inputs, textareas, and selects.
export const fieldStyles =
  "w-full rounded-xl border bg-surface px-4 text-sm text-heading shadow-soft transition-colors placeholder:text-body/70 hover:border-primary/40 focus-visible:rounded-xl focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-soft";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldStyles, "h-11", className)} {...props} />;
}

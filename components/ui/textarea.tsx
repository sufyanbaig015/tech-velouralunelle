import type { ComponentProps } from "react";

import { fieldStyles } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldStyles, "min-h-36 resize-y py-3 leading-relaxed", className)} {...props} />;
}

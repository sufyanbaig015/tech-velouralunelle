import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";

import { fieldStyles } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NativeSelect({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(fieldStyles, "h-11 cursor-pointer appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-body"
        aria-hidden="true"
      />
    </div>
  );
}

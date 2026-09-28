import { CalendarDays } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type BookCallButtonProps = Pick<ComponentProps<typeof Button>, "variant" | "size" | "className"> & {
  label?: string;
};

export function BookCallButton({ label = "Book a Call", variant = "gradient", ...props }: BookCallButtonProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer">
        <CalendarDays aria-hidden="true" />
        {label}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </Button>
  );
}

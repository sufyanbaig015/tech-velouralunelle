import { CalendarDays } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type BookCallButtonProps = Pick<ComponentProps<typeof Button>, "variant" | "size" | "className"> & {
  label?: string;
};

export function BookCallButton({ label = "Book a Call", variant = "gradient", ...props }: BookCallButtonProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <Link href="/book">
        <CalendarDays aria-hidden="true" />
        {label}
      </Link>
    </Button>
  );
}

"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Minus, Plus } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "glass rounded-2xl px-5 transition-colors data-[state=open]:border-accent/40 sm:px-6",
        className,
      )}
      {...props}
    />
  );
}

type AccordionTriggerProps = ComponentProps<typeof AccordionPrimitive.Trigger> & {
  /** "chevron" rotates on open; "plus" swaps a plus for a minus in a round button. */
  indicator?: "chevron" | "plus";
};

export function AccordionTrigger({ className, children, indicator = "chevron", ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left font-heading text-base font-medium text-heading transition-colors hover:text-accent sm:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        {indicator === "chevron" ? (
          <ChevronDown
            className="size-5 shrink-0 text-accent transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-background/60 text-heading shadow-soft"
          >
            <Plus className="size-4 group-data-[state=open]:hidden" />
            <Minus className="hidden size-4 group-data-[state=open]:block" />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// forceMount keeps closed answers in the server HTML so search engines can read them.
export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      forceMount
      className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-5 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

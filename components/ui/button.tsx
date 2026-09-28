import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:rounded-xl disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-button hover:bg-primary-hover",
        gradient:
          "bg-gradient-to-b from-primary to-primary-hover text-primary-foreground shadow-button ring-1 ring-inset ring-primary-light/60 hover:-translate-y-0.5 hover:shadow-glow",
        outline: "glass text-heading hover:border-accent/40 hover:bg-surface",
        glass:
          "border border-accent/25 bg-primary/10 text-heading shadow-soft backdrop-blur hover:border-accent/50 hover:bg-primary/20",
        ghost: "text-heading hover:bg-primary-foreground/5",
        inverse: "bg-primary-foreground text-background shadow-soft hover:-translate-y-0.5 hover:bg-heading",
        "inverse-outline":
          "border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

import Link from "next/link";
import type { ComponentProps } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground shadow-glow transition-transform duration-200 group-hover:rotate-6"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M14.5 3.2a8.8 8.8 0 1 0 6.3 15 7.2 7.2 0 0 1-6.3-15Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-heading text-lg font-semibold tracking-tight text-heading">{siteConfig.shortName}</span>
        <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">Technologies</span>
      </span>
    </Link>
  );
}

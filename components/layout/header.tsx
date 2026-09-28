"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BookCallButton } from "@/components/layout/book-call-button";
import { Logo } from "@/components/layout/logo";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Floating glass navigation bar. Page heroes pull themselves up underneath it (see PageHero / Hero).
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 pt-3 sm:pt-4">
      <div className="container">
        <div className="glass flex h-16 items-center justify-between gap-6 rounded-2xl pl-4 pr-3 sm:pl-5 lg:h-[4.5rem]">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:text-heading focus-visible:rounded-xl",
                        active ? "bg-primary/15 text-heading" : "text-heading/75",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BookCallButton size="sm" variant="glass" className="hidden h-10 sm:inline-flex" />

            <Sheet>
              <SheetTrigger className="inline-flex size-10 items-center justify-center rounded-xl text-heading transition-colors hover:bg-primary-foreground/5 focus-visible:rounded-xl lg:hidden">
                <Menu className="size-6" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetClose asChild>
                  <Logo className="self-start" />
                </SheetClose>

                <nav aria-label="Mobile" className="mt-10">
                  <ul className="flex flex-col gap-1">
                    {mainNav.map((item) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "block rounded-xl px-4 py-3 font-heading text-lg font-medium transition-colors hover:bg-primary/10 focus-visible:rounded-xl",
                                active ? "bg-primary/15 text-heading" : "text-heading/80",
                              )}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-auto pt-8">
                  <BookCallButton size="lg" label="Book a Free Call" className="w-full" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

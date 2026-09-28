import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container flex flex-col items-center py-24 text-center sm:py-32">
      <p className="font-heading text-7xl font-medium text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-md text-lg">
        The page may have moved, or the link may be wrong. Let&apos;s get you back on track.
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          Back to home
        </Link>
      </Button>
    </section>
  );
}

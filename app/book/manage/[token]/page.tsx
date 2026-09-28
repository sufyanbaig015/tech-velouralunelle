import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ManageBooking } from "@/components/booking/manage-booking";
import { PageHero } from "@/components/page-hero";
import { getBookingByToken, hasStarted, toPublicBooking } from "@/lib/booking/bookings";
import { isDatabaseConfigured } from "@/lib/booking/db";

export const metadata: Metadata = {
  title: "Manage your booking",
  // Private page: keep it out of search results and don't leak the link to other sites.
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type ManagePageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ action?: string }>;
};

export default async function ManageBookingPage({ params, searchParams }: ManagePageProps) {
  const [{ token }, { action }] = await Promise.all([params, searchParams]);
  if (!isDatabaseConfigured() || token.length > 100) notFound();

  const booking = await getBookingByToken(token);
  if (!booking) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Book a call", href: "/book" },
          { label: "Manage booking" },
        ]}
        title="Manage your booking"
        description="Check your call details, pick a new time, or cancel. Any change is emailed to you and to our team."
      />
      <section aria-label="Your booking" className="container py-12 sm:py-16">
        <ManageBooking
          token={token}
          booking={toPublicBooking(booking)}
          hasStarted={hasStarted(booking)}
          initialAction={action === "reschedule" || action === "cancel" ? action : undefined}
        />
      </section>
    </>
  );
}

"use client";

import { CalendarX, Loader2 } from "lucide-react";
import { useTransition } from "react";

import { cancelBookingAsHost } from "@/app/admin/bookings/actions";
import { Button } from "@/components/ui/button";

export function AdminCancelButton({ bookingId, guestName }: { bookingId: string; guestName: string }) {
  const [pending, startTransition] = useTransition();

  function cancel() {
    const reason = window.prompt(
      `Cancel the call with ${guestName}? They will get an email.\n\nReason (optional, included in the email):`,
    );
    if (reason === null) return;
    startTransition(async () => {
      const result = await cancelBookingAsHost(bookingId, reason);
      if (!result.ok) window.alert(result.message);
    });
  }

  return (
    <Button variant="outline" size="sm" onClick={cancel} disabled={pending}>
      {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <CalendarX aria-hidden="true" />}
      {pending ? "Cancelling..." : "Cancel"}
    </Button>
  );
}

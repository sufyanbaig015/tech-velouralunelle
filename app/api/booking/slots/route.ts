import { NextResponse, type NextRequest } from "next/server";

import { bookingWindow, getAvailableSlots } from "@/lib/booking/availability";
import { getBookingByToken } from "@/lib/booking/bookings";
import { isDatabaseConfigured } from "@/lib/booking/db";

const noStore = { "Cache-Control": "no-store" };

// Open start times (UTC ISO strings) for the whole booking window.
// `?token=` (from a manage link) leaves that booking out, so it can be moved to a nearby time.
export async function GET(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503, headers: noStore });
  }

  try {
    const token = request.nextUrl.searchParams.get("token");
    const booking = token && token.length <= 100 ? await getBookingByToken(token) : undefined;
    const ignore =
      booking?.status === "confirmed" ? { id: booking.id, start: booking.start_at, end: booking.end_at } : undefined;

    const { earliest, latest } = bookingWindow();
    const slots = await getAvailableSlots(earliest, latest, ignore);
    return NextResponse.json({ slots: slots.map((slot) => slot.toISOString()) }, { headers: noStore });
  } catch (error) {
    console.error("Booking: could not load available times.", error);
    return NextResponse.json({ error: "unavailable" }, { status: 500, headers: noStore });
  }
}

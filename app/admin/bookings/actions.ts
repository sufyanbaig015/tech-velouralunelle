"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { isAdminAuthorized } from "@/lib/admin-auth";
import { cancelBookingById } from "@/lib/booking/bookings";

// Server actions can be called from any page, so this checks the session cookie itself
// instead of relying on proxy.ts.
export async function cancelBookingAsHost(id: unknown, reason: unknown) {
  if (!(await isAdminAuthorized())) {
    return { ok: false as const, message: "Please sign in again." };
  }
  const parsedId = z.uuid().safeParse(id);
  const parsedReason = z.string().trim().max(500).safeParse(reason ?? "");
  if (!parsedId.success || !parsedReason.success) return { ok: false as const, message: "Invalid request." };

  try {
    const result = await cancelBookingById(parsedId.data, parsedReason.data);
    revalidatePath("/admin/bookings");
    return result;
  } catch (error) {
    console.error("Admin: could not cancel booking.", error);
    return { ok: false as const, message: "Could not cancel the booking. Please try again." };
  }
}

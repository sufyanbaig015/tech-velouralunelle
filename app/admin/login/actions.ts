"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  ADMIN_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  isAdminPasswordConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(200),
  next: z.string().optional(),
});

function safeAdminPath(next: string | undefined) {
  if (!next || !next.startsWith("/admin") || next.startsWith("//") || next.includes("://")) {
    return "/admin/bookings";
  }
  return next;
}

export async function signInAsAdmin(input: unknown) {
  if (!isAdminPasswordConfigured()) {
    return { ok: false as const, message: "Admin access is not configured yet." };
  }

  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Enter your username and password." };
  }

  if (!verifyAdminCredentials(parsed.data.username, parsed.data.password)) {
    return { ok: false as const, message: "Incorrect username or password." };
  }

  const token = await createAdminSessionToken();
  (await cookies()).set(ADMIN_COOKIE, token, adminSessionCookieOptions());
  redirect(safeAdminPath(parsed.data.next));
}

export async function signOutAsAdmin() {
  (await cookies()).set(ADMIN_COOKIE, "", adminSessionCookieOptions(0));
  redirect("/admin/login");
}

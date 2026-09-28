// Cookie session for /admin. Used by proxy.ts (pages) and by admin server actions.

import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vl_admin_session";
const SESSION_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

const encoder = new TextEncoder();

// Compares without stopping at the first difference, so timing doesn't leak the password.
function safeEqual(a: string, b: string) {
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index++) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return difference === 0;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function sessionSecret() {
  const password = process.env.ADMIN_PASSWORD;
  return password ? `vl-admin:${password}` : null;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

async function signPayload(payload: string, secret: string) {
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

/** True when ADMIN_PASSWORD is set (otherwise the admin area stays locked). */
export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Check username + password against env. */
export function verifyAdminCredentials(username: string, password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return false;
  const userMatches = safeEqual(username, process.env.ADMIN_USERNAME || "admin");
  const passwordMatches = safeEqual(password, expectedPassword);
  return userMatches && passwordMatches;
}

/** Create a signed session token for the admin cookie. */
export async function createAdminSessionToken() {
  const secret = sessionSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD is not set.");
  return signPayload(`v1.${Date.now() + SESSION_MS}`, secret);
}

/** True when the cookie value is a valid, unexpired admin session. */
export async function isValidAdminSession(token: string | undefined | null) {
  if (!token) return false;
  const secret = sessionSecret();
  if (!secret) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const [version, expiryRaw] = payload.split(".");
  if (version !== "v1" || !expiryRaw) return false;

  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  try {
    return crypto.subtle.verify("HMAC", await hmacKey(secret), fromBase64Url(signature), encoder.encode(payload));
  } catch {
    return false;
  }
}

/** Cookie options for the admin session. */
export function adminSessionCookieOptions(maxAgeSeconds = Math.floor(SESSION_MS / 1000)) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/admin",
    maxAge: maxAgeSeconds,
  };
}

/** True when the current request has a valid admin session cookie. */
export async function isAdminAuthorized() {
  const jar = await cookies();
  return isValidAdminSession(jar.get(ADMIN_COOKIE)?.value);
}

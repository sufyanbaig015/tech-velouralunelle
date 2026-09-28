import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

// Cookie-protects /admin. Login page is public; everything else needs a valid session.
// With no ADMIN_PASSWORD set, sessions never validate and the area stays locked.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login" || pathname.startsWith("/admin/login/");
  const authorized = await isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);

  if (isLogin) {
    if (authorized) {
      return NextResponse.redirect(new URL("/admin/bookings", request.url));
    }
    return NextResponse.next();
  }

  if (authorized) return NextResponse.next();

  const loginUrl = new URL("/admin/login", request.url);
  if (pathname !== "/admin" && pathname !== "/admin/") {
    loginUrl.searchParams.set("next", pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};

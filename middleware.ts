import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { PARTNER_SESSION_COOKIE, verifyPartnerSessionToken } from "@/lib/partner-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const isValid = await verifySessionToken(token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Partner portal routes
  if (pathname.startsWith("/partner-portal")) {
    if (pathname === "/partner-portal/login") return NextResponse.next();
    const token = request.cookies.get(PARTNER_SESSION_COOKIE)?.value;
    const result = await verifyPartnerSessionToken(token);
    if (!result) {
      return NextResponse.redirect(new URL("/partner-portal/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/partner-portal/:path*"],
};

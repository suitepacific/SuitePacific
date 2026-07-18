import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { PARTNER_SESSION_COOKIE, verifyPartnerSessionToken } from "@/lib/partner-auth";
import { CUSTOMER_SESSION_COOKIE, verifyCustomerSessionToken } from "@/lib/customer-auth";
import { SC_SESSION_COOKIE, verifyScSessionToken } from "@/lib/sc-auth";

// In-memory rate limiting for login endpoints.
// Per edge instance (not distributed), but effective as a first line of defense
// combined with Vercel's infrastructure-level DDoS protection.
const loginAttempts = new Map<string, number[]>();
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX = 10; // max login attempts per IP per window

const LOGIN_PATHS = new Set([
  "/admin/login",
  "/partner-portal/login",
  "/customer-portal/login",
  "/suitecompare/login",
  "/suitecompare/signup",
  "/suitecompare/verify",
  "/suitecompare/forgot-password",
  "/suitecompare/reset-password",
]);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = loginAttempts.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  loginAttempts.set(ip, recent);

  // Prevent unbounded memory growth
  if (loginAttempts.size > 5000) {
    for (const [key, times] of loginAttempts) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) loginAttempts.delete(key);
    }
  }

  return recent.length > RATE_MAX;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate-limit login form submissions (Server Actions POST to the page URL)
  if (request.method === "POST" && LOGIN_PATHS.has(pathname)) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    if (isRateLimited(ip)) {
      return new NextResponse("Too many login attempts. Please try again in 15 minutes.", {
        status: 429,
        headers: { "Retry-After": "900", "Content-Type": "text/plain" },
      });
    }
  }

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

  // Customer portal routes
  if (pathname.startsWith("/customer-portal")) {
    if (pathname === "/customer-portal/login") return NextResponse.next();
    const token = request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value;
    const result = await verifyCustomerSessionToken(token);
    if (!result) {
      return NextResponse.redirect(new URL("/customer-portal/login", request.url));
    }
    return NextResponse.next();
  }

  // SuiteCompare routes
  if (pathname.startsWith("/suitecompare")) {
    if (
      pathname === "/suitecompare" ||
      pathname === "/suitecompare/login" ||
      pathname === "/suitecompare/signup" ||
      pathname === "/suitecompare/verify" ||
      pathname === "/suitecompare/forgot-password" ||
      pathname === "/suitecompare/reset-password"
    ) {
      return NextResponse.next();
    }
    const token = request.cookies.get(SC_SESSION_COOKIE)?.value;
    const result = await verifyScSessionToken(token);
    if (!result) {
      return NextResponse.redirect(new URL("/suitecompare/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/partner-portal/:path*",
    "/customer-portal/:path*",
    "/suitecompare/:path*",
  ],
};

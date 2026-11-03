import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export const INTERNAL_COOKIE = "sp_internal";
export const INTERNAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Local dev and preview deploys share the production database, so only production traffic is recorded.
export function isInternalRequest(request: NextRequest) {
  return (
    process.env.VERCEL_ENV !== "production" ||
    request.cookies.has(INTERNAL_COOKIE) ||
    request.cookies.has(ADMIN_SESSION_COOKIE)
  );
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Country only, from the hosting provider's edge header; used to decide whether to show the consent banner
export function GET(request: NextRequest) {
  return NextResponse.json(
    { country: request.headers.get("x-vercel-ip-country") },
    { headers: { "Cache-Control": "no-store" } },
  );
}

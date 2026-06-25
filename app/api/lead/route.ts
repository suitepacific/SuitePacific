import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Email delivery happens client-side (see LeadForm.tsx) — FormSubmit sits behind
// Cloudflare, which challenges server-to-server requests from Vercel's IPs with a
// JS challenge page that a backend can never solve. This route only persists the lead.
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const company = String(formData.get("company") ?? "");
  const message = formData.get("message") ? String(formData.get("message")) : null;

  if (!name || !email || !company) {
    return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
  }

  try {
    await prisma.leadSubmission.create({ data: { name, email, company, message } });
  } catch (error) {
    console.error("Failed to save lead to database:", error);
  }

  return NextResponse.json({ success: true });
}

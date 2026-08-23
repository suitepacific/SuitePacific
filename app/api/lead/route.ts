import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// Email delivery happens client-side (see LeadForm.tsx) - FormSubmit sits behind
// Cloudflare, which challenges server-to-server requests from Vercel's IPs with a
// JS challenge page that a backend can never solve. This route only persists the lead.
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const company = String(formData.get("company") ?? "").trim();
  const message = formData.get("message") ? String(formData.get("message")).trim() : null;
  const sourcePage = formData.get("sourcePage") ? String(formData.get("sourcePage")).trim() : null;

  if (!email) {
    return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
  }
  if (name.length > 200) return NextResponse.json({ success: false, error: "Name too long." }, { status: 400 });
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email address." }, { status: 400 });
  }
  if (company.length > 200) return NextResponse.json({ success: false, error: "Company too long." }, { status: 400 });
  if (message && message.length > 5000) {
    return NextResponse.json({ success: false, error: "Message too long." }, { status: 400 });
  }

  try {
    await prisma.leadSubmission.create({
      data: {
        name: name.slice(0, 200),
        email: email.slice(0, 254),
        company: company.slice(0, 200),
        message: message?.slice(0, 5000) ?? null,
        sourcePage: sourcePage?.slice(0, 2000) ?? null,
      },
    });
  } catch (error) {
    console.error("Failed to save lead to database:", error);
  }

  return NextResponse.json({ success: true });
}

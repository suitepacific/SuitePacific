import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const resend = new Resend(process.env.RESEND_API_KEY);

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

  resend.emails.send({
    from: "SuitePacific <noreply@suitepacific.com>",
    to: "info@suitepacific.com",
    subject: `New lead: ${name || email}`,
    html: `
      <p><strong>Name:</strong> ${name || "(not provided)"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "(not provided)"}</p>
      ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
      ${sourcePage ? `<p><strong>Source:</strong> ${sourcePage}</p>` : ""}
    `,
  }).catch((err) => console.error("Failed to send lead notification email:", err));

  return NextResponse.json({ success: true });
}

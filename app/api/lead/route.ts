import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { FORMSUBMIT_ENDPOINT } from "@/lib/content";

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

  try {
    await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("Failed to forward lead to FormSubmit:", error);
  }

  return NextResponse.json({ success: true });
}

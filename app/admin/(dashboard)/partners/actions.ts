"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/partner-auth";
import { requireAdmin } from "@/lib/auth";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function createPartnerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const company = (formData.get("company") as string)?.trim() || null;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "Name, email, and password are required." };
  if (name.length > 200) return { error: "Name is too long." };
  if (email.length > 254) return { error: "Email is too long." };
  if (!EMAIL_RE.test(email)) return { error: "Invalid email address." };
  if (company && company.length > 200) return { error: "Company name is too long." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password.length > 200) return { error: "Password is too long." };

  const existing = await prisma.partner.findUnique({ where: { email } });
  if (existing) return { error: "A partner with this email already exists." };

  const passwordHash = await hashPassword(password);
  await prisma.partner.create({ data: { name, email, company, passwordHash } });

  redirect("/admin/partners");
}

export async function togglePartnerStatusAction(partnerId: string) {
  await requireAdmin();

  if (!partnerId || typeof partnerId !== "string" || partnerId.length > 100) return;

  // Re-fetch status from DB — never trust client-supplied state for toggling
  const partner = await prisma.partner.findUnique({ where: { id: partnerId }, select: { status: true } });
  if (!partner) return;

  const newStatus = partner.status === "active" ? "suspended" : "active";
  await prisma.partner.update({ where: { id: partnerId }, data: { status: newStatus } });
  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${partnerId}`);
}

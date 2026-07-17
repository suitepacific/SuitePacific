"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/partner-auth";
import { requireAdmin } from "@/lib/auth";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const VALID_PAYMENT_METHODS = new Set(["bank_transfer", "paypal", "wise", "check", ""]);

export async function createPartnerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const company = (formData.get("company") as string)?.trim() || null;
  const website = (formData.get("website") as string)?.trim() || null;
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const commissionRateRaw = (formData.get("commissionRate") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "Name, email, and password are required." };
  if (name.length > 200) return { error: "Name is too long." };
  if (email.length > 254 || !EMAIL_RE.test(email)) return { error: "Invalid email address." };
  if (company && company.length > 200) return { error: "Company name is too long." };
  if (password.length < 8 || password.length > 200) return { error: "Password must be 8–200 characters." };

  const commissionRate = commissionRateRaw ? parseFloat(commissionRateRaw) : null;
  if (commissionRate !== null && (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100)) {
    return { error: "Commission rate must be between 0 and 100." };
  }

  const existing = await prisma.partner.findUnique({ where: { email } });
  if (existing) return { error: "A partner with this email already exists." };

  const passwordHash = await hashPassword(password);
  await prisma.partner.create({
    data: { name, email, company, website, country, commissionRate, passwordHash },
  });

  redirect("/admin/partners");
}

export async function updatePartnerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  if (!id) return { error: "Missing partner ID." };

  const company = (formData.get("company") as string)?.trim().slice(0, 200) || null;
  const website = (formData.get("website") as string)?.trim().slice(0, 500) || null;
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const timezone = (formData.get("timezone") as string)?.trim().slice(0, 100) || null;
  const commissionRateRaw = (formData.get("commissionRate") as string)?.trim();
  const preferredPaymentMethod = (formData.get("preferredPaymentMethod") as string)?.trim() || null;
  const paymentDetails = (formData.get("paymentDetails") as string)?.trim().slice(0, 2000) || null;
  const taxId = (formData.get("taxId") as string)?.trim().slice(0, 100) || null;

  if (preferredPaymentMethod && !VALID_PAYMENT_METHODS.has(preferredPaymentMethod)) {
    return { error: "Invalid payment method." };
  }

  const commissionRate = commissionRateRaw ? parseFloat(commissionRateRaw) : null;
  if (commissionRate !== null && (isNaN(commissionRate) || commissionRate < 0 || commissionRate > 100)) {
    return { error: "Commission rate must be between 0 and 100." };
  }

  await prisma.partner.update({
    where: { id },
    data: { company, website, country, timezone, commissionRate, preferredPaymentMethod, paymentDetails, taxId },
  });

  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${id}`);
  return { success: true };
}

export async function togglePartnerStatusAction(partnerId: string) {
  await requireAdmin();
  if (!partnerId || partnerId.length > 100) return;
  const partner = await prisma.partner.findUnique({ where: { id: partnerId }, select: { status: true } });
  if (!partner) return;
  const newStatus = partner.status === "active" ? "suspended" : "active";
  await prisma.partner.update({ where: { id: partnerId }, data: { status: newStatus } });
  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${partnerId}`);
}

export async function archivePartnerAction(partnerId: string) {
  await requireAdmin();
  if (!partnerId || partnerId.length > 100) return;
  await prisma.partner.update({ where: { id: partnerId }, data: { archivedAt: new Date(), status: "suspended" } });
  revalidatePath("/admin/partners");
}

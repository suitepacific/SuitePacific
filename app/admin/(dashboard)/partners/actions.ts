"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/partner-auth";
import { revalidatePath } from "next/cache";

export async function createPartnerAction(_prev: unknown, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const company = (formData.get("company") as string)?.trim() || null;
  const password = (formData.get("password") as string);

  if (!name || !email || !password) return { error: "Name, email, and password are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const existing = await prisma.partner.findUnique({ where: { email } });
  if (existing) return { error: "A partner with this email already exists." };

  const passwordHash = await hashPassword(password);
  await prisma.partner.create({ data: { name, email, company, passwordHash } });

  redirect("/admin/partners");
}

export async function togglePartnerStatusAction(partnerId: string, currentStatus: string) {
  const newStatus = currentStatus === "active" ? "suspended" : "active";
  await prisma.partner.update({ where: { id: partnerId }, data: { status: newStatus } });
  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${partnerId}`);
}

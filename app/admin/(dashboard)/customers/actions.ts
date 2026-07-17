"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/customer-auth";
import { requireAdmin } from "@/lib/auth";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function createCustomerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const company = (formData.get("company") as string)?.trim();
  const website = (formData.get("website") as string)?.trim() || null;
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const password = formData.get("password") as string;

  if (!name || !email || !company || !password) return { error: "Name, email, company, and password are required." };
  if (name.length > 200) return { error: "Name is too long." };
  if (email.length > 254 || !EMAIL_RE.test(email)) return { error: "Invalid email address." };
  if (company.length > 200) return { error: "Company name is too long." };
  if (password.length < 8 || password.length > 200) return { error: "Password must be 8–200 characters." };

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) return { error: "A customer with this email already exists." };

  const passwordHash = await hashPassword(password);
  await prisma.customer.create({ data: { name, email, company, website, country, passwordHash } });

  redirect("/admin/customers");
}

export async function updateCustomerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  if (!id) return { error: "Missing customer ID." };

  const company = (formData.get("company") as string)?.trim().slice(0, 200) || null;
  const website = (formData.get("website") as string)?.trim().slice(0, 500) || null;
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const timezone = (formData.get("timezone") as string)?.trim().slice(0, 100) || null;

  if (!company) return { error: "Company name is required." };

  await prisma.customer.update({ where: { id }, data: { company, website, country, timezone } });
  revalidatePath(`/admin/customers/${id}`);
  return { success: true };
}

export async function toggleCustomerStatusAction(customerId: string) {
  await requireAdmin();
  if (!customerId || customerId.length > 100) return;
  const customer = await prisma.customer.findUnique({ where: { id: customerId }, select: { status: true } });
  if (!customer) return;
  const newStatus = customer.status === "active" ? "suspended" : "active";
  await prisma.customer.update({ where: { id: customerId }, data: { status: newStatus } });
  revalidatePath("/admin/customers");
  revalidatePath(`/admin/customers/${customerId}`);
}

export async function archiveCustomerAction(customerId: string) {
  await requireAdmin();
  if (!customerId || customerId.length > 100) return;
  await prisma.customer.update({
    where: { id: customerId },
    data: { archivedAt: new Date(), status: "suspended" },
  });
  revalidatePath("/admin/customers");
}

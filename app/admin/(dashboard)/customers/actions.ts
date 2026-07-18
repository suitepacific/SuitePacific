"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/customer-auth";
import { requireAdmin } from "@/lib/auth";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function safeUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const p = new URL(raw);
    return p.protocol === "https:" || p.protocol === "http:" ? raw : null;
  } catch { return null; }
}

export async function createCustomerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const company = (formData.get("company") as string)?.trim();
  const websiteRaw = (formData.get("website") as string)?.trim() || null;
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const password = formData.get("password") as string;

  if (!name || !email || !company || !password) return { error: "Name, email, company, and password are required." };
  if (name.length > 200) return { error: "Name is too long." };
  if (email.length > 254 || !EMAIL_RE.test(email)) return { error: "Invalid email address." };
  if (company.length > 200) return { error: "Company name is too long." };
  if (password.length < 8 || password.length > 200) return { error: "Password must be 8–200 characters." }

  const website = safeUrl(websiteRaw);
  if (websiteRaw && !website) return { error: "Website must be a valid http or https URL." };;

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) return { error: "A customer with this email already exists." };

  const billingType = (formData.get("billingType") as string) || "HOURLY";
  const validBillingTypes = ["HOURLY", "MONTHLY", "HYBRID"];
  const billingCurrency = (formData.get("billingCurrency") as string)?.trim().slice(0, 10).toUpperCase() || "USD";
  const hourlyRateRaw = parseFloat(formData.get("hourlyRate") as string);
  const monthlyRateRaw = parseFloat(formData.get("monthlyRate") as string);

  if (!validBillingTypes.includes(billingType)) return { error: "Invalid billing type." };
  const hourlyRate = !isNaN(hourlyRateRaw) && hourlyRateRaw >= 0 ? hourlyRateRaw : null;
  const monthlyRate = !isNaN(monthlyRateRaw) && monthlyRateRaw >= 0 ? monthlyRateRaw : null;

  const passwordHash = await hashPassword(password);
  await prisma.customer.create({
    data: { name, email, company, website, country, passwordHash, billingType: billingType as "HOURLY" | "MONTHLY" | "HYBRID", hourlyRate, monthlyRate, billingCurrency },
  });

  redirect("/admin/customers");
}

export async function updateCustomerAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  if (!id || id.length > 100) return { error: "Missing customer ID." };

  const customer = await prisma.customer.findUnique({ where: { id }, select: { id: true } });
  if (!customer) return { error: "Customer not found." };

  const company = (formData.get("company") as string)?.trim().slice(0, 200) || null;
  const websiteRaw2 = (formData.get("website") as string)?.trim().slice(0, 500) || null;
  const website = safeUrl(websiteRaw2);
  if (websiteRaw2 && !website) return { error: "Website must be a valid http or https URL." };
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const timezone = (formData.get("timezone") as string)?.trim().slice(0, 100) || null;

  const billingType = (formData.get("billingType") as string) || "HOURLY";
  const validBillingTypes = ["HOURLY", "MONTHLY", "HYBRID"];
  const billingCurrency = (formData.get("billingCurrency") as string)?.trim().slice(0, 10).toUpperCase() || "USD";
  const hourlyRateRaw = parseFloat(formData.get("hourlyRate") as string);
  const monthlyRateRaw = parseFloat(formData.get("monthlyRate") as string);

  if (!company) return { error: "Company name is required." };
  if (!validBillingTypes.includes(billingType)) return { error: "Invalid billing type." };
  const hourlyRate = !isNaN(hourlyRateRaw) && hourlyRateRaw >= 0 ? hourlyRateRaw : null;
  const monthlyRate = !isNaN(monthlyRateRaw) && monthlyRateRaw >= 0 ? monthlyRateRaw : null;

  await prisma.customer.update({
    where: { id },
    data: { company, website, country, timezone, billingType: billingType as "HOURLY" | "MONTHLY" | "HYBRID", hourlyRate, monthlyRate, billingCurrency },
  });
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

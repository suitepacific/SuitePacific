"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hashPassword } from "@/lib/employee-auth";

export async function createEmployeeAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string) ?? "";
  const customerId = (formData.get("customerId") as string)?.trim();

  if (!name || name.length > 100) return { error: "Name is required." };
  if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Valid email is required." };
  if (!password || password.length < 8) return { error: "Password must be at least 8 characters." };
  if (!customerId) return { error: "Assign a customer." };

  const existing = await prisma.employee.findUnique({ where: { email } });
  if (existing) return { error: "An employee with this email already exists." };

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) return { error: "Customer not found." };

  const passwordHash = await hashPassword(password);
  await prisma.employee.create({ data: { name, email, passwordHash, customerId } });

  revalidatePath("/admin/employees");
  redirect("/admin/employees");
}

export async function updateEmployeeAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const customerId = (formData.get("customerId") as string)?.trim();
  const newPassword = (formData.get("newPassword") as string) ?? "";
  const isActive = formData.get("isActive") !== "false";

  if (!id) return { error: "Invalid request." };
  if (!name || name.length > 100) return { error: "Name is required." };
  if (!customerId) return { error: "Assign a customer." };

  const employee = await prisma.employee.findUnique({ where: { id } });
  if (!employee) return { error: "Employee not found." };

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) return { error: "Customer not found." };

  const data: Record<string, unknown> = { name, customerId, isActive };
  if (newPassword) {
    if (newPassword.length < 8) return { error: "New password must be at least 8 characters." };
    data.passwordHash = await hashPassword(newPassword);
    data.sessionVersion = employee.sessionVersion + 1; // invalidate existing sessions
  }

  await prisma.employee.update({ where: { id }, data });

  revalidatePath("/admin/employees");
  revalidatePath(`/admin/employees/${id}`);
  return { success: true };
}

export async function deleteEmployeeAction(id: string) {
  await requireAdmin();
  if (!id || id.length > 100) return;
  await prisma.employee.delete({ where: { id } });
  revalidatePath("/admin/employees");
  redirect("/admin/employees");
}

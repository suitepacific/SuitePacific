"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hashPassword } from "@/lib/employee-auth";

function parseCustomerIds(formData: FormData): string[] {
  return formData.getAll("customerIds[]").map((v) => String(v).trim()).filter(Boolean);
}

export async function createEmployeeAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string) ?? "";
  const customerIds = parseCustomerIds(formData);

  if (!name || name.length > 100) return { error: "Name is required." };
  if (!username || username.length > 50 || !/^[a-z0-9._-]+$/.test(username))
    return { error: "Username must be lowercase letters, numbers, dots, underscores, or hyphens." };
  if (!password || password.length < 8) return { error: "Password must be at least 8 characters." };
  if (customerIds.length === 0) return { error: "Assign at least one customer." };

  const existing = await prisma.employee.findUnique({ where: { username } });
  if (existing) return { error: "Username is already taken." };

  const passwordHash = await hashPassword(password);
  await prisma.employee.create({
    data: {
      name,
      username,
      passwordHash,
      customers: { connect: customerIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/admin/employees");
  redirect("/admin/employees");
}

export async function updateEmployeeAction(_prev: unknown, formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const customerIds = parseCustomerIds(formData);
  const newPassword = (formData.get("newPassword") as string) ?? "";
  const isActive = formData.get("isActive") !== "false";

  if (!id) return { error: "Invalid request." };
  if (!name || name.length > 100) return { error: "Name is required." };
  if (customerIds.length === 0) return { error: "Assign at least one customer." };

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { customers: { select: { id: true } } },
  });
  if (!employee) return { error: "Employee not found." };

  const data: Parameters<typeof prisma.employee.update>[0]["data"] = {
    name,
    isActive,
    customers: {
      disconnect: employee.customers.map((c) => ({ id: c.id })),
      connect: customerIds.map((cid) => ({ id: cid })),
    },
  };

  if (newPassword) {
    if (newPassword.length < 8) return { error: "New password must be at least 8 characters." };
    data.passwordHash = await hashPassword(newPassword);
    data.sessionVersion = { increment: 1 };
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

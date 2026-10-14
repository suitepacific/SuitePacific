"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  getEmployeeFromRequest,
  verifyPassword,
  hashPassword,
  createEmployeeSessionToken,
  EMPLOYEE_SESSION_COOKIE,
  EMPLOYEE_SESSION_MAX_AGE,
} from "@/lib/employee-auth";

export async function changePasswordAction(_prev: unknown, formData: FormData) {
  const employee = await getEmployeeFromRequest();
  if (!employee) return { error: "Not authenticated." };

  const current = formData.get("currentPassword") as string;
  const next = (formData.get("newPassword") as string)?.trim();
  const confirm = (formData.get("confirmPassword") as string)?.trim();

  if (!current || !next || !confirm) return { error: "All fields are required." };
  if (next.length < 8 || next.length > 200) return { error: "New password must be 8-200 characters." };
  if (next !== confirm) return { error: "New passwords do not match." };

  const valid = await verifyPassword(current, employee.passwordHash);
  if (!valid) return { error: "Current password is incorrect." };

  const passwordHash = await hashPassword(next);
  const { sessionVersion } = await prisma.employee.update({
    where: { id: employee.id },
    data: { passwordHash, sessionVersion: { increment: 1 } },
    select: { sessionVersion: true },
  });

  // Re-issue session so the current browser stays logged in
  const token = await createEmployeeSessionToken(employee.id, sessionVersion);
  const cookieStore = await cookies();
  cookieStore.set(EMPLOYEE_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: EMPLOYEE_SESSION_MAX_AGE,
  });

  revalidatePath("/employee-portal/account");
  return { success: true };
}

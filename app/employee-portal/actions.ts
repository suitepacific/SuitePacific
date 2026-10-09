"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createEmployeeSessionToken,
  getEmployeeFromRequest,
  EMPLOYEE_SESSION_COOKIE,
  EMPLOYEE_SESSION_MAX_AGE,
} from "@/lib/employee-auth";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email and password are required." };
  if (!EMAIL_RE.test(email)) return { error: "Invalid email address." };

  const employee = await prisma.employee.findUnique({ where: { email } });
  if (!employee) return { error: "Invalid email or password." };
  if (!employee.isActive) return { error: "Your account is inactive. Contact your administrator." };

  const valid = await verifyPassword(password, employee.passwordHash);
  if (!valid) return { error: "Invalid email or password." };

  const { sessionVersion } = await prisma.employee.update({
    where: { id: employee.id },
    data: { sessionVersion: { increment: 1 } },
    select: { sessionVersion: true },
  });

  const token = await createEmployeeSessionToken(employee.id, sessionVersion);
  const cookieStore = await cookies();
  cookieStore.set(EMPLOYEE_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: EMPLOYEE_SESSION_MAX_AGE,
  });

  redirect("/employee-portal/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(EMPLOYEE_SESSION_COOKIE);
  redirect("/employee-portal/login");
}

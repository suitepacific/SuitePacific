"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createCustomerSessionToken,
  getCustomerFromRequest,
  CUSTOMER_SESSION_COOKIE,
  CUSTOMER_SESSION_MAX_AGE,
} from "@/lib/customer-auth";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email and password are required." };
  if (!EMAIL_RE.test(email)) return { error: "Invalid email address." };

  const customer = await prisma.customer.findUnique({ where: { email } });
  if (!customer || customer.archivedAt) return { error: "Invalid email or password." };
  if (customer.status !== "active") return { error: "Your account has been suspended. Please contact SuitePacific." };

  const valid = await verifyPassword(password, customer.passwordHash);
  if (!valid) return { error: "Invalid email or password." };

  const { sessionVersion } = await prisma.customer.update({
    where: { id: customer.id },
    data: { sessionVersion: { increment: 1 } },
    select: { sessionVersion: true },
  });

  const token = await createCustomerSessionToken(customer.id, sessionVersion);
  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CUSTOMER_SESSION_MAX_AGE,
  });

  redirect("/customer-portal/dashboard");
}

export async function logoutAction() {
  const customer = await getCustomerFromRequest();
  if (customer) {
    await prisma.customer.update({
      where: { id: customer.id },
      data: { sessionVersion: { increment: 1 } },
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/customer-portal/login");
}

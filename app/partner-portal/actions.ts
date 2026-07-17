"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  PARTNER_SESSION_COOKIE,
  PARTNER_SESSION_MAX_AGE,
  verifyPassword,
  createPartnerSessionToken,
} from "@/lib/partner-auth";

export async function loginAction(_prev: unknown, formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  const partner = await prisma.partner.findUnique({ where: { email } });
  if (!partner || partner.status !== "active") {
    return { error: "Invalid email or password." };
  }

  const valid = await verifyPassword(password, partner.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await createPartnerSessionToken(partner.id);
  const cookieStore = await cookies();
  cookieStore.set(PARTNER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: PARTNER_SESSION_MAX_AGE,
    path: "/",
  });

  redirect("/partner-portal/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(PARTNER_SESSION_COOKIE);
  redirect("/partner-portal/login");
}

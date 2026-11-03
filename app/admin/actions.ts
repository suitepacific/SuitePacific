"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  createSessionToken,
} from "@/lib/auth";
import { INTERNAL_COOKIE, INTERNAL_COOKIE_MAX_AGE } from "@/lib/internal-traffic";

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");

  if (!await checkPassword(password)) {
    return { error: "Incorrect password." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  cookieStore.set(INTERNAL_COOKIE, "1", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: INTERNAL_COOKIE_MAX_AGE,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/admin/login");
}

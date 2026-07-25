"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  SC_SESSION_COOKIE,
  SC_SESSION_MAX_AGE,
  hashScPassword,
  createScSessionToken,
} from "@/lib/sc-auth";

async function setSession(userId: string) {
  const { sessionVersion } = await prisma.scUser.update({
    where: { id: userId },
    data: { sessionVersion: { increment: 1 }, lastLoginAt: new Date() },
    select: { sessionVersion: true },
  });
  const token = await createScSessionToken(userId, sessionVersion);
  const cookieStore = await cookies();
  cookieStore.set(SC_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SC_SESSION_MAX_AGE,
    path: "/", // shared with /importDetector, which reuses this same login
  });
}

export async function activateAdminInviteAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const token = String(formData.get("token") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!token) return { error: "Invalid activation link." };
  if (!name || !password) return { error: "All fields are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords do not match." };

  const invite = await prisma.scAdminInvite.findUnique({ where: { token } });
  if (!invite || invite.activatedAt || invite.expiresAt < new Date()) {
    return { error: "This activation link is invalid or has expired." };
  }

  const billingStatus = invite.requirePayment ? "past_due" : "active";

  const h = await headers();
  const signupCountry = h.get("x-vercel-ip-country") ?? null;
  const rawCity = h.get("x-vercel-ip-city");
  const signupCity = rawCity ? decodeURIComponent(rawCity) : null;

  let userId: string;

  const existing = await prisma.scUser.findUnique({ where: { email: invite.email } });

  if (existing) {
    userId = existing.id;
    const passwordHash = await hashScPassword(password);
    await prisma.scUser.update({
      where: { id: userId },
      data: { name, passwordHash, emailVerified: true },
    });

    const membership = await prisma.scOrgMember.findFirst({
      where: { userId },
      select: { orgId: true },
    });

    if (membership) {
      await prisma.scOrg.update({
        where: { id: membership.orgId },
        data: {
          plan: invite.plan,
          seatLimitOverride: invite.seatLimit,
          clientLimitOverride: invite.clientLimit,
          billingStatus,
        },
      });
    } else {
      const slug = `${invite.email.split("@")[0]}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
      const org = await prisma.scOrg.create({
        data: {
          name: `${name}'s Organization`,
          slug,
          plan: invite.plan,
          seatLimitOverride: invite.seatLimit,
          clientLimitOverride: invite.clientLimit,
          billingStatus,
        },
      });
      await prisma.scOrgMember.create({ data: { orgId: org.id, userId, role: "owner" } });
    }
  } else {
    const passwordHash = await hashScPassword(password);
    const user = await prisma.scUser.create({
      data: {
        name,
        email: invite.email,
        passwordHash,
        emailVerified: true,
        signupCountry,
        signupCity,
      },
    });
    userId = user.id;

    const emailPrefix = invite.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const slug = `${emailPrefix}-${Date.now()}`;
    const org = await prisma.scOrg.create({
      data: {
        name: `${name}'s Organization`,
        slug,
        plan: invite.plan,
        seatLimitOverride: invite.seatLimit,
        clientLimitOverride: invite.clientLimit,
        billingStatus,
      },
    });
    await prisma.scOrgMember.create({ data: { orgId: org.id, userId, role: "owner" } });
  }

  await prisma.scAdminInvite.update({
    where: { id: invite.id },
    data: { activatedAt: new Date(), userId },
  });

  await setSession(userId);
  redirect("/suitecompare/dashboard");
}

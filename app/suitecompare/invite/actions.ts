"use server";

import { prisma } from "@/lib/prisma";
import { getScUserFromRequest } from "@/lib/sc-auth";
import { getSeatLimit } from "@/lib/sc-plans";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SC_SESSION_COOKIE,
  SC_SESSION_MAX_AGE,
  hashScPassword,
  createScSessionToken,
} from "@/lib/sc-auth";

async function setSession(userId: string) {
  const { sessionVersion } = await prisma.scUser.update({
    where: { id: userId },
    data: { sessionVersion: { increment: 1 } },
    select: { sessionVersion: true },
  });
  const token = await createScSessionToken(userId, sessionVersion);
  const cookieStore = await cookies();
  cookieStore.set(SC_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SC_SESSION_MAX_AGE,
    path: "/suitecompare",
  });
}

async function consumeInvite(token: string, userId: string, userEmail: string): Promise<boolean> {
  const invite = await prisma.scInvite.findUnique({ where: { token } });
  if (!invite || invite.usedAt || invite.expiresAt < new Date()) return false;

  // Invite must be for this specific email address
  if (invite.email !== userEmail) return false;

  // Check seat limit not exceeded at the moment of acceptance
  const org = await prisma.scOrg.findUnique({
    where: { id: invite.orgId },
    include: { members: true },
  });
  if (!org) return false;

  const seatLimit = getSeatLimit(org.plan, org.seatLimitOverride);
  if (org.members.length >= seatLimit) return false;

  // Already a member? Just mark invite used and proceed
  const alreadyMember = await prisma.scOrgMember.findFirst({
    where: { orgId: invite.orgId, userId },
  });

  await prisma.$transaction([
    prisma.scInvite.update({
      where: { id: invite.id },
      data: { usedAt: new Date() },
    }),
    ...(alreadyMember
      ? []
      : [
          prisma.scOrgMember.create({
            data: { orgId: invite.orgId, userId, role: "member" },
          }),
        ]),
  ]);

  return true;
}

// Called when a logged-in user accepts an invite
export async function acceptInviteAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const token = String(formData.get("token") ?? "").trim();
  if (!token) return { error: "Invalid invite link." };

  const currentUser = await getScUserFromRequest();
  if (!currentUser) redirect(`/suitecompare/login?invite=${token}`);

  const ok = await consumeInvite(token, currentUser.id, currentUser.email);
  if (!ok) return { error: "This invite link is invalid, expired, or the team is full." };

  redirect("/suitecompare/dashboard");
}

// Called when a new user signs up via invite
export async function signupViaInviteAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const token = String(formData.get("token") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!token) return { error: "Invalid invite link." };
  if (!name || !email || !password) return { error: "All fields are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const invite = await prisma.scInvite.findUnique({ where: { token } });
  if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
    return { error: "This invite link is invalid or has expired." };
  }

  // Invite is tied to a specific email address
  if (invite.email !== email) {
    return { error: "This invite was sent to a different email address." };
  }

  // If account already exists, redirect to login+invite flow
  const existing = await prisma.scUser.findUnique({ where: { email } });
  if (existing) {
    redirect(`/suitecompare/login?invite=${token}`);
  }

  const passwordHash = await hashScPassword(password);
  const h = await headers();
  const signupCountry = h.get("x-vercel-ip-country") ?? null;
  const rawCity = h.get("x-vercel-ip-city");
  const signupCity = rawCity ? decodeURIComponent(rawCity) : null;
  const user = await prisma.scUser.create({
    data: { name, email, passwordHash, emailVerified: true, signupCountry, signupCity },
  });

  const ok = await consumeInvite(token, user.id, user.email);
  if (!ok) {
    // Clean up the orphan account — invite was consumed or org filled up in the race window
    await prisma.scUser.delete({ where: { id: user.id } }).catch(() => {});
    return { error: "Could not join team. The invite may have expired or the team is full." };
  }

  await setSession(user.id);
  redirect("/suitecompare/dashboard");
}

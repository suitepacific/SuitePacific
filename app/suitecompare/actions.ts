"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  SC_SESSION_COOKIE,
  SC_SESSION_MAX_AGE,
  hashScPassword,
  verifyScPassword,
  createScSessionToken,
  getScUserFromRequest,
} from "@/lib/sc-auth";
import { generateOtp, sendOtpEmail, sendPasswordResetEmail } from "@/lib/sc-email";
import crypto from "crypto";
import { getSeatLimit } from "@/lib/sc-plans";

async function getSignupLocation(): Promise<{ signupCountry: string | null; signupCity: string | null }> {
  const h = await headers();
  const country = h.get("x-vercel-ip-country") ?? null;
  const rawCity = h.get("x-vercel-ip-city");
  const city = rawCity ? decodeURIComponent(rawCity) : null;
  return { signupCountry: country, signupCity: city };
}

async function acceptPendingInvite(token: string, userId: string, userEmail: string): Promise<boolean> {
  const invite = await prisma.scInvite.findUnique({ where: { token } });
  if (!invite || invite.usedAt || invite.expiresAt < new Date()) return false;

  // Invite must be for this specific user's email
  if (invite.email !== userEmail) return false;

  const org = await prisma.scOrg.findUnique({
    where: { id: invite.orgId },
    include: { members: true },
  });
  if (!org) return false;

  const seatLimit = getSeatLimit(org.plan, org.seatLimitOverride);
  if (org.members.length >= seatLimit) return false;

  const alreadyMember = await prisma.scOrgMember.findFirst({
    where: { orgId: invite.orgId, userId },
  });

  await prisma.$transaction([
    prisma.scInvite.update({ where: { id: invite.id }, data: { usedAt: new Date() } }),
    ...(alreadyMember
      ? []
      : [prisma.scOrgMember.create({ data: { orgId: invite.orgId, userId, role: "member" } })]),
  ]);
  return true;
}

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

export async function loginScAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const inviteToken = String(formData.get("inviteToken") ?? "").trim();

  const user = await prisma.scUser.findUnique({ where: { email } });
  if (!user || user.status !== "active") return { error: "Invalid email or password." };

  const valid = await verifyScPassword(password, user.passwordHash);
  if (!valid) return { error: "Invalid email or password." };

  if (!user.emailVerified) {
    const otp = generateOtp();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.scUser.update({ where: { id: user.id }, data: { otp: otpHash, otpExpiry } });
    try { await sendOtpEmail(email, user.name, otp); } catch (e) { console.error("[sc] OTP email failed:", e); }
    redirect(`/suitecompare/verify?email=${encodeURIComponent(email)}`);
  }

  if (inviteToken) await acceptPendingInvite(inviteToken, user.id, user.email);

  await setSession(user.id);
  redirect("/suitecompare/dashboard");
}

export async function signupScAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const inviteToken = String(formData.get("inviteToken") ?? "").trim();

  if (!name || !email || !password) return { error: "All fields are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  // Invite flow: skip orgName, skip OTP, join existing org
  if (inviteToken) {
    const invite = await prisma.scInvite.findUnique({ where: { token: inviteToken } });
    if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
      return { error: "This invite link is invalid or has expired." };
    }

    // Invite is tied to a specific email address
    if (invite.email !== email) {
      return { error: "This invite was sent to a different email address." };
    }

    const existing = await prisma.scUser.findUnique({ where: { email } });
    if (existing) redirect(`/suitecompare/login?invite=${inviteToken}`);

    const passwordHash = await hashScPassword(password);
    const loc = await getSignupLocation();
    const user = await prisma.scUser.create({
      data: { name, email, passwordHash, emailVerified: true, ...loc },
    });

    const joined = await acceptPendingInvite(inviteToken, user.id, user.email);
    if (!joined) {
      await prisma.scUser.delete({ where: { id: user.id } }).catch(() => {});
      return { error: "Could not join team. The invite may have expired or the team is full." };
    }
    await setSession(user.id);
    redirect("/suitecompare/dashboard");
  }

  // Normal signup flow
  const orgName = String(formData.get("orgName") ?? "").trim();
  if (!orgName) return { error: "All fields are required." };

  const existing = await prisma.scUser.findUnique({ where: { email } });
  if (existing) {
    if (!existing.emailVerified) {
      const otp = generateOtp();
      const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await prisma.scUser.update({ where: { id: existing.id }, data: { otp: otpHash, otpExpiry } });
      try { await sendOtpEmail(email, existing.name, otp); } catch (e) { console.error("[sc] OTP email failed:", e); }
      redirect(`/suitecompare/verify?email=${encodeURIComponent(email)}`);
    }
    return { error: "An account with this email already exists." };
  }

  const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slugExists = await prisma.scOrg.findUnique({ where: { slug } });
  const finalSlug = slugExists ? `${slug}-${Date.now()}` : slug;

  const otp = generateOtp();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const passwordHash = await hashScPassword(password);
  const loc = await getSignupLocation();

  const user = await prisma.scUser.create({
    data: { name, email, passwordHash, otp: otpHash, otpExpiry, emailVerified: false, ...loc },
  });

  const org = await prisma.scOrg.create({ data: { name: orgName, slug: finalSlug } });
  await prisma.scOrgMember.create({ data: { orgId: org.id, userId: user.id, role: "owner" } });

  try { await sendOtpEmail(email, name, otp); } catch (e) { console.error("[sc] OTP email failed:", e); }
  redirect(`/suitecompare/verify?email=${encodeURIComponent(email)}`);
}

export async function verifyOtpAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const otp = String(formData.get("otp") ?? "").trim();

  const user = await prisma.scUser.findUnique({ where: { email } });
  if (!user) return { error: "Account not found. Please sign up again." };

  if (user.emailVerified) {
    await setSession(user.id);
    redirect("/suitecompare/dashboard");
  }

  if (!user.otp || !user.otpExpiry) {
    return { error: "No code found. Use the resend button to get a new one." };
  }
  if (new Date() > user.otpExpiry) {
    return { error: "Code expired. Use the resend button to get a new one." };
  }
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  if (user.otp !== otpHash) {
    return { error: "Incorrect code. Please try again." };
  }

  await prisma.scUser.update({
    where: { id: user.id },
    data: { emailVerified: true, otp: null, otpExpiry: null },
  });

  await setSession(user.id);
  redirect("/suitecompare/dashboard");
}

export async function resendOtpAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();

  const user = await prisma.scUser.findUnique({ where: { email } });
  if (!user || user.emailVerified) return { error: "Cannot resend code." };

  // Throttle: block if existing code still has >9 minutes left
  if (user.otpExpiry && user.otpExpiry.getTime() - Date.now() > 9 * 60 * 1000) {
    return { error: "Please wait a moment before requesting a new code." };
  }

  const otp = generateOtp();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await prisma.scUser.update({ where: { id: user.id }, data: { otp: otpHash, otpExpiry } });

  try {
    await sendOtpEmail(email, user.name, otp);
    return { success: true };
  } catch {
    return { error: "Failed to send email. Please try again." };
  }
}

export async function forgotPasswordAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  if (!email) return { error: "Email is required." };

  const user = await prisma.scUser.findUnique({ where: { email } });

  // Always return success - never reveal whether an email is registered
  if (!user || user.status !== "active") return { success: true };

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.scUser.update({
    where: { id: user.id },
    data: { passwordResetToken: hashedToken, passwordResetExpiry: expiry },
  });

  const siteUrl = process.env.SITE_URL ?? "https://suitepacific.com";
  const resetUrl = `${siteUrl}/suitecompare/reset-password?token=${rawToken}`;

  try {
    await sendPasswordResetEmail(email, user.name, resetUrl);
  } catch (e) {
    console.error("[sc] Password reset email failed:", e);
  }

  return { success: true };
}

export async function resetPasswordAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string }> {
  const rawToken = String(formData.get("token") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!rawToken) return { error: "Invalid reset link." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords do not match." };

  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const user = await prisma.scUser.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpiry: { gt: new Date() },
      status: "active",
    },
  });

  if (!user) return { error: "This reset link is invalid or has expired. Please request a new one." };

  const passwordHash = await hashScPassword(password);
  await prisma.scUser.update({
    where: { id: user.id },
    data: {
      passwordHash,
      passwordResetToken: null,
      passwordResetExpiry: null,
      emailVerified: true, // reset flow proves email ownership
    },
  });

  await setSession(user.id);
  redirect("/suitecompare/dashboard");
}

export async function logoutScAction() {
  const user = await getScUserFromRequest();
  if (user) {
    // Increment sessionVersion to invalidate any live tokens for this user,
    // regardless of which cookie path they were issued under.
    await prisma.scUser.update({
      where: { id: user.id },
      data: { sessionVersion: { increment: 1 } },
    });
  }

  const cookieStore = await cookies();
  const clearOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
  };
  // Clear at current path
  cookieStore.set(SC_SESSION_COOKIE, "", { ...clearOpts, path: "/" });
  // Also clear at legacy path (cookie was previously scoped to /suitecompare)
  cookieStore.set(SC_SESSION_COOKIE, "", { ...clearOpts, path: "/suitecompare" });

  redirect("/suitecompare/login");
}

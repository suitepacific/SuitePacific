import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { Partner } from "@prisma/client";

export const PARTNER_SESSION_COOKIE = "sp_partner_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const PARTNER_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function createPartnerSessionToken(partnerId: string): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `partner.${partnerId}.${expires}`;
  const signature = await hmac(payload);
  return `${payload}.${signature}`;
}

export async function verifyPartnerSessionToken(
  token: string | undefined
): Promise<{ partnerId: string } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;

  const [role, partnerId, expiresStr, signature] = parts;
  if (role !== "partner") return null;

  const payload = `partner.${partnerId}.${expiresStr}`;
  const expectedSignature = await hmac(payload);
  if (signature !== expectedSignature) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  return { partnerId };
}

export async function getPartnerFromRequest(): Promise<Partner | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PARTNER_SESSION_COOKIE)?.value;
  const result = await verifyPartnerSessionToken(token);
  if (!result) return null;
  return prisma.partner.findUnique({ where: { id: result.partnerId } });
}

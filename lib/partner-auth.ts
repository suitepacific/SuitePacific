import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { Partner } from "@prisma/client";

export const PARTNER_SESSION_COOKIE = "sp_partner_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const PARTNER_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;

function getSecret(): string {
  // Prefer a dedicated secret; fall back to ADMIN_SESSION_SECRET for existing deployments
  const secret = process.env.PARTNER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("PARTNER_SESSION_SECRET is not set");
  return secret;
}

async function hmacSign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacVerify(payload: string, hexSig: string): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(getSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const bytes = hexSig.match(/[0-9a-f]{2}/gi);
    if (!bytes || bytes.length !== 32) return false;
    const sigBytes = new Uint8Array(bytes.map((b) => parseInt(b, 16)));
    return crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payload));
  } catch {
    return false;
  }
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Token format: partner.<partnerId>.<sessionVersion>.<expires>.<sig>
export async function createPartnerSessionToken(partnerId: string, sessionVersion: number): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `partner.${partnerId}.${sessionVersion}.${expires}`;
  const signature = await hmacSign(payload);
  return `${payload}.${signature}`;
}

export async function verifyPartnerSessionToken(
  token: string | undefined
): Promise<{ partnerId: string; sessionVersion: number } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 5) return null;

  const [role, partnerId, sessionVersionStr, expiresStr, signature] = parts;
  if (role !== "partner" || !partnerId) return null;

  const payload = `partner.${partnerId}.${sessionVersionStr}.${expiresStr}`;
  const isValidSig = await hmacVerify(payload, signature);
  if (!isValidSig) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  const sessionVersion = Number(sessionVersionStr);
  if (!Number.isInteger(sessionVersion) || sessionVersion < 1) return null;

  return { partnerId, sessionVersion };
}

export async function getPartnerFromRequest(): Promise<Partner | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PARTNER_SESSION_COOKIE)?.value;
  const result = await verifyPartnerSessionToken(token);
  if (!result) return null;
  const partner = await prisma.partner.findUnique({ where: { id: result.partnerId } });
  if (!partner || partner.status !== "active") return null;
  if (partner.sessionVersion !== result.sessionVersion) return null;
  return partner;
}

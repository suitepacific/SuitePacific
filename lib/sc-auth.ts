import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { ScUser } from "@prisma/client";

export const SC_SESSION_COOKIE = "sp_sc_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const SC_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;

function getSecret(): string {
  const secret = process.env.SC_SESSION_SECRET;
  if (!secret) throw new Error("SC_SESSION_SECRET is not set");
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

export async function hashScPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyScPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Token format: sc.<userId>.<sessionVersion>.<expiresMs>.<sig>
export async function createScSessionToken(userId: string, sessionVersion: number): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `sc.${userId}.${sessionVersion}.${expires}`;
  const signature = await hmacSign(payload);
  return `${payload}.${signature}`;
}

export async function verifyScSessionToken(
  token: string | undefined
): Promise<{ userId: string; sessionVersion: number } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 5) return null;

  const [role, userId, sessionVersionStr, expiresStr, signature] = parts;
  if (role !== "sc" || !userId) return null;

  const payload = `sc.${userId}.${sessionVersionStr}.${expiresStr}`;
  const isValidSig = await hmacVerify(payload, signature);
  if (!isValidSig) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  const sessionVersion = Number(sessionVersionStr);
  if (!Number.isInteger(sessionVersion) || sessionVersion < 1) return null;

  return { userId, sessionVersion };
}

export async function getScUserFromRequest(): Promise<ScUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SC_SESSION_COOKIE)?.value;
  const result = await verifyScSessionToken(token);
  if (!result) return null;
  const user = await prisma.scUser.findUnique({ where: { id: result.userId } });
  if (!user || user.status !== "active") return null;
  // Single-session enforcement: if sessionVersion doesn't match, another device logged in
  if (user.sessionVersion !== result.sessionVersion) return null;
  return user;
}

export async function requireScUser(): Promise<ScUser> {
  const user = await getScUserFromRequest();
  if (!user) redirect("/suitecompare/login");
  return user;
}

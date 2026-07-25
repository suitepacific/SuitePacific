import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { Customer } from "@prisma/client";

export const CUSTOMER_SESSION_COOKIE = "sp_customer_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const CUSTOMER_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;

function getSecret(): string {
  // Prefer a dedicated secret; fall back to ADMIN_SESSION_SECRET for existing deployments
  const secret = process.env.CUSTOMER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("CUSTOMER_SESSION_SECRET is not set");
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

// Token format: customer.<customerId>.<sessionVersion>.<expires>.<sig>
export async function createCustomerSessionToken(customerId: string, sessionVersion: number): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `customer.${customerId}.${sessionVersion}.${expires}`;
  const signature = await hmacSign(payload);
  return `${payload}.${signature}`;
}

export async function verifyCustomerSessionToken(
  token: string | undefined
): Promise<{ customerId: string; sessionVersion: number } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 5) return null;

  const [role, customerId, sessionVersionStr, expiresStr, signature] = parts;
  if (role !== "customer" || !customerId) return null;

  const payload = `customer.${customerId}.${sessionVersionStr}.${expiresStr}`;
  const isValidSig = await hmacVerify(payload, signature);
  if (!isValidSig) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  const sessionVersion = Number(sessionVersionStr);
  if (!Number.isInteger(sessionVersion) || sessionVersion < 1) return null;

  return { customerId, sessionVersion };
}

export async function getCustomerFromRequest(): Promise<Customer | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;
  const result = await verifyCustomerSessionToken(token);
  if (!result) return null;
  const customer = await prisma.customer.findUnique({ where: { id: result.customerId } });
  if (!customer || customer.status !== "active") return null;
  if (customer.sessionVersion !== result.sessionVersion) return null;
  return customer;
}

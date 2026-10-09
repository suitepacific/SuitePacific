import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { Employee } from "@prisma/client";

export const EMPLOYEE_SESSION_COOKIE = "sp_employee_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const EMPLOYEE_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;

function getSecret(): string {
  const secret = process.env.EMPLOYEE_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("EMPLOYEE_SESSION_SECRET is not set");
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

// Token format: employee.<employeeId>.<sessionVersion>.<expires>.<sig>
export async function createEmployeeSessionToken(employeeId: string, sessionVersion: number): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `employee.${employeeId}.${sessionVersion}.${expires}`;
  const signature = await hmacSign(payload);
  return `${payload}.${signature}`;
}

export async function verifyEmployeeSessionToken(
  token: string | undefined
): Promise<{ employeeId: string; sessionVersion: number } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 5) return null;

  const [role, employeeId, sessionVersionStr, expiresStr, signature] = parts;
  if (role !== "employee" || !employeeId) return null;

  const payload = `employee.${employeeId}.${sessionVersionStr}.${expiresStr}`;
  const isValidSig = await hmacVerify(payload, signature);
  if (!isValidSig) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() >= expires) return null;

  const sessionVersion = Number(sessionVersionStr);
  if (!Number.isInteger(sessionVersion) || sessionVersion < 1) return null;

  return { employeeId, sessionVersion };
}

export async function getEmployeeFromRequest(): Promise<(Employee & { customer: { id: string; name: string; company: string } }) | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(EMPLOYEE_SESSION_COOKIE)?.value;
  const result = await verifyEmployeeSessionToken(token);
  if (!result) return null;
  const employee = await prisma.employee.findUnique({
    where: { id: result.employeeId },
    include: { customer: { select: { id: true, name: true, company: true } } },
  });
  if (!employee || !employee.isActive) return null;
  if (employee.sessionVersion !== result.sessionVersion) return null;
  return employee;
}

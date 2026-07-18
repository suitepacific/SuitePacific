import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "sp_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
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

// Constant-time HMAC verification using crypto.subtle.verify (spec-defined constant-time)
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
    if (!bytes || bytes.length !== 32) return false; // SHA-256 = 32 bytes
    const sigBytes = new Uint8Array(bytes.map((b) => parseInt(b, 16)));
    return crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payload));
  } catch {
    return false;
  }
}

// Constant-time string equality to prevent timing oracle on admin password
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBytes = enc.encode(a);
  const bBytes = enc.encode(b);
  // Process both fully to avoid timing leak on length difference
  let diff = a.length === b.length ? 0 : 1;
  const len = Math.max(aBytes.length, bBytes.length);
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}

export async function checkPassword(password: string): Promise<boolean> {
  // Prefer bcrypt hash when ADMIN_PASSWORD_HASH is set
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    const bcrypt = await import("bcryptjs");
    return bcrypt.compare(password, hash);
  }
  // Fallback: plaintext ADMIN_PASSWORD with timing-safe comparison
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(password, expected);
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expires}`;
  const signature = await hmacSign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [role, expiresStr, signature] = parts;
  if (role !== "admin") return false;

  const isValidSig = await hmacVerify(`admin.${expiresStr}`, signature);
  if (!isValidSig) return false;

  const expires = Number(expiresStr);
  return Number.isFinite(expires) && Date.now() < expires;
}

// Call at the start of every admin server action — middleware only protects pages, not direct action POSTs
export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const isValid = await verifySessionToken(token);
  if (!isValid) {
    redirect("/admin/login");
  }
}

export const SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;

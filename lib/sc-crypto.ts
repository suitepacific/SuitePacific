import crypto from "crypto";

function getKey(): Buffer {
  const hex = process.env.SC_ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error("SC_ENCRYPTION_KEY must be a 64-char hex string (32 bytes).");
  }
  return Buffer.from(hex, "hex");
}

// Format: v1:<iv-hex>:<tag-hex>:<ciphertext-hex>
export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString("hex")}:${tag.toString("hex")}:${ciphertext.toString("hex")}`;
}

export function decrypt(stored: string): string {
  if (!stored.startsWith("v1:")) {
    // Legacy plain-text value stored before encryption was added
    return stored;
  }
  const [, ivHex, tagHex, dataHex] = stored.split(":");
  const key = getKey();
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataHex, "hex")),
    decipher.final(),
  ]).toString("utf8");
}

type CredFields = {
  consumerKey: string | null;
  consumerSecret: string | null;
  tokenKey: string | null;
  tokenSecret: string | null;
};

// Decrypt all four credential fields for display in the config modal
export function decryptCreds(env: CredFields): CredFields {
  return {
    consumerKey: env.consumerKey ? decrypt(env.consumerKey) : null,
    consumerSecret: env.consumerSecret ? decrypt(env.consumerSecret) : null,
    tokenKey: env.tokenKey ? decrypt(env.tokenKey) : null,
    tokenSecret: env.tokenSecret ? decrypt(env.tokenSecret) : null,
  };
}

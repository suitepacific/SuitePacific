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
    // A value without the v1: prefix was stored before encryption was introduced.
    // Reject it so credentials aren't silently used as plaintext — the user must
    // re-save their credentials to re-encrypt them.
    throw new Error(
      "Stored credential is not encrypted. Please re-enter your TBA credentials to continue."
    );
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

"use server";

import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/referral-activity";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function safeUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const p = new URL(raw);
    return p.protocol === "https:" || p.protocol === "http:" ? raw : null;
  } catch { return null; }
}

export async function submitReferralAction(_prev: unknown, formData: FormData) {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const companyName = (formData.get("companyName") as string)?.trim();
  const contactName = (formData.get("contactName") as string)?.trim() || null;
  const contactEmail = (formData.get("contactEmail") as string)?.trim().toLowerCase() || null;
  const contactWebsite = (formData.get("contactWebsite") as string)?.trim() || null;
  const partnerNotes = (formData.get("partnerNotes") as string)?.trim() || null;

  if (!companyName) return { error: "Company name is required." };
  if (companyName.length > 200) return { error: "Company name is too long." };
  if (contactName && contactName.length > 200) return { error: "Contact name is too long." };
  if (contactEmail) {
    if (contactEmail.length > 254 || !EMAIL_RE.test(contactEmail)) return { error: "Invalid contact email." };
  }
  if (contactWebsite) {
    if (contactWebsite.length > 500) return { error: "Website URL is too long." };
    if (!safeUrl(contactWebsite)) return { error: "Contact website must be a valid http or https URL." };
  }
  if (partnerNotes && partnerNotes.length > 5000) return { error: "Notes must be under 5000 characters." };

  const referral = await prisma.referral.create({
    data: { partnerId: partner.id, companyName, contactName, contactEmail, contactWebsite, partnerNotes },
  });

  await logActivity(referral.id, "submitted", `Referral submitted by ${partner.name}`, "partner");

  redirect("/partner-portal/referrals");
}

export async function updatePartnerProfileAction(_prev: unknown, formData: FormData) {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const company = (formData.get("company") as string)?.trim().slice(0, 200) || null;
  const websiteRaw = (formData.get("website") as string)?.trim().slice(0, 500) || null;
  const website = safeUrl(websiteRaw);
  if (websiteRaw && !website) return { error: "Website must be a valid http or https URL." };
  const country = (formData.get("country") as string)?.trim().slice(0, 100) || null;
  const timezone = (formData.get("timezone") as string)?.trim().slice(0, 100) || null;
  const preferredPaymentMethod = (formData.get("preferredPaymentMethod") as string)?.trim() || null;
  const paymentDetails = (formData.get("paymentDetails") as string)?.trim().slice(0, 2000) || null;
  const taxId = (formData.get("taxId") as string)?.trim().slice(0, 100) || null;

  const VALID = new Set(["bank_transfer", "paypal", "wise", "check", ""]);
  if (preferredPaymentMethod && !VALID.has(preferredPaymentMethod)) return { error: "Invalid payment method." };

  await prisma.partner.update({
    where: { id: partner.id },
    data: { company, website, country, timezone, preferredPaymentMethod, paymentDetails, taxId },
  });

  return { success: true };
}

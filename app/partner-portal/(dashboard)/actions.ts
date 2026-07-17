"use server";

import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function submitReferralAction(_prev: unknown, formData: FormData) {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const companyName = (formData.get("companyName") as string)?.trim();
  const contactName = (formData.get("contactName") as string)?.trim() || null;
  const contactEmail = (formData.get("contactEmail") as string)?.trim().toLowerCase() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!companyName) return { error: "Company name is required." };
  if (companyName.length > 200) return { error: "Company name is too long." };
  if (contactName && contactName.length > 200) return { error: "Contact name is too long." };
  if (contactEmail) {
    if (contactEmail.length > 254) return { error: "Contact email is too long." };
    if (!EMAIL_RE.test(contactEmail)) return { error: "Invalid contact email address." };
  }
  if (notes && notes.length > 5000) return { error: "Notes must be under 5000 characters." };

  await prisma.referral.create({
    data: { partnerId: partner.id, companyName, contactName, contactEmail, notes },
  });

  redirect("/partner-portal/referrals");
}

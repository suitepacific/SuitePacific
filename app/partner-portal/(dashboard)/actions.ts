"use server";

import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";

export async function submitReferralAction(_prev: unknown, formData: FormData) {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const companyName = (formData.get("companyName") as string)?.trim();
  const contactName = (formData.get("contactName") as string)?.trim() || null;
  const contactEmail = (formData.get("contactEmail") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!companyName) return { error: "Company name is required." };

  await prisma.referral.create({
    data: { partnerId: partner.id, companyName, contactName, contactEmail, notes },
  });

  redirect("/partner-portal/referrals");
}

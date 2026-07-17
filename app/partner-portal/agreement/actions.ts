"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { prisma } from "@/lib/prisma";

export async function acceptAgreementAction() {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  await prisma.partner.update({
    where: { id: partner.id },
    data: { agreementAcceptedAt: new Date(), agreementAcceptedIp: ip },
  });

  redirect("/partner-portal/dashboard");
}

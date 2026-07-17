import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";

export default async function PartnerPortalRootPage() {
  const partner = await getPartnerFromRequest();
  if (partner) {
    redirect("/partner-portal/dashboard");
  }
  redirect("/partner-portal/login");
}

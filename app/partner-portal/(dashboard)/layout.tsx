import { redirect } from "next/navigation";
import { getPartnerFromRequest } from "@/lib/partner-auth";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

export default async function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const partner = await getPartnerFromRequest();
  if (!partner) redirect("/partner-portal/login");

  return (
    <div className="flex min-h-screen bg-brand-50/30">
      <PortalSidebar partnerName={partner.name} />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

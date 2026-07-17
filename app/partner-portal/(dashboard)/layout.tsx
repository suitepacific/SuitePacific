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

  // Require agreement acceptance before accessing the dashboard
  if (!partner.agreementAcceptedAt) redirect("/partner-portal/agreement");

  return (
    <div className="flex min-h-screen bg-brand-50/30">
      <PortalSidebar partnerName={partner.name} />
      <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}

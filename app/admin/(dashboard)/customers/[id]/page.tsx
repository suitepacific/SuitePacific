import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TicketStatusBadge } from "@/components/portal/TicketStatusBadge";
import { TicketPriorityBadge } from "@/components/portal/TicketPriorityBadge";
import { toggleCustomerStatusAction, archiveCustomerAction } from "@/app/admin/(dashboard)/customers/actions";
import { CustomerEditForm } from "@/components/admin/CustomerEditForm";

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: { tickets: { where: { archivedAt: null }, orderBy: { updatedAt: "desc" } } },
  });
  if (!customer) notFound();

  const isArchived = !!customer.archivedAt;
  const openTickets = customer.tickets.filter((t) => !["RESOLVED", "CLOSED"].includes(t.status)).length;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/customers"
        className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 mb-6">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Customers
      </Link>

      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-semibold text-brand-900">{customer.name}</h1>
            {isArchived && (
              <span className="text-xs bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full">Archived</span>
            )}
            {!isArchived && customer.status === "suspended" && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">Suspended</span>
            )}
          </div>
          <p className="text-sm text-brand-400 mt-1">
            {customer.email} · {customer.company}
            {customer.country && ` · ${customer.country}`}
          </p>
          {customer.website && (
            <a href={customer.website} target="_blank" rel="noopener noreferrer"
              className="text-xs text-accent hover:underline mt-0.5 inline-block">
              {customer.website}
            </a>
          )}
          {customer.agreementAcceptedAt && (
            <p className="text-xs text-emerald-600 mt-1">
              Terms accepted {new Date(customer.agreementAcceptedAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
            </p>
          )}
        </div>

        {!isArchived && (
          <form action={toggleCustomerStatusAction.bind(null, customer.id)}>
            <button type="submit"
              className={`text-sm px-4 py-2 rounded-full border font-medium transition-colors ${
                customer.status === "active"
                  ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              }`}>
              {customer.status === "active" ? "Suspend" : "Reactivate"}
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Tickets" value={customer.tickets.length} />
        <StatCard label="Open" value={openTickets} />
        <StatCard label="Resolved" value={customer.tickets.filter((t) => ["RESOLVED", "CLOSED"].includes(t.status)).length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CustomerEditForm
          id={customer.id}
          defaults={{
            company: customer.company,
            website: customer.website ?? "",
            country: customer.country ?? "",
            timezone: customer.timezone ?? "",
          }}
        />

        {/* Info */}
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-3">Account</p>
          <dl className="space-y-2 text-sm">
            <Row label="Email" value={customer.email} />
            <Row label="Joined" value={new Date(customer.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} />
            {customer.timezone && <Row label="Timezone" value={customer.timezone} />}
          </dl>
        </div>
      </div>

      {/* Tickets */}
      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-50">
          <h2 className="font-semibold text-brand-900 text-sm">Tickets</h2>
          <Link href={`/admin/tickets?customerId=${customer.id}`} className="text-xs text-accent hover:underline">
            View all
          </Link>
        </div>
        {customer.tickets.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-brand-300">No tickets yet.</p>
        ) : (
          <div className="divide-y divide-brand-50">
            {customer.tickets.slice(0, 8).map((t) => (
              <Link key={t.id} href={`/admin/tickets/${t.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-brand-900 truncate">{t.title}</p>
                  <p className="text-xs text-brand-400 mt-0.5">
                    {new Date(t.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <TicketPriorityBadge priority={t.priority} />
                  <TicketStatusBadge status={t.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Archive */}
      {!isArchived && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
          <p className="text-sm font-semibold text-red-800 mb-1">Archive Customer</p>
          <p className="text-xs text-red-600 mb-4">Suspends portal access and hides from active lists. Data is preserved.</p>
          <form action={archiveCustomerAction.bind(null, customer.id)}>
            <button type="submit"
              className="text-sm px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors font-medium">
              Archive Customer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5">
      <p className="text-2xl font-bold text-brand-900">{value}</p>
      <p className="text-xs text-brand-400 mt-0.5">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-brand-400 w-24 shrink-0">{label}</span>
      <span className="text-brand-900">{value}</span>
    </div>
  );
}

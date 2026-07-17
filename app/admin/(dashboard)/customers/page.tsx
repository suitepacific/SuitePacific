import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ archived?: string }>;
}) {
  const sp = await searchParams;
  const showArchived = sp.archived === "1";

  const customers = await prisma.customer.findMany({
    where: { archivedAt: showArchived ? { not: null } : null },
    include: { _count: { select: { tickets: { where: { archivedAt: null } } } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Customers</h1>
          <p className="mt-1 text-sm text-brand-400">
            {customers.length} {showArchived ? "archived" : "active"} customer{customers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={showArchived ? "/admin/customers" : "/admin/customers?archived=1"}
            className="text-xs px-3 py-1.5 rounded-full border border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-900 transition-colors"
          >
            {showArchived ? "Active" : "Archived"}
          </Link>
          {!showArchived && (
            <Link href="/admin/customers/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors">
              <PlusCircle className="h-4 w-4" />
              Add Customer
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Tickets</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/customers/${c.id}`} className="font-medium text-brand-900 hover:text-accent">
                      {c.name}
                    </Link>
                    <p className="text-xs text-brand-400 mt-0.5">{c.email}</p>
                  </td>
                  <td className="px-5 py-3 text-brand-600">{c.company}</td>
                  <td className="px-5 py-3 text-brand-500">{c._count.tickets}</td>
                  <td className="px-5 py-3">
                    {c.archivedAt ? (
                      <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Archived</span>
                    ) : c.status === "active" ? (
                      <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">Active</span>
                    ) : (
                      <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">Suspended</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-brand-400">
                    {c.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {customers.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No customers yet.</p>
        )}
      </div>
    </div>
  );
}

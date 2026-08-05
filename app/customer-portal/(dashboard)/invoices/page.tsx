import { redirect } from "next/navigation";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  SENT: "bg-blue-50 text-blue-700",
  PAID: "bg-emerald-50 text-emerald-700",
};
const STATUS_LABELS: Record<string, string> = { SENT: "Outstanding", PAID: "Paid" };

export default async function CustomerInvoicesPage() {
  const customer = await getCustomerFromRequest();
  if (!customer) redirect("/customer-portal/login");

  // Only show SENT and PAID invoices to customers (not DRAFT or VOID)
  const invoices = await prisma.invoice.findMany({
    where: { customerId: customer.id, archivedAt: null, status: { in: ["SENT", "PAID"] } },
    orderBy: { issueDate: "desc" },
  });

  const outstanding = invoices.filter((i) => i.status === "SENT").reduce((s, i) => s + i.total, 0);
  const paid = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.total, 0);

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-brand-900 mb-1">Invoices</h1>
      <p className="text-sm text-brand-400 mb-8">{invoices.length} invoice{invoices.length !== 1 ? "s" : ""}</p>

      {invoices.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-brand-100 p-5">
            <p className="text-xl font-bold text-blue-600">${outstanding.toFixed(2)}</p>
            <p className="text-xs text-brand-400 mt-0.5">Outstanding</p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-100 p-5">
            <p className="text-xl font-bold text-emerald-600">${paid.toFixed(2)}</p>
            <p className="text-xs text-brand-400 mt-0.5">Paid</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-brand-100">
        {invoices.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-brand-400">No invoices yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Invoice #</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Due</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-brand-400 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-brand-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/customer-portal/invoices/${inv.id}`}
                        className="font-mono text-xs font-medium text-brand-900 hover:text-accent">
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-brand-500">
                      {new Date(inv.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-brand-400">
                      {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-"}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-brand-900">
                      {inv.currency} {inv.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[inv.status]}`}>
                        {STATUS_LABELS[inv.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/customer-portal/invoices/${inv.id}/print`} target="_blank"
                        className="text-xs text-brand-400 hover:text-accent flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        PDF
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

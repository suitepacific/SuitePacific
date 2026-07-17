import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    include: { _count: { select: { referrals: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-brand-900">Partners</h1>
          <p className="mt-1 text-sm text-brand-400">{partners.length} partner{partners.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white text-sm font-medium px-4 py-2 hover:bg-brand-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          New Partner
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-50 text-left text-brand-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Referrals</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-b border-brand-50 last:border-0 hover:bg-brand-50/40 transition-colors">
                <td className="px-5 py-3">
                  <Link href={`/admin/partners/${p.id}`} className="font-medium text-brand-900 hover:text-accent">
                    {p.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-brand-500">{p.email}</td>
                <td className="px-5 py-3 text-brand-500">{p.company ?? "-"}</td>
                <td className="px-5 py-3 text-brand-500">{p._count.referrals}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                  }`}>
                    {p.status === "active" ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="px-5 py-3 text-brand-400">
                  {p.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {partners.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No partners yet. <Link href="/admin/partners/new" className="text-accent hover:underline">Create one</Link>.</p>
        )}
      </div>
    </div>
  );
}

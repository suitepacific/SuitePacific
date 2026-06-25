import Link from "next/link";
import { Eye, TrendingUp, Users, ArrowRight } from "lucide-react";
import { getAnalyticsSummary } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const { views7d, views30d, totalLeads, leads7d, topPages, recentLeads } =
    await getAnalyticsSummary();

  const maxPageViews = Math.max(1, ...topPages.map((p) => p.count));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-400">Traffic and lead overview.</p>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <StatCard icon={Eye} label="Page views (7 days)" value={views7d} />
        <StatCard icon={TrendingUp} label="Page views (30 days)" value={views30d} />
        <StatCard icon={Users} label="Leads (7 days)" value={leads7d} sub={`${totalLeads} total`} />
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
          <h2 className="font-semibold text-brand-900">Top pages (30 days)</h2>
          <div className="mt-5 space-y-3">
            {topPages.length === 0 && <p className="text-sm text-brand-300">No page views recorded yet.</p>}
            {topPages.map((page) => (
              <div key={page.path}>
                <div className="flex justify-between text-sm text-brand-700 mb-1">
                  <span className="truncate">{page.path}</span>
                  <span className="text-brand-400">{page.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-brand-50">
                  <div
                    className="h-1.5 rounded-full bg-accent"
                    style={{ width: `${(page.count / maxPageViews) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-900">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm text-accent inline-flex items-center gap-1 hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {recentLeads.length === 0 && <p className="text-sm text-brand-300">No leads yet.</p>}
            {recentLeads.map((lead) => (
              <div key={lead.id} className="text-sm">
                <p className="font-medium text-brand-900">
                  {lead.name} <span className="text-brand-300">· {lead.company}</span>
                </p>
                <p className="text-brand-400">{lead.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-brand-400" />
        {sub && <span className="text-xs text-brand-300">{sub}</span>}
      </div>
      <div className="mt-3 text-2xl font-semibold text-brand-900">{value}</div>
      <div className="text-sm text-brand-400">{label}</div>
    </div>
  );
}

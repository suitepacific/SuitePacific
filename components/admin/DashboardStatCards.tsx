"use client";

import { useState, useEffect } from "react";
import { Eye, TrendingUp, Users } from "lucide-react";

const LS_LEADS = "admin_lastViewedLeads";
const LS_VISITORS = "admin_lastViewedVisitors";

function PingDot({ color }: { color: "red" | "orange" }) {
  const base = color === "red" ? "bg-red-500" : "bg-orange-400";
  const ping = color === "red" ? "bg-red-400" : "bg-orange-300";
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${ping}`} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${base}`} />
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  newCount = 0,
  dotColor = "red",
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  sub?: string;
  newCount?: number;
  dotColor?: "red" | "orange";
}) {
  const countColor = dotColor === "red" ? "text-red-500" : "text-orange-400";
  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-brand-400" />
        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <>
              <span className={`text-xs font-semibold tabular-nums ${countColor}`}>
                +{newCount > 99 ? "99+" : newCount} new
              </span>
              <PingDot color={dotColor} />
            </>
          )}
          {sub && <span className="text-xs text-brand-300">{sub}</span>}
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold text-brand-900">{value}</div>
      <div className="text-sm text-brand-400">{label}</div>
    </div>
  );
}

export function DashboardStatCards({
  views7d,
  views30d,
  leads7d,
  totalLeads,
}: {
  views7d: number;
  views30d: number;
  leads7d: number;
  totalLeads: number;
}) {
  const [newLeads, setNewLeads] = useState(0);
  const [newVisitors, setNewVisitors] = useState(0);

  useEffect(() => {
    async function check() {
      const leadsSince = localStorage.getItem(LS_LEADS) ?? "0";
      const visitorsSince = localStorage.getItem(LS_VISITORS) ?? "0";
      try {
        const res = await fetch(
          `/api/admin/new-counts?leadsSince=${leadsSince}&visitorsSince=${visitorsSince}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        setNewLeads(data.newLeads);
        setNewVisitors(data.newVisitors);
      } catch {
        // ignore network errors
      }
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-8 grid sm:grid-cols-3 gap-4">
      <StatCard icon={Eye} label="Page views (7 days)" value={views7d} newCount={newVisitors} dotColor="orange" />
      <StatCard icon={TrendingUp} label="Page views (30 days)" value={views30d} />
      <StatCard
        icon={Users}
        label="Leads (7 days)"
        value={leads7d}
        sub={`${totalLeads} total`}
        newCount={newLeads}
        dotColor="red"
      />
    </div>
  );
}

import type { ReferralActivity } from "@prisma/client";

const TYPE_ICONS: Record<string, { icon: string; color: string }> = {
  submitted:          { icon: "●", color: "text-blue-500" },
  status_changed:     { icon: "→", color: "text-brand-400" },
  commission_updated: { icon: "$", color: "text-amber-500" },
  payment_received:   { icon: "✓", color: "text-blue-600" },
  commission_paid:    { icon: "✓", color: "text-emerald-600" },
  note_added:         { icon: "✎", color: "text-brand-400" },
};

export function ReferralTimeline({ activities }: { activities: ReferralActivity[] }) {
  if (activities.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-6">
      <h2 className="font-semibold text-brand-900 text-sm mb-5">Activity</h2>
      <ol className="relative border-l border-brand-100 space-y-5 ml-1">
        {activities.map((a) => {
          const meta = TYPE_ICONS[a.type] ?? { icon: "●", color: "text-brand-300" };
          return (
            <li key={a.id} className="ml-5">
              <span className={`absolute -left-2 flex h-4 w-4 items-center justify-center text-xs ${meta.color}`}>
                {meta.icon}
              </span>
              <p className="text-sm text-brand-900">{a.description}</p>
              <p className="text-xs text-brand-400 mt-0.5">
                {new Date(a.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {a.actor !== "system" && ` · ${a.actor}`}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const TYPE_STYLES: Record<string, string> = {
  userevent: "bg-violet-50 text-violet-600",
  scheduled: "bg-blue-50 text-blue-600",
  mapreduce: "bg-amber-50 text-amber-600",
  suitelet: "bg-pink-50 text-pink-600",
  restlet: "bg-emerald-50 text-emerald-600",
  clientscript: "bg-orange-50 text-orange-600",
};

const TYPE_LABELS: Record<string, string> = {
  userevent: "User Event",
  scheduled: "Scheduled",
  mapreduce: "Map/Reduce",
  suitelet: "Suitelet",
  restlet: "RESTlet",
  clientscript: "Client Script",
};

export function ScriptTypeBadge({ type }: { type: string }) {
  const styles = TYPE_STYLES[type] ?? "bg-brand-50 text-brand-400";
  const label = TYPE_LABELS[type] ?? type;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {label}
    </span>
  );
}

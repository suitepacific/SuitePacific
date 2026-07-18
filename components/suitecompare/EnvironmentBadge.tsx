const ENV_STYLES: Record<string, string> = {
  production: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  sandbox: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  development: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
};

export function EnvironmentBadge({ type }: { type: string }) {
  const styles = ENV_STYLES[type] ?? "bg-brand-50 text-brand-400 ring-1 ring-brand-100";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

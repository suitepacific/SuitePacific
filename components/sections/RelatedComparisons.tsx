import Link from "next/link";
import { COMPARISONS, COMPARISON_GROUPS, type ComparisonGroup } from "@/lib/comparisons";

export function RelatedComparisons({ group, current }: { group: ComparisonGroup; current?: string }) {
  const label = COMPARISON_GROUPS.find((g) => g.id === group)?.label ?? "";
  const items = COMPARISONS.filter((c) => c.group === group && c.href !== current);
  return (
    <nav aria-label={`${label} comparisons`} className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 sm:p-6">
      <p className="text-sm font-semibold text-brand-900 mb-3">Compare your options: {label.toLowerCase()}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {items.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="text-sm text-accent hover:underline">
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`/netsuite-comparisons#${group}`} className="mt-4 inline-block text-xs text-brand-400 hover:text-accent hover:underline">
        All NetSuite comparison guides
      </Link>
    </nav>
  );
}

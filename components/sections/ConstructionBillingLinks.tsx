import Link from "next/link";

const CLUSTER = [
  { href: "/industries/construction", label: "NetSuite for construction companies" },
  { href: "/blog/netsuite-aia-billing", label: "AIA G702/G703 billing in NetSuite" },
  { href: "/netsuite-standard-billing-vs-aia-format", label: "Standard NetSuite billing vs. AIA format" },
  { href: "/netsuite-progress-billing", label: "NetSuite progress billing" },
  { href: "/netsuite-retainage-native-vs-custom", label: "Retainage: native vs. custom" },
  { href: "/netsuite-wip-report", label: "Construction WIP report" },
  { href: "/netsuite-job-costing", label: "NetSuite job costing" },
  { href: "/netsuite-construction-accounting", label: "NetSuite construction accounting" },
];

export function ConstructionBillingLinks({ current }: { current: string }) {
  return (
    <nav aria-label="Construction billing on NetSuite" className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 sm:p-6">
      <p className="text-sm font-semibold text-brand-900 mb-3">Construction billing on NetSuite</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {CLUSTER.filter((l) => l.href !== current).map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-accent hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

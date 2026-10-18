import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, FileText, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const COMPARISON_ROWS = [
  { capability: "Standard depreciation methods", native: "Yes (SL, DDB, SYD, UOP)", thirdParty: "Yes (all methods plus variations)" },
  { capability: "MACRS tax depreciation", native: "Yes", thirdParty: "Yes (deeper MACRS detail in Sage FAS)" },
  { capability: "Multi-book depreciation", native: "Yes (book and tax books per asset)", thirdParty: "Yes" },
  { capability: "ASC 842 lease accounting", native: "No (separate add-on required)", thirdParty: "Yes (NetSuite Lease module or LeaseQuery)" },
  { capability: "Physical asset auditing", native: "No", thirdParty: "Yes (Asset Panda, Sage FAS)" },
  { capability: "Barcode/RFID tracking", native: "No", thirdParty: "Yes (Asset Panda)" },
  { capability: "Maintenance scheduling", native: "Basic fields only", thirdParty: "Yes (Asset Panda, specialized tools)" },
  { capability: "IFRS revaluation (IAS 16)", native: "Manual adjustment", thirdParty: "Varies by tool" },
  { capability: "Asset count scale", native: "Up to ~1,000 assets comfortably", thirdParty: "Unlimited" },
];

const NATIVE_CAPABILITIES = [
  {
    icon: CheckCircle2,
    title: "Asset register linked to the NetSuite GL",
    description:
      "Every asset in the fixed assets module posts depreciation directly to the general ledger on schedule, with no manual journal entry required. Asset additions, disposals, and transfers all generate GL entries automatically.",
  },
  {
    icon: CheckCircle2,
    title: "Multiple depreciation methods",
    description:
      "Straight-line, double declining balance, sum-of-years-digits, MACRS including mid-quarter and mid-month conventions for US tax depreciation, and units of production are all supported natively.",
  },
  {
    icon: CheckCircle2,
    title: "Multi-book depreciation",
    description:
      "Each asset can have separate depreciation books: one for GAAP book depreciation and one for US tax (MACRS). Both run simultaneously and post to the appropriate GL accounts.",
  },
  {
    icon: CheckCircle2,
    title: "Asset disposals and transfers",
    description:
      "Assets can be disposed of with automatic gain or loss calculation, or transferred between locations and subsidiaries, with the GL entries generated automatically.",
  },
];

const NATIVE_GAPS = [
  {
    icon: XCircle,
    title: "ASC 842 lease accounting",
    description:
      "The fixed assets module does not handle the right-of-use asset and lease liability recognition required under ASC 842. A separate NetSuite Lease Accounting add-on module or a third-party tool like LeaseQuery is required.",
  },
  {
    icon: XCircle,
    title: "Physical asset auditing",
    description:
      "For companies with thousands of assets across many locations, barcode scanning, RFID tracking, and physical inventory audit workflows go beyond what the native module provides.",
  },
  {
    icon: XCircle,
    title: "Heavy equipment maintenance scheduling",
    description:
      "For industries such as construction or fleet management where maintenance-driven asset management is critical, the native module lacks maintenance work order integration.",
  },
  {
    icon: AlertTriangle,
    title: "IFRS revaluation (IAS 16)",
    description:
      "The revaluation model under IFRS IAS 16, which requires periodically revaluing assets to fair value and tracking the revaluation surplus, requires manual journal entry adjustments in NetSuite.",
  },
];

const FAQ = [
  {
    question: "What does the NetSuite Fixed Assets module include?",
    answer:
      "The NetSuite Fixed Assets module includes an asset register linked to the general ledger, multiple depreciation methods (straight-line, double declining balance, sum-of-years-digits, MACRS, units of production), mid-quarter and mid-month MACRS conventions, separate book and tax depreciation books per asset, automated depreciation posting to the GL, asset disposal and transfer transactions, and an asset hierarchy for parent and child assets. It does not include ASC 842 lease accounting, physical barcode tracking, or maintenance work order management.",
  },
  {
    question: "Does NetSuite handle ASC 842 lease accounting?",
    answer:
      "Not through the standard Fixed Assets module. NetSuite offers a separate Lease Accounting add-on module that handles the right-of-use asset and lease liability recognition required under ASC 842. Companies with significant operating leases, such as office space and equipment leases, that went live on NetSuite before addressing ASC 842 often discover this gap. The solution is either the NetSuite Lease Accounting module or a dedicated third-party tool such as LeaseQuery, which integrates with NetSuite.",
  },
  {
    question: "What is the difference between book and tax depreciation in NetSuite?",
    answer:
      "Book depreciation follows GAAP accounting rules and is typically calculated using straight-line depreciation over the asset&apos;s useful life. Tax depreciation follows IRS rules and uses MACRS, which applies accelerated depreciation in earlier years. NetSuite supports multiple depreciation books per asset, so both book and tax depreciation run simultaneously on separate books, with each posting to the appropriate GL accounts. The difference between book and tax depreciation is a common source of deferred tax assets and liabilities.",
  },
  {
    question: "Can NetSuite track physical assets with barcodes?",
    answer:
      "No. The native Fixed Assets module does not support barcode scanning, QR codes, or RFID tracking for physical asset audits. For companies that need to conduct periodic physical audits of assets across multiple locations, a third-party tool such as Asset Panda integrates with NetSuite and adds mobile barcode scanning and physical audit workflows.",
  },
  {
    question: "How do I add a new depreciation method in NetSuite?",
    answer:
      "NetSuite supports adding custom depreciation methods through the Fixed Assets module setup. New methods can be configured with a depreciation type, convention, and useful life parameters. For MACRS assets, the standard MACRS tables are built in. For unusual or custom methods, a SuiteScript-based depreciation calculation can be added. SuitePacific can review the existing depreciation configuration and add custom methods where the native options do not cover the requirement.",
  },
  {
    question: "What is the NetSuite Lease Accounting module?",
    answer:
      "The NetSuite Lease Accounting module is a separate add-on that handles ASC 842 (US GAAP) and IFRS 16 lease accounting. It manages the right-of-use asset and lease liability calculations, amortization schedules, and GL postings required by both standards. It is not included in the base NetSuite license and must be purchased separately. For companies with significant operating leases, this module is typically the correct solution before considering third-party tools.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Fixed Assets Module vs. Third-Party Tools",
  description:
    "What NetSuite's fixed assets module covers for depreciation and asset tracking, and when a third-party tool adds capabilities the native module cannot.",
  alternates: { canonical: "/netsuite-fixed-assets-native-vs-third-party" },
  openGraph: {
    title: "NetSuite Fixed Assets Module vs. Third-Party Tools",
    description:
      "What NetSuite's fixed assets module covers for depreciation and asset tracking, and when a third-party tool adds capabilities the native module cannot.",
    url: `${SITE_URL}/netsuite-fixed-assets-native-vs-third-party`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function FixedAssetsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Fixed Assets Module vs. Third-Party Tools", url: `${SITE_URL}/netsuite-fixed-assets-native-vs-third-party` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Fixed Assets Configuration and ASC 842 Support"
        description="Fixed asset module configuration, multi-book depreciation setup, ASC 842 Lease Accounting module implementation, and third-party tool integration for live NetSuite accounts."
        url={`${SITE_URL}/netsuite-fixed-assets-native-vs-third-party`}
        serviceType="NetSuite Fixed Asset Management"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: fixed asset module review, depreciation configuration, and ASC 842 gap analysis. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: Lease Accounting module setup, asset migration, and broader NetSuite administration. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full fixed asset support including third-party integrations and SuiteScript development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Fixed Asset Management"
          title="NetSuite Fixed Assets: When the Native Module Is Enough and When It Isn&apos;t"
          subtitle="What NetSuite&apos;s fixed assets module covers for depreciation and asset tracking, and when a third-party tool adds capabilities the native module cannot."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">Controller managing fixed assets in NetSuite and hitting limitations? SuitePacific helps live accounts configure the module or integrate the right tool.</p>
          <LeadFormLight />
        </div>

        <p className="mt-3 text-xs text-brand-400">
          <time dateTime="2026-10">Published October 2026</time>
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite Fixed Assets module is the native depreciation and asset register tool that tracks
            assets on the NetSuite general ledger, supports multiple depreciation methods including
            straight-line and MACRS, and manages book versus tax depreciation books per asset.
            Third-party tools refer to platforms outside NetSuite, such as Sage Fixed Assets, Asset
            Panda, or the NetSuite Lease Accounting add-on module, that handle capabilities the native
            module cannot, including ASC 842 right-of-use asset accounting, physical barcode and RFID
            asset tracking, and maintenance scheduling for heavy equipment. The native module works well
            for standard office and manufacturing equipment with moderate asset counts. The most common
            gap for live accounts is ASC 842 lease accounting: companies with significant operating
            leases need either the NetSuite Lease Accounting module or a dedicated lease tool.
            SuitePacific reviews fixed asset configurations and helps accounts address the gaps. Plans
            start at $799 per month.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does the NetSuite Fixed Assets module handle natively?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The native module covers the core fixed asset lifecycle for most mid-market companies: acquisition, depreciation, disposal, and transfer. It posts directly to the general ledger on a scheduled basis without manual journal entries.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_CAPABILITIES.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">Where does the native Fixed Assets module fall short?</h2>
          <p className="text-sm text-brand-400 mb-6">
            The native module has clear boundaries. The most common gap in live accounts is ASC 842 lease accounting, followed by physical asset tracking at scale.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NATIVE_GAPS.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">The most common gap: ASC 842 lease accounting</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            Companies with significant operating leases, such as office space or equipment leases, that went live on NetSuite before addressing ASC 842 often discover the fixed assets module cannot handle the right-of-use asset and lease liability accounting the standard requires. The NetSuite Lease Accounting module, a separate add-on, is the most common solution. For companies already using a dedicated lease management platform, LeaseQuery integrates directly with NetSuite and handles the ASC 842 calculations while syncing the GL entries into the account.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-5">Capability comparison: NetSuite Fixed Assets module vs. third-party tools</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Capability</th>
                  <th className="text-left p-4 font-semibold text-brand-900">NetSuite Fixed Assets Module</th>
                  <th className="text-left p-4 font-semibold text-brand-900">Third-Party Tools</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.capability} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 align-top">{row.capability}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.native}</td>
                    <td className="p-4 text-brand-400 align-top text-[13px]">{row.thirdParty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When is the native Fixed Assets module sufficient?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            The native module is sufficient for companies with standard manufacturing and office equipment, asset counts under approximately 1,000 assets, US GAAP depreciation needs covered by straight-line or MACRS, and no significant ASC 842 lease exposure. If the company does not have material operating leases, does not need physical barcode tracking, and does not manage heavy equipment with maintenance requirements, the native module handles the workload without gaps.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-900 mb-3">When does a third-party tool add genuine value?</h2>
          <p className="text-sm text-brand-400 leading-relaxed">
            A third-party tool adds genuine value when one of the native gaps is materially affecting the close process or the financial statements. The most common trigger is an ASC 842 audit finding: if the auditors have flagged the lease accounting treatment, the NetSuite Lease Accounting module or a dedicated lease tool needs to be in place before the next audit cycle. The second trigger is a physical asset count that has grown beyond what the native module can manage cleanly, typically when the team is maintaining a parallel spreadsheet to track physical asset locations and conditions.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">How SuitePacific helps</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific reviews each account&apos;s asset register, depreciation requirements, and ASC 842 lease exposure to determine whether the native module is configured correctly or whether additional tooling is needed. For accounts with ASC 842 gaps, SuitePacific configures the NetSuite Lease Accounting module and migrates existing lease data. Month-to-month from $799.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lease-accounting" className="text-accent hover:underline">
                NetSuite Lease Accounting module
              </Link>{" "}
              covers ASC 842 and IFRS 16 implementation in detail.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-account-optimization" className="text-accent hover:underline">
                NetSuite account optimization
              </Link>{" "}
              covers module configuration reviews and gap analysis for live accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
                NetSuite post-go-live support
              </Link>{" "}
              covers ongoing support for live accounts addressing configuration gaps.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-brand-700 mb-3">Ready to get the right approach in place? SuitePacific works with live NetSuite accounts month-to-month.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

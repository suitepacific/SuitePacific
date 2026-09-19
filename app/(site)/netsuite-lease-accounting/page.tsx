import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Settings, BarChart2, AlertTriangle, Calendar, RefreshCcw } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const LEASE_OBJECTS = [
  { object: "Lease Record", description: "Stores the lease contract terms: commencement date, end date, base rent, discount rate, and classification (operating vs. finance)" },
  { object: "ROU Asset", description: "Right-of-use asset recognized on the balance sheet at commencement; amortized over the lease term" },
  { object: "Lease Liability", description: "Present value of future lease payments recognized at commencement; reduced by the principal portion of each payment" },
  { object: "Recognition Schedule", description: "Period-by-period amortization table showing interest, amortization, and liability reduction for each payment date" },
];

const LEASE_GAPS = [
  { icon: AlertTriangle, title: "Incorrect lease classification.", description: "ASC 842 requires classification of each lease as operating or finance based on five criteria. Misclassifying a finance lease as operating produces wrong income statement presentation: interest and amortization instead of a single straight-line lease cost. The error flows through every period of the lease term." },
  { icon: AlertTriangle, title: "Missing discount rate.", description: "Each lease liability must be discounted to present value using the rate implicit in the lease or, if not determinable, the incremental borrowing rate. Leaving the discount rate at zero overstates the liability at commencement and produces recognition schedules that do not match the economics of the contract." },
  { icon: AlertTriangle, title: "Lease modifications not handled.", description: "When a lease is extended, terminated early, or partially surrendered, ASC 842 requires remeasurement of the ROU asset and liability as of the modification date. Manual journal entry adjustments posted outside the lease schedule create permanent reconciling differences between the schedule and the general ledger." },
  { icon: AlertTriangle, title: "Disclosure schedules missing.", description: "ASC 842 requires maturity analysis, weighted average lease term, weighted average discount rate, and variable lease cost disclosures in the financial statements. These require custom saved searches pulling data from lease records; standard NetSuite financial reports do not produce them." },
];

const WHAT_WE_DO = [
  { icon: FileText, title: "Lease record setup", description: "Configure a lease record for each operating and finance lease with commencement date, end date, classification, base rent schedule, discount rate, and any lease incentives or initial direct costs. Validate the opening ROU asset and liability balance against the amortization schedule." },
  { icon: Settings, title: "Amortization schedule validation", description: "Verify the period-by-period recognition schedule for each lease against the present value calculation for the liability and the straight-line cost for operating leases. Identify and correct schedules where the opening balance or payment allocation does not match the lease terms." },
  { icon: RefreshCcw, title: "Lease modification workflow", description: "Build a structured process for handling lease extensions, terminations, and partial surrenders. Remeasure the ROU asset and liability as of the modification date and post the adjustment entry correctly so the schedule stays in sync with the general ledger." },
  { icon: BarChart2, title: "ASC 842 disclosure saved searches", description: "Build saved searches for the maturity analysis (future minimum lease payments by year), weighted average remaining lease term, weighted average discount rate, and variable and short-term lease costs required for footnote disclosure." },
];

const FAQ = [
  {
    question: "Which NetSuite firm does ASC 842 lease accounting configuration?",
    answer: "SuitePacific configures NetSuite lease accounting for companies required to recognize operating and finance leases on the balance sheet under ASC 842 or IFRS 16. The engagement covers lease record setup, ROU asset and liability amortization schedule validation, lease modification handling, monthly recognition journal automation, and ASC 842 disclosure saved searches. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and accounting teams. Plans start at $799 per month on month-to-month terms after a three-month minimum.",
  },
  {
    question: "What does NetSuite configure automatically for ASC 842, and what requires setup?",
    answer: "NetSuite&apos;s lease management module creates recognition schedules from lease record data and can post monthly amortization and interest entries on a schedule. What requires setup: each lease record must be created with the correct classification, discount rate, and payment schedule; the recognition accounts must be mapped; and the amortization schedules must be validated before posting begins. NetSuite will not produce a correct schedule without accurate input data and account mapping. Lease modifications require manual intervention to remeasure and post adjustments.",
  },
  {
    question: "What is a right-of-use asset under ASC 842?",
    answer: "A right-of-use (ROU) asset represents a lessee&apos;s right to use a leased asset for the lease term. Under ASC 842, the ROU asset is recognized on the balance sheet at the commencement date at an amount equal to the initial lease liability, adjusted for prepaid lease payments, lease incentives received, and initial direct costs. For operating leases, the ROU asset is reduced so that total lease cost remains straight-line over the term. For finance leases, the ROU asset is amortized separately from the interest component of the liability.",
  },
  {
    question: "How does NetSuite handle lease modifications under ASC 842?",
    answer: "When a lease is modified, the lessee must determine whether the modification is a separate new lease or a modification of the original lease. If it is a modification, the lease liability is remeasured at the modification date using a revised discount rate, and the ROU asset is adjusted by the same amount. NetSuite&apos;s lease module requires the lease record to be updated manually; the system does not automatically detect changes to contractual terms. SuitePacific builds a modification workflow that captures the effective date, recalculates the liability, and posts the adjustment so the schedule and general ledger remain in sync.",
  },
  {
    question: "What ASC 842 disclosures does NetSuite require custom saved searches for?",
    answer: "ASC 842 requires a maturity analysis of future minimum lease payments by year for each lease classification, weighted average remaining lease term by classification, weighted average discount rate by classification, and separate disclosure of variable lease costs, short-term lease costs, and sublease income. NetSuite does not produce these disclosures from standard financial reports. Each disclosure requires a saved search pulling data from lease records and summarizing by classification and period.",
  },
  {
    question: "Can companies with many leases automate monthly recognition entries in NetSuite?",
    answer: "Yes. For companies with large lease portfolios, manually posting recognition entries each period is error-prone. NetSuite can be configured to run a scheduled script that reads the amortization schedule for each active lease, generates the recognition journal entries, and posts them on a defined date each month. SuitePacific designs and builds the automation so that the entries match the schedule exactly and exceptions (such as leases ending mid-period) are handled correctly.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Lease Accounting: ASC 842 Configuration and ROU Asset Setup",
  description: "ASC 842 right-of-use asset and liability setup, lease modifications, and disclosure saved searches for accounts already live on NetSuite. Plans from $799/month.",
  alternates: { canonical: "/netsuite-lease-accounting" },
  openGraph: {
    title: "NetSuite Lease Accounting: ASC 842 Configuration and ROU Asset Setup",
    description: "NetSuite lease accounting for ASC 842 and IFRS 16 requires setup that does not happen automatically. SuitePacific configures lease records, ROU asset and liability schedules, modification workflows, and disclosure saved searches for real estate and corporate finance teams.",
    url: `${SITE_URL}/netsuite-lease-accounting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function LeaseAccountingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite Lease Accounting", url: `${SITE_URL}/netsuite-lease-accounting` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Lease Accounting"
        description="ASC 842 and IFRS 16 lease accounting configuration: lease record setup, ROU asset and liability amortization schedules, modification workflows, monthly recognition automation, and disclosure saved searches."
        url={`${SITE_URL}/netsuite-lease-accounting`}
        serviceType="NetSuite Real Estate Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: lease record setup, schedule validation, modification entries. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full ASC 842 configuration, automation scripts, disclosure saved searches. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete lease portfolio setup, ongoing modification support, and audit disclosure package. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Real Estate"
          title="NetSuite Lease Accounting: ASC 842 Configuration and ROU Asset Setup"
          subtitle="ASC 842 requires most operating leases to appear on the balance sheet as a right-of-use asset and lease liability. SuitePacific configures NetSuite lease records, amortization schedules, modification workflows, and audit disclosure saved searches for real estate companies and corporate lessees."
          align="left"
        />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · ASC 842 lease accounting · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Lease accounting in NetSuite</strong> refers to the configuration required to comply with ASC 842, which mandates that operating and finance leases with terms longer than 12 months be recognized as right-of-use assets and lease liabilities on the balance sheet. Standard NetSuite does not include a native ASC 842 lease schedule generator; ROU asset and liability amortization schedules must be built as custom records with SuiteScript-driven journal entries.
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures NetSuite lease accounting for companies that must capitalize operating and finance leases on the balance sheet under ASC 842 or IFRS 16. ASC 842 requires each lease to be recorded with a right-of-use asset and a corresponding lease liability equal to the present value of future payments, discounted at the rate implicit in the lease or the incremental borrowing rate. NetSuite&apos;s lease module creates recognition schedules from lease records, but the records must be set up correctly; the system does not automatically classify leases, calculate discount rates, or handle modifications. SuitePacific sets up each lease record, validates the amortization schedule, builds a modification workflow for extensions and terminations, automates monthly recognition entries, and creates the ASC 842 disclosure saved searches required for audit. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the core lease accounting objects in NetSuite?</h2>
          <p className="text-sm text-brand-400 mb-5">NetSuite&apos;s lease module introduces four objects. All four must be correctly configured before the system produces recognition entries that match the ASC 842 standard.</p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="text-left p-4 font-semibold text-brand-900">Object</th>
                  <th className="text-left p-4 font-semibold text-brand-900">What it is</th>
                </tr>
              </thead>
              <tbody>
                {LEASE_OBJECTS.map((row, i) => (
                  <tr key={row.object} className={i < LEASE_OBJECTS.length - 1 ? "border-b border-brand-100" : ""}>
                    <td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.object}</td>
                    <td className="p-4 text-brand-400 text-[13px]">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common lease accounting problems on live NetSuite accounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LEASE_GAPS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific deliver for ASC 842 lease accounting?</h2>
          <p className="text-sm text-brand-400 mb-6">Every engagement starts with a review of the lease portfolio and the company&apos;s accounting policy before any configuration begins. Lease records set up without reviewing classification criteria and discount rates produce schedules that are wrong from day one.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (
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

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite lease accounting</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm real estate and finance teams use for ASC 842 configuration and lease portfolio setup.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused on post-go-live finance configuration. ASC 842 lease record setup, ROU asset and liability schedule validation, modification handling, and audit disclosure saved searches are core deliverables for real estate and corporate clients.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every engagement starts with a review of lease portfolio and classification criteria before touching the system</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/industries/real-estate" className="text-accent hover:underline">NetSuite for real estate companies</Link> and <Link href="/netsuite-real-estate-accounting" className="text-accent hover:underline">NetSuite real estate accounting</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need ASC 842 lease accounting configured in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the lease portfolio (number of leases, operating vs. finance, any modifications pending) and what the current setup is producing. We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-real-estate-accounting" className="text-accent hover:underline">NetSuite real estate accounting</Link> covers multi-entity setup, equity waterfall tracking, and investor reporting for property owners and developers.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-property-management-accounting" className="text-accent hover:underline">NetSuite property management accounting</Link> covers tenant billing, CAM reconciliation, and security deposit tracking for property managers.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-arm-configuration" className="text-accent hover:underline">NetSuite ARM configuration</Link> covers Advanced Revenue Management for companies with similar deferred recognition mechanics.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> covers ongoing finance configuration as part of a monthly retainer.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to configure ASC 842 lease accounting in NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us about the lease portfolio and the current state of the configuration. We will scope the engagement.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

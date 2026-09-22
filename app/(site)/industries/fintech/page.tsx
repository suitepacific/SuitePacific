import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  BarChart2,
  Workflow,
  Code2,
  Users,
  RefreshCcw,
  Award,
  Globe,
  FileText,
  Headphones,
  Plug,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: FileText,
    title: "Revenue recognition complexity",
    description:
      "ASC 606 and IFRS 15 multi-element arrangement handling for fintech products that combine SaaS subscriptions, transaction processing, and one-time implementation fees on a single customer contract.",
  },
  {
    icon: Globe,
    title: "Multi-currency and multi-entity",
    description:
      "Global fintech operations with entities in multiple jurisdictions require intercompany elimination, consolidated reporting, and currency revaluation automation across subsidiaries.",
  },
  {
    icon: ShieldCheck,
    title: "Audit trail and compliance",
    description:
      "SOX compliance for public or pre-IPO fintech companies requires locked period enforcement, segregation-of-duties role builds, and audit-ready transaction records with change history.",
  },
  {
    icon: CreditCard,
    title: "Payment and banking integration",
    description:
      "Connecting NetSuite to payment processors, banking APIs, and card issuing platforms for automated settlement reconciliation, cash application, and real-time cash position reporting.",
  },
  {
    icon: TrendingUp,
    title: "Investor and board reporting",
    description:
      "Fintech boards and investors require recurring revenue metrics, unit economics, and liquidity reporting that standard NetSuite financial statements do not produce without custom saved searches.",
  },
  {
    icon: BarChart2,
    title: "Transaction volume billing",
    description:
      "Usage-based billing models where invoice amounts depend on transaction counts, AUM, or processing volume require scheduled import scripts and custom invoice line generation.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for transaction-based billing, ASC 606 recognition automation, payment reconciliation imports, and fintech-specific business rules across all SuiteScript types.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for period-close approvals, expense authorization chains, SOD-enforced AP workflows, and compliance-driven review and sign-off sequences.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "ARR, net revenue retention, LTV, CAC payback, and cash runway saved searches built with SuiteQL for finance, leadership, and investor reporting.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and scheduled script integrations connecting NetSuite to payment processors, banking APIs, Salesforce, and data warehouse platforms for automated financial data flow.",
    href: "/netsuite-integrations",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for live fintech NetSuite accounts: new development, release testing, configuration changes, and break-fix response on a month-to-month retainer.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration: role and permission management, SOD enforcement, period close support, user provisioning, and platform troubleshooting for fintech teams.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "ASC 606 multi-element arrangement scripts",
    description:
      "User Event scripts that allocate transaction price across performance obligations at contract creation, creating revenue schedules that recognize revenue as each obligation is satisfied.",
  },
  {
    title: "Payment processor reconciliation import",
    description:
      "Scheduled Map/Reduce scripts that pull daily settlement data from Stripe, Adyen, or Braintree via API and match it against NetSuite payment records, flagging unmatched items for review.",
  },
  {
    title: "Net revenue retention saved searches",
    description:
      "SuiteQL-based saved searches that calculate NRR from subscription invoice history, showing expansion, contraction, and churn by customer cohort for investor reporting.",
  },
  {
    title: "SOD-enforced approval workflows",
    description:
      "SuiteFlow workflows that enforce segregation of duties by requiring a different approver than the originator for AP, journal entries, and expense reports above defined thresholds.",
  },
  {
    title: "Intercompany elimination scripts",
    description:
      "Scheduled scripts that generate intercompany elimination journal entries for multi-entity fintech groups, reducing period-close time and eliminating manual intercompany reconciliation.",
  },
  {
    title: "CAC and LTV reporting dashboards",
    description:
      "Saved searches and KPI portlets showing customer acquisition cost, lifetime value, payback period, and unit economics by acquisition cohort for finance and board review.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Ongoing knowledge of your fintech NetSuite account across every engagement. Each request builds on prior work without re-discovery.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account.",
  },
];

const COMPARISON = [
  {
    capability: "Revenue recognition",
    standard: "ARM schedules per invoice line",
    withSP: "Automated ASC 606 multi-element allocation scripts on contract creation",
  },
  {
    capability: "Payment reconciliation",
    standard: "Manual bank statement matching",
    withSP: "Automated daily settlement import from payment processor APIs",
  },
  {
    capability: "Investor metrics",
    standard: "Standard P&L and balance sheet",
    withSP: "NRR, CAC payback, ARR, and LTV saved searches via SuiteQL",
  },
  {
    capability: "SOD compliance",
    standard: "Manual role review",
    withSP: "Enforced approval workflows with originator-approver separation rules",
  },
  {
    capability: "Multi-entity reporting",
    standard: "Manual intercompany journal entries",
    withSP: "Automated intercompany elimination scripts for period close",
  },
  {
    capability: "Transaction billing",
    standard: "Manual invoice creation from usage data",
    withSP: "Scheduled import scripts generating invoices from processor volume data",
  },
];

const FAQ = [
  {
    question: "Does NetSuite work for fintech companies?",
    answer:
      "Yes. NetSuite is widely used by fintech companies for subscription and transaction billing, revenue recognition under ASC 606 and IFRS 15, multi-entity consolidation, and investor reporting. Post-go-live customization is typically required for payment processor reconciliation, NRR and LTV metrics, SOD-enforced approval workflows, and integration with banking and data warehouse platforms.",
  },
  {
    question: "What is NetSuite used for in fintech?",
    answer:
      "Fintech companies use NetSuite for recurring revenue billing, deferred revenue management, ASC 606 recognition schedules, multi-currency AP and AR, multi-entity consolidation, and financial reporting. Custom development adds transaction-based billing imports, payment processor reconciliation, SOD compliance workflows, and investor-facing metrics including NRR, CAC, and LTV.",
  },
  {
    question: "How does NetSuite handle ASC 606 for fintech?",
    answer:
      "NetSuite&apos;s Advanced Revenue Management module supports ASC 606 revenue schedule creation per invoice line. Multi-element arrangements with separate performance obligations require custom User Event scripts that allocate transaction price at contract creation and generate the appropriate revenue schedules. SuitePacific builds this customization for fintech contracts that bundle SaaS, processing, and implementation fees.",
  },
  {
    question: "Can NetSuite integrate with payment processors?",
    answer:
      "Yes, via custom RESTlet or scheduled Map/Reduce scripts. SuitePacific builds integrations that pull daily settlement data from Stripe, Adyen, Braintree, and other processors, match it against NetSuite payment records, and flag unmatched items for review. This replaces manual bank reconciliation with an automated daily process.",
  },
  {
    question: "What NetSuite reporting do fintech investors require?",
    answer:
      "Fintech boards and investors typically require ARR, NRR, MRR, churn rate, CAC, CAC payback, LTV, and cash runway. None of these are produced natively by NetSuite&apos;s standard financial reports. SuitePacific builds them as SuiteQL-based saved searches and KPI portlets on finance and leadership dashboards.",
  },
  {
    question: "How does NetSuite handle SOX compliance for fintech?",
    answer:
      "NetSuite supports SOX compliance through period locking, role-based access control, and transaction audit trails. Custom SuiteFlow workflows add segregation-of-duties enforcement, requiring different users to originate and approve AP, journal entries, and expense reports. SuitePacific designs and implements the role architecture and workflow logic for pre-IPO and public fintech companies.",
  },
  {
    question: "What NetSuite challenges are specific to fintech?",
    answer:
      "Common fintech-specific NetSuite challenges include multi-element revenue recognition for bundled contracts, daily payment processor reconciliation at volume, SOD enforcement for compliance readiness, intercompany elimination across multiple entities, transaction-volume billing models, and investor reporting metrics that standard NetSuite financials do not produce without custom saved searches.",
  },
  {
    question: "Who provides NetSuite support for fintech companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for fintech companies, including SuiteScript development for billing and reconciliation logic, SuiteFlow compliance workflows, investor reporting saved searches, payment processor integrations, multi-entity consolidation automation, and ongoing technical support on a month-to-month retainer.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Fintech Companies | SuitePacific",
  description:
    "NetSuite post-go-live support for fintech companies. ASC 606 automation, payment reconciliation, investor reporting, SOD compliance, and multi-entity consolidation.",
  alternates: { canonical: "/industries/fintech" },
  openGraph: {
    title: "NetSuite Support for Fintech Companies | SuitePacific",
    description:
      "NetSuite post-go-live support for fintech companies: ASC 606 automation, payment reconciliation, investor metrics, and SOD compliance workflows.",
    url: `${SITE_URL}/industries/fintech`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function FintechPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Fintech", url: `${SITE_URL}/industries/fintech` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Fintech Companies"
        description="NetSuite post-go-live support for fintech companies including ASC 606 automation, payment reconciliation, investor reporting, and SOD compliance workflows."
        url={`${SITE_URL}/industries/fintech`}
        serviceType="NetSuite Fintech Support"
        datePublished="2026-09-23T00:00:00+00:00"
        dateModified="2026-09-23T00:00:00+00:00"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteScript, workflow automation, saved searches, and NetSuite administration for fintech accounts. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active fintech development including billing automation, reconciliation scripts, and integration maintenance. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full fintech NetSuite coverage including multi-entity builds, compliance workflows, and investor reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Fintech"
          title="NetSuite Support & Development for Fintech Companies"
          subtitle="Technical support, SuiteScript customization, and compliance automation for fintech companies already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your fintech account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-09">Published September 2026</time>
        </p>

        {/* QA block */}
        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite support for fintech companies refers to post-go-live technical assistance covering the customizations that financial technology firms require beyond standard NetSuite accounting: ASC 606 multi-element revenue recognition, payment processor reconciliation, investor-facing metrics, SOD compliance workflows, and multi-entity consolidation. Fintech companies on NetSuite typically need custom SuiteScript development for transaction-volume billing, scheduled settlement imports from payment processors, and SuiteQL saved searches for ARR, NRR, CAC, and LTV reporting that the standard financial reports do not produce natively. SuitePacific provides this development and ongoing support for live fintech NetSuite accounts on a month-to-month retainer starting at $799 per month. Engagements include SuiteScript across all script types, SuiteFlow compliance workflows, integration maintenance, and release upgrade preparation each NetSuite release cycle.
          </p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">
          Fintech companies selecting NetSuite for revenue recognition and multi-entity consolidation commonly find that
          ASC 606 multi-element arrangements, payment processor reconciliation, and investor reporting require SuiteScript
          development beyond what NetSuite&apos;s Advanced Revenue Management module and standard financial reports provide.
          SuitePacific covers this technical layer for fintech accounts already live on NetSuite: billing automation,
          recognition scripts, compliance workflow builds, payment reconciliation imports, and investor-metric saved searches.
          Development is tested in Sandbox before production deployment, and all work is done directly without offshore
          handoffs or account manager intermediaries.
        </p>

        {/* Comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for fintech companies?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-100">
                  <th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th>
                  <th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                  <th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-brand-50">
                    <td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td>
                    <td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td>
                    <td className="py-3 text-brand-700 align-top">{row.withSP}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Challenges */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite challenges do fintech companies face?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHALLENGES.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite services does SuitePacific provide for fintech?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors">
                  <IconBadge icon={service.icon} />
                  <div>
                    <h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-400">{service.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Customizations */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What are common NetSuite customizations for fintech companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the builds SuitePacific delivers for fintech accounts on a recurring basis.
          </p>
          <div className="space-y-4">
            {CUSTOMIZATIONS.map((item, i) => (
              <div key={item.title} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why do fintech companies choose SuitePacific?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SP.map((item) => (
              <Card key={item.title} className="p-5 flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-sm text-brand-400">
            Not live yet? See our{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support" className="text-accent hover:underline">
              implementation partner vs. managed support guide
            </Link>{" "}
            instead.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-arr-mrr-reporting" className="text-accent hover:underline">
                NetSuite ARR and MRR reporting
              </Link>{" "}
              covers how to build subscription revenue metrics from NetSuite data using SuiteQL saved searches.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              explains the retainer structure, hour tiers, and what is covered across all plan levels.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/saas-technology" className="text-accent hover:underline">
                NetSuite for SaaS and technology companies
              </Link>{" "}
              covers subscription billing and renewal automation for technology businesses on NetSuite.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

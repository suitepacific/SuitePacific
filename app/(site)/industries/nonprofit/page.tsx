import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Workflow,
  BarChart2,
  FileText,
  Gauge,
  Headphones,
  ShieldCheck,
  Users,
  RefreshCcw,
  Award,
  BookOpen,
  HandCoins,
  Building2,
  ClipboardCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  OrganizationJsonLd,
  VideoObjectJsonLd,
} from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: BookOpen,
    title: "Grant and fund accounting report failures",
    description:
      "Standard NetSuite reporting does not segregate grant activity by funding source or program without custom saved searches. Organizations need SuiteScript to enforce fund coding on transactions and produce accurate grant expenditure reports.",
  },
  {
    icon: Workflow,
    title: "Restricted vs. unrestricted fund tracking",
    description:
      "NetSuite does not natively prevent posting unrestricted revenue against restricted fund segments. Enforcement scripts and custom validation rules are required to maintain accurate fund balance reporting for auditors and board members.",
  },
  {
    icon: BarChart2,
    title: "Board and program reporting dashboards",
    description:
      "Boards typically need program-level P&L, budget versus actual by program or grant, and multi-period comparisons that standard NetSuite dashboards cannot produce without custom saved searches and role-specific KPI portlets.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit readiness and 990 data cleanup",
    description:
      "Form 990 requires precise functional expense allocation across program services, management, and fundraising. Nonprofits leaving implementation often lack the saved searches and allocation scripts needed to produce audit-ready schedules.",
  },
  {
    icon: Building2,
    title: "Multi-entity umbrella structures",
    description:
      "Umbrella nonprofits with multiple subsidiaries or fiscal sponsorship arrangements need intercompany elimination configurations, entity-level fund reporting, and consolidated dashboards that reflect each entity's restricted balances separately.",
  },
  {
    icon: HandCoins,
    title: "Donation and pledge tracking",
    description:
      "Pledge fulfillment, recurring donation posting, and donor acknowledgement workflows typically require SuiteScript because standard NetSuite cash sale and customer deposit records do not natively model pledge schedules or gift restrictions.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom User Event, Scheduled, Map/Reduce, and Suitelet scripts for fund enforcement, grant tracking, donation posting, and nonprofit-specific business rules.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow approval workflows for grant requests, purchase orders, expense reimbursements, and board-level approvals with conditional routing and automated notifications.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches and Dashboards",
    description:
      "Board reporting dashboards, program-level P&L, budget versus actual by grant, functional expense allocation reports, and donor giving summaries using saved searches and KPI portlets.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for your live nonprofit NetSuite account: new development, fixes, release testing, and account upkeep on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description:
      "Custom donor acknowledgement letters, grant reporting templates, and board financial report layouts built with FreeMarker and conditional field logic.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Gauge,
    title: "Account Optimization",
    description:
      "Performance diagnostics for nonprofit NetSuite accounts with growing transaction volume: governance limit fixes, script audits, saved search indexing, and technical debt cleanup.",
    href: "/netsuite-account-optimization",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Restricted fund enforcement scripts",
    description:
      "User Event scripts that validate fund segment coding on journal entries and expense transactions, preventing unrestricted activity from posting to restricted fund balances and surfacing violations before they reach the general ledger.",
  },
  {
    title: "Grant expenditure and balance reporting",
    description:
      "Saved searches and SuiteQL queries that show grant balance remaining, expenditures by grant and period, and budget versus actual by funding source, formatted for grant officer review and funder reporting requirements.",
  },
  {
    title: "Pledge fulfillment automation",
    description:
      "Scheduled scripts that match incoming donation payments to open pledges, update pledge fulfillment status, generate donor acknowledgement PDFs, and flag pledges past due for development team follow-up.",
  },
  {
    title: "Functional expense allocation scripts",
    description:
      "Map/Reduce scripts that allocate shared expenses across program services, management, and fundraising categories based on configured allocation percentages, producing the functional expense schedules required for 990 preparation and audits.",
  },
  {
    title: "Board reporting dashboard builds",
    description:
      "Role-specific dashboards with KPI portlets for program-level net assets, grant pipeline and awards, budget versus actual by program, and restricted versus unrestricted fund balances updated from saved searches without manual exports.",
  },
  {
    title: "Multi-entity intercompany configuration",
    description:
      "Intercompany transaction scripts and elimination journal automation for umbrella nonprofits with multiple subsidiaries, enabling consolidated reporting that reflects each entity's fund restrictions and net asset classes separately.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "Oracle NetSuite's SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager as an intermediary, no offshore handoffs.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Ongoing knowledge of your nonprofit NetSuite account retained across every engagement. Each request builds on prior work without re-discovery.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with organizations already live on NetSuite. No implementations, no pre-go-live work. Every engagement is ongoing development and support.",
  },
];

const FAQ = [
  {
    question: "Does NetSuite work for nonprofit organizations?",
    answer:
      "Yes. NetSuite supports nonprofit accounting through its fund accounting capabilities, multi-entity structures, and grant management features. Oracle runs a dedicated NetSuite.org program that provides discounted or donated licenses to qualifying nonprofits. Post-go-live, most organizations need SuiteScript customization to enforce fund restrictions, produce program-level financial reports, and handle donation and pledge tracking beyond what standard configuration provides.",
  },
  {
    question: "What is NetSuite used for in nonprofit organizations?",
    answer:
      "Nonprofits use NetSuite to manage fund accounting with restricted and unrestricted balances, grant income and expenditure tracking, multi-program budgeting, donor and pledge management, purchase order approvals, expense reimbursements, and board-level financial reporting. Organizations with multiple subsidiaries or fiscal sponsorship arrangements also use NetSuite's multi-entity and intercompany features. Custom SuiteScript development is typically required to enforce fund restrictions, produce 990-ready expense schedules, and automate pledge fulfillment.",
  },
  {
    question: "What are common NetSuite problems for nonprofit organizations?",
    answer:
      "The most common issues are restricted fund enforcement that requires SuiteScript because standard configuration does not prevent incorrect fund coding, grant expenditure reporting that NetSuite cannot produce natively without custom saved searches, functional expense allocation for 990 preparation that requires allocation scripts, pledge fulfillment tracking that needs custom logic to match payments to open pledges, and board reporting dashboards that require saved searches and KPI portlets beyond what standard dashboards provide.",
  },
  {
    question: "Can NetSuite handle restricted and unrestricted fund accounting?",
    answer:
      "Yes, but enforcing the separation requires custom configuration. NetSuite's segment and classification fields can track fund types, but preventing unrestricted transactions from posting to restricted fund segments requires User Event validation scripts. Reporting by fund class, net asset category, and program also requires custom saved searches. SuitePacific builds and maintains these enforcement scripts and reporting tools for nonprofits already live on NetSuite.",
  },
  {
    question: "How does NetSuite support grant management for nonprofits?",
    answer:
      "NetSuite supports grant management through projects, custom records, and saved searches configured to track grant awards, expenditures by funding source, and remaining balances. Standard configuration provides the data model; SuiteScript is typically required to enforce grant coding on transactions, automate funder reporting schedules, and produce the budget versus actual reports that grant officers need. Some organizations also integrate NetSuite with CRM platforms like Salesforce to manage grant pipelines and donor relationships.",
  },
  {
    question: "Can NetSuite produce Form 990 reporting?",
    answer:
      "NetSuite does not generate Form 990 directly, but it can provide the underlying financial data needed for 990 preparation. This requires functional expense allocation across program services, management, and fundraising categories, which typically needs custom allocation scripts. SuitePacific builds the saved searches, allocation logic, and reporting dashboards that make it practical to extract 990-ready schedules from NetSuite without manual spreadsheet work.",
  },
  {
    question: "What does post-go-live NetSuite support look like for a nonprofit?",
    answer:
      "For a nonprofit, ongoing support typically covers restricted fund enforcement scripts, grant and program reporting builds, functional expense allocation maintenance, pledge fulfillment automation, board reporting dashboards, and release testing when NetSuite updates affect existing customizations. Engagements are month-to-month with no long-term contract. Work is tested in Sandbox before any change reaches production.",
  },
  {
    question: "Can NetSuite handle a multi-entity nonprofit structure?",
    answer:
      "Yes. NetSuite's multi-entity features support umbrella nonprofits with multiple subsidiaries, affiliated organizations, or fiscal sponsorship arrangements. Each entity can maintain its own fund balances, chart of accounts, and reporting. Intercompany eliminations and consolidated reporting require configuration and in some cases custom scripts. SuitePacific builds and maintains intercompany automation and entity-level dashboards for multi-entity nonprofit NetSuite accounts.",
  },
  {
    question: "How can NetSuite track donations and pledges for nonprofits?",
    answer:
      "Donation and pledge tracking in NetSuite typically uses a combination of customer records for donors, custom transaction types or projects for pledge agreements, and scheduled scripts for fulfillment matching. Standard NetSuite does not model multi-year pledge schedules or restricted gift tracking natively, so SuiteScript development is usually required. SuitePacific builds pledge automation, donor acknowledgement PDF workflows, and development team dashboards for nonprofits on NetSuite.",
  },
  {
    question: "Who provides NetSuite support for nonprofit organizations?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for nonprofit organizations, including fund restriction enforcement scripts, grant expenditure and balance reporting, functional expense allocation for 990 preparation, pledge fulfillment automation, board reporting dashboards, and ongoing technical support. We work on a month-to-month basis with no long-term contract.",
  },
  {
    question: "How does SuitePacific support nonprofit organizations using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for nonprofits on a month-to-month basis. This includes SuiteScript development for fund restriction enforcement and grant tracking, SuiteFlow approval workflow builds for expense and grant requests, custom saved searches and KPI dashboards for board and program reporting, functional expense allocation scripts for 990 preparation, pledge fulfillment automation, and advanced PDF templates for donor acknowledgement letters. We work directly with your team without an account manager layer.",
  },
];

const COMPARISON = [
  {
    capability: "Fund restriction enforcement",
    standard: "Classification fields available, posting not restricted",
    withSP: "User Event validation scripts that block incorrect fund coding before save",
  },
  {
    capability: "Grant expenditure reporting",
    standard: "Standard transaction reports by class or department",
    withSP: "Grant balance, spend-to-date, and budget vs. actual saved searches by funding source",
  },
  {
    capability: "Functional expense allocation",
    standard: "Manual journal entries or spreadsheet exports",
    withSP: "Automated allocation scripts that split shared expenses by configured percentages",
  },
  {
    capability: "Pledge and donation tracking",
    standard: "Customer deposits and cash sales without pledge schedule logic",
    withSP: "Pledge fulfillment matching scripts with acknowledgement PDF automation",
  },
  {
    capability: "Board reporting dashboards",
    standard: "Standard dashboard portlets for transactions",
    withSP: "Role-specific dashboards with program P&L, fund balances, and grant pipeline KPIs",
  },
  {
    capability: "Multi-entity consolidation",
    standard: "Subsidiary consolidation with manual elimination entries",
    withSP: "Intercompany elimination scripts and entity-level fund balance reporting",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Nonprofit Organizations",
  description:
    "NetSuite post-go-live support and development for nonprofit organizations. Fund accounting enforcement, grant tracking, board reporting, 990 preparation, and ongoing technical support.",
  alternates: { canonical: "/industries/nonprofit" },
  openGraph: {
    title: "NetSuite Support for Nonprofit Organizations",
    description:
      "NetSuite post-go-live support and development for nonprofits. Fund restriction enforcement, grant tracking, board reporting dashboards, and 990 preparation.",
    url: "https://suitepacific.com/industries/nonprofit",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function NonprofitPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Nonprofit", url: `${SITE_URL}/industries/nonprofit` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Nonprofit Organizations"
        description="NetSuite post-go-live support and development for nonprofit organizations, including fund accounting enforcement, grant tracking, board reporting, and 990 preparation."
        url={`${SITE_URL}/industries/nonprofit`}
        serviceType="NetSuite Nonprofit Support"
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Nonprofit"
          title="NetSuite Support & Development for Nonprofit Organizations"
          subtitle="Technical support, fund accounting enforcement, grant tracking, and board reporting for nonprofits already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-08">Published August 2026</time>
        </p>

        <p className="mt-8 text-sm text-brand-400">
          Nonprofit organizations go live on NetSuite with basic fund accounting configuration and
          typically discover within months that restricted fund enforcement, grant expenditure
          reporting, and board-level dashboards require custom SuiteScript logic that standard
          configuration cannot provide. SuitePacific provides this technical layer for nonprofits
          already live on NetSuite, covering fund restriction scripts, grant tracking saved searches,
          functional expense allocation for 990 preparation, pledge fulfillment automation, and
          ongoing development as reporting and compliance requirements evolve. Our lead developer
          holds Oracle NetSuite&apos;s SuiteCloud Developer II certification. Work is done directly
          with no offshore handoffs or account manager layer, and tested in Sandbox before any
          change reaches production.
        </p>

        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific provides NetSuite post-go-live support for nonprofit organizations running
            NetSuite.org or NetSuite&apos;s standard platform. Common post-go-live needs include grant
            and fund accounting customizations that standard configuration cannot handle, restricted
            versus unrestricted fund tracking scripts, board reporting dashboards with program-level
            financial data, and audit-readiness work for 990 preparation. Nonprofits with multi-entity
            umbrella structures require intercompany elimination configurations and consolidated
            dashboards that reflect fund boundaries by entity. Donation and pledge tracking requires
            SuiteScript to automate fulfillment posting and acknowledgement workflows. SuitePacific
            provides this technical layer on a month-to-month basis, working exclusively with
            organizations already live on NetSuite that need ongoing support after their implementation
            partner has disengaged. Work is delivered by a developer holding Oracle NetSuite SuiteCloud
            Developer II and Administrator Professional certifications.
          </p>
        </div>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend a standard NetSuite nonprofit account?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            These are common capability gaps and what SuitePacific adds to fill them.
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
        <div className="mt-14" data-section="challenges">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite challenges do nonprofit organizations face?
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
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            What NetSuite services does SuitePacific provide for nonprofit organizations?
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
        <div className="mt-14" data-section="customizations">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            What are common NetSuite customizations for nonprofits?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the kinds of builds SuitePacific does for nonprofits on a recurring basis.
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
        <div className="mt-14" data-section="why-suitepacific">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">
            Why do nonprofit organizations choose SuitePacific?
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
            <Link
              href="/netsuite-implementation-partner-vs-managed-support"
              className="text-accent hover:underline"
            >
              implementation partner vs. managed support guide
            </Link>{" "}
            instead.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

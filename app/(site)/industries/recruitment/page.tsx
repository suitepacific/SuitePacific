import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCheck,
  Briefcase,
  Users,
  DollarSign,
  BarChart2,
  Workflow,
  Code2,
  ShieldCheck,
  RefreshCcw,
  Award,
  Headphones,
  Plug,
  Clock,
  Building2,
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
    icon: Clock,
    title: "Timesheet-to-invoice automation",
    description:
      "Converting approved contractor timesheets into client invoices requires scripted logic that groups hours by placement, applies client-specific bill rates, and generates invoices without manual data entry.",
  },
  {
    icon: DollarSign,
    title: "Recruiter commission calculations",
    description:
      "Commission calculations based on placement fee percentages, split arrangements between consultants, and milestone-based payouts require custom formulas and scripts that standard NetSuite compensation tools do not handle.",
  },
  {
    icon: UserCheck,
    title: "Placement revenue recognition",
    description:
      "Permanent placement fees recognized at placement date versus contract placements recognized over assignment length require different revenue treatment and scheduling logic on the same NetSuite account.",
  },
  {
    icon: Building2,
    title: "Multi-branch P&L reporting",
    description:
      "Staffing firms operating across multiple office locations or practice groups need division-level P&L, headcount reporting by branch, and inter-branch allocation that requires custom department structure and saved searches.",
  },
  {
    icon: Briefcase,
    title: "ATS and CRM integration",
    description:
      "Connecting NetSuite to Bullhorn, Jobvite, or Salesforce Recruiting for candidate placement data, job order sync, and client contract information requires RESTlet or scheduled script integrations.",
  },
  {
    icon: Users,
    title: "Contractor payroll pass-through",
    description:
      "Agencies that pay contractors and bill clients need a payroll pass-through structure in NetSuite that separates contractor cost from client billing, tracks margin per placement, and supports weekly payroll cycles.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for timesheet-to-invoice automation, commission calculations, placement revenue scheduling, and staffing-specific business logic across all SuiteScript types.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for timesheet approval chains, invoice release authorization, commission approval routing, and client contract renewal notifications.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Placement volume, gross margin by recruiter, branch P&L, contractor utilization, and fill rate saved searches built with SuiteQL for recruitment management and finance teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and scheduled script integrations connecting NetSuite to Bullhorn, Salesforce, Jobvite, and payroll platforms for automated placement data and billing sync.",
    href: "/netsuite-integrations",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for live recruitment NetSuite accounts: new development, break-fix response, release testing, and account upkeep on a month-to-month retainer.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration for staffing accounts: role and permission management, configuration changes, period close support, and platform troubleshooting.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Timesheet-to-invoice generation scripts",
    description:
      "Scheduled Map/Reduce scripts that pull approved contractor timesheet records, group hours by client and placement, apply the correct bill rate per client contract, and generate invoices ready for review.",
  },
  {
    title: "Recruiter commission calculation scripts",
    description:
      "User Event scripts triggered on placement creation that calculate consultant commissions based on placement fee type, split percentage between multiple consultants, and payout milestone, recording the result on a commission record for payroll.",
  },
  {
    title: "Placement gross margin saved searches",
    description:
      "SuiteQL-based saved searches that calculate gross margin per placement from contractor cost and client bill amounts, showing margin by recruiter, branch, and client for management reporting.",
  },
  {
    title: "Bullhorn-to-NetSuite placement sync",
    description:
      "Scheduled scripts that pull new and updated placement records from Bullhorn via API and create or update the corresponding NetSuite customer, project, and billing records without manual re-entry.",
  },
  {
    title: "Branch P&L reporting dashboards",
    description:
      "Saved searches and KPI portlets showing revenue, contractor cost, gross margin, and headcount by branch or division, giving branch managers and finance teams a current view of business performance.",
  },
  {
    title: "Contractor utilization dashboards",
    description:
      "Saved searches showing active placements, hours billed versus hours available, bench time, and contractor redeployment candidates for resource managers tracking workforce utilization.",
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
      "Ongoing knowledge of your staffing and recruitment NetSuite account across every engagement. Each request builds on prior work.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support.",
  },
];

const COMPARISON = [
  {
    capability: "Contractor invoicing",
    standard: "Manual invoice creation per placement",
    withSP: "Automated timesheet-to-invoice scripts grouping hours by client and bill rate",
  },
  {
    capability: "Commission tracking",
    standard: "Spreadsheet-based commission calculations",
    withSP: "Automated commission scripts with split and milestone logic on placement records",
  },
  {
    capability: "Branch reporting",
    standard: "Standard P&L with manual branch filtering",
    withSP: "Division-level P&L and headcount saved searches by branch",
  },
  {
    capability: "ATS integration",
    standard: "Manual data re-entry from ATS",
    withSP: "Bullhorn and Salesforce sync via scheduled scripts or RESTlets",
  },
  {
    capability: "Gross margin visibility",
    standard: "Manual margin calculation per engagement",
    withSP: "SuiteQL saved searches showing margin by recruiter, client, and branch",
  },
  {
    capability: "Timesheet approval",
    standard: "Email-based approval process",
    withSP: "SuiteFlow workflows with approval routing and invoice release authorization",
  },
];

const FAQ = [
  {
    question: "Does NetSuite work for recruitment and staffing companies?",
    answer:
      "Yes. NetSuite is used by staffing and recruitment firms for contractor billing, placement revenue tracking, multi-branch P&L reporting, and payroll pass-through management. Post-go-live customization is typically required for timesheet-to-invoice automation, recruiter commission calculations, ATS integration, and gross margin reporting that standard NetSuite does not produce without SuiteScript development.",
  },
  {
    question: "What is NetSuite used for in recruitment and staffing?",
    answer:
      "Staffing companies use NetSuite for contractor invoicing, placement revenue recognition, AR management, multi-branch financial reporting, and general ledger. Custom development adds timesheet-to-invoice automation, commission calculation scripts, ATS platform integration, and saved searches for gross margin, utilization, and branch P&L that the standard reporting tools do not produce natively.",
  },
  {
    question: "How can NetSuite automate recruitment billing?",
    answer:
      "Automated contractor billing requires scheduled Map/Reduce scripts that pull approved timesheet data, group hours by client and placement, apply client-specific bill rates from contract records, and generate invoices ready for review. This replaces manual invoice creation for each placement and is the most common NetSuite automation SuitePacific builds for staffing accounts.",
  },
  {
    question: "Can NetSuite calculate recruiter commissions?",
    answer:
      "Yes, via custom SuiteScript. Standard NetSuite does not calculate recruiter commissions natively. SuitePacific builds User Event scripts triggered on placement creation that calculate commissions based on placement fee type, split percentage between consultants, and payout milestone, recording the result on a commission record for payroll processing.",
  },
  {
    question: "Can NetSuite integrate with Bullhorn?",
    answer:
      "Yes, via scheduled scripts or RESTlet endpoints. SuitePacific builds integrations that pull new and updated placement records from Bullhorn via its API and create or update corresponding NetSuite customer records, project records, and billing entries automatically, eliminating manual re-entry between the two systems.",
  },
  {
    question: "What does branch P&L reporting look like in NetSuite for staffing?",
    answer:
      "Branch P&L in a staffing NetSuite account requires a department or class structure aligned to branch locations, with contractor costs and client revenue posted to the correct department. SuitePacific builds the class structure, the saved searches that produce branch-level revenue, gross margin, and headcount reporting, and the KPI portlets that give branch managers a real-time view of their numbers.",
  },
  {
    question: "Who provides NetSuite support for recruitment companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for staffing and recruitment companies, including timesheet-to-invoice automation, commission calculation scripts, ATS integrations, gross margin saved searches, branch P&L reporting, and ongoing technical support on a month-to-month retainer starting at $799 per month.",
  },
  {
    question: "What are common NetSuite customizations for staffing firms?",
    answer:
      "Common staffing builds include timesheet-to-invoice generation scripts, recruiter commission automation with split and milestone logic, Bullhorn-to-NetSuite placement sync, branch and division P&L saved searches, contractor utilization dashboards, and SuiteFlow workflows for timesheet approval and invoice release authorization.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Recruitment & Staffing Companies | SuitePacific",
  description:
    "NetSuite post-go-live support for recruitment and staffing firms. Timesheet-to-invoice automation, commission scripts, ATS integration, and branch P&L reporting.",
  alternates: { canonical: "/industries/recruitment" },
  openGraph: {
    title: "NetSuite Support for Recruitment & Staffing Companies | SuitePacific",
    description:
      "NetSuite support for staffing firms: timesheet-to-invoice automation, recruiter commission scripts, Bullhorn integration, and branch P&L reporting.",
    url: `${SITE_URL}/industries/recruitment`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function RecruitmentPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Recruitment & Staffing", url: `${SITE_URL}/industries/recruitment` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Recruitment & Staffing Companies"
        description="NetSuite post-go-live support for staffing and recruitment firms including timesheet-to-invoice automation, commission scripts, ATS integration, and branch P&L reporting."
        url={`${SITE_URL}/industries/recruitment`}
        serviceType="NetSuite Recruitment Support"
        datePublished="2026-09-23T00:00:00+00:00"
        dateModified="2026-09-23T00:00:00+00:00"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteScript, workflow automation, saved searches, and administration for staffing accounts. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active development including billing automation, commission scripts, and ATS integration maintenance. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full staffing account coverage including billing automation, commission logic, integrations, and branch reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Recruitment & Staffing"
          title="NetSuite Support & Development for Recruitment & Staffing Companies"
          subtitle="Technical support, billing automation, and ATS integrations for staffing firms already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your staffing account needs.</p>
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
            NetSuite support for recruitment and staffing companies refers to post-go-live technical assistance covering the customizations that staffing firms require: timesheet-to-invoice automation, recruiter commission calculations, ATS platform integration, and multi-branch P&L reporting. Staffing companies on NetSuite typically need scheduled Map/Reduce scripts that convert approved contractor timesheets to client invoices, User Event scripts that calculate commission splits on placement records, and SuiteQL saved searches for gross margin by recruiter, branch, and client. ATS integration with Bullhorn, Jobvite, or Salesforce Recruiting requires RESTlet or scheduled script builds that sync placement and candidate data without manual re-entry. SuitePacific provides this development and ongoing support for live staffing NetSuite accounts on a month-to-month retainer starting at $799 per month, with no annual contract after the three-month minimum.
          </p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">
          Staffing and recruitment firms that go live on NetSuite commonly find that contractor billing, commission
          management, and ATS integration require SuiteScript development that standard NetSuite invoicing and
          compensation tools do not provide. SuitePacific covers this technical layer for recruitment accounts
          already live on NetSuite: timesheet-to-invoice scripts, commission calculation automation, Bullhorn
          and Salesforce integrations, branch P&L saved searches, and ongoing account support.
        </p>

        {/* Comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for staffing and recruitment?
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
            What NetSuite challenges do recruitment companies face?
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
            What NetSuite services does SuitePacific provide for staffing firms?
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
            What are common NetSuite customizations for recruitment companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the builds SuitePacific delivers for staffing accounts on a recurring basis.
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
            Why do staffing companies choose SuitePacific?
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
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>{" "}
              covers the retainer structure, hour tiers, and what is included across all plan levels.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>{" "}
              covers how SuiteFlow handles timesheet approval chains, invoice authorization, and recurring process automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/professional-services" className="text-accent hover:underline">
                NetSuite for professional services
              </Link>{" "}
              covers project billing, timesheet management, and utilization reporting for services-based businesses.
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

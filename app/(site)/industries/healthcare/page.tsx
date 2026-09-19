import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  Workflow,
  BarChart2,
  Headphones,
  Users,
  RefreshCcw,
  Award,
  FlaskConical,
  AlertTriangle,
  Building2,
  Layers,
  Code2,
  Plug,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  {
    icon: ShieldCheck,
    title: "FDA 21 CFR Part 11 compliance",
    description:
      "Electronic records and electronic signature requirements under 21 CFR Part 11 require audit trail configuration, access control scripts, and export reports that NetSuite does not produce natively in compliant formats.",
  },
  {
    icon: FlaskConical,
    title: "Lot and serial tracking with expiry",
    description:
      "Medical devices, pharmaceuticals, and biologics require lot-level traceability from receipt through disposition. Expiration date logic, recall traceability searches, and disposition workflows require SuiteScript and saved search customization.",
  },
  {
    icon: AlertTriangle,
    title: "Segregation of duties enforcement",
    description:
      "SOX and GMP requirements mandate segregation of duties across purchasing, receiving, accounts payable, and general ledger functions. Role-based access controls and approval routing require scripted enforcement beyond standard NetSuite roles.",
  },
  {
    icon: Building2,
    title: "Multi-entity health system consolidation",
    description:
      "Hospital networks, health systems, and multi-subsidiary life sciences companies require intercompany elimination, entity-level P&L by department, and consolidated regulatory reporting across subsidiaries in NetSuite OneWorld.",
  },
  {
    icon: Layers,
    title: "Grant and contract management",
    description:
      "Clinical research organizations, nonprofits, and health systems receiving federal grants or managing payer contracts need budget-versus-actual reporting, indirect cost rate application, and grant period tracking with SuiteScript automation.",
  },
  {
    icon: BarChart2,
    title: "Regulatory and quality reporting",
    description:
      "FDA, DEA, state licensing, and quality management reporting requirements call for saved searches and scheduled scripts that extract transaction-level data in the structured formats regulators and quality systems expect.",
  },
];

const SERVICES = [
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for healthcare and life sciences NetSuite accounts: compliance configuration, SuiteScript builds, workflow maintenance, and release testing on a month-to-month basis.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for lot tracking logic, FDA audit trail exports, SOD enforcement, grant budget automation, and healthcare-specific field and workflow logic that configuration alone cannot produce.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Activity,
    title: "Lot & Serial Tracking",
    description:
      "Lot-level traceability from purchase receipt through customer shipment, with expiration date alerts, recall traceability saved searches, and disposition workflows for regulated products.",
    href: "/netsuite-lot-serial-tracking",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for deviation and CAPA processes, approval routing with SOD enforcement, grant expenditure approvals, and multi-step document review chains for regulated environments.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Regulatory reporting saved searches, grant budget-versus-actual dashboards, lot expiry reports, and quality KPI portlets for finance, compliance, and quality teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration: role and permission management, period close, user access reviews for SOD compliance, and configuration support for healthcare and life sciences accounts.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "FDA audit trail export scripts",
    description:
      "Scheduled scripts that extract transaction-level audit trail data from NetSuite system notes and record history in formats aligned with 21 CFR Part 11 review requirements, with field-level change logging and user attribution.",
  },
  {
    title: "Lot expiration alert workflows",
    description:
      "SuiteFlow workflows triggered by lot expiry date fields that send alerts to warehouse and quality teams at configurable lead times, with escalation routing for lots approaching or past expiration without a disposition record.",
  },
  {
    title: "CAPA and deviation workflow automation",
    description:
      "Multi-step SuiteFlow workflows for corrective and preventive action processes: deviation initiation, root cause analysis assignment, corrective action approval, effectiveness verification, and record closure with full audit trail.",
  },
  {
    title: "SOD enforcement scripts",
    description:
      "User Event scripts that validate segregation of duties rules on transaction save, blocking the same user from creating and approving purchase orders, or receiving and posting vendor bills, with role restriction configuration and exception reporting.",
  },
  {
    title: "Grant budget-versus-actual dashboards",
    description:
      "Saved searches and KPI portlets showing grant expenditures versus approved budgets by period and cost category, with indirect cost rate calculations and remaining balance projections for clinical research and nonprofit health organizations.",
  },
  {
    title: "Regulatory reporting saved searches",
    description:
      "SuiteQL-based saved searches for DEA controlled substance transaction logs, FDA adverse event tracking, state licensing inventory reports, and quality management metrics that pull from lot, transaction, and item records.",
  },
];

const WHY_SP = [
  {
    icon: ShieldCheck,
    title: "NetSuite-Certified",
    description:
      "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified credentials across SuiteScript, SuiteFlow, and the NetSuite platform.",
  },
  {
    icon: Users,
    title: "Direct Access",
    description:
      "You communicate directly with the person doing the work. No ticket system, no account manager layer, no offshore handoffs handling sensitive healthcare account data.",
  },
  {
    icon: RefreshCcw,
    title: "Context Retained",
    description:
      "Ongoing knowledge of your compliance configuration, lot tracking setup, and custom scripts retained across every engagement. No re-discovery on each request.",
  },
  {
    icon: Award,
    title: "Post-Go-Live Specialist",
    description:
      "We work exclusively with companies already live on NetSuite. Every engagement is ongoing development and support, not implementation project work.",
  },
];

const FAQ = [
  {
    question: "Is NetSuite suitable for healthcare companies?",
    answer:
      "Yes, particularly for medical device companies, pharmaceutical manufacturers, biotech firms, clinical research organizations, and health technology businesses that need an integrated ERP for financials, inventory, and regulatory operations. NetSuite supports lot and serial tracking, multi-entity consolidation, role-based access controls, and audit trail logging. Post-go-live customization is typically required for FDA 21 CFR Part 11 compliance reporting, SOD enforcement, CAPA workflows, and regulatory reporting formats that the standard feature set does not produce natively.",
  },
  {
    question: "Does NetSuite meet FDA 21 CFR Part 11 requirements?",
    answer:
      "NetSuite can support 21 CFR Part 11 compliance with appropriate configuration and customization. The platform logs system notes for field-level changes and supports role-based access controls and electronic approvals. However, producing audit trail exports in compliant review formats, enforcing electronic signature controls on specific record types, and generating the structured reports regulators expect requires SuiteScript development beyond standard configuration. Validation documentation for computerized systems is the responsibility of the implementing organization.",
  },
  {
    question: "How can healthcare companies customize NetSuite?",
    answer:
      "SuiteScript handles FDA audit trail export scripts, lot expiration logic, SOD enforcement on transactions, grant budget automation, and healthcare-specific field and calculation logic. SuiteFlow builds deviation and CAPA workflows, grant approval chains, and multi-step document review processes. Saved searches and SuiteQL queries produce regulatory reporting, lot traceability, and quality metrics. Together these allow NetSuite to match most healthcare and life sciences finance and compliance workflows without third-party middleware.",
  },
  {
    question: "What NetSuite challenges do medical device companies face?",
    answer:
      "Medical device companies on NetSuite commonly need lot-level traceability from purchase receipt through customer shipment, expiration date tracking with automated alerts, recall traceability searches, FDA UDI labeling data, CAPA and deviation workflow automation, SOD enforcement across procurement and accounts payable, and quality KPI dashboards. These requirements go beyond standard NetSuite inventory and accounting features and require SuiteScript development and saved search customization to implement correctly.",
  },
  {
    question: "Can NetSuite support pharmaceutical lot tracking?",
    answer:
      "Yes. NetSuite's lot tracking feature assigns lot numbers at receipt and traces them through inventory movements, sales orders, and shipments. For pharmaceutical accounts, SuiteScript extends this with expiration date alert workflows, disposition tracking, blocked lot enforcement on sales transactions, and SuiteQL-based recall traceability searches. Controlled substance transaction logging for DEA reporting requires custom scheduled scripts that extract transaction-level lot data from the system.",
  },
  {
    question: "What is CAPA workflow automation in NetSuite?",
    answer:
      "CAPA stands for corrective and preventive action, a quality management process required under ISO 13485, FDA QSR, and GMP regulations. In NetSuite, CAPA workflows are built with SuiteFlow, creating multi-step approval chains: deviation initiation, root cause analysis assignment, corrective action approval, effectiveness verification, and record closure. Each step logs the approver and timestamp in the record's audit trail. SuitePacific builds these workflows for medical device and pharmaceutical companies that need CAPA documentation within their NetSuite account.",
  },
  {
    question: "How does NetSuite handle grant management for healthcare organizations?",
    answer:
      "Clinical research organizations, academic medical centers, and nonprofit health organizations use NetSuite for grant accounting with project-level tracking, budget-versus-actual reporting, indirect cost rate application, and grant period monitoring. Custom saved searches show expenditures by cost category against approved budgets. SuiteScript automates indirect cost calculations and enforces grant period spending rules. This configuration requires customization beyond standard NetSuite project accounting.",
  },
  {
    question: "What does NetSuite support for life sciences companies include?",
    answer:
      "Life sciences NetSuite accounts typically cover lot and serial tracking for clinical-grade materials, multi-entity consolidation for holding companies with multiple subsidiaries, revenue recognition for milestone-based clinical contracts, grant management for research funding, regulatory inventory reporting, and SOD-compliant approval workflows. Post-go-live support for life sciences accounts includes maintaining these customizations, updating them for new regulatory requirements, and testing them in Sandbox before each NetSuite release.",
  },
  {
    question: "Who provides NetSuite support for healthcare companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for healthcare and life sciences companies, including SuiteScript development for compliance and lot tracking, CAPA and deviation workflow automation, FDA audit trail reporting, grant management configuration, and ongoing administrator support on a month-to-month basis. Our team holds Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications.",
  },
  {
    question: "How does SuitePacific support healthcare companies using NetSuite?",
    answer:
      "SuitePacific provides dedicated NetSuite technical support for healthcare and life sciences accounts on a month-to-month basis. This includes SuiteScript development for compliance-driven customizations, SuiteFlow workflows for CAPA and approval processes, lot tracking and expiry alert configuration, regulatory reporting saved searches, and administrator support. We work directly with your finance and operations team without an intermediary layer. Development is tested in Sandbox before production deployment. Plans start at $799 per month.",
  },
];

const COMPARISON = [
  {
    capability: "FDA audit trail",
    standard: "Manual system notes review per record",
    withSP: "Scheduled scripts generating structured audit trail exports by date range and record type",
  },
  {
    capability: "Lot expiry tracking",
    standard: "Manual lot record review for expiry dates",
    withSP: "Expiration date alert workflows with escalation and disposition tracking scripts",
  },
  {
    capability: "SOD enforcement",
    standard: "Role assignment without transaction-level controls",
    withSP: "User Event scripts blocking same-user create-and-approve on regulated transaction types",
  },
  {
    capability: "CAPA management",
    standard: "External documents or manual NetSuite records",
    withSP: "SuiteFlow multi-step CAPA workflow with approvals, audit trail, and closure verification",
  },
  {
    capability: "Grant reporting",
    standard: "Standard project accounting reports",
    withSP: "Budget-versus-actual saved searches with indirect cost calculations by grant period",
  },
  {
    capability: "Regulatory reporting",
    standard: "Standard inventory and transaction reports",
    withSP: "SuiteQL-based DEA, FDA, and state licensing reports from lot and transaction records",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Healthcare & Life Sciences Companies",
  description:
    "NetSuite post-go-live support for healthcare and life sciences: FDA compliance, lot tracking, audit trail reporting, and regulatory workflows. From $799.",
  alternates: { canonical: "/industries/healthcare" },
  openGraph: {
    title: "NetSuite Support for Healthcare & Life Sciences Companies",
    description:
      "NetSuite post-go-live support for healthcare and life sciences: FDA compliance automation, lot tracking, CAPA workflows, and regulatory reporting.",
    url: "https://suitepacific.com/industries/healthcare",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function HealthcarePage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Healthcare & Life Sciences", url: `${SITE_URL}/industries/healthcare` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Healthcare & Life Sciences Companies"
        description="NetSuite post-go-live support for healthcare and life sciences companies, including FDA compliance automation, lot tracking, CAPA workflows, and regulatory reporting."
        url={`${SITE_URL}/industries/healthcare`}
        serviceType="NetSuite Healthcare Support"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: lot tracking configuration, compliance scripts, regulatory saved searches, and workflow maintenance. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active compliance development including CAPA workflows, FDA audit trail scripts, and SOD enforcement. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full NetSuite management for regulated healthcare accounts: compliance, SuiteScript, workflows, and reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <VideoObjectJsonLd
        name="SuitePacific Introduction: NetSuite Post-Go-Live Support and Consulting"
        description="An introduction to SuitePacific, a boutique NetSuite post-go-live support team providing SuiteScript development, workflow automation, and ongoing account optimization for businesses already live on NetSuite."
        videoId="IQvWN_yZ24A"
        duration="PT18S"
        uploadDate="2026-08-12T00:00:00+00:00"
        isShort
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Healthcare & Life Sciences"
          title="NetSuite Support for Healthcare & Life Sciences Companies"
          subtitle="Compliance-driven NetSuite customization, SuiteScript development, and ongoing technical support for regulated healthcare accounts already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">
          NetSuite-Certified · Compliance-aware development · Sandbox-first · Month-to-month
        </p>
        <p className="mt-2 text-xs text-brand-300">
          <time dateTime="2026-09">Published September 2026</time>
        </p>

        {/* QA block */}
        <div style={{ background: "#eef2fb", border: "1px solid #b2c2e6", borderRadius: "10px", padding: "1.25rem 1.5rem", margin: "2rem 0", fontFamily: "system-ui,-apple-system,sans-serif" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#4f7fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick answer</p>
          <p style={{ margin: 0, color: "#14306b", fontSize: "0.9rem", lineHeight: 1.6 }}>
            SuitePacific provides NetSuite post-go-live support for healthcare and life sciences companies, including medical device manufacturers, pharmaceutical companies, biotech firms, clinical research organizations, and health technology businesses. Healthcare accounts on NetSuite typically require customization for FDA 21 CFR Part 11 audit trail reporting, lot and serial tracking with expiration date logic, role-based access controls to meet SOD requirements, and multi-entity consolidation for health systems with multiple subsidiaries. Common builds include scheduled scripts that generate FDA-compliant audit trail exports, SuiteScript lot tracking with expiration date alerts, workflow automation for deviation and CAPA processes, and SuiteQL-based saved searches for regulatory reporting. Grant management workflows for research organizations and integration with clinical systems also fall within the support scope. SuitePacific holds Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Plans start at $799 per month on month-to-month terms.
          </p>
        </div>

        <p className="mt-8 text-sm text-brand-400">
          Healthcare and life sciences companies that select NetSuite for ERP often find that FDA compliance reporting,
          lot-level traceability, segregation of duties enforcement, and CAPA workflow management require SuiteScript
          development that the standard platform does not provide out of the box. SuitePacific provides this technical
          layer for regulated healthcare accounts already live on NetSuite, covering FDA audit trail scripts, lot
          expiration logic, SOD-aware approval workflows, grant budget reporting, and regulatory saved searches.
          Development is tested in Sandbox before production deployment. Our lead developer holds Oracle NetSuite&apos;s
          SuiteCloud Developer II and Administrator Professional certifications. Work is done directly with no offshore
          handoffs.
        </p>

        {/* Comparison */}
        <div className="mt-14" data-section="comparison">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for healthcare companies?
          </h2>
          <p className="text-sm text-brand-400 mb-4">
            Common capability gaps and what SuitePacific builds to close them.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[480px]">
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
            What NetSuite challenges do healthcare companies face?
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
            What NetSuite services does SuitePacific provide for healthcare companies?
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
            What are common NetSuite customizations for healthcare companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the compliance and operational builds we do for healthcare and life sciences accounts on a recurring basis.
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
            Why do healthcare companies choose SuitePacific?
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
            Evaluating whether ongoing managed support or a one-time project is the right fit? See the{" "}
            <Link
              href="/netsuite-implementation-partner-vs-managed-support"
              className="text-accent hover:underline"
            >
              implementation partner vs. managed support guide
            </Link>
            .
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Related reading */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-4">Related reading</h2>
          <ul className="space-y-2 text-sm text-brand-400">
            <li>
              <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
                NetSuite lot and serial tracking
              </Link>
              : lot-level traceability configuration, expiration date logic, and recall search setup
            </li>
            <li>
              <Link href="/netsuite-workflow-automation" className="text-accent hover:underline">
                NetSuite workflow automation
              </Link>
              : SuiteFlow builds for approval chains, deviation management, and regulated process routing
            </li>
            <li>
              <Link href="/netsuite-grant-management" className="text-accent hover:underline">
                NetSuite grant management
              </Link>
              : budget-versus-actual reporting, indirect cost rate application, and grant period tracking
            </li>
            <li>
              <Link href="/netsuite-managed-support" className="text-accent hover:underline">
                NetSuite managed support
              </Link>
              : how the monthly retainer model works, hour tiers, and what is covered
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Need NetSuite support for your healthcare or life sciences account?</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

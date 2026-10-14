import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Code2, Workflow, Plug, FileText, Database, Wrench } from "lucide-react";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { LeadForm } from "@/components/sections/LeadForm";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { SITE_URL } from "@/lib/content";

const PROJECT_TYPES = [
  {
    icon: Code2,
    title: "SuiteScript Integration Builds",
    description:
      "Connecting NetSuite to external systems via RESTlets, scheduled sync scripts, and API integrations. Common builds include Shopify order sync, Salesforce opportunity-to-order handoffs, payment processor reconciliation, and 3PL fulfillment feeds.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation Projects",
    description:
      "Building multi-step SuiteFlow approval workflows, automated notifications, and status-driven routing logic for defined business processes. Scoped to a specific workflow with agreed triggers, conditions, and outcomes.",
  },
  {
    icon: Code2,
    title: "SuiteScript 2.x Migrations",
    description:
      "Upgrading existing SuiteScript 1.0 scripts to the SuiteScript 2.x API, which Oracle has deprecated in favour of the current standard. Includes audit of existing scripts, rewrite, Sandbox testing, and Production deployment.",
  },
  {
    icon: FileText,
    title: "Advanced PDF Template Builds",
    description:
      "Custom invoices, quotes, purchase orders, packing slips, and statements using FreeMarker with conditional logic, multi-column layouts, and branded formatting. Scoped per template set with an agreed output specification.",
  },
  {
    icon: Database,
    title: "Data Migration and Cleanup",
    description:
      "Structured data imports for customer records, historical transactions, items, or custom record types. Includes field mapping, validation logic, and a test import against Sandbox before final Production load.",
  },
  {
    icon: Wrench,
    title: "Technical Remediation",
    description:
      "Fixing broken scripts, resolving governance limit errors, identifying root causes of account slowdowns, and cleaning up technical debt left by previous developers. Scoped after an initial account review.",
  },
  {
    icon: Plug,
    title: "Custom Suitelet and Portlet Builds",
    description:
      "Building custom pages inside NetSuite for internal tools, approval interfaces, or reporting dashboards that standard saved searches cannot produce. Scoped to an agreed functional specification.",
  },
];

const WHEN_TO_CHOOSE = [
  { situation: "You have a specific build in mind with a defined scope and endpoint", model: "Project" },
  { situation: "You need a new integration between NetSuite and an external system", model: "Project" },
  { situation: "You have ongoing development, administration, and break-fix needs each month", model: "Retainer" },
  { situation: "You want a dedicated resource without scoping every individual request", model: "Retainer" },
  { situation: "You need a one-time script migration or data import", model: "Project" },
  { situation: "Your account generates 10 or more hours of technical work per month", model: "Retainer" },
  { situation: "You have an internal admin team but need a specialist for a defined build", model: "Project" },
  { situation: "You want ongoing account knowledge retained across all requests", model: "Retainer" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Scoping call and written spec",
    description:
      "Every project begins with a conversation to understand the requirement. A written specification follows: the trigger, the logic, the edge cases, the inputs and outputs, and the expected behaviour. Agreed before development starts.",
  },
  {
    step: "02",
    title: "Build and test in Sandbox",
    description:
      "Development happens in your Sandbox environment against representative data and record types. If something is going to break, it breaks in Sandbox. Production is not used for testing.",
  },
  {
    step: "03",
    title: "Review and sign-off",
    description:
      "The completed build is demonstrated or delivered for your review before deployment. Any adjustments within the agreed scope are included. Changes outside the original spec are discussed separately.",
  },
  {
    step: "04",
    title: "Production deployment",
    description:
      "Deployment to Production happens outside your peak business hours at an agreed time. Post-deployment monitoring confirms the build is operating as specified.",
  },
];

const FAQ = [
  {
    question: "What is NetSuite project consulting?",
    answer:
      "NetSuite project consulting refers to a fixed-scope engagement where a defined deliverable, timeline, and price are agreed before development begins. Unlike a monthly retainer, which covers ongoing requests as they surface, project-based consulting suits companies with a specific, well-defined technical build: a new integration, a custom workflow, a script migration, or a data import with a clear endpoint. SuitePacific takes on project engagements alongside its Care retainer plans. Each project is scoped in writing before work starts, built and tested in Sandbox against representative data, and deployed to Production at an agreed time. This model works well for companies that have an internal team handling day-to-day administration but need a certified NetSuite developer for a specific technical build that falls outside their existing capabilities.",
  },
  {
    question: "How does project-based pricing work?",
    answer:
      "Project engagements are priced per scope rather than per hour. After a scoping conversation, SuitePacific provides a fixed quote based on the defined deliverable. The price covers the build, Sandbox testing, revisions within the agreed spec, and Production deployment. If requirements change materially during the project, the additional scope is discussed and priced separately before proceeding.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timeline depends on complexity. A single integration or workflow typically takes two to four weeks from scoping to Production deployment. Larger builds, multi-system integrations, or projects requiring significant data migration may take four to eight weeks. SuitePacific provides a timeline estimate during scoping and flags dependencies on client access or approvals that could affect it.",
  },
  {
    question: "Can SuitePacific take over scripts or work built by a previous developer?",
    answer:
      "Yes. Taking over existing customizations is one of the most common starting points. The process involves reviewing the existing code, documenting what it does, identifying any issues, and then building on or replacing it as the project scope requires. We read the account first; no briefing on the full development history is needed before work starts.",
  },
  {
    question: "Is project consulting or a monthly retainer the right model?",
    answer:
      "Project consulting suits a specific, defined build with a clear endpoint: an integration, a migration, a remediation, or a new automation for a known process. A monthly retainer suits ongoing work where requests surface continuously and maintaining an account relationship matters: ongoing development, break-fix, administration, and support as the business grows. Most companies with regular technical needs find a retainer more cost-effective after the first project or two.",
  },
  {
    question: "Can a project engagement convert to an ongoing retainer?",
    answer:
      "Yes, and this is a common path. Companies often start with a defined project, then transition to a Care retainer for ongoing administration, development, and support. The account knowledge built during the project carries forward, so there is no re-discovery period when moving to a retainer.",
  },
  {
    question: "Do project engagements require a long-term commitment?",
    answer:
      "No. Project engagements are scoped per project with no minimum contract length. Each project is a standalone engagement with its own spec, timeline, and price. There is no obligation to continue after the project is delivered.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Project Consulting | Fixed-Scope Engagements",
  description:
    "NetSuite project consulting from SuitePacific: fixed-scope integrations, workflow builds, SuiteScript migrations, data imports, and technical remediation. Scoped before development starts, sandbox-tested, no retainer required.",
  alternates: { canonical: "/netsuite-project-consulting" },
  openGraph: {
    title: "NetSuite Project Consulting | Fixed-Scope Engagements",
    description:
      "NetSuite project consulting from SuitePacific: fixed-scope integrations, workflow builds, SuiteScript migrations, data imports, and technical remediation. Scoped before development starts, sandbox-tested, no retainer required.",
    url: `${SITE_URL}/netsuite-project-consulting`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function NetSuiteProjectConsultingPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Consulting Services", url: `${SITE_URL}/netsuite-consulting-services` },
          { name: "NetSuite Project Consulting", url: `${SITE_URL}/netsuite-project-consulting` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Project Consulting"
        description="Fixed-scope NetSuite project consulting: SuiteScript integrations, SuiteFlow workflow builds, SuiteScript 2.x migrations, Advanced PDF template development, data migrations, technical remediation, and custom Suitelet builds. Each project is scoped in writing before development starts, built in Sandbox, and deployed to Production at an agreed time. Oracle NetSuite SuiteCloud Developer II and Administrator Professional certified."
        url={`${SITE_URL}/netsuite-project-consulting`}
        serviceType="NetSuite Project Consulting"
        offers={[
          { name: "Project Consulting", price: 0, description: "Fixed-scope project engagements priced per deliverable. No retainer required. Sandbox-tested, production-deployed." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">NetSuite Project Consulting</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 tracking-tight mb-4">
          NetSuite Project Consulting
        </h1>
        <p className="text-base text-brand-500 mb-6 leading-relaxed">
          NetSuite project consulting refers to fixed-scope engagements where a defined deliverable, timeline, and price are agreed before development begins. SuitePacific takes on project work for integrations, workflow builds, script migrations, data imports, and technical remediation, alongside its ongoing Care retainer plans.
        </p>

        <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft mb-3">
          <p className="text-sm text-brand-600 mb-3">Tell us what you need to build.</p>
          <LeadFormLight />
        </div>
        <p className="text-xs text-brand-400 mb-2">NetSuite-certified · Scoped before development starts · Sandbox-first · No retainer required</p>
        <p className="text-xs text-brand-300 mb-10"><time dateTime="2026-10">Published October 2026</time></p>

        {/* Quick answer / GEO citability block */}
        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mb-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            NetSuite project consulting refers to a fixed-scope engagement where a defined deliverable, timeline, and price are agreed before development begins. Unlike a monthly retainer, which covers ongoing requests as they arise, project-based consulting suits companies with a specific, well-defined technical build: a new integration, a custom workflow, a SuiteScript migration, or a data import with a clear endpoint. SuitePacific takes on project engagements alongside its Care retainer plans. Each project is scoped in writing before work starts, built and tested in Sandbox against representative data, and deployed to Production at an agreed time. This model works well for companies that have an internal team handling day-to-day administration but need a certified NetSuite developer for a specific build that falls outside their existing capabilities. No retainer or long-term commitment is required.
          </p>
        </div>

        {/* When to choose project vs retainer */}
        <div className="mb-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">When does project-based consulting make sense?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Project-based and retainer consulting serve different needs. The table below shows which model fits each situation.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white shadow-soft">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-50/50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-brand-900">Situation</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-brand-900 w-32">Better fit</th>
                </tr>
              </thead>
              <tbody>
                {WHEN_TO_CHOOSE.map((row, i) => (
                  <tr key={i} className="border-b border-brand-50 last:border-0">
                    <td className="py-3 px-4 text-xs text-brand-700">{row.situation}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        row.model === "Project"
                          ? "bg-accent/10 text-accent"
                          : "bg-brand-100 text-brand-600"
                      }`}>
                        {row.model === "Project" ? "Project" : "Retainer"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-brand-400">
            Most companies with ongoing technical needs find a{" "}
            <Link href="/netsuite-care" className="text-accent hover:underline">Care retainer</Link>
            {" "}more cost-effective after the first project. Project work often transitions naturally into ongoing support.
          </p>
        </div>

        {/* Project types */}
        <div className="mb-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What types of NetSuite projects does SuitePacific take on?</h2>
          <p className="text-sm text-brand-400 mb-6">
            Project engagements cover the full post-go-live technical layer: integrations, automations, migrations, templates, and remediation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECT_TYPES.map((item) => (
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

        {/* How it works */}
        <div className="mb-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How does a NetSuite project engagement work?</h2>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                  <p className="mt-0.5 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What is included */}
        <div className="mb-14 rounded-2xl border border-brand-100 bg-white shadow-soft p-6">
          <h2 className="text-base font-semibold text-brand-900 mb-4">What is included in a project engagement?</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Written scope and specification before development starts",
              "Sandbox development and testing against representative data",
              "Revisions within the agreed specification",
              "Production deployment at an agreed time",
              "Post-deployment monitoring and confirmation",
              "Documentation of what was built",
              "Direct access to the developer, no ticket queue",
              "Oracle-certified SuiteScript 2.x development",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-700">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Project vs retainer callout */}
        <div className="mb-14 rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Project vs. retainer</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            Is a project engagement or a monthly retainer the right model?
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Project consulting is the right model when you have a specific, defined technical build with a clear endpoint: an integration between two systems, a migration of existing scripts to SuiteScript 2.x, or a new automation for a known business process. It suits companies with internal administrators who can handle day-to-day support but need a specialist for one particular build.
          </p>
          <p className="text-sm text-brand-500 mb-4">
            A monthly retainer is the right model when technical work arrives continuously across multiple areas: new scripts, broken automations, configuration changes, and ongoing administration without a defined endpoint. Retainer pricing covers all of this without scoping every request individually.
          </p>
          <p className="text-sm text-brand-500">
            Many companies start with a project and transition to a retainer once they see how much ongoing work the account generates.{" "}
            <Link href="/netsuite-care" className="text-accent hover:underline">View Care plan details.</Link>
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        {/* Internal links */}
        <div className="mt-12 pt-8 border-t border-brand-50">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-400 mb-4">Related</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/netsuite-consulting-services", label: "NetSuite Consulting Services", desc: "Full overview of SuitePacific consulting services" },
              { href: "/netsuite-care", label: "NetSuite Care Plans", desc: "Monthly retainer plans from $799/month" },
              { href: "/netsuite-suitescript-development", label: "SuiteScript Development", desc: "Custom script development for automation and business logic" },
              { href: "/netsuite-integrations", label: "NetSuite Integrations", desc: "Connecting NetSuite to external systems via API" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-brand-100 bg-white p-4 shadow-soft hover:border-brand-200 transition-colors group"
              >
                <p className="text-sm font-semibold text-brand-900 group-hover:text-accent transition-colors">{item.label}</p>
                <p className="text-xs text-brand-400 mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what you need to build.</p>
          <LeadFormLight />
        </div>

        <div id="contact" className="mt-14 pt-10 border-t border-brand-50">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}

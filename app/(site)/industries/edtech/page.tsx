import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: DollarSign, title: "Enrollment revenue recognition", description: "Tuition revenue for multi-term courses must be recognized ratably over the enrollment period under ASC 606, not at payment or enrollment date. Standard NetSuite revenue recognition requires custom schedule configuration per course type, with deferred revenue liability tracking throughout the enrollment term." },
  { icon: BookOpen, title: "Grant management and fund accounting", description: "EdTech and education organizations receiving government grants, foundation grants, or Title IV funds need grant tracking that enforces spending restrictions by fund, tracks allowable versus unallowable costs, and produces grant utilization reports for sponsor reporting requirements." },
  { icon: Plug, title: "LMS and student information system integration", description: "EdTech companies using Canvas, Blackboard, Moodle, Instructure, or proprietary LMS platforms need integrations that sync enrollment data, course completions, and student financial records from the LMS to NetSuite for billing and revenue recognition without manual data entry." },
  { icon: Layers, title: "Deferred tuition revenue management", description: "Managing the deferred tuition liability balance as students progress through courses requires scheduled scripts that calculate the recognized versus deferred portion each period based on actual course completion dates, attendance, or time elapsed." },
  { icon: BarChart2, title: "Course and program profitability reporting", description: "Profitability reporting by course, program, and cohort requires custom saved searches that allocate instructor costs, platform costs, and marketing spend to individual courses and calculate contribution margin per enrolled student." },
  { icon: FileText, title: "Scholarship and financial aid tracking", description: "Scholarship discounts applied against tuition invoices, financial aid receivables, and Title IV credit balance refund obligations require custom NetSuite billing logic that handles contra-revenue entries and financial aid reconciliation accurately." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for enrollment revenue recognition schedules, deferred tuition liability calculations, grant spending enforcement, LMS enrollment data sync, scholarship discount logic, and course profitability calculations.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for enrollment invoice generation, grant budget threshold alerts, financial aid disbursement approval, course completion revenue release, and refund authorization workflows.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Deferred tuition balance by cohort, grant utilization by fund, course contribution margin, enrollment AR aging, scholarship discount reporting, and LMS-to-billing reconciliation saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "LMS integrations connecting Canvas, Blackboard, Moodle, and proprietary platforms to NetSuite for automated enrollment billing triggers, course completion revenue recognition, and student financial record synchronization.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live EdTech and education company NetSuite accounts: enrollment billing maintenance, grant tracking, LMS integration upkeep, and ongoing account optimization.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for EdTech accounts: course and program record configuration, grant entity setup, period close support, enrollment billing troubleshooting, and platform maintenance.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "Enrollment revenue recognition schedules", description: "Custom NetSuite revenue recognition schedules that spread tuition revenue over the course enrollment period based on term start and end dates, course completion milestones, or attendance records, creating the deferred revenue liability entries required for accurate ASC 606 compliance." },
  { title: "Grant fund tracking and spending restrictions", description: "Custom NetSuite class or project records that represent individual grants, with User Event scripts enforcing spending category restrictions, tracking cumulative expenditures against grant budgets, and alerting grant managers when spending approaches budget thresholds." },
  { title: "LMS enrollment data integration", description: "Scheduled scripts that pull enrollment and completion data from Canvas, Blackboard, Moodle, or proprietary LMS APIs, creating NetSuite billing records when students enroll and triggering revenue recognition events when course completions are reported." },
  { title: "Deferred tuition liability management", description: "Scheduled SuiteScript that calculates the recognized versus deferred portion of tuition revenue for each active enrollment each period, posts the revenue recognition journal entries, and updates the deferred tuition liability balance for accurate period-end financial statements." },
  { title: "Course and program contribution margin reporting", description: "SuiteQL saved searches that allocate instructor costs, platform fees, and direct marketing spend to individual courses and programs, calculating revenue per enrolled student, variable cost per student, and contribution margin by course and program for product and pricing decisions." },
  { title: "Scholarship and financial aid billing logic", description: "Custom billing scripts that apply scholarship discounts as contra-revenue entries against tuition invoices, track financial aid receivables separately, calculate net tuition revenue after all aid, and flag Title IV credit balance refund obligations for the financial aid team." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your EdTech or education company NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "Enrollment revenue recognition", standard: "Invoice-date recognition or manual deferred revenue entries", withSP: "Custom schedules spreading tuition over enrollment period per ASC 606" },
  { capability: "Grant fund tracking", standard: "Standard project budget without spending restriction enforcement", withSP: "Custom grant records with category restriction scripts and budget alerts" },
  { capability: "LMS integration", standard: "Manual enrollment data re-entry into NetSuite billing", withSP: "Scheduled scripts syncing LMS enrollments and completions to NetSuite" },
  { capability: "Deferred tuition balance", standard: "Manual period-end deferred revenue journal entries", withSP: "Scheduled scripts calculating and posting recognized/deferred splits" },
  { capability: "Course profitability", standard: "Standard project reports without student-level cost allocation", withSP: "SuiteQL searches for contribution margin by course and program" },
  { capability: "Scholarship billing", standard: "Manual scholarship discount application and tracking", withSP: "Contra-revenue discount scripts with financial aid reconciliation" },
];

const FAQ = [
  { question: "Does NetSuite work for EdTech and education companies?", answer: "Yes. NetSuite is used by EdTech companies, online education platforms, tutoring businesses, professional training firms, and educational institutions for tuition billing, grant management, enrollment revenue recognition, and course profitability reporting. Post-go-live customization is required for ASC 606 tuition revenue recognition schedules, grant fund tracking, LMS integrations, deferred tuition liability management, and scholarship discount billing that standard NetSuite does not handle without SuiteScript development." },
  { question: "Can NetSuite handle tuition revenue recognition under ASC 606 for EdTech?", answer: "Yes. ASC 606 tuition revenue recognition requires spreading tuition payments over the course enrollment period rather than recognizing at payment date. SuitePacific builds custom NetSuite revenue recognition schedules that use term start and end dates, course completion milestones, or time-elapsed calculations to determine the recognized portion each period, creating the deferred tuition liability entries required for accurate financial statements." },
  { question: "How does NetSuite handle grant management for education organizations?", answer: "Grant management requires custom NetSuite class or project records representing individual grants, with User Event scripts that enforce spending category restrictions, track cumulative grant expenditures, and alert grant managers when spending approaches budget thresholds. SuitePacific builds grant fund tracking structures for EdTech companies and education organizations receiving government grants, foundation grants, or Title IV funding." },
  { question: "Can NetSuite integrate with Canvas, Blackboard, or Moodle?", answer: "Yes, via RESTlet endpoints and scheduled scripts. SuitePacific builds LMS integrations that pull enrollment and completion data from Canvas, Blackboard, Moodle, Instructure, and proprietary platforms via API, creating NetSuite billing records when students enroll and triggering revenue recognition events when course completions are reported by the LMS." },
  { question: "Can NetSuite track deferred tuition revenue?", answer: "Yes. Deferred tuition revenue tracking requires scheduled SuiteScript that calculates the recognized versus deferred portion of active enrollments each period, posts the revenue recognition journal entries, and updates the deferred tuition liability balance. SuitePacific builds and maintains these deferred revenue management scripts for EdTech accounts on NetSuite." },
  { question: "Can NetSuite produce course and program profitability reporting?", answer: "Yes, via custom SuiteQL saved searches. SuitePacific builds course profitability reporting that allocates instructor costs, platform fees, and direct marketing spend to individual courses and programs, calculating revenue per enrolled student, variable cost per student, and contribution margin by course. This gives EdTech product and pricing teams the data to evaluate course economics." },
  { question: "What are common NetSuite customizations for EdTech and education companies?", answer: "Common EdTech builds include ASC 606 enrollment revenue recognition schedules, grant fund tracking with spending restrictions, LMS integration for enrollment and completion sync, deferred tuition liability management, course contribution margin reporting, scholarship and financial aid discount billing scripts, and cohort AR aging dashboards." },
  { question: "Who provides NetSuite support for EdTech companies?", answer: "SuitePacific provides NetSuite post-go-live support for EdTech companies, online education platforms, and professional training organizations, including enrollment revenue recognition, grant management, LMS integrations, and course profitability reporting, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for EdTech & Education Companies | SuitePacific",
  description: "NetSuite post-go-live support for EdTech and education companies. Enrollment revenue recognition, grant management, LMS integrations, deferred tuition tracking, and course profitability.",
  alternates: { canonical: "/industries/edtech" },
  openGraph: {
    title: "NetSuite Support for EdTech & Education Companies | SuitePacific",
    description: "NetSuite support for EdTech companies: ASC 606 tuition recognition, grant fund tracking, LMS integrations, and course profitability reporting.",
    url: `${SITE_URL}/industries/edtech`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function EdtechPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "EdTech & Education", url: `${SITE_URL}/industries/edtech` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for EdTech & Education Companies" description="NetSuite post-go-live support for EdTech and education companies including enrollment revenue recognition, grant management, LMS integrations, and course profitability reporting." url={`${SITE_URL}/industries/edtech`} serviceType="NetSuite EdTech Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: recognition schedule maintenance, saved searches, and administration for EdTech accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including LMS integrations, grant tracking, and deferred revenue management. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full EdTech account coverage including billing automation, integrations, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="EdTech & Education" title="NetSuite Support & Development for EdTech & Education Companies" subtitle="Enrollment revenue recognition, grant management, LMS integrations, and course profitability reporting for EdTech companies already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your EdTech or education company NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for EdTech and education companies refers to post-go-live technical assistance for the enrollment billing, revenue recognition, and grant management workflows that educational organizations require. Standard NetSuite does not spread tuition revenue over enrollment periods without custom ASC 606 recognition schedule configuration. Grant fund tracking with spending category restrictions requires custom record types and User Event scripts. LMS integrations with Canvas, Blackboard, or Moodle for enrollment billing triggers require RESTlet or scheduled script development. Deferred tuition liability management requires scheduled recognition scripts posting entries each period. Course and program contribution margin reporting requires SuiteQL saved searches allocating instructor and platform costs to individual courses. SuitePacific builds these EdTech-specific structures for online education platforms, professional training firms, and educational institutions already live on NetSuite, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">EdTech and education companies that go live on NetSuite commonly find that enrollment revenue recognition, grant tracking, and LMS integration require SuiteScript development that standard NetSuite billing and project modules do not address for educational workflows. SuitePacific covers this technical layer for education company accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for EdTech and education companies?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do EdTech and education companies face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for EdTech companies?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for EdTech and education companies?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for education company accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do EdTech companies choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For subscription-based SaaS billing: <Link href="/industries/saas-technology" className="text-accent hover:underline">NetSuite for SaaS and technology</Link> covers subscription billing, ARR/MRR reporting, and ASC 606 multi-element arrangements for software companies.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-integrations" className="text-accent hover:underline">NetSuite integrations</Link>{" "}covers API integration development for LMS platforms, student information systems, and enrollment management tools.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for deferred revenue management and grant spending enforcement.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

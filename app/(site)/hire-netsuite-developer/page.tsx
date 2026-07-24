import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  CheckCircle2,
  Workflow,
  LayoutDashboard,
  FileText,
  Plug,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  Star,
  AlertTriangle,
  Check,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadForm } from "@/components/sections/LeadForm";
import { SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "Can you work with an existing NetSuite implementation?",
    answer:
      "Yes. Most of our clients originally implemented NetSuite with another partner. We specialize in supporting and extending existing accounts.",
  },
  {
    question: "Do you support SuiteScript 2.1?",
    answer:
      "Yes. All new development is completed using SuiteScript 2.1 following Oracle best practices.",
  },
  {
    question: "Can you optimize existing SuiteScripts?",
    answer:
      "Absolutely. We frequently improve performance, readability, and governance usage without rewriting scripts unnecessarily.",
  },
  {
    question: "Do you develop custom integrations?",
    answer:
      "Yes. We build secure integrations using RESTlets, SuiteTalk, middleware platforms, APIs, and file-based integrations.",
  },
  {
    question: "Can you create Advanced PDF templates?",
    answer:
      "Yes. We build fully customized templates for invoices, purchase orders, packing slips, statements, and other business documents.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. Many clients retain us for ongoing NetSuite development and continuous improvement after go-live.",
  },
  {
    question: "Can you sign an NDA?",
    answer:
      "Yes. We are happy to work under mutual confidentiality agreements whenever required.",
  },
];

const WHAT_WE_BUILD = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description: "Custom business logic using SuiteScript 2.1.",
    items: [
      "User Event Scripts",
      "Client Scripts",
      "Scheduled Scripts",
      "Map/Reduce Scripts",
      "RESTlets",
      "Suitelets",
      "Workflow Action Scripts",
      "Portlets",
    ],
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Multi-step approvals and automated process management.",
    items: [
      "Purchase approvals",
      "Sales order approvals",
      "Expense approvals",
      "Employee onboarding",
      "Document routing",
      "Automated notifications",
      "Escalation rules",
      "Status management",
    ],
    href: "/netsuite-workflow-automation",
  },
  {
    icon: LayoutDashboard,
    title: "Saved Searches & Dashboards",
    description: "Real-time visibility without spreadsheet exports.",
    items: [
      "Executive dashboards",
      "Finance dashboards",
      "Sales dashboards",
      "Inventory reporting",
      "KPI Scorecards",
      "Exception reports",
      "Formula-based Saved Searches",
      "Role-specific dashboards",
    ],
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description: "Professional documents built with FreeMarker.",
    items: [
      "Invoices",
      "Purchase Orders",
      "Packing Slips",
      "Picking Tickets",
      "Statements",
      "Shipping Labels",
      "Barcode Documents",
      "QR Code Documents",
    ],
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description: "Secure connections to external platforms and APIs.",
    items: [
      "3PL providers",
      "CRM systems",
      "E-commerce platforms",
      "Payment gateways",
      "Accounting applications",
      "Internal business systems",
      "REST APIs",
      "SFTP file transfers",
    ],
    href: "/netsuite-integrations",
  },
];

const SIGNS = [
  "Employees spend hours performing repetitive manual tasks",
  "Approval processes require multiple emails or spreadsheets",
  "Existing SuiteScripts are generating errors",
  "Transaction saves have become noticeably slower",
  "Reports require manual Excel manipulation every month",
  "Advanced PDF templates don't meet your business requirements",
  "You need to integrate NetSuite with another application",
  "Existing workflows have become difficult to maintain",
  "Governance limit errors are affecting automation",
  "Your implementation partner is no longer providing support",
];

const SKILLS = [
  "SuiteScript 2.1",
  "SuiteFlow",
  "Saved Searches",
  "SuiteAnalytics",
  "RESTlets",
  "SuiteTalk APIs",
  "Map/Reduce scripting",
  "Advanced PDF templates",
  "Governance optimization",
  "Performance tuning",
  "Sandbox deployments",
  "Debugging production issues",
];

const QUESTIONS_TO_ASK = [
  "Do you develop using SuiteScript 2.1?",
  "Have you worked on existing NetSuite implementations?",
  "How do you test before deploying to Production?",
  "Can you optimize existing scripts instead of rewriting them?",
  "How do you handle governance limits?",
  "Have you built Map/Reduce scripts?",
  "Can you integrate NetSuite with external systems?",
  "Do you document your work?",
  "Can you work alongside our internal administrator?",
  "What industries have you supported?",
];

const RED_FLAGS = [
  "Still recommends building new projects in SuiteScript 1.0",
  "Deploys directly to Production without Sandbox testing",
  "Can't explain governance limits",
  "Suggests rewriting everything instead of reviewing existing customizations",
  "Doesn't document custom development",
  "Has limited experience with Map/Reduce or integrations",
  "Focuses only on coding without understanding business processes",
];

const WHY_SUITEPACIFIC = [
  {
    icon: ShieldCheck,
    title: "Oracle-Certified Expertise",
    description:
      "Our developers hold Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications, verified technical knowledge, not self-declared.",
  },
  {
    icon: Star,
    title: "Post-Go-Live Specialists",
    description:
      "We focus exclusively on supporting organizations that are already live on NetSuite. Every solution is built for production reality.",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description:
      "You'll work directly with the developer completing your work, not through layers of project managers or account coordinators.",
  },
  {
    icon: CheckCircle2,
    title: "Sandbox-First Development",
    description:
      "Every customization is developed and tested in a Sandbox environment before Production deployment, no exceptions.",
  },
  {
    icon: Clock,
    title: "Flexible Engagement",
    description:
      "Choose hourly support, project-based work, or ongoing monthly development without being locked into long-term contracts.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Most requests are scoped and delivered in days, not weeks. No statement-of-work cycle before work can begin.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Account Intake, Read First, Build Second",
    description:
      "We review your live account before scoping anything: existing scripts, active workflows, custom fields, and what the previous developer left behind. We understand what's already built before adding to it.",
  },
  {
    step: "02",
    title: "No SOW for Small Requests",
    description:
      "Small enhancements start immediately, no discovery phase or multi-page statement of work required. We scope as we go for routine requests. Formal scoping is reserved for large, well-defined projects.",
  },
  {
    step: "03",
    title: "Sandbox Build Against Real Data",
    description:
      "Everything is built in your sandbox using actual record types, real field configurations, and representative data volumes, not a clean test account. If something will break, it breaks in sandbox, not in production.",
  },
  {
    step: "04",
    title: "Governance Check Before Deploy",
    description:
      "Before any script goes to production, we verify governance consumption at realistic volume, not just a single test record. A script that looks clean on one record can fail on a 200-line sales order.",
  },
  {
    step: "05",
    title: "Production Deployment on Your Schedule",
    description:
      "Changes go live outside your peak business hours. You tell us the window that works; we don't deploy in the middle of a business day.",
  },
  {
    step: "06",
    title: "Documentation That Survives Turnover",
    description:
      "Every custom script is documented: what it does, why it exists, and what would break if someone removed it. The next developer, including us six months later, shouldn't have to reverse-engineer your account.",
  },
  {
    step: "07",
    title: "No Re-Onboarding for the Next Request",
    description:
      "Work arrives as it comes up. Because we stay current with your account, each new request builds on the last. There's no handoff, no re-discovery, and no getting a new developer up to speed every time.",
  },
];

const ADMIN_ROWS = [
  { admin: "User management", dev: "SuiteScript development" },
  { admin: "Roles & permissions", dev: "RESTlets & APIs" },
  { admin: "Forms & fields", dev: "Custom integrations" },
  { admin: "Standard workflows", dev: "Advanced automation" },
  { admin: "Saved Searches", dev: "Map/Reduce processing" },
  { admin: "Dashboards", dev: "Suitelets & Portlets" },
];

const CASE_STUDY_HIGHLIGHTS = [
  {
    outcome: "Batch invoice generation now runs overnight as a scheduled process. The team starts each day with a completion report and a short exceptions list instead of a queue of individual records.",
    tag: "SuiteScript",
    href: "/case-studies/invoice-processing-automation",
  },
  {
    outcome: "The full quotation process, from request to purchase order, now runs inside NetSuite, with a complete audit trail and no re-entry of data.",
    tag: "Workflow Automation",
    href: "/case-studies/vendor-quotation-management",
  },
  {
    outcome: "Each team now has a dashboard that answers their recurring questions in real time, without a weekly export or a request queue.",
    tag: "Dashboards",
    href: "/case-studies/operational-reporting",
  },
];

const FREELANCER_ROWS = [
  {
    freelancer: "Single point of failure",
    large: "Juniors on your account",
    sp: "Certified senior developer",
  },
  {
    freelancer: "Goes dark without warning",
    large: "Slow, ticket-based response",
    sp: "Responsive, direct access",
  },
  {
    freelancer: "Inconsistent documentation",
    large: "High overhead, slow delivery",
    sp: "Every change documented",
  },
  {
    freelancer: "No sandbox discipline enforced",
    large: "Multi-week SOW before start",
    sp: "Sandbox-tested always",
  },
  {
    freelancer: "Drops off after project ends",
    large: "Account manager relay layer",
    sp: "Dedicated long-term partner",
  },
];

export const metadata: Metadata = {
  title: "Hire a NetSuite Developer | SuitePacific",
  description:
    "Hire an experienced, Oracle-certified NetSuite developer for SuiteScript, workflow automation, integrations, and ongoing post-go-live support. No long-term contracts. Senior expertise at boutique rates.",
  alternates: { canonical: "/hire-netsuite-developer" },
};

export default function HireNetSuiteDeveloperPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Hire a NetSuite Developer", url: `${SITE_URL}/hire-netsuite-developer` },
        ]}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* H1 + subtitle */}
        <SectionHeading
          as="h1"
          eyebrow="NetSuite Development"
          title="Hire a NetSuite Developer"
          subtitle="Oracle-Certified NetSuite Developers for Customization, Automation, Integrations & Ongoing Support"
          align="left"
        />

        {/* Intro */}
        <div className="prose prose-blue mt-8 max-w-none prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <p>
            Looking to hire a NetSuite developer who can work on your existing NetSuite account?
            Whether you need a custom SuiteScript, workflow automation, advanced PDF templates,
            integrations with third-party systems, or ongoing post-go-live support, SuitePacific
            provides experienced Oracle-certified NetSuite developers who become an extension of
            your team.
          </p>
          <p>
            Unlike implementation partners whose work often ends at go-live, we specialize in
            helping businesses continuously improve and extend their NetSuite environment as their
            operations evolve.
          </p>
        </div>

        {/* Above the fold CTA */}
        <div className="mt-6">
          <Button href="/contact">Book a Free Consultation</Button>
        </div>

        {/* Social proof, real outcomes */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-5">Recent Work</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CASE_STUDY_HIGHLIGHTS.map((cs) => (
              <Link key={cs.href} href={cs.href} className="group block">
                <Card className="p-5 h-full flex flex-col gap-3 hover:border-accent/30 transition-colors">
                  <span className="text-xs font-medium text-accent bg-accent/8 rounded-full px-2.5 py-0.5 self-start">{cs.tag}</span>
                  <p className="text-sm text-brand-600 flex-1 leading-relaxed">{cs.outcome}</p>
                  <span className="text-xs text-accent group-hover:underline">Read case study →</span>
                </Card>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-brand-300 text-right">
            <Link href="/case-studies" className="hover:text-accent hover:underline">View all case studies →</Link>
          </p>
        </div>

        {/* Why SuitePacific, moved up */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why Companies Choose SuitePacific</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_SUITEPACIFIC.map((item) => (
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

        {/* Freelancer vs Partner vs SuitePacific, moved up */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900">Freelancer vs. Consulting Firm vs. SuitePacific</h2>
          <p className="mt-2 text-sm text-brand-400">
            Each engagement model has strengths. SuitePacific combines the flexibility of a freelancer with the reliability of an experienced consultancy.
          </p>
          <div className="mt-5 rounded-2xl border border-brand-100 overflow-hidden text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div className="bg-brand-50/40 p-4 border-b sm:border-b-0 sm:border-r border-brand-100">
                <p className="font-semibold text-brand-900 mb-3">Freelancer</p>
                {FREELANCER_ROWS.map((r) => (
                  <div key={r.freelancer} className="py-2 border-b border-brand-100/60 last:border-0 text-brand-500">{r.freelancer}</div>
                ))}
              </div>
              <div className="bg-brand-50/20 p-4 border-b sm:border-b-0 sm:border-r border-brand-100">
                <p className="font-semibold text-brand-900 mb-3">Large Consulting Firm</p>
                {FREELANCER_ROWS.map((r) => (
                  <div key={r.large} className="py-2 border-b border-brand-100/60 last:border-0 text-brand-500">{r.large}</div>
                ))}
              </div>
              <div className="bg-brand p-4">
                <p className="font-semibold text-white mb-3">SuitePacific</p>
                {FREELANCER_ROWS.map((r) => (
                  <div key={r.sp} className="py-2 border-b border-white/10 last:border-0 text-blue-100">{r.sp}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Companies Hire */}
        <div className="prose prose-blue mt-14 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Why Companies Hire a NetSuite Developer</h2>
          <p>
            Most organizations don&apos;t realize they need a NetSuite developer until their business
            begins to outgrow standard NetSuite functionality. After implementation, new requirements
            appear:
          </p>
          <ul>
            <li>Manual processes become bottlenecks.</li>
            <li>Approval workflows become increasingly complex.</li>
            <li>Finance teams need reports that standard Saved Searches can&apos;t easily provide.</li>
            <li>Warehouse teams require custom scanning or barcode solutions.</li>
            <li>Sales teams need automated pricing and approval logic.</li>
            <li>External systems need to exchange data with NetSuite.</li>
            <li>Existing scripts begin hitting governance limits.</li>
            <li>Legacy customizations become difficult to maintain.</li>
          </ul>
          <p>
            A NetSuite administrator can configure standard functionality, but when business
            requirements require custom logic, integrations, automation, or scripting, you need an
            experienced NetSuite developer. At SuitePacific, we specialize in solving these
            post-go-live challenges while protecting the stability of your production account.
          </p>
        </div>

        {/* Signs You Need a Developer */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-brand-900">Signs You Need a NetSuite Developer</h2>
          <p className="mt-2 text-sm text-brand-400">You may benefit from hiring a NetSuite developer if any of the following apply:</p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIGNS.map((sign) => (
              <li key={sign} className="flex items-start gap-3 text-sm text-brand-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                {sign}
              </li>
            ))}
          </ul>
        </div>

        {/* What Does a Developer Do */}
        <div className="prose prose-blue mt-14 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-strong:text-brand-900">
          <h2>What Does a NetSuite Developer Do?</h2>
          <p>
            A NetSuite developer extends NetSuite beyond its standard capabilities by building custom
            functionality tailored to your business. Typical development work includes:
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WHAT_WE_BUILD.map((item) => (
            <Card key={item.title} className="p-5 flex flex-col gap-3">
              <div className="flex items-start gap-4">
                <IconBadge icon={item.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                  <p className="mt-1 text-sm text-brand-400">{item.description}</p>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 mt-1 pl-1">
                {item.items.map((i) => (
                  <li key={i} className="text-xs text-brand-400 flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link href={item.href} className="text-xs text-accent hover:underline mt-auto">
                Learn more →
              </Link>
            </Card>
          ))}
        </div>

        {/* Admin vs Developer table */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900">NetSuite Administrator vs. NetSuite Developer</h2>
          <p className="mt-2 text-sm text-brand-400">
            Many businesses are unsure whether they need an administrator or a developer. Here&apos;s the practical difference:
          </p>
          <div className="mt-5 rounded-2xl border border-brand-100 overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="bg-brand-50/60 p-4 sm:p-5">
                <p className="font-semibold text-brand-900 text-sm mb-3">NetSuite Administrator</p>
                {ADMIN_ROWS.map((r) => (
                  <div key={r.admin} className="py-2 border-b border-brand-100/60 last:border-0">
                    <p className="text-sm text-brand-600">{r.admin}</p>
                  </div>
                ))}
              </div>
              <div className="bg-brand p-4 sm:p-5">
                <p className="font-semibold text-white text-sm mb-3">NetSuite Developer</p>
                {ADMIN_ROWS.map((r) => (
                  <div key={r.dev} className="py-2 border-b border-white/10 last:border-0">
                    <p className="text-sm text-blue-100">{r.dev}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-brand-400">
            Administrators configure NetSuite using built-in features. Developers extend NetSuite when configuration alone isn&apos;t enough. Many organizations benefit from having both.
          </p>
        </div>

        {/* Skills to Look For */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900">Skills Every NetSuite Developer Should Have</h2>
          <p className="mt-2 text-sm text-brand-400">
            When evaluating a NetSuite developer, look for hands-on experience with:
          </p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SKILLS.map((skill) => (
              <li key={skill} className="flex items-center gap-2 text-sm text-brand-600">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-brand-400">
            Beyond technical knowledge, an experienced developer should understand NetSuite business processes and be comfortable working within an existing production environment.
          </p>
        </div>

        {/* Questions to Ask */}
        <div className="prose prose-blue mt-14 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-strong:text-brand-900">
          <h2>Questions to Ask Before Hiring a NetSuite Developer</h2>
          <p>Before choosing a developer, consider asking:</p>
          <ul>
            {QUESTIONS_TO_ASK.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <p>
            Experienced developers should answer these questions confidently and explain their
            development process clearly.
          </p>
        </div>

        {/* Red Flags */}
        <div className="mt-12 rounded-2xl border border-amber-100 bg-amber-50/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <h2 className="font-semibold text-brand-900 text-base">Red Flags to Watch For</h2>
          </div>
          <p className="text-sm text-brand-400 mb-4">
            Hiring the wrong developer can create long-term maintenance issues. Be cautious if a developer:
          </p>
          <ul className="space-y-2">
            {RED_FLAGS.map((flag) => (
              <li key={flag} className="flex items-start gap-3 text-sm text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {flag}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-brand-400">
            A good developer aims to improve your existing NetSuite environment, not replace it unnecessarily.
          </p>
        </div>

        {/* Cost section */}
        <div className="prose prose-blue mt-14 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-strong:text-brand-900">
          <h2>How Much Does It Cost to Hire a NetSuite Developer?</h2>
          <p>The cost depends on project complexity, developer experience, engagement model, and ongoing support requirements. Most businesses choose one of three approaches:</p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              title: "Hourly",
              description: "Ideal for small enhancements, troubleshooting, or a one-off task with a defined scope.",
            },
            {
              title: "Fixed-Price Project",
              description: "Best for clearly defined requirements with a fixed scope and a known deliverable.",
            },
            {
              title: "Monthly Retainer",
              description: "Suitable for organizations that require continuous development, enhancements, and technical support.",
              highlight: true,
            },
          ].map((model) => (
            <Card
              key={model.title}
              className={`p-5 ${model.highlight ? "border-accent/30 bg-accent/5" : ""}`}
            >
              <p className={`font-semibold text-sm ${model.highlight ? "text-accent" : "text-brand-900"}`}>
                {model.title}
              </p>
              <p className="mt-2 text-sm text-brand-400">{model.description}</p>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-brand-400">
          Many clients prefer a monthly retained-hours model because it provides predictable access
          to experienced NetSuite developers without committing to a long-term contract.
        </p>

        {/* Our Development Process */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Our Development Process</h2>
          <div className="space-y-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </span>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{step.title}</p>
                  <p className="mt-0.5 text-sm text-brand-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services list */}
        <div className="prose prose-blue mt-14 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Services We Provide</h2>
          <p>Our core development services for live NetSuite accounts:</p>
          <ul>
            <li>
              <Link href="/netsuite-suitescript-development">SuiteScript development</Link>:
              User Event, Client, Scheduled, Map/Reduce, Suitelets, and RESTlets
            </li>
            <li>
              <Link href="/netsuite-workflow-automation">Workflow automation</Link>, SuiteFlow
              approval routing, notifications, status transitions, and process automation
            </li>
            <li>
              <Link href="/netsuite-saved-searches-dashboards">Saved searches and dashboards</Link>:
              role-based dashboards, exception searches, KPI portlets, and formula-based reporting
            </li>
            <li>
              <Link href="/netsuite-advanced-pdf-templates">Advanced PDF templates</Link>, branded
              invoices, purchase orders, packing slips, and statements with conditional formatting
            </li>
            <li>
              <Link href="/netsuite-account-optimization">Account optimization</Link>, cleanup
              of legacy scripts, unused fields, conflicting workflows, and slow configurations
            </li>
            <li>
              <Link href="/netsuite-post-go-live-support">Post-go-live support</Link>, ongoing
              retained hours for a live account that keeps evolving
            </li>
          </ul>
          <p>
            For context on where this kind of engagement fits relative to an implementation partner,
            see our{" "}
            <Link href="/netsuite-implementation-partner-vs-managed-support">
              implementation partner vs. managed support guide
            </Link>
            .
          </p>
        </div>

        {/* FAQ */}
        <ServiceFaqSection items={FAQ} />

        {/* Inline contact form */}
        <div className="mt-14 pt-10 border-t border-brand-50">
          <p className="text-brand-900 font-semibold text-lg">Ready to hire a NetSuite developer?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you need. We respond within one business day.
          </p>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
            <LeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}

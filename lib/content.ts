import {
  Code2,
  Workflow,
  LayoutDashboard,
  FileText,
  Settings2,
  LifeBuoy,
  Globe,
  UserX,
  RefreshCcw,
  Clock,
  Wrench,
  CalendarClock,
  HelpCircle,
  Users,
  Zap,
  MessageCircle,
  Heart,
  DollarSign,
  Headset,
  Search,
  Database,
  PanelsTopLeft,
  Activity,
  MousePointerClick,
  Timer,
  Layers3,
  Gauge,
  BarChart3,
  ClipboardList,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import type {
  NavLink,
  IconItem,
  Service,
  TimelineStep,
  CaseStudy,
  FooterColumn,
  KpiStat,
  FaqItem,
} from "./types";

export const CONTACT_EMAIL = "info@suitepacific.com";
export const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@suitepacific.com";
export const SITE_URL = "https://suitepacific.com";
export const LEGAL_NAME = "SuitePacific, LLC";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  {
    label: "Products",
    children: [
      {
        label: "SuiteCompare",
        href: "/suitecompare",
        description: "Compare NetSuite scripts across environments in one click.",
      },
    ],
  },
];

export const CTA_SUPPORT_LINE =
  "No sales pressure. No long-term contracts. Just practical advice from experienced NetSuite specialists.";

export const TRUST_BADGES: string[] = [
  "NetSuite Certified Professional",
  "Boutique & Responsive",
  "Focused on Post-Go-Live",
  "No Long-Term Contracts",
];

export const KPI_STATS: KpiStat[] = [
  { icon: Workflow, label: "Active Workflows", value: "12" },
  { icon: Search, label: "Saved Searches", value: "28" },
  { icon: Code2, label: "Scripts Deployed", value: "16" },
  { icon: Clock, label: "Open Tickets", value: "4" },
];

export const PAIN_POINTS: IconItem[] = [
  {
    icon: UserX,
    title: "Your implementation partner has moved on.",
    description:
      "The team that built your NetSuite instance is long gone, and you're left without a clear point of contact for what comes next.",
  },
  {
    icon: RefreshCcw,
    title: "Business requirements keep changing.",
    description:
      "Your processes evolve every quarter, but your NetSuite setup hasn't kept pace with how the business actually runs today.",
  },
  {
    icon: Clock,
    title: "Small requests take weeks.",
    description:
      "A simple saved search or workflow tweak shouldn't require a ticket queue and a six-week wait for a response.",
  },
  {
    icon: Wrench,
    title: "You need a NetSuite developer, not another consulting firm.",
    description:
      "You don't need another discovery phase or statement of work. You need someone who can open the account and build.",
  },
  {
    icon: CalendarClock,
    title: "You need reliable monthly support.",
    description:
      "Ongoing improvements require an ongoing partner, not a one-off project team that disappears after the invoice clears.",
  },
  {
    icon: HelpCircle,
    title: "Nobody internally understands the customizations.",
    description:
      "Your team inherited a black box of scripts and workflows with no documentation and no one who can explain how it works.",
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  { label: "Implementation Partner", description: "Built your initial NetSuite instance" },
  { label: "NetSuite Go-Live", description: "Your system launched and the project team moved on" },
  { label: "SuitePacific", description: "Your dedicated team for everything after go-live", emphasis: true },
];

export const TIMELINE_BENEFITS: string[] = [
  "Monthly Enhancements",
  "Bug Fixes",
  "Workflow Automation",
  "SuiteScript Development",
  "Saved Searches",
  "Reports",
  "Account Optimization",
  "Continuous Improvement",
];

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description: "Custom scripts that extend NetSuite to fit exactly how your business operates.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate approvals, notifications, and processes to eliminate manual busywork.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: LayoutDashboard,
    title: "Saved Searches & Dashboards",
    description: "Surface the data your team needs with clear, role-based dashboards and searches.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description: "Polished invoices, statements, and forms that reflect your brand and fit your workflow.",
    href: "/netsuite-advanced-pdf-templates",
  },
  {
    icon: Globe,
    title: "NetSuite Integrations",
    description: "Connect NetSuite to your 3PL, e-commerce platform, CRM, or other business systems, reliably and without silent failures.",
    href: "/netsuite-integrations",
  },
  {
    icon: Settings2,
    title: "Account Optimization",
    description: "Clean up legacy configurations and tighten your account for speed and reliability.",
    href: "/netsuite-account-optimization",
  },
  {
    icon: LifeBuoy,
    title: "Post-Go-Live Support",
    description: "Responsive, senior-level support for the day-to-day issues that come up after launch.",
    href: "/netsuite-post-go-live-support",
  },
];

export const COMPARISON_CONS: string[] = [
  "Junior consultants",
  "High overhead",
  "Slow turnaround",
  "Rigid engagement",
  "Long response times",
  "Generic, cookie-cutter approach",
];

export const COMPARISON_PROS: string[] = [
  "Senior NetSuite Experts",
  "Direct Communication",
  "Faster Delivery",
  "Flexible Engagement",
  "Boutique Experience",
  "Long-Term Partnership",
];

export const BOUTIQUE_BENEFITS: IconItem[] = [
  { icon: Users, title: "No Junior Staffing", description: "Every engagement is handled by an experienced NetSuite developer; we don't staff accounts with juniors learning on the job." },
  { icon: Zap, title: "Fast Turnaround", description: "Most requests are scoped and delivered in days, not weeks, with no statement-of-work cycle in between." },
  { icon: MessageCircle, title: "Talk Directly to Who's Building It", description: "Your point of contact is the developer writing the script or workflow, not an account manager relaying your request." },
  { icon: Heart, title: "Built for the Long Run", description: "We're set up to stay your NetSuite team for years, picking up new requests as your business changes rather than closing out after one project." },
  { icon: DollarSign, title: "Cost Effective", description: "Boutique overhead means senior expertise without enterprise consulting rates." },
  { icon: Headset, title: "Dedicated Support", description: "A consistent team that knows your account, your history, and your priorities." },
];

export const ABOUT_INTRO = {
  eyebrow: "About SuitePacific",
  title: "About SuitePacific",
  subtitle:
    "A boutique NetSuite consulting team focused on practical, post-implementation support, direct communication, and long-term partnership.",
  paragraphs: [
    "SuitePacific exists because of a gap most NetSuite accounts fall into: the implementation partner's contract ends at go-live, but the business doesn't stop changing. What's left is a live, mission-critical system with no one assigned to keep up with it.",
    "We chose to stay boutique on purpose. A small, focused team means no account-manager layer between you and the person doing the work, no junior staff learning on your account, and no incentive to pad scope with discovery phases you don't need.",
    "That's also why we focus exclusively on post-go-live work. Implementation and ongoing support require different skills and different pacing; trying to do both well, for every client, is how large firms end up doing neither particularly well for any one of them.",
    "Direct communication and long-term partnership aren't slogans here, they're the practical result of staying small: you talk to the person building your workflows, every change is tested in a sandbox before it touches production, and the relationship is built to continue for as long as it's useful to you.",
  ],
};

export const ABOUT_FEATURES: IconItem[] = [
  {
    icon: LifeBuoy,
    title: "Post-Go-Live Specialists",
    description: "We only take on work after a NetSuite account is live, so everything we build is grounded in production reality, not implementation theory.",
  },
  {
    icon: ShieldCheck,
    title: "Sandbox-Tested Changes",
    description: "Every change is built and verified in a sandbox before it ever touches your live account.",
  },
  {
    icon: Code2,
    title: "Hands-On Technical Work",
    description: "The person you talk to is the person writing the scripts and building the workflows, not relaying your request to someone else.",
  },
  {
    icon: RefreshCcw,
    title: "Built to Scale With You",
    description: "As your NetSuite usage grows, so does the relationship: more automation, more reporting, more of what you need, without starting over with someone new.",
  },
];

export const RECENT_WORK: IconItem[] = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts tailored to exactly how your business operates." },
  { icon: Workflow, title: "Workflow Automation", description: "Automated approvals and notifications that remove manual busywork." },
  { icon: Search, title: "Saved Searches", description: "Targeted searches that surface the data your team actually needs." },
  { icon: LayoutDashboard, title: "Dashboards", description: "Role-based dashboards that put key metrics in front of the right people." },
  { icon: FileText, title: "Advanced PDF Templates", description: "Branded invoices, statements, and forms that match how you do business." },
  { icon: Database, title: "Custom Records", description: "Structured records that capture the data your processes depend on." },
  { icon: PanelsTopLeft, title: "Suitelets", description: "Custom pages and tools built directly inside NetSuite." },
  { icon: Activity, title: "User Event Scripts", description: "Automatic record-level logic that runs exactly when it should." },
  { icon: MousePointerClick, title: "Client Scripts", description: "Real-time validation and guidance right on the data entry form." },
  { icon: Timer, title: "Scheduled Scripts", description: "Background jobs that keep recurring processes running on autopilot." },
  { icon: Layers3, title: "Map/Reduce Scripts", description: "Reliable processing for high-volume data without hitting governance limits." },
  { icon: Settings2, title: "NetSuite Optimization", description: "Cleaner configurations for a faster, more reliable account." },
  { icon: Gauge, title: "Performance Tuning", description: "Faster page loads and searches across a heavily used account." },
  { icon: BarChart3, title: "Reporting & Analytics", description: "Clearer visibility into the numbers that drive decisions." },
  { icon: LifeBuoy, title: "Post-Go-Live Support", description: "Responsive, senior-level help for whatever comes up next." },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    icon: LayoutDashboard,
    title: "Custom Project Performance Dashboard",
    challenge:
      "Project managers lacked a centralized view of actual effort versus planned work. Standard NetSuite reporting couldn't accurately compare actual hours, budgeted effort, and remaining work.",
    solution:
      "Designed and developed a custom NetSuite dashboard that consolidated project metrics into a single interactive view with real-time budget tracking and project progress insights.",
    outcome:
      "Project managers could see budget-versus-actual status at a glance instead of rebuilding it in a spreadsheet before every status meeting, catching overruns while there was still time to act on them.",
  },
  {
    icon: ClipboardList,
    title: "Vendor Quotation Management Solution",
    challenge:
      "Managing supplier quotations manually made it difficult to compare pricing, evaluate vendors, and maintain a consistent procurement process.",
    solution:
      "Developed a custom NetSuite solution that centralized vendor quotations, simplified supplier comparisons, and streamlined the quotation workflow.",
    outcome:
      "Procurement could compare vendor quotes side by side inside NetSuite instead of cross-referencing emails and spreadsheets, shortening the time between requesting quotes and issuing a purchase order.",
  },
  {
    icon: Workflow,
    title: "Intelligent Sales Order Approval Workflow",
    challenge:
      "Sales orders with low profit margins required manual review, creating delays and inconsistent approval processes.",
    solution:
      "Built a configurable approval workflow that automatically evaluated gross margin thresholds and routed transactions to the appropriate approvers.",
    outcome:
      "Low-margin orders were automatically flagged and routed to the right approver instead of relying on staff to catch them manually, giving finance consistent enforcement of pricing policy across every sales order.",
  },
  {
    icon: Receipt,
    title: "High-Volume Invoice Processing Automation",
    challenge:
      "Processing large invoice batches manually created unnecessary administrative work and slowed financial operations.",
    solution:
      "Developed an automated batch processing solution that streamlined invoice generation and document creation for high transaction volumes.",
    outcome:
      "Large invoice batches that previously required staff to generate and review documents one at a time now run as a single automated process, freeing the billing team to focus on exceptions instead of repetitive data entry.",
  },
  {
    icon: FileText,
    title: "Advanced PDF Document Automation",
    challenge:
      "Standard NetSuite templates couldn't support the client's complex document requirements and branding standards.",
    solution:
      "Created custom Advanced PDF templates with dynamic layouts, conditional sections, barcode support, and automated formatting.",
    outcome:
      "Every invoice, statement, and form now generates correctly formatted and on-brand straight out of NetSuite, with no manual touch-up required before it reaches a customer or vendor.",
  },
  {
    icon: BarChart3,
    title: "Operational Reporting & Business Intelligence",
    challenge:
      "Business users needed faster access to operational insights than standard NetSuite reporting could provide.",
    solution:
      "Built custom dashboards, reports, saved searches, and interactive reporting tools tailored to business requirements.",
    outcome:
      "Business users could pull the numbers they needed directly from a dashboard instead of requesting a custom report and waiting on someone else to build it, shortening the path from question to answer.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What does SuitePacific do?",
    answer:
      "SuitePacific is an ongoing NetSuite support team for companies that have already completed their implementation. We handle SuiteScript development, workflow automation, saved searches and dashboards, advanced PDF templates, account optimization, bug fixes, and monthly enhancements: everything that comes up after go-live.",
  },
  {
    question: "Do you handle NetSuite implementations?",
    answer:
      "No. We intentionally focus only on post-go-live support. If you haven't gone live on NetSuite yet, you'll want an implementation partner first. We're who you call once that partner's work is done and you need an ongoing team. See our implementation partner vs. managed support comparison for the full breakdown.",
  },
  {
    question: "How fast can you start?",
    answer:
      "Most clients are up and running within a few days. There's no lengthy discovery phase or statement of work. We get access to your account, understand what you need, and start building.",
  },
  {
    question: "Do you require a long-term contract?",
    answer:
      "No. We work on a flexible, month-to-month basis. You stay because the work is good, not because you're locked into a multi-year agreement.",
  },
  {
    question: "What NetSuite areas can you help with?",
    answer:
      "SuiteScript development, workflow automation (SuiteFlow), saved searches and dashboards, advanced PDF/HTML templates, account configuration and optimization, and general bug fixes and troubleshooting across modules.",
  },
  {
    question: "How much does SuitePacific cost?",
    answer:
      "Pricing depends on the scope of ongoing work your account needs. Because we're a boutique team without enterprise consulting overhead, our rates are typically well below large NetSuite consulting firms. Book a free consultation and we'll give you a clear, specific quote.",
  },
  {
    question: "Is your team certified on NetSuite?",
    answer:
      "Yes. Our lead developer holds Oracle NetSuite's SuiteCloud Developer II and Administrator Professional certifications, with hands-on experience across SuiteScript, SuiteFlow, and NetSuite's reporting tools.",
  },
  {
    question: "What types of NetSuite customizations do you provide?",
    answer:
      "SuiteScript development, Suitelets, custom records, User Event and Client scripts, Scheduled and Map/Reduce scripts, workflow automation, saved searches, dashboards, and advanced PDF templates, all built around your existing account.",
  },
  {
    question: "Can you customize our existing NetSuite account?",
    answer:
      "Yes. That's the core of what we do. We work inside the NetSuite account you already have, building on top of your existing setup rather than starting over.",
  },
  {
    question: "Can you automate our NetSuite business processes?",
    answer:
      "Yes. We regularly build SuiteFlow workflows and script-based automation to remove manual steps from approvals, notifications, and recurring data tasks.",
  },
  {
    question: "Do you develop SuiteScript solutions?",
    answer:
      "Yes. SuiteScript development is one of our core services, covering everything from small field-level scripts to larger Map/Reduce processes.",
  },
  {
    question: "Can you optimize slow NetSuite accounts?",
    answer:
      "Yes. We review configurations, scripts, and saved searches to identify what's slowing an account down and clean up or re-architect what's causing it.",
  },
  {
    question: "How do you make changes without risking our live account?",
    answer:
      "We build and test changes in a sandbox account before anything touches production. Once a change is verified there, we deploy to your live account on a schedule that works for your business, not in the middle of your busiest hours.",
  },
  {
    question: "What access do you need, and is our data safe?",
    answer:
      "Only the role-based access you grant inside your own NetSuite account, scoped to what the work requires, nothing more. We don't copy your data out to a separate platform or tool; everything we build and everything we touch stays inside the NetSuite account you control and can revoke access to at any time.",
  },
  {
    question: "Who actually works on our account?",
    answer:
      "A consistent, senior NetSuite developer who learns your account and stays with it, not a rotating cast of juniors. As a boutique team, we keep our client list intentionally limited so every account gets real attention.",
  },
  {
    question: "Who owns the customizations you build?",
    answer:
      "You do, outright. Everything we build, SuiteScript, workflows, saved searches, dashboards, PDF templates, is built natively inside the NetSuite account you already own. None of it lives on a separate platform or depends on us to keep running. If you ever move to a different developer or team, everything we built stays exactly where it is and works exactly the same.",
  },
  {
    question: "What happens if we want to end the engagement?",
    answer:
      "You cancel, and that's it. Because we work month-to-month with no long-term contract, there's no termination fee, no offboarding process, and no transition period required, since everything we build lives inside your own NetSuite account rather than a system we control.",
  },
  {
    question: "What happens after I book a consultation?",
    answer:
      "We start with a short call to understand your account and current priorities. From there, we get access to your account, review what's already built, and agree on what to tackle first, typically the highest-impact item, not the full backlog at once. Build and testing happen in a sandbox before anything reaches production. There's no separate discovery phase or statement of work before work can begin.",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About SuitePacific", href: "/#about" },
      { label: "Why SuitePacific", href: "/#why-us" },
      { label: "Recent Work", href: "/#work" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SuiteScript Development", href: "/netsuite-suitescript-development" },
      { label: "Workflow Automation", href: "/netsuite-workflow-automation" },
      { label: "Saved Searches & Dashboards", href: "/netsuite-saved-searches-dashboards" },
      { label: "Advanced PDF Templates", href: "/netsuite-advanced-pdf-templates" },
      { label: "NetSuite Integrations", href: "/netsuite-integrations" },
      { label: "Administrator Support", href: "/netsuite-administrator-support" },
      { label: "Account Optimization", href: "/netsuite-account-optimization" },
      { label: "Post-Go-Live Support", href: "/netsuite-post-go-live-support" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "NetSuite Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/#faq" },
      { label: "Hire a NetSuite Developer", href: "/hire-netsuite-developer" },
      { label: "Post-Go-Live Support Guide", href: "/netsuite-post-go-live-support" },
      { label: "Implementation vs. Managed Support", href: "/netsuite-implementation-partner-vs-managed-support" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Book a Consultation", href: "/contact" },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

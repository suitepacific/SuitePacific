import {
  Code2,
  Workflow,
  LayoutDashboard,
  FileText,
  Settings2,
  LifeBuoy,
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
  TrendingUp,
} from "lucide-react";
import type {
  NavLink,
  IconItem,
  Service,
  TimelineStep,
  Testimonial,
  FooterColumn,
  KpiStat,
  FaqItem,
} from "./types";

export const CALENDLY_URL = "https://calendly.com/suitepacific/consultation";
export const CONTACT_EMAIL = "info@suitepacific.com";
export const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@suitepacific.com";
export const SITE_URL = "https://suitepacific.com";
export const LEGAL_NAME = "SuitePacific, LLC";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How We Help", href: "/#timeline" },
  { label: "Why SuitePacific", href: "/#why-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
];

export const TRUST_BADGES: string[] = [
  "Certified NetSuite Developers",
  "Boutique & Responsive",
  "Focused on Post-Go-Live",
  "Trusted by Growing Businesses",
];

export const KPI_STATS: KpiStat[] = [
  { icon: TrendingUp, label: "Process Efficiency", value: "+38%", delta: "+12%", positive: true },
  { icon: DollarSign, label: "Monthly Close Time", value: "4.2 days", delta: "-2.1 days", positive: true },
  { icon: Users, label: "Active Automations", value: "27", delta: "+6", positive: true },
  { icon: Clock, label: "Avg. Ticket Turnaround", value: "1.8 days", delta: "-3.4 days", positive: true },
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
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate approvals, notifications, and processes to eliminate manual busywork.",
  },
  {
    icon: LayoutDashboard,
    title: "Saved Searches & Dashboards",
    description: "Surface the data your team needs with clear, role-based dashboards and searches.",
  },
  {
    icon: FileText,
    title: "Advanced PDF Templates",
    description: "Polished invoices, statements, and forms that reflect your brand and fit your workflow.",
  },
  {
    icon: Settings2,
    title: "Account Optimization",
    description: "Clean up legacy configurations and tighten your account for speed and reliability.",
  },
  {
    icon: LifeBuoy,
    title: "Post-Go-Live Support",
    description: "Responsive, senior-level support for the day-to-day issues that come up after launch.",
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
  { icon: Users, title: "Senior Experts", description: "Every engagement is handled by experienced NetSuite developers, no junior staffing." },
  { icon: Zap, title: "Fast Turnaround", description: "Most requests are scoped and delivered in days, not weeks." },
  { icon: MessageCircle, title: "Transparent Communication", description: "Direct access to the people doing the work, not a layer of account managers." },
  { icon: Heart, title: "Long-Term Partnership", description: "We aim to be your NetSuite team for years, not a single project engagement." },
  { icon: DollarSign, title: "Cost Effective", description: "Boutique overhead means senior expertise without enterprise consulting rates." },
  { icon: Headset, title: "Dedicated Support", description: "A consistent team that knows your account, your history, and your priorities." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Our implementation partner vanished the day we went live. SuitePacific stepped in and has been faster and more responsive than anyone we worked with before.",
    name: "Sarah Chen",
    role: "Controller",
    company: "Northwind Supply Co.",
  },
  {
    quote:
      "We needed someone who could just open the account and build, no discovery calls, no statements of work. That's exactly what we got.",
    name: "Marcus Webb",
    role: "ERP Manager",
    company: "Crestline Manufacturing",
  },
  {
    quote:
      "Monthly enhancements that used to take six weeks with our old partner now take a few days. SuitePacific feels like an extension of our own team.",
    name: "Priya Raman",
    role: "VP of Finance",
    company: "Harborview Foods",
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
      "No. We intentionally focus only on post-go-live support. If you haven't gone live on NetSuite yet, you'll want an implementation partner first. We're who you call once that partner's work is done and you need an ongoing team.",
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
      "Yes. Our developers are certified NetSuite professionals with hands-on experience across SuiteScript, SuiteFlow, and NetSuite's reporting tools.",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "/#services" },
      { label: "How We Help", href: "/#timeline" },
      { label: "Why SuitePacific", href: "/#why-us" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SuiteScript Development", href: "/#services" },
      { label: "Workflow Automation", href: "/#services" },
      { label: "Saved Searches & Dashboards", href: "/#services" },
      { label: "Post-Go-Live Support", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#why-us" },
      { label: "Why Boutique", href: "/#why-us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Book a Consultation", href: "/#contact" },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

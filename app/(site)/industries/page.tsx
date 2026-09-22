import type { Metadata } from "next";
import Link from "next/link";
import {
  HardHat,
  Factory,
  Code2,
  Utensils,
  Heart,
  Package,
  ShoppingCart,
  Briefcase,
  Building2,
  Activity,
  Landmark,
  Truck,
  UserCheck,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, OrganizationJsonLd, VideoObjectJsonLd } from "@/components/seo/JsonLd";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const INDUSTRIES = [
  {
    icon: HardHat,
    name: "Construction",
    slug: "construction",
    description:
      "Job costing, AIA G702/G703 progress billing, WIP reporting, change order automation, and subcontractor management for general contractors and specialty trades.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    slug: "manufacturing",
    description:
      "Work order automation, bill-of-materials logic, production reporting, lot and serial tracking, and SuiteScript customization for discrete and process manufacturers.",
  },
  {
    icon: Code2,
    name: "SaaS and Technology",
    slug: "saas-technology",
    description:
      "Subscription billing, renewal automation, ARR/MRR reporting, revenue recognition under ASC 606, and CRM integrations for software and technology companies.",
  },
  {
    icon: Utensils,
    name: "Food and Beverage",
    slug: "food-beverage",
    description:
      "Shelf life and lot traceability, trade promotion management, EDI integration, chargeback handling, and deduction management for CPG and food manufacturers.",
  },
  {
    icon: Heart,
    name: "Nonprofit",
    slug: "nonprofit",
    description:
      "Fund accounting enforcement, grant tracking, board and donor reporting, 990 preparation support, and budget-vs-actual visibility for mission-driven organizations.",
  },
  {
    icon: Package,
    name: "Wholesale Distribution",
    slug: "wholesale-distribution",
    description:
      "Inventory management, order automation, tiered pricing scripts, warehouse integrations, and demand planning saved searches for distributors and wholesalers.",
  },
  {
    icon: ShoppingCart,
    name: "Retail and E-commerce",
    slug: "retail-ecommerce",
    description:
      "Channel order management, Shopify integration, inventory automation, returns processing, and multi-location fulfillment for retail and direct-to-consumer brands.",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    slug: "professional-services",
    description:
      "Project accounting, timesheet automation, billing workflows, project profitability reporting, and resource utilization dashboards for services firms.",
  },
  {
    icon: Building2,
    name: "Real Estate",
    slug: "real-estate",
    description:
      "Property-level reporting, lease tracking, capital expenditure approvals, multi-entity consolidation, and intercompany eliminations for real estate operators and investors.",
  },
  {
    icon: Activity,
    name: "Healthcare & Life Sciences",
    slug: "healthcare",
    description:
      "FDA compliance automation, lot and serial tracking with expiration logic, CAPA workflow management, SOD enforcement, grant reporting, and regulatory saved searches for medical device, pharma, and health tech companies.",
  },
  {
    icon: Landmark,
    name: "Fintech",
    slug: "fintech",
    description:
      "ASC 606 multi-element revenue recognition, payment processor reconciliation, investor reporting metrics, SOD compliance workflows, and multi-entity consolidation for financial technology companies.",
  },
  {
    icon: Truck,
    name: "Courier & Travel",
    slug: "courier-travel",
    description:
      "Job-based billing automation, agent and driver commission scripts, dispatch and booking system integration, fleet expense tracking, and branch P&L reporting for courier, logistics, and travel businesses.",
  },
  {
    icon: UserCheck,
    name: "Recruitment & Staffing",
    slug: "recruitment",
    description:
      "Timesheet-to-invoice automation, recruiter commission calculations, ATS integration with Bullhorn and Salesforce, gross margin reporting, and multi-branch P&L for staffing and recruitment firms.",
  },
  {
    icon: Wrench,
    name: "Service Industries",
    slug: "service-industries",
    description:
      "Work order billing automation, service contract recurring billing, field service management integration, customer equipment tracking, and technician utilization reporting for field service and maintenance companies.",
  },
];

const FAQ = [
  {
    question: "Does SuitePacific work with companies outside these nine industries?",
    answer:
      "Occasionally, but these are the verticals where the team has built repeatable configurations and recognizes the specific workflow patterns. Companies in adjacent industries often share enough overlap with one of these thirteen verticals that the engagement is straightforward.",
  },
  {
    question: "Is the support model the same across all industries?",
    answer:
      "The structure is the same: a monthly retainer with a defined hour allocation, covering SuiteScript development, workflow automation, saved searches, release management, and ongoing configuration. The scope is tuned to the industry at the start of the engagement.",
  },
  {
    question: "What if our NetSuite account spans multiple industries?",
    answer:
      "Multi-vertical accounts are common, particularly holding companies and private equity portfolios with subsidiaries across different industries. The engagement is scoped to the account as a whole rather than to a single industry module.",
  },
  {
    question: "How quickly can SuitePacific start an engagement?",
    answer:
      "Most engagements begin within two weeks of the initial scoping call. The first month covers a baseline assessment of the account, identification of the highest-priority issues, and delivery of the first set of fixes or builds.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support by Industry",
  description:
    "NetSuite post-go-live support across thirteen industries: construction, manufacturing, SaaS, fintech, recruitment, food and beverage, nonprofit, retail, distribution, and more.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "NetSuite Support by Industry",
    description:
      "Post-go-live NetSuite support scoped to your industry: construction, manufacturing, SaaS, fintech, recruitment, courier, service industries, food and beverage, nonprofit, retail, distribution, real estate, and professional services.",
    url: "https://suitepacific.com/industries",
    type: "website",
    images: [{ url: "https://suitepacific.com/og-default.png", width: 1200, height: 630 }],
  },
};

export default function IndustriesPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
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
          eyebrow="Post-Go-Live Support"
          title="NetSuite support by industry"
          subtitle="Industry-specific NetSuite support means the team already knows the workflows, modules, and reporting requirements of your vertical before the engagement starts."
        />
        <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-sm text-brand-600 mb-3">Which industry is your NetSuite account on? Tell us and we&apos;ll scope the engagement.</p>
          <LeadFormLight />
        </div>
      </div>

      {/* QA block */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-12">
        <div style={{ background: "#eef2fb", border: "1px solid #b2c2e6", borderRadius: "10px", padding: "1.25rem 1.5rem", margin: "2rem 0", fontFamily: "system-ui,-apple-system,sans-serif" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#4f7fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick answer</p>
          <p style={{ margin: 0, color: "#14306b", fontSize: "0.9rem", lineHeight: 1.6 }}>
            SuitePacific provides post-go-live NetSuite support across thirteen industries: construction, manufacturing, SaaS and technology, fintech, recruitment and staffing, courier and travel, service industries, food and beverage, nonprofit, retail and e-commerce, wholesale distribution, real estate, and professional services. Each engagement is scoped to the workflows and modules specific to that vertical. Construction companies receive job costing and AIA billing. Manufacturing companies receive work order and BOM automation. SaaS and fintech companies receive subscription billing, revenue recognition, and investor reporting. Staffing firms receive timesheet-to-invoice scripts and commission automation. Service industry companies receive work order billing and FSM integrations. The delivery structure is consistent across all verticals: SuiteScript development, workflow automation, saved search builds, release management, and ongoing account optimization on a monthly retainer. All engagements begin with a baseline assessment of the NetSuite account to identify the highest-priority issues before development work begins. Pricing starts at $799 per month.
          </p>
        </div>
      </div>

      {/* Industry grid */}
      <div className="mx-auto max-w-5xl px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="mb-3">
                  <IconBadge icon={Icon} />
                </div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {industry.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {industry.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* How the model works */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-20">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          How does industry-specific NetSuite support work?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          General-purpose NetSuite support covers the system. Industry-specific support covers the system and the workflows. A construction company on NetSuite has fundamentally different configuration requirements than a SaaS company on NetSuite, even if both are using the same core accounting modules.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          SuitePacific works exclusively on post-go-live accounts: companies that are already live on NetSuite and need ongoing development, optimization, and support rather than an initial implementation. Each industry page describes the specific configurations, saved searches, SuiteScript builds, and module setups the team has built for that vertical.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Engagements run on a monthly retainer through the{" "}
          <Link href="/netsuite-managed-support" className="text-blue-600 hover:underline">
            NetSuite managed support
          </Link>{" "}
          model. A{" "}
          <Link href="/netsuite-health-check" className="text-blue-600 hover:underline">
            NetSuite health check
          </Link>{" "}
          is available for accounts that need an assessment before committing to ongoing support.
        </p>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">FAQ</h2>
        <div className="space-y-8">
          {FAQ.map((item) => (
            <div key={item.question}>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related reading */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Related reading</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link href="/netsuite-managed-support" className="text-blue-600 hover:underline">NetSuite managed support</Link>: monthly retainer structure, hour tiers, and what is covered
          </li>
          <li>
            <Link href="/netsuite-health-check" className="text-blue-600 hover:underline">NetSuite health check</Link>: account assessment for companies that need a diagnosis before committing to ongoing support
          </li>
          <li>
            <Link href="/netsuite-post-go-live-support" className="text-blue-600 hover:underline">NetSuite post-go-live support</Link>: what the post-go-live phase involves and why it requires a different partner than implementation
          </li>
          <li>
            <Link href="/blog/netsuite-in-house-vs-managed-services" className="text-blue-600 hover:underline">NetSuite in-house admin vs managed services</Link>: cost and capability comparison for post-go-live staffing decisions
          </li>
        </ul>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-20">
        <div className="rounded-xl bg-brand-50/60 border border-brand-100 px-5 py-4">
          <p className="text-sm text-brand-600 mb-3">Need post-go-live NetSuite support for your industry? Tell us about your account.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

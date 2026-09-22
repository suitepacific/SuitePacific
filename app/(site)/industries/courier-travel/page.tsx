import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck,
  Plane,
  MapPin,
  DollarSign,
  BarChart2,
  Workflow,
  Code2,
  ShieldCheck,
  RefreshCcw,
  Award,
  Headphones,
  Plug,
  Users,
  CreditCard,
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
    icon: DollarSign,
    title: "Job and trip-based billing",
    description:
      "Courier and logistics billing tied to individual delivery jobs or trip legs requires custom invoicing logic that groups shipments by client contract, applies zone-based or weight-based rates, and generates invoices by billing cycle.",
  },
  {
    icon: CreditCard,
    title: "Agent and driver commission tracking",
    description:
      "Travel agencies and courier networks that pay agents or driver-partners based on booking revenue, delivery fees, or performance tiers need commission calculation scripts that standard NetSuite compensation tools cannot handle.",
  },
  {
    icon: MapPin,
    title: "Multi-branch operations reporting",
    description:
      "Courier and travel companies with regional offices or franchise locations need branch-level P&L, cost per route or booking, and vehicle or resource expense allocation across divisions.",
  },
  {
    icon: Truck,
    title: "Vehicle and fleet expense tracking",
    description:
      "Fleet operating costs including fuel, maintenance, insurance, and depreciation need to be tracked by vehicle or route to produce accurate cost-per-delivery reporting and fleet profitability analysis.",
  },
  {
    icon: Plane,
    title: "Booking system integration",
    description:
      "Travel companies using reservation systems and courier companies using dispatch platforms need integrations that sync booking or delivery data to NetSuite for billing, revenue recognition, and operations reporting.",
  },
  {
    icon: BarChart2,
    title: "Corporate account billing",
    description:
      "High-volume corporate clients with negotiated rate agreements, volume discounts, and consolidated monthly invoicing require custom billing logic and contract pricing that standard NetSuite invoicing does not manage natively.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "SuiteScript Development",
    description:
      "Custom scripts for job-based billing automation, commission calculations, booking system data imports, and courier or travel-specific business logic across all SuiteScript types.",
    href: "/netsuite-suitescript-development",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "SuiteFlow workflows for invoice approval routing, expense authorization, corporate account billing release, and client contract renewal notifications.",
    href: "/netsuite-workflow-automation",
  },
  {
    icon: BarChart2,
    title: "Saved Searches & Dashboards",
    description:
      "Revenue per route, cost per delivery, agent commission, corporate account margin, and fleet expense saved searches built with SuiteQL for operations and finance teams.",
    href: "/netsuite-saved-searches-dashboards",
  },
  {
    icon: Plug,
    title: "NetSuite Integrations",
    description:
      "RESTlet and scheduled script integrations connecting NetSuite to dispatch systems, reservation platforms, fleet management tools, and payment processors for automated billing data flow.",
    href: "/netsuite-integrations",
  },
  {
    icon: Headphones,
    title: "Post-Go-Live Support",
    description:
      "Ongoing technical support for live courier and travel NetSuite accounts: new development, break-fix response, release testing, and account upkeep on a month-to-month retainer.",
    href: "/netsuite-post-go-live-support",
  },
  {
    icon: Users,
    title: "Administrator Support",
    description:
      "Ongoing NetSuite administration: role and permission management, configuration changes, period close support, and platform troubleshooting for logistics and travel accounts.",
    href: "/netsuite-administrator-support",
  },
];

const CUSTOMIZATIONS = [
  {
    title: "Job-based invoice generation scripts",
    description:
      "Scheduled Map/Reduce scripts that pull completed delivery or booking records, group them by client and billing period, apply the correct rate from the client contract, and generate consolidated invoices for review.",
  },
  {
    title: "Agent and driver commission scripts",
    description:
      "User Event scripts triggered on transaction completion that calculate agent or driver commissions based on booking value, delivery fee, or performance tier, recording the result for payroll or accounts payable processing.",
  },
  {
    title: "Corporate account rate management",
    description:
      "Custom pricing scripts that look up negotiated rates from client contract records and apply zone-based, weight-based, or volume-based pricing automatically on invoice line creation, overriding standard item pricing.",
  },
  {
    title: "Booking system data import",
    description:
      "Scheduled scripts that pull reservation or delivery data from external dispatch or booking platforms via API and create the corresponding NetSuite customer, transaction, and revenue records without manual re-entry.",
  },
  {
    title: "Fleet expense allocation scripts",
    description:
      "Scripts that allocate fleet operating costs including fuel, maintenance, and insurance to vehicles or routes based on mileage or usage data, enabling cost-per-delivery and route profitability reporting.",
  },
  {
    title: "Branch P&L and route profitability dashboards",
    description:
      "Saved searches and KPI portlets showing revenue, cost, and margin by branch, route, or booking channel, giving regional managers and finance teams a real-time view of operational profitability.",
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
      "Ongoing knowledge of your courier or travel NetSuite account across every engagement. Each request builds on prior work without re-discovery.",
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
    capability: "Job billing",
    standard: "Manual invoice creation per job or delivery",
    withSP: "Automated job-based invoice scripts grouped by client and billing period",
  },
  {
    capability: "Commission tracking",
    standard: "Spreadsheet-based agent or driver commission calculations",
    withSP: "Automated commission scripts triggered on transaction completion",
  },
  {
    capability: "Corporate account pricing",
    standard: "Manual rate lookup and override per invoice",
    withSP: "Custom pricing scripts applying negotiated rates from client contract records",
  },
  {
    capability: "Booking system integration",
    standard: "Manual data re-entry from dispatch or reservation system",
    withSP: "Automated import scripts syncing booking and delivery data to NetSuite",
  },
  {
    capability: "Fleet cost reporting",
    standard: "Separate fleet tracking spreadsheets",
    withSP: "Vehicle and route cost allocation scripts with profitability saved searches",
  },
  {
    capability: "Branch reporting",
    standard: "Standard P&L with manual filtering",
    withSP: "Division-level P&L and route profitability dashboards via SuiteQL",
  },
];

const FAQ = [
  {
    question: "Does NetSuite work for courier and logistics companies?",
    answer:
      "Yes. NetSuite is used by courier, freight, and logistics companies for client billing, fleet expense tracking, multi-branch financial reporting, and corporate account management. Post-go-live customization is typically required for job-based invoice automation, volume pricing logic, dispatch system integration, and route profitability reporting that standard NetSuite does not produce without SuiteScript development.",
  },
  {
    question: "Does NetSuite work for travel agencies and travel companies?",
    answer:
      "Yes. Travel agencies use NetSuite for booking revenue tracking, agent commission management, multi-currency billing, and corporate client invoicing. Custom development adds booking system integration, agent commission calculation scripts, corporate account rate management, and booking profitability saved searches that the standard reporting tools do not produce natively.",
  },
  {
    question: "What is NetSuite used for in courier and delivery companies?",
    answer:
      "Courier companies use NetSuite for client invoicing, accounts receivable, multi-branch P&L, fleet expense allocation, and general ledger. Custom SuiteScript adds job-based billing automation that groups completed deliveries by client and billing period, applies zone or weight-based rates, and generates consolidated invoices without manual data entry.",
  },
  {
    question: "Can NetSuite automate courier billing?",
    answer:
      "Yes, via scheduled Map/Reduce scripts. SuitePacific builds billing automation that pulls completed delivery records from NetSuite or an integrated dispatch platform, groups them by client and billing cycle, applies the correct rate from the client contract record, and generates invoices ready for review. This replaces manual invoice creation for each delivery job or route.",
  },
  {
    question: "Can NetSuite integrate with dispatch or booking systems?",
    answer:
      "Yes, via RESTlet endpoints or scheduled import scripts. SuitePacific builds integrations that pull delivery or reservation data from dispatch platforms, fleet management systems, and travel reservation tools via API, creating the corresponding NetSuite transaction records automatically without manual re-entry.",
  },
  {
    question: "How does NetSuite handle agent commissions for travel companies?",
    answer:
      "Standard NetSuite does not calculate agent commissions natively for travel bookings. SuitePacific builds User Event scripts triggered on booking or transaction completion that calculate commissions based on booking value, booking type, or agent tier, recording the result on a commission or vendor bill record for payment processing.",
  },
  {
    question: "What does route profitability reporting look like in NetSuite?",
    answer:
      "Route profitability in NetSuite requires allocating fleet operating costs to individual routes or vehicles and comparing them against the revenue generated on those routes. SuitePacific builds the expense allocation scripts and SuiteQL-based saved searches that produce cost-per-delivery, revenue per route, and margin by route for operations and finance teams.",
  },
  {
    question: "Who provides NetSuite support for courier and travel companies?",
    answer:
      "SuitePacific provides NetSuite post-go-live support for courier, logistics, and travel companies, including job-based billing automation, commission calculation scripts, booking system integrations, fleet expense tracking, branch P&L reporting, and ongoing technical support on a month-to-month retainer starting at $799 per month.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Courier & Travel Companies | SuitePacific",
  description:
    "NetSuite post-go-live support for courier, logistics, and travel companies. Job billing automation, commission scripts, dispatch integration, and branch P&L reporting.",
  alternates: { canonical: "/industries/courier-travel" },
  openGraph: {
    title: "NetSuite Support for Courier & Travel Companies | SuitePacific",
    description:
      "NetSuite support for courier and travel businesses: job billing automation, agent commission scripts, booking system integration, and route profitability reporting.",
    url: `${SITE_URL}/industries/courier-travel`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function CourierTravelPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: "Courier & Travel", url: `${SITE_URL}/industries/courier-travel` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Support for Courier & Travel Companies"
        description="NetSuite post-go-live support for courier, logistics, and travel companies including job billing automation, commission scripts, and booking system integration."
        url={`${SITE_URL}/industries/courier-travel`}
        serviceType="NetSuite Courier and Travel Support"
        datePublished="2026-09-23T00:00:00+00:00"
        dateModified="2026-09-23T00:00:00+00:00"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: SuiteScript, workflow automation, saved searches, and administration for courier and travel accounts. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: active development including billing automation, commission scripts, and integration maintenance. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full courier or travel account coverage including billing, commissions, integrations, and operations reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Courier & Travel"
          title="NetSuite Support & Development for Courier & Travel Companies"
          subtitle="Technical support, billing automation, and operations integrations for courier, logistics, and travel businesses already live on NetSuite."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
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
            NetSuite support for courier and travel companies refers to post-go-live technical assistance covering the customizations that logistics and travel businesses require: job-based billing automation, agent and driver commission calculations, booking or dispatch system integration, fleet expense allocation, and multi-branch operations reporting. Courier companies on NetSuite typically need scheduled scripts that pull completed delivery records and generate consolidated client invoices, custom pricing logic applying zone or weight-based rates from corporate contracts, and route profitability saved searches. Travel companies need agent commission scripts and reservation platform integrations. SuitePacific provides this development and ongoing support for live courier and travel NetSuite accounts on a month-to-month retainer starting at $799 per month, with direct access to the developer on every request and no annual contract after the three-month minimum.
          </p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">
          Courier, logistics, and travel companies that go live on NetSuite commonly find that job-based billing,
          commission management, and dispatch or booking system integration require SuiteScript development that
          standard NetSuite invoicing tools do not handle. SuitePacific covers this technical layer for
          transportation and travel accounts already live on NetSuite: delivery billing automation, commission
          scripts, integration builds, fleet expense tracking, and branch operations reporting on a
          month-to-month basis.
        </p>

        {/* Comparison */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">
            How does SuitePacific extend NetSuite for courier and travel companies?
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
            What NetSuite challenges do courier and travel companies face?
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
            What NetSuite services does SuitePacific provide for courier and travel?
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
            What are common NetSuite customizations for courier and travel companies?
          </h2>
          <p className="text-sm text-brand-400 mb-6">
            These are the builds SuitePacific delivers for courier and travel accounts on a recurring basis.
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
            Why do courier and travel companies choose SuitePacific?
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
              <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
                NetSuite SuiteScript development
              </Link>{" "}
              covers how SuiteScript handles billing automation, data imports, and integration logic for live NetSuite accounts.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/wholesale-distribution" className="text-accent hover:underline">
                NetSuite for wholesale distribution
              </Link>{" "}
              covers inventory, order management, and supply chain automation for distribution and logistics operations.
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

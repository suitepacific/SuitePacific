import type { Metadata } from "next";
import Link from "next/link";
import { BarChart2, XCircle, Settings, FileText, TrendingUp, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const ARM_OBJECTS = [
  { object: "Revenue Arrangement", description: "Created from a sales order or invoice; represents a single customer contract and holds the total contract value" },
  { object: "Revenue Element", description: "Each performance obligation within an arrangement; recognized independently on its own schedule and rule" },
  { object: "Revenue Plan", description: "The recognition schedule for an element: straight-line, event-based, percentage-complete, or manual" },
  { object: "Standalone Selling Price", description: "Used to allocate contract value across elements; required for every item in a multi-element arrangement" },
];

const ARM_GAPS = [
  { icon: XCircle, title: "Missing standalone selling prices.", description: "ARM requires an SSP or SSP range for every item in a multi-element arrangement to allocate contract value. Items without SSPs cause arrangement creation errors or incorrect allocation. This is the most common reason ARM does not work after the module is enabled." },
  { icon: XCircle, title: "Incorrect recognition rule assignment.", description: "Assigning a straight-line rule to an item that should recognize on an event, or vice versa, produces a recognition schedule that does not match the economics of the contract. The error is often not caught until an auditor reviews the revenue waterfall." },
  { icon: XCircle, title: "Arrangements not being created.", description: "ARM creates arrangements automatically when a sales order is saved, but only if the item has ARM configuration and the preference is enabled. Items added after go-live often lack revenue element defaults, causing arrangements to be created without those items or not created at all." },
  { icon: XCircle, title: "Manual journal entries conflicting with ARM.", description: "When ARM is partially configured, finance teams post manual entries to correct wrong recognition. The manual entries conflict with ARM journal entries, causing double-recognition or recognition gaps that compound over multiple periods." },
];

const WHAT_WE_DO = [
  { icon: FileText, title: "Revenue policy mapping", description: "Document the company's actual ASC 606 or IFRS 15 revenue recognition policy before touching the system. ARM configured without understanding the accounting policy generates journal entries automatically but incorrectly." },
  { icon: Settings, title: "ARM configuration build", description: "Configure recognition rules, revenue element defaults on every item, standalone selling price records, allocation methods, and recognition event definitions. Validate each configuration element before enabling live arrangement creation." },
  { icon: TrendingUp, title: "Existing ARM cleanup", description: "Audit arrangements that were created under incorrect configuration. Identify which recognition schedules are wrong, what the correct entries should be, and post corrections in the right period to avoid permanent reconciling differences." },
  { icon: BarChart2, title: "Revenue waterfall validation", description: "After configuration is complete, validate the revenue waterfall (deferred revenue balance by arrangement, recognition by period) against the expected output from the accounting policy. Confirm with finance before enabling production posting." },
];

const RECOGNITION_RULES = [
  { rule: "Straight-line", how: "Spreads element value evenly across the recognition period", use: "SaaS subscriptions, support contracts, annual maintenance" },
  { rule: "Prorate by day", how: "Same as straight-line but calculated on exact days, not full months", use: "Subscriptions with mid-month start or end dates" },
  { rule: "Exact amount on date", how: "Recognizes full element value on a single date", use: "Perpetual license revenue recognized at delivery" },
  { rule: "Event-based", how: "Holds value in deferred revenue until a configured event fires", use: "Project milestones, customer acceptance, delivery confirmation" },
  { rule: "Percentage complete", how: "Recognizes proportionally as a completion percentage is updated", use: "Long-term professional services engagements" },
];

const FAQ = [
  { question: "Which NetSuite firm configures Advanced Revenue Management (ARM)?", answer: "SuitePacific configures NetSuite Advanced Revenue Management for companies that need ASC 606 or IFRS 15 compliant revenue recognition. The engagement covers recognition rule design, item-level revenue element default setup, standalone selling price configuration, allocation method selection, recognition event definitions, and validation of recognition journal entries against the company's accounting policy. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with finance and accounting teams. Plans start at $799 per month on month-to-month terms after a three-month minimum." },
  { question: "What does NetSuite ARM configure automatically, and what requires setup?", answer: "ARM creates revenue arrangements automatically from sales orders and invoices, generates revenue plans based on recognition rules, posts recognition journal entries on schedule, and handles multi-element allocation using standalone selling prices. What does not happen automatically: revenue recognition rules must be defined, items must have revenue element defaults assigned, standalone selling prices must be created for each item, and allocation methods must be selected. ARM will not create correct arrangements without this configuration in place first." },
  { question: "What are standalone selling prices in NetSuite ARM?", answer: "Standalone selling prices (SSPs) are the prices at which a company would sell each performance obligation separately. ARM uses SSPs to allocate contract value across elements when a contract contains multiple performance obligations. Every item that participates in a multi-element arrangement needs an SSP record, either as a fixed price or a range. Missing SSPs prevent arrangement creation or cause ARM to allocate incorrectly; incorrect SSPs produce an allocation that does not match the ASC 606 relative standalone selling price method." },
  { question: "Can ARM be configured on a live NetSuite account without disrupting existing revenue?", answer: "Yes, but it requires careful planning. ARM can be enabled and configured for new transactions while existing transactions remain on the old recognition method. The cutover date and the treatment of transactions that span the cutover require coordination with the company's auditors and finance team. SuitePacific manages the cutover planning as part of the configuration engagement." },
  { question: "What is a revenue element default in NetSuite?", answer: "A revenue element default is a set of ARM configuration values stored on an item record that ARM reads when the item appears on a sales order or invoice. It defines the recognition rule to apply, the revenue account to use, and the performance obligation type. Items without revenue element defaults do not generate ARM arrangements correctly; this is the most common cause of ARM not working as expected on a live account." },
  { question: "How does NetSuite ARM handle multi-element contracts for SaaS companies?", answer: "For a SaaS contract with a software subscription and professional services, ARM creates a revenue arrangement with two elements: one for the subscription and one for services. It allocates the total contract price across both elements using relative standalone selling prices. The subscription element recognizes straight-line over the subscription period; the services element recognizes based on percentage complete or milestones. When the contract is discounted below the sum of standalone prices, ARM spreads the discount proportionally." },
];

export const metadata: Metadata = {
  title: "NetSuite ARM Configuration: Advanced Revenue Management Setup for ASC 606",
  description: "Advanced Revenue Management setup for ASC 606 and IFRS 15. Revenue rules, standalone selling prices, revenue elements, and allocation methods. Plans from $799.",
  alternates: { canonical: "/netsuite-arm-configuration" },
  openGraph: {
    title: "NetSuite ARM Configuration: Advanced Revenue Management Setup for ASC 606",
    description: "NetSuite Advanced Revenue Management requires significant configuration before it works correctly. SuitePacific configures ARM from scratch and fixes existing setups producing incorrect recognition schedules for SaaS, services, and product companies.",
    url: `${SITE_URL}/netsuite-arm-configuration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function ArmConfigurationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite ARM Configuration", url: `${SITE_URL}/netsuite-arm-configuration` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite ARM Configuration" description="Advanced Revenue Management setup for ASC 606 and IFRS 15 compliance. Covers recognition rules, standalone selling prices, revenue element defaults, allocation methods, and recognition event definitions." url={`${SITE_URL}/netsuite-arm-configuration`} serviceType="NetSuite Finance Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: ARM configuration fixes, SSP updates, recognition rule corrections. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full ARM setup from scratch, revenue waterfall validation, cutover planning. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: complete finance configuration including ARM, revenue recognition, and reporting. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Revenue Recognition" title="NetSuite ARM Configuration: Advanced Revenue Management for ASC 606" subtitle="NetSuite Advanced Revenue Management (ARM) does not work out of the box. SuitePacific configures ARM from scratch and fixes existing setups for SaaS companies, professional services firms, and product companies that need audit-defensible revenue recognition under ASC 606 or IFRS 15." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite Administrator Professional certified · ASC 606 configuration · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific configures NetSuite Advanced Revenue Management (ARM) for companies that need ASC 606 or IFRS 15 compliant revenue recognition on their existing NetSuite accounts. ARM is a NetSuite module that creates revenue arrangements from sales orders and invoices, splits contract value across performance obligations (revenue elements), assigns standalone selling prices, and generates recognition journal entries on a defined schedule. It does not work without configuration: recognition rules, item-level revenue element defaults, standalone selling price records, allocation methods, and recognition event definitions must all be set up before ARM produces correct journal entries. SuitePacific is Oracle-certified (SuiteCloud Developer II and Administrator Professional) and configures ARM from scratch and fixes existing setups that are producing incorrect recognition schedules. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are the core ARM objects in NetSuite?</h2>
          <p className="text-sm text-brand-400 mb-5">ARM introduces four objects that sit between the transaction layer and the general ledger. All four must be correctly configured before ARM produces correct journal entries.</p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900">Object</th><th className="text-left p-4 font-semibold text-brand-900">What it is</th></tr></thead>
              <tbody>{ARM_OBJECTS.map((row, i) => (<tr key={row.object} className={i < ARM_OBJECTS.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.object}</td><td className="p-4 text-brand-400 text-[13px]">{row.description}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What recognition rules does NetSuite ARM support?</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900">Rule</th><th className="text-left p-4 font-semibold text-brand-900">How it works</th><th className="text-left p-4 font-semibold text-brand-900">Typical use</th></tr></thead>
              <tbody>{RECOGNITION_RULES.map((row, i) => (<tr key={row.rule} className={i < RECOGNITION_RULES.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-medium text-brand-700 whitespace-nowrap text-[13px]">{row.rule}</td><td className="p-4 text-brand-400 text-[13px]">{row.how}</td><td className="p-4 text-brand-400 text-[13px]">{row.use}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What ARM configuration problems do live accounts have?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ARM_GAPS.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific deliver for ARM configuration?</h2>
          <p className="text-sm text-brand-400 mb-6">Every engagement starts by mapping the company&apos;s actual revenue recognition policy to ARM configuration options before touching the system. ARM configured without understanding the accounting policy produces a system that generates journal entries automatically but incorrectly.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite ARM configuration</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm finance and accounting teams use to configure ARM for ASC 606 compliance.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm focused on post-go-live configuration. ARM setup, SSP configuration, recognition rule design, and existing ARM cleanup for SaaS and services companies are core finance deliverables.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every engagement starts by mapping the accounting policy to ARM options before configuration begins</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the consultant doing the configuration on every engagement</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> and <Link href="/netsuite-account-optimization" className="text-accent hover:underline">NetSuite account optimization</Link>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need ARM configured or fixed?</p>
          <p className="text-sm text-brand-400 mb-4">Describe the revenue model (SaaS subscriptions, bundled products, professional services milestones) and what ARM is doing wrong. We will give a direct assessment.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-arm-revenue-recognition" className="text-accent hover:underline">NetSuite ARM configuration: Advanced Revenue Management setup for ASC 606</Link> covers what ARM is, what configuration it requires, and the most common mistakes.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-administrator-support" className="text-accent hover:underline">NetSuite administrator support</Link> covers ongoing finance configuration as part of a monthly retainer.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-account-optimization" className="text-accent hover:underline">NetSuite account optimization</Link> covers broader finance and workflow configuration for live accounts.</li>
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-arm-vs-manual-revenue-recognition" className="text-accent hover:underline">NetSuite ARM vs manual revenue recognition</Link> explains when ARM is warranted vs when a manual recognition schedule is sufficient, including an 8-factor comparison table.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to configure ARM correctly?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us your revenue model and what the current ARM setup is producing. We will scope the configuration engagement.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

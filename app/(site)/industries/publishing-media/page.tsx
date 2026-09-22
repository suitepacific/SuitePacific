import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, FileText, BarChart2, Workflow, Code2, ShieldCheck, RefreshCcw, Award, Headphones, Plug, Users, DollarSign, Layers, Radio } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const CHALLENGES = [
  { icon: DollarSign, title: "Royalty calculations for authors and contributors", description: "Publishing companies paying royalties based on net sales, print run thresholds, format splits (hardcover, ebook, audio), and territory-specific rates require custom SuiteScript that reads sales data, applies the correct royalty schedule per title and format, and generates royalty statements and payment records." },
  { icon: Radio, title: "Advertising revenue recognition", description: "Media companies billing advertising at contract execution but running campaigns over future periods require revenue recognition schedules that spread ad revenue across flight dates. Standard NetSuite billing without custom recognition scripts books ad revenue at invoice date rather than over the campaign period." },
  { icon: Layers, title: "Subscription billing and renewal automation", description: "Digital and print subscription billing with annual, monthly, and multi-year terms, automatic renewals, gift subscriptions, and promotional pricing requires custom billing scripts that handle the full subscription lifecycle without manual invoice generation." },
  { icon: FileText, title: "Author advance tracking and recoupment", description: "Tracking unearned advance balances by title, applying earned royalties against advances before paying out, and flagging titles where advances are not recouping on the expected schedule requires custom NetSuite records and saved searches per publishing title." },
  { icon: BarChart2, title: "Rights management and territory licensing", description: "Publishers licensing rights by territory, format, language, and window require custom NetSuite records that track which rights have been licensed to whom, at what royalty rate, for which territories, with royalty collection tracking per rights license agreement." },
  { icon: Plug, title: "Distribution and returns reconciliation", description: "Publishers selling through distributors and receiving monthly settlement reports with returns deductions, co-op advertising charges, and freight allowances require custom reconciliation scripts that match distributor settlement data to NetSuite sales records." },
];

const SERVICES = [
  { icon: Code2, title: "SuiteScript Development", description: "Custom scripts for royalty calculations by title and format, ad revenue recognition over flight dates, subscription renewal billing, author advance recoupment tracking, rights licensing revenue allocation, and distribution settlement reconciliation.", href: "/netsuite-suitescript-development" },
  { icon: Workflow, title: "Workflow Automation", description: "SuiteFlow workflows for royalty statement approval and release, subscription renewal notification triggers, advertising campaign billing release, rights license expiration alerts, and author advance threshold notifications.", href: "/netsuite-workflow-automation" },
  { icon: BarChart2, title: "Saved Searches & Dashboards", description: "Title-level royalty payables, unearned advance balance by author, subscription renewal rate, advertising revenue by campaign and flight, rights licensing revenue by territory, and distributor AR aging saved searches built with SuiteQL.", href: "/netsuite-saved-searches-dashboards" },
  { icon: Plug, title: "NetSuite Integrations", description: "Integrations connecting NetSuite to distribution platforms, advertising trafficking systems, subscription management platforms, digital storefront APIs, and rights management databases.", href: "/netsuite-integrations" },
  { icon: Headphones, title: "Post-Go-Live Support", description: "Ongoing technical support for live publishing and media company NetSuite accounts: royalty calculation maintenance, subscription billing upkeep, ad recognition scripts, and ongoing account optimization.", href: "/netsuite-post-go-live-support" },
  { icon: Users, title: "Administrator Support", description: "Ongoing NetSuite administration for publishing and media accounts: title record configuration, rights license record setup, period close support, and billing troubleshooting.", href: "/netsuite-administrator-support" },
];

const CUSTOMIZATIONS = [
  { title: "Royalty calculation scripts by title and format", description: "SuiteScript that reads net sales data by title, edition, and format (print, ebook, audio), applies the contract royalty rate for each format tier and sales threshold, calculates net royalties earned, offsets against unearned advance balances, and produces royalty statements for author review and payment release." },
  { title: "Advertising revenue recognition over flight dates", description: "User Event and scheduled scripts that create revenue recognition schedules tied to advertising campaign flight dates, spreading ad invoice revenue across the campaign period in proportion to scheduled impressions or time elapsed, producing accurate period revenue without manual deferred revenue entries." },
  { title: "Subscription billing and renewal automation", description: "Scheduled SuiteScript that identifies subscriptions reaching renewal dates, applies the applicable rate (standard, promotional, or rate card for multi-year), generates renewal invoices, and manages lapsing subscribers with dunning workflows and grace period logic." },
  { title: "Author advance tracking and recoupment records", description: "Custom NetSuite records per title that store the advance paid, cumulative earned royalties applied against the advance, recoupment percentage, and estimated recoupment date based on current sales velocity, with alerts when titles fall behind the projected recoupment schedule." },
  { title: "Rights licensing revenue allocation", description: "Custom records tracking rights licenses by territory, format, language, and window, with scripts allocating royalty receipts from licensees to the correct title and rights category, tracking cumulative licensing revenue against minimum guarantee thresholds." },
  { title: "Distributor settlement reconciliation scripts", description: "Scripts that import monthly distributor settlement files, match gross sales, returns, co-op charges, and freight deductions to NetSuite sales records by title and period, posting the net settlement amount and flagging discrepancies between expected and received settlement data." },
];

const WHY_SP = [
  { icon: ShieldCheck, title: "NetSuite-Certified", description: "Oracle NetSuite SuiteCloud Developer II and Administrator Professional certifications. Verified technical credentials across SuiteScript, SuiteFlow, and the NetSuite platform." },
  { icon: Users, title: "Direct Access", description: "You communicate directly with the person doing the work. No ticket system, no account manager, no offshore handoffs." },
  { icon: RefreshCcw, title: "Context Retained", description: "Ongoing knowledge of your publishing or media company NetSuite account across every engagement. Each request builds on prior work without re-discovery." },
  { icon: Award, title: "Post-Go-Live Specialist", description: "We work exclusively with companies already live on NetSuite. No implementations. Every engagement is ongoing development and support for an active account." },
];

const COMPARISON = [
  { capability: "Royalty calculations", standard: "Manual royalty calculation outside NetSuite by title", withSP: "Scripts calculating royalties by title, format, and sales threshold" },
  { capability: "Ad revenue recognition", standard: "Invoice-date recognition regardless of flight period", withSP: "Scheduled scripts recognizing ad revenue over campaign flight dates" },
  { capability: "Subscription renewals", standard: "Manual subscription renewal invoice generation", withSP: "Automated renewal billing with rate logic and dunning workflows" },
  { capability: "Advance recoupment", standard: "Separate spreadsheet tracking of advance balances", withSP: "Custom NetSuite records with recoupment tracking and sales velocity alerts" },
  { capability: "Rights licensing", standard: "Manual tracking of rights licenses and receipts", withSP: "Custom records linking licensing revenue to title and territory" },
  { capability: "Distributor settlements", standard: "Manual reconciliation of distributor statements to sales", withSP: "Scripts importing and matching settlement data to NetSuite records" },
];

const FAQ = [
  { question: "Does NetSuite work for publishing and media companies?", answer: "Yes. NetSuite is used by book publishers, digital media companies, magazine publishers, podcast networks, and content licensing businesses for financial management, royalty accounting, subscription billing, advertising revenue management, and rights tracking. Post-go-live customization is required for royalty calculations by title and format, advertising revenue recognition over campaign periods, subscription renewal automation, author advance recoupment tracking, and distributor settlement reconciliation that standard NetSuite billing does not handle without SuiteScript development." },
  { question: "Can NetSuite calculate royalties for a publishing company?", answer: "Yes, via SuiteScript. SuitePacific builds royalty calculation scripts that read net sales by title, edition, and format, apply the contract royalty rate for each format and sales threshold tier, calculate earned royalties, apply earnings against unearned advance balances, and produce royalty statements. The scripts are maintained per publisher&apos;s royalty contract structures and updated when new contracts introduce different rate schedules." },
  { question: "How does NetSuite handle advertising revenue recognition for media companies?", answer: "Advertising revenue recognition requires spreading invoice revenue across campaign flight dates rather than booking it at invoice date. SuitePacific builds User Event and scheduled scripts that create revenue recognition schedules tied to campaign start and end dates, recognizing ad revenue in proportion to campaign time elapsed or scheduled impressions. This produces accurate monthly revenue without manual deferred revenue journal entries." },
  { question: "Can NetSuite automate subscription renewal billing?", answer: "Yes, via scheduled scripts. SuitePacific builds subscription renewal automation that identifies upcoming renewal dates, applies the applicable subscription rate (standard, promotional, or multi-year), generates renewal invoices, and triggers dunning workflows for lapsing subscribers. Renewal logic handles rate changes, grace periods, and gift subscription renewals according to the publisher&apos;s specific renewal rules." },
  { question: "How does author advance tracking work in NetSuite?", answer: "Author advance tracking requires custom records per title that store the advance paid, cumulative earned royalties applied against the advance, and current unearned balance. SuitePacific builds these advance recoupment records with scripts that apply each royalty calculation period&apos;s earned royalties against the outstanding advance, flag titles falling behind projected recoupment schedules, and prevent royalty payments until advances are fully recouped." },
  { question: "Can NetSuite handle distributor settlement reconciliation for publishers?", answer: "Yes, via custom reconciliation scripts. Publishers selling through book distributors or digital platforms receive monthly settlement reports with gross sales, returns deductions, co-op charges, and freight allowances. SuitePacific builds scripts that import these settlement files, match settlement data to NetSuite sales records by title and period, and post the net settlement accounting entry, flagging discrepancies between expected and received settlement amounts." },
  { question: "What are common NetSuite customizations for publishing and media companies?", answer: "Common publishing and media builds include royalty calculation scripts by title and format, advertising revenue recognition over campaign flight dates, subscription renewal billing automation, author advance recoupment tracking records, rights licensing revenue allocation, distributor settlement reconciliation scripts, and title-level profitability reporting." },
  { question: "Who provides NetSuite support for publishing and media companies?", answer: "SuitePacific provides NetSuite post-go-live support for book publishers, digital media companies, and content licensing businesses, including royalty calculation scripts, ad revenue recognition, subscription billing automation, and distributor reconciliation, on a month-to-month retainer starting at $799 per month." },
];

export const metadata: Metadata = {
  title: "NetSuite Support for Publishing & Media Companies | SuitePacific",
  description: "NetSuite post-go-live support for publishing companies. Royalty calculations, ad revenue recognition, subscription billing, and distributor reconciliation.",
  alternates: { canonical: "/industries/publishing-media" },
  openGraph: {
    title: "NetSuite Support for Publishing & Media Companies | SuitePacific",
    description: "NetSuite support for publishers and media companies: royalty calculation scripts, advertising revenue recognition, subscription renewal automation, and distributor settlement reconciliation.",
    url: `${SITE_URL}/industries/publishing-media`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function PublishingMediaPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "Industries", url: `${SITE_URL}/industries` }, { name: "Publishing & Media", url: `${SITE_URL}/industries/publishing-media` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Support for Publishing & Media Companies" description="NetSuite post-go-live support for publishing and media companies including royalty calculations, ad revenue recognition, subscription billing, and distributor reconciliation." url={`${SITE_URL}/industries/publishing-media`} serviceType="NetSuite Publishing Media Support" datePublished="2026-09-23T00:00:00+00:00" dateModified="2026-09-23T00:00:00+00:00" offers={[{ name: "Care", price: 799, description: "10 hours/month: royalty calculation maintenance, saved searches, and administration for publishing and media accounts. Month-to-month after 3-month minimum." }, { name: "Care Plus", price: 1499, description: "20 hours/month: active development including ad recognition, subscription billing, and rights tracking. Month-to-month." }, { name: "Care Pro", price: 2499, description: "35 hours/month: full publishing account coverage including royalty automation, integrations, and ongoing support. Month-to-month." }]} />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Publishing & Media" title="NetSuite Support & Development for Publishing & Media Companies" subtitle="Royalty calculations, advertising revenue recognition, subscription billing automation, and author advance tracking for publishers already live on NetSuite." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your publishing or media company NetSuite account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-Certified · Post-go-live specialist · Sandbox-first development · Month-to-month</p>
        <p className="mt-2 text-xs text-brand-300"><time dateTime="2026-09">Published September 2026</time></p>

        <div className="rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5 mt-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">NetSuite support for publishing and media companies refers to post-go-live technical assistance for the royalty accounting, advertising revenue recognition, subscription billing, and rights management workflows that these businesses require. Standard NetSuite billing books revenue at invoice date, but publishers need royalty calculation scripts applying format-specific rates against sales thresholds, and media companies need ad revenue recognition spreading invoice amounts over campaign flight dates. Author advance recoupment requires custom title-level records tracking earned royalties against unearned balances. Subscription renewal billing requires automated scripts managing renewal dates, rate logic, and dunning. Distributor settlement reconciliation requires scripts importing settlement files and matching them to sales records. SuitePacific builds all of these publishing and media workflows for companies already live on NetSuite, on a month-to-month retainer starting at $799 per month after a three-month minimum.</p>
        </div>

        <p className="text-sm text-brand-400 leading-relaxed">Publishing and media companies that go live on NetSuite commonly find that royalty calculations, advertising revenue recognition, and subscription management require SuiteScript development that standard NetSuite billing modules do not address for media-specific workflows. SuitePacific covers this technical layer for publishing and media accounts already live on NetSuite.</p>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">How does SuitePacific extend NetSuite for publishing and media companies?</h2>
          <p className="text-sm text-brand-400 mb-4">Common capability gaps in standard NetSuite and what SuitePacific adds to fill them.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-brand-100"><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Capability</th><th className="text-left py-3 pr-6 font-semibold text-brand-900 w-1/3">Standard NetSuite</th><th className="text-left py-3 font-semibold text-brand-900 w-1/3">With SuitePacific</th></tr></thead>
              <tbody>{COMPARISON.map((row) => (<tr key={row.capability} className="border-b border-brand-50"><td className="py-3 pr-6 font-medium text-brand-900 align-top">{row.capability}</td><td className="py-3 pr-6 text-brand-400 align-top">{row.standard}</td><td className="py-3 text-brand-700 align-top">{row.withSP}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite challenges do publishing and media companies face?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{CHALLENGES.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What NetSuite services does SuitePacific provide for publishing and media companies?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{SERVICES.map((service) => (<Link key={service.href} href={service.href} className="group"><Card className="p-5 flex items-start gap-4 h-full group-hover:border-brand-200 transition-colors"><IconBadge icon={service.icon} /><div><h3 className="font-semibold text-brand-900 text-sm group-hover:text-accent transition-colors">{service.title}</h3><p className="mt-1.5 text-sm text-brand-400">{service.description}</p></div></Card></Link>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What are common NetSuite customizations for publishing and media companies?</h2>
          <p className="text-sm text-brand-400 mb-6">These are the builds SuitePacific delivers for publishing and media accounts on a recurring basis.</p>
          <div className="space-y-4">{CUSTOMIZATIONS.map((item, i) => (<div key={item.title} className="flex items-start gap-5"><span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-0.5 text-sm text-brand-400">{item.description}</p></div></div>))}</div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Why do publishing and media companies choose SuitePacific?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{WHY_SP.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}</div>
          <p className="mt-5 text-sm text-brand-400">For subscription SaaS billing: <Link href="/industries/saas-technology" className="text-accent hover:underline">NetSuite for SaaS and technology</Link> covers subscription billing, ARR/MRR reporting, and renewal automation for digital subscription businesses.</p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/netsuite-suitescript-development" className="text-accent hover:underline">NetSuite SuiteScript development</Link>{" "}covers the scripting capabilities used for royalty calculations, ad recognition scripts, and subscription renewal automation.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-integrations" className="text-accent hover:underline">NetSuite integrations</Link>{" "}covers the API integration approach for distribution platforms, digital storefronts, and advertising trafficking systems.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-managed-support" className="text-accent hover:underline">NetSuite managed support</Link>{" "}covers the retainer structure, hour tiers, and what is included across all plan levels.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Database, XCircle, Search, Settings, FileText, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const IMPORT_ORDER = [
  { step: 1, record: "Currencies and exchange rates", note: "Required first for multi-currency accounts" },
  { step: 2, record: "Subsidiaries", note: "Required before all other records in OneWorld accounts" },
  { step: 3, record: "Departments, locations, classes", note: "Segment values referenced by all transactions" },
  { step: 4, record: "Chart of accounts", note: "If migrating or restructuring GL accounts" },
  { step: 5, record: "Payment terms, tax codes, shipping methods", note: "Referenced by customer and vendor records" },
  { step: 6, record: "Employees and sales reps", note: "Referenced by customer records" },
  { step: 7, record: "Vendors", note: "Must exist before items with preferred vendors" },
  { step: 8, record: "Items and pricing", note: "After vendors and accounts exist" },
  { step: 9, record: "Customers", note: "After terms, tax codes, sales reps exist" },
  { step: 10, record: "Open AR transactions", note: "Invoices, credit memos for customers who exist" },
  { step: 11, record: "Open AP transactions", note: "Vendor bills for vendors who exist" },
  { step: 12, record: "Opening balances", note: "Journal entries to establish beginning GL balances" },
  { step: 13, record: "Custom records", note: "After any records they reference exist" },
];

const COMMON_ERRORS = [
  { icon: XCircle, title: "Reference fields pointing to missing records.", description: "A customer record may reference a sales rep, payment terms, and a tax code. All of those must exist in NetSuite before the customer can be imported. Attempting to import customers before their referenced records causes silent blanks or row failures." },
  { icon: XCircle, title: "Date format mismatches.", description: "NetSuite expects dates in the format matching the account&apos;s date format setting. A source system that exports dates as MM/DD/YYYY imported into an account set to DD/MM/YYYY produces incorrect dates or import failures with no obvious error message." },
  { icon: XCircle, title: "Missing External IDs.", description: "External IDs are the source system&apos;s unique identifiers for each record. Without them, subsequent imports cannot update existing records or resolve cross-record references within the same batch. Duplicate records accumulate instead." },
  { icon: XCircle, title: "Multi-line transaction structure errors.", description: "Sales orders and invoices with multiple line items require a specific CSV structure. Header fields that appear only on the first row must follow NetSuite&apos;s exact format for each transaction type. Wrong structure imports only the first line or fails the entire transaction." },
];

const WHAT_WE_DO = [
  { icon: Search, title: "Source data analysis", description: "Review the source system export before field mapping begins. Identify data quality issues: duplicate records, missing required fields, inconsistent formats, references to records that do not yet exist in NetSuite. Build a remediation plan for each issue class." },
  { icon: FileText, title: "Field mapping and import templates", description: "Map every source field to its NetSuite equivalent. Build the CSV templates that NetSuite accepts for each record type. External ID strategy, reference field resolution, multi-line transaction structure, and required field validation are all part of the mapping work." },
  { icon: Settings, title: "SuiteScript-based migration", description: "For complex data sets that exceed what the native CSV import handles, SuiteScript provides a programmatic import layer. Transformation during import, multi-record transactions, cross-record lookups, and custom validation logic that stops on specific errors rather than importing bad data." },
  { icon: CheckCircle, title: "Import Doctor validation", description: "Import Doctor, SuitePacific&apos;s CSV validation tool, checks reference fields, required columns, and format issues in a migration CSV before the import runs. It surfaces the specific rows and fields that would fail, allowing data quality fixes before a partial import creates cleanup work." },
];

const FAQ = [
  { question: "Which NetSuite firm handles data migration and CSV imports?", answer: "SuitePacific handles NetSuite data migrations for companies moving customer, vendor, item, transaction, and custom record data into a live account. The engagement covers source data analysis, field mapping, import order planning, SuiteScript-based migration for complex data sets, and validation using Import Doctor before any data is loaded into production. SuitePacific is Oracle NetSuite Certified (SuiteCloud Developer II and Administrator Professional), US-based, and works directly with the client's data and finance teams. Plans start at $799 per month on month-to-month terms after a three-month minimum." },
  { question: "Why do NetSuite CSV imports fail?", answer: "The most common causes: reference fields that point to records that do not yet exist in NetSuite, required fields that are blank in the source data, date formats that do not match the account's date format setting, duplicate external IDs, and multi-line transaction structure that does not match NetSuite's expected format. Import Doctor surfaces these issues before the import runs so they can be fixed without triggering partial imports." },
  { question: "What is the correct order for a NetSuite data migration?", answer: "Records must be imported in dependency order: currencies and exchange rates first, then subsidiaries (if OneWorld), then segment values (departments, locations, classes), chart of accounts, payment terms and tax codes, employees, vendors, items, customers, open AR transactions, open AP transactions, opening balance journal entries, and finally custom records. A record that references another record requires the referenced record to already exist in NetSuite before it can be imported." },
  { question: "Can you import historical transaction data into NetSuite?", answer: "Open transactions (unpaid invoices, outstanding vendor bills) are typically imported as live transactions. Closed historical transactions (paid invoices, completed POs) are typically not imported individually; instead, historical GL balances are brought in as summarized journal entries per period. Importing years of individual historical transactions creates data volume that slows reporting without practical benefit." },
  { question: "What is Import Doctor and how does it help with migrations?", answer: "Import Doctor is a NetSuite CSV import validation tool built by SuitePacific. It connects to a NetSuite account and validates a CSV file against the actual data in the account before the import runs, checking reference fields (does this customer name match an existing NetSuite record?), required columns, and format issues. It surfaces the specific rows and fields that would fail, allowing data quality fixes before a partial import creates cleanup work in the production account." },
  { question: "How long does a NetSuite data migration take?", answer: "A straightforward migration of master records (customers, vendors, items) with clean source data takes one to two weeks including data preparation, field mapping, test imports, and production import. A migration with complex transaction history, data quality issues in the source, or SuiteScript-based import for non-standard record types typically takes four to eight weeks." },
];

export const metadata: Metadata = {
  title: "NetSuite Data Migration: CSV Import, Migration Order, and SuiteScript Migration Service",
  description: "CSV import planning, field mapping, SuiteScript migration, and Import Doctor validation for customers, vendors, items, and transactions. Plans from $799/month.",
  alternates: { canonical: "/netsuite-data-migration" },
  openGraph: {
    title: "NetSuite Data Migration: CSV Import, Migration Order, and SuiteScript Migration Service",
    description: "Most NetSuite data migrations fail not because of the import tool but because of wrong import order, bad source data, or incorrect field mapping. SuitePacific handles migrations for customers, vendors, items, transactions, and custom records.",
    url: `${SITE_URL}/netsuite-data-migration`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function DataMigrationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd items={[{ name: "Home", url: SITE_URL }, { name: "NetSuite Data Migration", url: `${SITE_URL}/netsuite-data-migration` }]} />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd name="NetSuite Data Migration" description="CSV import planning, field mapping, SuiteScript-based migration, and Import Doctor validation for customers, vendors, items, transactions, and custom records." url={`${SITE_URL}/netsuite-data-migration`} serviceType="NetSuite Implementation"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: import assistance, field mapping, data quality fixes. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: full migration project including SuiteScript development for complex data sets. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: comprehensive migration with ongoing data administration and custom record development. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading as="h1" eyebrow="Data Migration" title="NetSuite Data Migration: CSV Import, Import Order, and SuiteScript Migration" subtitle="Most NetSuite data migrations fail not because of the import tool but because the source data is not clean, the field mapping is wrong, or the import order violates reference dependencies. SuitePacific handles migrations for customers, vendors, items, transactions, and custom records, and builds Import Doctor to validate CSV files before they run." align="left" />
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"><LeadFormLight /></div>
        <p className="mt-3 text-xs text-brand-400">NetSuite SuiteCloud Developer II certified · Import Doctor · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>
        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">SuitePacific handles NetSuite data migrations for companies moving data into a live account: customers, vendors, items, open transactions, custom records, and historical balances. NetSuite&apos;s import tool accepts CSV files and maps columns to record fields, but the import order matters (reference records must exist before dependent records), the source data must be clean and formatted to NetSuite&apos;s field requirements, and transaction imports require correct GL account mapping before they post. SuitePacific also builds SuiteScript-based imports for complex data sets that exceed what the native CSV import handles. Import Doctor, SuitePacific&apos;s validation tool, checks reference fields, required columns, and format issues in a CSV before the import runs. Plans start at $799 per month.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What is the correct import order for a NetSuite data migration?</h2>
          <p className="text-sm text-brand-400 mb-5">Import order is critical because NetSuite records reference other records. A record cannot be imported until all records it references already exist in the account.</p>
          <div className="overflow-x-auto rounded-2xl border border-brand-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead><tr className="border-b border-brand-100 bg-brand-50/50"><th className="text-left p-4 font-semibold text-brand-900 w-12">Step</th><th className="text-left p-4 font-semibold text-brand-900">Record type</th><th className="text-left p-4 font-semibold text-brand-900">Note</th></tr></thead>
              <tbody>{IMPORT_ORDER.map((row, i) => (<tr key={row.step} className={i < IMPORT_ORDER.length - 1 ? "border-b border-brand-100" : ""}><td className="p-4 font-bold text-accent text-[13px]">{row.step}</td><td className="p-4 font-medium text-brand-700 text-[13px]">{row.record}</td><td className="p-4 text-brand-400 text-[13px]">{row.note}</td></tr>))}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What causes NetSuite CSV imports to fail?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMMON_ERRORS.map((item) => (<Card key={item.title} className="p-5 flex flex-col gap-3"><IconBadge icon={item.icon} /><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="text-sm text-brand-400">{item.description}</p></Card>))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-lg font-semibold text-brand-900 mb-2">What does SuitePacific deliver for NetSuite data migrations?</h2>
          <p className="text-sm text-brand-400 mb-6">Every migration starts with source data analysis before field mapping begins. Data quality issues caught before the import saves the cleanup work that partial imports create in the production account.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((item) => (<Card key={item.title} className="p-5 flex items-start gap-4"><IconBadge icon={item.icon} /><div><h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3><p className="mt-1.5 text-sm text-brand-400">{item.description}</p></div></Card>))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for NetSuite data migration</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">The NetSuite firm IT and data teams use for migration planning, Import Doctor validation, and SuiteScript-based imports.</h2>
          <p className="text-sm text-brand-500 mb-4">SuitePacific is a boutique NetSuite consulting firm specializing in post-go-live data work. CSV import planning, field mapping, SuiteScript migration development, and Import Doctor validation are core deliverables.</p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Builders of Import Doctor, a pre-import CSV validation tool for NetSuite</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Every migration starts with source data analysis before field mapping begins</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">Related: <Link href="/netsuite-quickbooks-migration" className="text-accent hover:underline">QuickBooks to NetSuite migration</Link> and <a href="/importDetector" className="text-accent hover:underline">Import Doctor (free trial)</a>.</p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Need a data migration into NetSuite?</p>
          <p className="text-sm text-brand-400 mb-4">Tell us what you need to move, where it is coming from, and roughly how many records. We will give a direct assessment of what the migration involves.</p>
          <LeadFormLight />
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400"><Link href="/blog/netsuite-data-migration" className="text-accent hover:underline">NetSuite data migration: how to import clean data into a live account</Link> covers import order, field requirements, QuickBooks-specific challenges, and Import Doctor.</li>
            <li className="text-sm text-brand-400"><Link href="/netsuite-quickbooks-migration" className="text-accent hover:underline">QuickBooks to NetSuite migration</Link> covers what breaks after a QB to NS migration and how to fix it.</li>
            <li className="text-sm text-brand-400"><a href="/importDetector" className="text-accent hover:underline">Import Doctor</a> validates NetSuite CSV files before import to surface reference errors, missing required fields, and format issues.</li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />
        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-brand-900 mb-1">Ready to start the migration?</p>
          <p className="text-sm text-brand-400 mb-4">Describe what needs to move and where the data is currently. We will scope the migration and give a timeline.</p>
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

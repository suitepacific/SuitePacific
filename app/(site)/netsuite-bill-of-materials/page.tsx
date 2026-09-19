import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers, AlertCircle, GitBranch, BarChart2,
  RefreshCcw, Wrench, ShieldCheck, FileText,
  Users, Award,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { LeadFormLight } from "@/components/sections/LeadFormLight";
import { SITE_URL } from "@/lib/content";

const PAIN_POINTS = [
  {
    icon: Layers,
    title: "Multi-level assemblies are hard to model.",
    description:
      "Standard NetSuite BOMs are often flat or two-level. Complex assemblies with sub-assemblies require careful item record structure that most implementations never set up correctly from the start.",
  },
  {
    icon: AlertCircle,
    title: "Component substitutions are not tracked natively.",
    description:
      "When a component is swapped for an approved alternate, there is no standard mechanism to record that substitution in NetSuite. The BOM says one thing; production used another.",
  },
  {
    icon: RefreshCcw,
    title: "Revision history is invisible.",
    description:
      "NetSuite does not provide native BOM revision tracking. Engineering change orders that modify a BOM leave no auditable record of what changed, when, and who approved it.",
  },
];

const SERVICES = [
  {
    icon: Layers,
    title: "BOM Structure Setup and Validation",
    description: "Review and correct item record configurations for assembly items, member items, and sub-assemblies so the BOM hierarchy accurately reflects your production structure.",
  },
  {
    icon: GitBranch,
    title: "Multi-Level Assembly Configuration",
    description: "Set up parent and child assembly item records with the correct costing methods and component quantity relationships for multi-level builds.",
  },
  {
    icon: Wrench,
    title: "Component Substitution Tracking",
    description: "Custom fields and saved searches that record approved alternates for each BOM component and flag when a substitution was used on an assembly build.",
  },
  {
    icon: RefreshCcw,
    title: "BOM Revision Control Workflow",
    description: "SuiteFlow-based revision control that captures the before and after state of BOM changes, ties each change to an approval, and maintains an auditable revision log.",
  },
  {
    icon: BarChart2,
    title: "Standard vs. Actual Cost Variance Reporting",
    description: "Saved searches and reports that surface cost variances between the standard BOM cost and actual assembly build costs so production management can act on discrepancies.",
  },
  {
    icon: GitBranch,
    title: "Assembly Build Automation Scripts",
    description: "SuiteScript automation for assembly build creation and component issue processes that go beyond what standard NetSuite work order and assembly workflows support natively.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Current BOM structure is reviewed first",
    description:
      "Before making any changes, we map your existing assembly item records and identify gaps: missing component quantities, incorrect costing methods, and sub-assemblies that are not properly linked.",
  },
  {
    step: "02",
    title: "Configuration changes are made in Sandbox",
    description:
      "Item record changes, custom fields, and workflow builds are tested in Sandbox before touching Production. Assembly builds are tested end-to-end to verify the BOM explosion and costing behavior.",
  },
  {
    step: "03",
    title: "Reporting is built alongside the configuration",
    description:
      "Saved searches and custom reports are built at the same time as the configuration work so you have visibility into cost variances and component usage from the moment changes go live.",
  },
];

const FAQ = [
  {
    question: "Which NetSuite firm does bill of materials configuration and SuiteScript automation for manufacturers?",
    answer: "SuitePacific specializes in NetSuite BOM configuration and SuiteScript automation for manufacturers. Services include multi-level assembly item setup, component substitution tracking, BOM revision control workflows, and standard versus actual cost variance reporting.",
  },
  {
    question: "Does NetSuite support multi-level bills of materials?",
    answer: "Yes, but it requires deliberate item record setup. Each level of your assembly must be configured as a separate assembly item with correct member quantities and costing. Flat item structures, which are common in rushed implementations, do not support multi-level BOM explosion for MRP or production planning.",
  },
  {
    question: "How does NetSuite handle BOM revision history?",
    answer: "It doesn&apos;t natively. NetSuite does not maintain an audit log of BOM changes out of the box. Revision history requires a custom approach: either custom fields that capture a snapshot of the BOM at a point in time, or a SuiteFlow workflow that logs changes when a BOM is modified.",
  },
  {
    question: "Can NetSuite track component substitutions on an assembly build?",
    answer: "Not natively. Standard NetSuite does not record when a production team swaps a BOM component for an approved alternate. This requires custom fields on the assembly item record and, ideally, a mechanism on the assembly build transaction to log which substitute was used.",
  },
  {
    question: "What causes cost variances on assembly builds in NetSuite?",
    answer: "Standard cost on the assembly item is set at the BOM level. Actual cost is determined at build time based on component lot costs, labor, and overhead if configured. Variances arise when component costs change, substitutions are used, or the BOM quantity differs from what was actually consumed. NetSuite does not surface these variances automatically; saved searches are needed.",
  },
  {
    question: "How long does a BOM configuration engagement typically take?",
    answer: "It depends on the complexity of your assembly structures. Simple cleanup and validation on an existing setup can be completed in a few weeks under a Care plan. Multi-level assembly restructuring with revision control workflows and variance reporting typically runs two to three months.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Bill of Materials Configuration",
  description:
    "Multi-level BOM setup, component substitution, and cost variance analysis for manufacturers on NetSuite. SuiteCloud Developer II certified. Plans from $799.",
  alternates: { canonical: "/netsuite-bill-of-materials" },
  openGraph: {
    title: "NetSuite Bill of Materials Configuration",
    description:
      "NetSuite BOM setup and SuiteScript automation for manufacturers: multi-level assembly configuration, component substitution tracking, BOM revision control, and standard vs. actual cost variance reporting.",
    url: `${SITE_URL}/netsuite-bill-of-materials`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
};

export default function BillOfMaterialsPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Bill of Materials", url: `${SITE_URL}/netsuite-bill-of-materials` },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <ServiceJsonLd
        name="NetSuite Bill of Materials Configuration"
        description="Multi-level BOM setup, component substitution tracking, revision control, and cost variance reporting for manufacturers on NetSuite."
        url={`${SITE_URL}/netsuite-bill-of-materials`}
        serviceType="NetSuite Manufacturing Configuration"
        offers={[
          { name: "Care", price: 799, description: "10 hours/month: BOM validation, item record corrections, saved search builds, and ongoing support. Month-to-month after 3-month minimum." },
          { name: "Care Plus", price: 1499, description: "20 hours/month: multi-level assembly configuration, component substitution custom fields, revision control workflow, and variance reporting. Month-to-month." },
          { name: "Care Pro", price: 2499, description: "35 hours/month: full BOM restructuring, SuiteScript automation, MRP planning gap analysis, and ongoing account management. Month-to-month." },
        ]}
      />
      <OrganizationJsonLd />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Manufacturing"
          title="NetSuite Bill of Materials Configuration"
          subtitle="Multi-level BOMs, component substitution tracking, and revision control for manufacturers who have outgrown what a standard NetSuite implementation set up."
          align="left"
        />

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <p className="text-sm text-brand-600 mb-3">Tell us what your account needs.</p>
          <LeadFormLight />
        </div>
        <p className="mt-3 text-xs text-brand-400">NetSuite-certified · Manufacturing specialists · Month-to-month</p>
        <p className="mt-3 text-xs text-brand-300">Last updated September 2026</p>

        <p className="mt-8 text-sm text-brand-400">
          <strong>Bill of materials in NetSuite</strong> refers to the record that defines the component items, quantities, and unit costs required to produce one unit of a finished or semi-finished assembly. Standard NetSuite supports single-level and multi-level BOMs but does not natively manage component substitution rules, revision history workflows, or BOM cost variance reporting.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-100 bg-brand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Capability</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">Standard NetSuite</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-900 w-1/3">With SuitePacific</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ["BOM levels", "Single-level and multi-level assembly records", "Multi-level BOM with component substitution rules and revision tracking"],
                ["Cost rollup", "Standard cost rollup from component costs", "Variance report comparing BOM standard cost to actual production cost"],
                ["Component substitution", "Manual item change on assembly build", "Approved substitute component list per BOM line with workflow approval before substitution"],
                ["Revision control", "No native BOM revision history", "Version field on BOM record with change approval workflow and audit trail"],
              ].map(([cap, std, sp]) => (
                <tr key={cap} className="hover:bg-brand-50/30">
                  <td className="px-4 py-3 font-medium text-brand-900">{cap}</td>
                  <td className="px-4 py-3 text-brand-400">{std}</td>
                  <td className="px-4 py-3 text-brand-500">{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-brand-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">Quick answer</p>
          <p className="text-sm text-brand-700 leading-relaxed">
            SuitePacific configures and fixes NetSuite bills of materials for manufacturers whose BOM
            structures do not reflect actual production, who need multi-level assembly item setup, or
            who lack component substitution tracking and revision history. Standard NetSuite
            implementations often leave assembly items configured as flat structures that do not
            support multi-level BOM explosion. This creates problems in MRP planning, production
            costing, and assembly build accuracy. SuitePacific reviews the existing item record
            structure, corrects the BOM hierarchy, adds custom fields for component substitution
            tracking, builds a SuiteFlow-based revision control workflow, and creates saved searches
            for standard versus actual cost variance reporting. Work is done in Sandbox before
            Production and is scoped under month-to-month support plans starting at $799 per month
            for manufacturers already live on NetSuite.
          </p>
        </div>

        {/* Pain points */}
        <div className="mt-14" data-section="pain-points">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Common situations that bring manufacturers here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAIN_POINTS.map((item) => (
              <Card key={item.title} className="p-5 flex flex-col gap-3">
                <IconBadge icon={item.icon} />
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="text-sm text-brand-400">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-14" data-section="services">
          <h2 className="text-lg font-semibold text-brand-900 mb-1">What SuitePacific does for BOM configuration</h2>
          <p className="text-sm text-brand-400 mb-6">
            Configuration work and SuiteScript automation, scoped to what your production structure actually requires.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((item) => (
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
        <div className="mt-14" data-section="how-it-works">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How we approach BOM work</h2>
          <div className="space-y-4">
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
          <p className="mt-5 text-sm text-brand-400">
            When assembly build automation or MRP-related scripting is needed beyond configuration
            alone, see our{" "}
            <Link href="/netsuite-suitescript-development" className="text-accent hover:underline">
              SuiteScript development page
            </Link>
            .
          </p>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-14 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">Why SuitePacific for bill of materials</p>
          <h2 className="text-base font-semibold text-brand-900 mb-3">
            BOM configuration requires understanding how NetSuite costs assemblies, not just how to set up item records.
          </h2>
          <p className="text-sm text-brand-500 mb-4">
            Many NetSuite partners set up assembly items during implementation and move on. The result is
            a flat BOM structure that works for simple products but breaks down when production involves
            sub-assemblies, component substitutions, or engineering change orders. Fixing this after
            go-live requires knowing where the costing and MRP dependencies sit.
          </p>
          <ul className="space-y-2 text-sm text-brand-500 mb-4">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Oracle NetSuite Certified SuiteCloud Developer II and Administrator Professional</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Manufacturing-specific BOM work: assembly costing, revision control, and MRP item setup</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> Direct access to the developer doing the work, not a support queue</li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-0.5">→</span> US-based, month-to-month after a three-month minimum, starting at $799/month</li>
          </ul>
          <p className="text-sm text-brand-400">
            Related:{" "}
            <Link href="/industries/manufacturing" className="text-accent hover:underline">
              NetSuite for manufacturers
            </Link>{" "}
            and{" "}
            <Link href="/netsuite-work-orders" className="text-accent hover:underline">
              NetSuite work order management
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>

        {/* Related reading */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/30 p-5 sm:p-6">
          <p className="text-sm font-semibold text-brand-900 mb-3">Related reading</p>
          <ul className="space-y-2.5">
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-work-orders" className="text-accent hover:underline">
                NetSuite work order management
              </Link>{" "}
              covers work order creation from sales demand, component issue tracking, and production
              completion automation.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/netsuite-lot-serial-tracking" className="text-accent hover:underline">
                NetSuite lot and serial number tracking
              </Link>{" "}
              explains how lot-tracked components affect assembly builds and what traceability
              configuration is required.
            </li>
            <li className="text-sm text-brand-400">
              <Link href="/industries/manufacturing" className="text-accent hover:underline">
                NetSuite for manufacturers
              </Link>{" "}
              covers the broader manufacturing module setup that BOM configuration sits within.
            </li>
          </ul>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
          <LeadFormLight />
        </div>
      </div>
    </main>
  );
}

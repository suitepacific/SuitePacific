import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Trash2, ShieldCheck, Settings2, Search, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "NetSuite Account Optimization",
  description:
    "NetSuite account optimization and performance tuning: cleanup of legacy configurations, unused scripts and fields, slow saved searches, and governance issues without affecting live operations.",
  alternates: { canonical: "/netsuite-account-optimization" },
};

const OPTIMIZATION_AREAS = [
  { icon: Gauge, title: "Performance Tuning", description: "Identifying and fixing the specific searches, scripts, and dashboard configurations causing slow page loads and sluggish account performance." },
  { icon: Trash2, title: "Legacy Cleanup", description: "Removing or deactivating unused custom fields, forms, saved searches, and scripts that have accumulated since go-live and are slowing the account down." },
  { icon: ShieldCheck, title: "Script Governance Review", description: "Auditing scheduled and Map/Reduce scripts for governance unit consumption, yield behavior, and error handling to prevent queue backups and unexpected failures." },
  { icon: Settings2, title: "Configuration Cleanup", description: "Reviewing and simplifying custom record definitions, workflow configurations, and role permissions that have grown complex or inconsistent over time." },
  { icon: Search, title: "Saved Search Optimization", description: "Rebuilding heavy saved searches to filter on indexed criteria first, reducing database load and improving load times on dashboards and portlets." },
  { icon: Zap, title: "Workflow Consolidation", description: "Identifying duplicate or conflicting workflows and User Event scripts that are fighting each other, and consolidating logic into a single, maintainable mechanism." },
];

export default function AccountOptimizationPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Account Optimization", url: `${SITE_URL}/netsuite-account-optimization` },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Account Optimization"
          title="NetSuite Account Optimization"
          subtitle="Clean up and tune a NetSuite account that has gotten slower, harder to maintain, or more complex than it needs to be, without disrupting live operations."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Why accounts drift over time</h2>
          <p>
            NetSuite accounts that have been live for a few years accumulate technical debt in
            the same way any software system does. Scripts written in a hurry, custom fields
            added for a project that ended, saved searches nobody cleaned up, workflows that
            predate a process change — none of these cause an immediate outage, but they add up
            to an account that loads slowly, behaves inconsistently, and is increasingly
            difficult for anyone to understand.
          </p>
          <p>
            Account optimization is the work of identifying what’s actually causing the problem
            and fixing it, rather than adding more on top. See our{" "}
            <Link href="/blog/netsuite-account-performance">NetSuite performance guide</Link> for the
            specific things we check first when a client’s account is sluggish.
          </p>

          <h2>What we address</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {OPTIMIZATION_AREAS.map((item) => (
            <Card key={item.title} className="p-5 flex items-start gap-4">
              <IconBadge icon={item.icon} />
              <div>
                <h3 className="font-semibold text-brand-900 text-sm">{item.title}</h3>
                <p className="mt-1.5 text-sm text-brand-400">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>How we approach optimization work</h2>
          <p>
            All changes are built and verified in a sandbox account before touching production.
            We don’t delete or deactivate anything without understanding whether it’s actually
            unused, since active scripts and searches don’t always have obvious users. The output
            is an account that performs better and is easier to maintain, along with documentation
            of what was changed and why.
          </p>
          <p>
            Optimization work often surfaces areas where new development would help, such as
            a cleaner script replacing four conflicting workflows. If that comes up, we scope
            it separately rather than bundling unrelated work into an optimization engagement.
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Is your NetSuite account getting slower or harder to manage?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what you’re seeing and we’ll identify what’s causing it.
          </p>
          <div className="mt-6">
            <Button href="/#contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

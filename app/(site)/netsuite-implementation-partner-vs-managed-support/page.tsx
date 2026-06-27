import type { Metadata } from "next";
import { X, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "NetSuite Implementation Partner vs. Managed Support",
  description:
    "The difference between a NetSuite implementation partner and an ongoing managed support team, and how to know which one your business needs right now.",
  alternates: { canonical: "/netsuite-implementation-partner-vs-managed-support" },
};

const IMPLEMENTATION_PARTNER = [
  "Initial NetSuite setup and configuration",
  "Data migration from your previous system",
  "Core workflow and role setup",
  "Go-live training",
  "Engagement ends at or shortly after go-live",
];

const MANAGED_SUPPORT = [
  "Ongoing SuiteScript development and customization",
  "Workflow automation as processes change",
  "Saved searches, dashboards, and reporting",
  "Account optimization and bug fixes",
  "Continuous, month-to-month engagement",
];

export default function ComparisonPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          {
            name: "Implementation Partner vs. Managed Support",
            url: `${SITE_URL}/netsuite-implementation-partner-vs-managed-support`,
          },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Choosing the Right Fit"
          title="NetSuite Implementation Partner vs. Managed Support"
          subtitle="Two different jobs, often confused as one. Here’s the actual distinction, and which one applies to you right now."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <p>
            “NetSuite consulting” covers two genuinely different jobs that happen to use the
            same software. Confusing them is the most common reason companies end up either
            over-buying a long implementation engagement they don’t need, or under-buying
            ongoing support and getting stuck with no one to call when something breaks.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-8 h-full">
            <h2 className="font-semibold text-brand-900">Implementation Partner</h2>
            <p className="mt-2 text-sm text-brand-400">
              A project-based engagement to get you onto NetSuite in the first place.
            </p>
            <ul className="mt-6 space-y-4">
              {IMPLEMENTATION_PARTNER.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-600">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand text-white p-8 h-full shadow-soft-lg">
            <h2 className="font-semibold">Managed Support (SuitePacific)</h2>
            <p className="mt-2 text-sm text-blue-100/80">
              An ongoing technical team for the years after you’re already live.
            </p>
            <ul className="mt-6 space-y-4">
              {MANAGED_SUPPORT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>Which one do you need?</h2>
          <p>
            If you haven’t gone live on NetSuite yet, or you’re mid-implementation, you need an
            implementation partner. That’s not what SuitePacific does, and we’ll tell you that
            directly if you reach out before go-live.
          </p>
          <p>
            If you’re already live and your implementation partner’s engagement has wound down,
            but the business keeps changing and NetSuite needs to keep changing with it, that’s
            managed support. That’s the entirety of what SuitePacific does. See our{" "}
            <a href="/netsuite-post-go-live-support">post-go-live support page</a> for what that
            looks like in practice.
          </p>
          <div className="not-prose">
            <div className="flex items-center gap-3 text-sm text-brand-400 mt-2">
              <X className="h-4 w-4 text-red-400 shrink-0" />
              We do not provide implementation or go-live services.
            </div>
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Already live on NetSuite?</p>
          <p className="mt-2 text-sm text-brand-400">
            That’s exactly who we work with. Let’s talk about what’s next.
          </p>
          <div className="mt-6">
            <Button href="/#contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

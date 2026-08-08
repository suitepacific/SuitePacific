import type { Metadata } from "next";
import {
  Building2,
  Calculator,
  Boxes,
  Users,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";

const FEATURED_PARTNERS = [
  {
    name: "SuitePreferences",
    logoDark: "https://suitepreferences.com/assets/logo-dark.svg",
    logoLight: "https://suitepreferences.com/assets/logo-light.svg",
    website: "https://suitepreferences.com",
    linkedin: "https://www.linkedin.com/company/suitepreferences",
    description:
      "SuitePreferences is a Chrome extension designed to streamline workflows for NetSuite users, administrators, and developers. It integrates powerful productivity and developer tools directly into your NetSuite account, with advanced utilities accessible via a side panel, to eliminate tedious context-switching and help teams ship faster.",
  },
];

const PARTNER_TYPES = [
  {
    icon: Building2,
    title: "NetSuite Implementation Partners",
    description:
      "You implement NetSuite. Your clients go live and then need ongoing customization, SuiteScript development, and workflow support. Instead of turning down that work or stretching your team, refer it to SuitePacific. We handle post-go-live development so your client stays well-supported without pulling your implementation team away from new projects.",
  },
  {
    icon: Users,
    title: "Oracle NetSuite Resellers",
    description:
      "You sell NetSuite licenses and help clients get started. We extend that value by being the resource your clients call when they need custom scripting, workflow automation, or integrations built after go-live. We don't compete for implementation or license work. We're the team that makes your clients successful on the platform long-term.",
  },
  {
    icon: Calculator,
    title: "Accounting Firms & CPA Firms",
    description:
      "Many of your clients are on NetSuite. When they need custom reports, workflow fixes, or a developer to build something outside standard configuration, you need a trusted referral. SuitePacific works directly with your clients or alongside your team to resolve NetSuite-specific technical requirements.",
  },
  {
    icon: Boxes,
    title: "Software & SaaS Vendors",
    description:
      "Your product needs to connect to NetSuite. Your customers need someone to build and maintain that integration. SuitePacific builds RESTlet-based, SuiteTalk, and middleware integrations with NetSuite so your clients get a clean, production-ready connection without you having to become a NetSuite specialist.",
  },
];

const WHY_PARTNER = [
  {
    icon: ShieldCheck,
    title: "We don't compete for your work",
    description:
      "SuitePacific focuses exclusively on post-go-live support and development. We don't pursue implementation projects or license sales. Your client relationship stays yours.",
  },
  {
    icon: CheckCircle2,
    title: "NetSuite-Certified technical team",
    description:
      "Every engagement is delivered by NetSuite-certified professionals. When you refer a client to SuitePacific, you're sending them to a team with verified technical credentials.",
  },
  {
    icon: Zap,
    title: "Fast turnaround, direct communication",
    description:
      "Your clients speak directly to the developer working on their account. No account managers, no relay layers. Most requests are scoped and delivered in days.",
  },
  {
    icon: Clock,
    title: "Sandbox-first, documented work",
    description:
      "Every change is tested in a sandbox before touching production. Every customization is documented. Your client's account stays clean and maintainable over time.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Reach out",
    description:
      "Tell us a bit about your business, who your clients are, and what kind of partnership makes sense. There's no formal application process.",
  },
  {
    step: "02",
    title: "Alignment call",
    description:
      "We have a short call to understand your client base, referral workflow, and what you'd need from us to make the partnership work smoothly.",
  },
  {
    step: "03",
    title: "Start referring or collaborating",
    description:
      "Once aligned, you can refer clients directly or bring us in alongside your team. We handle the NetSuite-specific technical work and keep you informed.",
  },
];

export const metadata: Metadata = {
  title: "Partner with SuitePacific | NetSuite Post-Go-Live Partner Program",
  description:
    "Partner with SuitePacific to refer NetSuite post-go-live support, SuiteScript development, and workflow automation to your clients. For implementation partners, resellers, accounting firms, and software vendors.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Partners", url: `${SITE_URL}/partners` },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* H1 + intro */}
        <SectionHeading
          as="h1"
          eyebrow="Partner Program"
          title="Partner with SuitePacific"
          subtitle="Work with a specialist NetSuite team that handles post-go-live support, development, and automation, without competing for your work."
          align="left"
        />

        <div className="prose prose-blue mt-8 max-w-none prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <p>
            SuitePacific works with implementation partners, resellers, accounting firms, and
            software vendors who need a trusted, specialist referral for NetSuite post-go-live work.
            We focus exclusively on clients who are already live on NetSuite, which means we
            complement your work rather than compete with it.
          </p>
          <p>
            If your clients regularly ask for SuiteScript development, workflow automation,
            integrations, or ongoing NetSuite support and you don&apos;t have the capacity to handle
            it in-house, we&apos;d like to talk.
          </p>
        </div>

        <div className="mt-6">
          <Button href="/contact">Get in Touch</Button>
        </div>

        {/* Featured Partners */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Featured Partners</h2>
          <div className="space-y-5">
            {FEATURED_PARTNERS.map((partner) => (
              <Card key={partner.name} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="shrink-0">
                    <img
                      src={partner.logoDark}
                      alt={`${partner.name} logo`}
                      className="h-9 w-auto dark:hidden"
                    />
                    <img
                      src={partner.logoLight}
                      alt={`${partner.name} logo`}
                      className="h-9 w-auto hidden dark:block"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-brand-900 text-sm">{partner.name}</p>
                    <p className="mt-2 text-sm text-brand-400 leading-relaxed">{partner.description}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Visit website
                      </a>
                      <a
                        href={partner.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Who we partner with */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">Who We Partner With</h2>
          <div className="space-y-5">
            {PARTNER_TYPES.map((type) => (
              <Card key={type.title} className="p-6 flex items-start gap-5">
                <IconBadge icon={type.icon} />
                <div>
                  <h3 className="font-semibold text-brand-900 text-sm">{type.title}</h3>
                  <p className="mt-2 text-sm text-brand-400 leading-relaxed">{type.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why SuitePacific */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">What Partners Can Expect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_PARTNER.map((item) => (
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
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-brand-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.step} className="flex items-start gap-5">
                <span className="text-xs font-semibold text-accent bg-accent/10 rounded-full h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900 text-sm">{step.title}</p>
                  <p className="mt-0.5 text-sm text-brand-400">{step.description}</p>
                </div>
                {index < HOW_IT_WORKS.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-brand-200 shrink-0 mt-1 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What we handle */}
        <div className="mt-16 rounded-2xl bg-brand-50/50 border border-brand-100 p-7">
          <h2 className="font-semibold text-brand-900 text-base mb-4">What we handle for your clients</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              "SuiteScript 2.1 development",
              "Workflow automation (SuiteFlow)",
              "Saved searches and dashboards",
              "Advanced PDF & HTML templates",
              "RESTlet and SuiteTalk integrations",
              "Map/Reduce batch processing",
              "Account optimization and cleanup",
              "Ongoing post-go-live support",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-brand-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-brand-400">
            See the full list of services at{" "}
            <Link href="/netsuite-post-go-live-support" className="text-accent hover:underline">
              our post-go-live support page
            </Link>
            .
          </p>
        </div>

        {/* Final CTA */}
        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Interested in partnering?</p>
          <p className="mt-2 text-sm text-brand-400">
            Reach out with a brief description of your business and how you think we could work
            together. We&apos;ll take it from there.
          </p>
          <div className="mt-6">
            <Button href="/contact">Get in Touch</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/content";
import { CASE_STUDIES_DETAIL } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "NetSuite Case Studies | SuitePacific",
  description:
    "Real NetSuite customization projects: dashboards, approval workflows, invoice automation, PDF templates, integrations, and operational reporting, built for post-go-live accounts.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesIndexPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Case Studies", url: `${SITE_URL}/case-studies` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "NetSuite Case Studies",
            itemListElement: CASE_STUDIES_DETAIL.map((cs, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/case-studies/${cs.slug}`,
              name: cs.title,
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Recent Work"
          title="NetSuite Case Studies"
          subtitle="A selection of post-go-live projects: what the problem was, what we built, and what changed."
          align="left"
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {CASE_STUDIES_DETAIL.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
              <Card className="p-6 h-full flex flex-col hover:shadow-soft-lg hover:border-brand-100 transition-shadow">
                <div className="flex items-center gap-2 flex-wrap">
                  {cs.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="mt-4 font-semibold text-lg text-brand-900">{cs.title}</h2>
                <p className="mt-2 text-sm text-brand-400 flex-1">{cs.cardChallenge}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-brand-400">
                  <span className="text-emerald-600 font-medium">{cs.cardOutcome.split(".")[0]}.</span>
                  <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Have a similar challenge?</p>
          <p className="mt-2 text-sm text-brand-400">
            Most of our engagements start with a conversation about what&apos;s not working or what
            needs to be built. Book a free call and we&apos;ll tell you what&apos;s realistic.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ServiceFaqSection } from "@/components/ui/ServiceFaqSection";
import { RECENT_WORK, SITE_URL } from "@/lib/content";

const FAQ = [
  {
    question: "What's the difference between this and NetSuite's own support?",
    answer: "NetSuite's support handles platform bugs and questions about standard functionality. We handle the customization layer — scripts, workflows, saved searches, templates, and configuration specific to your account. Most day-to-day questions in a live account sit in the customization layer, not the platform itself.",
  },
  {
    question: "How is support billed?",
    answer: "We work on a retained hours model: a monthly block of hours applied to whatever work comes up that month. This works better than per-ticket billing for accounts that have a steady but unpredictable stream of customization requests.",
  },
  {
    question: "Do you require a long-term contract?",
    answer: "We typically start with a three-month engagement, which gives enough time to understand the account and address the highest-priority items. Most clients continue month-to-month after that.",
  },
  {
    question: "Can you take over support from a current managed services provider?",
    answer: "Yes. We handle transitions regularly. The process involves a documented handoff of active customizations, known issues, and in-progress work. We also review the account independently rather than relying solely on the previous provider's documentation.",
  },
];

export const metadata: Metadata = {
  title: "NetSuite Post-Go-Live Support",
  description:
    "What NetSuite post-go-live support actually covers: ongoing SuiteScript development, workflow automation, reporting, and account optimization after your implementation partner's work is done.",
  alternates: { canonical: "/netsuite-post-go-live-support" },
};

export default function PostGoLiveSupportPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "NetSuite Post-Go-Live Support", url: `${SITE_URL}/netsuite-post-go-live-support` },
        ]}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Post-Go-Live Support"
          title="NetSuite Post-Go-Live Support"
          subtitle="What happens after your implementation partner's engagement ends, and how an ongoing NetSuite team fits into that."
          align="left"
        />

        <div className="prose prose-blue mt-12 max-w-none prose-headings:font-semibold prose-headings:text-brand-900 prose-p:text-brand-400 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-900">
          <h2>What “post-go-live” actually means</h2>
          <p>
            Most NetSuite implementation partners are scoped to get your account live: initial
            configuration, data migration, core workflows, and training. Once you go live, that
            engagement typically winds down. What’s left is a working NetSuite account and a
            business that keeps changing, with no dedicated technical team assigned to keep up
            with it.
          </p>
          <p>
            Post-go-live support is the ongoing work that fills that gap: fixing what breaks,
            building what the business needs next, and adjusting NetSuite as your processes
            evolve, on a continuous basis rather than as a single project with an end date.
          </p>

          <h2>What’s typically included</h2>
          <p>
            The specific mix varies by account, but post-go-live engagements generally cover:
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RECENT_WORK.slice(0, 8).map((item) => (
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
          <h2>How engagements typically work</h2>
          <p>
            Post-go-live work doesn’t usually need a new statement of work for every request.
            Most teams operate on a flexible, month-to-month basis: you bring requests as they
            come up, changes are built and tested in a sandbox before touching your live
            account, and the relationship continues for as long as it’s useful, not for a fixed
            project term.
          </p>

          <h2>Who this is for</h2>
          <p>
            Companies that have already completed their NetSuite implementation and are
            looking for a responsive, technical team for ongoing development, automation,
            reporting, and account upkeep. If you haven’t gone live yet, this isn’t the right
            fit; you’ll want an implementation partner first. See{" "}
            <a href="/netsuite-implementation-partner-vs-managed-support">
              implementation partner vs. managed support
            </a>{" "}
            for that distinction.
          </p>
        </div>

        <ServiceFaqSection items={FAQ} />

        <div className="mt-14 pt-10 border-t border-brand-50 text-center">
          <p className="text-brand-900 font-semibold">Already live on NetSuite?</p>
          <p className="mt-2 text-sm text-brand-400">
            Tell us what’s not working or what you need built next.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

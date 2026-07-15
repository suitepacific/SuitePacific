import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/content";

const WHAT_TO_EXPECT = [
  "Response within one business day",
  "No sales pressure or long-term contracts",
  "Direct communication with the developer",
  "Free 30-minute consultation call",
];

export const metadata: Metadata = {
  title: "Contact SuitePacific | Book a Free NetSuite Consultation",
  description:
    "Get in touch with SuitePacific for NetSuite post-go-live support, SuiteScript development, workflow automation, and integrations. Book a free consultation — no long-term contracts.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left column — context */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Get in Touch</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 leading-tight">
              Book a Free Consultation
            </h1>
            <p className="mt-4 text-sm text-brand-400 leading-relaxed">
              Tell us what you&apos;re working with and what you need. We&apos;ll follow up within one business day to schedule a call.
            </p>

            <ul className="mt-8 space-y-3">
              {WHAT_TO_EXPECT.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-brand-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-brand-50">
              <p className="text-xs text-brand-400">Prefer email?</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-accent hover:underline mt-0.5 block"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
              <LeadForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

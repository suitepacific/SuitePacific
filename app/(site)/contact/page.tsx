import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Clock, Star } from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/content";

const WHAT_TO_EXPECT = [
  "We'll respond within one business day",
  "No sales pressure. No long-term contracts.",
  "Talk directly with the developer working on your account",
  "Free 30-minute consultation call",
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "NetSuite Certified" },
  { icon: Clock, label: "Post-Go-Live Specialists" },
  { icon: Star, label: "6+ Years NetSuite Experience" },
];

export const metadata: Metadata = {
  title: { absolute: "Contact SuitePacific | Book a Free NetSuite Consultation" },
  description:
    "Get in touch with SuitePacific for NetSuite post-go-live support, SuiteScript development, workflow automation, and integrations. Book a free consultation, no long-term contracts.",
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

          {/* Left column, context */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Get in Touch</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 leading-tight">
              Talk to a NetSuite Expert
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

            <div className="mt-8 space-y-3">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-brand-600">
                  <Icon className="h-4 w-4 text-accent shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            <Link
              href="https://clutch.co/profile/suitepacific"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm text-brand-700 shadow-sm hover:border-brand-200 transition-colors"
            >
              <span className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="font-semibold text-brand-900">5.0</span>
              <span className="text-brand-400">&middot; Reviewed on Clutch</span>
            </Link>

            <div className="mt-8 pt-6 border-t border-brand-50">
              <p className="text-sm text-brand-400">
                Prefer email? Reach us directly at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Right column, form */}
          <div className="lg:col-span-3">
            <p className="text-sm text-brand-400 mb-5">
              Whether you need a small customization or ongoing post-go-live support, we&apos;re happy to help.
            </p>
            <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 shadow-soft">
              <LeadForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

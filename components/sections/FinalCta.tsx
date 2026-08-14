import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { LeadForm } from "@/components/sections/LeadForm";

const REASONS = ["No discovery calls", "No long contracts", "Senior developer, direct"];

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand via-brand-700 to-brand-900" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <FadeIn onMount>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
            Let&apos;s Make Your NetSuite Work Even Better.
          </h2>
          <p className="mt-5 text-lg text-blue-50 text-balance">
            Tell us a bit about your NetSuite account and we&apos;ll follow up
            to schedule a free 30-minute consultation.
          </p>
          <div className="mt-8 space-y-3">
            {REASONS.map((reason) => (
              <div key={reason} className="flex items-center gap-2 text-white font-medium text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                {reason}
              </div>
            ))}
          </div>
          <Link
            href="https://clutch.co/profile/suitepacific"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs text-blue-200 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
            </span>
            5.0 on Clutch &middot; verified client review
          </Link>
        </FadeIn>

        <FadeIn onMount delay={0.1}>
          <div className="bg-white rounded-2xl shadow-soft-lg p-6 sm:p-8">
            <LeadForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

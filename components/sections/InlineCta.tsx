import { LeadFormLight } from "@/components/sections/LeadFormLight";

export function InlineCta({
  heading = "Recognize this in your account?",
  body = "Leave your work email. We reply within one business day to set up a free consultation about your account.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <div data-section="inline-cta" className="mx-auto mt-10 max-w-3xl rounded-2xl border border-accent/30 bg-brand-50/60 p-5 sm:p-6">
      <p className="text-base font-semibold text-brand-900">{heading}</p>
      <p className="mt-1 mb-4 text-sm text-brand-600">{body}</p>
      <LeadFormLight />
    </div>
  );
}

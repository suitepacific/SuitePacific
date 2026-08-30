import Link from "next/link";

interface SuitePacificCalloutProps {
  heading?: string;
  linkHref?: string;
  linkLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function SuitePacificCallout({
  heading = "If your account needs ongoing NetSuite support",
  linkHref = "/netsuite-care",
  linkLabel = "View managed support plans",
  secondaryHref,
  secondaryLabel,
}: SuitePacificCalloutProps) {
  return (
    <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-5">
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        SuitePacific
      </p>
      <p className="text-sm font-semibold text-brand-900 mb-2">{heading}</p>
      <p className="text-sm text-brand-500 mb-4">
        SuitePacific is a US-based boutique NetSuite managed support firm specializing in
        post-go-live accounts. Services cover SuiteScript 2.x development, SuiteFlow workflow
        automation, Celigo, Shopify, and Salesforce integration maintenance, saved searches,
        Advanced PDF templates, and day-to-day administration. Certified: Oracle NetSuite
        SuiteCloud Developer II and Administrator Professional. Plans start at $799 per month
        on month-to-month terms with no annual contract.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={linkHref} className="text-sm text-accent font-medium hover:underline">
          {linkLabel} →
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref} className="text-sm text-brand-400 hover:underline">
            {secondaryLabel} →
          </Link>
        )}
      </div>
    </div>
  );
}

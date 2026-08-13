import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, CONTACT_EMAIL, LEGAL_NAME } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | SuitePacific" },
  description:
    "SuitePacific's privacy policy: what information we collect when you contact us, how we use it, and how to reach us with questions.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
        ]}
      />

      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Legal
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 leading-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-brand-400 mb-10">
          {LEGAL_NAME} &nbsp;&middot;&nbsp; Last updated: August 2026
        </p>

        <div className="prose prose-sm prose-brand max-w-none space-y-8 text-brand-600">

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">Who we are</h2>
            <p>
              SuitePacific is operated by {LEGAL_NAME}, a Wyoming limited liability company.
              We provide NetSuite consulting, SuiteScript development, and post-go-live support services
              to businesses. Our website is{" "}
              <a href={SITE_URL} className="text-accent hover:underline">
                suitepacific.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">
              What information we collect
            </h2>
            <p>
              We collect information only when you voluntarily submit it to us through a contact form
              or consultation request. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your name</li>
              <li>Your business email address</li>
              <li>Your company name</li>
              <li>Your phone number (optional)</li>
              <li>The message or project description you provide</li>
            </ul>
            <p className="mt-3">
              We do not use cookies for tracking, analytics, or advertising. We do not run any
              third-party advertising pixels on this site. Standard web server logs (IP address,
              browser type, pages visited) are generated automatically by our hosting provider,
              Vercel, and are retained for up to 30 days for security and debugging purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">
              How we use your information
            </h2>
            <p>We use the information you submit solely to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Respond to your inquiry or consultation request</li>
              <li>Discuss the scope of potential work with you</li>
              <li>Follow up on an ongoing engagement</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes. We do not add you to any mailing list without your explicit
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">
              How we store your information
            </h2>
            <p>
              Contact form submissions are delivered to us by email via Resend, a transactional
              email provider. Resend stores message data on servers in the United States. We retain
              your contact information only as long as necessary to conduct business with you or as
              required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">Your rights</h2>
            <p>
              You may request that we delete any personal information we hold about you by
              contacting us at the email address below. We will respond within 30 days. If you are
              located in the European Economic Area, you have additional rights under the GDPR,
              including the right to access, correct, or object to the processing of your personal
              data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">
              Third-party services
            </h2>
            <p>
              This site is hosted on Vercel. Contact form emails are sent via Resend. These
              providers process data on our behalf and are bound by their own privacy policies.
              We do not use Google Analytics, Facebook Pixel, or any other behavioral tracking
              service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">Changes to this policy</h2>
            <p>
              We may update this policy as our services or legal obligations change. The date at
              the top of this page reflects the most recent revision. Continued use of the site
              after an update constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-brand-900 mb-2">Contact</h2>
            <p>
              Questions about this policy or requests regarding your personal data can be sent to:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

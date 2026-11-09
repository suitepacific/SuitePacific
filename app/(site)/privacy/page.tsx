import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CookieSettingsLink } from "@/components/analytics/CookieSettingsLink";
import { SITE_URL, CONTACT_EMAIL, LEGAL_NAME } from "@/lib/content";

const DESCRIPTION =
  "How SuitePacific collects, uses and protects personal data: contact forms, site analytics, Google cookies with consent, SuiteCompare accounts and your rights.";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | SuitePacific" },
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | SuitePacific",
    description: DESCRIPTION,
    url: "https://suitepacific.com/privacy",
    type: "website",
  },
};

const H2 = "text-base font-semibold text-brand-900 mb-2";
const UL = "list-disc pl-5 space-y-1 mt-2";

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
        ]}
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Legal</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 leading-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-brand-400 mb-10">
          {LEGAL_NAME} &nbsp;&middot;&nbsp; Last updated: November 10, 2026
        </p>

        <div className="prose prose-sm prose-brand max-w-none space-y-8 text-brand-600">
          <section>
            <h2 className={H2}>Who we are</h2>
            <p>
              SuitePacific is operated by {LEGAL_NAME}, a Wyoming limited liability company. We provide NetSuite
              consulting, SuiteScript development and post-go-live support to businesses, and we operate the
              SuiteCompare and Import Doctor tools at{" "}
              <a href={SITE_URL} className="text-accent hover:underline">suitepacific.com</a>. We are the controller
              of the personal data described in this policy.
            </p>
          </section>

          <section>
            <h2 className={H2}>Information you give us</h2>
            <p>When you submit a form on this site, we collect what you enter, which can include:</p>
            <ul className={UL}>
              <li>Your name, work email address and company name</li>
              <li>Your role, and details about your NetSuite account you choose to share (for example, how many scripts you run or what help you need)</li>
              <li>Any message you write, and any phone number you include in it</li>
              <li>The page you submitted the form from</li>
            </ul>
          </section>

          <section>
            <h2 className={H2}>Information collected automatically</h2>
            <p>When you browse the site, we record:</p>
            <ul className={UL}>
              <li>The pages you view, the page that referred you, and how long you stay</li>
              <li>Which sections of a page you scroll to</li>
              <li>Campaign tags in the link you followed (such as utm parameters or a Google Ads click ID)</li>
              <li>Your approximate location (city, region and country), which our hosting provider derives from your IP address. We do not store your IP address with these records.</li>
            </ul>
            <p className="mt-3">
              This first-party measurement does not place cookies or store anything on your device. Our hosting
              provider, Vercel, also keeps standard server logs (including IP address and browser type) for a limited
              period for security and troubleshooting.
            </p>
          </section>

          <section>
            <h2 className={H2}>Cookies and Google Analytics</h2>
            <p>
              We use Google Analytics and Google Ads to understand how visitors use the site and to measure whether
              our advertising leads to enquiries. These services set cookies and send usage data to Google, including
              when a form is submitted successfully.
            </p>
            <ul className={UL}>
              <li>
                If you are in the United Kingdom, the European Economic Area or Switzerland, these cookies are only set
                after you click Accept in our cookie banner. Until then, Google receives only limited signals that do
                not use cookies.
              </li>
              <li>You can change your choice at any time: <CookieSettingsLink className="text-accent underline" />.</li>
              <li>
                You can also limit Google&apos;s use of your data through{" "}
                <a href="https://adssettings.google.com" className="text-accent hover:underline" rel="noopener noreferrer" target="_blank">Google&apos;s ad settings</a>{" "}
                or the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-accent hover:underline" rel="noopener noreferrer" target="_blank">Google Analytics opt-out add-on</a>.
              </li>
            </ul>
            <p className="mt-3">
              We also store your cookie choice in your browser so we do not ask again. We do not use social media
              pixels.
            </p>
          </section>

          <section>
            <h2 className={H2}>SuiteCompare and Import Doctor accounts</h2>
            <p>If you create an account for SuiteCompare or Import Doctor, we also process:</p>
            <ul className={UL}>
              <li>Your name, email address and a hashed (not readable) password</li>
              <li>Sign-up location (city and country) and login times, for security</li>
              <li>The NetSuite connection credentials you provide, which we store encrypted and use only to connect to the accounts you authorize</li>
              <li>Script names and contents retrieved from your NetSuite environments in order to compare them</li>
            </ul>
            <p className="mt-3">
              If you use the AI summary feature, the script content you select is sent to a third-party AI processing
              provider to generate the summary.
            </p>
          </section>

          <section>
            <h2 className={H2}>How we use information</h2>
            <ul className={UL}>
              <li>To reply to your enquiry and discuss potential or ongoing work</li>
              <li>To provide SuiteCompare and Import Doctor, and keep accounts secure</li>
              <li>To understand which pages and campaigns are useful, and to improve the site</li>
              <li>To measure the effectiveness of our advertising, where you have consented if consent is required</li>
              <li>To meet legal obligations and protect against misuse</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information, and we do not add you to a mailing list without your consent.
            </p>
            <p className="mt-3">
              For visitors in the UK, EEA and Switzerland, our legal bases are: consent, for analytics and advertising
              cookies; our legitimate interests, for replying to enquiries, first-party site measurement and security;
              and performing our contract with you, for SuiteCompare and Import Doctor accounts.
            </p>
          </section>

          <section>
            <h2 className={H2}>Who we share it with</h2>
            <p>We use service providers who process data on our behalf:</p>
            <ul className={UL}>
              <li>Vercel: website hosting</li>
              <li>Neon: database hosting for form submissions, site measurement and tool accounts</li>
              <li>Resend: sending form notifications and account emails</li>
              <li>FormSubmit: forwarding form submissions to our inbox by email</li>
              <li>Google: analytics and advertising measurement, as described above</li>
              <li>A third-party AI processing provider: only for SuiteCompare AI summaries you request</li>
            </ul>
            <p className="mt-3">
              These providers may process data in the United States and other countries. We may also disclose
              information if required by law.
            </p>
          </section>

          <section>
            <h2 className={H2}>How long we keep it</h2>
            <p>
              We keep enquiry details for as long as we need them to deal with you, and delete them on request unless
              we must keep them by law. Tool account data is kept while your account is active. Google Analytics data
              is kept according to the retention period set in our Google Analytics account.
            </p>
          </section>

          <section>
            <h2 className={H2}>Your rights</h2>
            <p>
              You can ask us to access, correct or delete the personal information we hold about you, or object to
              how we use it, by emailing us. We will respond within 30 days. Where we rely on consent, you can
              withdraw it at any time. If you are in the UK, EEA or Switzerland, you also have the right to complain
              to your data protection authority, such as the UK Information Commissioner&apos;s Office. Depending on
              where you live, you may have similar rights under local law, including US state privacy laws.
            </p>
          </section>

          <section>
            <h2 className={H2}>Children</h2>
            <p>This site and our tools are intended for businesses and are not directed at children under 16.</p>
          </section>

          <section>
            <h2 className={H2}>Changes to this policy</h2>
            <p>
              We will update this policy when our practices change. The date at the top shows the latest version.
            </p>
          </section>

          <section>
            <h2 className={H2}>Contact</h2>
            <p>
              Questions about this policy or requests about your personal data:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
